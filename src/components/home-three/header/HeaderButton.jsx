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
				<div className="aximo-social-icon header-social">
					<ul>
						{/*<li>
							<a href="https://twitter.com/" target="_blank">
								<i className="icon-twitter"></i>
							</a>
						</li>*
						<li>
							<a href="https://facebook.com/" target="_blank">
								<i className="icon-facebook"></i>
							</a>
						</li>*/}
						<li>
							<a href="https://www.instagram.com/leverageyouradhd" target="_blank">
								<i className="icon-instagram"></i>
							</a>
						</li>
						<li>
							<a href="https://www.linkedin.com/company/leverage-your-adhd/" target="_blank">
								<i className="icon-linkedin"></i>
							</a>
						</li>
					</ul>
				</div>
				<button className="aximo-default-btn pill aximo-header-btn yellow-btn" onClick={scrollToSection}>
					<span className="aximo-label-up" >Book a consultation</span>
					<span className="aximo-label-up">Book a consultation</span>
				</button>
			</div>
		</div>
	);
}

export default HeaderButton;
