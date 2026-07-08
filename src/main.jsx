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

initCtaColorExperiment();
ensureGtagStub();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
