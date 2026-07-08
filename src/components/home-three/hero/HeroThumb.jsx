// Served from public/ with a stable URL so index.html can preload it —
// this is the LCP image, and preloading lets the browser fetch it before
// React renders. If you replace the photo, rename the file (and update the
// preload link in index.html) so cached visitors get the new version.
const HERO_IMG = "/assets/hero/sudhita-hero.webp";

function HeroThumb() {
	return (
		<div className="aximo-hero-thumb3-wrap">
			<div className="aximo-hero-thumb3">
				<img
					src={HERO_IMG}
					alt="Sudhita Kasturi"
					width="960"
					height="1280"
					fetchPriority="high"
					decoding="async"
				/>
			</div>
		</div>
	);
}

export default HeroThumb;
