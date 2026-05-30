/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useFaqJourneyGlow from "../../../../hooks/useFaqJourneyGlow";
import { CTA, CTA_SECTION, trackCtaClick } from "../../../../lib/ctaEvents";
import { openFreebiePopup } from "../../../../lib/openFreebiePopup";

const MobileNavbar = () => {
	const journeyGlow = useFaqJourneyGlow();
	const [showMenu, setShowMenu] = useState(false);
	const [menuTop, setMenuTop] = useState(72);
	const wrapRef = useRef(null);

	useEffect(() => {
		const updateTop = () => {
			const header = document.getElementById("sticky-menu");
			if (header) setMenuTop(header.offsetHeight);
		};
		updateTop();
		window.addEventListener("resize", updateTop);
		return () => window.removeEventListener("resize", updateTop);
	}, []);

	const scrollToContact = () => {
		trackCtaClick(CTA.START_JOURNEY, CTA_SECTION.MOBILE_NAV);
		setShowMenu(false);
		setTimeout(() => {
			document.getElementById("contact-us")?.scrollIntoView({ behavior: "smooth" });
		}, 200);
	};

	const handleFreebie = () => {
		setShowMenu(false);
		setTimeout(() => openFreebiePopup(CTA_SECTION.MOBILE_NAV), 200);
	};

	return (
		<div className="mobile-nav-wrap" ref={wrapRef}>
			<div className="mobile-menu-trigger" onClick={() => setShowMenu((prev) => !prev)}>
				<span></span>
			</div>

			<AnimatePresence>
				{showMenu && (
					<>
						<motion.nav
							className="mobile-navbar"
							style={{ top: menuTop }}
							initial={{ opacity: 0, y: -8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.18, ease: "easeOut" }}
						>
							<div className="mobile-nav-cta">
								<button
									type="button"
									className={`aximo-default-btn pill lya-header-journey-btn${journeyGlow ? " lya-journey-glow" : ""}`}
									onClick={scrollToContact}
								>
									Start your journey
								</button>
								<button
									type="button"
									className="aximo-default-btn pill lya-header-freebie-btn"
									onClick={handleFreebie}
								>
									Get your FREE Un-overwhelm Guide
								</button>
							</div>
						</motion.nav>

						<motion.div
							className="mobile-nav--overlay"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.18 }}
							onClick={() => setShowMenu(false)}
						/>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MobileNavbar;
