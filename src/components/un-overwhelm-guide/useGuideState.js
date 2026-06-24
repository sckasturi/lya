import { useCallback, useEffect, useState } from "react";
import { INITIAL_STATE, STORAGE_KEY, migrateGuideState } from "./guideData";

function loadState() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return INITIAL_STATE;
		return migrateGuideState(JSON.parse(raw));
	} catch {
		localStorage.removeItem(STORAGE_KEY);
		return INITIAL_STATE;
	}
}

export function useGuideState() {
	const [state, setState] = useState(loadState);

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} catch {
			// ignore quota / private mode errors
		}
	}, [state]);

	const update = useCallback((patch) => {
		setState((prev) => migrateGuideState({ ...prev, ...patch }));
	}, []);

	const reset = useCallback(() => {
		setState(INITIAL_STATE);
		localStorage.removeItem(STORAGE_KEY);
	}, []);

	return { state, update, reset };
}
