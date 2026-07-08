import { forwardRef, lazy, Suspense } from "react";

const ReCAPTCHA = lazy(() => import("react-google-recaptcha"));

const placeholder = <div style={{ minHeight: 78 }} aria-hidden="true" />;

/**
 * Mounts Google reCAPTCHA only once `active` is true (e.g. after the user
 * focuses the form). Keeps ~0.5 MB of third-party JS off the initial page
 * load, which is the single biggest Total Blocking Time win on this site.
 * Reserves the widget's height so nothing shifts when it appears.
 */
const DeferredRecaptcha = forwardRef(function DeferredRecaptcha(
	{ active, ...props },
	ref
) {
	if (!active) return placeholder;
	return (
		<Suspense fallback={placeholder}>
			<ReCAPTCHA ref={ref} {...props} />
		</Suspense>
	);
});

export default DeferredRecaptcha;
