import express, { Request, Response, Router } from "express";
import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserServices";
import { router } from "./routes";


const server = express();
server.use(express.json());
server.use(router)


server.listen(5000, () => {
  console.log("Servidor iniciado na porta 5000");
});
