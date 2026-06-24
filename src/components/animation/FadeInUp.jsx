import { motion } from "framer-motion";

const animationVariants = {
	initial: {
		opacity: 0,
		y: 50,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
		},
	},
};

function FadeInUp({ children, className = "" }) {
	return (
		<motion.div
			className={className}
			variants={animationVariants}
			initial="initial"
			animate="animate"
			whileInView="animate"
			viewport={{ once: true, amount: 0.01 }}
		>
			{children}
		</motion.div>
	);
}

export default FadeInUp;
