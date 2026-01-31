function FaqAccordion({ faq: {ques, ans, id}}) {
	return (

			<div className="accordion-item  cream-bg">
				<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`}>
					{ques}
				</button>

				<div id={`${id}`} className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body" dangerouslySetInnerHTML={{ __html: "<p>" + ans + "</p>" }}>
					</div>
				</div>
			</div>
	);
}

export default FaqAccordion;
