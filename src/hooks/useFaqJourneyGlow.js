import { useEffect, useRef, useState } from "react";

const GLOW_DURATION_MS = 2000;

/**
 * Triggers a one-time glow on the journey CTA when FAQ first enters view.
 * Pulses for 2s, then never runs again this page load.
 */
export default function useFaqJourneyGlow() {
	const [glowActive, setGlowActive] = useState(false);
	const hasTriggered = useRef(false);
	const timeoutRef = useRef(null);

	useEffect(() => {
		const el = document.getElementById("lya-faq");
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting || hasTriggered.current) return;
				hasTriggered.current = true;
				setGlowActive(true);
				timeoutRef.current = window.setTimeout(() => {
					setGlowActive(false);
				}, GLOW_DURATION_MS);
			},
			{
				root: null,
				rootMargin: "-12% 0px -30% 0px",
				threshold: 0.15,
			},
		);

		observer.observe(el);
		return () => {
			observer.disconnect();
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	return glowActive;
}
