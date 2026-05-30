import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "../../animation/FadeInStaggerTwo";
import { CTA, CTA_SECTION, trackCtaClick } from "../../../lib/ctaEvents";
import { openFreebiePopup } from "../../../lib/openFreebiePopup";

function HeroContent() {
	const scrollToSection = () => {
		trackCtaClick(CTA.START_JOURNEY, CTA_SECTION.HERO);
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

				<h2>Hi, I'm Sudhita Kasturi</h2>				<br/>
				<h3>Navigate your ADHD challenges by partnering with me, a certified and credentialed ADHD Life Coach, dedicated to helping you live authentically.</h3>
				<div className="aximo-hero-subscription lya-cta-row">
					<button type="button" className="lya-hero-journey-btn" onClick={scrollToSection}>
						Start your journey
					</button>
					<button
						type="button"
						className="lya-hero-freebie-btn"
						onClick={() => openFreebiePopup(CTA_SECTION.HERO)}
					>
						Get your FREE Un-overwhelm Guide
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
