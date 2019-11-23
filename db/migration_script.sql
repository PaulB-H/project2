-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: fitness_hub_db
-- Source Schemata: fitness_hub_db
-- Created: Fri Nov  8 20:53:20 2019
-- Workbench Version: 8.0.18
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema fitness_hub_db
-- ----------------------------------------------------------------------------
-- DROP SCHEMA IF EXISTS `fitness_hub_db` ;
-- CREATE SCHEMA IF NOT EXISTS `fitness_hub_db` ;

-- ----------------------------------------------------------------------------
-- Table fitness_hub_db.fh_calendar
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `fh_calendar` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userid` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hr1` LONGTEXT NULL DEFAULT NULL,
  `hr2` LONGTEXT NULL DEFAULT NULL,
  `hr3` LONGTEXT NULL DEFAULT NULL,
  `hr4` LONGTEXT NULL DEFAULT NULL,
  `hr5` LONGTEXT NULL DEFAULT NULL,
  `hr6` LONGTEXT NULL DEFAULT NULL,
  `hr7` LONGTEXT NULL DEFAULT NULL,
  `hr8` LONGTEXT NULL DEFAULT NULL,
  `hr9` LONGTEXT NULL DEFAULT NULL,
  `hr10` LONGTEXT NULL DEFAULT NULL,
  `hr11` LONGTEXT NULL DEFAULT NULL,
  `hr12` LONGTEXT NULL DEFAULT NULL,
  `hr13` LONGTEXT NULL DEFAULT NULL,
  `hr14` LONGTEXT NULL DEFAULT NULL,
  `hr15` LONGTEXT NULL DEFAULT NULL,
  `hr16` LONGTEXT NULL DEFAULT NULL,
  `hr17` LONGTEXT NULL DEFAULT NULL,
  `hr18` LONGTEXT NULL DEFAULT NULL,
  `hr19` LONGTEXT NULL DEFAULT NULL,
  `hr20` LONGTEXT NULL DEFAULT NULL,
  `hr21` LONGTEXT NULL DEFAULT NULL,
  `hr22` LONGTEXT NULL DEFAULT NULL,
  `hr23` LONGTEXT NULL DEFAULT NULL,
  `hr24` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));

-- ----------------------------------------------------------------------------
-- Table fitness_hub_db.fh_calendar_audit
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `fh_calendar_audit` (
  `id` INT(11) NOT NULL,
  `userid` INT(11) NOT NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hr1` LONGTEXT NULL DEFAULT NULL,
  `hr2` LONGTEXT NULL DEFAULT NULL,
  `hr3` LONGTEXT NULL DEFAULT NULL,
  `hr4` LONGTEXT NULL DEFAULT NULL,
  `hr5` LONGTEXT NULL DEFAULT NULL,
  `hr6` LONGTEXT NULL DEFAULT NULL,
  `hr7` LONGTEXT NULL DEFAULT NULL,
  `hr8` LONGTEXT NULL DEFAULT NULL,
  `hr9` LONGTEXT NULL DEFAULT NULL,
  `hr10` LONGTEXT NULL DEFAULT NULL,
  `hr11` LONGTEXT NULL DEFAULT NULL,
  `hr12` LONGTEXT NULL DEFAULT NULL,
  `hr13` LONGTEXT NULL DEFAULT NULL,
  `hr14` LONGTEXT NULL DEFAULT NULL,
  `hr15` LONGTEXT NULL DEFAULT NULL,
  `hr16` LONGTEXT NULL DEFAULT NULL,
  `hr17` LONGTEXT NULL DEFAULT NULL,
  `hr18` LONGTEXT NULL DEFAULT NULL,
  `hr19` LONGTEXT NULL DEFAULT NULL,
  `hr20` LONGTEXT NULL DEFAULT NULL,
  `hr21` LONGTEXT NULL DEFAULT NULL,
  `hr22` LONGTEXT NULL DEFAULT NULL,
  `hr23` LONGTEXT NULL DEFAULT NULL,
  `hr24` LONGTEXT NULL DEFAULT NULL,
  `fh_created_on` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));

-- ----------------------------------------------------------------------------
-- Table fitness_hub_db.fh_hubchat
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitness_hub_db`.`fh_hubchat` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `sentbyid` INT(11) NOT NULL,
  `sendtoid` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `new_flg` TINYINT(4) NULL DEFAULT NULL,
  `new_client` TINYINT(4) NULL DEFAULT NULL,
  `chatmessage` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `fh_hubchatid_UNIQUE` (`id` ASC));

