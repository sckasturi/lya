import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import useWhenVisible from "../../../hooks/useWhenVisible";
import { getCtaColorExperimentParams } from "../../../lib/ctaColorExperiment";

const INTERACTION_EVENTS = ["scroll", "pointerdown", "pointermove", "keydown", "touchstart"];

/**
 * The Calendly iframe pulls in several MB of third-party JS/CSS, so it must
 * never load during the initial page load. It mounts only after the visitor
 * has interacted with the page (scroll/pointer/key) AND the embed is near
 * the viewport.
 */
function CalendlyEmbed() {
	// Start loading a full viewport ahead so the scheduler is already
	// rendered by the time the visitor scrolls to it.
	const { ref, isVisible } = useWhenVisible({ rootMargin: "900px 0px" });
	const [hasInteracted, setHasInteracted] = useState(false);

	useEffect(() => {
		if (hasInteracted) return undefined;
		const mark = () => setHasInteracted(true);
		INTERACTION_EVENTS.forEach((name) =>
			window.addEventListener(name, mark, { once: true, passive: true })
		);
		// Fallback: if no interaction happens (e.g. someone lands and just
		// waits), mount the scheduler anyway once the initial load is long over.
		const timer = window.setTimeout(mark, 8000);
		return () => {
			INTERACTION_EVENTS.forEach((name) => window.removeEventListener(name, mark));
			window.clearTimeout(timer);
		};
	}, [hasInteracted]);

	const showWidget = isVisible && hasInteracted;

	// Calendly posts events to the parent window. A completed booking is the
	// site's real conversion — send it to GA (with the CTA experiment variant)
	// so CTA changes can be judged by bookings, not clicks.
	useEffect(() => {
		if (!showWidget) return undefined;
		const onMessage = (e) => {
			if (typeof e.origin !== "string" || !e.origin.endsWith("calendly.com")) return;
			const eventName = e.data && e.data.event;
			if (typeof window.gtag !== "function") return;
			if (eventName === "calendly.date_and_time_selected") {
				window.gtag("event", "calendly_time_selected", {
					...getCtaColorExperimentParams(),
				});
			} else if (eventName === "calendly.event_scheduled") {
				window.gtag("event", "calendly_booking", {
					...getCtaColorExperimentParams(),
				});
			}
		};
		window.addEventListener("message", onMessage);
		return () => window.removeEventListener("message", onMessage);
	}, [showWidget]);

	return (
		<div
			ref={ref}
			className="lya-calendly-embed"
			style={{ minHeight: showWidget ? undefined : "600px" }}
		>
			{showWidget ? (
				<InlineWidget
					url="https://calendly.com/leverageyouradhd/30min"
					styles={{ height: "600px" }}
				/>
			) : (
				<p style={{ padding: "24px", textAlign: "center", color: "#888" }}>
					Loading scheduler…
				</p>
			)}
		</div>
	);
}

export default CalendlyEmbed;
