import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo/logo-dark.svg";
function HeaderLogo() {
	return (
		<div className="brand-logo">
			<Link to="/">
				<img src={Logo} alt="Logo" height="60px" className="light-version-logo" />
			</Link>
		</div>
	);
}

export default HeaderLogo;
