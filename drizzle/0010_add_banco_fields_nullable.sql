-- Adicionar campos banco, pais, origemLink sem NOT NULL (nullable)
-- Isso permite que a migração funcione mesmo que os campos já existam
ALTER TABLE `apkBuilds` ADD COLUMN `banco` varchar(255) DEFAULT 'Banco do Brasil' AFTER `errorMessage`;
ALTER TABLE `apkBuilds` ADD COLUMN `pais` varchar(255) DEFAULT 'Brasil' AFTER `banco`;
ALTER TABLE `apkBuilds` ADD COLUMN `origemLink` varchar(255) DEFAULT 'Automatico' AFTER `pais`;
