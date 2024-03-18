DROP TABLE IF EXISTS `table_volunteers`;

CREATE TABLE `table_volunteers`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `isAdmin` BOOLEAN,
    UNIQUE (email, phone_number)
);

CREATE TABLE `events`(`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,`date` DATE NOT NULL,`shift` VARCHAR(255) NOT NULL,`volunteers` VARCHAR(255) NOT NULL,`is_active` BOOLEAN NOT NULL,`admin_comment` VARCHAR(500));

