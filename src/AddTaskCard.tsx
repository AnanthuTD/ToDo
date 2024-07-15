import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Card, Input, InputRef } from "antd";
import { useRef } from "react";

export interface AddTaskCard {
	onClose: () => void;
	onSubmit: (taskData: TaskData) => void;
	task?: TaskData;
}

export interface TaskData {
	name: string;
	description: string;
	id: number;
	done: boolean;
}

const defaultTaskData: TaskData = {
	name: "",
	description: "",
	id: Date.now(),
	done: false,
};

function AddTaskCard({
	onClose,
	onSubmit,
	task = defaultTaskData,
}: AddTaskCard) {
	const submitRef = useRef<HTMLButtonElement>(null);
	const nameRef = useRef<InputRef>(null);
	const descriptionRef = useRef<InputRef>(null);

	function computeButtonState(name: string) {
		// if name then enable
		if (submitRef?.current) submitRef.current.disabled = !name.trim();
	}

	const getNameValue = (): string => {
		return nameRef.current?.input?.value?.trim() || "";
	};

	const getDescriptionValue = (): string => {
		return descriptionRef.current?.input?.value?.trim() || "";
	};

	function handleSubmit() {
		const taskData: TaskData = {
			...task,
			name: getNameValue(),
			description: getDescriptionValue(),
		};
		onSubmit(taskData);

		// close after submit
		onClose();
	}

	function handleNameChange() {
		computeButtonState(getNameValue());
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
					disabled={!task.name.trim()} // initial state of the button
					ref={submitRef}
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
