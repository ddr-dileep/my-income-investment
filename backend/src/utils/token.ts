import JWT from "jsonwebtoken";

export const generateToken = (data: any) => {
  const token = JWT.sign(data, process.env.JWT_SECRET!, { expiresIn: "1d" });
  return token;
};
