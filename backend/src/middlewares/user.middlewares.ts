import { NextFunction, Request, Response } from "express";
import apiResponse from "../utils/api.response";

export const userMiddleware = {
  registerUser: (req: Request, res: Response, next: NextFunction): any => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json(
        apiResponse.ERROR({
          name: name ? undefined : "Name is required",
          email: email ? undefined : "Email is required",
          password: password ? undefined : "Password is required",
          message: "All fields are required",
        })
      );
    }
    next();
  },

  loginUser: (req: Request, res: Response, next: NextFunction): any => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(
        apiResponse.ERROR({
          email: email ? undefined : "Email is required",
          password: password ? undefined : "Password is required",
          message: "All fields are required",
        })
      );
    }
    next();
  },
};
