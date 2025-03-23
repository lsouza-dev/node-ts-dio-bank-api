export interface IUser {
  nome: string;
  email: string;
  password:string;
}

export const db: IUser[] = [
  {
    "nome":"Luiz",
    "email":"lsouza@gmail.com",
    "password":"senha123"
  }
];

export class UserService {
  public createUser = (nome: string, email: string,password:string):IUser => {
    const user:IUser = {
      nome: nome,
      email: email,
      password:password
    };

    db.push(user);
    
    console.log("Db Atualizado",db);
     
    return user;
  };

  public getAllUsers = (): IUser[] => {
    return db;
  };
}
