import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const COUNTRY_LIST = [
	"United States",
	"Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
	"Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
	"Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
	"Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
	"Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
	"Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
	"Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Croatia", "Cuba",
	"Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
	"Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
	"Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
	"Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
	"Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran",
	"Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
	"Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
	"Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
	"Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
	"Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
	"Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
	"New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
	"Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay",
	"Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
	"Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
	"San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
	"Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
	"Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
	"Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
	"Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
	"Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
	"United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Vanuatu",
	"Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

export const INQUIRY_OPTIONS = [
	{ value: "", label: "Select a topic…" },
	{ value: "general", label: "General information" },
	{ value: "adhd-coaching", label: "ADHD coaching" },
	{ value: "group-coaching", label: "Group coaching" },
	{ value: "speaking-engagements", label: "Speaking engagements" },
	{ value: "professional-connection", label: "Professional connection" },
];

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

export function ContactFormFields({ initialInquiry = "" }) {
	const recaptchaRef = useRef(null);
	const [fields, setFields] = useState({
		name: "",
		email: "",
		country: "",
		reason: initialInquiry,
		message: "",
	});
	const [recaptchaToken, setRecaptchaToken] = useState("");
	const [status, setStatus] = useState("idle");

	useEffect(() => {
		if (initialInquiry) {
			setFields((prev) => ({ ...prev, reason: initialInquiry }));
		}
	}, [initialInquiry]);

	function handleChange(e) {
		setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		if (status === "validation") setStatus("idle");
	}

	async function handleSubmit(e) {
		e.preventDefault();

		if (!fields.name.trim() || !fields.email.trim() || !fields.country || !fields.reason || !fields.message.trim()) {
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

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: fields.name,
					email: fields.email,
					country: fields.country || "Not provided",
					phone: "Not provided",
					message: fields.message,
					reason: reasonLabel,
					recaptchaToken,
				}),
			});
			const data = await res.json();
			if (res.ok && data?.ok) {
				setStatus("success");
				setFields({ name: "", email: "", country: "", reason: initialInquiry, message: "" });
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

			<div className="lya-contact-row">
				<div className="lya-contact-field">
					<label htmlFor="cf-country">Country</label>
					<select
						id="cf-country"
						name="country"
						value={fields.country}
						onChange={handleChange}
						required
						className={fields.country === "" ? "lya-select-placeholder" : ""}
					>
						<option value="">Select your country…</option>
						{COUNTRY_LIST.map((c) => (
							<option key={c} value={c}>{c}</option>
						))}
					</select>
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
