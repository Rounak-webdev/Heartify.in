import { Router } from "express";
import { getProducts, addProduct } from "../controllers/productController.js";
import { upload } from "../middleware/upload.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
export const productRouter = Router();
productRouter.get("/", getProducts);
productRouter.post("/", authMiddleware, upload.single("image"), addProduct);
