import Accordion from "./Accordion";
import Content from "./Content";
import CalendlyEmbed from "../contact/CalendlyEmbed";

function OurOfferings() {
	return (
		<div className="section aximo-section-padding lya-offerings-section">
			<div className="container">
				<div className="lya-offerings-title">
					<Content />
				</div>
				<div className="row g-5 align-items-start">
					<div className="col-lg-6 lya-offerings-left">
						<Accordion />
					</div>
					<div className="col-lg-6">
						<div className="aximo-form-wrap2 white-bg" id="lya-scheduler">
							<CalendlyEmbed />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OurOfferings;
