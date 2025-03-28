import { EntityManager } from "typeorm";

interface mockManagerArgs{
  saveReturn?: object | [object],
  findOneReturn?: object | null,
  deleteReturn?: object | null,
}

export const getMockEntityManager = async ({saveReturn = undefined,findOneReturn = undefined, deleteReturn = undefined}:mockManagerArgs):Promise<EntityManager> =>{
  const manager:Partial<EntityManager> = {};

  manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn));
  manager.findOne = jest.fn().mockImplementation(() => Promise.resolve(findOneReturn));
  manager.delete = jest.fn().mockImplementation(() => Promise.resolve(deleteReturn));


  return manager as EntityManager;
}