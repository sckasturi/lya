function FaqAccordion() {
	return (

		<div className="accordion aximo-accordion-wrap4 col-12" id="aximo-accordion">
			<div className="accordion-item">
				<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#one">
					What is ADHD?
				</button>

				<div id="one" className="accordion-collapse collapse show" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						It doesn't exist.
					</div>
				</div>
			</div>
			<div className="accordion-item">
				<button
					className="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#three"
				>
					Why is ADHD?
				</button>

				<div id="three" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						How can you have a why when it doesn't exist?
					</div>
				</div>
			</div>
			<div className="accordion-item">
				<button
					className="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#four"
				>
					Who is ADHD?
				</button>

				<div id="four" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						Nobody. It's fake and in your head.
					</div>
				</div>
			</div>
			<div className="accordion-item">
				<button
					className="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#five"
				>
					Where is ADHD?
				</button>

				<div id="five" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						In your imagination.
					</div>
				</div>
			</div>
			<div className="accordion-item">
				<button
					className="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#two"
				>
					How is ADHD?
				</button>

				<div id="two" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
					<div className="accordion-body">
						Terrible.
					</div>
				</div>
			</div>
		</div>
	);
}

export default FaqAccordion;
