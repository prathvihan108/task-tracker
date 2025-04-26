import express from "express";
import verifyToken from "../middleware/auth.js";
import {
	getTasks,
	createTask,
	updateTaskStatus,
	deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", verifyToken, getTasks);
router.post("/", verifyToken, createTask);
router.put("/:id", verifyToken, updateTaskStatus);
router.delete("/:id", verifyToken, deleteTask);

export default router;
