import { UserService } from "../services/UserServices";
import { UserController } from "./UserController";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request, Response } from "express";
import { IUser } from "../services/UserServices";

describe("UserController", () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    getAllUsers: jest.fn(() => [
      { name: "Test User", email: "test@example.com", password: "password" },
    ]),
    deleteUser: jest.fn((email: string) => email === "lsouza.dev@gmail.com"),
  };

  const userController = new UserController(mockUserService as UserService);

  it("Deve adicionar um novo usuário", () => {
    const mockRequest = {
      body: {
        name: "Lsouza",
        email: "lsouza.dev@gmail.com",
        password: "q2131312",
      },
    } as Request;

    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toMatchObject({
      message: "Usuário criado com sucesso",
    });
  });

  it("Deve exibir todos os usuários", () => {
    const mockRequest = {} as Request;
    const mockResponse = makeMockResponse();

    userController.getAllUsers(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Test User",
          email: "test@example.com",
        }),
      ])
    );
  });

  it("Deve deletar um usuário existente", () => {
    const mockResponse = makeMockResponse();
    mockResponse.status = jest.fn().mockReturnThis(); // Mock do status()
    mockResponse.send = jest.fn(); // Mock do send()

    const mockRequest = {
      body: { email: "lsouza.dev@gmail.com" },
    } as Request;

    userController.deleteUser(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.send).toHaveBeenCalled();
  });

  it("Deve retornar erro ao tentar deletar um usuário inexistente", () => {
    const mockRequest = {
      body: { email: "nonexistent@example.com" },
    } as Request;
    
    const mockResponse = makeMockResponse();
    mockResponse.status = jest.fn().mockReturnThis();
    mockResponse.send = jest.fn();

    userController.deleteUser(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: "Usuário não encontrado",
    });
  });
});
