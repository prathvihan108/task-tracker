import React, { useState } from "react";
import "./App.css";

function App() {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);

	const fetchTasks = async () => {
		const res = await fetch("http://localhost:5000/api/tasks");
		const data = await res.json();
		setTasks(data);
		console.log(data);
	};

	const addTask = async () => {
		if (!task.trim()) return;
		await fetch("http://localhost:5000/api/tasks", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ task }),
		});
		setTask("");
		fetchTasks();
	};

	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });
		fetchTasks();
	};

	return (
		<div className="app">
			<h2 className="title">Task Tracker</h2>
			<div className="input-group">
				<input
					className="input"
					value={task}
					onChange={(e) => setTask(e.target.value)}
					placeholder="Enter a task"
				/>
				<button className="btn" onClick={addTask}>
					Add Task
				</button>
				<button className="btn refresh" onClick={fetchTasks}>
					Refresh
				</button>
			</div>
			<ul className="task-list">
				{tasks.map((t) => (
					<li className="task-item" key={t._id}>
						{t.task}
						<button className="btn delete" onClick={() => deleteTask(t._id)}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
