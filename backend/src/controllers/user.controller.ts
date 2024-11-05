import { Request, Response } from "express";
import User from "../models/user.models";
import apiResponse from "../utils/api.response";
import { comparePasswords, hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/token";

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

  loginUser: async (req: Request, res: Response): Promise<any> => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });

      if (!existingUser) {
        return res
          .status(401)
          .json(apiResponse.ERROR({ message: "Invalid credentials" }));
      }

      const isPasswordValid = await comparePasswords(
        req.body.password,
        existingUser.password
      );

      if (!isPasswordValid) {
        return res
          .status(401)
          .json(apiResponse.ERROR({ message: "Invalid credentials" }));
      }

      const token = generateToken({
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      });

      res.status(201).json({
        token,
        message: "User logged in successfully",
      });
    } catch (error) {
      res.status(400).json(apiResponse.ERROR(error));
    }
  },
};
