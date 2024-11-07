import { NextFunction, Request, Response } from "express";
import apiResponse from "../utils/api.response";

export const investmentMiddleware = {
  addInvestment: (req: Request, res: Response, next: NextFunction): any => {
    const { title, amount } = req.body;
    if (!title || !amount) {
      return res.status(400).json(
        apiResponse.ERROR({
          title: title ? undefined : "title is required",
          amount: amount ? undefined : "amount is required",
          message: "Title and amount are required",
        })
      );
    }
    next();
  },
};
