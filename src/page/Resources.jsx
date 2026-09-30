/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FadeInUp from "../components/animation/FadeInUp";
import { FadeInStaggerTwo, FadeInStaggerTwoChildren } from "../components/animation/FadeInStaggerTwo";
import ACO from "../assets/images/lya/aco.webp";
import ADDA from "../assets/images/lya/adda.webp";
import ADHD_MONTH from "../assets/images/lya/adhd-awareness-month.png";
import ADDITUDE from "../assets/images/lya/additude.svg";
import CHADD from "../assets/images/lya/chadd.webp";
import "../assets/css/resources.css";

// Sudhita's own podcast appearances, featured at the top of the page.
const FEATURED_EPISODES = [
	{
		youtubeId: "QudRe6rNx7A",
		title: "The Truth About ADHD That No One Talks About",
		show: "Unmute with Priya",
	},
	{
		youtubeId: "s4YybNBddQY",
		title: "Understanding Neurodiversity",
		show: "Chinmaya Mission Niagara",
		guests: "with Anantya Chandra & Neelu Pandey",
	},
	{
		youtubeId: "szxd0jMwcbo",
		title: "It’s Butter Day! Time Blindness and Impulsive Responses",
		show: "ADDA T-ADD Talk",
	},
];

const START_HERE = {
	source: "ADDitude",
	title: "How Adults with ADHD Think: Uncomfortable Truths About the ADHD Nervous System",
	url: "https://www.additudemag.com/adhd-in-adults-nervous-system/",
};

const ORGANIZATIONS = [
	{
		name: "CHADD",
		fullName: "Children and Adults with Attention-Deficit/Hyperactivity Disorder",
		description: "Improving the lives of those with ADHD.",
		url: "https://chadd.org/",
		logo: CHADD,
	},
	{
		name: "ADDA",
		fullName: "Attention Deficit Disorders Association",
		url: "https://add.org/",
		logo: ADDA,
	},
	{
		name: "ACO",
		fullName: "ADHD Coaches Organization",
		description: "Promoting ADHD coaches and coaching.",
		url: "https://acoo.memberclicks.net/",
		logo: ACO,
	},
	{
		name: "ADDitude",
		fullName: "ADDitude Magazine",
		url: "https://www.additudemag.com/",
		logo: ADDITUDE,
	},
	{
		name: "AAM",
		fullName: "ADHD Awareness Month",
		url: "https://www.adhdawarenessmonth.org/",
		logo: ADHD_MONTH,
	},
];

const LISTEN_AND_WATCH = [
	{
		heading: "Podcasts",
		items: [
			{ title: "Translating ADHD", by: "Hosted by Cameron Gott and Asher Collins", url: "https://translatingadhd.com/" },
			{ title: "The ADHD Podcast", by: "Hosted by Nikki Kinzer and Pete Wright", url: "https://takecontroladhd.com/the-adhd-podcast" },
		],
	},
	{
		heading: "Documentaries",
		items: [
			{ title: "ADD & Loving It!", by: "PBS Documentary", url: "https://www.youtube.com/watch?v=N49trzkqdTo" },
		],
	},
	{
		heading: "Video resources",
		items: [
			{ title: "Plan for Success Planning Journal: How to plan your day and get control of your life!", by: "DVD · Joyce Kubik" },
			{ title: "Building Life-long Strategies Through Self-awareness", by: "DVD · Joyce Kubik" },
		],
	},
];

const BOOKS = [
	{
		heading: "Books on ADHD",
		items: [
			{ title: "ADHD 2.0: New Science and Essential Strategies for Thriving with Distraction—from Childhood through Adulthood", author: "Ned Hallowell & John Ratey" },
			{ title: "Smart but Scattered", author: "Peg Dawson" },
			{ title: "Driven to Distraction", author: "Ned Hallowell & John Ratey" },
			{ title: "Unraveling ADHD: How I turned my greatest deficit into my greatest asset", author: "Joyce Kubik" },
			{ title: "Why We Sleep", author: "Matthew Walker" },
			{ title: "Your Brain's Not Broken: Strategies for Navigating Your Emotions and Life with ADHD", author: "Tamara Rosier, PhD" },
		],
	},
	{
		heading: "Children’s books on ADHD",
		items: [
			{ title: "All Dogs Have ADHD", author: "Kathy Hoopmann" },
			{ title: "All Cats Have Asperger Syndrome", author: "Kathy Hoopmann" },
		],
	},
	{
		heading: "Other related books",
		items: [
			{ title: "StrengthsFinder", author: "Tom Rath" },
			{ title: "Freeing Your Child From Anxiety", author: "Tamar Chansky" },
			{ title: "Aphantasia", author: "Alan Kendle" },
			{ title: "How to Talk So Kids Will Listen and Listen So Kids Will Talk", author: "Adele Faber" },
			{ title: "How to Talk So Teens Will Listen and Listen So Teens Will Talk", author: "Adele Faber & Elaine Mazlish" },
			{ title: "The Five Love Languages of Teenagers", author: "Gary Chapman" },
			{ title: "The Five Love Languages", author: "Gary Chapman" },
			{ title: "The Power of Now", author: "Eckhart Tolle" },
		],
	},
];

function ExternalLink({ href, className, children, label }) {
	return (
		<a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={label}>
			{children}
		</a>
	);
}

