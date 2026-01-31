import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "../../animation/FadeInStaggerTwo";

function Accordion() {
	return (
		<FadeInStaggerTwo className="accordion aximo-accordion-wrap" id="aximo-accordion">
			<FadeInStaggerTwoChildren className="accordion-item">
				<h3 className="accordion-header">
					<button
						className="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseOne"
					>
						One-on-One Coaching
					</button>
				</h3>
				<div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
							Personalized, one-on-one coaching sessions address your ADHD-related challenges and leverage your unique strengths and talents to navigate these. Engage in a transformative journey that enhances your mindset, creates actionable strategies to help you thrive, and propels you toward success.

					</div>
				</div>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren className="accordion-item">
				<h3 className="accordion-header" id="headingOne">
					<button
						className="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseTwo"
					>
						Coaching Cohorts for South Asian Professionals with ADHD
					</button>
				</h3>
				<div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						Join a community of like-minded individuals in our dynamic group coaching sessions. This collaborative environment fosters learning, connection, accountability, and shared learning experiences to enhance both personal and professional growth.
					</div>
				</div>
			</FadeInStaggerTwoChildren>
			{/*<FadeInStaggerTwoChildren className="accordion-item">
				<h3 className="accordion-header">
					<button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseThree"
					>
						Ongoing Coaching Support for Former Coaching Clients
					</button>
				</h3>
				<div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						Ongoing coaching support builds on your progress during coaching. It empowers you to navigate your ADHD challenges while fostering self-growth and resilience. These periodic checking is can can be bi-weekly or monthly, depending on your needs.
					</div>
				</div>
			</FadeInStaggerTwoChildren>*/}
			<FadeInStaggerTwoChildren className="accordion-item">
				<h3 className="accordion-header">
					<button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseFour"
					>
						Speaking Engagements
					</button>
				</h3>
				<div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						Sudhita draws upon years of experience and knowledge to deliver an impactful experience designed to educate and empower. Whether it’s a corporate gathering, conference, panel, or workshop, Sudhita engages with her audience by weaving in her own lived experience with ADHD. Sudhita is an invited speaker at Sonos, United States Agency for Global Media, Bitcamp, Technica, Lorraine County Community College, and local and international panels. 
					</div>
				</div>
			</FadeInStaggerTwoChildren>
		</FadeInStaggerTwo>
	);
}

export default Accordion;
