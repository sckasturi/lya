import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useScrollTop from "../../hooks/useScrollTop";
import Preloader from "../common/Preloader";
import ScrollToTop from "../common/ScrollToTop";

function Layout() {
	useScrollTop();
	const location = useLocation();

	useEffect(() => {
		if (typeof window.gtag === "function") {
			window.gtag("event", "page_view", {
				page_path: location.pathname + location.search,
				page_title: document.title,
			});
		}
	}, [location]);

	return (
		<>
			<Preloader />
			<Outlet />
			<ScrollToTop />
		</>
	);
}

export default Layout;
