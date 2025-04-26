// pages/Login.jsx
import { signInWithGoogle } from "../firebase/auth"; // your sign-in util
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const user = await signInWithGoogle();
			console.log("Logged in as", user.displayName);
			navigate("/dashboard");
		} catch (err) {
			console.error("Login error:", err);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<button
				onClick={handleLogin}
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				Sign in with Google
			</button>
		</div>
	);
}
