import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const verifyToken = async (req, res, next) => {
	const token = req.headers.authorization?.split("Bearer ")[1];

	if (!token) {
		return res.status(403).json({ message: "No token provided" });
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		req.user = decodedToken; // Attach decoded token to request
		next(); // Proceed to the next middleware or route handler
	} catch (error) {
		console.error("Error verifying token:", error);
		return res.status(401).json({ message: "Invalid or expired token" });
	}
};

export default verifyToken;
