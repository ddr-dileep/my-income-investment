import { Request, Response } from "express";
import User from "../models/user.models";
import apiResponse from "../utils/api.response";
import { hashPassword } from "../utils/bcrypt";

export const userController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const user = new User({
        ...req.body,
        password: hashPassword(req.body.password),
      });
      await user.save();

      res.status(201).json({ user, message: "User registered successfully" });
    } catch (error) {
      res.status(400).json(apiResponse.ERROR(error));
    }
  },
};
