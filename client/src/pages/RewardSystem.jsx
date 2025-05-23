import { useState } from "react";
import axios from "../api";
import { toast } from "react-toastify";
import { auth } from "../firebase/config.js";

export default function RewardSystem({ showReward, setShowReward }) {
	const [title, setTitle] = useState("");

	const createReward = async () => {
		const user = auth.currentUser;
		if (!user) {
			console.error("No user is logged in");
			return;
		}

		const idToken = await user.getIdToken();

		try {
			const response = await axios.post(
				`/rewards/${user?.uid}`,
				{ title },
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
					},
				}
			);

			setTitle("");
			toast.success(`Reward created successfully`, { autoClose: 2000 });
			console.log("Reward created: ", response.data);
		} catch (error) {
			console.error("Error creating reward:", error);
			toast.error("Error creating reward", { autoClose: 2000 });
		}
	};

	const resetRewards = async () => {
		const user = auth.currentUser;
		if (!user) {
			console.error("No user is logged in");
			return;
		}

		const idToken = await user.getIdToken();

		try {
			const response = await axios.delete(`/rewards/${user.uid}`, {
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			toast.success("All rewards reset successfully", { autoClose: 2000 });
			setShowReward(false);
			console.log("Rewards reset: ", response.data);
		} catch (error) {
			console.error("Error resetting rewards:", error);
			toast.error("Error resetting rewards", { autoClose: 2000 });
		}
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

			<div className="flex gap-4 mt-2">
				<button
					onClick={createReward}
					className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded shadow-md transition"
				>
					Save Reward
				</button>
				<button
					onClick={resetRewards}
					className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded shadow-md transition"
				>
					Reset Rewards
				</button>
			</div>
			<p className="text-lg text-gray-700 font-semibold">
				Unlock your rewards by completing all your tasks for the day! 🎯
			</p>
		</div>
	);
}
