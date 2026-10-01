import { arrayBufferToBase64 } from "../lib/base64.js";
import { resolveCountry } from "../lib/country.js";

const DEFAULT_FROM = "sudhita@leverageyouradhd.com";

// Extra questions asked on the /talk page (people arriving from a QR code
// at one of Sudhita's talks). Keys come from the form; labels go to the sheet.
const COACHING_INTERESTS = {
	one_on_one: "One-on-one coaching",
	cohort: "Group coaching cohort",
	speaking: "Talk or workshop for my organization",
	exploring: "Just exploring",
};

function parseSource(value) {
	return value === "talk" ? "talk" : "website";
}

// QR-code tags arrive from the page URL (/talk?src=handout), so keep them to
// a short slug — they are written straight into the spreadsheet.
function parseQrCode(value) {
	if (typeof value !== "string") return "";
	return value
		.toLowerCase()
		.replace(/[^a-z0-9-]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 60);
}

function parseCoachingInterest(value) {
	if (!Array.isArray(value)) return [];
	return [...new Set(value)]
		.filter((key) => Object.prototype.hasOwnProperty.call(COACHING_INTERESTS, key))
		.map((key) => COACHING_INTERESTS[key]);
}

function parseTalkRating(value) {
	const n = Number(value);
	return Number.isInteger(n) && n >= 1 && n <= 5 ? n : "";
}

function escapeHtml(value) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

async function verifyTurnstile(secret, token, remoteIp) {
	const body = new URLSearchParams();
	body.set("secret", secret);
	body.set("response", token);
	if (remoteIp) body.set("remoteip", remoteIp);
	const res = await fetch(
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		{
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body,
		},
	);
	const data = await res.json();
	return data.success === true;
}

async function appendToGoogleSheet(env, payload) {
	const url = env.GOOGLE_SHEETS_WEBHOOK_URL;
	const secret = env.GOOGLE_SHEETS_WEBHOOK_SECRET;
	if (!url) return;

	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ ...payload, secret: secret || "" }),
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Google Sheets logging failed: ${text}`);
	}

	let json = null;
	try {
		json = await res.json();
	} catch {
		return;
	}
	if (json && json.ok === false) {
		throw new Error(
			`Google Sheets logging failed: ${json.error || "Unknown webhook error"}`,
		);
	}
}

function jsonResponse(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

export async function onRequestPost(context) {
	try {
		const { request, env } = context;

		let body;
		try {
			body = await request.json();
		} catch {
			return jsonResponse({ error: "Invalid JSON" }, 400);
		}

		const name = typeof body.name === "string" ? body.name.trim() : "";
		const email = typeof body.email === "string" ? body.email.trim() : "";
		const country = resolveCountry(request, body.country);
		const turnstileToken =
			typeof body.turnstileToken === "string" ? body.turnstileToken.trim() : "";
		const source = parseSource(body.source);
		const qrCode = source === "talk" ? parseQrCode(body.qrCode) : "";
		const coachingInterest = parseCoachingInterest(body.coachingInterest);
		const talkRating = source === "talk" ? parseTalkRating(body.talkRating) : "";

		// On the talk page the email is what matters; name is optional there.
		if (!name && source !== "talk") {
			return jsonResponse({ error: "Name is required." }, 400);
		}

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return jsonResponse({ error: "Please enter a valid email." }, 400);
		}

		const secretKey = env.TURNSTILE_SECRET_KEY;
		if (secretKey) {
			if (!turnstileToken) {
				return jsonResponse({ error: "Verification failed — please retry." }, 400);
			}
			const ok = await verifyTurnstile(
				secretKey,
				turnstileToken,
				request.headers.get("CF-Connecting-IP"),
			);
			if (!ok) {
				return jsonResponse({ error: "Verification failed — please retry." }, 400);
			}
		}

		const apiKey = env.RESEND_API_KEY;
		const from = env.MAIL_FROM || DEFAULT_FROM;

		if (!apiKey) {
			return jsonResponse({ error: "Email not configured." }, 500);
		}

		// Source file: src/assets/pdfs/freebie.pdf (copied to dist on build)
		const pdfUrl = new URL("/assets/pdfs/freebie.pdf", request.url);
		const pdfRes = env.ASSETS
			? await env.ASSETS.fetch(pdfUrl)
			: await fetch(pdfUrl);
		if (!pdfRes.ok) {
			return jsonResponse({ error: "Attachment missing." }, 500);
		}

		const pdfBase64 = arrayBufferToBase64(await pdfRes.arrayBuffer());

		const resourcesUrl = new URL("/resources", request.url).toString();
		const greeting = name ? `Hi ${name},` : "Hi there,";
		const intro =
			source === "talk"
				? "Thank you for coming to my talk! Here is the free guide I mentioned. The PDF is attached."
				: "Thanks for requesting the free guide. The PDF is attached.";
		const resourcesLine =
			"For more reliable information about ADHD, including podcasts, organizations, and my reading list, visit my resources page:";

		const resendPayload = {
			from: `Sudhita Kasturi <${from}>`,
			to: [email],
			subject: "Your FREE Un-Overwhelm Guide",
			html: `<p>${escapeHtml(greeting)}</p><p>${intro}</p><p>${resourcesLine} <a href="${resourcesUrl}">${resourcesUrl}</a></p><p>— Sudhita</p>`,
			text: `${greeting}\n\n${intro}\n\n${resourcesLine}\n${resourcesUrl}\n\n— Sudhita`,
			attachments: [
				{
					filename: "LYA-Un-Overwhelm-Guide.pdf",
					content: pdfBase64,
				},
			],
		};

		const resendResponse = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(resendPayload),
		});

		if (!resendResponse.ok) {
			const errorText = await resendResponse.text();
			console.error("[freebie] Resend API failed:", resendResponse.status, errorText);
			return jsonResponse(
				{ error: "Failed to send email.", details: errorText },
				502,
			);
		}

		context.waitUntil(
			appendToGoogleSheet(env, {
				type: "freebie",
				name,
				email,
				country,
				source,
				qrCode,
				coachingInterest: coachingInterest.join(", "),
				talkRating,
				timestamp: new Date().toISOString(),
			}).catch((err) => console.error("[freebie] Google Sheets logging failed:", err)),
		);

		return jsonResponse({ ok: true });
	} catch (error) {
		console.error("[freebie] Unhandled error:", error);
		return jsonResponse(
			{
				error:
					error instanceof Error
						? error.message
						: "Unable to send the guide right now. Please try again shortly.",
			},
			500,
		);
	}
}
