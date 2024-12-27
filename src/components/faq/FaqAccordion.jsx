import Star2Img from "../../assets/images/v1/star2.png";
import FadeInUp from "../animation/FadeInUp";
function FaqAccordion() {
	return (
		<div className="section aximo-section-padding3">
			<div className="container">
				<div className="aximo-section-title center">
					<h2>
						<span className="aximo-title-animation">
							These FAQs help
							<span className="aximo-title-icon">
								<img src={Star2Img} alt="Star" />
							</span>
						</span>
						clients learn about us
					</h2>
				</div>

				<FadeInUp className="accordion aximo-accordion-wrap" id="aximo-accordion">
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button
								className="accordion-button"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseOne"
							>
								What is ADHD?
							</button>
						</h3>
						<div
							id="collapseOne"
							className="accordion-collapse collapse show"
							data-bs-parent="#aximo-accordion"
						>
							<div className="accordion-body">
								It doesn't exist.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h3 className="accordion-header" id="headingOne">
							<button
								className="accordion-button"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseTwo"
							>
								Why is ADHD?
							</button>
						</h3>
						<div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
							<div className="accordion-body">
								How can you have a why when it isn't real?
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button
								className="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseThree"
							>
								Who is ADHD?
							</button>
						</h3>
						<div
							id="collapseThree"
							className="accordion-collapse collapse"
							data-bs-parent="#aximo-accordion"
						>
							<div className="accordion-body">
								Nobody. It's fake and in your head.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button
								className="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseFour"
							>
								Where is ADHD?
							</button>
						</h3>
						<div
							id="collapseFour"
							className="accordion-collapse collapse"
							data-bs-parent="#aximo-accordion"
						>
							<div className="accordion-body">
								In your imagination.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button
								className="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseFive"
							>
								How is ADHD?
							</button>
						</h3>
						<div
							id="collapseFive"
							className="accordion-collapse collapse"
							data-bs-parent="#aximo-accordion"
						>
							<div className="accordion-body">
								Terrible.
							</div>
						</div>
					</div>
				</FadeInUp>
			</div>
		</div>
	);
}

export default FaqAccordion;
