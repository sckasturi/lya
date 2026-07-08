import { m } from "framer-motion";

const animationVariants = {
	initial: {
		opacity: 0,
		x: -50,
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.7,
		},
	},
};

function FadeInLeft({ children, className = "" }) {
	return (
		<m.div
			variants={animationVariants}
			initial="initial"
			animate="animate"
			whileInView="animate"
			viewport={{ once: true, amount: 0.01 }}
			className={className}
		>
			{children}
		</m.div>
	);
}

export default FadeInLeft;
