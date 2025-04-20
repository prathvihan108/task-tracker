import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import RewardSystem from "./pages/RewardSystem";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
	return (
		<>
			<ToastContainer position="top-right" />
			<div className="min-h-screen bg-gray-100">
				<Header />
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/reward" element={<RewardSystem />} />
				</Routes>
			</div>
		</>
	);
}
