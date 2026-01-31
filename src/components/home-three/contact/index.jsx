import StarShapeHalfImg from "../../../assets/images/v3/star-shape-half2.png";
import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "../../animation/FadeInStaggerTwo";
import ContactForm from "./ContactForm";
import {InlineWidget} from 'react-calendly'
import { PopupWidget } from "react-calendly";


function Contact() {
	return (
		<div id="contact-us" className="section aximo-section-padding2 position-relative overflow-hidden  navy-bg">
			<div className="container">
				<FadeInStaggerTwo className="row">
					<FadeInStaggerTwoChildren className="col-lg-7">
						<div className="aximo-default-content familjen-grotesk m-right-gap">
							<h2 className="navy-bg">Coaching is a partnership.</h2>
							<br/>
							<p>We’ll collaborate to understand how ADHD affects you. You’re the expert in your life; my job is not to tell you what to do. </p> 
							<p>My approach is grounded in transformational coaching principles to guide you as you identify your challenges, strengths, and goals. </p>
							
							<p>Together, we’ll understand how your brain is wired and design practical solutions to amplify your inherent strengths. </p>

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
						<div className="aximo-form-wrap2 white-bg">
							<InlineWidget url="https://calendly.com/leverageyouradhd/30min" styles={{
  height: '600px'
}} />
						</div>
					</FadeInStaggerTwoChildren>
				</FadeInStaggerTwo>
			</div>
			<div className="aximo-star-shape-half2">
				<img src={StarShapeHalfImg} alt="StarShapeHalfImg" />
			</div>
		</div>
	);
}

export default Contact;
