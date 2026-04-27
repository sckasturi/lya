import { useState, useRef, useLayoutEffect } from "react";

function FaqAccordion({ faq: { ques, ans }, index }) {
	const [isOpen, setIsOpen] = useState(false);
	const innerRef = useRef(null);
	const [contentHeight, setContentHeight] = useState(0);

	useLayoutEffect(() => {
		if (innerRef.current) {
			setContentHeight(innerRef.current.scrollHeight);
		}
	}, []);

	return (
		<div className={`lya-faq-item${isOpen ? " open" : ""}`}>
			<button
				className="lya-faq-question"
				onClick={() => setIsOpen(!isOpen)}
				type="button"
			>
				<span className="lya-faq-number">{String(index + 1).padStart(2, "0")}</span>
				<span className="lya-faq-question-text">{ques}</span>
				<span className="lya-faq-icon">+</span>
			</button>
			<div
				className="lya-faq-answer"
				style={{ maxHeight: isOpen ? `${contentHeight}px` : "0px" }}
			>
				<div
					ref={innerRef}
					className="lya-faq-answer-inner"
					dangerouslySetInnerHTML={{ __html: "<p>" + ans + "</p>" }}
				/>
			</div>
		</div>
	);
}

export default FaqAccordion;
