import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskTable1603379738841 implements MigrationInterface {
  name = "AddTaskTable1603379738841";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `tasks` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE `tasks`");
  }
}
