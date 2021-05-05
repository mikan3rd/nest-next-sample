-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `color` ENUM('red', 'blue', 'green') NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `TaskContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checked` TINYINT NOT NULL DEFAULT 0,
    `title` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `taskId` INTEGER NOT NULL,

    INDEX `TaskContent.taskId_index`(`taskId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `TaskCategoryRelation` (
    `task_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `TaskCategoryRelation.category_id_index`(`category_id`),
    INDEX `TaskCategoryRelation.task_id_index`(`task_id`),
    PRIMARY KEY (`task_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- AddForeignKey
ALTER TABLE `TaskContent` ADD FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskCategoryRelation` ADD FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskCategoryRelation` ADD FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
