import Shape2Img from "../../../assets/images/v3/shape2.png";
import Thumb1Img from "../../../assets/images/lya/amma photos-12.jpg";
import FadeInLeft from "../../animation/FadeInLeft";
function About() {
	return (
		<div className="section aximo-section-padding  navy-bg">
			<div className="container">
				<div className="row">
					<div className="col-lg-4">
						<FadeInLeft className="aximo-content-thumb">
							<img src={Thumb1Img} alt="Thumb1Img" />
							<div className="aximo-thumb-shape1">
								<img src={Shape2Img} alt="Shape2Img" />
							</div>
						</FadeInLeft><br/>
					</div>
					<div className="col-lg-7 offset-lg-1">
						<div className="aximo-default-content ">
							<h2 className="navy-bg">Is your ADHD getting in your way?</h2>
							<p>Falling short while working hard. Just holding it together when more was possible.</p>
							<p>This was my reality. My diagnosis of ADHD in my 30s brought a glimmer of understanding, though my gains were fleeting. My family&apos;s challenges with ADHD and a desire to make a difference led me to train as a strengths-based Certified ADHD Coach.</p>
							<p>I learned that positive ADHD attributes, such as ingenuity, tenacity, generosity, and spontaneity, are overshadowed by challenges with time management, disorganization, prioritizing tasks, and frustration tolerance. Now, I partner with adults like you to identify what is working for you, what is not, and to amplify your inherent gifts to mitigate your challenges with ADHD.</p>
							<p>By melding transformational coaching practices, scientific research, and the age-old wisdom of mindfulness, we will build a bridge between where you are and where you want to be. By understanding how ADHD is at play, you will learn to work with your brain rather than against it.</p>
							<p>ADHD makes us different. Not better, not broken. Together, we will design strategies to honor this difference and leverage it. We will create a bespoke pathway to success that you can navigate authentically and passionately while honoring your unique self.</p>
							<p>Thriving with our ADHD, not despite it, is possible!</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
