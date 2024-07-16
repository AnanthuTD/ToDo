import { lazy, Suspense, useState } from "react";
import { Button, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppSelector } from "./app/hooks";

const AddTaskCard = lazy(() => import("./AddTaskCard"));
const ToDoList = lazy(() => import("./ToDoList"));
const Radio = lazy(() => import("antd/es/radio/radio"));
const RadioGroup = lazy(() => import("antd/es/radio/group"));

export type Filters = "all" | "completed" | "pending";

function App() {
	const [addTaskClicked, setAddTaskClicked] = useState(false);
	const [filter, setFilter] = useState<Filters>("all");

	const taskList = useAppSelector((state)=> state.TaskSlice);

	function onClose() {
		setAddTaskClicked(false);
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
				<Suspense fallback={<div>Loading...</div>}>
					<AddTaskCard onClose={onClose} />
				</Suspense>
			)}

			<Divider> To-Do's </Divider>

			<Suspense fallback={<div>Loading...</div>}>
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
							filter={filter}
							className="space-y-3"
						/>
					</>
				) : null}
			</Suspense>
		</>
	);
}

export default App;
