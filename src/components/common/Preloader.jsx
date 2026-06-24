import { useEffect, useState } from "react";

export default function Preloader() {
	const [showLoader, setShowLoader] = useState(true);

	useEffect(() => {
		const timer = window.setTimeout(() => {
			setShowLoader(false);
		}, 700);

		return () => window.clearTimeout(timer);
	}, []);

	if (!showLoader) return null;

	return (
		<div className="aximo-preloader-wrap">
			<div className="aximo-preloader">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
