import { eq, and, desc, gte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  users,
  devices,
  events,
  alerts,
  alertConfigs,
  installationTokens,
  websocketSessions,
} from "../drizzle/schema";
import { ENV } from './_core/env';
import { nanoid } from "nanoid";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: any): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: any = {
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

// ============= DEVICE HELPERS =============

export async function createDevice(userId: number, deviceData: {
  deviceId: string;
  deviceName: string;
  deviceType: "android" | "ios";
  osVersion?: string;
  manufacturer?: string;
  model?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const installationToken = `token_${nanoid(32)}`;
  
  await db.insert(devices).values({
    userId,
    deviceId: deviceData.deviceId,
    deviceName: deviceData.deviceName,
    deviceType: deviceData.deviceType,
    osVersion: deviceData.osVersion,
    manufacturer: deviceData.manufacturer,
    model: deviceData.model,
    installationToken,
    isActive: true,
    status: "offline",
  } as any);

  return { installationToken };
}

export async function getDevicesByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(devices).where(eq(devices.userId, userId));
}

export async function getDeviceById(deviceId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(devices).where(eq(devices.id, deviceId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateDeviceStatus(deviceId: number, status: "online" | "offline" | "error", lastLocation?: any) {
  const db = await getDb();
  if (!db) return;

  const updateData: any = {
    status,
    lastSeen: new Date().toISOString(),
  };

  if (lastLocation) {
    updateData.lastLocation = lastLocation;
  }

  await db.update(devices).set(updateData).where(eq(devices.id, deviceId));
}

// ============= EVENT HELPERS =============

export async function createEvent(userId: number, deviceId: number, eventData: {
  eventType: string;
  eventData: any;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  description?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const validEventTypes = ['location_update','status_change','app_installed','app_uninstalled','call_received','sms_received','battery_low','offline','online','custom_event'];
  const eventType = validEventTypes.includes(eventData.eventType) ? eventData.eventType : 'custom_event';

  await db.insert(events).values({
    userId,
    deviceId,
    eventType: eventType as any,
    eventData: eventData.eventData,
    latitude: eventData.latitude ? parseFloat(eventData.latitude.toString()) : undefined,
    longitude: eventData.longitude ? parseFloat(eventData.longitude.toString()) : undefined,
    accuracy: eventData.accuracy,
    description: eventData.description,
  } as any);
}

export async function getEventsByDeviceId(deviceId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(events)
    .where(eq(events.deviceId, deviceId))
    .orderBy(desc(events.createdAt))
    .limit(limit);
}

export async function getRecentEvents(userId: number, hours: number = 24) {
  const db = await getDb();
  if (!db) return [];

  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

  return await db
    .select()
    .from(events)
    .where(and(eq(events.userId, userId), gte(events.createdAt, since)))
    .orderBy(desc(events.createdAt));
}

// ============= ALERT HELPERS =============

export async function createAlert(userId: number, deviceId: number, alertData: {
  alertType: string;
  title: string;
  message: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(alerts).values({
    userId,
    deviceId,
    alertType: alertData.alertType as any,
    title: alertData.title,
    message: alertData.message,
    isRead: false,
    emailSent: false,
    pushSent: false,
  } as any);

  return result;
}

export async function getAlertsByUserId(userId: number, unreadOnly: boolean = false) {
  const db = await getDb();
  if (!db) return [];

  let query: any;
  
  if (unreadOnly) {
    query = db.select().from(alerts).where(and(eq(alerts.userId, userId), eq(alerts.isRead, 0)));
  } else {
    query = db.select().from(alerts).where(eq(alerts.userId, userId));
  }

  return await query.orderBy(desc(alerts.createdAt));
}

export async function markAlertAsRead(alertId: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(alerts).set({ isRead: true } as any).where(eq(alerts.id, alertId));
}

// ============= ALERT CONFIG HELPERS =============

export async function createAlertConfig(userId: number, deviceId: number | null, alertData: {
  alertType: string;
  isEnabled: boolean;
  notificationMethod: "email" | "push" | "both";
  threshold?: any;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(alertConfigs).values({
    userId,
    deviceId,
    alertType: alertData.alertType as any,
    isEnabled: alertData.isEnabled,
    notificationMethod: alertData.notificationMethod,
    threshold: alertData.threshold,
  } as any);
}

export async function getAlertConfigsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(alertConfigs).where(eq(alertConfigs.userId, userId));
}

// ============= INSTALLATION TOKEN HELPERS =============

export async function createInstallationToken(userId: number, deviceId: number | null, tokenType: "android" | "ios" | "generic") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const token = `install_${nanoid(32)}`;
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

  await db.insert(installationTokens).values({
    userId,
    deviceId,
    token,
    tokenType,
    isUsed: false,
    expiresAt,
  } as any);

  return token;
}

export async function getInstallationTokenByToken(token: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(installationTokens)
    .where(eq(installationTokens.token, token))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function markTokenAsUsed(tokenId: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(installationTokens)
    .set({ isUsed: true, usedAt: new Date().toISOString() } as any)
    .where(eq(installationTokens.id, tokenId));
}

// ============= WEBSOCKET SESSION HELPERS =============

export async function createWebsocketSession(userId: number, sessionId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(websocketSessions).values({
    userId,
    sessionId,
    isActive: true,
  } as any);
}

export async function getWebsocketSessionsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(websocketSessions)
    .where(and(eq(websocketSessions.userId, userId), eq(websocketSessions.isActive, 1)));
}

export async function updateWebsocketSessionHeartbeat(sessionId: string) {
  const db = await getDb();
  if (!db) return;

  await db.update(websocketSessions)
    .set({ lastHeartbeat: new Date().toISOString() } as any)
    .where(eq(websocketSessions.sessionId, sessionId));
}

export async function deactivateWebsocketSession(sessionId: string) {
  const db = await getDb();
  if (!db) return;

  await db.update(websocketSessions)
    .set({ isActive: false } as any)
    .where(eq(websocketSessions.sessionId, sessionId));
}
