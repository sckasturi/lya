export const STORAGE_KEY = "lya-un-overwhelm-guide";

export const STEPS = [
	{ id: "welcome", label: "Welcome" },
	{ id: "overview", label: "Overview" },
	{ id: "brain-dump", label: "Brain dump" },
	{ id: "identify", label: "Identify" },
	{ id: "merge", label: "Merge" },
	{ id: "sort", label: "Sort" },
	{ id: "categorize", label: "Categorize" },
	{ id: "clarity", label: "Clarity" },
];

export const OVERVIEW_STEPS = [
	{
		id: "brain-dump",
		title: "BRAIN DUMP",
		description: "Dump out everything on your mind.",
		color: "#D86B6A",
	},
	{
		id: "identify",
		title: "IDENTIFY",
		description: "Identify the broad groups these belong to.",
		color: "#F29999",
	},
	{
		id: "merge",
		title: "MERGE",
		description: "Merge the groups into six or fewer.",
		color: "#4A9AA3",
	},
	{
		id: "sort",
		title: "SORT",
		description: "Sort your brain dump into groups.",
		color: "#8CC4CC",
	},
	{
		id: "categorize",
		title: "CATEGORIZE",
		description: "Categorize each item on your list.",
		color: "#F7C5A3",
	},
	{
		id: "clarity",
		title: "CLARITY",
		description: "With your newfound clarity, act on one item.",
		color: "#FFD8C2",
	},
];

export const ACTION_KEYS = [
	{ id: "run", label: "run", color: "#4CAF50" },
	{ id: "jog", label: "jog", color: "#F7A072" },
	{ id: "stop", label: "stop", color: "#D86B6A" },
	{ id: "give", label: "give", color: "#5B8FD8" },
];

export const INITIAL_STATE = {
	step: 0,
	brainDumpItems: [],
	categories: [],
	mergedCategories: [],
	itemCategories: {},
	itemPriorities: {},
	actionKeyIcons: { run: "", jog: "", stop: "", give: "" },
	focusItem: "",
	miscNotes: [],
};

export function parseBrainDumpItems(text) {
	if (!text) return [];
	return text
		.split(/\n+/)
		.map((line) => line.replace(/^[\s•\-*]+/, "").trim())
		.filter(Boolean);
}

function normalizeStringList(value) {
	if (typeof value === "string") {
		return parseBrainDumpItems(value);
	}
	if (!Array.isArray(value)) return [];

	return value
		.map((item) => {
			if (typeof item === "string") return item.trim();
			if (item && typeof item.name === "string") return item.name.trim();
			return "";
		})
		.filter(Boolean);
}

function normalizeMergedCategories(value) {
	if (!Array.isArray(value)) return [];

	return value
		.map((item, index) => {
			if (typeof item === "string") {
				const name = item.trim();
				return name ? { name, rank: String(index + 1) } : null;
			}
			if (!item || typeof item !== "object") return null;
			const name = String(item.name ?? "").trim();
			if (!name) return null;
			return {
				name,
				rank: String(item.rank ?? index + 1),
			};
		})
		.filter(Boolean);
}

function normalizeRecord(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		return {};
	}
	return value;
}

export function migrateGuideState(parsed) {
	const next = { ...INITIAL_STATE, ...parsed };

	if (!Array.isArray(next.brainDumpItems)) {
		next.brainDumpItems =
			typeof next.brainDump === "string"
				? parseBrainDumpItems(next.brainDump)
				: [];
	}

	next.categories = normalizeStringList(next.categories);
	next.mergedCategories = normalizeMergedCategories(next.mergedCategories);
	next.miscNotes = normalizeStringList(next.miscNotes);
	next.itemCategories = normalizeRecord(next.itemCategories);
	next.itemPriorities = normalizeRecord(next.itemPriorities);

	next.actionKeyIcons = {
		...INITIAL_STATE.actionKeyIcons,
		...(typeof next.actionKeyIcons === "object" && next.actionKeyIcons
			? next.actionKeyIcons
			: {}),
	};

	next.focusItem = typeof next.focusItem === "string" ? next.focusItem : "";

	const step = Number(next.step);
	next.step = Number.isFinite(step)
		? Math.min(Math.max(0, step), STEPS.length - 1)
		: 0;

	delete next.brainDump;
	return next;
}

export function getActiveMergedCategories(mergedCategories) {
	if (!Array.isArray(mergedCategories)) return [];

	return mergedCategories
		.filter((category) => category?.name?.trim())
		.sort((a, b) => {
			const rankA = Number(a.rank) || 99;
			const rankB = Number(b.rank) || 99;
			return rankA - rankB;
		});
}
