import About from "../../components/home-three/about";
import Contact from "../../components/home-three/contact";
import Faq from "../../components/home-three/faq";
import Hero from "../../components/home-three/hero";
import Testimonial from "../../components/home-three/testimonial";
import OurOfferings from "../../components/home-three/our-offerings";
import Pricing from "../../components/pricing";

function HomeThree() {
	return (
		<div className="aximo-all-section cream-bg">
			<Hero />
			<Contact />
			<Pricing />
			<Testimonial />
			<OurOfferings />
			<Faq />
			<About />
		</div>
	);
}

export default HomeThree;
