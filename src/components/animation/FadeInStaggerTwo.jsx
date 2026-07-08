import { m } from "framer-motion";

const animationVariants = {
	initial: {
		opacity: 0,
		y: 50,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			staggerChildren: 0.2,
			duration: 0.7,
		},
	},
};

function FadeInStaggerTwo({ children, className = "", id = "" }) {
	return (
		<m.div
			variants={animationVariants}
			initial="initial"
			animate="animate"
			whileInView="animate"
			viewport={{ once: true, amount: 0.01 }}
			className={className}
			id={id}
		>
			{children}
		</m.div>
	);
}

function FadeInStaggerTwoChildren({ children, className = "", id = "" }) {
	return (
		<m.div className={className} id={id} variants={animationVariants}>
			{children}
		</m.div>
	);
}

export { FadeInStaggerTwo, FadeInStaggerTwoChildren };
