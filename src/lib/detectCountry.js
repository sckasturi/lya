let cachedCountry = null;
let inflight = null;

/** Best-effort country name for form payloads (used when server has no CF-IPCountry). */
export async function detectClientCountry() {
	if (cachedCountry !== null) return cachedCountry;
	if (inflight) return inflight;

	inflight = (async () => {
		try {
			const res = await fetch("https://ipapi.co/json/", {
				signal: AbortSignal.timeout(4000),
			});
			if (res.ok) {
				const data = await res.json();
				const name = data.country_name || data.country || "";
				cachedCountry = typeof name === "string" ? name.trim() : "";
				return cachedCountry;
			}
		} catch {
			// ignore — server may still resolve via CF-IPCountry
		}
		cachedCountry = "";
		return cachedCountry;
	})();

	return inflight;
}
