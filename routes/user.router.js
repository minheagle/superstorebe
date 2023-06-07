import express from "express";
import * as userController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", userController.getAll);
userRouter.get("/{id}", userController.getById);
userRouter.post("/", userController.createUser);
userRouter.put("/{id}", userController.updateUser);
userRouter.delete("/{id}", userController.deleteUser);

export default userRouter;
