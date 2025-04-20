import { useState } from "react";
import axios from "../api";
import { toast } from "react-toastify";

export default function RewardSystem() {
	const [title, setTitle] = useState("");

	const createReward = async () => {
		await axios.post("/rewards", {
			title,
		});

		setTitle("");
		toast.success(`Reward created successfully`, {
			autoClose: 2000,
		});
	};

	return (
		<div className="p-6">
			<h2 className="text-2xl font-bold mb-4">Reward System</h2>
			<input
				type="text"
				placeholder="Reward Title"
				className="border p-2 w-full mb-2"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<button
				onClick={createReward}
				className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
			>
				Save Reward
			</button>
		</div>
	);
}
