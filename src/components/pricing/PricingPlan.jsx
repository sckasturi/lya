import { useState } from "react";
import PricingCard from "./PricingCard";

const professionPricingData = [
	{
		id: crypto.randomUUID(),
		title: "C-Suite Executive",
		plans: [
			{
				id: crypto.randomUUID(),
				title: "Where you are",
				description:
					"Web design packages offered a range of services and features to create websites",
				problems: [
					"An overwhelming workload",
					"Meeting deadlines and staying accountable to colleagues",
					"Work-life balance",
					"Finding a new way to manage your ADHD at this career stage",
					"Feeling stuck in your current position",
				],
				solutions: [
					"Increase your productivity with less exhaustion",
					"Decrease cognitive load while achieving benchmarks",
					"Find more time for what you love and enjoy",
					"Customize solutions for your unique brain",
					"Chart a fulfilling career journey",
				],
				highlighted: true,
			},
			{
				id: crypto.randomUUID(),
				title: "Where you could be",
				description:
					"Web design packages offered a range of services and features to create websites",
				problems: [
					"An overwhelming workload",
					"Meeting deadlines and staying accountable to colleagues",
					"Work-life balance",
					"Finding a new way to manage your ADHD at this career stage",
					"Feeling stuck in your current position",
				],
				solutions: [
					"Increase your productivity with less exhaustion",
					"Decrease cognitive load while achieving benchmarks",
					"Find more time for what you love and enjoy",
					"Customize solutions for your unique brain",
					"Chart a fulfilling career journey",
				],
				highlighted: true,
			},
		],
	},
	{
		id: crypto.randomUUID(),
		title: "Academic / Post-Doc",
		plans: [
			{
				id: crypto.randomUUID(),
				title: "Where you are",
				description:
					"Web design packages offered a range of services and features to create websites",
				problems: [
					"Motivating and activating to amorphous deadlines or instructions",
					"Repetitive work with many roadblocks and few successful results",
					"Iterative nature of research and publication",
					"Career stagnation and dissatisfaction",
				],
				solutions: [
					"Set well-paced milemarkers and endpoints to make amorphous work more discrete",
					"Ease the cyclical nature of research and publication",
					"Identify needs and chart a path",
				],
				highlighted: true,
			},
			{
				id: crypto.randomUUID(),
				title: "Where you could be",
				description:
					"Web design packages offered a range of services and features to create websites",
				problems: [
					"Motivating and activating to amorphous deadlines or instructions",
					"Repetitive work with many roadblocks and few successful results",
					"Iterative nature of research and publication",
					"Career stagnation and dissatisfaction",
				],
				solutions: [
					"Set well-paced milemarkers and endpoints.",
					"Make amorphous work more discrete",
					"Ease the cyclical nature of research and publication",
					"Identify needs and chart a path",
				],
				highlighted: true,
			},
		],
	},
	{
		id: crypto.randomUUID(),
		title: "College student on probation",
		plans: [
			{
				id: crypto.randomUUID(),
				title: "Where you are",
				description:
					"Web design packages offered a range of services and features to create websites",
				problems: [
					"Meeting the university standards",
					"Avoidable mistakes costing your grade",
					"Planning and task fatigue",
				],
				solutions: [
					"Bridge the gap between your abilities and performance",
					"Understand rubrics and pay attention to the details",
					"Plan and prioritize in a way that works for you",
				],
				highlighted: true,
			},
			{
				id: crypto.randomUUID(),
				title: "Where you could be",
				description:
					"Web design packages offered a range of services and features to create websites",
				problems: [
					"Meeting the university standards",
					"Avoidable mistakes costing your grade",
					"Planning and task fatigue",
				],
				solutions: [
					"Bridge the gap between your abilities and performance",
					"Understand rubrics and pay attention to the details",
					"Plan and prioritize in a way that works for you",
				],
				highlighted: true,
			},
		],
	},
	{
		id: crypto.randomUUID(),
		title: "Medical or law student",
		plans: [
			{
				id: crypto.randomUUID(),
				title: "Where you are",
				description:
					"Web design packages offered a range of services and features to create websites",
				problems: [
					"Working memory overload when retaining broad, in-depth, and specialized knowledge",
					"Inefficient and incomplete prep strategy",
					"Test taking anxiety and fatigue for rigorous exams spanning multiple day",
				],
				solutions: [
					"Leverage multi-modal, active and passive learning methodologies or tools",
					"Understand test format and build stamina for multi-day, multi-hour testing",
					"Utilizing testing and sample tests, test banks simulate test conditions",
					"Chart an exam prep strategy that works for you/is custom to you",
				],
				highlighted: true,
			},
			{
				id: crypto.randomUUID(),
				title: "Where you could be",
				description:
					"Web design packages offered a range of services and features to create websites",
				problems: [
					"Working memory overload when retaining broad, in-depth, and specialized knowledge",
					"Inefficient and incomplete prep strategy",
					"Test taking anxiety and fatigue for rigorous exams spanning multiple day",
				],
				solutions: [
					"Leverage multi-modal, active and passive learning methodologies or tools",
					"Understand test format and build stamina for multi-day, multi-hour testing",
					"Utilizing testing and sample tests, test banks simulate test conditions",
					"Chart an exam prep strategy that works for you/is custom to you",
				],
				highlighted: true,
			},
		],
	},
	{
		id: crypto.randomUUID(),
		title: "Parents of neurodiverse children",
		plans: [
			{
				id: crypto.randomUUID(),
				title: "Where you are",
				description:
					"Web design packages offered a range of services and features to create websites",
				problems: [
					"Overwhelming emotions",
					"Battles over chores and meltdowns over homework",
					"Lack of bandwidth for other family members",
					"Perceived favoritism and relationship stress",
					"Advice and techniques that are not working",
					"Stress and shame in social situations",
				],
				solutions: [
					"Bring calm to the household",
					"Establish family systems that work",
					"Make more time for everyone in your family",
					"Balance attention and energy among family members",
					"Create custom solutions for your family",
					"Navigate social situations with ease, care, and confidence",
				],
				highlighted: true,
			},
			{
				id: crypto.randomUUID(),
				title: "Where you could be",
				description:
					"Web design packages offered a range of services and features to create websites",
				problems: [
					"Overwhelming emotions",
					"Battles over chores and meltdowns over homework",
					"Lack of bandwidth for other family members",
					"Perceived favoritism and relationship stress",
					"Advice and techniques that are not working",
					"Stress and shame in social situations",
				],
				solutions: [
					"Bring calm to the household",
					"Establish family systems that work",
					"Make more time for everyone in your family",
					"Balance attention and energy among family members",
					"Create custom solutions for your family",
					"Navigate social situations with ease, care, and confidence",
				],
				highlighted: true,
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
				{/*<div className="aximo-pricing-title">
					<h3>{activeProfession?.title}</h3>
				</div>*/}
				<div className="row" id="table-price-value">
					{activeProfession?.plans.map((plan, index) => (
						<div className="col-xl-6 col-md-6" key={plan.id}>
							<PricingCard
								plan={plan}
								useSecondary={index === 1}
								titleOverride={index === 1 ? "Coaching can help you…" : "If you struggle with…"}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
export default PricingPlan;
