import { Request, Response } from "express";
import User from "../models/user.models";
import apiResponse from "../utils/api.response";

export const userController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      await user.save();

      res.status(201).json({ user, message: "User registered successfully" });
    } catch (error) {
      res.status(500).json(apiResponse.ERROR(error));
    }
  },
};
