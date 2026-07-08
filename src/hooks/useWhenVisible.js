import { useEffect, useRef, useState } from "react";

/** Fires once when the element enters the viewport (good for lazy embeds). */
export default function useWhenVisible(options = {}) {
	const ref = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node || isVisible) return undefined;

		if (typeof IntersectionObserver === "undefined") {
			setIsVisible(true);
			return undefined;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{
				rootMargin: options.rootMargin || "200px 0px",
				threshold: options.threshold ?? 0.01,
			},
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [isVisible, options.rootMargin, options.threshold]);

	return { ref, isVisible };
}
