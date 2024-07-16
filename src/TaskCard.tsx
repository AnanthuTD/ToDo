import { lazy, Suspense, useState } from "react";
import type { Filters } from "./App";
import { deleteTask, TaskType, toggleTask } from "./features/TaskSlice";
import { useAppDispatch } from "./app/hooks";

const AddTaskCard = lazy(() => import("./AddTaskCard"));
const Card = lazy(() => import("antd/es/card"));
const Checkbox = lazy(() => import("antd/es/checkbox"));
const DeleteOutlined = lazy(() => import("@ant-design/icons/DeleteOutlined"));
const EditOutlined = lazy(() => import("@ant-design/icons/EditOutlined"));

interface TaskCard {
	task: TaskType;
	filter: Filters;
}

function TaskCard({ task, filter }: TaskCard) {
	const [isEditing, setIsEditing] = useState(false);
	const dispatch = useAppDispatch();

	const toggleEdit = () => {
		setIsEditing(!isEditing);
	};

	function handleChecked() {
		dispatch(toggleTask(task));
	}

	function handleDeleteTask() {
		dispatch(deleteTask(task));
	}

	const taskView = (
		<Card className="group">
			<div className="flex justify-between">
				<div className="flex items-start gap-2">
					<Checkbox
						onChange={handleChecked}
						defaultChecked={task.done}
					/>
					<div>
						{task.done ? (
							<s>
								<p className="font-semibold">{task.name}</p>
								<p className="text-xs">{task.description}</p>
							</s>
						) : (
							<>
								<p className="font-semibold">{task.name}</p>
								<p className="text-xs">{task.description}</p>
							</>
						)}
					</div>
				</div>
				<div className="hidden gap-5 group-hover:flex">
					<EditOutlined
						className="hover:cursor-pointer"
						style={{ color: "grey", fontSize: "25px" }}
						onClick={toggleEdit}
					/>

					<DeleteOutlined
						className="hover:cursor-pointer"
						style={{ color: "red", fontSize: "25px" }}
						onClick={handleDeleteTask}
					/>
				</div>
			</div>
		</Card>
	);

	const taskStatus = task?.done ? "completed" : "pending";

	const shouldDisplayTask = filter === "all" || filter === taskStatus;

	if (!shouldDisplayTask) return null;

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{isEditing ? (
				<AddTaskCard
					onClose={toggleEdit}
					task={task}
					key={"edit:" + task.id}
				/>
			) : (
				taskView
			)}
		</Suspense>
	);
}

export default TaskCard;
