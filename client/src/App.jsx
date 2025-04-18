import React, { useState } from "react";
import "./App.css";

function App() {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);

	const fetchTasks = async () => {
		const res = await fetch("http://localhost:5000/tasks");
		const data = await res.json();
		setTasks(data);
	};

	const addTask = async () => {
		if (!task.trim()) return;
		await fetch("http://localhost:5000/tasks", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ task }),
		});
		setTask("");
		fetchTasks();
	};

	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
		fetchTasks();
	};

	return (
		<div className="App">
			<h2>Task Tracker</h2>
			<input value={task} onChange={(e) => setTask(e.target.value)} />
			<button onClick={addTask}>Add Task</button>
			<button onClick={fetchTasks}>Refresh</button>
			<ul>
				{tasks.map((t) => (
					<li key={t.id}>
						{t.task} <button onClick={() => deleteTask(t.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
