import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LayoutThree from "../components/layout/LayoutThree.jsx";
import Layout from "../components/layout/index.jsx";

const Handout = lazy(() => import("../page/Handout.jsx"));
const UnOverwhelmGuide = lazy(() => import("../page/UnOverwhelmGuide.jsx"));
const HomeThree = lazy(() => import("../page/home/HomeThree.jsx"));
const PrivacyPolicy = lazy(() => import("../page/PrivacyPolicy.jsx"));
const ErrorPage = lazy(() => import("../error-page"));

function RouteFallback() {
	return null;
}

export const router = createBrowserRouter([
	{
		path: "/handout",
		element: (
			<Suspense fallback={<RouteFallback />}>
				<Handout />
			</Suspense>
		),
	},
	{
		path: "/un-overwhelm-guide",
		element: (
			<Suspense fallback={<RouteFallback />}>
				<UnOverwhelmGuide />
			</Suspense>
		),
	},
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <LayoutThree />,
				children: [
					{
						path: "/",
						element: (
							<Suspense fallback={<RouteFallback />}>
								<HomeThree />
							</Suspense>
						),
					},
					{
						path: "/privacy-policy",
						element: (
							<Suspense fallback={<RouteFallback />}>
								<PrivacyPolicy />
							</Suspense>
						),
					},
					{
						path: "*",
						element: (
							<Suspense fallback={<RouteFallback />}>
								<ErrorPage />
							</Suspense>
						),
					},
				],
			},
		],
	},
]);
