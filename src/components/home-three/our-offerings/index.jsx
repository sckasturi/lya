import Accordion from "./Accordion";
import Content from "./Content";
function OurOfferings() {
	return (
		<div className="section">
			<div className="container">
				<div className="aximo-faq-wrap">
					<div className="row">
						<div className="col-lg-5 d-flex align-items-center">
							<Content />
						</div>
						<div className="col-lg-7">
							<Accordion />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OurOfferings;
