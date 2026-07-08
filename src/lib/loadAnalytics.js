const GA_ID = "G-V7B1YRQQZ0";

let analyticsRequested = false;

export function ensureGtagStub() {
	if (typeof window === "undefined") return;
	window.dataLayer = window.dataLayer || [];
	if (typeof window.gtag !== "function") {
		window.gtag = function gtag() {
			window.dataLayer.push(arguments);
		};
	}
}

function injectAnalytics() {
	if (analyticsRequested || typeof window === "undefined") return;
	analyticsRequested = true;
	ensureGtagStub();

	const script = document.createElement("script");
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
	script.onload = () => {
		window.gtag("js", new Date());
		window.gtag("config", GA_ID, { send_page_view: false });
	};
	document.head.appendChild(script);
}

/** Load GA after first interaction or idle time so it does not block LCP. */
export function scheduleAnalytics() {
	if (typeof window === "undefined") return;

	const run = () => injectAnalytics();
	const idle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 2500));

	idle(run);

	["pointerdown", "keydown", "scroll", "touchstart"].forEach((eventName) => {
		window.addEventListener(eventName, run, { once: true, passive: true });
	});
}
