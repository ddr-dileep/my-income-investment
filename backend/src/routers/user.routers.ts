import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middlewares";

const userRouter = Router();

userRouter.post(
  "/register",
  userMiddleware.registerUser,
  userController.registerUser
);

export default userRouter;
