import express from "express";

import { userController } from "../controllers/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userAdminRouter = express.Router();

userAdminRouter.use(authMiddleware.checkAccessToken, authMiddleware.isAdmin);
userAdminRouter.get("/", userController.getAll);
userAdminRouter.get("/:id", userController.getByIdForAdmin);
userAdminRouter.put("/changeBanned/:id", userController.changeBanned);
userAdminRouter.put("/changeBlocked/:id", userController.changeBlocked);
userAdminRouter.put("/unDelete/:id", userController.unDeleteUser);
userAdminRouter.delete("/:id", userController.deleteUser);

export default userAdminRouter;
