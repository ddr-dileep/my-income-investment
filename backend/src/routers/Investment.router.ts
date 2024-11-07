import { Router } from "express";
import { verifyTokenMiddleware } from "../utils/token";
import { investmentController } from "../controllers/investment.controller";
import { investmentMiddleware } from "../middlewares/investment.middlewares";

const investmentRouter = Router();

investmentRouter.post(
  "/create",
  verifyTokenMiddleware,
  investmentMiddleware.addInvestment,
  investmentController.addInvestment
);

export default investmentRouter;
