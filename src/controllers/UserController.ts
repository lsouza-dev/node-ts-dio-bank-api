import { Request,Response } from "express";

const db = [
  {
    name: "Joana",
    email: "joana@dio.com",
  },
];


export class UserController {
  public createUser = (request: Request, response: Response) => {
    const body = request.body;
    db.push(body);
    response.status(201).json({ message: "Usuário criado com sucesso" });
  };

  public getUsers = (request: Request, response: Response) => {
    response.status(200).json(db);
  };
}
