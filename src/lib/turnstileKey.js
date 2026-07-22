// Cloudflare Turnstile site key (public by design — the secret key lives
// only in the Cloudflare Pages environment as TURNSTILE_SECRET_KEY).
// Can be overridden per-environment with VITE_TURNSTILE_SITE_KEY.
export const TURNSTILE_SITE_KEY =
	import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAAD62NNlygs3IEKIe";
