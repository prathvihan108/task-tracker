import Reward from "../models/Reward.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const createReward = async (req, res) => {
	try {
		const { uid } = req.params;
		const { title } = req.body;

		const user = await User.findOne({ uid });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const reward = new Reward({ title, user: user._id });
		await reward.save();

		user.rewards.push(reward._id);
		await user.save();

		res.status(201).json(reward);
	} catch (error) {
		console.error("Error creating reward:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getRewards = async (req, res) => {
	try {
		console.log("method called");
		const { uid } = req.params;

		const user = await User.findOne({ uid });
		console.log("user from getRewards ", user);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Get today's date range
		const startOfDay = new Date();
		startOfDay.setHours(0, 0, 0, 0);

		const endOfDay = new Date();
		endOfDay.setHours(23, 59, 59, 999);

		const rewards = await Reward.find({
			_id: { $in: user.rewards },
			createdAt: { $gte: startOfDay, $lte: endOfDay },
		});

		console.log("User's rewards:", rewards);
		res.status(200).json(rewards);
	} catch (error) {
		console.error("Error fetching rewards:", error);
		res.status(500).json({ message: "Failed to fetch rewards" });
	}
};
export const getRewardStatus = async (req, res) => {
	try {
		const { uid } = req.params;

		const user = await User.findOne({ uid });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Calculate today's start and end
		const startOfDay = new Date();
		startOfDay.setHours(0, 0, 0, 0);

		const endOfDay = new Date();
		endOfDay.setHours(23, 59, 59, 999);

		const todayTasks = await Task.find({
			_id: { $in: user.tasks },
			createdAt: { $gte: startOfDay, $lte: endOfDay }, // CREATED today
		});

		const allCompleted =
			todayTasks.length > 0 &&
			todayTasks.every((task) => task.status === "completed");
		console.log("All tasks created today completed:", allCompleted);

		const reward = await Reward.findOne({ user: user._id });

		if (allCompleted) {
			res.json({ showReward: true, reward });
		} else {
			res.json({ showReward: false });
		}
	} catch (error) {
		console.error("Error getting reward status:", error);
		res.status(500).json({ message: "Failed to fetch reward status" });
	}
};

export const resetRewards = async (req, res) => {
	const { uid } = req.params;

	try {
		const user = await User.findOne({ uid });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Clear user's rewards array
		user.rewards = [];
		await user.save();

		res.status(200).json({ message: "All rewards reset successfully" });
	} catch (error) {
		console.error("Error resetting rewards:", error);
		res.status(500).json({ message: "Server error" });
	}
};
