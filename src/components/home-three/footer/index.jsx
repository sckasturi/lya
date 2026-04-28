import { Link } from "react-router-dom";
import LogoDarkImg from "../../../assets/images/logo/logo-dark.svg";
import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";

import ICF from "../../../assets/images/lya/icf.png"
import CHADD from "../../../assets/images/lya/chadd.png"
import ADDA from "../../../assets/images/lya/adda.png"
import ACO from "../../../assets/images/lya/aco.png"
import APSARD from "../../../assets/images/lya/apsard.png"

function Footer() {
	return (
		<footer className="aximo-footer-section7 cream-bg">
			<div className="container">
				<div className="aximo-footer-top7">
					<div className="aximo-footer-info-column">
						<div className="aximo-footer-info-item">
							<Link to="">
								<img src={LogoDarkImg} height="100px" alt="Logo" />
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
							<img src={ICF} width="80px" alt="ICF" />
							<img src={ACO} width="80px" alt="ACO" />
							<img src={CHADD} height="80px" alt="CHADD" />
							<img src={APSARD} width="80px" alt="APSARD" />
							<img src={ADDA} width="80px" alt="ADDA" />
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
