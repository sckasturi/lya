import Shape2Img from "../../../assets/images/v3/shape2.png";
import Thumb1Img from "../../../assets/images/lya/sudhita-about.webp";
import FadeInLeft from "../../animation/FadeInLeft";
import ICF from "../../../assets/images/lya/icf.webp";
import ACO from "../../../assets/images/lya/aco.webp";
import CHADD from "../../../assets/images/lya/chadd.webp";
import WISER from "../../../assets/images/lya/wiser.webp";
import ADDA from "../../../assets/images/lya/adda.webp";
function About() {
	return (
		<div className="section aximo-section-padding  navy-bg">
			<div className="container">
				<div className="row">
					<div className="col-lg-4">
						<div className="lya-letter-aside">
							<FadeInLeft className="aximo-content-thumb">
								<img
									src={Thumb1Img}
									alt="Sudhita Kasturi"
									width="720"
									height="900"
									loading="lazy"
									decoding="async"
								/>
								<div className="aximo-thumb-shape1">
									<img src={Shape2Img} alt="" loading="lazy" decoding="async" />
								</div>
							</FadeInLeft>
							<div className="lya-letter-credentials">
								<p className="lya-letter-credentials-label">Certified &amp; credentialed by</p>
								<div className="lya-letter-credentials-logos">
									<img src={ICF} width="64" height="64" alt="International Coaching Federation" loading="lazy" decoding="async" />
									<img src={ACO} width="64" height="60" alt="ADHD Coaches Organization" loading="lazy" decoding="async" />
									<img src={CHADD} width="60" height="64" alt="CHADD" loading="lazy" decoding="async" />
									<img src={WISER} width="61" height="64" alt="WISER" loading="lazy" decoding="async" />
									<img src={ADDA} width="64" height="39" alt="ADDA" loading="lazy" decoding="async" />
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-7 offset-lg-1">
						<div className="aximo-default-content lya-letter">
							<h2 className="navy-bg">
								&ldquo;She has so much potential. She just needs to work harder.&rdquo;
							</h2>
							<p>
								I grew up hearing that my whole life. While I was great at thinking outside
								the box and coming up with creative solutions to problems, the ease with
								which my peers managed multiple homework and project deadlines evaded me.
							</p>
							<p>
								In grad school, my compensatory mechanisms reached their limit, and I went
								from having multiple research options to being on academic probation.{" "}
								<strong>
									My self-esteem tanked, and I panicked daily.
								</strong>
							</p>
							<p>
								Nearly 10 years later, work, home, parenthood, and taking too much on led
								to a diagnosis of inattentive ADHD. Unlike other diagnoses, no one offered
								any information or tools to address what I was experiencing. It was left to
								my husband and me to figure things out.
							</p>
							<p>
								My journey to find answers for myself, to be true to what I was being called
								to do, led me to study spirituality and philosophy. I understood that ADHD was
								an essential part of me, and my success and happiness lay in journeying with
								it and not by denying it.
							</p>
							<p className="lya-letter-pullquote">
								I believe there is a reason we are born the way we are.
							</p>
							<p>
								From my upbringing and education on two different continents, to marriage,
								motherhood, and my aspirations to effect change, everything led me to be
								right here, right now.
							</p>
							<p>
								With a better understanding of our brains and neurochemistry, we can reduce
								shame and negative self-talk and address the demands of day-to-day life.{" "}
								<strong>
									We can thrive and succeed with our ADHD, not in spite of it.
								</strong>{" "}
								I hope you too can leverage your ADHD and live authentically.
							</p>
							<p className="lya-letter-signature" aria-label="Sudhita">
								- Sudhita
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
