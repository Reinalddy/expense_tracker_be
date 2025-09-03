import express from "express";
import { addTransaction, getTransactions } from "../controllers/transactionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getTransactions);
router.post("/", authMiddleware, addTransaction);

export default router;