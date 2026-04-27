const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "sudhita@leverageyouradhd.com";

function jsonResponse(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8" },
	});
}

function toBase64(buffer) {
	let binary = "";
	const bytes = new Uint8Array(buffer);
	for (let i = 0; i < bytes.byteLength; i += 1) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
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
		const { email } = await request.json();

		if (!email || typeof email !== "string") {
			return jsonResponse({ error: "A valid email is required." }, 400);
		}

		if (!env.RESEND_API_KEY) {
			return jsonResponse({ error: "Server email config is missing." }, 500);
		}

		const pdfUrl = new URL("/assets/pdfs/freebie.pdf", request.url).toString();
		const pdfResponse = await fetch(pdfUrl);
		if (!pdfResponse.ok) {
			return jsonResponse(
				{ error: "freebie.pdf not found at public/assets/pdfs/freebie.pdf" },
				500
			);
		}

		const pdfArrayBuffer = await pdfResponse.arrayBuffer();
		const pdfBase64 = toBase64(pdfArrayBuffer);

		const resendResponse = await fetch(RESEND_ENDPOINT, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: env.MAIL_FROM || DEFAULT_FROM,
				to: [email],
				subject: "Your free ADHD brain dump guide",
				html: "<p>Thanks for requesting your free guide. It is attached to this email.</p>",
				text: "Thanks for requesting your free guide. It is attached to this email.",
				attachments: [
					{
						filename: "freebie.pdf",
						content: pdfBase64,
					},
				],
			}),
		});

		if (!resendResponse.ok) {
			const errorBody = await resendResponse.text();
			return jsonResponse(
				{ error: `Email provider rejected request: ${errorBody}` },
				500
			);
		}

		await appendToGoogleSheet(env, {
			type: "freebie",
			email,
			timestamp: new Date().toISOString(),
		});

		return jsonResponse({ ok: true });
	} catch (error) {
		return jsonResponse(
			{
				error:
					error instanceof Error
						? error.message
						: "Unable to send email right now. Please try again shortly.",
			},
			500
		);
	}
}
