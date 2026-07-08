import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getCtaColorExperimentParams } from "../../lib/ctaColorExperiment";
import { scheduleAnalytics } from "../../lib/loadAnalytics";
import useScrollTop from "../../hooks/useScrollTop";
import MotionProvider from "../common/MotionProvider";
import ScrollToTop from "../common/ScrollToTop";

function Layout() {
	useScrollTop();
	const location = useLocation();

	useEffect(() => {
		scheduleAnalytics();
	}, []);

	useEffect(() => {
		if (typeof window.gtag === "function") {
			window.gtag("event", "page_view", {
				page_path: location.pathname + location.search,
				page_title: document.title,
				...getCtaColorExperimentParams(),
			});
		}
	}, [location]);

	return (
		<MotionProvider>
			<Outlet />
			<ScrollToTop />
		</MotionProvider>
	);
}

export default Layout;
