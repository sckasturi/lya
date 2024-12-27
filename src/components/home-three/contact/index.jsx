import StarShapeHalfImg from "../../../assets/images/v3/star-shape-half2.png";
import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "../../animation/FadeInStaggerTwo";
import ContactForm from "./ContactForm";
import {InlineWidget} from 'react-calendly'
import { PopupWidget } from "react-calendly";


function Contact() {
	return (
		<div id="contact-us" className="section dark-bg aximo-section-padding2 position-relative overflow-hidden">
			<div className="container">
				<FadeInStaggerTwo className="row">
					<FadeInStaggerTwoChildren className="col-lg-7">
						<div className="aximo-default-content familjen-grotesk light m-right-gap">
							<h2>FREE Coaching Consultations</h2>
							<p>This is a great opportunity for us to meet before we enter a coaching relationship.</p> 
							<p>There is no charge for this call and no obligation to move forward with me as a coach. We will meet over the phone or zoom to understand the specific ADHD-related issues you are dealing with.</p>

<p>I will share how coaching can support you and what a strengths- and mindfulness-based approach looks like.</p>

<p>If we are a good fit for each other we can discuss the next steps for you</p>
							
							<div className="aximo-contact-info">
								<h3>Contact me directly:</h3>
								<ul>
									<li>
										<a href="tel:088-234-6849">
											<i className="icon-phone"></i>
											571-376-8033
										</a>
									</li>
									<li>
										<a href="mailto:example@gmail.com">
											<i className="icon-message"></i>
											sudhita@leverageyouradhd.com
										</a>
									</li>
								</ul>
							</div>
						</div>
					</FadeInStaggerTwoChildren>
					<FadeInStaggerTwoChildren className="col-lg-5">
						<div className="aximo-form-wrap2">
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
