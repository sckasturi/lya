import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import EmailPrivacyNotice from "../../common/EmailPrivacyNotice";

export const INQUIRY_OPTIONS = [
	{ value: "", label: "Select a topic…" },
	{ value: "general", label: "General information" },
	{ value: "adhd-coaching", label: "ADHD coaching" },
	{ value: "group-coaching", label: "Group coaching" },
	{ value: "speaking-engagements", label: "Speaking engagements" },
	{ value: "professional-connection", label: "Professional connection" },
];

const COACHING_INTRO =
	"Share a bit more about yourself, and I will send you a link to schedule your free consultation.";

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

function buildCoachingMessage(fields) {
	return [
		`Line of work: ${fields.lineOfWork}`,
		`How ADHD is getting in your way: ${fields.adhdChallenge}`,
		`Beneficial aspects of ADHD: ${fields.adhdBenefit}`,
		`Goals for coaching: ${fields.coachingGoals}`,
	].join("\n\n");
}

export function ContactFormFields({ initialInquiry = "" }) {
	const recaptchaRef = useRef(null);
	const [fields, setFields] = useState({
		name: "",
		email: "",
		reason: initialInquiry,
		message: "",
		lineOfWork: "",
		adhdChallenge: "",
		adhdBenefit: "",
		coachingGoals: "",
	});
	const [recaptchaToken, setRecaptchaToken] = useState("");
	const [status, setStatus] = useState("idle");

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
			return (
				fields.lineOfWork.trim() &&
				fields.adhdChallenge.trim() &&
				fields.adhdBenefit.trim() &&
				fields.coachingGoals.trim()
			);
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
		const message = isCoachingInquiry
			? buildCoachingMessage(fields)
			: fields.message;

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
					lineOfWork: "",
					adhdChallenge: "",
					adhdBenefit: "",
					coachingGoals: "",
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
	const nameLabel = isCoachingInquiry ? "First and last name" : "Your name";

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
		<form className="lya-contact-form" onSubmit={handleSubmit} noValidate>
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
				<>
					<p className="lya-contact-coaching-intro">{COACHING_INTRO}</p>
					<div className="lya-contact-field">
						<label htmlFor="cf-line-of-work">What is your line of work?</label>
						<input
							id="cf-line-of-work"
							type="text"
							name="lineOfWork"
							value={fields.lineOfWork}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="lya-contact-field">
						<label htmlFor="cf-adhd-challenge">How is ADHD getting in your way?</label>
						<textarea
							id="cf-adhd-challenge"
							name="adhdChallenge"
							rows={4}
							value={fields.adhdChallenge}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="lya-contact-field">
						<label htmlFor="cf-adhd-benefit">Is there anything about your ADHD you find beneficial?</label>
						<textarea
							id="cf-adhd-benefit"
							name="adhdBenefit"
							rows={4}
							value={fields.adhdBenefit}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="lya-contact-field">
						<label htmlFor="cf-coaching-goals">
							To make the most of our 30 minutes, please share your goals for coaching.
						</label>
						<textarea
							id="cf-coaching-goals"
							name="coachingGoals"
							rows={4}
							value={fields.coachingGoals}
							onChange={handleChange}
							required
						/>
					</div>
				</>
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

			<EmailPrivacyNotice />

			{siteKey && (
				<div className="lya-contact-recaptcha">
					<ReCAPTCHA
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
