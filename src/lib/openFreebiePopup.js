/** Dispatched globally; FreebiePopup listens and opens. */
export const OPEN_FREEBIE_POPUP_EVENT = "lya-open-freebie-popup";

/** @param {string} [section] — pass a `CTA_SECTION` value for GA4 */
export function openFreebiePopup(section) {
	if (typeof window === "undefined") return;
	if (section && typeof window.gtag === "function") {
		window.gtag("event", "cta_click", {
			cta_name: "un_overwhelm_guide",
			cta_section: section,
		});
	}
	window.dispatchEvent(new CustomEvent(OPEN_FREEBIE_POPUP_EVENT));
}
