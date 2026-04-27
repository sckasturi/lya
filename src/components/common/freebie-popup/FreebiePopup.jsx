import { useEffect, useState } from "react";
import "./freebie-popup.css";

const POPUP_STORAGE_KEY = "lya-freebie-popup-dismissed";
const API_ENDPOINT = import.meta.env.VITE_FREEBIE_API_URL || "/api/freebie";

function FreebiePopup() {
	const [isOpen, setIsOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState("");
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const dismissed = localStorage.getItem(POPUP_STORAGE_KEY);
		if (!dismissed) {
			setIsOpen(true);
		}
	}, []);

	const closePopup = () => {
		localStorage.setItem(POPUP_STORAGE_KEY, "true");
		setIsOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsSubmitting(true);
		setMessage("");
		setHasError(false);

		try {
			const response = await fetch(API_ENDPOINT, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result?.error || "Could not send your free guide.");
			}

			setMessage("Success! Please check your inbox for your free guide.");
			setEmail("");
			localStorage.setItem(POPUP_STORAGE_KEY, "true");
		} catch (error) {
			setHasError(true);
			setMessage(error.message || "Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="freebie-popup-overlay" role="dialog" aria-modal="true">
			<div className="freebie-popup-card">
				<button
					type="button"
					className="freebie-popup-close"
					aria-label="Close popup"
					onClick={closePopup}
				>
					&times;
				</button>
				<h3>Would you like to get your free guide to solving your ADHD brain dumps?</h3>
				<form onSubmit={handleSubmit} className="freebie-popup-form">
					<input
						type="email"
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="Enter your email"
						aria-label="Email address"
					/>
					<button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Sending..." : "Send My Free Guide"}
					</button>
				</form>
				{message && (
					<p className={`freebie-popup-message ${hasError ? "error" : "success"}`}>
						{message}
					</p>
				)}
			</div>
		</div>
	);
}

export default FreebiePopup;
