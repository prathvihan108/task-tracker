export default function Heatmap({ tasks }) {
	const total = tasks.length;
	const completed = tasks.filter((t) => t.status === "completed").length;
	const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

	return (
		<div className="bg-white p-4 rounded shadow text-center">
			<h3 className="font-semibold text-lg">Discipline Percentage</h3>
			<p className="text-xl mt-2">{percentage}% Completed</p>
			<div className="h-3 mt-2 bg-gray-200 rounded">
				<div
					className="h-3 bg-green-500 rounded"
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	);
}
