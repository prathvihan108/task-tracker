import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
	res.json({ hello: 123 });
});

// MongoDB connection
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB connected");
		app.listen(PORT, () =>
			console.log(`Server running on http://localhost:${PORT}`)
		);
	})
	.catch((err) => console.error("MongoDB connection error:", err));
