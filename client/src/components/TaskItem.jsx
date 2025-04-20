import axios from "../api";
import { toast } from "react-toastify";

export default function TaskItem({ task, refresh }) {
	const changeStatus = async () => {
		const next = {
			todo: "inprogress",
			inprogress: "completed",
			completed: "todo",
		};
		await axios.put(`/tasks/${task._id}`, { status: next[task.status] });
		refresh();
		toast.success(`Task Moved to ${next[task.status]}`, {
			autoClose: 2000,
		});
	};

	const deleteTask = async () => {
		await axios.delete(`/tasks/${task._id}`);
		refresh();
	};

	return (
		<div className="flex justify-between items-center bg-gray-50 p-2 mb-2 rounded">
			<span>{task.title}</span>
			<div className="space-x-2">
				<button
					onClick={changeStatus}
					className="text-sm bg-blue-400 text-white px-2 py-1 rounded"
				>
					Next
				</button>
				<button
					onClick={deleteTask}
					className="text-sm bg-red-400 text-white px-2 py-1 rounded"
				>
					Delete
				</button>
			</div>
		</div>
	);
}
