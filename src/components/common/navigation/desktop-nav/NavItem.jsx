/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
function NavItem({ dropdown, title, children, url = "" }) {
	const urlFormated = url !== "/" ? `/${url}` : "/";

	return dropdown ? (
		<li className="nav-item nav-item-has-children">
			<a href="#" className="nav-link-item drop-trigger">
				{title}{" "}
				<svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ verticalAlign: "middle" }}>
					<path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</a>
			{children}
		</li>
	) : (
		<li className="nav-item">
			<Link to={urlFormated} className="nav-link-item">
				{children}
			</Link>
		</li>
	);
}

export default NavItem;
