import Accordion from "./Accordion";
import Content from "./Content";
import { ContactFormFields } from "../contact-form";

function OurOfferings() {
	return (
		<div className="section aximo-section-padding">
			<div className="container">
				<div className="lya-offerings-title">
					<Content />
				</div>
				<div className="row g-5 align-items-start">
					<div className="col-lg-6 lya-offerings-left">
						<Accordion />
					</div>
					<div className="col-lg-6">
						<div className="lya-offerings-form-panel" id="lya-offerings-form">
							<div className="lya-contact-header">
								<h3>Get in touch</h3>
							</div>
							<ContactFormFields />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OurOfferings;
