CREATE TABLE `passwords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceId` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`appName` varchar(255) NOT NULL,
	`password` text NOT NULL,
	`isDeleted` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `passwords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `apkBuilds` DROP COLUMN `banco`;--> statement-breakpoint
ALTER TABLE `apkBuilds` DROP COLUMN `pais`;--> statement-breakpoint
ALTER TABLE `apkBuilds` DROP COLUMN `origemLink`;