import Star2Img from "../../../assets/images/v1/star2.png";
import Thumb1Img from "../../../assets/images/v1/t_thumb1.png";
import Thumb2Img from "../../../assets/images/v1/t_thumb2.png";
import Thumb3Img from "../../../assets/images/v1/t_thumb3.png";
import Thumb4Img from "../../../assets/images/v1/t_thumb4.png";
import FadeInStagger from "../../animation/FadeInStagger";
import TestimonialCard from "./TestimonialCard";

const testimonialsData = [
	{
		id: crypto.randomUUID(),
		rating: 0,
		title: "Super customer service!",
		description:
			"Excellent customer service and I was really impressed and happy with my purchase especially as it was a last minute order which got to me in time, and when it arrived I was very happy with the design and size and so was the recipient.",
		author: "SS",
		designation: "Jobless Person",
		img: Thumb1Img,
	},
	{
		id: crypto.randomUUID(),
		rating: 0,
		title: "Innovative and professional",
		description:
			"Working with Sudhita led me to start my dream career and manage my personal and professional life better. She's hands-on in supporting her clients through ADHD-related challenges and capacity building. Being a WOC (women of color) was an important deciding factor for me because Sudhita is culturally responsive and respectful.",
		author: "PL",
		designation: "Another Profession",
		img: Thumb3Img,
	},
	{
		id: crypto.randomUUID(),
		rating: 0,
		title: "Exceptional creativity and vision",
		description:
			"Sudhita consistently brings me back to my goals, reminds me what I have dreamed of for myself, and listens to my big creative brain. She can follow my threads and then help me bring them together to concrete actions.",
		author: "CK",
		designation: "One More Profession",
		img: Thumb2Img,
	},
	{
		id: crypto.randomUUID(),
		rating: 0,
		title: "Transformed our brand",
		description:
			"I felt that our family was not working together as a team to help bring more order and structure to my child’s life. Sudhita was able to bring to light what is important from my son’s point of view and why it is important that we understand him.",
		author: "AK",
		designation: "Some Profession",
		img: Thumb4Img,
	},
];

function Testimonial() {
	return (
		<div className="section aximo-section-padding3 teal-bg">
			<div className="container">
				<div className="aximo-section-title center">
					<h2 className="teal-bg"> 
						What clients say!
					</h2>
				</div>
				<div className="row">
					{testimonialsData.map((testimonial, index) => (
						<FadeInStagger index={index} className="col-lg-6" key={testimonial.id}>
							<TestimonialCard testimonial={testimonial} />
						</FadeInStagger>
					))}
				</div>
			</div>
		</div>
	);
}

export default Testimonial;