function Arrow() {
	return (
		<svg className="lya-res-arrow" width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="M4.5 11.5l7-7M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

// Shows the thumbnail until clicked, so YouTube's player only loads on demand.
function YouTubeEpisode({ youtubeId, title }) {
	const [playing, setPlaying] = useState(false);

	if (playing) {
		return (
			<iframe
				className="lya-res-video-frame"
				src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
				title={title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
			/>
		);
	}

	return (
		<button type="button" className="lya-res-video-poster" onClick={() => setPlaying(true)} aria-label={`Play: ${title}`}>
			<img
				src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
				alt=""
				width="480"
				height="360"
				loading="lazy"
				decoding="async"
			/>
			<span className="lya-res-video-play" aria-hidden="true">
				<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
					<path d="M8 5.5v13l10.5-6.5z" />
				</svg>
			</span>
		</button>
	);
}

function displayDomain(url) {
	return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

function Resources() {
	useEffect(() => {
		const previous = document.title;
		document.title = "ADHD Resources - Leverage Your ADHD";
		return () => {
			document.title = previous;
		};
	}, []);

	return (
		<div className="lya-resources cream-bg">
			<section className="lya-res-intro">
				<div className="container">
					<FadeInUp>
						<p className="lya-res-eyebrow">Resources</p>
						<h1 className="lya-res-title">Where to go for reliable information about ADHD</h1>
					</FadeInUp>
					<FadeInUp>
						<ExternalLink href={START_HERE.url} className="lya-res-start navy-bg">
							<span className="lya-res-start-label">Start here</span>
							<span className="lya-res-start-title">{START_HERE.title}</span>
							<span className="lya-res-start-meta">
								{START_HERE.source}
								<Arrow />
							</span>
						</ExternalLink>
					</FadeInUp>
					<section className="lya-res-featured" aria-labelledby="lya-res-featured-heading">
						<h2 id="lya-res-featured-heading" className="lya-res-group-heading">
							Listen to Sudhita
						</h2>
						<FadeInStaggerTwo className="lya-res-featured-grid">
							{FEATURED_EPISODES.map((episode) => (
								<FadeInStaggerTwoChildren key={episode.youtubeId} className="lya-res-episode">
									<div className="lya-res-video">
										<YouTubeEpisode youtubeId={episode.youtubeId} title={episode.title} />
									</div>
									<div className="lya-res-episode-body">
										<span className="lya-res-episode-show">{episode.show}</span>
										<h3>{episode.title}</h3>
										{episode.guests && <p>{episode.guests}</p>}
										<ExternalLink
											href={`https://www.youtube.com/watch?v=${episode.youtubeId}`}
											className="lya-res-episode-link"
										>
											Watch on YouTube
											<Arrow />
										</ExternalLink>
									</div>
								</FadeInStaggerTwoChildren>
							))}
						</FadeInStaggerTwo>
					</section>
				</div>
			</section>

			<section className="lya-res-section" aria-labelledby="lya-res-orgs">
				<div className="container">
					<div className="lya-res-section-head">
						<h2 id="lya-res-orgs">On the web</h2>
					</div>
					<FadeInStaggerTwo className="lya-res-org-grid">
						{ORGANIZATIONS.map((org) => (
							<FadeInStaggerTwoChildren key={org.url}>
								<ExternalLink href={org.url} className="lya-res-org-card" label={`${org.fullName} (opens in a new tab)`}>
									<div className="lya-res-org-top">
										{org.logo ? (
											<img src={org.logo} alt="" className="lya-res-org-logo" loading="lazy" decoding="async" />
										) : (
											<span className="lya-res-org-mark" aria-hidden="true">
												{org.name}
											</span>
										)}
										<Arrow />
									</div>
									<h3>{org.fullName}</h3>
									{org.description && <p>{org.description}</p>}
									<span className="lya-res-org-domain">{displayDomain(org.url)}</span>
								</ExternalLink>
							</FadeInStaggerTwoChildren>
						))}
					</FadeInStaggerTwo>
				</div>
			</section>

			<section className="lya-res-section lya-res-section--tinted" aria-labelledby="lya-res-listen">
				<div className="container">
					<div className="lya-res-section-head">
						<h2 id="lya-res-listen">Listen &amp; watch</h2>
					</div>
					<div className="lya-res-columns">
						{LISTEN_AND_WATCH.map((group) => (
							<FadeInUp key={group.heading} className="lya-res-column">
								<h3 className="lya-res-group-heading">{group.heading}</h3>
								<ul className="lya-res-list">
									{group.items.map((item) => (
										<li key={item.title}>
											{item.url ? (
												<ExternalLink href={item.url} className="lya-res-list-link">
													<span className="lya-res-list-title">
														{item.title}
														<Arrow />
													</span>
													<span className="lya-res-list-by">{item.by}</span>
												</ExternalLink>
											) : (
												<div className="lya-res-list-static">
													<span className="lya-res-list-title">{item.title}</span>
													<span className="lya-res-list-by">{item.by}</span>
												</div>
											)}
										</li>
									))}
								</ul>
							</FadeInUp>
						))}
					</div>
				</div>
			</section>

			<section className="lya-res-section" aria-labelledby="lya-res-books">
				<div className="container">
					<div className="lya-res-section-head">
						<h2 id="lya-res-books">Reading list</h2>
					</div>
					<div className="lya-res-books">
						{BOOKS.map((group) => (
							<FadeInUp key={group.heading} className="lya-res-book-group">
								<h3 className="lya-res-group-heading">{group.heading}</h3>
								<ol className="lya-res-book-list">
									{group.items.map((book, i) => (
										<li key={book.title}>
											<span className="lya-res-book-number">{String(i + 1).padStart(2, "0")}</span>
											<span className="lya-res-book-text">
												<cite>{book.title}</cite>
												<span className="lya-res-list-by">{book.author}</span>
											</span>
										</li>
									))}
								</ol>
							</FadeInUp>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}

export default Resources;
