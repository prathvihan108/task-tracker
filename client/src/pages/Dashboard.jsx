import { useEffect, useState } from "react";
import TaskColumn from "../components/TaskColumn";
import Heatmap from "../components/Heatmap";
import RewardPopup from "../components/RewardPopup";
import axios from "../api";
import { toast } from "react-toastify";

export default function Dashboard() {
	const [tasks, setTasks] = useState([]);
	const [showReward, setShowReward] = useState(false);
	const [newTask, setNewTask] = useState("");
	const [activeTab, setActiveTab] = useState("todo");

	const fetchTasks = async () => {
		const res = await axios.get("/tasks");
		setTasks(res.data);
	};

	const checkRewardStatus = async () => {
		const res = await axios.get("/rewards/status");
		setShowReward(res.data.showReward);
		console.log("reward status:", res.data.showReward);
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
		toast.success(`Task created successfully`, { autoClose: 2000 });

		updateTasks();
	};

	const groupTasks = (status) => tasks.filter((t) => t.status === status);

	return (
		<div className="p-4 space-y-4">
			{/* Create Task Input */}
			<h2 className="flex justify-center m-aut text-2xl font-bold">
				Task Tracker
			</h2>
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

			<div className="flex justify-around border-b border-gray-300 mb-4">
				{["todo", "inprogress", "completed"].map((tab) => (
					<button
						key={tab}
						className={`py-2 px-4 font-semibold ${
							activeTab === tab
								? "text-blue-600 border-b-2 border-blue-600"
								: "text-gray-500"
						}`}
						onClick={() => setActiveTab(tab)}
					>
						{tab === "todo"
							? "To Do"
							: tab === "inprogress"
							? "In Progress"
							: "Completed"}
					</button>
				))}
			</div>
			<div className="w-screen">
				{activeTab === "todo" && (
					<TaskColumn
						title="To Do"
						tasks={groupTasks("todo")}
						refresh={updateTasks}
					/>
				)}
				{activeTab === "inprogress" && (
					<TaskColumn
						title="In Progress"
						tasks={groupTasks("inprogress")}
						refresh={updateTasks}
					/>
				)}
				{activeTab === "completed" && (
					<TaskColumn
						title="Completed"
						tasks={groupTasks("completed")}
						refresh={updateTasks}
					/>
				)}
			</div>

			<Heatmap tasks={tasks} />
			{showReward && <RewardPopup />}
		</div>
	);
}
