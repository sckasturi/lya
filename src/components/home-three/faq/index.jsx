import FadeInUp from "../../animation/FadeInUp";
import FaqAccordion from "./FaqAccordion";

const faqData = [
	{
		id: crypto.randomUUID(),
		ques: "What is coaching?",
		ans: "Life coaching is an opportunity to work with someone who can help you identify and support you in achieving goals. Unlike an expert or authority figure, a life coach is a teammate who creates a safe space for you to slow down and explore your options without judgment.</p><p><b>A life coach is not a consultant, mentor, therapist, tutor, or friend.</b> They do not tell you what to do or diagnose you. Instead, they recognize that you are the expert in your life and work with you where you are. While they may offer suggestions based on their training and knowledge, their primary role is to inspire and encourage you to harness your strengths and design the life you want for yourself.",
	},
	{
		id: crypto.randomUUID(),
		ques: "How is ADHD Coaching different?",
		ans: "The ADHD brain functions differently due to its unique neurochemistry. An ADHD Life Coach is specifically trained to understand how this difference manifests in everyday life and helps individuals move forward from where they are. They use their knowledge of the ADHD brain to offer customized solutions tailored to the individual's needs. These goals can range from making a career change, studying for a test, completing homework, or establishing a daily routine.</p><p>ADHD coaching is a collaborative process that helps individuals increase their self-awareness and develop problem-solving skills. Individuals can take action toward self-efficacy by leveraging their strengths and addressing their challenges. The ADHD coach plays many roles, including motivator, strategist, educator, and accountability partner. They support individuals in their journey of self-discovery and act as a guide from the passenger seat while the individual drives their own life.",
	},
	{
		id: crypto.randomUUID(),
		ques: "Is ADHD Coaching confidential?",
		ans: "Confidentiality and ethical standards are essential aspects of ADHD coaching. This allows you to freely and comfortably discuss your concerns with your coach. As confidentiality is of utmost importance to the coaching relationship, your consent is required to communicate with anyone, be it a family member or a medical professional you may be working with.",
	},
	{
		id: crypto.randomUUID(),
		ques: "What is the difference between coaching and therapy?",
		ans: "The International Coaching Federation (ICF) defines coaching as &ldquo;partnering with clients in a thought-provoking and creative process that inspires them to maximize their personal and professional potential.&rdquo;</p><p>The American Psychological Association (APA) defines psychotherapy as &ldquo;the informed and intentional application of clinical methods and interpersonal stances derived from established psychological principles for the purpose of assisting people to modify their behaviors, cognitions, emotions, and/or other personal characteristics in directions that the participants deem desirable.&rdquo;</p><p>Coaching is a cognitive process that is present and future-focused. Coaching involves partnering with your coach to identify the current dilemma, articulate the desired results, and carve a path from where you are to where you want to be. Therapy is a clinical/medical model that delves into deep-seated issues from the past that may be impacting the present. Due to the difference between the two, therapy is one of the recommended modalities that is very effective in ADHD management. It is common for individuals to work with a coach and therapist simultaneously, and working as a team with both can yield excellent results for ADHD individuals.",
	},
	{
		id: crypto.randomUUID(),
		ques: "Do I need to be taking medication for my ADHD to benefit from coaching?",
		ans: "Medication is outside the scope of coaching. ADHD medication is a medical decision that the ADHD individual needs to make with their medical provider. ADHD Coaching is an effective modality to manage ADHD, so whether or not you are taking medication does not have a bearing on the ADHD coaching process.",
	},
];

function Faq() {
	return (
		<div className="section aximo-section-padding cream-bg">
			<div className="container">
				<div className="lya-faq-header">
					<h2>Any last questions?</h2>
				</div>
				<FadeInUp>
					<div className="lya-faq-list">
						{faqData.map((faq, index) => (
							<FaqAccordion faq={faq} key={faq.id} index={index} />
						))}
					</div>
				</FadeInUp>
			</div>
		</div>
	);
}

export default Faq;
