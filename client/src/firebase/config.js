import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAgDt5B2ng6cFt5Bchc_b5bvOaJa_2T3Fk",
	authDomain: "task-tracker-4b03c.firebaseapp.com",
	projectId: "task-tracker-4b03c",
	storageBucket: "task-tracker-4b03c.firebasestorage.app",
	messagingSenderId: "247031895919",
	appId: "1:247031895919:web:8dde4fdf657aeddd05ba9a",
	measurementId: "G-K1CQJGM9Q1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
