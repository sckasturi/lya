function ProjectCard({ project: { title, description } }) {
	return (
		<div className="aximo-image-resizing-content">
			<h4>{title}</h4>
			<p className="projectsv3-description">{description}</p>
		</div>
	);
}

export default ProjectCard;
