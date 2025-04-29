// pages/Login.jsx
import { signInWithGoogle } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			console.log("trying to open sign in with google pop up");
			const user = await signInWithGoogle();
			console.log("signin completed");
			console.log("Logged in as", user.displayName);
			navigate("/dashboard");
		} catch (err) {
			console.error("Login error:", err);
		}
	};

	return (
		<div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 p-6">
			<h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-800">
				Dream big. Start small. Act now.
			</h1>
			<p className="text-gray-600 text-lg md:text-xl text-center mb-8">
				Every small task you complete is a step toward greatness.
			</p>
			<button
				onClick={handleLogin}
				className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105"
			>
				<img src="/googleLogo.png" className="w-6 h-6" alt="Google logo" />
				Sign in with Google
			</button>
		</div>
	);
}
