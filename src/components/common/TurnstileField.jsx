import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const SCRIPT_SRC =
	"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise = null;
function loadTurnstile() {
	if (typeof window !== "undefined" && window.turnstile) {
		return Promise.resolve();
	}
	if (!scriptPromise) {
		scriptPromise = new Promise((resolve, reject) => {
			const s = document.createElement("script");
			s.src = SCRIPT_SRC;
			s.async = true;
			s.defer = true;
			s.onload = () => resolve();
			s.onerror = (err) => {
				scriptPromise = null;
				reject(err);
			};
			document.head.appendChild(s);
		});
	}
	return scriptPromise;
}

/**
 * Invisible Cloudflare Turnstile verification. Loads its (tiny) script only
 * once `active` is true — e.g. after the visitor focuses the form — so it
 * stays off the critical path. With an "invisible" widget there is nothing
 * to click; `onToken` fires automatically once verification completes.
 */
const TurnstileField = forwardRef(function TurnstileField(
	{ active, siteKey, onToken },
	ref
) {
	const containerRef = useRef(null);
	const widgetIdRef = useRef(null);
	const onTokenRef = useRef(onToken);
	onTokenRef.current = onToken;

	useImperativeHandle(ref, () => ({
		reset() {
			if (widgetIdRef.current !== null && window.turnstile) {
				window.turnstile.reset(widgetIdRef.current);
			}
		},
	}));

	useEffect(() => {
		if (!active || !siteKey) return undefined;
		let cancelled = false;

		loadTurnstile()
			.then(() => {
				if (cancelled || !containerRef.current || widgetIdRef.current !== null) {
					return;
				}
				widgetIdRef.current = window.turnstile.render(containerRef.current, {
					sitekey: siteKey,
					callback: (token) => onTokenRef.current(token),
					"expired-callback": () => onTokenRef.current(""),
					"error-callback": () => onTokenRef.current(""),
				});
			})
			.catch(() => {
				// Script blocked/failed — let the form submit; the server
				// decides whether to require a token.
			});

		return () => {
			cancelled = true;
			if (widgetIdRef.current !== null && window.turnstile) {
				window.turnstile.remove(widgetIdRef.current);
				widgetIdRef.current = null;
			}
		};
	}, [active, siteKey]);

	if (!siteKey) return null;
	return <div ref={containerRef} className="lya-turnstile" />;
});

export default TurnstileField;
