import { Router } from "express";
import { initiatePayment } from "../controllers/paymentController.js";
export const paymentRouter = Router();
paymentRouter.post("/initiate", initiatePayment);
