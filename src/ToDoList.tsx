import { TaskData } from "./AddTaskCard";
import { Filters } from "./App";
import TaskCard from "./TaskCard";

export interface ToDoList {
	onSubmit: (taskData: TaskData) => void;
	taskList: TaskData[];
	onDeleteTask: (taskId: number) => void;
	filter: Filters;
	className?: string;
}

function ToDoList({ taskList, onSubmit, onDeleteTask, filter, className="" }: ToDoList) {
	return (
		<div className={className}>
			{taskList.map((task) => {
				return (
					<TaskCard
						task={task}
						onSubmit={onSubmit}
						key={task.id}
						onDeleteTask={onDeleteTask}
						filter={filter}
					/>
				);
			})}
		</div>
	);
}

export default ToDoList;
