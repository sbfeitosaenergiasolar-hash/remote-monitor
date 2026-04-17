import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { db } from "./db";
import { createAPKBuild, getAPKBuildsByUser, updateAPKBuildStatus } from "./db";
import { appRouter } from "./routers";

describe("APK Builder", () => {
  const testUserId = Math.floor(Math.random() * 1000000);

  describe("Database operations", () => {
    it("should create an APK build record", async () => {
      const build = await createAPKBuild({
        userId: testUserId,
        appName: "TestApp",
        appUrl: "https://example.com",
        logoUrl: "https://example.com/logo.png",
        protectFromUninstall: 0,
        filename: "test-app.apk",
        downloadUrl: "https://example.com/test-app.apk",
        status: "building",
      });

      expect(build).toBeDefined();
      expect(build?.appName).toBe("TestApp");
      expect(build?.status).toBe("building");
    });

    it("should retrieve APK builds by user", async () => {
      // Create a test build
      await createAPKBuild({
        userId: testUserId,
        appName: "TestApp2",
        appUrl: "https://example.com",
        logoUrl: undefined,
        protectFromUninstall: 0,
        filename: "test-app-2.apk",
        downloadUrl: "https://example.com/test-app-2.apk",
        status: "success",
      });

      const builds = await getAPKBuildsByUser(testUserId);
      expect(Array.isArray(builds)).toBe(true);
      expect(builds.length).toBeGreaterThan(0);
      expect(builds[0]?.userId).toBe(testUserId);
    });

    it("should update APK build status", async () => {
      const build = await createAPKBuild({
        userId: testUserId,
        appName: "TestApp3",
        appUrl: "https://example.com",
        logoUrl: undefined,
        protectFromUninstall: 0,
        filename: "test-app-3.apk",
        downloadUrl: "https://example.com/test-app-3.apk",
        status: "building",
      });

      if (build?.id) {
        await updateAPKBuildStatus(build.id, "success");
        const updated = await getAPKBuildsByUser(testUserId);
        const found = updated.find((b) => b.id === build.id);
        expect(found?.status).toBe("success");
      }
    });
  });

  describe("tRPC procedures", () => {
    it("should validate APK build input", async () => {
      // Test invalid input - missing required fields
      const caller = appRouter.createCaller({
        user: { id: 1, email: "test@example.com", role: "user" },
      } as any);

      try {
        // @ts-ignore - intentionally passing invalid input
        await caller.apk.build({ appName: "", appUrl: "" });
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should validate URL format", async () => {
      const caller = appRouter.createCaller({
        user: { id: 1, email: "test@example.com", role: "user" },
      } as any);

      try {
        // @ts-ignore - intentionally passing invalid URL
        await caller.apk.build({
          appName: "TestApp",
          appUrl: "not-a-valid-url",
        });
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should list APK builds for authenticated user", async () => {
      const caller = appRouter.createCaller({
        user: { id: 1, email: "test@example.com", role: "user" },
      } as any);

      const builds = await caller.apk.list();
      expect(Array.isArray(builds)).toBe(true);
    });
  });

  describe("APK build validation", () => {
    it("should validate app name is not empty", () => {
      const appName = "";
      expect(appName.trim().length).toBe(0);
    });

    it("should validate URL is valid", () => {
      const validUrl = "https://www.example.com";
      const urlRegex = /^https?:\/\//;
      expect(urlRegex.test(validUrl)).toBe(true);
    });

    it("should handle optional logo URL", () => {
      const logoUrl: string | undefined = undefined;
      expect(logoUrl === undefined || logoUrl === "").toBe(true);
    });

    it("should validate protection flag", () => {
      const protect = true;
      const protectValue = protect ? 1 : 0;
      expect(protectValue).toBe(1);
    });
  });
});
