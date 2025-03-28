import { Request, Response } from "express";
import { UserService } from "../services/UserServices";

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = async (request: Request, response: Response) => {
    const user = request.body;

    if (!user.name || !user.email || !user.password)
      response
        .status(400)
        .json({ message: "Bad Request: Todos os campos são obrigatórios" });

    this.userService.createUser(user.name, user.email, user.password);
    response.status(201).json({ message: "Usuário criado com sucesso" });
  };

  getUser = async (request: Request, response: Response) => {
    const { userId } = request.params;
    const user = await this.userService.getUser(userId);
    response.status(200).json({
      userId: user?.id_user,
      name: user?.name,
      email: user?.email,
    });
  };

  // public deleteUser = (request: Request, response: Response) => {
  //   const {email} = request.body;
  //   const usuarioExcluido = this.userService.deleteUser(email)
  //   if(usuarioExcluido) response.status(204).send();
  //   else response.status(404).send({message: 'Usuário não encontrado'})
  // }
}
