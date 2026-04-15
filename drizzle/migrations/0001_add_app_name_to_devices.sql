-- Migration: Add appName column to devices table
ALTER TABLE `devices` ADD COLUMN `appName` VARCHAR(255) NOT NULL DEFAULT 'Unknown' AFTER `userId`;
