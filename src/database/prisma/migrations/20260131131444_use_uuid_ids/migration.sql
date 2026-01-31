/*
  Warnings:

  - The primary key for the `ailog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `taskdependency` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `taskdependency` DROP FOREIGN KEY `TaskDependency_depends_on_task_id_fkey`;

-- DropForeignKey
ALTER TABLE `taskdependency` DROP FOREIGN KEY `TaskDependency_task_id_fkey`;

-- DropIndex
DROP INDEX `TaskDependency_depends_on_task_id_fkey` ON `taskdependency`;

-- DropIndex
DROP INDEX `TaskDependency_task_id_fkey` ON `taskdependency`;

-- AlterTable
ALTER TABLE `ailog` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `task` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `taskdependency` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `task_id` VARCHAR(191) NOT NULL,
    MODIFY `depends_on_task_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `TaskDependency` ADD CONSTRAINT `TaskDependency_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskDependency` ADD CONSTRAINT `TaskDependency_depends_on_task_id_fkey` FOREIGN KEY (`depends_on_task_id`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
