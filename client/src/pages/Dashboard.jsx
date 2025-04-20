import { useEffect, useState } from "react";
import TaskColumn from "../components/TaskColumn";
import Heatmap from "../components/Heatmap";
import RewardPopup from "../components/RewardPopup";
import axios from "../api";

export default function Dashboard() {
	const [tasks, setTasks] = useState([]);
	const [showReward, setShowReward] = useState(false);
	const [newTask, setNewTask] = useState("");

	const fetchTasks = async () => {
		const res = await axios.get("/tasks");
		setTasks(res.data);
	};

	const checkRewardStatus = async () => {
		const res = await axios.get("/rewards/status");
		setShowReward(res.data.showReward);
	};

	useEffect(() => {
		fetchTasks();
		checkRewardStatus();
	}, []);

	const updateTasks = () => {
		fetchTasks();
		checkRewardStatus();
	};

	const handleCreateTask = async () => {
		if (!newTask.trim()) return;
		await axios.post("/tasks", { title: newTask });
		setNewTask("");
		updateTasks();
	};

	const groupTasks = (status) => tasks.filter((t) => t.status === status);

	return (
		<div className="p-4 space-y-4">
			{/* Create Task Input */}
			<div className="flex justify-center mb-4">
				<input
					type="text"
					placeholder="Enter new task"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					className="p-2 border rounded w-1/2"
				/>
				<button
					onClick={handleCreateTask}
					className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
				>
					Add Task
				</button>
			</div>

			<div className="flex justify-around space-x-4">
				<TaskColumn
					title="To Do"
					tasks={groupTasks("todo")}
					refresh={updateTasks}
				/>
				<TaskColumn
					title="In Progress"
					tasks={groupTasks("inprogress")}
					refresh={updateTasks}
				/>
				<TaskColumn
					title="Completed"
					tasks={groupTasks("completed")}
					refresh={updateTasks}
				/>
			</div>
			<Heatmap tasks={tasks} />
			{showReward && <RewardPopup />}
		</div>
	);
}
