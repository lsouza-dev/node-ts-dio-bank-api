import { sign } from "jsonwebtoken";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepository:UserRepository

  constructor(userRepository = new UserRepository(AppDataSource.manager)) {
    this.userRepository = userRepository;
  }
  public createUser = async (name: string, email: string,password:string): Promise<User> => {
    
    const user:User = {
      name: name,
      email: email,
      password:password
    };
    
    return this.userRepository.createUser(user);
    
  };

  // public getAllUsers = (): IUser[] => {
  //   return this.db;
  // };

  public deleteUser = (email:string):boolean => {
    // const findUser = this.userRepository.getUserByEmailAndPassword(email,password)
    // if(findUser !== null){
    //   this.userRepository.deleteUser(findUser);
    //   return true
    // }
    return false;

  }
  getUser = (userId:string): Promise<User | null> => {
    return this.userRepository.getUser(userId);
  }

  getAuthenticatedUser = async (email: string, password: string): Promise<User | null> => {
    return this.userRepository.getUserByEmailAndPassword(email,password);
  }

  getToken = async (email:string,password:string): Promise<String> => {
    const user = await this.getAuthenticatedUser(email,password);

    if(!user) throw new Error('Email ou senha inválidos')

    const tokenData = {
      name: user?.name,
      email: user?.email
    }

    const tokenKey = '123456789';

    const tokenOptions = {
      subject:user?.id_user
    }

    const token = sign(tokenData,tokenKey,tokenOptions);
    return token
  }
}
