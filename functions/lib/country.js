/**
 * Prefer form-provided country; otherwise use Cloudflare CF-IPCountry (ISO code → name).
 */
export function resolveCountry(request, bodyCountry) {
	const fromBody =
		typeof bodyCountry === "string" ? bodyCountry.trim() : "";
	if (fromBody) return fromBody;

	const cfCode = request.headers.get("CF-IPCountry");
	if (cfCode && cfCode !== "XX" && cfCode !== "T1") {
		try {
			return (
				new Intl.DisplayNames(["en"], { type: "region" }).of(cfCode) ||
				cfCode
			);
		} catch {
			return cfCode;
		}
	}

	return "Unknown";
}
