import Reward from "../models/Reward.js";
import Task from "../models/Task.js";

export const createReward = async (req, res) => {
	const reward = new Reward(req.body);
	await reward.save();
	res.json(reward);
};

export const getRewards = async (req, res) => {
	try {
		const startOfDay = new Date();
		startOfDay.setHours(0, 0, 0, 0);

		const endOfDay = new Date();
		endOfDay.setHours(23, 59, 59, 999);

		const rewards = await Reward.find({
			createdAt: { $gte: startOfDay, $lte: endOfDay },
		});

		console.log("Today's rewards:", rewards);
		res.status(200).json(rewards);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch today's rewards" });
	}
};

export const getRewardStatus = async (req, res) => {
	const tasks = await Task.find({ date: new Date().toDateString() });
	const allCompleted = tasks.every((task) => task.status === "completed");
	console.log("all completed", allCompleted);
	const reward = await Reward.findOne();

	if (allCompleted) {
		res.json({ showReward: true, reward });
	} else {
		res.json({ showReward: false });
	}
};

export const activateReward = async (req, res) => {
	const { id } = req.params;
	const { active } = req.body;
	await Reward.findByIdAndUpdate(id, { active });
	res.sendStatus(200);
};
