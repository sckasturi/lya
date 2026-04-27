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
		const { name, email, phone, message, reason } = await request.json();

		if (!name || !email || !phone || !message) {
			return jsonResponse({ error: "All fields are required." }, 400);
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
					<p><strong>Phone:</strong> ${phone}</p>
					<p><strong>Reason:</strong> ${reason || "Not provided"}</p>
					<p><strong>Message:</strong></p>
					<p>${message}</p>
				`,
				text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nReason: ${reason || "Not provided"}\n\nMessage:\n${message}`,
			}),
		});

		if (!resendResponse.ok) {
			const errorBody = await resendResponse.text();
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
				phone,
				reason: reason || "Not provided",
				message,
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
						: "Unable to send your message right now. Please try again shortly.",
			},
			500
		);
	}
}
