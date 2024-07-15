import { Button, Divider } from "antd";
import { lazy, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { TaskData } from "./AddTaskCard";

const AddTaskCard = lazy(() => import("./AddTaskCard"));
const ToDoList = lazy(() => import("./ToDoList"));
const Radio = lazy(() => import("antd/es/radio/radio"));
const RadioGroup = lazy(() => import("antd/es/radio/group"));

export type Filters = "all" | "completed" | "pending";

function App() {
	const [addTaskClicked, setAddTaskClicked] = useState(false);
	const [filter, setFilter] = useState<Filters>("all");

	const initialTaskList: TaskData[] = JSON.parse(
		localStorage.getItem("taskList") || "[]"
	);

	const [taskList, setTaskList] = useState<TaskData[]>(initialTaskList);

	function onClose() {
		setAddTaskClicked(false);
	}

	function onDeleteTask(taskId: number) {
		const newList = taskList.filter((task) => task.id !== taskId);
		localStorage.setItem("taskList", JSON.stringify(newList));
		setTaskList(newList);
	}

	function onSubmit(taskData: TaskData) {
		let newList: TaskData[];

		if (taskList.length) {
			if (taskList.some((task) => task.id === taskData.id)) {
				newList = taskList.map((task) =>
					task.id === taskData.id ? taskData : task
				);
			} else {
				newList = [...taskList, taskData];
			}
		} else {
			newList = [taskData];
		}

		localStorage.setItem("taskList", JSON.stringify(newList));

		setTaskList(newList);
	}

	function onFilterChange(filter: Filters) {
		setFilter(filter);
	}

	return (
		<>
			{!addTaskClicked ? (
				<Button
					type="default"
					icon={
						<PlusOutlined
							style={{ fontSize: "16px", color: "goldenrod" }}
						/>
					}
					onClick={() => {
						setAddTaskClicked(true);
					}}
				>
					Add Task
				</Button>
			) : (
				<AddTaskCard onClose={onClose} onSubmit={onSubmit} />
			)}

			<Divider> To-Do's </Divider>

			{taskList.length ? (
				<>
					{/* filter options */}
					<div className="mb-3">
						<RadioGroup
							onChange={(e) => onFilterChange(e.target.value)}
							defaultValue={filter}
						>
							<Radio value={"all"}>All</Radio>
							<Radio value={"pending"}>Pending</Radio>
							<Radio value={"completed"}>Finished</Radio>
						</RadioGroup>
					</div>

					{/* todo list */}
					<ToDoList
						taskList={taskList}
						onSubmit={onSubmit}
						onDeleteTask={onDeleteTask}
						filter={filter}
						className="space-y-3"
					/>
				</>
			) : null}
		</>
	);
}

export default App;
