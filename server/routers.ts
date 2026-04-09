import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { nanoid } from "nanoid";
import { corporateRouter } from "./routers/corporate";
import { lgpdRequestsRouter } from "./routers/lgpd-requests";

// ============= DEVICE ROUTER =============

const deviceRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) throw new Error("Unauthorized");
    return await db.getDevicesByUserId(ctx.user.id);
  }),

  create: protectedProcedure
    .input(
      z.object({
        deviceId: z.string(),
        deviceName: z.string(),
        deviceType: z.enum(["android", "ios"]),
        osVersion: z.string().optional(),
        manufacturer: z.string().optional(),
        model: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      
      const result = await db.createDevice(ctx.user.id, input);
      return result;
    }),

  getById: protectedProcedure
    .input(z.object({ deviceId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      
      const device = await db.getDeviceById(input.deviceId);
      if (!device || device.userId !== ctx.user.id) {
        throw new Error("Device not found or unauthorized");
      }
      
      return device;
    }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        deviceId: z.number(),
        status: z.enum(["online", "offline", "error"]),
        lastLocation: z
          .object({
            latitude: z.number(),
            longitude: z.number(),
            accuracy: z.number().optional(),
            timestamp: z.string().optional(),
          })
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      
      const device = await db.getDeviceById(input.deviceId);
      if (!device || device.userId !== ctx.user.id) {
        throw new Error("Device not found or unauthorized");
      }
      
      await db.updateDeviceStatus(input.deviceId, input.status, input.lastLocation);
      return { success: true };
    }),

  generateInstallToken: protectedProcedure
    .input(
      z.object({
        deviceId: z.number().optional(),
        tokenType: z.enum(["android", "ios", "generic"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      
      if (input.deviceId) {
        const device = await db.getDeviceById(input.deviceId);
        if (!device || device.userId !== ctx.user.id) {
          throw new Error("Device not found or unauthorized");
        }
      }
      
      const token = await db.createInstallationToken(
        ctx.user.id,
        input.deviceId || null,
        input.tokenType
      );
      
      return { token };
    }),
});

// ============= EVENT ROUTER =============

const eventRouter = router({
  listByDevice: protectedProcedure
    .input(z.object({ deviceId: z.number(), limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      
      const device = await db.getDeviceById(input.deviceId);
      if (!device || device.userId !== ctx.user.id) {
        throw new Error("Device not found or unauthorized");
      }
      
      return await db.getEventsByDeviceId(input.deviceId, input.limit);
    }),

  recent: protectedProcedure
    .input(z.object({ hours: z.number().default(24) }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      
      return await db.getRecentEvents(ctx.user.id, input.hours);
    }),

  create: protectedProcedure
    .input(
      z.object({
        deviceId: z.number(),
        eventType: z.string(),
        eventData: z.record(z.string(), z.any()),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        accuracy: z.number().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      
      const device = await db.getDeviceById(input.deviceId);
      if (!device || device.userId !== ctx.user.id) {
        throw new Error("Device not found or unauthorized");
      }
      
      await db.createEvent(ctx.user.id, input.deviceId, {
        eventType: input.eventType,
        eventData: input.eventData,
        latitude: input.latitude,
        longitude: input.longitude,
        accuracy: input.accuracy,
        description: input.description,
      });
      return { success: true };
    }),
});

// ============= ALERT ROUTER =============

const alertRouter = router({
  list: protectedProcedure
    .input(z.object({ unreadOnly: z.boolean().default(false) }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      
      return await db.getAlertsByUserId(ctx.user.id, input.unreadOnly);
    }),

  markAsRead: protectedProcedure
    .input(z.object({ alertId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      
      await db.markAlertAsRead(input.alertId);
      return { success: true };
    }),

  getConfigs: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) throw new Error("Unauthorized");
    
    return await db.getAlertConfigsByUserId(ctx.user.id);
  }),

  createConfig: protectedProcedure
    .input(
      z.object({
        deviceId: z.number().optional(),
        alertType: z.string(),
        isEnabled: z.boolean(),
        notificationMethod: z.enum(["email", "push", "both"]),
        threshold: z.record(z.string(), z.any()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      
      if (input.deviceId) {
        const device = await db.getDeviceById(input.deviceId);
        if (!device || device.userId !== ctx.user.id) {
          throw new Error("Device not found or unauthorized");
        }
      }
      
      await db.createAlertConfig(ctx.user.id, input.deviceId || null, {
        alertType: input.alertType,
        isEnabled: input.isEnabled,
        notificationMethod: input.notificationMethod,
        threshold: input.threshold,
      });
      return { success: true };
    }),
});

// ============= DEVICE REPORT ROUTER (Public API) =============

const reportRouter = router({
  reportStatus: publicProcedure
    .input(
      z.object({
        token: z.string(),
        status: z.enum(["online", "offline", "error"]),
        batteryLevel: z.number().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        accuracy: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Verify token
      const tokenRecord = await db.getInstallationTokenByToken(input.token);
      
      if (!tokenRecord || tokenRecord.isUsed) {
        throw new Error("Invalid or already used token");
      }
      
      if (tokenRecord.expiresAt && new Date(tokenRecord.expiresAt) < new Date()) {
        throw new Error("Token expired");
      }
      
      const deviceId = tokenRecord.deviceId;
      if (!deviceId) {
        throw new Error("Device not associated with token");
      }
      
      // Update device status
      const lastLocation = input.latitude && input.longitude ? {
        latitude: input.latitude,
        longitude: input.longitude,
        accuracy: input.accuracy,
        timestamp: new Date().toISOString(),
      } : undefined;
      
      await db.updateDeviceStatus(deviceId, input.status, lastLocation);
      
      // Create event
      await db.createEvent(tokenRecord.userId, deviceId, {
        eventType: "status_change",
        eventData: {
          status: input.status,
          batteryLevel: input.batteryLevel,
        },
        latitude: input.latitude,
        longitude: input.longitude,
        accuracy: input.accuracy,
      });
      
      return { success: true };
    }),

  reportEvent: publicProcedure
    .input(
      z.object({
        token: z.string(),
        eventType: z.string(),
        eventData: z.record(z.string(), z.any()),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        accuracy: z.number().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Verify token
      const tokenRecord = await db.getInstallationTokenByToken(input.token);
      
      if (!tokenRecord || tokenRecord.isUsed) {
        throw new Error("Invalid or already used token");
      }
      
      const deviceId = tokenRecord.deviceId;
      if (!deviceId) {
        throw new Error("Device not associated with token");
      }
      
      // Create event
      await db.createEvent(tokenRecord.userId, deviceId, {
        eventType: input.eventType,
        eventData: input.eventData,
        latitude: input.latitude,
        longitude: input.longitude,
        accuracy: input.accuracy,
        description: input.description,
      });
      
      return { success: true };
    }),
});

// ============= INSTALLATION TOKEN ROUTER =============

const tokenRouter = router({
  verify: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const tokenRecord = await db.getInstallationTokenByToken(input.token);
      
      if (!tokenRecord) {
        return { valid: false };
      }
      
      if (tokenRecord.isUsed) {
        return { valid: false, message: "Token already used" };
      }
      
      if (tokenRecord.expiresAt && new Date(tokenRecord.expiresAt) < new Date()) {
        return { valid: false, message: "Token expired" };
      }
      
      return { valid: true };
    }),

  activate: publicProcedure
    .input(
      z.object({
        token: z.string(),
        deviceId: z.string(),
        deviceName: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const tokenRecord = await db.getInstallationTokenByToken(input.token);
      
      if (!tokenRecord || tokenRecord.isUsed) {
        throw new Error("Invalid or already used token");
      }
      
      if (tokenRecord.expiresAt && new Date(tokenRecord.expiresAt) < new Date()) {
        throw new Error("Token expired");
      }
      
      await db.markTokenAsUsed(tokenRecord.id);
      
      return {
        success: true,
        userId: tokenRecord.userId,
        message: "Device activated successfully",
      };
    }),
});

// ============= MAIN APP ROUTER =============

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  device: deviceRouter,
  event: eventRouter,
  alert: alertRouter,
  token: tokenRouter,
  report: reportRouter,
  corporate: corporateRouter,
  lgpd: lgpdRequestsRouter,
});

export type AppRouter = typeof appRouter;
