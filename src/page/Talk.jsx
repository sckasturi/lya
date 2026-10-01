import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import EmailPrivacyNotice from "../components/common/EmailPrivacyNotice";
import TurnstileField from "../components/common/TurnstileField";
import { detectClientCountry } from "../lib/detectCountry";
import { TURNSTILE_SITE_KEY } from "../lib/turnstileKey";
import LogoImg from "../assets/images/logo/logo-white.svg";
import PhotoImg from "../assets/images/lya/sudhita-about.webp";
import "../assets/css/talk.css";

// Landing page for the QR codes shown at Sudhita's talks.
// Each QR code adds a ?src= tag that ends up in the spreadsheet's "QR Code"
// column, e.g. /talk?src=handout (printed handout) or
// /talk?src=real-estate-talk (presentation slides).

// Keys must match COACHING_INTERESTS in functions/api/freebie.js.
const COACHING_OPTIONS = [
	{ key: "one_on_one", label: "One-on-one coaching" },
	{ key: "cohort", label: "Group coaching cohort" },
	{ key: "speaking", label: "A talk or workshop for my organization" },
	{ key: "exploring", label: "Just exploring for now" },
];

// About content below the form, adapted from the printed handout (/handout).
const OFFERINGS = [
	{
		title: "Personalized ADHD coaching",
		body: "I partner with my clients to educate them about their unique wiring, reframe their perspectives, co-create actionable strategies, and empower them to make the change they desire and thrive with their ADHD.",
	},
	{
		title: "Group coaching for South Asian professionals",
		body: "Group cohorts for South Asian professionals to navigate the challenges of ADHD. We will strengthen personal engagement and professional growth through shared learning, connection, and accountability.",
	},
	{
		title: "Speaking engagements",
		body: "I draw upon my lived experience with ADHD, along with my knowledge and passion for ADHD coaching, to educate, engage, and enliven audiences.",
	},
];

const WHO_I_HELP = [
	"C-Suite Executives",
	"Academics & Post-Docs",
	"Students on Academic Probation",
	"Medical & Law Students",
	"Parents of Neurodiverse Children",
];

const HIGHLIGHTS = [
	"Facilitator: ADDA South Asian Virtual Peer Support Group",
	"DEIB Chair: ADHD Coaches Organization (ACO) Board",
	"Member: Family Advisory Board, UMass Chan Medical School",
	"Guest: Translating ADHD Podcast",
	"Speaker: Sonos, US Agency for Global Media, Bitcamp, Technica, Lorain County Community College, International Conference on ADHD",
];

const RATING_LABELS = {
	1: "Not for me",
	2: "It was okay",
	3: "Liked it",
	4: "Really liked it",
	5: "Loved it",
};

