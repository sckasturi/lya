import { Link } from "react-router-dom";

export const PRIVACY_POLICY_PATH = "/privacy-policy";

export default function EmailPrivacyNotice({ className = "" }) {
	return (
		<p className={`lya-email-privacy-notice ${className}`.trim()}>
			By submitting your email, you agree to our{" "}
			<Link to={PRIVACY_POLICY_PATH}>Privacy Policy</Link>.
		</p>
	);
}
