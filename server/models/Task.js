import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
	{
		title: String,
		status: {
			type: String,
			enum: ["todo", "inprogress", "completed"],
			default: "todo",
		},
		date: { type: Date, default: () => new Date().toDateString() },
	},
	{ timestamps: true }
);

export default mongoose.model("Task", taskSchema);
