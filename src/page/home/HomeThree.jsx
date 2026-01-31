import About from "../../components/home-three/about";
import AboutTwo from "../../components/home-three/about-two";
import AutoSlider from "../../components/home-three/auto-slider";
import Contact from "../../components/home-three/contact";
import Counter from "../../components/home-three/counter";
import Faq from "../../components/home-three/faq";
import Hero from "../../components/home-three/hero";
import SeoSteps from "../../components/home-three/seo-steps";
import Services from "../../components/home-three/services";
import Teams from "../../components/home-three/teams";
import Testimonial from "../../components/home-three/testimonial";
import OurOfferings from "../../components/home-three/our-offerings";
import Projects from "../../components/home-three/projects";

function HomeThree() {
	return (
		<div className="aximo-all-section cream-bg">
			<Hero />
			<Contact />
			
			{/*<Teams />*/}
			<Projects />
			<OurOfferings />
			<Services />{
			<Testimonial />

			/*
			<SeoSteps />
			<AutoSlider />
			<Teams />*/}
			<About />
			<Faq />

			
		</div>
	);
}

export default HomeThree;
