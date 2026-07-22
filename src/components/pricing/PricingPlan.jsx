import { useState } from "react";
import PricingCard from "./PricingCard";

const professionPricingData = [
	{
		id: crypto.randomUUID(),
		title: "An aspiring senior and C-suite executive",
		plans: [
			{
				id: crypto.randomUUID(),
				problems: [
					"An overwhelming workload",
					"Meeting deadlines and staying accountable to colleagues",
					"Feeling stuck in your current position",
					"Managing your ADHD at this career stage",
					"Work-life balance",
				],
				solutions: [
					"Increase productivity with less exhaustion",
					"Decrease cognitive load while achieving benchmarks",
					"Chart a fulfilling career journey",
					"Customize solutions for your unique brain",
					"Find more time for what you love and enjoy",
				],
			},
		],
	},
	{
		id: crypto.randomUUID(),
		title: "An academic or post-doctoral student",
		plans: [
			{
				id: crypto.randomUUID(),
				problems: [
					"Amorphous deadlines or instructions",
					"The overwhelm nature of data and research",
					"The labor-intensive process of grant writing and publication",
					"Competing and conflicting priorities",
					"Career dissatisfaction and stagnation",
				],
				solutions: [
					"Make amorphous work more discrete",
					"Set well-paced mile markers and endpoints for research",
					"Ease the cyclical nature of grant writing and publication",
					"Manage various workflows and priorities",
					"Identify needs and chart career next steps",
				],
			},
		],
	},
	{
		id: crypto.randomUUID(),
		title: "A college student on probation",
		plans: [
			{
				id: crypto.randomUUID(),
				problems: [
					"Meeting academic standards",
					"Task fatigue and overwhelm with schoolwork",
					"Planning long-term assignments and projects",
					"Studying for tests and retaining information",
					"Balancing academics, self-care, and socializing",
				],
				solutions: [
					"Bridge the gap between academic standards and your performance",
					"Understand your unique learning style and abilities",
					"Plan and prioritize in a way that works for you",
					"Understand rubrics and attend to the details",
					"Ease adulting and succeed academically",
				],
			},
		],
	},
	{
		id: crypto.randomUUID(),
		title: "A medical or law student",
		plans: [
			{
				id: crypto.randomUUID(),
				problems: [
					"Working memory challenges while remembering detailed information",
					"Learning fatigue and unclear prep strategy",
					"Competing responsibilities of studying, prepping, and living",
					"Test anxiety and an exam spanning multiple hours and days",
				],
				solutions: [
					"Leverage multi-modal, active, and passive learning methodologies to retain specialized knowledge",
					"Chart a custom strategy with tools and processes that work for you",
					"Balance the rigor of school, test prep, adulting, and self-care",
					"Build stamina and plan for multiple days of intense testing",
				],
			},
		],
	},
	{
		id: crypto.randomUUID(),
		title: "A parent of neurodiverse children",
		plans: [
			{
				id: crypto.randomUUID(),
				problems: [
					"Traditional advice and techniques that are not working",
					"Overwhelming emotions, yours and your child's",
					"Battles or meltdowns over chores and schoolwork",
					"Lack of bandwidth for other children or your partner",
					"Stress and shame in social situations",
				],
				solutions: [
					"Design solutions and systems that bring calm to your family",
					"Understand emotions and how to honor them",
					"Establish rhythms that ease things for both you and your child",
					"Balance attention and energy among family members",
					"Navigate social situations with care and confidence",
				],
			},
		],
	},
];

function PricingPlan() {
	const [activeProfessionId, setActiveProfessionId] = useState(
		professionPricingData[0]?.id,
	);
	const activeProfession =
		professionPricingData.find((profession) => profession.id === activeProfessionId) ||
		professionPricingData[0];
	const activePlan = activeProfession?.plans[0];

	return (
		<div className="section aximo-section-padding3">
			<div className="container">
				<div className="aximo-pricing-title">
					<h2>High aspirations. High potential.
						<br />
						Still struggling?</h2>
				</div>
				<div className="aximo-pricing-tabs">
					{professionPricingData.map((profession) => (
						<button
							key={profession.id}
							type="button"
							className={`aximo-pricing-tab ${
								profession.id === activeProfessionId ? "active" : ""
							}`}
							onClick={() => setActiveProfessionId(profession.id)}
						>
							<h3>{profession.title}</h3>
						</button>
					))}
				</div>
				<div className="row" id="table-price-value">
					<div className="col-xl-6 col-md-6">
						<PricingCard
							plan={activePlan}
							titleOverride="Struggling with"
						/>
					</div>
					<div className="col-xl-6 col-md-6">
						<PricingCard
							plan={activePlan}
							useSecondary
							titleOverride="Coaching with Sudhita can help you"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default PricingPlan;
