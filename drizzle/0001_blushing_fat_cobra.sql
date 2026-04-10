CREATE TABLE `alertConfigs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deviceId` int,
	`alertType` enum('offline','location_change','critical_event','battery_low','custom') NOT NULL,
	`isEnabled` boolean NOT NULL DEFAULT true,
	`notificationMethod` enum('email','push','both') NOT NULL DEFAULT 'email',
	`threshold` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `alertConfigs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `alerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deviceId` int NOT NULL,
	`alertType` enum('offline','location_change','critical_event','battery_low','custom') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`emailSent` boolean NOT NULL DEFAULT false,
	`pushSent` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `devices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deviceId` varchar(128) NOT NULL,
	`deviceName` varchar(255) NOT NULL,
	`deviceType` enum('android','ios') NOT NULL,
	`osVersion` varchar(64),
	`manufacturer` varchar(128),
	`model` varchar(128),
	`installationToken` varchar(255) NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`lastSeen` timestamp,
	`lastLocation` json,
	`status` enum('online','offline','error') NOT NULL DEFAULT 'offline',
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `devices_id` PRIMARY KEY(`id`),
	CONSTRAINT `devices_deviceId_unique` UNIQUE(`deviceId`),
	CONSTRAINT `devices_installationToken_unique` UNIQUE(`installationToken`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceId` int NOT NULL,
	`userId` int NOT NULL,
	`eventType` enum('location_update','status_change','app_installed','app_uninstalled','call_received','sms_received','battery_low','offline','online','custom_event') NOT NULL,
	`eventData` json NOT NULL,
	`latitude` decimal(10,8),
	`longitude` decimal(11,8),
	`accuracy` int,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `installationTokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deviceId` int,
	`token` varchar(255) NOT NULL,
	`tokenType` enum('android','ios','generic') NOT NULL,
	`isUsed` boolean NOT NULL DEFAULT false,
	`usedAt` timestamp,
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `installationTokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `installationTokens_token_unique` UNIQUE(`token`),
	CONSTRAINT `installationTokens_token_idx` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `websocketSessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sessionId` varchar(255) NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`lastHeartbeat` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `websocketSessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `websocketSessions_sessionId_unique` UNIQUE(`sessionId`)
);
--> statement-breakpoint
ALTER TABLE `alertConfigs` ADD CONSTRAINT `alertConfigs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alertConfigs` ADD CONSTRAINT `alertConfigs_deviceId_devices_id_fk` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alerts` ADD CONSTRAINT `alerts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alerts` ADD CONSTRAINT `alerts_deviceId_devices_id_fk` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `devices` ADD CONSTRAINT `devices_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_deviceId_devices_id_fk` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `installationTokens` ADD CONSTRAINT `installationTokens_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `installationTokens` ADD CONSTRAINT `installationTokens_deviceId_devices_id_fk` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `websocketSessions` ADD CONSTRAINT `websocketSessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `alertConfigs_userId_idx` ON `alertConfigs` (`userId`);--> statement-breakpoint
CREATE INDEX `alertConfigs_deviceId_idx` ON `alertConfigs` (`deviceId`);--> statement-breakpoint
CREATE INDEX `alerts_userId_idx` ON `alerts` (`userId`);--> statement-breakpoint
CREATE INDEX `alerts_deviceId_idx` ON `alerts` (`deviceId`);--> statement-breakpoint
CREATE INDEX `alerts_isRead_idx` ON `alerts` (`isRead`);--> statement-breakpoint
CREATE INDEX `devices_userId_idx` ON `devices` (`userId`);--> statement-breakpoint
CREATE INDEX `devices_deviceId_idx` ON `devices` (`deviceId`);--> statement-breakpoint
CREATE INDEX `events_deviceId_idx` ON `events` (`deviceId`);--> statement-breakpoint
CREATE INDEX `events_userId_idx` ON `events` (`userId`);--> statement-breakpoint
CREATE INDEX `events_createdAt_idx` ON `events` (`createdAt`);--> statement-breakpoint
CREATE INDEX `installationTokens_userId_idx` ON `installationTokens` (`userId`);--> statement-breakpoint
CREATE INDEX `installationTokens_deviceId_idx` ON `installationTokens` (`deviceId`);--> statement-breakpoint
CREATE INDEX `websocketSessions_userId_idx` ON `websocketSessions` (`userId`);