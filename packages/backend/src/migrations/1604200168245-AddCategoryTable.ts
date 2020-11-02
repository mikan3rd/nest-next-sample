import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryTable1604200168245 implements MigrationInterface {
  name = "AddCategoryTable1604200168245";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `categories` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `color` enum ('red', 'blue', 'green') NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      "CREATE TABLE `tasks_categories` (`task_id` int NOT NULL, `category_id` int NOT NULL, INDEX `IDX_6147e13ad964c3183edc5af465` (`task_id`), INDEX `IDX_037f513e033de7828af45478fc` (`category_id`), PRIMARY KEY (`task_id`, `category_id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      "ALTER TABLE `tasks_categories` ADD CONSTRAINT `FK_6147e13ad964c3183edc5af4658` FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
    );
    await queryRunner.query(
      "ALTER TABLE `tasks_categories` ADD CONSTRAINT `FK_037f513e033de7828af45478fc3` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `tasks_categories` DROP FOREIGN KEY `FK_037f513e033de7828af45478fc3`");
    await queryRunner.query("ALTER TABLE `tasks_categories` DROP FOREIGN KEY `FK_6147e13ad964c3183edc5af4658`");
    await queryRunner.query("DROP INDEX `IDX_037f513e033de7828af45478fc` ON `tasks_categories`");
    await queryRunner.query("DROP INDEX `IDX_6147e13ad964c3183edc5af465` ON `tasks_categories`");
    await queryRunner.query("DROP TABLE `tasks_categories`");
    await queryRunner.query("DROP TABLE `categories`");
  }
}
