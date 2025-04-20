import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
	title: String,
	disciplineThreshold: Number,
	active: { type: Boolean, default: false },
});

export default mongoose.model("Reward", rewardSchema);
