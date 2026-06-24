function TestimonialCard({ testimonial: { headline, quote, author, designation } }) {
	return (
		<div className="aximo-testimonial-wrap cream-bg lya-testimonial-card lya-testimonial-card--single">
			{headline ? <h3 className="lya-testimonial-headline">{headline}</h3> : null}
			<div className="aximo-testimonial-data lya-testimonial-quote-wrap">
				<p className="lya-testimonial-quote">{quote}</p>
			</div>
			<div className="aximo-testimonial-author">
				<div className="aximo-testimonial-author-data">
					<p>
						{author}
						{designation ? (
							<>
								{", "}
								<span>{designation}</span>
							</>
						) : null}
					</p>
				</div>
			</div>
		</div>
	);
}

export default TestimonialCard;