function Talk() {
	const [searchParams] = useSearchParams();
	const qrCode = searchParams.get("src") || "";

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [interests, setInterests] = useState([]);
	const [rating, setRating] = useState(0);
	const [status, setStatus] = useState("idle");
	const [message, setMessage] = useState("");
	const [country, setCountry] = useState("");
	const [formTouched, setFormTouched] = useState(false);
	const [turnstileToken, setTurnstileToken] = useState("");
	const turnstileRef = useRef(null);

	useEffect(() => {
		const previous = document.title;
		document.title = "Thanks for coming - Leverage Your ADHD";
		// Unlisted page: keep it out of search results.
		const robots = document.createElement("meta");
		robots.name = "robots";
		robots.content = "noindex";
		document.head.appendChild(robots);
		return () => {
			document.title = previous;
			robots.remove();
		};
	}, []);

	useEffect(() => {
		if (formTouched && !country) detectClientCountry().then(setCountry);
	}, [formTouched, country]);

	const toggleInterest = (key) => {
		setInterests((current) =>
			current.includes(key) ? current.filter((k) => k !== key) : [...current, key]
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");

		if (!email.trim()) {
			setMessage("Please enter your email.");
			return;
		}
		if (TURNSTILE_SITE_KEY && !turnstileToken) {
			setMessage("Still verifying you're human. Try again in a second.");
			return;
		}

		setStatus("loading");
		try {
			const endpoint = import.meta.env.VITE_FREEBIE_API_URL || "/api/freebie";
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: name.trim(),
					email: email.trim(),
					country: country || undefined,
					turnstileToken: turnstileToken || undefined,
					source: "talk",
					qrCode: qrCode || undefined,
					coachingInterest: interests,
					talkRating: rating || undefined,
				}),
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(data.error || "Something went wrong.");
			setStatus("success");
			if (typeof window.gtag === "function") {
				window.gtag("event", "generate_lead", { form_name: "talk_freebie", qr_code: qrCode || "none" });
			}
		} catch (err) {
			setStatus("error");
			setMessage(err.message || "Something went wrong.");
			if (typeof window.gtag === "function") {
				window.gtag("event", "form_error", {
					form_name: "talk_freebie",
					error_message: (err.message || "unknown").slice(0, 100),
				});
			}
			turnstileRef.current?.reset();
			setTurnstileToken("");
		}
	};

	const loading = status === "loading";

	return (
		<div className="lya-talk">
			<header className="lya-talk-bar teal-bg">
				<Link to="/" aria-label="Leverage Your ADHD home">
					<img src={LogoImg} alt="Leverage Your ADHD" width="96" height="32" />
				</Link>
			</header>

			<main className="lya-talk-main">
				{status === "success" ? (
					<div className="lya-talk-card lya-talk-success" role="status">
						<div className="lya-talk-success-icon" aria-hidden="true">
							✓
						</div>
						<h1>Check your inbox!</h1>
						<p>
							The Un-Overwhelm Guide is on its way to <strong>{email.trim()}</strong>. If you
							don&apos;t see it in a minute, check your spam folder.
						</p>
						<div className="lya-talk-next">
							<Link to="/resources" className="lya-talk-btn">
								Explore ADHD resources
							</Link>
							<Link to="/" className="lya-talk-btn lya-talk-btn--outline">
								Learn about coaching
							</Link>
						</div>
					</div>
				) : (
					<>
						<div className="lya-talk-intro">
							<p className="lya-talk-eyebrow">Thanks for coming</p>
							<h1>Get your FREE Un-Overwhelm Guide</h1>
							<p>Leave your email and I&apos;ll send the guide straight to your inbox.</p>
							<p className="lya-talk-signoff">Sudhita Kasturi, Certified ADHD Life Coach</p>
						</div>

						<form
							className="lya-talk-card lya-talk-form"
							onSubmit={handleSubmit}
							onFocusCapture={() => setFormTouched(true)}
							noValidate
						>
							<div className="lya-talk-field">
								<label htmlFor="talk-email">
									Email <span className="lya-talk-required">(required)</span>
								</label>
								<input
									id="talk-email"
									type="email"
									inputMode="email"
									autoComplete="email"
									placeholder="you@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled={loading}
									required
								/>
							</div>

							<div className="lya-talk-field">
								<label htmlFor="talk-name">First name</label>
								<input
									id="talk-name"
									type="text"
									autoComplete="given-name"
									placeholder="Your name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									disabled={loading}
								/>
							</div>

							<fieldset className="lya-talk-field">
								<legend>What kind of coaching interests you?</legend>
								<p className="lya-talk-hint">Pick any that apply.</p>
								<div className="lya-talk-chips">
									{COACHING_OPTIONS.map((option) => {
										const checked = interests.includes(option.key);
										return (
											<label
												key={option.key}
												className={`lya-talk-chip${checked ? " is-checked" : ""}`}
											>
												<input
													type="checkbox"
													checked={checked}
													onChange={() => toggleInterest(option.key)}
													disabled={loading}
												/>
												{option.label}
											</label>
										);
									})}
								</div>
							</fieldset>

							<fieldset className="lya-talk-field">
								<legend>How much did you like the talk?</legend>
								<div className="lya-talk-rating" role="radiogroup">
									{[1, 2, 3, 4, 5].map((n) => (
										<label
											key={n}
											className={`lya-talk-rating-option${rating === n ? " is-checked" : ""}`}
										>
											<input
												type="radio"
												name="talk-rating"
												value={n}
												checked={rating === n}
												onChange={() => setRating(n)}
												disabled={loading}
												aria-label={`${n}: ${RATING_LABELS[n]}`}
											/>
											{n}
										</label>
									))}
								</div>
								<div className="lya-talk-rating-scale" aria-hidden="true">
									<span>{RATING_LABELS[1]}</span>
									<span>{RATING_LABELS[5]}</span>
								</div>
							</fieldset>

							<EmailPrivacyNotice className="lya-talk-privacy" />
							<TurnstileField
								active={formTouched}
								ref={turnstileRef}
								siteKey={TURNSTILE_SITE_KEY}
								onToken={setTurnstileToken}
							/>

							<button type="submit" className="lya-talk-submit" disabled={loading}>
								{loading ? "Sending..." : "Send me the guide"}
							</button>

							{message && (
								<p className="lya-talk-error" role="alert">
									{message}
								</p>
							)}
						</form>
					</>
				)}

				<section className="lya-talk-about" aria-labelledby="talk-about-heading">
					<div className="lya-talk-about-head">
						<img src={PhotoImg} alt="Sudhita Kasturi" width="96" height="120" loading="lazy" decoding="async" />
						<div>
							<h2 id="talk-about-heading">Sudhita Kasturi</h2>
							<p className="lya-talk-about-title">Certified &amp; Credentialed ADHD Life Coach</p>
						</div>
					</div>
					<p>
						I coach high-potential professionals and academics globally, leveraging my experience as an
						educator, entrepreneur, and program director.
					</p>
					<p>
						My clients include Fortune 500 executives, federal employees, physicians, medical residents,
						and program managers. I empower them to embrace their ADHD and live happy, productive, and
						fulfilled lives.
					</p>
					<p>
						As the founder of Leverage Your ADHD, I am committed to raising awareness about ADHD,
						especially in underserved populations.
					</p>
				</section>

				<section className="lya-talk-section" aria-labelledby="talk-offer-heading">
					<h2 id="talk-offer-heading" className="lya-talk-section-heading">What I offer</h2>
					<div className="lya-talk-offerings">
						{OFFERINGS.map((item) => (
							<div key={item.title} className="lya-talk-offering">
								<h3>{item.title}</h3>
								<p>{item.body}</p>
							</div>
						))}
					</div>
				</section>

				<section className="lya-talk-section" aria-labelledby="talk-help-heading">
					<h2 id="talk-help-heading" className="lya-talk-section-heading">Who I can help</h2>
					<ul className="lya-talk-tags">
						{WHO_I_HELP.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</section>

				<section className="lya-talk-section" aria-labelledby="talk-highlights-heading">
					<h2 id="talk-highlights-heading" className="lya-talk-section-heading">Notable highlights</h2>
					<ul className="lya-talk-highlights">
						{HIGHLIGHTS.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</section>

				<section className="lya-talk-contact navy-bg" aria-labelledby="talk-contact-heading">
					<h2 id="talk-contact-heading">Get in touch</h2>
					<ul>
						<li>
							<a href="mailto:hello@leverageyouradhd.com">hello@leverageyouradhd.com</a>
						</li>
						<li>
							<Link to="/">leverageyouradhd.com</Link>
						</li>
						<li>
							<a href="https://linkedin.com/in/sudhitakasturi/" target="_blank" rel="noopener noreferrer">
								LinkedIn: sudhitakasturi
							</a>
						</li>
					</ul>
				</section>
			</main>
		</div>
	);
}

export default Talk;
