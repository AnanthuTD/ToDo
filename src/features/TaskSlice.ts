import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "../LocalStorage";

export interface TaskType {
	id: string;
	name: string;
	description: string;
	done: boolean;
}

const initialState: TaskType[] = loadState();

const TaskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: {
			reducer: (state, action: PayloadAction<TaskType>) => {
				if (action.payload.name) {
					state.push(action.payload);
				}
			},
			prepare(task: TaskType) {
				return {
					payload: {
						...task,
						id: nanoid(),
					},
				};
			},
		},

		editTask: (state, action: PayloadAction<TaskType>) => {
			const index = state.findIndex((task) => task.id === action.payload.id);
			if (index !== -1) {
				state[index] = action.payload;
			}
		},

		toggleTask: (state, action: PayloadAction<TaskType>) => {
			const index = state.findIndex((task) => task.id === action.payload.id);
			if (index !== -1) {
				state[index].done = !state[index].done;
			}
		},

		deleteTask: (state, action: PayloadAction<TaskType>) => {
			return state.filter((task) => task.id !== action.payload.id);
		},
	},
});

export const { addTask, toggleTask, deleteTask, editTask } = TaskSlice.actions;

export default TaskSlice.reducer;
