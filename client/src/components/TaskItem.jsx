import axios from "../api";
import { toast } from "react-toastify";
import { auth } from "../firebase/config.js";

export default function TaskItem({ task, refresh }) {
	const changeStatus = async () => {
		const user = auth.currentUser;
		if (!user) {
			console.error("No user is logged in");
			return;
		}

		const idToken = await user.getIdToken();

		const next = {
			todo: "inprogress",
			inprogress: "completed",
			completed: "todo",
		};

		try {
			await axios.put(
				`/tasks/${task._id}`,
				{ status: next[task.status] },
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
					},
				}
			);

			refresh();

			toast.success(`Task Moved to ${next[task.status]}`, { autoClose: 2000 });
		} catch (error) {
			console.error("Error changing task status:", error);
			toast.error("Error changing task status", { autoClose: 2000 });
		}
	};

	const deleteTask = async () => {
		const user = auth.currentUser;
		if (!user) {
			console.error("No user is logged in");
			return;
		}

		const idToken = await user.getIdToken();

		try {
			await axios.delete(`/tasks/${task._id}`, {
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			refresh();
			toast.success("Task deleted successfully", { autoClose: 2000 });
		} catch (error) {
			console.error("Error deleting task:", error);
			toast.error("Error deleting task", { autoClose: 2000 });
		}
	};

	return (
		<div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-4 mb-4 rounded-lg shadow-md w-full">
			{/* Task Title */}
			<span className="text-gray-900 text-sm sm:text-lg font-semibold">
				{task.title}
			</span>

			{/* Action Buttons */}
			<div className="space-x-2 mt-3 sm:mt-0 sm:flex sm:space-x-4">
				{/* Next Button */}
				<button
					onClick={changeStatus}
					className="bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base px-4 py-2 rounded-md transition duration-200"
				>
					Next
				</button>

				{/* Delete Button */}
				<button
					onClick={deleteTask}
					className="bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base px-4 py-2 rounded-md transition duration-200"
				>
					Delete
				</button>
			</div>
		</div>
	);
}
