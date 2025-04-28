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
		<header className="flex flex-wrap justify-between items-center p-4 bg-white shadow-md">
			<div className="flex items-center gap-2">
				<img src="/logo.png" alt="logo" className="w-10 h-10" />
				<h1 className="text-xl font-bold">Task Tracker</h1>
			</div>

			<nav className="flex flex-col sm:flex-row sm:items-center sm:justify-center w-full mt-4 sm:mt-0 text-center gap-4 sm:gap-8">
				{user ? (
					<>
						<div className="flex flex-row items-center justify-center  w-full mb-2 sm:mb-0">
							<NavLink
								to="/dashboard"
								className={({ isActive }) =>
									`text-base font-semibold text-blue-600 hover:scale-105 transition-all duration-200 px-3 py-1 rounded ${
										isActive ? "bg-blue-100" : ""
									}`
								}
							>
								Dashboard
							</NavLink>

							<NavLink
								to="/reward"
								className={({ isActive }) =>
									`text-base font-semibold text-blue-600 hover:scale-105 transition-all duration-200 px-3 py-1 rounded ${
										isActive ? "bg-blue-100" : ""
									}`
								}
							>
								Reward System
							</NavLink>
						</div>

						<div className="flex flex-col sm:flex-row mb-4.5 sm:items-center sm:space-x-10">
							<div className="flex items-center space-x-2">
								<img
									src={user?.photoURL || "/profile.png"}
									alt="Profile"
									className="w-8 h-8 rounded-full object-cover"
									onError={(e) => (e.target.src = "/profile.png")}
								/>
								<div className="text-sm text-left">
									<p className="font-semibold">{user.displayName}</p>
									<p className="text-gray-600">{user.email}</p>
								</div>
							</div>

							<button
								onClick={signOutUser}
								className="bg-red-500 text-white px-3 py-1 rounded mt-2 sm:mt-0 sm:self-start"
							>
								Logout
							</button>
						</div>
					</>
				) : (
					<div className="flex flex-row sm:flex-row sm:items-center sm:space-x-4">
						<span className="font-semibold">~Prathviraj H</span>

						<span className="text-gray-400 hidden sm:inline">|</span>
					</div>
				)}
			</nav>
		</header>
	);
}
