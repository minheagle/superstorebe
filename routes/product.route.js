import express from "express";
import * as productController from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post("/create", productController.create);

export default productRouter;
