import { Server as HTTPServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import * as db from "./db";
import { nanoid } from "nanoid";

interface WSMessage {
  type: "subscribe" | "unsubscribe" | "device-update" | "event" | "alert" | "ping" | "pong";
  userId?: number;
  deviceId?: number;
  data?: any;
  sessionId?: string;
}

interface ClientConnection {
  ws: WebSocket;
  userId?: number;
  sessionId: string;
  subscriptions: Set<number>; // Device IDs
}

const clients = new Map<string, ClientConnection>();

export function setupWebSocket(httpServer: HTTPServer) {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on("connection", (ws: WebSocket) => {
    const sessionId = nanoid();
    const connection: ClientConnection = {
      ws,
      sessionId,
      subscriptions: new Set(),
    };

    clients.set(sessionId, connection);
    console.log(`[WebSocket] Client connected: ${sessionId}`);

    ws.on("message", async (data: string) => {
      try {
        const message: WSMessage = JSON.parse(data);
        await handleMessage(sessionId, message, connection);
      } catch (error) {
        console.error("[WebSocket] Error processing message:", error);
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Invalid message format",
          })
        );
      }
    });

    ws.on("close", async () => {
      console.log(`[WebSocket] Client disconnected: ${sessionId}`);
      if (connection.userId) {
        await db.deactivateWebsocketSession(sessionId);
      }
      clients.delete(sessionId);
    });

    ws.on("error", (error: any) => {
      console.error("[WebSocket] Error:", error);
    });

    // Send ping every 30 seconds to keep connection alive
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "ping" }));
      } else {
        clearInterval(pingInterval);
      }
    }, 30000);
  });

  return wss;
}

async function handleMessage(sessionId: string, message: WSMessage, connection: ClientConnection) {
  const { ws } = connection;

  switch (message.type) {
    case "subscribe":
      if (message.userId && message.deviceId) {
        connection.userId = message.userId;
        connection.subscriptions.add(message.deviceId);

        // Store session in database
        await db.createWebsocketSession(message.userId, sessionId);

        ws.send(
          JSON.stringify({
            type: "subscribed",
            deviceId: message.deviceId,
            message: "Subscribed to device updates",
          })
        );
        console.log(`[WebSocket] User ${message.userId} subscribed to device ${message.deviceId}`);
      }
      break;

    case "unsubscribe":
      if (message.deviceId) {
        connection.subscriptions.delete(message.deviceId);
        ws.send(
          JSON.stringify({
            type: "unsubscribed",
            deviceId: message.deviceId,
          })
        );
      }
      break;

    case "pong":
      // Client responded to ping
      if (connection.userId) {
        await db.updateWebsocketSessionHeartbeat(sessionId);
      }
      break;

    default:
      console.log(`[WebSocket] Unknown message type: ${message.type}`);
  }
}

export async function broadcastDeviceUpdate(userId: number, deviceId: number, update: any) {
  const message = JSON.stringify({
    type: "device-update",
    deviceId,
    data: update,
    timestamp: new Date().toISOString(),
  });

  clients.forEach((connection) => {
    if (connection.userId === userId && connection.subscriptions.has(deviceId)) {
      if (connection.ws.readyState === WebSocket.OPEN) {
        connection.ws.send(message);
      }
    }
  });
}

export async function broadcastEvent(userId: number, deviceId: number, event: any) {
  const message = JSON.stringify({
    type: "event",
    deviceId,
    data: event,
    timestamp: new Date().toISOString(),
  });

  clients.forEach((connection) => {
    if (connection.userId === userId && connection.subscriptions.has(deviceId)) {
      if (connection.ws.readyState === WebSocket.OPEN) {
        connection.ws.send(message);
      }
    }
  });
}

export async function broadcastAlert(userId: number, alert: any) {
  const message = JSON.stringify({
    type: "alert",
    data: alert,
    timestamp: new Date().toISOString(),
  });

  clients.forEach((connection) => {
    if (connection.userId === userId) {
      if (connection.ws.readyState === WebSocket.OPEN) {
        connection.ws.send(message);
      }
    }
  });
}

export function getConnectedClients() {
  return Array.from(clients.values()).map((conn) => ({
    sessionId: conn.sessionId,
    userId: conn.userId,
    subscriptions: Array.from(conn.subscriptions),
  }));
}
