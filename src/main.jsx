import React from "react";
import ReactDOM from "react-dom/client";
import { initCtaColorExperiment } from "./lib/ctaColorExperiment";
import { ensureGtagStub } from "./lib/loadAnalytics";

import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/app.css";
import "./assets/css/main.css";
import "./assets/css/cta-color-experiment-teal.css";
import "./assets/css/performance.css";
import "./assets/css/lya-hero.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";

// After a deploy, visitors with a cached page may request old hashed
// chunk files that no longer exist ("Unable to preload CSS…"). Vite fires
// vite:preloadError in that case — reload once to pick up the new build.
window.addEventListener("vite:preloadError", (event) => {
	const KEY = "lya-chunk-reload";
	if (sessionStorage.getItem(KEY) === "1") return; // avoid reload loops
	sessionStorage.setItem(KEY, "1");
	event.preventDefault();
	window.location.reload();
});

initCtaColorExperiment();
ensureGtagStub();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
