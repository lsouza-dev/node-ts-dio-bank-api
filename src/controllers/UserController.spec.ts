import { UserService } from "../services/UserServices";
import { UserController } from "./UserController"
import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request,Response } from "express";

describe('UserController',() => {
  const mockUserSrevice:Partial<UserService>  = {
    createUser: jest.fn()
  } // Mock do Service
  const userController = new UserController(mockUserSrevice as UserService);
  

  it('Deve adicionar um novo usuário', () => {
    const mockRequest ={
      body:{
        name:"Lsouza",
        email:"lsouza.dev@gmail.com",
        password:"q2131312"
      }
    } as Request

    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest,mockResponse)
    expect(mockResponse.state.status).toBe(201)
    expect(mockResponse.state.json).toMatchObject({message:'Usuário criado com sucesso'})
  })
})