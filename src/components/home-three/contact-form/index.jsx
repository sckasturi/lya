import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const INQUIRY_OPTIONS = [
	{ value: "", label: "Select a topic…" },
	{ value: "general", label: "General information" },
	{ value: "adhd-coaching", label: "ADHD coaching" },
	{ value: "group-coaching", label: "Group coaching" },
	{ value: "speaking-engagements", label: "Speaking engagements" },
	{ value: "professional-connection", label: "Professional connection" },
];

export function ContactFormFields({ initialInquiry = "" }) {
	const [fields, setFields] = useState({
		name: "",
		email: "",
		reason: initialInquiry,
		message: "",
	});
	const [status, setStatus] = useState("idle");

	useEffect(() => {
		if (initialInquiry) {
			setFields((prev) => ({ ...prev, reason: initialInquiry }));
		}
	}, [initialInquiry]);

	function handleChange(e) {
		setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setStatus("submitting");

		const reasonLabel =
			INQUIRY_OPTIONS.find((o) => o.value === fields.reason)?.label || fields.reason;

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: fields.name,
					email: fields.email,
					phone: "Not provided",
					message: fields.message,
					reason: reasonLabel,
				}),
			});
			const data = await res.json();
			if (res.ok && data?.ok) {
				setStatus("success");
				setFields({ name: "", email: "", reason: initialInquiry, message: "" });
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	}

	if (status === "success") {
		return (
			<div className="lya-contact-success">
				<div className="lya-contact-success-icon">✓</div>
				<h3>Message sent!</h3>
				<p>Thank you for reaching out. I&apos;ll be in touch soon.</p>
				<button type="button" className="lya-contact-reset" onClick={() => setStatus("idle")}>
					Send another message
				</button>
			</div>
		);
	}

	return (
		<form className="lya-contact-form" onSubmit={handleSubmit} noValidate>
			<div className="lya-contact-row">
				<div className="lya-contact-field">
					<label htmlFor="cf-name">Your name</label>
					<input
						id="cf-name"
						type="text"
						name="name"
						placeholder="Jane Smith"
						value={fields.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="lya-contact-field">
					<label htmlFor="cf-email">Email address</label>
					<input
						id="cf-email"
						type="email"
						name="email"
						placeholder="jane@example.com"
						value={fields.email}
						onChange={handleChange}
						required
					/>
				</div>
			</div>

			<div className="lya-contact-field">
				<label htmlFor="cf-reason">Why are you reaching out?</label>
				<select
					id="cf-reason"
					name="reason"
					value={fields.reason}
					onChange={handleChange}
					required
					className={fields.reason === "" ? "lya-select-placeholder" : ""}
				>
					{INQUIRY_OPTIONS.map((opt) => (
						<option key={opt.value} value={opt.value} disabled={opt.value === ""}>
							{opt.label}
						</option>
					))}
				</select>
			</div>

			<div className="lya-contact-field">
				<label htmlFor="cf-message">Message</label>
				<textarea
					id="cf-message"
					name="message"
					rows={5}
					placeholder="Tell me a bit about yourself and what you're hoping to work on…"
					value={fields.message}
					onChange={handleChange}
					required
				/>
			</div>

			{status === "error" && (
				<p className="lya-contact-error">
					Something went wrong — please try again or email me directly.
				</p>
			)}

			<button type="submit" className="lya-contact-submit" disabled={status === "submitting"}>
				{status === "submitting" ? "Sending…" : "Send message"}
			</button>
		</form>
	);
}

function ContactFormSection() {
	const [searchParams] = useSearchParams();
	const inquiry = searchParams.get("inquiry") || "";

	return (
		<div className="section aximo-section-padding navy-bg" id="lya-contact-section">
			<div className="container">
				<div className="lya-contact-header">
					<p className="lya-contact-eyebrow">Get in touch</p>
					<h2>Ready to start your journey?</h2>
					<p className="lya-contact-subtext">Reach out and I&apos;ll get back to you soon.</p>
				</div>
				<ContactFormFields initialInquiry={inquiry} />
			</div>
		</div>
	);
}

export default ContactFormSection;
