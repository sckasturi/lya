import StarImg from "../../../assets/images/v3/star.svg";
import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "../../animation/FadeInStaggerTwo";
import { PopupButton } from "react-calendly";

function HeroContent() {
	const scrollToSection = () => {
		const target = document.getElementById("contact-us");
		if (target) {
			target.scrollIntoView({ behavior: "smooth" }); // Smooth scroll animation
		}
	};

	return (
		<FadeInStaggerTwo className="aximo-hero-content3">
			<FadeInStaggerTwoChildren>
				<h1>Hi! I'm Sudhita</h1>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren>
				<h2>
					I help you Leverage Your ADHD to live your best life.
				</h2>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren>
				<div className="aximo-hero-subscription">
					<p>Schedule a FREE 20 minutes coaching consultation to see if we are a good fit for each other.</p>
						
						<button 
						id="aximo-hero-subscription-btn" 
						type="button" 
						onClick={scrollToSection}
					>
							<span className="aximo-label-up">Get started</span>
							<span className="aximo-label-up">Get started</span>
						</button>
					
				</div>
				{/*<div className="aximo-hero-rating">
					<ul>
						<li>
							<img src={StarImg} alt="StarImg" />
							<img src={StarImg} alt="StarImg" />
							<img src={StarImg} alt="StarImg" />
							<img src={StarImg} alt="StarImg" />
							<img src={StarImg} alt="StarImg" />
						</li>
						<li>4.8/5 stars based on 1K client reviews</li>
					</ul>
				</div>*/}
			</FadeInStaggerTwoChildren>
		</FadeInStaggerTwo>
	);
}

export default HeroContent;
