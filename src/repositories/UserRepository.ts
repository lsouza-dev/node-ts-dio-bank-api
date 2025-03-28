import { EntityManager } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {  
  private manager: EntityManager;

  constructor(manager:EntityManager) {
    this.manager = manager;
  }


  createUser = async(user:User) => {
    return await this.manager.save(user);
  }

  getUser = async (idUser: string): Promise<User | null> => {
    return this.manager.findOne(User,{
      where:{
        id_user:idUser
      }
    })
  }

  getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
    return await this.manager.findOne(User,{
      where:{
        email:email,
        password:password
      }
    })
  }

  deleteUser = async(user:User): Promise<void> => {
    await this.manager.remove(user);
  }

  
}
