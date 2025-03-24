import { UserService,IUser } from "./UserServices"

describe('UserService',() =>{
  const mockDb:IUser[] = []
  const userService = new UserService(mockDb);

  it('Deve adicionar um novo usuário',() =>{
    const mockConsole = jest.spyOn(global.console,'log')
    userService.createUser('Luiz','lsouza@gmail.com','senha123')
    expect(mockConsole).toHaveBeenCalledWith('Db Atualizado',mockDb)

  })
})