DROP TABLE IF EXISTS `table_volunteers`;
DROP TABLE IF EXISTS `events`;
DROP TABLE IF EXISTS `event_volunteers`;


CREATE TABLE `table_volunteers`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL,
    UNIQUE (email, phone_number)
);

CREATE TABLE `events`(`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,`date` DATE NOT NULL,`shift` VARCHAR(255) NOT NULL,`volunteers_registered` INT NOT NULL,`is_active` BOOLEAN NOT NULL,`admin_comment` VARCHAR(500));

CREATE TABLE `event_volunteers`(`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`volunteerID` INT NOT NULL REFERENCES table_volunteers(id),
`eventID` INT NOT NULL REFERENCES events(id)
);

INSERT INTO `table_volunteers` (first_name, last_name, email, phone_number, password, isAdmin) 
VALUES
('Sian', 'Fairley', 'sian@mail.com', '12345678', '$2b$10$ssyEv704Ce.uDVnd0SjAge/TQd5zpBcwmdsGsNkLwy7t31WzTnRwi', 0),
('Rebecca', 'Lupton', 'rebecca@mail.com', '2468024', '$2b$10$/6cuGQPwA8q7Zs3cNkGmn.e6PvIth6ngpTa4DO3K3QzeRwJypzroG', 1)
;

INSERT INTO `events`(date, shift, volunteers_registered, is_active, admin_comment) VALUES('2024-04-01', '1-3'
, 0, 1, 'First event!'),('2024-04-01', '7-9'
, 0, 1, 'Second event!');

INSERT INTO `event_volunteers`(volunteerID, eventID) VALUES (1, 1)