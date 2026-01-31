import { Link } from "react-router-dom";
import Team5Img from "../../../assets/images/team/team5.png";
import Team6Img from "../../../assets/images/team/team6.png";
import Team7Img from "../../../assets/images/team/team7.png";
import StarShapeHalfImg from "../../../assets/images/v3/star-shape-half2.png";
import FadeInStagger from "../../animation/FadeInStagger";
import TeamCard from "./TeamCard";
const teamsData = [
	{
		id: crypto.randomUUID(),
		name: "Working Professionals",
		designation: "who are stuck, dissatisfied with work-life balance, and/or have unrealized potential",
		img: Team5Img,
	},
	{
		id: crypto.randomUUID(),
		name: "Graduate Students",
		designation: "looking for help ",
		img: Team6Img,
	},
	{
		id: crypto.randomUUID(),
		name: "College Students",
		designation: "struggling academically, maybe even close to academic probation",
		img: Team7Img,
	},
];
function Teams() {
	return (
		<div className="section aximo-section-padding3 position-relative">
			<div className="container">
				<div className="aximo-section-title familjen-grotesk">
					<div className="row">
					
							<h2>Who do I coach?</h2>
						
					</div>
				</div>
				<div className="row">
					{teamsData.map((team, index) => (
						<FadeInStagger index={index} className="col-xl-4 col-md-6" key={team.id}>
							<TeamCard team={team} />
						</FadeInStagger>
					))}
				</div>
			</div>
			<div className="aximo-star-shape-half ">
				<img src={StarShapeHalfImg} alt="StarShapeHalfImg" />
			</div>
		</div>
	);
}

export default Teams;
