import { Link } from "react-router-dom";
import LogoWhite from "../../assets/images/logo/logo-white.svg";

function GuideShell({ children, footerNote }) {
	return (
		<div className="lya-guide-app">
			<header className="lya-guide-header">
				<Link to="/" className="lya-guide-header-logo" aria-label="Leverage Your ADHD home">
					<img src={LogoWhite} alt="" />
				</Link>
				<span className="lya-guide-header-title">Leverage Your ADHD</span>
			</header>

			<main className="lya-guide-main">{children}</main>

			<footer className="lya-guide-footer">
				<a href="https://leverageyouradhd.com">leverageyouradhd.com</a>
				{footerNote ? <span className="lya-guide-footer-note">{footerNote}</span> : null}
			</footer>
		</div>
	);
}

export default GuideShell;
