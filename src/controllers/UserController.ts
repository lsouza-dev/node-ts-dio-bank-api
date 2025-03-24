import { Request,Response } from "express";
import { UserService} from "../services/UserServices";

export class UserController {
  userService:UserService

  constructor(userService = new UserService){
    this.userService = userService
  }

  
  public createUser = (request: Request, response: Response) => {
    const user = request.body;

    if(!user.name) response.status(400).json({message:'Bad Request: Name obrigatório'})

    this.userService.createUser(user.name,user.email,user.password)
    response.status(201).json({ message: "Usuário criado com sucesso" });
  };

  public getAllUsers = (request: Request, response: Response) => {
    const users = this.userService.getAllUsers();
    response.status(200).json(users);
  };
}
