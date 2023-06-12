import express from "express";
import { productController } from "../controllers/index.js";

const productRouter = express.Router();

productRouter.post("/create", productController.create);

export default productRouter;
