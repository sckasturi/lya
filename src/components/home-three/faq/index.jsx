import FadeInUp from "../../animation/FadeInUp";
import FaqAccordion from "./FaqAccordion";

const faqData = [
	{
		id: crypto.randomUUID(),
		ques: "How long does ADHD coaching take?",
		ans: "My coaching is customized to your challenges. The initial commitment is 4 sessions to determine if we are a good fit for each other. The first session is 75-90 minutes long, followed by a weekly 60 minute session. A typical coaching trajectory is 4-6 months. After that, we can mutually determine the cadence that best suits your needs.",
	},
	{
		id: crypto.randomUUID(),
		ques: "What does a life coach do?",
		ans: "A life coach is a teammate who creates a safe space for you to slow down and reflect on your life. They can help you identify your strengths and weaknesses and support you on your journey to your goals.</p><p>A coach is not a consultant, mentor, therapist, tutor, doctor, or friend. They can&apos;t diagnose you or tell you what to do. They help you understand that you are the expert in your life and work with you where you are. While they may offer suggestions based on their training and knowledge, their primary role is to collaborate with you and encourage you to harness your strengths and design the life you want for yourself.",
	},
	{
		id: crypto.randomUUID(),
		ques: "Why do I need a life coach who specializes in ADHD?",
		ans: "An ADHD life coach embodies the principles of a life coach while bringing specialized training and knowledge of how the ADHD brain functions differently.</p><p>They partner with you to move forward from where you are to where you want to be, taking your unique neurochemistry into account. They help you design strategies tailored to your needs, whether you&apos;re changing careers, completing a project, studying for a test, or establishing a daily routine.</p><p>ADHD coaching is a collaborative process that helps you increase your self-awareness and develop problem-solving skills. By leveraging your strengths and addressing your challenges, your coach can help you take steps toward building self-efficacy.</p><p>You&apos;re the driver of your life, and they support you on your journey.",
	},
	{
		id: crypto.randomUUID(),
		ques: "Is ADHD coaching confidential?",
		ans: "Yes. Coaching is bound by professional and ethical standards, so you can share freely and comfortably in a safe, judgment-free, confidential space. We won&apos;t discuss what you share with anyone without your consent. This applies to medical and therapeutic providers, family members, or supervisors, even if they are paying for your coaching services.</p><p>The exception is in cases of potential harm to yourself or others.",
	},
	{
		id: crypto.randomUUID(),
		ques: "Is coaching the same as therapy?",
		ans: "Coaching is a cognitive process that is present and future-focused. Therapy is a clinical model that delves into deep-seated issues from the past that may be impacting the present.</p><p>Coaching involves partnering with your coach to identify the current dilemma, articulate the desired results, and carve a path from where you are to where you want to be. The International Coaching Federation (ICF) defines coaching as &ldquo;partnering with clients in a thought-provoking and creative process that inspires them to maximize their personal and professional potential.&rdquo;</p><p>The American Psychological Association (APA) defines psychotherapy as &ldquo;the informed and intentional application of clinical methods and interpersonal stances derived from established psychological principles for the purpose of assisting people to modify their behaviors, cognitions, emotions, and/or other personal characteristics in directions that the participants deem desirable.&rdquo;</p><p>Coaching and therapy address ADHD differently, so they are both recommended modalities for effective ADHD management.",
	},
	{
		id: crypto.randomUUID(),
		ques: "Do I need medication for ADHD coaching to work?",
		ans: "Medication is outside the scope of coaching. It is a decision you need to make with your medical provider. ADHD Coaching is effective whether or not you are taking medication.",
	},
];

function Faq() {
	return (
		<div id="lya-faq" className="section aximo-section-padding cream-bg">
			<div className="container">
				<div className="lya-faq-header">
					<h2>Common questions about ADHD coaching</h2>
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
