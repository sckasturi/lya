import { motion } from "framer-motion";

const animationVariants = {
	initial: {
		opacity: 0,
		y: 50,
	},
	animate: (index) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3 * index,
			delay: 0.03 * index,
		},
	}),
};

function FadeInStagger({ children, className = "", index, style, as = "div" }) {
	const MotionComponent = motion[as] || motion.div;
	return (
		<MotionComponent
			className={className}
			variants={animationVariants}
			initial="initial"
			whileInView="animate"
			// viewport={{ once: true }}
			custom={index + 1}
			style={style}
		>
			{children}
		</MotionComponent>
	);
}

export default FadeInStagger;
