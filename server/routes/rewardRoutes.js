import express from "express";
import verifyToken from "../middleware/auth.js";
import {
	createReward,
	getRewardStatus,
	resetRewards,
	getRewards,
} from "../controllers/rewardController.js";

const router = express.Router();

router.post("/:uid", verifyToken, createReward);
router.get("/:uid", verifyToken, getRewards);
router.get("/status/:uid", verifyToken, getRewardStatus);
router.delete("/:uid", verifyToken, resetRewards);

export default router;
