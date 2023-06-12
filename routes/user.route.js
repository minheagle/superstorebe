import express from "express";

import { userController } from "../controllers/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = express.Router();
// for public
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

// for user
userRouter.get("/:id", authMiddleware.checkAccessToken, userController.getById);
userRouter.put(
  "/:id",
  authMiddleware.checkAccessToken,
  userController.updateUser
);

export default userRouter;
