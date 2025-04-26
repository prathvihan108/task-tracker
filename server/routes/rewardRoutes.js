import express from "express";
import verifyToken from "../middleware/auth.js";
import {
	createReward,
	getRewardStatus,
	activateReward,
	getRewards,
} from "../controllers/rewardController.js";

const router = express.Router();

router.post("/", verifyToken, createReward);
router.get("/", verifyToken, getRewards);
router.get("/status", verifyToken, getRewardStatus);
router.put("/:id/activate", activateReward);

export default router;
