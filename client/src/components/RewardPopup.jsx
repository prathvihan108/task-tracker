import { useState } from "react";
import axios from "../api";
import User from "../../../server/models/User";
import { auth } from "../firebase/config.js";
import { toast } from "react-toastify";

export default function RewardPopup(showReward, setShowReward) {
	const [rewards, setRewards] = useState([]);

	const getRewards = async () => {
		const user = auth.currentUser;
		const idToken = await user.getIdToken();

		try {
			const response = await axios.get(`/rewards/${user?.uid}`, {
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});
			console.log("Reward array length: ", response.data.length);
			if (response.data.length == 0) {
				toast.success(`No rewards found for today,set it in Rewards tab`, {
					autoClose: 2000,
				});
			} else {
				setRewards(response.data);
			}
		} catch (error) {
			console.log("Rewards fetching error: ", error);
		}
	};

	return showReward ? (
		<div className="mt-4 p-4 bg-yellow-100 text-center rounded shadow">
			<h2 className="text-xl font-bold mb-2">
				🎉 You’ve earned your rewards for the day!
			</h2>

			{rewards.length === 0 ? (
				<button
					className="bg-yellow-400 px-4 py-2 rounded font-semibold"
					onClick={getRewards}
				>
					Get Reward
				</button>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
					{rewards.map((reward) => (
						<div
							key={reward._id}
							className="bg-white rounded-xl shadow-md p-4 border border-yellow-300 hover:shadow-lg transition"
						>
							<h3 className="text-lg font-semibold text-yellow-700 mb-1">
								🏆 {reward.title}
							</h3>
							<p className="text-sm text-gray-600">Reward unlocked!</p>
						</div>
					))}
				</div>
			)}
		</div>
	) : (
		<></>
	);
}
