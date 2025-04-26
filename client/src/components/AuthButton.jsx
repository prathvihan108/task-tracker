import React from "react";
import { signInWithGoogle } from "../firebase/auth";

const AuthButton = () => {
	const handleLogin = async () => {
		try {
			const user = await signInWithGoogle();
			console.log("Logged in user:", user.uid);
		} catch (error) {
			alert("Login failed");
		}
	};

	return <button onClick={handleLogin}>Sign in with Google</button>;
};

export default AuthButton;
