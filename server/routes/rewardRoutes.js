import express from "express";
import {
	createReward,
	getRewardStatus,
	activateReward,
	getRewards,
} from "../controllers/rewardController.js";

const router = express.Router();

router.post("/", createReward);
router.get("/", getRewards);
router.get("/status", getRewardStatus);
router.put("/:id/activate", activateReward);

export default router;
