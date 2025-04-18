import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
	const tasks = await Task.find();
	res.json(tasks);
};

export const createTask = async (req, res) => {
	const { task, completed } = req.body;
	const newTask = new Task({ task, completed });
	const saved = await newTask.save();
	res.status(201).json(saved);
};

export const deleteTask = async (req, res) => {
	const { id } = req.params;
	await Task.findByIdAndDelete(id);
	res.json({ message: `Task ${id} deleted` });
};
