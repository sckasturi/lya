export const CTA_COLOR_EXPERIMENT_ID = "cta_color_v1";
export const CTA_COLOR_VARIANTS = ["red", "teal"];
const STORAGE_KEY = "lya-cta-color-variant";
const EXPOSURE_KEY = "lya-cta-color-exposure-sent";

function isValidVariant(value) {
	return CTA_COLOR_VARIANTS.includes(value);
}

function readUrlVariant() {
	if (typeof window === "undefined") return null;
	const value = new URLSearchParams(window.location.search).get("cta_color");
	if (value === "reset") return "reset";
	return isValidVariant(value) ? value : null;
}

function assignRandomVariant() {
	return Math.random() < 0.5 ? "red" : "teal";
}

function persistVariant(variant) {
	try {
		localStorage.setItem(STORAGE_KEY, variant);
	} catch {
		// Ignore storage failures (private mode, etc.).
	}
}

function readStoredVariant() {
	try {
		const value = localStorage.getItem(STORAGE_KEY);
		return isValidVariant(value) ? value : null;
	} catch {
		return null;
	}
}

function applyVariantClass(variant) {
	const root = document.documentElement;
	CTA_COLOR_VARIANTS.forEach((name) => {
		root.classList.remove(`lya-cta-variant-${name}`);
	});
	root.classList.add(`lya-cta-variant-${variant}`);
	root.dataset.ctaColorVariant = variant;
}

function trackExposure(variant) {
	if (typeof window.gtag !== "function") return;
	try {
		if (sessionStorage.getItem(EXPOSURE_KEY) === variant) return;
		sessionStorage.setItem(EXPOSURE_KEY, variant);
	} catch {
		// Still send the event if sessionStorage is unavailable.
	}

	window.gtag("set", "user_properties", {
		cta_color_variant: variant,
	});

	window.gtag("event", "cta_color_experiment_exposure", {
		experiment_id: CTA_COLOR_EXPERIMENT_ID,
		cta_color_variant: variant,
	});
}

/** Returns the active CTA color variant (`red` control or `teal` treatment). */
export function getCtaColorVariant() {
	if (typeof document !== "undefined" && document.documentElement.dataset.ctaColorVariant) {
		return document.documentElement.dataset.ctaColorVariant;
	}
	return readStoredVariant() || "red";
}

export function getCtaColorExperimentParams() {
	const variant = getCtaColorVariant();
	return {
		experiment_id: CTA_COLOR_EXPERIMENT_ID,
		cta_color_variant: variant,
	};
}

/**
 * Assigns a sticky variant, applies `html.lya-cta-variant-*`, and sends GA4 exposure.
 * Call once before the app renders to avoid a color flash.
 */
export function initCtaColorExperiment() {
	if (typeof window === "undefined") return getCtaColorVariant();

	const urlVariant = readUrlVariant();
	if (urlVariant === "reset") {
		try {
			localStorage.removeItem(STORAGE_KEY);
			sessionStorage.removeItem(EXPOSURE_KEY);
		} catch {
			// Ignore.
		}
	}

	const forcedVariant = urlVariant === "reset" ? null : urlVariant;
	const storedVariant = forcedVariant || readStoredVariant();
	const variant = storedVariant || assignRandomVariant();

	persistVariant(variant);
	applyVariantClass(variant);
	trackExposure(variant);

	return variant;
}
