import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import RewardSystem from "./pages/RewardSystem";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
	const [showReward, setShowReward] = useState(false);

	return (
		<>
			<ToastContainer position="top-right" />
			<div className="min-h-screen bg-gray-100">
				<Header />
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard
									showReward={showReward}
									setShowReward={setShowReward}
								/>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/reward"
						element={
							<ProtectedRoute>
								<RewardSystem
									showReward={showReward}
									setShowReward={setShowReward}
								/>
							</ProtectedRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
		</>
	);
}
