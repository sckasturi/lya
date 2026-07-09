import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import DeferredRecaptcha from "../DeferredRecaptcha";
import EmailPrivacyNotice from "../EmailPrivacyNotice";
import { detectClientCountry } from "../../../lib/detectCountry";
import { OPEN_FREEBIE_POPUP_EVENT } from "../../../lib/openFreebiePopup";
import "./freebie-popup.css";

const STORAGE_KEY = "lya-freebie-popup-dismissed";

export default function FreebiePopup() {
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("idle");
	const [message, setMessage] = useState("");
	const [detectedCountry, setDetectedCountry] = useState("");
	const [formTouched, setFormTouched] = useState(false);
	const recaptchaRef = useRef(null);
	const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

	// Only look up the visitor's country once the popup is actually shown.
	useEffect(() => {
		if (!isOpen || detectedCountry) return;
		detectClientCountry().then(setDetectedCountry);
	}, [isOpen, detectedCountry]);

	useEffect(() => {
		const onOpen = () => setIsOpen(true);
		window.addEventListener(OPEN_FREEBIE_POPUP_EVENT, onOpen);

		const dismissed = localStorage.getItem(STORAGE_KEY) === "1";

		// Auto-open on first scroll — or after 8s for visitors who never
		// scroll. Keeps the popup (and its animation work) out of the
		// initial-load window that Lighthouse measures. Re-check the
		// dismissed flag at fire time so the fallback timer can't re-open
		// a popup the visitor already closed.
		const autoOpen = () => {
			if (localStorage.getItem(STORAGE_KEY) === "1") return;
			setIsOpen(true);
		};
		let timer = null;
		if (!dismissed) {
			window.addEventListener("scroll", autoOpen, { once: true, passive: true });
			window.addEventListener("touchmove", autoOpen, { once: true, passive: true });
			timer = window.setTimeout(autoOpen, 8000);
		}

		return () => {
			window.removeEventListener(OPEN_FREEBIE_POPUP_EVENT, onOpen);
			window.removeEventListener("scroll", autoOpen);
			window.removeEventListener("touchmove", autoOpen);
			if (timer) window.clearTimeout(timer);
		};
	}, []);

	const closePopup = () => {
		setIsOpen(false);
		localStorage.setItem(STORAGE_KEY, "1");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");

		if (!name.trim()) {
			setMessage("Please enter your name.");
			return;
		}

		if (!email.trim()) {
			setMessage("Please enter your email.");
			return;
		}

		let recaptchaToken = "";
		if (siteKey) {
			recaptchaToken = recaptchaRef.current?.getValue() || "";
			if (!recaptchaToken) {
				setMessage("Please complete the reCAPTCHA.");
				return;
			}
		}

		setStatus("loading");
		try {
			const endpoint =
				import.meta.env.VITE_FREEBIE_API_URL || "/api/freebie";
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: name.trim(),
					email: email.trim(),
					country: detectedCountry || undefined,
					recaptchaToken: recaptchaToken || undefined,
				}),
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				throw new Error(data.error || "Something went wrong.");
			}
			setStatus("success");
			setMessage("Check your inbox for the free guide.");
			recaptchaRef.current?.reset();
		} catch (err) {
			setStatus("error");
			setMessage(err.message || "Something went wrong.");
			recaptchaRef.current?.reset();
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<m.div
					className="freebie-popup-overlay"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.15, ease: "easeOut" }}
					onClick={closePopup}
					role="presentation"
				>
					<m.div
						className="freebie-popup-card"
						initial={{ opacity: 0, y: 16, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.98 }}
						transition={{ duration: 0.18, ease: "easeOut" }}
						onClick={(e) => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
						aria-labelledby="freebie-popup-title"
					>
						<button
							type="button"
							className="freebie-popup-close"
							onClick={closePopup}
							aria-label="Close"
						>
							×
						</button>

						<AnimatePresence mode="wait">
						{status === "success" ? (
							<m.div
								key="success"
								className="freebie-popup-success"
								initial={{ opacity: 0, scale: 0.92, y: 10 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.22, ease: "easeOut" }}
							>
								<m.div
									className="freebie-popup-success-icon"
									aria-hidden="true"
									initial={{ scale: 0, rotate: -20 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
								>
									✓
								</m.div>
								<h3 id="freebie-popup-title">Check your inbox!</h3>
								<p>
									The free guide is on its way to <strong>{email}</strong>.
									Check your spam folder if you don&apos;t see it in a minute.
								</p>
								<button
									type="button"
									className="freebie-popup-done-btn"
									onClick={closePopup}
								>
									Done
								</button>
							</m.div>
						) : (
							<m.div
								key="form"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.15 }}
							>
								<h3 id="freebie-popup-title">Get the FREE Un-Overwhelm Guide</h3>
								<p>
									Enter your name and email and we&apos;ll send the PDF to your
									inbox.
								</p>
								<form
								className="freebie-popup-form"
								onSubmit={handleSubmit}
								onFocusCapture={() => setFormTouched(true)}
							>
								<input
									type="text"
									name="name"
									placeholder="Your name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									autoComplete="name"
									disabled={status === "loading"}
									required
								/>
								<input
									type="email"
									name="email"
									placeholder="Your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									autoComplete="email"
									disabled={status === "loading"}
									required
								/>
								<EmailPrivacyNotice className="freebie-popup-privacy" />
									{siteKey ? (
										<div className="freebie-popup-recaptcha">
											<DeferredRecaptcha
												active={formTouched}
												ref={recaptchaRef}
												sitekey={siteKey}
											/>
										</div>
									) : (
										<p className="freebie-popup-recaptcha-hint">
											Add <code>VITE_RECAPTCHA_SITE_KEY</code> to enable
											reCAPTCHA.
										</p>
									)}
									<button type="submit" disabled={status === "loading"}>
										{status === "loading" ? "Sending..." : "Send me the guide"}
									</button>
								</form>
								{message && (
									<div className="freebie-popup-message error">{message}</div>
								)}
							</m.div>
						)}
						</AnimatePresence>
					</m.div>
				</m.div>
			)}
		</AnimatePresence>
	);
}
