import { NavLink } from "react-router-dom";
import DesktopNav from "../../common/navigation/desktop-nav/DesktopNav";
import HeaderButton from "./HeaderButton";
import HeaderLogo from "./HeaderLogo";

function Header() {
	return (
		<header className="site-header aximo-header-section aximo-header3 teal-bg" id="sticky-menu">
			<div className="container">
				<nav className="navbar site-navbar" aria-label="Main navigation">
					<HeaderLogo />
					<div className="menu-block-wrapper">
						<DesktopNav>
							<li className="nav-item">
								<NavLink to="/resources" className="lya-header-link">
									Resources
								</NavLink>
							</li>
						</DesktopNav>
					</div>
					<HeaderButton />
				</nav>
			</div>
		</header>
	);
}

export default Header;
