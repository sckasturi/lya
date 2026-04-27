import CheckImg from "../../assets/images/icon/check.svg";
import FadeInRight from "../animation/FadeInRight";
import QuestionImg from "../../assets/images/icon/question.svg";

function PricingCard({
	plan: { title, problems, solutions },
	titleOverride,
	useSecondary = false,
}) {
	const displayTitle = titleOverride || title;
	const displayItems =
		useSecondary && solutions?.length ? solutions : problems;
	const bulletIcon = useSecondary ? CheckImg : QuestionImg;
	return (
		<div className="aximo-pricing-wrap2">
			<h3 className="aximo-pricing-description">
					{displayTitle}
			</h3>
			<div className="aximo-pricing-body2">
				<ul>
					{displayItems.map((item) => (
						<FadeInRight
							as="li"
							key={item}
						>
							<img src={bulletIcon} alt={useSecondary ? "check" : "question"} />
							{item}
						</FadeInRight>
					))}
				</ul>
			</div>
		</div>
	);
}

export default PricingCard;
