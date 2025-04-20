import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();

	const logout = () => {
		// Add logout logic here
		navigate("/");
	};

	return (
		<header className="flex justify-between items-center p-4 bg-white shadow-md">
			<h1 className="text-xl font-bold">Motivator</h1>
			<nav className="space-x-4">
				<NavLink to="/dashboard" className="hover:text-blue-500">
					Dashboard
				</NavLink>
				<NavLink to="/reward" className="hover:text-blue-500">
					Reward System
				</NavLink>
				<button
					onClick={logout}
					className="bg-red-500 text-white px-3 py-1 rounded"
				>
					Logout
				</button>
			</nav>
		</header>
	);
}
