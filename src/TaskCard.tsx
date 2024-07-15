import { lazy, useState } from "react";
import type { Filters } from "./App";
import type { TaskData } from "./AddTaskCard";

const AddTaskCard = lazy(() => import("./AddTaskCard"));
const Card = lazy(() => import("antd/es/card"));
const Checkbox = lazy(() => import("antd/es/checkbox"));
const DeleteOutlined = lazy(() => import("@ant-design/icons/DeleteOutlined"));
const EditOutlined = lazy(() => import("@ant-design/icons/EditOutlined"));

interface TaskCard {
	onSubmit: (taskData: TaskData) => void;
	task: TaskData;
	onDeleteTask: (taskId: number) => void;
	filter: Filters;
}

function TaskCard({ task, onSubmit, onDeleteTask, filter }: TaskCard) {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => {
		setIsEditing(!isEditing);
	};

	function handleChecked(checked: boolean) {
		task.done = checked;
		onSubmit(task);
	}

	const handleDeleteTask = onDeleteTask.bind(null, task.id);

	const taskView = (
		<Card className="group">
			<div className="flex justify-between">
				<div className="flex items-start gap-2">
					<Checkbox
						onChange={(e) => handleChecked(e.target.checked)}
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

	return isEditing ? (
		<AddTaskCard
			onSubmit={onSubmit}
			onClose={toggleEdit}
			task={task}
			key={"edit:" + task.id}
		/>
	) : (
		taskView
	);
}

export default TaskCard;
