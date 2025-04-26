import { useEffect, useState } from "react";
import TaskColumn from "../components/TaskColumn";
import Heatmap from "../components/Heatmap";
import RewardPopup from "../components/RewardPopup";
import axios from "../api";
import { toast } from "react-toastify";
import { auth } from "../firebase/config.js";

export default function Dashboard() {
	const [tasks, setTasks] = useState([]);
	const [showReward, setShowReward] = useState(false);
	const [newTask, setNewTask] = useState("");
	const [activeTab, setActiveTab] = useState("todo");

	const fetchTasks = async () => {
		const user = auth.currentUser;
		console.log("current user fetched from firebase: ", user);
		if (!user) {
			console.error("No user is logged in");
			return;
		}
		const idToken = await user.getIdToken();

		try {
			const res = await axios.get(`/tasks/${user?.uid}`, {
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			setTasks(res.data);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	const checkRewardStatus = async () => {
		const user = auth.currentUser;
		if (!user) {
			console.error("No user is logged in");
			return;
		}

		const idToken = await user.getIdToken();

		try {
			const res = await axios.get(`/rewards/status/${user?.uid}`, {
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			setShowReward(res.data.showReward);
			console.log("reward status:", res.data.showReward);
		} catch (error) {
			console.error("Error checking reward status:", error);
		}
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

		const user = auth.currentUser;
		if (!user) {
			console.error("No user is logged in");
			return;
		}

		const idToken = await user.getIdToken();

		try {
			const response = await axios.post(
				`/tasks/${user?.uid}`,
				{ title: newTask },
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
					},
				}
			);

			setNewTask("");
			toast.success(`Task created successfully`, { autoClose: 2000 });
			console.log("Task Created: ", response.data);

			updateTasks();
		} catch (error) {
			console.error("Error creating task:", error);
			toast.error("Error creating task", { autoClose: 2000 });
		}
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
