import { QRCodeSVG } from "qrcode.react";
import LogoImg from "../assets/images/logo/logo-dark.svg";
import PhotoImg from "../assets/images/lya/amma photos-12.jpg";

function Handout() {
	return (
		<div className="lya-handout">
			{/* Print button – hidden when printing */}
			<button className="lya-handout-print-btn" onClick={() => window.print()}>
				Print / Save as PDF
			</button>

			<div className="lya-handout-page">
				{/* ── Header bar ─────────────────────────────────── */}
				<header className="lya-handout-header">
					<img src={LogoImg} alt="Leverage Your ADHD" className="lya-handout-logo" />
					<span className="lya-handout-url">leverageyouradhd.com</span>
				</header>

				{/* ── Hero strip ─────────────────────────────────── */}
				<div className="lya-handout-hero">
					<div className="lya-handout-hero-text">
						<h1>Sudhita Kasturi</h1>
						<p className="lya-handout-title">Certified &amp; Credentialed ADHD Life Coach</p>
						<p className="lya-handout-tagline">
							Navigate your ADHD dilemmas in partnership with a coach dedicated to helping
							you live authentically.
						</p>
					</div>
					<img src={PhotoImg} alt="Sudhita Kasturi" className="lya-handout-photo" />
				</div>

				{/* ── Body ───────────────────────────────────────── */}
				<div className="lya-handout-body">
					{/* Left column */}
					<div className="lya-handout-col lya-handout-col-left">
						<section className="lya-handout-section">
							<h2>About Sudhita</h2>
	
							{/*<p>
								As a Certified ADHD Coach, I partner with you to navigate the challenges
								of ADHD and leverage its positive attributes to create a happy and
								fulfilling life for yourself and your family.
							</p>
							<p>
								Taking science and mindfulness into account, we will understand where,
								when, and how your ADHD is coming into play—and how to navigate this
								difference effectively.
							</p>
							<p>
								With a strength-based approach, we will amplify your inherent gifts and
								mitigate the difficulties of ADHD. I can work with you with or without a
								formal diagnosis.
							</p>*/}
							<p>I coach high-potential professionals and academics globally, leveraging my experience as an educator, entrepreneur, and program director. My clients include Fortune 500 executives, federal employees, physicians, medical residents, and program managers. I partner with them to embrace their ADHD and live happy, productive, and fulfilled lives.</p>
<p>As the founder of Leverage Your ADHD, I am committed to raising awareness about ADHD, especially in underserved populations. I facilitate the Attention Deficit Disorder Association’s (ADDA) South Asian Virtual Peer Support Group and am the Diversity, Equity, Inclusion & Belonging (DEIB) Chair on the Board of the ADHD Coaches Organization (ACO).</p>

						</section>

						<section className="lya-handout-section">
							<h2>Who I Work With</h2>
							<ul className="lya-handout-bullets">
								<li>C-Suite Executives</li>
								<li>Academics &amp; Post-Docs</li>
								<li>College Students on Probation</li>
								<li>Medical &amp; Law Students</li>
								<li>Parents of Neurodiverse Children</li>
							</ul>
						</section>

					</div>

					{/* Right column */}
					<div className="lya-handout-col lya-handout-col-right">
						<section className="lya-handout-section">
							<h2>What I Offer</h2>

							<div className="lya-handout-offering">
								<h3>Personalized ADHD Coaching</h3>
								<p>
								I partner with my clients to reframe their perspectives, co-create actionable strategies, educate them about their unique wiring, and empower them to make the change they desire and thrive with their ADHD. 
	</p>
							</div>

							<div className="lya-handout-offering">
								<h3>Group Coaching for South Asian Professionals</h3>
								<p>
								Group sessions for South Asian professionals to navigate the challenges of ADHD. We will strengthen personal and professional growth through shared learning, connection, and accountability.
	</p>
							</div>

							<div className="lya-handout-offering">
								<h3>Speaking Engagements</h3>
							<p>I draw upon my experience and knowledge to educate and empower audiences.</p>
							</div>
						</section>

						<section className="lya-handout-section">
							<h2>Curriculum Vitae</h2>
							<ul className="lya-handout-bullets">
								<li>I facilitate the Attention Deficit Disorder Association&apos;s (ADDA) South Asian Virtual Peer Support Group and am the Diversity, Equity, Inclusion &amp; Belonging (DEIB) Chair on the Board of the ADHD Coaches Organization (ACO).</li>
								<li>My past events include Sonos, United States Agency for Global Media, Bitcamp, Technica, and Lorain County Community College.</li>
							</ul>
						</section>

					</div>
				</div>

				{/* ── Contact + QR band ─────────────────────────── */}
				<div className="lya-handout-contact-band">
					<div className="lya-handout-contact-details">
						<h2>Get in touch</h2>
					<ul>
							<li><strong>Phone:</strong> <a href="tel:+15713768033">(571) 376-8033</a></li>
							<li><strong>Website:</strong> <a href="https://leverageyouradhd.com">leverageyouradhd.com</a></li>
							<li><strong>Email:</strong> <a href="mailto:hello@leverageyouradhd.com">hello@leverageyouradhd.com</a></li>
							<li><strong>Schedule:</strong> <a href="https://calendly.com/leverageyouradhd/30min">calendly.com/leverageyouradhd</a></li>
						</ul>
					</div>

					<div className="lya-handout-contact-divider" />

					<div className="lya-handout-qr-wrap">
						<QRCodeSVG
							value="https://calendly.com/leverageyouradhd/30min"
							size={110}
							fgColor="#000000"
							bgColor="#ffffff"
							level="M"
						/>
					</div>
				</div>

				{/* ── Footer CTA ─────────────────────────────────── */}
				<footer className="lya-handout-footer">
					<p>
						Ready to start your journey?{" "}
						<strong>Schedule a free consultation at leverageyouradhd.com</strong>
					</p>
				</footer>
			</div>
		</div>
	);
}

export default Handout;
