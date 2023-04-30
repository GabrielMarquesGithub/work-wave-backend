import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableImages1682782417455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "file_path",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "file_size",
            type: "int",
            isNullable: false,
          },
          {
            name: "width",
            type: "int",
            isNullable: false,
          },
          {
            name: "height",
            type: "int",
            isNullable: false,
          },
          {
            name: "format",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("images");
  }
}
