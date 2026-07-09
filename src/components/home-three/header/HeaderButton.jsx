import useFaqJourneyGlow from "../../../hooks/useFaqJourneyGlow";
import { CTA, CTA_SECTION, trackCtaClick } from "../../../lib/ctaEvents";
import { openFreebiePopup } from "../../../lib/openFreebiePopup";

function HeaderButton() {
	const journeyGlow = useFaqJourneyGlow();
	const scrollToSection = () => {
		trackCtaClick(CTA.START_JOURNEY, CTA_SECTION.HEADER);
		const target = document.getElementById("contact-us");
		if (target) {
			target.scrollIntoView({ behavior: "smooth" }); // Smooth scroll animation
		}
	};

	return (
		<>
			{/* Mobile: compact always-visible CTAs (full buttons are hidden below lg) */}
			<div className="d-lg-none ms-auto lya-header-mobile-ctas">
				<button
					type="button"
					className="lya-header-journey-btn-mobile"
					onClick={scrollToSection}
				>
					Start your journey
				</button>
				<button
					type="button"
					className="lya-header-freebie-btn-mobile"
					onClick={() => openFreebiePopup(CTA_SECTION.HEADER)}
				>
					Free Guide
				</button>
			</div>
			<div className="header-btn header-btn-l1 ms-auto d-none d-lg-inline-flex">
				<div className="aximo-header-wrap lya-cta-row">
					<button
						type="button"
						className={`aximo-default-btn pill aximo-header-btn lya-header-journey-btn${journeyGlow ? " lya-journey-glow" : ""}`}
						onClick={scrollToSection}
					>
						Start your journey
					</button>
					<button
						type="button"
						className="aximo-default-btn pill aximo-header-btn lya-header-freebie-btn"
						onClick={() => openFreebiePopup(CTA_SECTION.HEADER)}
					>
						Get your FREE Un-Overwhelm Guide
					</button>
				</div>
			</div>
		</>
	);
}

export default HeaderButton;
