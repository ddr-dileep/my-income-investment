import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middlewares";
import { verifyTokenMiddleware } from "../utils/token";

const userRouter = Router();

userRouter.post(
  "/register",
  userMiddleware.registerUser,
  userController.registerUser
);

userRouter.post(
  "/login",
  userMiddleware.loginUser,
  userController.loginUser
);

userRouter.get(
  "/info",
  verifyTokenMiddleware,
  userController.getUserInfo
);

userRouter.patch(
  "/update",
  verifyTokenMiddleware,
  userController.updateUserInfo
);


export default userRouter;
