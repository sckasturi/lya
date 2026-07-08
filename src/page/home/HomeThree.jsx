import { lazy, Suspense } from "react";
import Hero from "../../components/home-three/hero";

const Contact = lazy(() => import("../../components/home-three/contact"));
const Pricing = lazy(() => import("../../components/pricing"));
const Testimonial = lazy(() => import("../../components/home-three/testimonial"));
const OurOfferings = lazy(() => import("../../components/home-three/our-offerings"));
const Faq = lazy(() => import("../../components/home-three/faq"));
const About = lazy(() => import("../../components/home-three/about"));

function HomeThree() {
	return (
		<div className="aximo-all-section cream-bg">
			<Hero />
			<Suspense fallback={null}>
				<Contact />
				<Pricing />
				<Testimonial />
				<OurOfferings />
				<Faq />
				<About />
			</Suspense>
		</div>
	);
}

export default HomeThree;
