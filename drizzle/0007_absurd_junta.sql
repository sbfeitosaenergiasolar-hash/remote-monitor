CREATE TABLE `devices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceId` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`appName` varchar(255) NOT NULL,
	`appUrl` text NOT NULL,
	`deviceModel` varchar(255),
	`androidVersion` varchar(64),
	`appVersion` varchar(64),
	`status` enum('online','offline') NOT NULL DEFAULT 'online',
	`lastSeen` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `devices_id` PRIMARY KEY(`id`),
	CONSTRAINT `devices_deviceId_unique` UNIQUE(`deviceId`)
);
