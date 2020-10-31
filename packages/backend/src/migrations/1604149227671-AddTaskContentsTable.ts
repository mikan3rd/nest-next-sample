import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskContentsTable1604149227671 implements MigrationInterface {
  name = "AddTaskContentsTable1604149227671";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `taskContents` (`id` int NOT NULL AUTO_INCREMENT, `checked` tinyint NOT NULL DEFAULT 0, `title` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `taskId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      "ALTER TABLE `taskContents` ADD CONSTRAINT `FK_c17640d3431e5ba8638f2bc6ac4` FOREIGN KEY (`taskId`) REFERENCES `tasks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `taskContents` DROP FOREIGN KEY `FK_c17640d3431e5ba8638f2bc6ac4`");
    await queryRunner.query("DROP TABLE `taskContents`");
  }
}
