import Star2Img from "../../../assets/images/v1/star2.png";
import lawyer from "../../../assets/images/lya/lawyer.jpg";
import professional from "../../../assets/images/lya/professional.jpg";
import executive from "../../../assets/images/lya/executive.jpg";
import doctor from "../../../assets/images/lya/doctor.jpg";
import college from "../../../assets/images/lya/college.jpg";
import ProjectCard from "./ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Autoplay } from "swiper/modules";

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

const swiperSettings = {
	direction: "horizontal",
	pagination: {
		clickable: true,
	},
	modules: [Pagination, Autoplay, Mousewheel],
	breakpoints: {
		640: {
			slidesPerView: 1,
		},
		900: {
			slidesPerView: 2,
		},
		1600: {
			slidesPerView: 3.25,
		},
	},
		speed: 3000,
	autoplay: {
		delay: 2,
	},
	loop: true
};
function Projects() {
	return (
		<div className="section aximo-section-padding">
			<div className="container">
				<div className="aximo-section-title center">
					<h2>
						High aspirations. High potential.
						<br />
						Still struggling?
						{/*<span className="aximo-title-animation">
							creative projects
							<span className="aximo-title-icon">
								<img src={Star2Img} alt="Star2Img" />
							</span>
						</span>*/}
					</h2>
				</div>
			</div>
			<div className="swiper aximo-project-slider center">
				<Swiper {...swiperSettings}>
					{projectsData.map((project) => (
						<SwiperSlide key={project.id}>
							<ProjectCard project={project} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default Projects;
