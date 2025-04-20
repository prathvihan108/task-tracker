import { useState } from "react";
import axios from "../api";

export default function RewardSystem() {
	const [title, setTitle] = useState("");
	const [threshold, setThreshold] = useState(100);
	const [active, setActive] = useState(false);

	const createReward = async () => {
		await axios.post("/rewards", {
			title,
			disciplineThreshold: threshold,
			active,
		});
		setTitle("");
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
			<input
				type="number"
				placeholder="Discipline Threshold %"
				className="border p-2 w-full mb-2"
				value={threshold}
				onChange={(e) => setThreshold(Number(e.target.value))}
			/>
			<label className="block mb-4">
				<input
					type="checkbox"
					checked={active}
					onChange={() => setActive(!active)}
				/>
				<span className="ml-2">Activate Now</span>
			</label>
			<button
				onClick={createReward}
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				Save Reward
			</button>
		</div>
	);
}
