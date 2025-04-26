import express from "express";
import {
	createUser,
	getUser,
	updateUser,
} from "../controllers/userController.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.post("/", createUser);
router.get("/:uid", verifyToken, getUser);
router.put("/:uid", verifyToken, updateUser);

export default router;
