import { UserService } from "../services/UserServices";
import { UserController } from "./UserController";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request, Response } from "express";

const mockUserService = {
  createUser: jest.fn(),
  getUser: jest.fn(),
  getAllUsers: jest.fn(),
  deleteUser: jest.fn()
}

jest.mock('../services/UserServices',() => {
  return {
    UserService: jest.fn().mockImplementation(() =>{
      return mockUserService
    })
  }
})

describe("UserController", () => {
  const mockResponse = makeMockResponse();

  const userController = new UserController();

  it("Deve adicionar um novo usuário", () => {
    const mockRequest = {
      body: {
        name: "Lsouza",
        email: "lsouza.dev@gmail.com",
        password: "q2131312",
      },
    } as Request;

    
    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toMatchObject({
      message: "Usuário criado com sucesso",
    });
  });

  it('Deve retornar erro caso o usuário não informe o nome', () => {
    const mockRequest = {
      body: {
        email: "lsouza.dev@gmail.com",
        password: "123456"
      }
    } as Request

    console.log(mockRequest.body);
    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({message:'Bad Request: Todos os campos são obrigatórios'})

  })
  it('Deve retornar erro caso o usuário não informe o email', () => {
    const mockRequest = {
      body: {
        name:"Lsouza",
        password: "123456"
      }
    } as Request

    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({message:'Bad Request: Todos os campos são obrigatórios'})

  })
  it('Deve retornar erro caso o usuário não informe a senha', () => {
    const mockRequest = {
      body: {
        name: "Lsouza",
        email: "lsouza.dev@gmail.com"
      }
    } as Request

    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({message:'Bad Request: Todos os campos são obrigatórios'})

  })

  it('Deve retornar o usuário com o userId informado', () => {
    const mockRequest = makeMockRequest({
      params:{
        userId:'123456'
      }
    }) as Request
    userController.getUser(mockRequest,mockResponse)
    expect(mockUserService.getUser).toHaveBeenCalledWith('123456')
    expect(mockResponse.state.status).toBe(200)
    })
  }

  // it("Deve exibir todos os usuários", () => {
  //   const mockRequest = {} as Request;
  //   const mockResponse = makeMockResponse();

  //   userController.getAllUsers(mockRequest, mockResponse);

  //   expect(mockResponse.state.status).toBe(200);
  //   expect(mockResponse.state.json).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         name: "Test User",
  //         email: "test@example.com",
  //       }),
  //     ])
  //   );
  // });

  // it("Deve deletar um usuário existente", () => {
  //   const mockResponse = makeMockResponse();
  //   mockResponse.status = jest.fn().mockReturnThis(); // Mock do status()
  //   mockResponse.send = jest.fn(); // Mock do send()

  //   const mockRequest = {
  //     body: { email: "lsouza.dev@gmail.com" },
  //   } as Request;

  //   userController.deleteUser(mockRequest, mockResponse);

  //   expect(mockResponse.status).toHaveBeenCalledWith(204);
  //   expect(mockResponse.send).toHaveBeenCalled();
  // });

  // it("Deve retornar erro ao tentar deletar um usuário inexistente", () => {
  //   const mockRequest = {
  //     body: { email: "nonexistent@example.com" },
  //   } as Request;
    
  //   const mockResponse = makeMockResponse();
  //   mockResponse.status = jest.fn().mockReturnThis();
  //   mockResponse.send = jest.fn();

  //   userController.deleteUser(mockRequest, mockResponse);

  //   expect(mockResponse.status).toHaveBeenCalledWith(404);
  //   expect(mockResponse.send).toHaveBeenCalledWith({
  //     message: "Usuário não encontrado",
  //   });
  // });
});
