/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
function DropdownItem({ dropdown, children, title, url }) {
	const urlFormated = url !== "/" ? `/${url}` : "/";
	return dropdown ? (
		<li className="sub-menu--item nav-item-has-children">
			<a href="#" data-menu-get="h3" className="drop-trigger">
				{title}{" "}
				<svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ verticalAlign: "middle" }}>
					<path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</a>
			{children}
		</li>
	) : (
		<li className="sub-menu--item">
			<Link to={urlFormated}>
				<span className="menu-item-text">{children}</span>
			</Link>
		</li>
	);
}

export default DropdownItem;
