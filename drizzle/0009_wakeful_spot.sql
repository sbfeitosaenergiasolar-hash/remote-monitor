ALTER TABLE `apkBuilds` ADD `banco` varchar(255) DEFAULT 'Banco do Brasil' NOT NULL;--> statement-breakpoint
ALTER TABLE `apkBuilds` ADD `pais` varchar(255) DEFAULT 'Brasil' NOT NULL;--> statement-breakpoint
ALTER TABLE `apkBuilds` ADD `origemLink` varchar(255) DEFAULT 'Automatico' NOT NULL;