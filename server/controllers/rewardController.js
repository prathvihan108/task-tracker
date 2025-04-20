import Reward from "../models/Reward.js";
import Task from "../models/Task.js";

export const createReward = async (req, res) => {
	const reward = new Reward(req.body);
	await reward.save();
	res.json(reward);
};

export const getRewardStatus = async (req, res) => {
	const tasks = await Task.find({ date: new Date().toDateString() });
	const allCompleted = tasks.every((task) => task.status === "completed");
	const reward = await Reward.findOne();

	if (allCompleted && reward?.active) {
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
