import { createBrowserRouter } from "react-router-dom";
import Handout from "../page/Handout.jsx";
import LayoutThree from "../components/layout/LayoutThree.jsx";
import Layout from "../components/layout/index.jsx";
import ErrorPage from "../error-page";
import AboutUs from "../page/AboutUs";
import ContactUs from "../page/ContactUs";
import BlogGridPage from "../page/blog/BlogGridPage.jsx";
import BlogPage from "../page/blog/BlogPage.jsx";
import SingleBlogPage from "../page/blog/SingleBlog.jsx";
import HomeThree from "../page/home/HomeThree.jsx";
import PortfolioOneColumn from "../page/portfolio/PortfolioOneColoum";
import PortfolioTwoColumn from "../page/portfolio/PortfolioTwoColumn";
import SinglePortfolio from "../page/portfolio/SinglePortfolio";
import Service from "../page/service";
import SingleService from "../page/service/SingleService.jsx";
import Team from "../page/team";
import SingleTeam from "../page/team/SingleTeam.jsx";
import Faq from "../page/utility/Faq.jsx";
import PrivacyPolicy from "../page/PrivacyPolicy.jsx";
import TestimonialPage from "../page/utility/Testimonial.jsx";

export const router = createBrowserRouter([
	{
		path: "/handout",
		element: <Handout />,
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
						path: "/about-us",
						element: <AboutUs />,
					},
					{
						path: "/contact-us",
						element: <ContactUs />,
					},
					{
						path: "/faq",
						element: <Faq />,
					},
					{
						path: "/privacy-policy",
						element: <PrivacyPolicy />,
					},

					{
						path: "/testimonial",
						element: <TestimonialPage />,
					},

					
					{
						path: "/blog",
						element: <BlogPage />,
					},
					{
						path: "/single-blog",
						element: <SingleBlogPage />,
					},
					{
						path: "/blog-grid",
						element: <BlogGridPage />,
					},
					{
						path: "/service",
						element: <Service />,
					},
					{
						path: "/single-service",
						element: <SingleService />,
					},
					{
						path: "/team",
						element: <Team />,
					},
					{
						path: "/single-team",
						element: <SingleTeam />,
					},
					{
						path: "/portfolio-one",
						element: <PortfolioOneColumn />,
					},
					{
						path: "/portfolio-two",
						element: <PortfolioTwoColumn />,
					},
					{
						path: "/single-portfolio",
						element: <SinglePortfolio />,
					},
					{
						path: "/home1",
						element: <HomeThree />,
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
