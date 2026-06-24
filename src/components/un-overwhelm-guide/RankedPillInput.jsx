import { useRef, useState } from "react";

export default function RankedPillInput({
	items = [],
	onChange,
	maxItems = 6,
	placeholder = "Type a merged category and press Enter",
	hint,
}) {
	const [draft, setDraft] = useState("");
	const inputRef = useRef(null);

	const canAdd = items.length < maxItems;

	function nextRank(existing) {
		const used = new Set(existing.map((item) => Number(item.rank)).filter(Boolean));
		for (let rank = 1; rank <= maxItems; rank++) {
			if (!used.has(rank)) return String(rank);
		}
		return String(maxItems);
	}

	function addItem() {
		const name = draft.trim();
		if (!name || !canAdd) return;
		if (items.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
			setDraft("");
			return;
		}
		onChange([...items, { name, rank: nextRank(items) }]);
		setDraft("");
	}

	function removeItem(index) {
		onChange(items.filter((_, i) => i !== index));
	}

	function updateRank(index, rank) {
		onChange(
			items.map((item, i) => (i === index ? { ...item, rank } : item)),
		);
	}

	function handleKeyDown(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			addItem();
		}
		if (event.key === "Backspace" && !draft && items.length) {
			onChange(items.slice(0, -1));
		}
	}

	const sorted = items
		.map((item, index) => ({ ...item, index }))
		.sort((a, b) => (Number(a.rank) || 99) - (Number(b.rank) || 99));

	return (
		<div className="lya-guide-pill-field">
			{canAdd && (
				<input
					ref={inputRef}
					className="lya-guide-pill-input-row lya-guide-pill-input-row--teal"
					value={draft}
					onChange={(event) => setDraft(event.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					aria-label={placeholder}
				/>
			)}
			{sorted.length > 0 && (
				<div className="lya-guide-pill-output" aria-live="polite">
					{sorted.map((item) => (
						<span key={`${item.name}-${item.index}`} className="lya-guide-pill lya-guide-pill--teal">
							<input
								type="number"
								min="1"
								max={maxItems}
								className="lya-guide-pill-rank"
								value={item.rank}
								onChange={(event) => updateRank(item.index, event.target.value)}
								aria-label={`Rank for ${item.name}`}
							/>
							<span className="lya-guide-pill-label">{item.name}</span>
							<button
								type="button"
								className="lya-guide-pill-remove"
								onClick={() => removeItem(item.index)}
								aria-label={`Remove ${item.name}`}
							>
								×
							</button>
						</span>
					))}
				</div>
			)}
			{hint ? <p className="lya-guide-pill-hint">{hint}</p> : null}
		</div>
	);
}
