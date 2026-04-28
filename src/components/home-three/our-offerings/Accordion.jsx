import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "../../animation/FadeInStaggerTwo";
import { openFreebiePopup } from "../../../lib/openFreebiePopup";

function Accordion() {
	function scrollToContact() {
		document.getElementById("contact-us")?.scrollIntoView({ behavior: "smooth" });
	}

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
				<div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						<p>One-on-one coaching sessions with Sudhita are tailored to your ADHD related challenges. Enhance your mindset and create actionable strategies to help you thrive and propel toward success.</p>
						<div className="lya-cta-row" style={{ marginTop: 4 }}>
							<button type="button" className="aximo-offerings-cta" onClick={scrollToContact}>
								Start your journey
							</button>
							<button
								type="button"
								className="aximo-offerings-cta lya-offerings-cta--outline"
								onClick={openFreebiePopup}
							>
								Get your free ADHD guide
							</button>
						</div>
					</div>
				</div>
			</FadeInStaggerTwoChildren>

			<FadeInStaggerTwoChildren className="accordion-item">
				<h3 className="accordion-header">
					<button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseTwo"
					>
						Group coaching for South Asian professionals with ADHD
					</button>
				</h3>
				<div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						<p>Our group coaching sessions are designed for South Asian professionals to navigate the challenges of ADHD in a dynamic and collaborative environment. Enhance your personal and professional growth through shared learning, connection and accountability.</p>
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
				<div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						<p>I draw upon years of experience and knowledge of ADHD and Autism ADHD or AuDHD to educate and empower audiences of all types. Whether it&apos;s a corporate gathering, conference, panel or workshop, I provide insight, inspiration and actionable strategies. I&apos;ve spoken at local and international companies including Sonos, United States Agency for Global Media, Bitcamp, Technica and Lorain County Community College.</p>
					</div>
				</div>
			</FadeInStaggerTwoChildren>

		</FadeInStaggerTwo>
	);
}

export default Accordion;
