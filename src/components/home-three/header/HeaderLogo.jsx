import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo/logo-white.svg";
function HeaderLogo() {
	return (
		<div className="brand-logo">
			<Link to="/">
				<img src={Logo} alt="Leverage Your ADHD" height="60" width="180" className="light-version-logo" decoding="async" />
			</Link>
		</div>
	);
}

export default HeaderLogo;
