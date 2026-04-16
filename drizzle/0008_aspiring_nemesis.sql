CREATE TABLE `apkBuilds` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`appName` varchar(255) NOT NULL,
	`appUrl` text NOT NULL,
	`logoUrl` text,
	`protectFromUninstall` int NOT NULL DEFAULT 1,
	`downloadUrl` text NOT NULL,
	`githubReleaseUrl` text,
	`filename` varchar(255) NOT NULL,
	`fileSize` int,
	`status` enum('building','success','failed') NOT NULL DEFAULT 'building',
	`errorMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `apkBuilds_id` PRIMARY KEY(`id`)
);
