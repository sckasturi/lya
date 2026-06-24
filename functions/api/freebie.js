import { arrayBufferToBase64 } from "../lib/base64.js";
import { resolveCountry } from "../lib/country.js";

const DEFAULT_FROM = "sudhita@leverageyouradhd.com";

async function verifyRecaptcha(secret, token) {
	const body = new URLSearchParams();
	body.set("secret", secret);
	body.set("response", token);
	const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body,
	});
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
		const recaptchaToken =
			typeof body.recaptchaToken === "string" ? body.recaptchaToken.trim() : "";

		if (!name) {
			return jsonResponse({ error: "Name is required." }, 400);
		}

		if (!email) {
			return jsonResponse({ error: "Email is required." }, 400);
		}

		const secretKey = env.RECAPTCHA_SECRET_KEY;
		if (secretKey) {
			if (!recaptchaToken) {
				return jsonResponse({ error: "reCAPTCHA verification required." }, 400);
			}
			const ok = await verifyRecaptcha(secretKey, recaptchaToken);
			if (!ok) {
				return jsonResponse({ error: "reCAPTCHA verification failed." }, 400);
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

		const resendPayload = {
			from: `Sudhita Kasturi <${from}>`,
			to: [email],
			subject: "Your FREE Un-overwhelm Guide",
			html: `<p>Hi ${name},</p><p>Thanks for requesting the free guide. The PDF is attached.</p><p>— Sudhita</p>`,
			text: `Hi ${name},\n\nThanks for requesting the free guide. The PDF is attached.\n\n— Sudhita`,
			attachments: [
				{
					filename: "Leverage-Your-ADHD-Free-Guide.pdf",
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
				timestamp: new Date().toISOString(),
			}).catch(() => {}),
		);

		return jsonResponse({ ok: true });
	} catch (error) {
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
