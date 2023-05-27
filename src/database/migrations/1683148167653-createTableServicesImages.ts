import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableServicesImages1683148167653
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "services_images",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "url",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "file_size",
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
          {
            name: "service_id",
            type: "uuid",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "services_images",
      new TableForeignKey({
        columnNames: ["service_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "services",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("services_images", "service_id");
    await queryRunner.dropTable("services_images");
  }
}
