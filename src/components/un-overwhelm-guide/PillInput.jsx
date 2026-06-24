import { useRef, useState } from "react";

export default function PillInput({
	items = [],
	onChange,
	placeholder = "Type and press Enter",
	maxItems,
	hint,
	variant = "default",
	disabled = false,
	inputVariant = "coral",
}) {
	const [draft, setDraft] = useState("");
	const inputRef = useRef(null);

	const canAdd = !maxItems || items.length < maxItems;

	function addItem() {
		const value = draft.trim();
		if (!value || !canAdd) return;
		if (items.some((item) => item.toLowerCase() === value.toLowerCase())) {
			setDraft("");
			return;
		}
		onChange([...items, value]);
		setDraft("");
	}

	function removeItem(index) {
		onChange(items.filter((_, i) => i !== index));
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

	return (
		<div className="lya-guide-pill-field">
			{canAdd && !disabled && (
				<input
					ref={inputRef}
					className={`lya-guide-pill-input-row lya-guide-pill-input-row--${inputVariant}`}
					value={draft}
					onChange={(event) => setDraft(event.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					aria-label={placeholder}
				/>
			)}
			{items.length > 0 && (
				<div className="lya-guide-pill-output" aria-live="polite">
					{items.map((item, index) => (
						<span
							key={`${item}-${index}`}
							className={`lya-guide-pill lya-guide-pill--${variant}`}
						>
							{item}
							<button
								type="button"
								className="lya-guide-pill-remove"
								onClick={() => removeItem(index)}
								aria-label={`Remove ${item}`}
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
