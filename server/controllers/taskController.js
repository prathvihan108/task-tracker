import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
	const tasks = await Task.find();
	res.json(tasks);
};

export const createTask = async (req, res) => {
	const task = new Task(req.body);
	await task.save();
	res.json(task);
};

export const updateTaskStatus = async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;

	await Task.findByIdAndUpdate(id, { status });
	console.log("status backend:", status);
	res.sendStatus(200);
};

export const deleteTask = async (req, res) => {
	await Task.findByIdAndDelete(req.params.id);
	res.sendStatus(200);
};
