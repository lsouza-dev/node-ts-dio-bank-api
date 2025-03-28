import { User } from "../entities/User";
import { Request,Response } from "express";
import {sign} from 'jsonwebtoken'
import { UserService } from "../services/UserServices";

const user:User = {
  id_user :'123456',
  name:"Lsouza",
  "email":"lsouza.dev@gmail.com",
  password:"senha123"
}

export class LoginController{

  userService:UserService

  constructor(userService:UserService = new UserService){
    this.userService = userService;
  }


  login = async (request:Request,response:Response) =>{
        
    const {email,password} = request.body
    try{
      const token = await this.userService.getToken(email,password)
    response.status(200).json(token);

    }catch(error){
      response.status(500).json({message:'Email ou senha inválidos'})
    }
  }
}