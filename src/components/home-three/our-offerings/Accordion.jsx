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
						Personalized ADHD coaching
					</button>
				</h3>
				<div id="collapseOne" className="accordion-collapse collapse show">
					<div className="accordion-body">
						<p>One-on-one coaching sessions tailored to your ADHD related challenges. Enhance your mindset and create actionable strategies to help you thrive and propel toward success.</p>
					</div>
				</div>
			</FadeInStaggerTwoChildren>

			<FadeInStaggerTwoChildren className="accordion-item">
				<h3 className="accordion-header">
					<button
						className="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseTwo"
					>
						Group coaching for South Asian professionals with ADHD
					</button>
				</h3>
				<div id="collapseTwo" className="accordion-collapse collapse show">
					<div className="accordion-body">
						<p>Group coaching sessions designed for South Asian professionals to navigate the challenges of ADHD in a dynamic and collaborative environment. Enhance your personal and professional growth through shared learning, connection, and accountability.</p>
					</div>
				</div>
			</FadeInStaggerTwoChildren>

			<FadeInStaggerTwoChildren className="accordion-item">
				<h3 className="accordion-header">
					<button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseThree"
					>
						ADHD speaking engagements
					</button>
				</h3>
				<div id="collapseThree" className="accordion-collapse collapse">
					<div className="accordion-body">
						<p>I draw upon years of experience and knowledge of ADHD and AuDHD (Autism-ADHD) to educate and empower audiences of all types. I bring energy and enthusiasm, along with insight and actionable strategies. I&apos;ve spoken locally and internationally at corporate gatherings, conference panels, and workshops. Past speaking engagements include Sonos, United States Agency for Global Media, Bitcamp, Technica, Lorain County Community College, and Salwan Public School.</p>
					</div>
				</div>
			</FadeInStaggerTwoChildren>

		</FadeInStaggerTwo>
	);
}

export default Accordion;
