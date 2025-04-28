import Task from "../models/Task.js";
import User from "../models/User.js";
export const getTasks = async (req, res) => {
	try {
		const { uid } = req.params;

		const user = await User.findOne({ uid });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Get today's date range
		const startOfDay = new Date();
		startOfDay.setHours(0, 0, 0, 0); // 12:00 AM

		const endOfDay = new Date();
		endOfDay.setHours(23, 59, 59, 999); // 11:59 PM

		const tasks = await Task.find({
			_id: { $in: user.tasks },
			createdAt: { $gte: startOfDay, $lte: endOfDay },
		});

		res.json(tasks);
	} catch (error) {
		console.error("Error fetching tasks:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const createTask = async (req, res) => {
	try {
		const { uid } = req.params;
		const { title, status } = req.body;

		const user = await User.findOne({ uid });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const task = new Task({ title, status, user: user._id });
		await task.save();

		user.tasks.push(task._id);
		await user.save();

		res.status(201).json(task);
	} catch (error) {
		console.error("Error creating task:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const updateTaskStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		const task = await Task.findById(id);

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		task.status = status;
		await task.save();

		console.log("Updated task status:", status);
		res.status(200).json(task);
	} catch (error) {
		console.error("Error updating task:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;

		const task = await Task.findByIdAndDelete(id);

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		const user = await User.findOne({ tasks: id });

		if (user) {
			user.tasks = user.tasks.filter((taskId) => taskId.toString() !== id);
			await user.save();
		}

		res.status(200).json({ message: "Task deleted successfully" });
	} catch (error) {
		console.error("Error deleting task:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
