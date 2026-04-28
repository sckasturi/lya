import { openFreebiePopup } from "../../../lib/openFreebiePopup";

function HeaderButton() {
	const scrollToSection = () => {
		const target = document.getElementById("contact-us");
		if (target) {
			target.scrollIntoView({ behavior: "smooth" }); // Smooth scroll animation
		}
	};

	return (
		<div className="header-btn header-btn-l1 ms-auto d-none d-lg-inline-flex">
			<div className="aximo-header-wrap lya-cta-row">
				<button
					type="button"
					className="aximo-default-btn pill aximo-header-btn lya-header-journey-btn"
					onClick={scrollToSection}
				>
					Start your journey
				</button>
				<button
					type="button"
					className="aximo-default-btn pill aximo-header-btn lya-header-freebie-btn"
					onClick={openFreebiePopup}
				>
					Get your free ADHD guide
				</button>
			</div>
		</div>
	);
}

export default HeaderButton;
