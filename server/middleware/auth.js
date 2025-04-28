import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Get the current directory of the module in ES Module scope
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Set up path for local and production
const localFilePath = path.join(__dirname, "../secrets/serviceAccountKey.json");
const productionFilePath = "/etc/secrets/serviceAccountKey.json";

// Use the correct path based on the environment
const filePath = fs.existsSync(localFilePath)
	? localFilePath
	: productionFilePath;

if (!fs.existsSync(filePath)) {
	throw new Error("Service account key file not found");
}

const serviceAccount = JSON.parse(fs.readFileSync(filePath, "utf8"));

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
		req.user = decodedToken;
		console.log("Token verified in backend");
		next();
	} catch (error) {
		console.error("Error verifying token:", error);
		return res.status(401).json({ message: "Invalid or expired token" });
	}
};

export default verifyToken;
