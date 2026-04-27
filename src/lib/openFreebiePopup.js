/** Dispatched globally; FreebiePopup listens and opens. */
export const OPEN_FREEBIE_POPUP_EVENT = "lya-open-freebie-popup";

export function openFreebiePopup() {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new CustomEvent(OPEN_FREEBIE_POPUP_EVENT));
}
