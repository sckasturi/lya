import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DeferredRecaptcha from "../../common/DeferredRecaptcha";
import EmailPrivacyNotice from "../../common/EmailPrivacyNotice";

export const INQUIRY_OPTIONS = [
	{ value: "", label: "Select a topic…" },
	{ value: "general", label: "General information" },
	{ value: "adhd-coaching", label: "ADHD coaching" },
	{ value: "group-coaching", label: "Group coaching" },
	{ value: "speaking-engagements", label: "Speaking engagements" },
	{ value: "professional-connection", label: "Professional connection" },
];

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

function scrollToCalendly() {
	const target = document.getElementById("contact-us");
	if (target) {
		target.scrollIntoView({ behavior: "smooth" });
	}
}

export function ContactFormFields({ initialInquiry = "" }) {
	const recaptchaRef = useRef(null);
	const [fields, setFields] = useState({
		name: "",
		email: "",
		reason: initialInquiry,
		message: "",
	});
	const [recaptchaToken, setRecaptchaToken] = useState("");
	const [status, setStatus] = useState("idle");
	const [formTouched, setFormTouched] = useState(false);

	const isCoachingInquiry = fields.reason === "adhd-coaching";

	useEffect(() => {
		if (initialInquiry) {
			setFields((prev) => ({ ...prev, reason: initialInquiry }));
		}
	}, [initialInquiry]);

	function handleChange(e) {
		setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		if (status === "validation") setStatus("idle");
	}

	function isFormValid() {
		if (!fields.name.trim() || !fields.email.trim() || !fields.reason) {
			return false;
		}
		if (isCoachingInquiry) {
			return false;
		}
		return fields.message.trim();
	}

	async function handleSubmit(e) {
		e.preventDefault();

		if (!isFormValid()) {
			setStatus("validation");
			return;
		}

		if (siteKey && !recaptchaToken) {
			setStatus("validation");
			return;
		}

		setStatus("submitting");

		const reasonLabel =
			INQUIRY_OPTIONS.find((o) => o.value === fields.reason)?.label || fields.reason;
		const message = fields.message;

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: fields.name,
					email: fields.email,
					phone: "Not provided",
					message,
					reason: reasonLabel,
					recaptchaToken,
				}),
			});
			const data = await res.json();
			if (res.ok && data?.ok) {
				setStatus("success");
				setFields({
					name: "",
					email: "",
					reason: initialInquiry,
					message: "",
				});
				setRecaptchaToken("");
				recaptchaRef.current?.reset();
			} else {
				setStatus("error");
				recaptchaRef.current?.reset();
				setRecaptchaToken("");
			}
		} catch {
			setStatus("error");
			recaptchaRef.current?.reset();
			setRecaptchaToken("");
		}
	}

	const showValidationError = status === "validation";
	const nameLabel = "Your name";

	if (status === "success") {
		return (
			<div className="lya-contact-success">
				<div className="lya-contact-success-icon">✓</div>
				<p>Thank you for reaching out. I will be in touch with you soon.</p>
				<button type="button" className="lya-contact-reset" onClick={() => setStatus("idle")}>
					Send another message
				</button>
			</div>
		);
	}

	return (
		<form
			className="lya-contact-form"
			onSubmit={handleSubmit}
			onFocusCapture={() => setFormTouched(true)}
			noValidate
		>
			<div className="lya-contact-row">
				<div className="lya-contact-field">
					<label htmlFor="cf-name">{nameLabel}</label>
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

			{isCoachingInquiry ? (
				<div className="lya-contact-calendly-cta">
					<p>
						For ADHD coaching, book your free consultation using the scheduler above.
					</p>
					<button
						type="button"
						className="lya-contact-calendly-link"
						onClick={scrollToCalendly}
					>
						Schedule your free consultation
					</button>
				</div>
			) : (
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
			)}

			{!isCoachingInquiry && (
				<>
					<EmailPrivacyNotice />

					{siteKey && (
						<div className="lya-contact-recaptcha">
							<DeferredRecaptcha
								active={formTouched}
								ref={recaptchaRef}
								sitekey={siteKey}
								onChange={(token) => setRecaptchaToken(token || "")}
								onExpired={() => setRecaptchaToken("")}
							/>
						</div>
					)}

					{showValidationError && (
						<p className="lya-contact-error">
							Please fill in all fields{siteKey && !recaptchaToken ? " and complete the reCAPTCHA" : ""}.
						</p>
					)}
					{status === "error" && (
						<p className="lya-contact-error">
							Something went wrong — please try again or email me directly.
						</p>
					)}

					<button
						type="submit"
						className="lya-contact-submit"
						disabled={status === "submitting" || (!!siteKey && !recaptchaToken)}
					>
						{status === "submitting" ? "Sending…" : "Send message"}
					</button>
				</>
			)}
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
