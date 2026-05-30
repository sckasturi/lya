import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PRIVACY_POLICY_PATH } from "../../common/EmailPrivacyNotice";

function FooterBottom() {
	const [open, setOpen] = useState(false);
	const hideTimer = useRef(null);

	const show = () => {
		clearTimeout(hideTimer.current);
		setOpen(true);
	};
	const hide = () => {
		hideTimer.current = setTimeout(() => setOpen(false), 150);
	};

	return (
		<div className="row">
			<div className="col-lg-6 d-flex align-items-center flex-wrap gap-2">
				<div className="aximo-copywright seven">
					<p>
						&copy; Copyright 2026
						<span
							className="lya-credits-trigger"
							onMouseEnter={show}
							onMouseLeave={hide}
						>
							{" "}· credits
							{open && (
								<span
									className="lya-credits-tooltip"
									onMouseEnter={show}
									onMouseLeave={hide}
								>
									<strong>Website Design:</strong>{" "}
									<a href="https://videobysrij.com" target="_blank" rel="noreferrer">Srijay Kasturi</a>
									<br />
									<strong>Logo Design:</strong>{" "}
									<a href="https://shiv-aurts.com" target="_blank" rel="noreferrer">Shivali Aurora Tandon</a>
									<br />
									<strong>Content Design:</strong>{" "}
									<a href="https://sravaniwrites.com" target="_blank" rel="noreferrer">Sravani Hotha</a>
								</span>
							)}
						</span>
					</p>
				</div>
				<nav className="lya-footer-legal" aria-label="Legal">
					<Link to={PRIVACY_POLICY_PATH}>Privacy Policy</Link>
				</nav>
			</div>
		</div>
	);
}

export default FooterBottom;
