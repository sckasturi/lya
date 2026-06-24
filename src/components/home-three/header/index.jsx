import DesktopNav from "../../common/navigation/desktop-nav/DesktopNav";
import HeaderButton from "./HeaderButton";
import HeaderLogo from "./HeaderLogo";

function Header() {
	return (
		<header className="site-header aximo-header-section aximo-header3 teal-bg" id="sticky-menu">
			<div className="container">
				<nav className="navbar site-navbar">
					<HeaderLogo />
					<div className="menu-block-wrapper">
						<DesktopNav>
						</DesktopNav>
					</div>
					<HeaderButton />
				</nav>
			</div>
		</header>
	);
}

export default Header;
