import { motion } from "framer-motion";

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
	const MotionComponent = motion[as] || motion.div;
	return (
		<MotionComponent
			variants={animationVariants}
			initial="initial"
			whileInView="animate"
			className={className}
			// viewport={{ once: true }}
		>
			{children}
		</MotionComponent>
	);
}

export default FadeInRight;
