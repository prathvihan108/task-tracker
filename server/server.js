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

// Middlewares
app.use(
	cors({
		origin: process.env.CLIENT_ORIGIN, // your frontend port
	})
);

app.use(express.json());

// Routes
app.use("/api", verify);
app.use("/api/tasks", taskRoutes);
app.use("/api/rewards", rewardRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
	res.json({ hello: 123 });
});

// MongoDB connection

// Connect to MongoDB
await connectDB();

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);
