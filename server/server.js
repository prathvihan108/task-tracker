import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

import taskRoutes from "./routes/taskRoutes.js";
import rewardRoutes from "./routes/rewardRoutes.js";
import verify from "./middleware/auth.js";

import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.CLIENT_ORIGINS.split(",");

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(express.json());

// Routes
// app.use("/api", verify);
app.use("/api/tasks", taskRoutes);
app.use("/api/rewards", rewardRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
	res.json({ hello: 123 });
});

app.get("/health", (req, res) => {
	res.json({ status: "ok", message: "Server is alive" });
});

// MongoDB connection

// Connect to MongoDB
await connectDB();

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);
