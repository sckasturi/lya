import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "../../animation/FadeInStaggerTwo";

const OFFERING_ITEMS = [
	{
		id: "collapseOne",
		title: "Personalized ADHD coaching",
		body: "One-on-one coaching sessions tailored to your ADHD related challenges. Enhance your mindset and create actionable strategies to help you thrive and propel toward success.",
		initialOpen: true,
	},
	{
		id: "collapseTwo",
		title: "Group coaching for South Asian professionals with ADHD",
		body: "Group coaching sessions designed for South Asian professionals to navigate the challenges of ADHD in a dynamic and collaborative environment. Enhance your personal and professional growth through shared learning, connection, and accountability.",
		initialOpen: true,
	},
	{
		id: "collapseThree",
		title: "ADHD speaking engagements",
		body: "I draw upon years of experience and knowledge of ADHD and AuDHD (Autism-ADHD) to educate and empower audiences of all types. I bring energy and enthusiasm, along with insight and actionable strategies. I've spoken locally and internationally at corporate gatherings, conference panels, and workshops. Past speaking engagements include Sonos, United States Agency for Global Media, Bitcamp, Technica, Lorain County Community College, and Salwan Public School.",
		initialOpen: false,
	},
];

function OfferingAccordionItem({ id, title, body, isOpen, onToggle }) {
	const innerRef = useRef(null);
	const [contentHeight, setContentHeight] = useState(0);

	const measure = useCallback(() => {
		if (innerRef.current) {
			setContentHeight(innerRef.current.scrollHeight);
		}
	}, []);

	useLayoutEffect(() => {
		measure();
	}, [measure, body]);

	useEffect(() => {
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [measure]);

	return (
		<FadeInStaggerTwoChildren className="accordion-item">
			<h3 className="accordion-header">
				<button
					className={`accordion-button${isOpen ? "" : " collapsed"}`}
					type="button"
					aria-expanded={isOpen}
					aria-controls={id}
					onClick={onToggle}
				>
					{title}
				</button>
			</h3>
			<div
				id={id}
				className={`accordion-collapse collapse${isOpen ? " show" : ""}`}
				style={{ maxHeight: isOpen ? `${contentHeight}px` : "0px" }}
			>
				<div className="accordion-body" ref={innerRef}>
					<p>{body}</p>
				</div>
			</div>
		</FadeInStaggerTwoChildren>
	);
}

function Accordion() {
	const [openIds, setOpenIds] = useState(() =>
		new Set(OFFERING_ITEMS.filter((item) => item.initialOpen).map((item) => item.id)),
	);

	const toggleItem = (id) => {
		setOpenIds((current) => {
			const next = new Set(current);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	};

	return (
		<FadeInStaggerTwo className="accordion aximo-accordion-wrap" id="aximo-accordion">
			{OFFERING_ITEMS.map((item) => (
				<OfferingAccordionItem
					key={item.id}
					{...item}
					isOpen={openIds.has(item.id)}
					onToggle={() => toggleItem(item.id)}
				/>
			))}
		</FadeInStaggerTwo>
	);
}

export default Accordion;
