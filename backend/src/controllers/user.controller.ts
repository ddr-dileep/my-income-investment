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

  getUserInfo: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const user = await User.findById(req.user.id).select("-password -__v");
      if (!user) {
        return res
          .status(404)
          .json(apiResponse.ERROR({ message: "User not found" }));
      }

      res
        .status(200)
        .json(
          apiResponse.SUCCESS({ user, message: "User info found successfully" })
        );
    } catch (error) {
      res.status(500).json(apiResponse.ERROR(error));
    }
  },

  updateUserInfo: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const user = await User.findById(req.user.id);
      if (!user || user.isAccountDeleted) {
        return res.status(404).json(
          apiResponse.ERROR({
            message: "User not found or account is deleted",
          })
        );
      }

      req.body.password = user.password;

      const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        return res
          .status(400)
          .json(apiResponse.ERROR({ message: "Invalid request" }));
      }

      res.status(200).json(
        apiResponse.SUCCESS({
          user: updatedUser,
          message: "User info updated successfully",
        })
      );
    } catch (error) {
      res.status(500).json(apiResponse.ERROR(error));
    }
  },

  // updateUserInfo: async (req: Request | any, res: Response): Promise<any> => {
  //   try {
  //     const user = await User.findById(req.user.id);
  //     if (!user) {
  //       return res.status(404).json(
  //         apiResponse.ERROR({
  //           message: "User not found or account is deleted",
  //         })
  //       );
  //     }

  //     user.isAccountDeleted = true;

  //     await user.save();

  //     res
  //       .status(200)
  //       .json(
  //         apiResponse.SUCCESS({
  //           user,
  //           message: "User info updated successfully",
  //         })
  //       );
  //   } catch (error) {
  //     res.status(500).json(apiResponse.ERROR(error));
  //   }
  // },
};
