import mongoose from "mongoose";
import Task from "./Task"; // Import Task model
import Reward from "./Reward"; // Import Reward model

const userSchema = new mongoose.Schema({
	uid: { type: String, required: true, unique: true }, // Unique Firebase UID
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	photoURL: { type: String },
	tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Array of tasks
	rewards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reward" }], // Array of rewards
	createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
