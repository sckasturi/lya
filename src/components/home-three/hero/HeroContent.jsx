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
				<h1>Leverage Your ADHD</h1>
			</FadeInStaggerTwoChildren>
			{/*<FadeInStaggerTwoChildren>
			<br/><h1>I’m Sudhita</h1>
			</FadeInStaggerTwoChildren>*/}
			<FadeInStaggerTwoChildren>

				<h2>Hi, I'm Sudhita Kasturi.</h2>				<br/>
				<h3>Navigate your ADHD dilemmas in partnership with me, a certified and credentialed ADHD Life Coach, dedicated to helping you live authentically.</h3>
				<div className="aximo-hero-subscription">	
						<button 
						id="aximo-hero-subscription-btn" 
						type="button" 
						onClick={scrollToSection}
					>
							<span className="aximo-label-up">Start your journey</span>
							<span className="aximo-label-up">Start your journey</span>
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
