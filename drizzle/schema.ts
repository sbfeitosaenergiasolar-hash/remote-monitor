import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, int, mysqlEnum, json, timestamp, varchar, text, decimal, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const alertConfigs = mysqlTable("alertConfigs", {
	id: int().autoincrement().notNull(),
	userId: int().notNull().references(() => users.id, { onDelete: "cascade" } ),
	deviceId: int().references(() => devices.id, { onDelete: "cascade" } ),
	alertType: mysqlEnum(['offline','location_change','critical_event','battery_low','custom']).notNull(),
	isEnabled: tinyint().default(1).notNull(),
	notificationMethod: mysqlEnum(['email','push','both']).default('email').notNull(),
	threshold: json(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("alertConfigs_userId_idx").on(table.userId),
	index("alertConfigs_deviceId_idx").on(table.deviceId),
]);

export const alerts = mysqlTable("alerts", {
	id: int().autoincrement().notNull(),
	userId: int().notNull().references(() => users.id, { onDelete: "cascade" } ),
	deviceId: int().notNull().references(() => devices.id, { onDelete: "cascade" } ),
	alertType: mysqlEnum(['offline','location_change','critical_event','battery_low','custom']).notNull(),
	title: varchar({ length: 255 }).notNull(),
	message: text().notNull(),
	isRead: tinyint().default(0).notNull(),
	emailSent: tinyint().default(0).notNull(),
	pushSent: tinyint().default(0).notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("alerts_userId_idx").on(table.userId),
	index("alerts_deviceId_idx").on(table.deviceId),
	index("alerts_isRead_idx").on(table.isRead),
]);

export const devices = mysqlTable("devices", {
	id: int().autoincrement().notNull(),
	userId: int().notNull().references(() => users.id, { onDelete: "cascade" } ),
	deviceId: varchar({ length: 128 }).notNull(),
	deviceName: varchar({ length: 255 }).notNull(),
	deviceType: mysqlEnum(['android','ios']).notNull(),
	osVersion: varchar({ length: 64 }),
	manufacturer: varchar({ length: 128 }),
	model: varchar({ length: 128 }),
	installationToken: varchar({ length: 255 }).notNull(),
	isActive: tinyint().default(1).notNull(),
	lastSeen: timestamp({ mode: 'string' }),
	lastLocation: json(),
	status: mysqlEnum(['online','offline','error']).default('offline').notNull(),
	metadata: json(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("devices_deviceId_unique").on(table.deviceId),
	index("devices_installationToken_unique").on(table.installationToken),
	index("devices_userId_idx").on(table.userId),
	index("devices_deviceId_idx").on(table.deviceId),
]);

export const events = mysqlTable("events", {
	id: int().autoincrement().notNull(),
	deviceId: int().notNull().references(() => devices.id, { onDelete: "cascade" } ),
	userId: int().notNull().references(() => users.id, { onDelete: "cascade" } ),
	eventType: mysqlEnum(['location_update','status_change','app_installed','app_uninstalled','call_received','sms_received','battery_low','offline','online','custom_event']).notNull(),
	eventData: json().notNull(),
	latitude: decimal({ precision: 10, scale: 8 }),
	longitude: decimal({ precision: 11, scale: 8 }),
	accuracy: int(),
	description: text(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("events_deviceId_idx").on(table.deviceId),
	index("events_userId_idx").on(table.userId),
	index("events_createdAt_idx").on(table.createdAt),
]);

export const installationTokens = mysqlTable("installationTokens", {
	id: int().autoincrement().notNull(),
	userId: int().notNull().references(() => users.id, { onDelete: "cascade" } ),
	deviceId: int().references(() => devices.id, { onDelete: "cascade" } ),
	token: varchar({ length: 255 }).notNull(),
	tokenType: mysqlEnum(['android','ios','generic']).notNull(),
	isUsed: tinyint().default(0).notNull(),
	usedAt: timestamp({ mode: 'string' }),
	expiresAt: timestamp({ mode: 'string' }),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("installationTokens_token_unique").on(table.token),
	index("installationTokens_token_idx").on(table.token),
	index("installationTokens_userId_idx").on(table.userId),
	index("installationTokens_deviceId_idx").on(table.deviceId),
]);

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	openId: varchar({ length: 64 }).notNull(),
	name: text(),
	email: varchar({ length: 320 }),
	loginMethod: varchar({ length: 64 }),
	role: mysqlEnum(['user','admin']).default('user').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	lastSignedIn: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("users_openId_unique").on(table.openId),
]);

export const websocketSessions = mysqlTable("websocketSessions", {
	id: int().autoincrement().notNull(),
	userId: int().notNull().references(() => users.id, { onDelete: "cascade" } ),
	sessionId: varchar({ length: 255 }).notNull(),
	isActive: tinyint().default(1).notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	lastHeartbeat: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("websocketSessions_sessionId_unique").on(table.sessionId),
	index("websocketSessions_userId_idx").on(table.userId),
]);
