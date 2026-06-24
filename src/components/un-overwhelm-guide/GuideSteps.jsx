import { ACTION_KEYS, OVERVIEW_STEPS } from "./guideData";
import ActionKeyInput from "./ActionKeyInput";
import PillInput from "./PillInput";
import RankedPillInput from "./RankedPillInput";

function WelcomeStep({ onStart }) {
	return (
		<div className="lya-guide-step lya-guide-step--welcome">
			<div className="lya-guide-cover">
				<h1>Un-Overwhelm Guide</h1>
				<p>
					A step-by-step worksheet to empty your mind, organize what matters, and choose one
					clear next action.
				</p>
				<button type="button" className="lya-guide-btn lya-guide-btn--primary lya-guide-btn--large" onClick={onStart}>
					Start the guide
				</button>
			</div>
		</div>
	);
}

function OverviewStep() {
	return (
		<div className="lya-guide-step">
			<h2 className="lya-guide-heading">
				How do I <em>make sense</em> of everything in my mind?
			</h2>
			<hr className="lya-guide-divider" />
			<ol className="lya-guide-overview-list">
				{OVERVIEW_STEPS.map((item) => (
					<li key={item.id} className="lya-guide-overview-item">
						<span
							className="lya-guide-overview-badge"
							style={{ backgroundColor: item.color }}
						>
							{item.title}
						</span>
						<p>{item.description}</p>
					</li>
				))}
			</ol>
		</div>
	);
}

function BrainDumpStep({ items, onChange }) {
	return (
		<div className="lya-guide-step">
			<h2 className="lya-guide-heading">
				First, <span className="lya-guide-accent">brain dump!</span>
			</h2>
			<p className="lya-guide-lead">
				Don&apos;t hold back! The goal is to empty your mind. It doesn&apos;t matter whether
				it&apos;s about home, work, or how you&apos;re feeling.
			</p>
			<PillInput
				items={items}
				onChange={onChange}
				placeholder="Type a thought and press Enter"
				hint="Press Enter after each item. Backspace on an empty field removes the last one."
				variant="coral"
				inputVariant="coral"
			/>
		</div>
	);
}

function IdentifyStep({ categories, onChange }) {
	return (
		<div className="lya-guide-step">
			<h2 className="lya-guide-heading">
				Now, <span className="lya-guide-accent">identify</span> categories for the items on your
				brain dump.
			</h2>
			<p className="lya-guide-lead">Here are some suggestions. Feel free to make your own.</p>
			<ul className="lya-guide-suggestions">
				<li>Project A, Project B</li>
				<li>Work, home, volunteer</li>
				<li>Health, social, tasks</li>
			</ul>
			<PillInput
				items={categories}
				onChange={onChange}
				placeholder="Type a category and press Enter"
				hint="Add as many categories as you need — you'll merge them in the next step."
				variant="warm"
				inputVariant="warm"
			/>
		</div>
	);
}

function MergeStep({ mergedCategories, onChange }) {
	return (
		<div className="lya-guide-step">
			<h2 className="lya-guide-heading">
				Next, <span className="lya-guide-accent-teal">merge</span> your categories to a maximum
				of <span className="lya-guide-accent">six</span>
			</h2>
			<RankedPillInput
				items={mergedCategories}
				onChange={onChange}
				maxItems={6}
				placeholder="Type a merged category and press Enter"
				hint="Rank 1 is highest priority, 6 is lowest. Tap the number on each pill to change it."
			/>
			<p className="lya-guide-lead lya-guide-lead--center">
				Now, <span className="lya-guide-accent-teal">rank</span> your categories by adding a
				number in the circle: <span className="lya-guide-accent">1</span> being the highest,{" "}
				<span className="lya-guide-accent">6</span> being the lowest.
			</p>
		</div>
	);
}

function SortStep({
	items,
	categories,
	itemCategories,
	miscNotes,
	onAssign,
	onMiscChange,
}) {
	return (
		<div className="lya-guide-step">
			<h2 className="lya-guide-heading">
				<span className="lya-guide-accent-teal">Sort</span> each item into its respective group
			</h2>

			{items.length === 0 ? (
				<p className="lya-guide-lead">Add items in the brain dump step to sort them here.</p>
			) : (
				<ul className="lya-guide-sort-list">
					{items.map((item) => (
						<li key={item} className="lya-guide-sort-item">
							<span className="lya-guide-pill lya-guide-pill--readonly">{item}</span>
							<select
								className="lya-guide-select"
								value={itemCategories[item] || ""}
								onChange={(e) => onAssign(item, e.target.value)}
								aria-label={`Category for ${item}`}
							>
								<option value="">Choose group…</option>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
						</li>
					))}
				</ul>
			)}

			<div className="lya-guide-misc">
				<label className="lya-guide-misc-label">misc / notes</label>
				<PillInput
					items={miscNotes}
					onChange={onMiscChange}
					placeholder="Type a note and press Enter"
					variant="default"
				/>
			</div>
		</div>
	);
}

