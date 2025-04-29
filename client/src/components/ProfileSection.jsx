import { useState, useEffect, useRef } from "react";

function ProfileSection({ user, signOutUser }) {
	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef(null);
	const toggleRef = useRef(null);

	// Close the section when clicked outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target) &&
				!toggleRef.current.contains(event.target)
			) {
				setIsVisible(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Handle the toggle click
	const handleToggleClick = () => {
		setIsVisible((prev) => !prev);
	};

	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10">
			<div className="sm:hidden">
				<button
					ref={toggleRef}
					onClick={handleToggleClick}
					className="flex items-center justify-between space-x-2 p-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-200"
				>
					<span className="text-lg">▼</span>
					<img
						src={user?.photoURL || "/profile.png"}
						alt="Profile"
						className="w-8 h-8 rounded-full object-cover"
						onError={(e) => (e.target.src = "/profile.png")}
					/>
					<span className="text-lg">▼</span>
				</button>

				{isVisible && (
					<div
						ref={containerRef}
						className="flex flex-col items-center sm:flex-row sm:items-center bg-gray-100 p-4 rounded-lg shadow-md mt-2 transition-all duration-300 ease-in-out"
					>
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
				)}
			</div>

			{/* On larger screens, show the profile section directly */}
			<div className="hidden sm:flex items-center space-x-10">
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
		</div>
	);
}

export default ProfileSection;
