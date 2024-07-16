import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from "../features/TaskSlice";
import { saveState } from "../LocalStorage";

const store = configureStore({
	reducer: {
		TaskSlice,
	},
});

store.subscribe(() => {
	saveState(store.getState().TaskSlice);
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
