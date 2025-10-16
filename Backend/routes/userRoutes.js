import { Router } from "express";
import { signupUser, loginUser } from "../controllers/userController.js";
export const userRouter = Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
