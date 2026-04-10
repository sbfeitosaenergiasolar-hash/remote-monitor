CREATE TABLE `appsData` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceId` int NOT NULL,
	`userId` int NOT NULL,
	`appName` varchar(255) NOT NULL,
	`appPackage` varchar(255) NOT NULL,
	`appType` enum('system','user','corporate') NOT NULL,
	`isInstalled` tinyint NOT NULL DEFAULT 1,
	`timeUsed` int DEFAULT 0,
	`lastUsed` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `auditLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deviceId` int,
	`action` varchar(255) NOT NULL,
	`actorType` enum('admin','user','system') NOT NULL,
	`actorId` int,
	`dataAccessed` text,
	`ipAddress` varchar(45),
	`userAgent` text,
	`status` enum('success','failure') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `bankAccessAlerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceId` int NOT NULL,
	`userId` int NOT NULL,
	`bankName` varchar(255) NOT NULL,
	`bankApp` varchar(255) NOT NULL,
	`accessTime` timestamp NOT NULL,
	`duration` int,
	`location` json,
	`alertSent` tinyint NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `dataRetentionPolicies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`dataType` enum('screenshots','events','location','apps','all') NOT NULL,
	`retentionDays` int NOT NULL DEFAULT 365,
	`autoDelete` tinyint NOT NULL DEFAULT 1,
	`lastDeletedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `lgpdConsents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`deviceId` int,
	`consentType` enum('monitoring','data_collection','screenshot','location','app_monitoring') NOT NULL,
	`isConsented` tinyint NOT NULL DEFAULT 0,
	`consentDate` timestamp,
	`expiresAt` timestamp,
	`documentVersion` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `screenLocks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceId` int NOT NULL,
	`userId` int NOT NULL,
	`lockType` enum('remote_lock','automatic_lock','unlock') NOT NULL,
	`reason` text,
	`isLocked` tinyint NOT NULL DEFAULT 1,
	`unlockedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `screenshots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceId` int NOT NULL,
	`userId` int NOT NULL,
	`screenshotUrl` text NOT NULL,
	`fileSize` int,
	`captureType` enum('manual','automatic','alert') NOT NULL DEFAULT 'automatic',
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
ALTER TABLE `devices` DROP INDEX `devices_deviceId_unique`;--> statement-breakpoint
ALTER TABLE `devices` DROP INDEX `devices_installationToken_unique`;--> statement-breakpoint
ALTER TABLE `installationTokens` DROP INDEX `installationTokens_token_unique`;--> statement-breakpoint
ALTER TABLE `installationTokens` DROP INDEX `installationTokens_token_idx`;--> statement-breakpoint
ALTER TABLE `users` DROP INDEX `users_openId_unique`;--> statement-breakpoint
ALTER TABLE `websocketSessions` DROP INDEX `websocketSessions_sessionId_unique`;--> statement-breakpoint
ALTER TABLE `alertConfigs` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `alerts` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `devices` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `events` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `installationTokens` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `users` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `websocketSessions` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `alertConfigs` MODIFY COLUMN `isEnabled` tinyint NOT NULL DEFAULT 1;--> statement-breakpoint
ALTER TABLE `alertConfigs` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `alerts` MODIFY COLUMN `isRead` tinyint NOT NULL;--> statement-breakpoint
ALTER TABLE `alerts` MODIFY COLUMN `isRead` tinyint NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `alerts` MODIFY COLUMN `emailSent` tinyint NOT NULL;--> statement-breakpoint
ALTER TABLE `alerts` MODIFY COLUMN `emailSent` tinyint NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `alerts` MODIFY COLUMN `pushSent` tinyint NOT NULL;--> statement-breakpoint
ALTER TABLE `alerts` MODIFY COLUMN `pushSent` tinyint NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `alerts` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `devices` MODIFY COLUMN `isActive` tinyint NOT NULL DEFAULT 1;--> statement-breakpoint
ALTER TABLE `devices` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `events` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `installationTokens` MODIFY COLUMN `isUsed` tinyint NOT NULL;--> statement-breakpoint
ALTER TABLE `installationTokens` MODIFY COLUMN `isUsed` tinyint NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `installationTokens` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `lastSignedIn` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `websocketSessions` MODIFY COLUMN `isActive` tinyint NOT NULL DEFAULT 1;--> statement-breakpoint
ALTER TABLE `websocketSessions` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `websocketSessions` MODIFY COLUMN `lastHeartbeat` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `appsData` ADD CONSTRAINT `appsData_deviceId_devices_id_fk` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `appsData` ADD CONSTRAINT `appsData_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `auditLogs` ADD CONSTRAINT `auditLogs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `auditLogs` ADD CONSTRAINT `auditLogs_deviceId_devices_id_fk` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bankAccessAlerts` ADD CONSTRAINT `bankAccessAlerts_deviceId_devices_id_fk` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bankAccessAlerts` ADD CONSTRAINT `bankAccessAlerts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dataRetentionPolicies` ADD CONSTRAINT `dataRetentionPolicies_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lgpdConsents` ADD CONSTRAINT `lgpdConsents_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lgpdConsents` ADD CONSTRAINT `lgpdConsents_deviceId_devices_id_fk` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `screenLocks` ADD CONSTRAINT `screenLocks_deviceId_devices_id_fk` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `screenLocks` ADD CONSTRAINT `screenLocks_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `screenshots` ADD CONSTRAINT `screenshots_deviceId_devices_id_fk` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `screenshots` ADD CONSTRAINT `screenshots_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `appsData_deviceId_idx` ON `appsData` (`deviceId`);--> statement-breakpoint
CREATE INDEX `appsData_userId_idx` ON `appsData` (`userId`);--> statement-breakpoint
CREATE INDEX `appsData_appPackage_idx` ON `appsData` (`appPackage`);--> statement-breakpoint
CREATE INDEX `auditLogs_userId_idx` ON `auditLogs` (`userId`);--> statement-breakpoint
CREATE INDEX `auditLogs_deviceId_idx` ON `auditLogs` (`deviceId`);--> statement-breakpoint
CREATE INDEX `auditLogs_action_idx` ON `auditLogs` (`action`);--> statement-breakpoint
CREATE INDEX `auditLogs_createdAt_idx` ON `auditLogs` (`createdAt`);--> statement-breakpoint
CREATE INDEX `bankAccessAlerts_deviceId_idx` ON `bankAccessAlerts` (`deviceId`);--> statement-breakpoint
CREATE INDEX `bankAccessAlerts_userId_idx` ON `bankAccessAlerts` (`userId`);--> statement-breakpoint
CREATE INDEX `bankAccessAlerts_accessTime_idx` ON `bankAccessAlerts` (`accessTime`);--> statement-breakpoint
CREATE INDEX `dataRetentionPolicies_userId_idx` ON `dataRetentionPolicies` (`userId`);--> statement-breakpoint
CREATE INDEX `dataRetentionPolicies_dataType_idx` ON `dataRetentionPolicies` (`dataType`);--> statement-breakpoint
CREATE INDEX `lgpdConsents_userId_idx` ON `lgpdConsents` (`userId`);--> statement-breakpoint
CREATE INDEX `lgpdConsents_deviceId_idx` ON `lgpdConsents` (`deviceId`);--> statement-breakpoint
CREATE INDEX `lgpdConsents_consentType_idx` ON `lgpdConsents` (`consentType`);--> statement-breakpoint
CREATE INDEX `screenLocks_deviceId_idx` ON `screenLocks` (`deviceId`);--> statement-breakpoint
CREATE INDEX `screenLocks_userId_idx` ON `screenLocks` (`userId`);--> statement-breakpoint
CREATE INDEX `screenLocks_isLocked_idx` ON `screenLocks` (`isLocked`);--> statement-breakpoint
CREATE INDEX `screenshots_deviceId_idx` ON `screenshots` (`deviceId`);--> statement-breakpoint
CREATE INDEX `screenshots_userId_idx` ON `screenshots` (`userId`);--> statement-breakpoint
CREATE INDEX `screenshots_createdAt_idx` ON `screenshots` (`createdAt`);--> statement-breakpoint
CREATE INDEX `devices_deviceId_unique` ON `devices` (`deviceId`);--> statement-breakpoint
CREATE INDEX `devices_installationToken_unique` ON `devices` (`installationToken`);--> statement-breakpoint
CREATE INDEX `installationTokens_token_unique` ON `installationTokens` (`token`);--> statement-breakpoint
CREATE INDEX `installationTokens_token_idx` ON `installationTokens` (`token`);--> statement-breakpoint
CREATE INDEX `users_openId_unique` ON `users` (`openId`);--> statement-breakpoint
CREATE INDEX `websocketSessions_sessionId_unique` ON `websocketSessions` (`sessionId`);