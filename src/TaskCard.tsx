import { Card, Checkbox } from "antd";
import AddTaskCard, { TaskData } from "./AddTaskCard";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Filters } from "./App";

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
