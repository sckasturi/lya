import { useRef, useState } from "react";

export default function ActionKeyInput({ label, value, onChange, color }) {
	const [draft, setDraft] = useState(value);
	const inputRef = useRef(null);

	function commit() {
		const next = draft.trim().slice(0, 3);
		onChange(next);
		setDraft(next);
	}

	function clear() {
		onChange("");
		setDraft("");
		inputRef.current?.focus();
	}

	return (
		<div className="lya-guide-action-key-field">
			<span className="lya-guide-action-key-label">{label}</span>
			{!value ? (
				<input
					ref={inputRef}
					type="text"
					maxLength={3}
					className="lya-guide-pill-input-row lya-guide-pill-input-row--compact"
					value={draft}
					onChange={(event) => setDraft(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							commit();
						}
					}}
					onBlur={commit}
					placeholder="✓"
					aria-label={`Icon for ${label}`}
				/>
			) : (
				<div className="lya-guide-pill-output lya-guide-pill-output--center">
					<span
						className="lya-guide-pill lya-guide-pill--icon"
						style={{ borderColor: color }}
					>
						{value}
						<button
							type="button"
							className="lya-guide-pill-remove"
							onClick={clear}
							aria-label={`Clear ${label} icon`}
						>
							×
						</button>
					</span>
				</div>
			)}
		</div>
	);
}
