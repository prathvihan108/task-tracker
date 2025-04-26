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
			<h1 className="text-xl font-bold">Task Tracker</h1>
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
								src={user?.photoURL || "/default-profile.jpg"}
								alt="Profile"
								className="w-8 h-8 rounded-full object-cover"
								onError={(e) => (e.target.src = "/default-profile.jpg")}
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
					<NavLink to="/login" className="hover:text-blue-500">
						Dev:Prathviraj H
					</NavLink>
				)}
			</nav>
		</header>
	);
}
