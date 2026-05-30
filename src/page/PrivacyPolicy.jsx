import { useEffect, useState } from "react";
import BreadCrumb from "../components/common/Breadcrumb";
import "../assets/css/privacy-policy.css";

function PrivacyPolicy() {
	const [html, setHtml] = useState("");
	const [error, setError] = useState(false);

	useEffect(() => {
		const base = import.meta.env.BASE_URL || "/";
		fetch(`${base}legal/privacy-policy-body.html`)
			.then((res) => {
				if (!res.ok) throw new Error("Failed to load");
				return res.text();
			})
			.then(setHtml)
			.catch(() => setError(true));
	}, []);

	return (
		<>
			<BreadCrumb title="Privacy Policy" />
			<section className="section aximo-section-padding cream-bg lya-privacy-policy-section">
				<div className="container">
					{error && (
						<p className="lya-contact-error">
							Unable to load the privacy policy. Please try again later.
						</p>
					)}
					{html && (
						<div
							className="lya-privacy-policy-content"
							dangerouslySetInnerHTML={{ __html: html }}
						/>
					)}
				</div>
			</section>
		</>
	);
}

export default PrivacyPolicy;
