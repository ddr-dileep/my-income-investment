import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import apiResponse from "./api.response";

export const generateToken = (data: any) => {
  const token = JWT.sign(data, process.env.JWT_SECRET!, { expiresIn: "1d" });
  return token;
};

export const verifyTokenMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json(apiResponse.ERROR({ message: "Token not found" }));
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(apiResponse.ERROR(error));
  }
};
