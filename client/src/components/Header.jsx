import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase/auth";
import { auth } from "../firebase/config.js";
import InstallAppButton from "./InstallAppButton.jsx";
import InfoButton from "./InfoButton.jsx";
import ProfileSection from "./ProfileSection.jsx";
export default function Header() {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((currentUser) => {
			setUser(currentUser);
		});

		return () => unsubscribe();
	}, []);

	return (
		<header className="flex flex-wrap justify-between items-center p-4 bg-blue-300 shadow-md">
			<div className="flex justify-between w-full items-center">
				<div className="flex items-center gap-2">
					<img src="/logo.png" alt="logo" className="w-10 h-10" />
					<h1 className="text-xl font-bold text-white">Task Tracker</h1>
				</div>

				<InfoButton />
			</div>

			<nav className="flex flex-col sm:flex-row sm:items-center sm:justify-center w-full mt-4 sm:mt-0 text-center gap-4 sm:gap-8">
				{user ? (
					<>
						<div className="flex flex-row items-center justify-center w-full mb-2 sm:mb-0">
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

						{/* Profile Section */}
						<ProfileSection user={user} signOutUser={signOutUser} />
					</>
				) : (
					<div className="w-full flex justify-center items-center mt-1 sm:mt-0">
						<InstallAppButton />
					</div>
				)}
			</nav>
		</header>
	);
}
