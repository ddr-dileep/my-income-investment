import { Router } from "express";

const userRouter = Router();

userRouter.post("/register", (req, res) => {
  res.send("working");
});

export default userRouter;
