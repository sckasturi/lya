/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FadeInUp from "../components/animation/FadeInUp";
import {
	CV_CERTIFICATIONS,
	CV_CONTACT,
	CV_EDUCATION,
	CV_EXPERIENCE,
	CV_LANGUAGES,
	CV_SPEAKING,
	CV_SUMMARY,
	CV_UPDATED,
	CV_VOLUNTEER,
} from "../components/cv/cvData";
// Shares the intro/section layout with the Resources page.
import "../assets/css/resources.css";
import "../assets/css/cv.css";

function Arrow() {
	return (
		<svg className="lya-res-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="M4.5 11.5l7-7M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function CvRow({ date, heading, headingItalic, sub, detail, points, link }) {
	const headingText = headingItalic ? <cite>{heading}</cite> : heading;
	return (
		<li className="lya-cv-row">
			<span className="lya-cv-date">{date}</span>
			<div className="lya-cv-body">
				<h3 className="lya-cv-heading">
					{link ? (
						<a href={link} target="_blank" rel="noopener noreferrer">
							{headingText}
							<Arrow />
						</a>
					) : (
						headingText
					)}
				</h3>
				{sub && <p className="lya-cv-sub">{sub}</p>}
				{detail && <p className="lya-cv-detail">{detail}</p>}
				{points && (
					<ul className="lya-cv-points">
						{points.map((point) => (
							<li key={point}>{point}</li>
						))}
					</ul>
				)}
			</div>
		</li>
	);
}

function CvSection({ id, title, tinted, children }) {
	return (
		<section className={`lya-res-section${tinted ? " lya-res-section--tinted" : ""}`} aria-labelledby={id}>
			<div className="container">
				<div className="lya-res-section-head">
					<h2 id={id}>{title}</h2>
				</div>
				<FadeInUp>{children}</FadeInUp>
			</div>
		</section>
	);
}

function CurriculumVitae() {
	useEffect(() => {
		const previous = document.title;
		document.title = "Curriculum Vitae - Sudhita Kasturi";
		return () => {
			document.title = previous;
		};
	}, []);

	return (
		<div className="lya-resources lya-cv cream-bg">
			<section className="lya-res-intro">
				<div className="container">
					<FadeInUp>
						<p className="lya-res-eyebrow">Curriculum Vitae</p>
						<h1 className="lya-res-title lya-cv-name">Sudhita Kasturi</h1>
						<p className="lya-cv-tagline">Board Certified Coach · Certified ADHD Life Coach</p>
						<p className="lya-cv-summary">{CV_SUMMARY}</p>
						<div className="lya-cv-meta">
							<a href={`mailto:${CV_CONTACT.email}`}>{CV_CONTACT.email}</a>
							<Link to="/">{CV_CONTACT.website}</Link>
							<span>Updated {CV_UPDATED}</span>
						</div>
					</FadeInUp>
				</div>
			</section>

			<section className="lya-res-section" aria-labelledby="lya-cv-credentials">
				<div className="container">
					<div className="lya-res-section-head">
						<h2 id="lya-cv-credentials">Education &amp; credentials</h2>
					</div>
					<FadeInUp className="lya-cv-cards">
						<div className="lya-cv-card">
							<h3 className="lya-res-group-heading">Education</h3>
							<ul className="lya-cv-card-list">
								{CV_EDUCATION.map((item) => (
									<li key={item.name + item.place}>
										<strong>{item.name}</strong>
										<span>{item.place}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="lya-cv-card">
							<h3 className="lya-res-group-heading">Certifications &amp; credentials</h3>
							<ul className="lya-cv-card-list">
								{CV_CERTIFICATIONS.map((item) => (
									<li key={item.name + item.place}>
										<strong>{item.name}</strong>
										<span>{item.place}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="lya-cv-card lya-cv-card--navy navy-bg">
							<h3 className="lya-res-group-heading">Languages spoken</h3>
							<ul className="lya-cv-card-list">
								{CV_LANGUAGES.map((item) => (
									<li key={item.name}>
										<strong>{item.name}</strong>
										<span>{item.level}</span>
									</li>
								))}
							</ul>
						</div>
					</FadeInUp>
				</div>
			</section>

			<CvSection id="lya-cv-experience" title="Relevant work experience" tinted>
				<ol className="lya-cv-rows">
					{CV_EXPERIENCE.map((item) => (
						<CvRow
							key={item.role + item.org}
							date={item.dates}
							heading={item.role}
							sub={item.org}
							points={item.points}
						/>
					))}
				</ol>
			</CvSection>

			<CvSection id="lya-cv-volunteer" title="Volunteer engagement">
				<ol className="lya-cv-rows">
					{CV_VOLUNTEER.map((item) => (
						<CvRow
							key={item.role + item.org}
							date={item.dates}
							heading={item.role}
							sub={item.org}
							detail={item.detail}
							link={item.link}
						/>
					))}
				</ol>
			</CvSection>

			<CvSection id="lya-cv-speaking" title="Speaking engagements">
				<ol className="lya-cv-rows">
					{CV_SPEAKING.map((item) => (
						<CvRow
							key={item.title + item.date}
							date={item.date}
							heading={item.title}
							headingItalic
							sub={item.event}
							link={item.link}
						/>
					))}
				</ol>
			</CvSection>
		</div>
	);
}

export default CurriculumVitae;
