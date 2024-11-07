import { Router } from "express";
import userRouter from "./user.routers";
import investmentRouter from "./Investment.router";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/investment", investmentRouter);

export default rootRouter;
