import Story1Img from "../../../assets/images/about/story1.png";
import Story2Img from "../../../assets/images/about/story2.png";
import Story3Img from "../../../assets/images/about/story3.png";
import Story4Img from "../../../assets/images/about/story4.png";
import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "../../animation/FadeInStaggerTwo";
function StoryPhotos() {
	return (
		<FadeInStaggerTwo className="row">
			<FadeInStaggerTwoChildren className="col-lg-8">
				<div className="aximo-story-thumb">
					<img src={Story1Img} alt="Story1Img" />
					<div className="aximo-story-thumb-text">
						<span className="aximo-story-thumb-text-default">C-Suite Executives</span>
						<span className="aximo-story-thumb-text-hover">Read more</span>
					</div>
				</div>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren className="col-lg-4">
				<div className="aximo-story-thumb">
					<img src={Story2Img} alt="StroryIMg 2" />
					<div className="aximo-story-thumb-text">
						<span className="aximo-story-thumb-text-default">Story 2</span>
						<span className="aximo-story-thumb-text-hover">Read more<br/>And more<br/> And even more.</span>
					</div>
				</div>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren className="col-lg-4">
				<div className="aximo-story-thumb">
					<img src={Story3Img} alt="StoryImg 3" />
					<div className="aximo-story-thumb-text">
						<span className="aximo-story-thumb-text-default">Story 3</span>
						<span className="aximo-story-thumb-text-hover">Read more</span>
					</div>
				</div>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren className="col-lg-4">
				<div className="aximo-story-thumb">
					<img src={Story3Img} alt="Story3Img" />
					<div className="aximo-story-thumb-text">
						<span className="aximo-story-thumb-text-default">Story 4</span>
						<span className="aximo-story-thumb-text-hover">Read more</span>
					</div>
				</div>
			</FadeInStaggerTwoChildren>
			<FadeInStaggerTwoChildren className="col-lg-4">
				<div className="aximo-story-thumb">
					<img src={Story3Img} alt="Story3Img" />
					<div className="aximo-story-thumb-text">
						<span className="aximo-story-thumb-text-default">Story 5</span>
						<span className="aximo-story-thumb-text-hover">Read more</span>
					</div>
				</div>
			</FadeInStaggerTwoChildren>
		</FadeInStaggerTwo>
	);
}

export default StoryPhotos;
