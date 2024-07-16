import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Card, Input, InputRef } from "antd";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask, TaskType } from "./features/TaskSlice";

export interface AddTaskCard {
	onClose: () => void;
	task?: TaskType | TaskTypeWithOptionalId;
}
type TaskTypeWithOptionalId = Omit<TaskType, "id"> &
	Partial<Pick<TaskType, "id">>;

const defaultTaskData: TaskTypeWithOptionalId = {
	name: "",
	description: "",
	done: false,
};

function AddTaskCard({ onClose, task = defaultTaskData }: AddTaskCard) {
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(!task.name.trim());
	const nameRef = useRef<InputRef>(null);
	const descriptionRef = useRef<InputRef>(null);
	const dispatch = useDispatch();

	useEffect(() => {
		// Set initial state of the button based on the task name
		setIsSubmitDisabled(!task.name.trim());
	}, [task.name]);

	const getNameValue = (): string => {
		return nameRef.current?.input?.value?.trim() || "";
	};

	const getDescriptionValue = (): string => {
		return descriptionRef.current?.input?.value?.trim() || "";
	};

	function handleSubmit() {
		const taskData: TaskTypeWithOptionalId = {
			...task,
			name: getNameValue(),
			description: getDescriptionValue(),
		};

		if (!task.id) {
			// Add new task
			dispatch(addTask(taskData as TaskType));
		} else {
			// Edit existing task
			dispatch(editTask(taskData as TaskType));
		}

		// close after submit
		onClose();
	}

	function handleNameChange() {
		const nameValue = getNameValue();
		setIsSubmitDisabled(!nameValue.trim());
	}

	return (
		<Card
			actions={[
				<Button danger type="default" onClick={onClose}>
					<CloseOutlined style={{ color: "red" }} />
				</Button>,
				<Button
					danger
					type="primary"
					onClick={handleSubmit}
					disabled={isSubmitDisabled}
				>
					<SendOutlined />
				</Button>,
			]}
		>
			<div className="flex flex-col gap-2">
				<Input
					className="border-none outline-none placeholder-gray-400 placeholder:font-medium"
					placeholder="Task name"
					ref={nameRef}
					onChange={handleNameChange}
					defaultValue={task.name}
				/>
				<Input
					className="border-none outline-none placeholder-gray-400 placeholder:font-thin"
					placeholder="Description"
					ref={descriptionRef}
					defaultValue={task.description}
				/>
			</div>
		</Card>
	);
}

export default AddTaskCard;
