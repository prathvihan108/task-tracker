import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
	{
		title: String,
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Reward", rewardSchema);
