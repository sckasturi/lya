import ServiceCard from "./ServiceCard";

import { Link } from "react-router-dom";
const servicesData = [
	{
		id: crypto.randomUUID(),
		title: "C-Suite Executives",
		description:
			"Crafting and executing comprehensive advertising campaigns to reach the target audience effectively.",
	},
	{
		id: crypto.randomUUID(),
		title: "Strategic Planning",
		description: "Guide advertising efforts, ensuring alignment with overall business goals and market conditions.",
	},
	{
		id: crypto.randomUUID(),
		title: "TV Advertising",
		description: "Effective TV advertising is the auditory aspect of the medium to convey the client's message.",
	},
	{
		id: crypto.randomUUID(),
		title: "Social Media Ads",
		description:
			"Designing and implementing advertising strategies on various social media to increase brand visibility.",
	},
	{
		id: crypto.randomUUID(),
		title: "Direct Mail Ads",
		description: "Creating targeted and personalized advertising materials sent directly to a predefined audience.",
	},
];
function Services() {
	return (
		<div className="section navy-bg aximo-section-padding5">
			<div className="container">
				<div className="aximo-section-title light bricolage-font">
					<div className="row">
						<div className="col-lg-7">
							<h2>What we can do for your brand</h2>
						</div>
					</div>
				</div>

				{servicesData.map((service, index) => (
					<ServiceCard key={service.id} service={service} index={index} />
				))}
			</div>
		</div>
	);
}

export default Services;
