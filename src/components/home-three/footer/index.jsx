import { Link } from "react-router-dom";
import LogoDarkImg from "../../../assets/images/logo/logo-dark.svg";
import FooterBottom from "./FooterBottom";

import ICF from "../../../assets/images/lya/icf.webp"
import CHADD from "../../../assets/images/lya/chadd.webp"
import ADDA from "../../../assets/images/lya/adda.webp"
import ACO from "../../../assets/images/lya/aco.webp"
import WISER from "../../../assets/images/lya/wiser.webp"

function Footer() {
	return (
		<footer className="aximo-footer-section7 cream-bg">
			<div className="container">
				<div className="aximo-footer-top7">
					<div className="aximo-footer-info-column">
						<div className="aximo-footer-info-item">
							<Link to="">
								<img src={LogoDarkImg} height="100" alt="Leverage Your ADHD" loading="lazy" decoding="async" />
							</Link>
						</div>
						<div className="aximo-footer-info-item">
							<h5>Leverage Your ADHD</h5>
							<p>
								Sudhita Kasturi (she/her)
								<br />Certified ADHD Coach
							</p>
						</div>
				
					<div className="aximo-footer-info-item">
						<div className="aximo-footer-cert-logos">
							<img src={ICF} width="80" height="80" alt="ICF" loading="lazy" decoding="async" />
							<img src={ACO} width="80" height="80" alt="ACO" loading="lazy" decoding="async" />
							<img src={CHADD} width="80" height="80" alt="CHADD" loading="lazy" decoding="async" />
							<img src={WISER} width="80" height="80" alt="WISER" loading="lazy" decoding="async" />
							<img src={ADDA} width="80" height="80" alt="ADDA" loading="lazy" decoding="async" />
						</div>
					</div>
					</div>
				</div>
				<div className="aximo-footer-bottom seven">
					<FooterBottom />
				</div>
			</div>
		</footer>
	);
}

export default Footer;
