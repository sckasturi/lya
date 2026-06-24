import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollTop() {
	const location = useLocation();

	useEffect(() => {
		const hash = location.hash?.replace(/^#/, "") || "";

		if (hash) {
			const scrollToHash = () => {
				document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
			};
			// Allow routed content to mount before scrolling.
			const timer = window.setTimeout(scrollToHash, 150);
			return () => window.clearTimeout(timer);
		}

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "auto",
		});
	}, [location.pathname, location.hash]);
}
