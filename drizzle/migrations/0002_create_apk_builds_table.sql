-- Create apkBuilds table for APK Builder feature
CREATE TABLE IF NOT EXISTS `apkBuilds` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `userId` int NOT NULL,
  `appName` varchar(255) NOT NULL,
  `appUrl` text NOT NULL,
  `logoUrl` text,
  `protectFromUninstall` int NOT NULL DEFAULT 1,
  `downloadUrl` text NOT NULL,
  `githubReleaseUrl` text,
  `filename` varchar(255) NOT NULL,
  `fileSize` int,
  `status` ENUM('building', 'success', 'failed') NOT NULL DEFAULT 'building',
  `errorMessage` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index on userId for faster queries
CREATE INDEX IF NOT EXISTS `apkBuilds_userId_idx` ON `apkBuilds`(`userId`);
