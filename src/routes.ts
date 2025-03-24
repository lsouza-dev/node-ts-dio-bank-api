import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserServices";
import { Request,Response } from "express";
export const router = Router();
const userController = new UserController(new UserService());

router.post("/user", userController.createUser);
router.get("/user",userController.getAllUsers);
router.delete("/user",userController.deleteUser);