/*
  Warnings:

  - You are about to alter the column `titulo` on the `evento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to drop the column `usuario_id` on the `evento_voluntario` table. All the data in the column will be lost.
  - You are about to alter the column `nome` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `telefone` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `email` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.

*/
-- DropForeignKey
ALTER TABLE `evento_voluntario` DROP FOREIGN KEY `evento_voluntario_usuario_id_fkey`;

-- DropIndex
DROP INDEX `evento_voluntario_usuario_id_idx` ON `evento_voluntario`;

-- AlterTable
ALTER TABLE `evento` MODIFY `titulo` VARCHAR(150) NOT NULL,
    MODIFY `data_evento` DATE NOT NULL,
    MODIFY `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `evento_voluntario` DROP COLUMN `usuario_id`,
    ADD COLUMN `usuarioId` INTEGER NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `nome` VARCHAR(150) NOT NULL,
    MODIFY `telefone` VARCHAR(30) NOT NULL,
    MODIFY `email` VARCHAR(150) NOT NULL,
    MODIFY `senha` VARCHAR(255) NOT NULL,
    MODIFY `role` VARCHAR(255) NOT NULL,
    MODIFY `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `evento_voluntario` ADD CONSTRAINT `evento_voluntario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
