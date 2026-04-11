import { describe, it, expect, beforeEach } from "vitest";
import { appRouter } from "./routers";

describe("settings router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    // Mock context with authenticated user
    const mockContext = {
      user: {
        id: "test-user-123",
        email: "test@example.com",
        name: "Test User",
        role: "user" as const,
      },
      req: {} as any,
      res: {} as any,
    };

    caller = appRouter.createCaller(mockContext);
  });

  it("should save settings with all required fields", async () => {
    const settingsInput = {
      processName: "_Remote.exe",
      modulePath: "C:\\Users\\root\\Desktop\\0x29aRT.dll",
      hideFromDebugger: true,
      stealthInject: true,
      hideModule: true,
      erasePE: false,
      autoInject: true,
      closeOnInject: false,
      createFakeDebugDirectory: true,
      createNewEntryPoint: false,
      insertExtraSections: true,
      modifyAssemblyCode: false,
      modifyImportTable: true,
      moveRelocationTable: false,
      removeDebugData: true,
      removeUselessData: false,
      renameSections: true,
      scrambleHeaderFields: false,
      shiftSectionData: true,
      shiftSectionMemory: false,
      stripSectionCharacteristics: true,
      delay: 1000,
      delayBetween: 500,
      method: 2,
    };

    const result = await caller.settings.save(settingsInput);

    expect(result).toEqual({
      success: true,
      message: "Configurações salvas com sucesso!",
    });
  });

  it("should retrieve default settings", async () => {
    const result = await caller.settings.get();

    expect(result).toEqual({
      processName: "_Remote.exe",
      modulePath: "C:\\Users\\root\\Desktop\\0x29aRT.dll",
      hideFromDebugger: false,
      stealthInject: false,
      hideModule: false,
      erasePE: false,
      autoInject: false,
      closeOnInject: false,
      createFakeDebugDirectory: false,
      createNewEntryPoint: false,
      insertExtraSections: false,
      modifyAssemblyCode: false,
      modifyImportTable: false,
      moveRelocationTable: false,
      removeDebugData: false,
      removeUselessData: false,
      renameSections: false,
      scrambleHeaderFields: false,
      shiftSectionData: false,
      shiftSectionMemory: false,
      stripSectionCharacteristics: false,
      delay: 0,
      delayBetween: 0,
      method: 0,
    });
  });

  it("should handle settings with different delay values", async () => {
    const settingsInput = {
      processName: "explorer.exe",
      modulePath: "C:\\Windows\\System32\\kernel32.dll",
      hideFromDebugger: false,
      stealthInject: false,
      hideModule: false,
      erasePE: false,
      autoInject: false,
      closeOnInject: false,
      createFakeDebugDirectory: false,
      createNewEntryPoint: false,
      insertExtraSections: false,
      modifyAssemblyCode: false,
      modifyImportTable: false,
      moveRelocationTable: false,
      removeDebugData: false,
      removeUselessData: false,
      renameSections: false,
      scrambleHeaderFields: false,
      shiftSectionData: false,
      shiftSectionMemory: false,
      stripSectionCharacteristics: false,
      delay: 5000,
      delayBetween: 2000,
      method: 1,
    };

    const result = await caller.settings.save(settingsInput);

    expect(result.success).toBe(true);
    expect(result.message).toBe("Configurações salvas com sucesso!");
  });
});
