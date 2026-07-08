import HeroContent from "./HeroContent";
import HeroThumb from "./HeroThumb";

function Hero() {
	return (
		<div className="aximo-hero-section3 lya-hero">
			<div className="container">
				<div className="row lya-hero-row">
					<div className="col-12 col-lg-6 aximo-hero-content-col py-4 py-lg-0 px-3 px-lg-4 ps-lg-4">
						<HeroContent />
					</div>
					<div className="col-12 col-lg-6 aximo-hero-thumb-col px-3 px-lg-0 mb-4 mb-lg-0">
						<HeroThumb />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
