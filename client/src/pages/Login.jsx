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
		<div className="flex flex-col items-center min-h-screen justify-center bg-gradient-to-br from-blue-100 to-gray-200 text-center px-4">
			<h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
				Dream big. Start small. Act now.
			</h1>

			<p className="text-blue-700 text-md md:text-lg italic mb-2">
				Tame your monkey mind — focus, act, and evolve.
			</p>

			<img
				src="/logo.png"
				alt="Monkey Mind Illustration"
				className="w-20 h-20 mb-2 drop-shadow-lg"
			/>

			<button
				onClick={handleLogin}
				className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-xl transition-transform transform hover:scale-105"
			>
				<img src="/googleLogo.png" className="w-6 h-6" alt="Google logo" />
				Sign in with Google
			</button>

			<div className="mt-5 text-gray-500 text-sm">
				<hr className="my-4 border-t w-1/2 mx-auto" />
				<p>
					~ Prathvihan Task Tracker • Chase excellence, success will follow ✨
				</p>
			</div>
		</div>
	);
}
