export interface IUser {
  name: string;
  email: string;
  password:string;
}

const db = [
  {
    "name":"lsouza",
    "email":"lsouza.dev@gmail.com",
    "password":"lsouza123"
  },
  {
    "name":"helena",
    "email":"helena.dev@gmail.com",
    "password":"helena123"
  },
  {
    "name":"mary",
    "email":"mary.dev@gmail.com",
    "password":"mary123"
  }
]

export class UserService {
  db: IUser[]

  constructor(database = db) {
    this.db = database;
  }
  public createUser = (name: string, email: string,password:string):IUser => {
    const user:IUser = {
      name: name,
      email: email,
      password:password
    };
    
    this.db.push(user);
    console.log('Db Atualizado',this.db);
    return user;
  };

  public getAllUsers = (): IUser[] => {
    return this.db;
  };

  public deleteUser = (email:string):boolean => {
    const findUser = this.db.find(user => user.email === email)
    if(!findUser) return false;
    this.db = this.db.filter(user => user !== findUser)
    return true
  }
}
