import { getCtaColorExperimentParams } from "./ctaColorExperiment";

/** CTA identifiers for GA4 custom event `cta_click`. */
export const CTA = {
	START_JOURNEY: "start_your_journey",
	UN_OVERWHELM_GUIDE: "un_overwhelm_guide",
};

/** Where on the page the CTA was clicked. */
export const CTA_SECTION = {
	HERO: "hero",
	HEADER: "header",
	OUR_OFFERINGS: "our_offerings",
	TESTIMONIALS: "testimonials",
	MOBILE_NAV: "mobile_nav",
};

export function trackCtaClick(ctaName, section) {
	if (typeof window.gtag !== "function") return;
	window.gtag("event", "cta_click", {
		cta_name: ctaName,
		cta_section: section,
		...getCtaColorExperimentParams(),
	});
}
