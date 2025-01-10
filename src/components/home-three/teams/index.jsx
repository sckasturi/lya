import FadeInStagger from "../../animation/FadeInStagger";
import TeamCard from "./TeamCard";
import lawyer from "../../../assets/images/lya/lawyer.jpg";
import professional from "../../../assets/images/lya/professional.jpg";
import executive from "../../../assets/images/lya/executive.jpg";
import doctor from "../../../assets/images/lya/doctor.jpg";
import college from "../../../assets/images/lya/college.jpg";

const teams = [
	{
		id: crypto.randomUUID(),
		name: "Andrew Mark",
		designation: "Creative Director",
		img: lawyer,
	},
	{
		id: crypto.randomUUID(),
		name: "Jack Taylor",
		designation: "Senior Designer",
		img: executive,
	},
	{
		id: crypto.randomUUID(),
		name: "Martine Joy",
		designation: "Project Manager",
		img: doctor,
	},
	{
		id: crypto.randomUUID(),
		name: "Adam Straw",
		designation: "Web Developer",
		img: college,
	},
];

function Teams() {
	return (
		<div className="section aximo-section-padding3">
			<div className="container">
				<div className="aximo-section-title center">
					<h2>
						We have a team of
						<span className="aximo-title-animation">
							creative people
							
						</span>
					</h2>
				</div>
				<div className="row">
					{teams.map((team, index) => (
						<FadeInStagger key={team.id} index={index} className="col-lg-4 col-md-6">
							<TeamCard team={team} />
						</FadeInStagger>
					))}
				</div>
			</div>
		</div>
	);
}

export default Teams;
