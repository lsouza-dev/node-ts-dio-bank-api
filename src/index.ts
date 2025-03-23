import express, { Request, Response } from "express";
import { UserController } from "./controllers/UserController";

const userController = new UserController();

const server = express();
server.use(express.json());

server.get("/user",userController.getUsers);

server.post("/user", userController.createUser);

server.listen(5000, () => {
  console.log("Servidor iniciado na porta 5000");
});
