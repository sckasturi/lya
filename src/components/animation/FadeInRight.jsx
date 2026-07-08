import { m } from "framer-motion";

const animationVariants = {
	initial: {
		opacity: 0,
		x: 50,
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.7,
		},
	},
};

function FadeInRight({ children, className = "", as = "div" }) {
	const MotionComponent = m[as] || m.div;
	return (
		<MotionComponent
			variants={animationVariants}
			initial="initial"
			whileInView="animate"
			className={className}
			viewport={{ once: true, amount: 0.01 }}
		>
			{children}
		</MotionComponent>
	);
}

export default FadeInRight;
