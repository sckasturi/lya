import { readFile } from "node:fs/promises";
import { join } from "node:path";

const PDF_PATH = join(process.cwd(), "public", "assets", "pdfs", "freebie.pdf");

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
	if (!url || !secret) return;

	await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ ...payload, secret }),
	});
}

export async function onRequestPost(context) {
	const { request, env } = context;

	let body;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	const name = typeof body.name === "string" ? body.name.trim() : "";
	const email = typeof body.email === "string" ? body.email.trim() : "";
	const recaptchaToken =
		typeof body.recaptchaToken === "string" ? body.recaptchaToken.trim() : "";

	if (!name) {
		return new Response(JSON.stringify({ error: "Name is required." }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	if (!email) {
		return new Response(JSON.stringify({ error: "Email is required." }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	const secretKey = env.RECAPTCHA_SECRET_KEY;
	if (secretKey) {
		if (!recaptchaToken) {
			return new Response(
				JSON.stringify({ error: "reCAPTCHA verification required." }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}
		const ok = await verifyRecaptcha(secretKey, recaptchaToken);
		if (!ok) {
			return new Response(
				JSON.stringify({ error: "reCAPTCHA verification failed." }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}
	}

	const apiKey = env.RESEND_API_KEY;
	const from = env.MAIL_FROM;
	const to = env.MAIL_TO;

	if (!apiKey || !from || !to) {
		return new Response(JSON.stringify({ error: "Email not configured." }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}

	let attachmentContent;
	try {
		const fileBuffer = await readFile(PDF_PATH);
		attachmentContent = fileBuffer.toString("base64");
	} catch {
		return new Response(JSON.stringify({ error: "Attachment missing." }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}

	const resendPayload = {
		from,
		to: [email],
		subject: "Your free ADHD guide",
		html: `<p>Hi ${name},</p><p>Thanks for requesting the free guide. The PDF is attached.</p><p>— Sudhita</p>`,
		text: `Hi ${name},\n\nThanks for requesting the free guide. The PDF is attached.\n\n— Sudhita`,
		attachments: [
			{
				filename: "Leverage-Your-ADHD-Free-Guide.pdf",
				content: attachmentContent,
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
		return new Response(
			JSON.stringify({ error: "Failed to send email.", details: errorText }),
			{ status: 502, headers: { "Content-Type": "application/json" } },
		);
	}

	await appendToGoogleSheet(env, {
		type: "freebie",
		name,
		email,
		timestamp: new Date().toISOString(),
	});

	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
