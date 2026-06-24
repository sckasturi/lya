import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CTA, CTA_SECTION, trackCtaClick } from "../../../lib/ctaEvents";
import { openFreebiePopup } from "../../../lib/openFreebiePopup";
import TestimonialCard from "./TestimonialCard";
import { testimonialsData } from "./testimonialsData";

const ROTATE_MS = 12000;
const HEIGHT_TRANSITION = { duration: 0.4, ease: [0.4, 0, 0.2, 1] };
const SLIDE_TRANSITION = { duration: 0.35, ease: [0.4, 0, 0.2, 1] };

function TestimonialArrow({ direction, label, onClick }) {
	return (
		<button
			type="button"
			className={`lya-testimonial-arrow lya-testimonial-arrow--${direction}`}
			onClick={onClick}
			aria-label={label}
		>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
				<path
					d={direction === "prev" ? "M12 4L6 10L12 16" : "M8 4L14 10L8 16"}
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
}

function Testimonial() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [slideHeight, setSlideHeight] = useState(0);
	const [direction, setDirection] = useState(1);
	const slideRef = useRef(null);
	const autoplayRef = useRef(null);

	const activeTestimonial = testimonialsData[activeIndex];
	const testimonialCount = testimonialsData.length;

	const measureHeight = useCallback(() => {
		if (!slideRef.current) return;
		const next = slideRef.current.offsetHeight;
		if (next > 0) {
			setSlideHeight(next);
		}
	}, []);

	useLayoutEffect(() => {
		measureHeight();
		const node = slideRef.current;
		if (!node || typeof ResizeObserver === "undefined") return undefined;

		const observer = new ResizeObserver(() => measureHeight());
		observer.observe(node);
		return () => observer.disconnect();
	}, [activeIndex, activeTestimonial?.id, measureHeight]);

	const startAutoplay = useCallback(() => {
		if (autoplayRef.current) {
			window.clearInterval(autoplayRef.current);
		}
		if (testimonialCount <= 1) return;

		autoplayRef.current = window.setInterval(() => {
			setDirection(1);
			setActiveIndex((current) => (current + 1) % testimonialCount);
		}, ROTATE_MS);
	}, [testimonialCount]);

	useEffect(() => {
		startAutoplay();
		return () => {
			if (autoplayRef.current) {
				window.clearInterval(autoplayRef.current);
			}
		};
	}, [startAutoplay]);

	const goToIndex = (index, nextDirection) => {
		setDirection(nextDirection);
		setActiveIndex(index);
		startAutoplay();
	};

	const goPrevious = () => {
		goToIndex((activeIndex - 1 + testimonialCount) % testimonialCount, -1);
	};

	const goNext = () => {
		goToIndex((activeIndex + 1) % testimonialCount, 1);
	};

	const scrollToSection = () => {
		trackCtaClick(CTA.START_JOURNEY, CTA_SECTION.TESTIMONIALS);
		const target = document.getElementById("contact-us");
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	};

	if (!activeTestimonial) {
		return null;
	}

	const slideVariants = {
		enter: (dir) => ({
			opacity: 0,
			x: dir > 0 ? 28 : -28,
		}),
		center: {
			opacity: 1,
			x: 0,
		},
		exit: (dir) => ({
			opacity: 0,
			x: dir > 0 ? -28 : 28,
		}),
	};

	return (
		<div className="section aximo-section-padding3 teal-bg">
			<div className="container">
				<div className="aximo-section-title center">
					<h2 className="teal-bg">What my clients are saying</h2>
				</div>

				<div className="lya-testimonial-slider">
					{testimonialCount > 1 && (
						<TestimonialArrow direction="prev" label="Previous testimonial" onClick={goPrevious} />
					)}

					<div className="lya-testimonial-carousel lya-testimonial-carousel--single">
						<motion.div
							className="lya-testimonial-viewport"
							animate={{ height: slideHeight || "auto" }}
							transition={HEIGHT_TRANSITION}
						>
							<AnimatePresence mode="wait" custom={direction} initial={false}>
								<motion.div
									ref={slideRef}
									key={activeTestimonial.id}
									custom={direction}
									variants={slideVariants}
									initial="enter"
									animate="center"
									exit="exit"
									transition={SLIDE_TRANSITION}
									className="lya-testimonial-carousel-page lya-testimonial-carousel-page--single"
								>
									<TestimonialCard testimonial={activeTestimonial} />
								</motion.div>
							</AnimatePresence>
						</motion.div>

						{testimonialCount > 1 && (
							<div
								className="lya-testimonial-dots"
								role="tablist"
								aria-label="Testimonials"
							>
								{testimonialsData.map((testimonial, index) => (
									<button
										key={testimonial.id}
										type="button"
										className={`lya-testimonial-dot${index === activeIndex ? " active" : ""}`}
										aria-label={`Show testimonial ${index + 1} of ${testimonialCount}`}
										aria-selected={index === activeIndex}
										onClick={() =>
											goToIndex(index, index >= activeIndex ? 1 : -1)
										}
									/>
								))}
							</div>
						)}
					</div>

					{testimonialCount > 1 && (
						<TestimonialArrow direction="next" label="Next testimonial" onClick={goNext} />
					)}
				</div>

				<div className="lya-cta-row lya-testimonial-cta-row">
					<button type="button" className="lya-testimonial-journey-btn" onClick={scrollToSection}>
						Start your journey
					</button>
					<button
						type="button"
						className="lya-testimonial-freebie-btn"
						onClick={() => openFreebiePopup(CTA_SECTION.TESTIMONIALS)}
					>
						Get your FREE Un-overwhelm Guide
					</button>
				</div>
			</div>
		</div>
	);
}

export default Testimonial;
