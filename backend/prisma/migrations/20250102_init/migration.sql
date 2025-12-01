CREATE TABLE `usuario` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `criado_em` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `usuario_nome_key`(`nome`),
    UNIQUE INDEX `usuario_telefone_key`(`telefone`),
    UNIQUE INDEX `usuario_email_key`(`email`)
);

CREATE TABLE `evento` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `data_evento` DATETIME NOT NULL,
    `criado_em` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `evento_voluntario` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `evento_id` INT NOT NULL,
    `usuario_id` INT NULL,

    PRIMARY KEY (`id`),

    INDEX `evento_voluntario_evento_id_idx`(`evento_id`),
    INDEX `evento_voluntario_usuario_id_idx`(`usuario_id`),

    CONSTRAINT `evento_voluntario_evento_id_fkey`
        FOREIGN KEY (`evento_id`) REFERENCES `evento`(`id`)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT `evento_voluntario_usuario_id_fkey`
        FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`)
        ON DELETE SET NULL ON UPDATE CASCADE
);