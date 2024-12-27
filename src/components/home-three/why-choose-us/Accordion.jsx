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
						The First Four Sessions
					</button>
				</h3>
				<div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
							Will explore your immediate ADHD-related dilemmas and how they are affecting your day-to-day life.<br/>
							I will support you while we put systems and strategies in place to help you work with your ADHD rather than against it.
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
						The Next Four Sessions
					</button>
				</h3>
				<div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						Go beyond the immediate dilemmas to take a deeper look at how your ADHD is affecting your personal and professional life.
for deeper exploration and take a more holistic approach to the issues at hand.
to internalize and strengthen your sense of agency in designing the life that works for you. 
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
						Beyond That
					</button>
				</h3>
				<div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						Text and email access (on weekdays) between sessions is included for any questions you may have.
You are welcome to continue coaching with me for extended periods by renewing packages or signing up for additional sessions. 
					</div>
				</div>
			</FadeInStaggerTwoChildren>
		</FadeInStaggerTwo>
	);
}

export default Accordion;
