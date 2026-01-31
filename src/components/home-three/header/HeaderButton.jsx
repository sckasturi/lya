import { Link } from "react-router-dom";
function HeaderButton() {
	const scrollToSection = () => {
		const target = document.getElementById("contact-us");
		if (target) {
			target.scrollIntoView({ behavior: "smooth" }); // Smooth scroll animation
		}
	};

	return (
		<div className="header-btn header-btn-l1 ms-auto d-none d-xs-inline-flex">
			<div className="aximo-header-wrap">
				<button className="aximo-default-btn pill aximo-header-btn red-btn" onClick={scrollToSection}>
					<span className="aximo-label-up">Start your journey</span>
					<span className="aximo-label-up">Start your journey</span>
				</button>
			</div>
		</div>
	);
}

export default HeaderButton;
