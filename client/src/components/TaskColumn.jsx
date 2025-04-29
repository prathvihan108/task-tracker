import TaskItem from "./TaskItem";

export default function TaskColumn({ title, tasks, count, refresh }) {
	return (
		<div className="w-[90vw] mx-auto bg-white p-1 rounded shadow">
			<h2 className="text-lg font-bold mb-2 text-center">{title}</h2>
			{tasks.map((task) => (
				<TaskItem key={task._id} task={task} refresh={refresh} />
			))}
		</div>
	);
}
