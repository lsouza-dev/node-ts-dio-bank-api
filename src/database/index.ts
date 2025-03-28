import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "nodeuser",
  password: "nodepassword123",
  database: "diobankdb",
  entities:[
    User
  ],
  migrations:[
    "./src/database/migrations/*.ts"
  ]
});
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado!");
  })
  .catch((err) => {
    console.error(err);
  });
