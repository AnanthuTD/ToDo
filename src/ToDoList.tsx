import { Filters } from "./App";
import { useAppSelector } from "./app/hooks";
import TaskCard from "./TaskCard";

export interface ToDoList {
	filter: Filters;
	className?: string;
}

function ToDoList({ filter, className = "" }: ToDoList) {
	const taskList = useAppSelector((state) => state.TaskSlice);
	return (
		<div className={className}>
			{taskList.map((task) => {
				return <TaskCard task={task} key={task.id} filter={filter} />;
			})}
		</div>
	);
}

export default ToDoList;
