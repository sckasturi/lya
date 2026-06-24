import { STEPS } from "./guideData";

function GuideProgress({ currentStep }) {
	return (
		<div className="lya-guide-progress" aria-label="Guide progress">
			{STEPS.map((step, index) => (
				<div
					key={step.id}
					className={`lya-guide-progress-dot${
						index === currentStep
							? " active"
							: index < currentStep
								? " complete"
								: ""
					}`}
					title={step.label}
				/>
			))}
		</div>
	);
}

export function GuideNav({ step, onBack, onNext, nextLabel = "Continue", disableNext = false }) {
	return (
		<div className="lya-guide-nav">
			{step > 0 ? (
				<button type="button" className="lya-guide-btn lya-guide-btn--ghost" onClick={onBack}>
					Back
				</button>
			) : (
				<span />
			)}
			<GuideProgress currentStep={step} />
			<button
				type="button"
				className="lya-guide-btn lya-guide-btn--primary"
				onClick={onNext}
				disabled={disableNext}
			>
				{nextLabel}
			</button>
		</div>
	);
}

export default GuideProgress;
