import { createBrowserRouter } from "react-router-dom";
import Handout from "../page/Handout.jsx";
import UnOverwhelmGuide from "../page/UnOverwhelmGuide.jsx";
import LayoutThree from "../components/layout/LayoutThree.jsx";
import Layout from "../components/layout/index.jsx";
import ErrorPage from "../error-page";
import HomeThree from "../page/home/HomeThree.jsx";
import PrivacyPolicy from "../page/PrivacyPolicy.jsx";

export const router = createBrowserRouter([
	{
		path: "/handout",
		element: <Handout />,
	},
	{
		path: "/un-overwhelm-guide",
		element: <UnOverwhelmGuide />,
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
						element: <HomeThree />,
					},
					{
						path: "/privacy-policy",
						element: <PrivacyPolicy />,
					},
					{
						path: "*",
						element: <ErrorPage />,
					},
				],
			},
		],
	},
]);
