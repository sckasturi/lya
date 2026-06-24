/**
 * Parse optimized testimonials CSV:
 * Priority, Name, Role, Category, Headline, Full_Quote
 */
function parseCsvRows(text) {
	const rows = [];
	let row = [];
	let cell = "";
	let inQuotes = false;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		const next = text[i + 1];

		if (inQuotes) {
			if (char === '"' && next === '"') {
				cell += '"';
				i++;
			} else if (char === '"') {
				inQuotes = false;
			} else {
				cell += char;
			}
			continue;
		}

		if (char === '"') {
			inQuotes = true;
		} else if (char === ",") {
			row.push(cell);
			cell = "";
		} else if (char === "\n" || char === "\r") {
			if (char === "\r" && next === "\n") i++;
			row.push(cell);
			if (row.some((value, idx) => value.trim() !== "" || idx === 0)) {
				rows.push(row);
			}
			row = [];
			cell = "";
		} else {
			cell += char;
		}
	}

	if (cell.length > 0 || row.length > 0) {
		row.push(cell);
		rows.push(row);
	}

	return rows;
}

export function parseTestimonialsCsv(csvText) {
	const rows = parseCsvRows(csvText.trim());
	const testimonials = [];

	for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
		const row = rows[rowIndex];
		const name = (row[1] || "").trim();
		const role = (row[2] || "").trim();
		const headline = (row[4] || "").trim();
		const quote = (row[5] || "").trim();

		if (!name || !quote) continue;

		testimonials.push({
			id: `testimonial-${rowIndex}-${name}`,
			author: name,
			designation: role,
			headline,
			quote,
		});
	}

	return testimonials;
}
