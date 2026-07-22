import { resolveCountry } from "../lib/country.js";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "sudhita@leverageyouradhd.com";
const DEFAULT_TO = "sudhita@leverageyouradhd.com";

function jsonResponse(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8" },
	});
}

async function appendToGoogleSheet(env, payload) {
	if (!env.GOOGLE_SHEETS_WEBHOOK_URL) {
		return;
	}

	const response = await fetch(env.GOOGLE_SHEETS_WEBHOOK_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			secret: env.GOOGLE_SHEETS_WEBHOOK_SECRET || "",
			...payload,
		}),
	});

	if (!response.ok) {
		const responseBody = await response.text();
		throw new Error(`Google Sheets logging failed: ${responseBody}`);
	}

	let responseJson = null;
	try {
		responseJson = await response.json();
	} catch {
		// Some webhooks return empty body on success.
		return;
	}

	if (responseJson && responseJson.ok === false) {
		throw new Error(
			`Google Sheets logging failed: ${responseJson.error || "Unknown webhook error"}`
		);
	}
}

export async function onRequestPost(context) {
	try {
		const { request, env } = context;
		const { name, email, country, phone, message, reason, turnstileToken } =
			await request.json();
		const resolvedCountry = resolveCountry(request, country);

		if (!name || !email || !message) {
			return jsonResponse({ error: "All fields are required." }, 400);
		}

		if (env.TURNSTILE_SECRET_KEY) {
			if (!turnstileToken) {
				return jsonResponse({ error: "Verification failed — please retry." }, 400);
			}
			const body = new URLSearchParams();
			body.set("secret", env.TURNSTILE_SECRET_KEY);
			body.set("response", turnstileToken);
			const ip = request.headers.get("CF-Connecting-IP");
			if (ip) body.set("remoteip", ip);
			const verifyRes = await fetch(
				"https://challenges.cloudflare.com/turnstile/v0/siteverify",
				{
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body,
				},
			);
			const verifyData = await verifyRes.json();
			if (!verifyData.success) {
				return jsonResponse({ error: "Verification failed — please retry." }, 400);
			}
		}

		if (!env.RESEND_API_KEY) {
			return jsonResponse({ error: "Server email config is missing." }, 500);
		}

		const resendResponse = await fetch(RESEND_ENDPOINT, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: env.MAIL_FROM || DEFAULT_FROM,
				to: [env.MAIL_TO || DEFAULT_TO],
				reply_to: email,
				subject: `New contact form message from ${name}`,
				html: `
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Country:</strong> ${resolvedCountry}</p>
					<p><strong>Reason:</strong> ${reason || "Not provided"}</p>
					<p><strong>Message:</strong></p>
					<p>${message}</p>
				`,
				text: `Name: ${name}\nEmail: ${email}\nCountry: ${resolvedCountry}\nReason: ${reason || "Not provided"}\n\nMessage:\n${message}`,
			}),
		});

		if (!resendResponse.ok) {
			const errorBody = await resendResponse.text();
			console.error("[contact] Resend API failed:", resendResponse.status, errorBody);
			return jsonResponse(
				{ error: `Email provider rejected request: ${errorBody}` },
				500
			);
		}

		context.waitUntil(
			appendToGoogleSheet(env, {
				type: "contact",
				name,
				email,
				country: resolvedCountry,
				reason: reason || "Not provided",
				message,
				timestamp: new Date().toISOString(),
			}).catch((err) => console.error("[contact] Google Sheets logging failed:", err)),
		);

		return jsonResponse({ ok: true });
	} catch (error) {
		console.error("[contact] Unhandled error:", error);
		return jsonResponse(
			{
				error:
					error instanceof Error
						? error.message
						: "Unable to send your message right now. Please try again shortly.",
			},
			500
		);
	}
}
