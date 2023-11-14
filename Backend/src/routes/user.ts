import { Router } from "express";
import userController from "../controllers/user";

const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);

export default userRouter;