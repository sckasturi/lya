import { useEffect, useState } from "react";

export default function ScrollToTop() {
	const [showTopBtn, setShowTopBtn] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setShowTopBtn(window.scrollY > 700);
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	if (!showTopBtn) return null;

	return (
		<div
			className="aximo-go-top"
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			role="button"
			tabIndex={0}
			aria-label="Scroll to top"
			onKeyDown={(event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					window.scrollTo({ top: 0, behavior: "smooth" });
				}
			}}
		>
			<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
				<path
					d="M10 4L4 11H8V16H12V11H16L10 4Z"
					fill="currentColor"
				/>
			</svg>
		</div>
	);
}
