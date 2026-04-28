import { useRef, useState } from "react";

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
			<div className="col-lg-6 d-flex align-items-center">
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
									<strong>Website:</strong>{" "}
									<a href="https://videobysrij.com" target="_blank" rel="noreferrer">Srijay Kasturi</a>
									<br />
									<strong>Logo:</strong>{" "}
									<a href="https://shiv-aurts.com" target="_blank" rel="noreferrer">Shivali Aurora Tandon</a>
									<br />
									<strong>Copy:</strong>{" "}
									<a href="https://sravaniwrites.com" target="_blank" rel="noreferrer">Sravani Hotha</a>
								</span>
							)}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default FooterBottom;