-- ----------------------------------------------------------------------------
-- Table fitness_hub_db.fh_hubchat_audit
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitness_hub_db`.`fh_hubchat_audit` (
  `id` INT(11) NOT NULL,
  `sentbyid` INT(11) NOT NULL,
  `sendtoid` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `new_flg` TINYINT(4) NULL DEFAULT NULL,
  `new_client` TINYINT(4) NULL DEFAULT NULL,
  `chatmessage` LONGTEXT NOT NULL,
  `auditedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP);

-- ----------------------------------------------------------------------------
-- Table fitness_hub_db.fh_users
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitness_hub_db`.`fh_users` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `address_line1` VARCHAR(45) NULL DEFAULT NULL,
  `address_line2` VARCHAR(45) NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `postal_code` VARCHAR(7) NULL DEFAULT NULL,
  `trainerid` INT(11) NULL DEFAULT NULL,
  `cellphone` VARCHAR(10) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `fitness_goals` LONGTEXT NULL DEFAULT NULL,
  `istrainer` TINYINT(1) NULL DEFAULT NULL,
  `profile_pic_path` VARCHAR(45) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `userid_UNIQUE` (`ID` ASC));

-- ----------------------------------------------------------------------------
-- Table fitness_hub_db.fh_users_audit
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitness_hub_db`.`fh_users_audit` (
  `id` INT(11) NOT NULL,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `address_line1` VARCHAR(45) NULL DEFAULT NULL,
  `address_line2` VARCHAR(45) NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `postal_code` VARCHAR(7) NULL DEFAULT NULL,
  `trainerid` INT(11) NULL DEFAULT NULL,
  `cellphone` VARCHAR(10) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `fitness_goals` LONGTEXT NULL DEFAULT NULL,
  `istrainer` TINYINT(1) NULL DEFAULT NULL,
  `profile_pic_path` VARCHAR(45) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `auditedat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `auditedat`),
  UNIQUE INDEX `userid_UNIQUE` (`id` ASC));

-- ----------------------------------------------------------------------------
-- Trigger fitness_hub_db.fh_calendar_BEFORE_UPDATE
-- ----------------------------------------------------------------------------
DELIMITER $$
CREATE TRIGGER `fh_calendar_BEFORE_UPDATE` BEFORE UPDATE ON `fh_calendar` FOR EACH ROW BEGIN
	insert into fh_calendar_audit(id, userid, createdat, hr1, hr2, hr3, hr4, hr5, hr6, hr7, hr8, hr9, hr10, hr11, hr12, hr13, hr14, hr15, hr16, hr17, hr18, hr19, hr20, hr21, hr22, hr23, hr24)
    values(old.id, old.userid, old.createdat, old.hr1, old.hr2, old.hr3, old.hr4, old.hr5, old.hr6, old.hr7, old.hr8, old.hr9, old.hr10, old.hr11, old.hr12, old.hr13, old.hr14, old.hr15, old.hr16, old.hr17, old.hr18, old.hr19, old.hr20, old.hr21, old.hr22, old.hr23, old.hr24);
END;

-- ----------------------------------------------------------------------------
-- Trigger fitness_hub_db.fh_hubchat_BEFORE_UPDATE
-- ----------------------------------------------------------------------------
DELIMITER $$
USE `fitness_hub_db`$$
CREATE TRIGGER `fh_hubchat_BEFORE_UPDATE` BEFORE UPDATE ON `fh_hubchat` FOR EACH ROW BEGIN
	insert into fh_hubchat_audit(id, sentbyid, sendtoid, createdat, new_flg, new_client, chatmessage)
    values(old.id, old.sentbyid, old.sendtoid, old.createdat, old.new_flg, old.new_client, old.chatmessage);
END;

-- ----------------------------------------------------------------------------
-- Trigger fitness_hub_db.fh_users_BEFORE_UPDATE
-- ----------------------------------------------------------------------------
CREATE TRIGGER `fh_users_BEFORE_UPDATE` BEFORE UPDATE ON `fh_users` FOR EACH ROW BEGIN
	insert into fh_users_audit(id, first_name, last_name, address_line1, address_line2, city, postal_code, trainerid, cellphone, email, fitness_goals, istrainer, createdat)
    values(old.id, old.first_name, old.last_name, old.address_line1, old.address_line2, old.city, old.postal_code, old.trainerid, old.cellphone, old.email, old.fitness_goals, old.istrainer, old.createdat);
END;
SET FOREIGN_KEY_CHECKS = 1;
