import express from "express";
import { addFeedback, getFeedbacks } from "../controllers/feedback.js";

const router = express.Router();

router.get("/getFeedbacks", getFeedbacks);

router.post("/", addFeedback);

export default router;
