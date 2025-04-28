import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase/auth";
import { auth } from "../firebase/config.js";
export default function Header() {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((currentUser) => {
			setUser(currentUser);
		});

		return () => unsubscribe();
	}, []);

	return (
		<header className="flex justify-between items-center p-4 bg-white shadow-md">
			<div className="flex gap-1">
				<h1 className="text-xl font-bold">Task Tracker</h1>
				<img src="/logo.png" alt="logo" className="w-10 h-10" />
			</div>

			<nav className="space-x-4 flex items-center">
				{user ? (
					<>
						<nav className="absolute left-1/2 transform -translate-x-1/2 space-x-8">
							<NavLink to="/dashboard" className="hover:text-blue-500">
								Dashboard
							</NavLink>
							<NavLink to="/reward" className="hover:text-blue-500">
								Reward System
							</NavLink>
						</nav>
						<div className="flex items-center space-x-3">
							<img
								src={user?.photoURL || "/profile.png"}
								alt="Profile"
								className="w-8 h-8 rounded-full object-cover"
								onError={(e) => (e.target.src = "/profile.png")}
							/>

							<div className="text-sm">
								<p className="font-semibold">{user.displayName}</p>
								<p className="text-gray-600">{user.email}</p>
							</div>
						</div>
						<button
							onClick={signOutUser}
							className="bg-red-500 text-white px-3 py-1 rounded"
						>
							Logout
						</button>
					</>
				) : (
					<div className="flex items-center space-x-4">
						<span className="font-semibold">Prathviraj H ~</span>
						<NavLink
							to="https://github.com/prathvihan108"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-500"
						>
							GitHub
						</NavLink>
						<span className="text-gray-400">|</span>
						<NavLink
							to="https://www.linkedin.com/in/prathvirajh/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-500"
						>
							LinkedIn
						</NavLink>
					</div>
				)}
			</nav>
		</header>
	);
}
