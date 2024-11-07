import { Request, Response } from "express";
import apiResponse from "../utils/api.response";
import Investment from "../models/investment.models";
import User from "../models/user.models";

export const investmentController = {
  addInvestment: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const userExists = await User.findOne();
      if (!userExists || userExists?.isAccountDeleted) {
        return res.status(404).json(
          apiResponse.ERROR({
            message: "User not found or account is deleted",
          })
        );
      }
      const investment = new Investment({
        ...req.body,
        createdBy: req.user.id,
      });

      await investment.save();
      await investment.populate({ path: "createdBy", select: "-password" });
      res.status(201).json({ investment, message: "Added successfully" });
    } catch (error) {
      res.status(400).json(apiResponse.ERROR(error));
    }
  },

  getAllInvestments: async (
    req: Request | any,
    res: Response
  ): Promise<any> => {
    try {
      const investments = await Investment.find({ createdBy: req.user.id });
      res.json({
        count: investments.length,
        investments,
        message: "Investments found successfully",
      });
    } catch (error) {
      res.status(500).json(apiResponse.ERROR(error));
    }
  },
};
