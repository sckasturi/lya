import { LazyLoadImage } from "react-lazy-load-image-component";
import ThumbImg from "../../../assets/images/lya/virginia surprise 86.jpg";
import ShapeAynaImg from "../../../assets/images/v3/shape-ayna.png";
import ShapeMonitorImg from "../../../assets/images/v3/shape-monitor.png";
import StarShapeImg from "../../../assets/images/v3/star-shape.png";
import FadeInRight from "../../animation/FadeInRight";
function HeroThumb() {
	return (
		<div className="aximo-hero-thumb3-wrap visible-lg">
			<div className="aximo-hero-thumb3">
				<LazyLoadImage src={ThumbImg} alt=" Thumb" effect="blur" />
				
				
			</div>
			{/*<div className="aximo-hero-thumb-shape1">
				<FadeInRight>
					<img src={StarShapeImg} alt="StarShapeImg" />
				</FadeInRight>
			</div>*/}
		</div>
	);
}

export default HeroThumb;