function CategorizeStep({ items, actionKeyIcons, itemPriorities, onIconChange, onPriorityChange }) {
	return (
		<div className="lya-guide-step">
			<h2 className="lya-guide-heading">
				Now that you&apos;ve sorted your list, it&apos;s time to{" "}
				<span className="lya-guide-accent-warm">categorize</span> them by importance.
			</h2>
			<hr className="lya-guide-divider" />
			<p className="lya-guide-lead lya-guide-lead--center">
				Create a personal <span className="lya-guide-accent">action key</span> to{" "}
				<span className="lya-guide-accent-teal">identify</span> important tasks
			</p>

			<div className="lya-guide-action-legend">
				<div className="lya-guide-action-row">
					<span className="lya-guide-action-dot" style={{ background: "#4CAF50" }} />
					<p>
						<strong className="lya-guide-action-run">run — DO NOW</strong> — it&apos;s important
						and time sensitive
					</p>
				</div>
				<div className="lya-guide-action-row">
					<span className="lya-guide-action-dot" style={{ background: "#F7A072" }} />
					<p>
						<strong className="lya-guide-action-jog">jog — DO LATER</strong> — it&apos;s important
						but not urgent
					</p>
				</div>
				<div className="lya-guide-action-row">
					<span className="lya-guide-action-dot" style={{ background: "#D86B6A" }} />
					<p>
						<strong className="lya-guide-action-stop">stop — DON&apos;T ACT</strong> — it&apos;s
						important but doesn&apos;t need any action
					</p>
				</div>
				<div className="lya-guide-action-row">
					<span className="lya-guide-action-dot" style={{ background: "#5B8FD8" }} />
					<p>
						<strong className="lya-guide-action-give">give — DELEGATE</strong> — it&apos;s
						actually someone else&apos;s task
					</p>
				</div>
			</div>

			<div className="lya-guide-action-key-grid">
				{ACTION_KEYS.map((key) => (
					<ActionKeyInput
						key={key.id}
						label={key.label}
						value={actionKeyIcons[key.id]}
						onChange={(value) => onIconChange(key.id, value)}
						color={key.color}
					/>
				))}
			</div>

			{items.length > 0 && (
				<>
					<p className="lya-guide-lead lya-guide-lead--center">
						Go back to your sorted list and use your{" "}
						<span className="lya-guide-accent">action key</span> to{" "}
						<span className="lya-guide-accent-teal">prioritize</span> each item.
					</p>
					<ul className="lya-guide-sort-list">
						{items.map((item) => (
							<li key={item} className="lya-guide-sort-item">
								<span className="lya-guide-pill lya-guide-pill--readonly">{item}</span>
								<select
									className="lya-guide-select"
									value={itemPriorities[item] || ""}
									onChange={(e) => onPriorityChange(item, e.target.value)}
									aria-label={`Priority for ${item}`}
								>
									<option value="">Choose action…</option>
									<option value="run">run — DO NOW</option>
									<option value="jog">jog — DO LATER</option>
									<option value="stop">stop — DON&apos;T ACT</option>
									<option value="give">give — DELEGATE</option>
								</select>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}

function ClarityStep({ items, itemPriorities, focusItem, onFocusChange, onBookConsult }) {
	const doNowItems = items.filter((item) => itemPriorities[item] === "run");

	return (
		<div className="lya-guide-step lya-guide-step--clarity">
			<h2 className="lya-guide-heading lya-guide-heading--center">
				Congrats, you have taken the first step on achieving{" "}
				<span className="lya-guide-accent">clarity</span> to{" "}
				<span className="lya-guide-accent-teal lya-guide-underline">Un-Overwhelm</span> your brain.
			</h2>

			<p className="lya-guide-lead lya-guide-lead--center">
				With your newfound clarity, choose <strong>one item</strong> to act on now.
			</p>

			{doNowItems.length > 0 ? (
				<div className="lya-guide-focus-list">
					{doNowItems.map((item) => (
						<label key={item} className="lya-guide-focus-option">
							<input
								type="radio"
								name="focus-item"
								value={item}
								checked={focusItem === item}
								onChange={() => onFocusChange(item)}
							/>
							<span>{item}</span>
						</label>
					))}
				</div>
			) : (
				<div className="lya-guide-focus-list">
					{items.slice(0, 6).map((item) => (
						<label key={item} className="lya-guide-focus-option">
							<input
								type="radio"
								name="focus-item"
								value={item}
								checked={focusItem === item}
								onChange={() => onFocusChange(item)}
							/>
							<span>{item}</span>
						</label>
					))}
				</div>
			)}

			{focusItem ? (
				<div className="lya-guide-focus-card">
					<p className="lya-guide-focus-label">Your next action</p>
					<p className="lya-guide-focus-text">{focusItem}</p>
				</div>
			) : null}

			<div className="lya-guide-cta-panel">
				<p>
					Want to know more about how to navigate with{" "}
					<span className="lya-guide-accent">confidence</span> and{" "}
					<span className="lya-guide-accent">ease</span>?
				</p>
				<p>Go from <em>to do</em> to <strong>done</strong>?</p>
				<button type="button" className="lya-guide-btn lya-guide-btn--dark" onClick={onBookConsult}>
					Book your 1:1 coaching consult
				</button>
			</div>
		</div>
	);
}

export {
	WelcomeStep,
	OverviewStep,
	BrainDumpStep,
	IdentifyStep,
	MergeStep,
	SortStep,
	CategorizeStep,
	ClarityStep,
};
