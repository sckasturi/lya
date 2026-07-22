import StarShapeHalfImg from "../../../assets/images/v3/star-shape-half2.png";
import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "../../animation/FadeInStaggerTwo";
import { ContactFormFields } from "../contact-form";


function Contact() {
	return (
		<div id="contact-us" className="section aximo-section-padding2 position-relative overflow-hidden  navy-bg">
			<div className="container">
				<FadeInStaggerTwo className="row">
					<FadeInStaggerTwoChildren className="col-lg-7">
						<div className="aximo-default-content familjen-grotesk m-right-gap">
							<h2 className="navy-bg">Coaching is a partnership</h2>
							<br/>
							<p>We&apos;ll collaborate to understand how ADHD affects you. You&apos;re the expert in your life; my job is not to tell you what to do.</p>
							<p> My approach is grounded in transformational coaching principles to guide you as you identify your challenges, strengths, and goals.</p>
							<p> I am an LGBTQ+ ally and work with all cultural, gender, and sexual identities with or without a formal diagnosis of ADHD. </p>
							<p>Together, we&apos;ll understand how your brain is wired and design practical solutions to amplify your inherent strengths.</p>

							{/*<div className="aximo-contact-info">
								
								<ul>
									<li>
										<a href="tel:571-376-8033">
											<i className="icon-phone"></i>
											571-376-8033
										</a>
									</li>
									<li>
										<a href="mailto:example@gmail.com">
											<i className="icon-message"></i>
											hello@leverageyouradhd.com
										</a>
									</li>
								</ul>
							</div>*/}
						</div>
					</FadeInStaggerTwoChildren>
					<FadeInStaggerTwoChildren className="col-lg-5">
						<div className="lya-offerings-form-panel">
							<div className="lya-contact-header">
								<h3>Get in touch</h3>
							</div>
							<ContactFormFields />
						</div>
					</FadeInStaggerTwoChildren>
				</FadeInStaggerTwo>

				<div className="lya-next-steps">
					<ol className="lya-next-steps-list">
						<li>
							<span className="lya-next-steps-num" aria-hidden="true">1</span>
							<div>
								<strong>Book a free 30-minute call</strong>
								<p>Pick any time that works for you — no payment info needed.</p>
							</div>
						</li>
						<li>
							<span className="lya-next-steps-num" aria-hidden="true">2</span>
							<div>
								<strong>We just talk</strong>
								<p>No prep required. Share as much or as little as you like.</p>
							</div>
						</li>
						<li>
							<span className="lya-next-steps-num" aria-hidden="true">3</span>
							<div>
								<strong>Decide if we&apos;re a fit</strong>
								<p>No pressure, no obligation — the call is yours either way.</p>
							</div>
						</li>
					</ol>
				</div>
			</div>
			<div className="aximo-star-shape-half2">
				<img src={StarShapeHalfImg} alt="" loading="lazy" decoding="async" />
			</div>
		</div>
	);
}

export default Contact;
