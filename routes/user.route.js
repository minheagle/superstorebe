import express from "express";

import * as userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  userController.getAll
);
userRouter.get("/:id", userController.getById);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
