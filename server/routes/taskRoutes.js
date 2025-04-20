import express from "express";
import {
	getTasks,
	createTask,
	updateTaskStatus,
	deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;
