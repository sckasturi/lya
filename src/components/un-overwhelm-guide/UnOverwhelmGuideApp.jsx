import { useMemo } from "react";
import GuideShell from "./GuideShell";
import { GuideNav } from "./GuideNav";
import {
	BrainDumpStep,
	CategorizeStep,
	ClarityStep,
	IdentifyStep,
	MergeStep,
	OverviewStep,
	SortStep,
	WelcomeStep,
} from "./GuideSteps";
import { getActiveMergedCategories, STEPS } from "./guideData";
import { useGuideState } from "./useGuideState";
import "../../assets/css/un-overwhelm-guide.css";

function UnOverwhelmGuideApp() {
	const { state, update, reset } = useGuideState();

	const brainDumpItems = Array.isArray(state.brainDumpItems) ? state.brainDumpItems : [];

	const mergedCategories = useMemo(() => {
		const active = getActiveMergedCategories(state.mergedCategories);
		return active.map((category, index) => ({
			id: `cat-${index}`,
			name: category.name.trim(),
		}));
	}, [state.mergedCategories]);

	const goToStep = (step) => update({ step });

	const goNext = () => {
		if (state.step >= STEPS.length - 1) return;

		if (state.step === 3) {
			const filled = state.categories;
			const hasMerged = Array.isArray(state.mergedCategories)
				&& state.mergedCategories.some((c) => c?.name?.trim());
			if (filled.length && !hasMerged) {
				const mergedCategories = filled.slice(0, 6).map((name, index) => ({
					name,
					rank: String(index + 1),
				}));
				update({ step: state.step + 1, mergedCategories });
				return;
			}
		}

		goToStep(state.step + 1);
	};

	const goBack = () => {
		if (state.step <= 0) return;
		goToStep(state.step - 1);
	};

	const assignItemCategory = (item, categoryId) => {
		update({
			itemCategories: {
				...state.itemCategories,
				[item]: categoryId,
			},
		});
	};

	const assignItemPriority = (item, priority) => {
		update({
			itemPriorities: {
				...state.itemPriorities,
				[item]: priority,
			},
		});
	};

	const updateActionKeyIcon = (key, value) => {
		update({
			actionKeyIcons: {
				...state.actionKeyIcons,
				[key]: value,
			},
		});
	};

	const disableNext =
		(state.step === 2 && state.brainDumpItems.length === 0) ||
		(state.step === 4 &&
			!getActiveMergedCategories(state.mergedCategories).some((c) => c.name?.trim()));

	const nextLabel = state.step === STEPS.length - 1 ? "Finish" : "Continue";

	const handleNext = () => {
		if (state.step === STEPS.length - 1) {
			window.location.href = "/#contact-us";
			return;
		}
		goNext();
	};

	const handleBookConsult = () => {
		window.location.href = "/#contact-us";
	};

	let content = null;

	switch (state.step) {
		case 0:
			content = <WelcomeStep onStart={() => goToStep(1)} />;
			break;
		case 1:
			content = <OverviewStep />;
			break;
		case 2:
			content = (
				<BrainDumpStep
					items={state.brainDumpItems}
					onChange={(brainDumpItems) => update({ brainDumpItems })}
				/>
			);
			break;
		case 3:
			content = (
				<IdentifyStep
					categories={state.categories}
					onChange={(categories) => update({ categories })}
				/>
			);
			break;
		case 4:
			content = (
				<MergeStep
					mergedCategories={state.mergedCategories}
					onChange={(mergedCategories) => update({ mergedCategories })}
				/>
			);
			break;
		case 5:
			content = (
				<SortStep
					items={brainDumpItems}
					categories={mergedCategories}
					itemCategories={state.itemCategories}
					miscNotes={state.miscNotes}
					onAssign={assignItemCategory}
					onMiscChange={(miscNotes) => update({ miscNotes })}
				/>
			);
			break;
		case 6:
			content = (
				<CategorizeStep
					items={brainDumpItems}
					actionKeyIcons={state.actionKeyIcons}
					itemPriorities={state.itemPriorities}
					onIconChange={updateActionKeyIcon}
					onPriorityChange={assignItemPriority}
				/>
			);
			break;
		case 7:
			content = (
				<ClarityStep
					items={brainDumpItems}
					itemPriorities={state.itemPriorities}
					focusItem={state.focusItem}
					onFocusChange={(focusItem) => update({ focusItem })}
					onBookConsult={handleBookConsult}
				/>
			);
			break;
		default:
			content = null;
	}

	return (
		<GuideShell
			footerNote={
				state.step > 0 ? (
					<button type="button" className="lya-guide-reset" onClick={reset}>
						Start over
					</button>
				) : null
			}
		>
			<div className="lya-guide-container">
				{content}
				{state.step > 0 ? (
					<GuideNav
						step={state.step}
						onBack={goBack}
						onNext={handleNext}
						nextLabel={nextLabel}
						disableNext={disableNext}
					/>
				) : null}
			</div>
		</GuideShell>
	);
}

export default UnOverwhelmGuideApp;
