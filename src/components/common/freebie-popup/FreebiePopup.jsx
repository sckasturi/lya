import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { OPEN_FREEBIE_POPUP_EVENT } from "../../../lib/openFreebiePopup";
import "./freebie-popup.css";

const STORAGE_KEY = "lya-freebie-popup-dismissed";

export default function FreebiePopup() {
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("idle");
	const [message, setMessage] = useState("");
	const recaptchaRef = useRef(null);
	const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

	useEffect(() => {
		const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
		if (!dismissed) {
			setIsOpen(true);
		}
		const onOpen = () => setIsOpen(true);
		window.addEventListener(OPEN_FREEBIE_POPUP_EVENT, onOpen);
		return () =>
			window.removeEventListener(OPEN_FREEBIE_POPUP_EVENT, onOpen);
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
				<motion.div
					className="freebie-popup-overlay"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.22 }}
					onClick={closePopup}
					role="presentation"
				>
					<motion.div
						className="freebie-popup-card"
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						transition={{ duration: 0.22 }}
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
						<h3 id="freebie-popup-title">Get the free ADHD guide</h3>
						<p>
							Enter your name and email and we&apos;ll send the PDF to your
							inbox.
						</p>
						<form className="freebie-popup-form" onSubmit={handleSubmit}>
							<input
								type="text"
								name="name"
								placeholder="Your name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								autoComplete="name"
								disabled={status === "loading" || status === "success"}
							/>
							<input
								type="email"
								name="email"
								placeholder="Your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								disabled={status === "loading" || status === "success"}
							/>
							{siteKey ? (
								<div className="freebie-popup-recaptcha">
									<ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} />
								</div>
							) : (
								<p className="freebie-popup-recaptcha-hint">
									Add{" "}
									<code>VITE_RECAPTCHA_SITE_KEY</code> to enable reCAPTCHA.
								</p>
							)}
							<button
								type="submit"
								disabled={status === "loading" || status === "success"}
							>
								{status === "loading" ? "Sending..." : "Send me the guide"}
							</button>
						</form>
						{message && (
							<div
								className={`freebie-popup-message ${
									status === "success" ? "success" : "error"
								}`}
							>
								{message}
							</div>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
