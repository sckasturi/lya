import StarImg from "../../../assets/images/v2/shape-star.png";
import Thumb1Img from "../../../assets/images/v2/h-thumb1.png";
import Thumb2Img from "../../../assets/images/v2/h-thumb2.png";
import Thumb3Img from "../../../assets/images/v2/h-thumb3.png";
import Thumb4Img from "../../../assets/images/v2/h-thumb4.png";
import Thumb5Img from "../../../assets/images/v2/h-thumb5.png";
import ServiceCard from "./ServiceCard";
import lawyer from "../../../assets/images/lya/lawyer.jpg";
import professional from "../../../assets/images/lya/professional.jpg";
import executive from "../../../assets/images/lya/executive.jpg";
import doctor from "../../../assets/images/lya/doctor.jpg";
import college from "../../../assets/images/lya/college.jpg";

const servicesData = [
	{
		id: crypto.randomUUID(),
		title: "Product Development",
		description:
			"We are focused on developing innovative products services. We research and development to create new solutions.",
		img: Thumb1Img,
	},
	{
		id: crypto.randomUUID(),
		title: "Consulting & Advisory",
		description:
			"Our expertise in various fields, such as management, finance, marketing, or technology, to help businesses solve problems.",
		img: Thumb2Img,
	},
	{
		id: crypto.randomUUID(),
		title: "Investment and Equity",
		description:
			"We invest in startups or take an equity stake in exchange or direct investment or have their own seed funds to support.",
		img: Thumb3Img,
	},
	{
		id: crypto.randomUUID(),
		title: "Co-Working Spaces",
		description:
			"We provide co-working spaces or office facilities for startups can work, collaborate, and access essential resources.",
		img: Thumb4Img,
	},
	{
		id: crypto.randomUUID(),
		title: "Legal & Administrative",
		description:
			"Offer legal and administrative assistance, helping startups with tasks like business registration, intellectual property etc.",
		img: Thumb5Img,
	},
];

const projectsData = [
	{
		id: crypto.randomUUID(),
		title: "Working Professional",
		description: "Wanting to organize your work, meet more deadlines, and improve your work-life balance",
		img: professional,
	},
	{
		id: crypto.randomUUID(),
		title: "Aspiring Executive",
		description: "Seeking mobility in your career trajectory or looking to switch careers",
		img: executive,
	},
	{
		id: crypto.randomUUID(),
		title: "College Student",
		description: "Struggling academically, perhaps even on academic probation",
		img: college,
	},
	{
		id: crypto.randomUUID(),
		title: "Medical Students, Residents & Physicians",
		description: "Passing the various steps of the USMLE and navigating a clinical setting",
		img: doctor,
	},
	{
		id: crypto.randomUUID(),
		title: "Law Students & Attorneys",
		description: "Studying for the UBE and managing workflow",
		img: lawyer,
	},
];

function Services() {
	return (
		<div className="section  aximo-section-padding position-relative">
			<div className="container">
				<div className="aximo-section-title center clash-grotesk">
					<h2>People I can help</h2>
				</div>
			</div>
			<div className="aximo-increase-shape">
				<img src={StarImg} alt="StarImg" />
			</div>
			<div className="aximo-service-increase-wrap">
				{projectsData.map((service) => (
					<ServiceCard key={service.id} service={service} />
				))}
			</div>
		</div>
	);
}

export default Services;
