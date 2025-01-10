import { Link } from "react-router-dom";
import Shape2Img from "../../../assets/images/v3/shape2.png";
import Thumb1Img from "../../../assets/images/lya/amma photos-12.jpg";
import FadeInLeft from "../../animation/FadeInLeft";
import FadeInUp from "../../animation/FadeInUp";
function About() {
	return (
		<div className="section aximo-section-padding  teal-bg">
			<div className="container">
				<div className="row">
					<div className="col-lg-4">
						<FadeInLeft className="aximo-content-thumb">
							<img src={Thumb1Img} alt="Thumb1Img" />
							<div className="aximo-thumb-shape1">
								<img src={Shape2Img} alt="Shape2Img" />
							</div>
						</FadeInLeft><br/>
						{/*<p>Sudhita is a Certified ADHD Life Coach specializing in ADHD management and skills training for working professionals.</p>
						<p>She also serves as DEI Chair for the ADHD Coaches Organization and facilitates a South Asian peer support group.</p>*/}
					</div>
					<div className="col-lg-7 offset-lg-1">
						<div className="aximo-default-content ">
							<h2>Hi! I'm Sudhita</h2>
							<p>As a Certified ADHD Coach,  I partner with you to navigate the challenges of ADHD and leverage its positive attributes to create a happy and fulfilling life for yourself and your family.</p> 
							<p>As a former science educator, I know that the ADHD brain is wired differently, not better, not broken, just different. Taking science and mindfulness into account, we will understand where, when, and how your ADHD is coming into play and how to navigate this difference effectively.  </p>
							<p>While ADHD brings positives like ingenuity, generosity, and spontaneity, it can also come with poor time management, disorganization, difficulty prioritizing tasks, and low frustration tolerance. With a strength-based approach, we will work towards amplifying your inherent gifts and mitigating the difficulties of ADHD.</p> 
							<p>Together, we will design solutions to leverage your ADHD, navigate the world authentically and passionately, and thrive while honoring your unique self. </p>
						</div>
						{/*<FadeInUp className="aximo-btn-wrap">
							<Link className="aximo-default-btn pill yellow-btn" to="/contact-us">
								<span className="aximo-label-up">Explore more</span>
								<span className="aximo-label-up">Explore more</span>
							</Link>
						</FadeInUp>*/}
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
