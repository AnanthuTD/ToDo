import { TaskType } from "./features/TaskSlice";

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem("taskList");
		if (serializedState === null) {
			return [];
		}
		return JSON.parse(serializedState) satisfies TaskType;
	} catch (err) {
		return [];
	}
};

export const saveState = (state: TaskType[]) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("taskList", serializedState);
	} catch (err) {
		console.error("Error saving state to LocalStorage: ", err);
	}
};
