import { UserService } from "./UserServices";
import * as jwt from 'jsonwebtoken';


jest.mock("../repositories/UserRepository");
jest.mock('../database',() => {
  initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require("../repositories/UserRepository");

describe("UserService", () => {
  const userService = new UserService(mockUserRepository);
  const mockUser = {
    id: "123456",
    name: "Luiz",
    email: "lsouza@gmail.com",
    password: "senha123",
  };

  it("Deve adicionar um novo usuário", async () => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() =>
      Promise.resolve(mockUser)
    );

    const response = await userService.createUser(
      "Luiz",
      "lsouza@gmail.com",
      "senha123"
    );
    expect(mockUserRepository.createUser).toHaveBeenCalled();
    expect(response).toMatchObject({
      id: "123456",
      name: "Luiz",
      email: "lsouza@gmail.com",
      password: "senha123",
    });
  });

  it('Deve retornar um usuário autenticado', async () =>{
    jest.spyOn(userService,'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
    jest.spyOn(jwt,'sign').mockImplementation(() => 'token');
    const token = await userService.getToken('lsouza@gmail.com','senha123');
    expect(token).toBe('token');
  })

  it('Deve retornar um erro se o usuário não for encontrado', async () => {
    jest.spyOn(userService,'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
    await expect(userService.getToken('invalid@test.com','213345')).rejects.toThrow(new Error('Email ou senha inválidos'));
  })  
});
