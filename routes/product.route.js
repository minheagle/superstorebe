import express from "express";
import { productController } from "../controllers/index.js";
import { uploadCloud } from "../configs/cloudinary.js";
import handleImageMiddleware from "../middlewares/image.middleware.js";
import Exception from "../exceptions/Exception.js";

const productRouter = express.Router();

productRouter.post("/create", productController.create);

export default productRouter;
