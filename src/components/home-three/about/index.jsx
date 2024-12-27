import { Link } from "react-router-dom";
import Shape2Img from "../../../assets/images/v3/shape2.png";
import Thumb1Img from "../../../assets/images/lya/amma photos-12.jpg";
import FadeInLeft from "../../animation/FadeInLeft";
import FadeInUp from "../../animation/FadeInUp";
function About() {
	return (
		<div className="section aximo-section-padding  cornflower-bg">
			<div className="container">
				<div className="row">
					<div className="col-md-4">
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
							<p>
								Using a strength-based approach and tools like mindfulness, I partner with you to navigate the challenges of ADHD 
								and leverage its positive attributes to design a happy and fulfilling life for yourself and your family. 
							</p>
							<p>
								As a former science educator, I know that an ADHD brain is wired differently, not good, not bad, just different. 
								As a coach, I can help you understand and accept this difference and make your ADHD work for you. 
							</p>
							<p>
								While ADHD can bring positives like ingenuity, generosity, and spontaneity, it can also bring poor time management, 
								disorganization, difficulty prioritizing tasks, and low frustration tolerance.
							</p>
							<p><b>
								Together we can design solutions for you to leverage your ADHD.
							</b></p>
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
