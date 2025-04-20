import TaskItem from "./TaskItem";

export default function TaskColumn({ title, tasks, refresh }) {
	return (
		<div className="w-[70vw] mx-auto bg-white p-4 rounded shadow">
			<h2 className="text-lg font-bold mb-4 text-center">{title}</h2>
			{tasks.map((task) => (
				<TaskItem key={task._id} task={task} refresh={refresh} />
			))}
		</div>
	);
}
