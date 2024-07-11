import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import { useCallback, useEffect, useState } from "react";

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

function debounce(
	func: (e: React.ChangeEvent<HTMLInputElement>) => void,
	delay: number
): (e: React.ChangeEvent<HTMLInputElement>) => void {
	let timeoutId: number;
	return (e: React.ChangeEvent<HTMLInputElement>) => {
		clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => func(e), delay);
	};
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
	const [taskData, setTaskData] = useState<TaskData>(task);
	const [isSubmitDisabled, setSubmitDisabled] = useState(true);

	const debouncedUpdateTaskName = useCallback(
		() =>
			debounce((e: React.ChangeEvent<HTMLInputElement>) => {
				setTaskData((prevData) => ({
					...prevData,
					name: e.target.value.trim(),
				}));
			}, 500),
		[]
	);

	const debouncedUpdateTaskDesc = useCallback(
		() =>
			debounce((e: React.ChangeEvent<HTMLInputElement>) => {
				setTaskData((prevData) => ({
					...prevData,
					description: e.target.value.trim(),
				}));
			}, 500),
		[]
	);

	useEffect(() => {
		setSubmitDisabled(!taskData.name.trim());
	}, [taskData]);

	function handleSubmit(){
      onSubmit(taskData);
      onClose();
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
					onChange={debouncedUpdateTaskName()}
					defaultValue={task.name}
				/>
				<Input
					className="border-none outline-none placeholder-gray-400 placeholder:font-thin"
					placeholder="Description"
					onChange={debouncedUpdateTaskDesc()}
					defaultValue={task.description}
				/>
			</div>
		</Card>
	);
}

export default AddTaskCard;
