import { Router } from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
export const orderRouter = Router();
orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/user/:id", authMiddleware, getUserOrders);
