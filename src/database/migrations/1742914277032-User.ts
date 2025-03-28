import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1742914277032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id_user",
            type: "varchar",
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar",
            isNullable:false
          },
          {
            name: "email",
            type: "varchar",
            isNullable:false,
            isUnique:true
          },
          {
            name: "password",
            type: "varchar",
            isNullable:false
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
