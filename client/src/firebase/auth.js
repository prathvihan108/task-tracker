import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "./config";
import axios from "../api";

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, googleProvider);
		const user = result.user;

		// Send user to backend
		const idToken = await user.getIdToken();

		await axios.post(
			"/users",
			{
				uid: user.uid,
				name: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
			},
			{
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			}
		);

		return user;
	} catch (error) {
		console.error("Google sign-in failed:", error.message);
		throw error;
	}
};
// Sign out
export const signOutUser = async () => {
	try {
		await signOut(auth);
		console.log("User signed out");
	} catch (error) {
		console.error("Sign out failed:", error.message);
	}
};
