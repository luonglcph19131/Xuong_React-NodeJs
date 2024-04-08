import { Router } from "express";
import { getAllUser, signIn, signUp } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);
authRouter.get("/", getAllUser)

export default authRouter;
