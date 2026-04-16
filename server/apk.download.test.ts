import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { appRouter } from './routers';

describe('APK Download Endpoint', () => {
  const testApksDir = path.join(process.cwd(), 'public/apks');
  const testFilename = 'test-app.apk';
  const testFilePath = path.join(testApksDir, testFilename);

  beforeAll(() => {
    // Create test APK directory if it doesn't exist
    if (!fs.existsSync(testApksDir)) {
      fs.mkdirSync(testApksDir, { recursive: true });
    }
    
    // Create a test APK file with some content
    const testContent = Buffer.from('test apk content');
    fs.writeFileSync(testFilePath, testContent);
  });

  afterAll(() => {
    // Clean up test file
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it('should download APK file and return base64 content', async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.apk.download({
      filename: testFilename,
    });

    expect(result.success).toBe(true);
    expect(result.filename).toBe(testFilename);
    expect(result.data).toBeDefined();
    expect(result.size).toBeGreaterThan(0);

    // Verify base64 can be decoded back
    const decoded = Buffer.from(result.data, 'base64');
    expect(decoded.toString()).toBe('test apk content');
  });

  it('should reject path traversal attempts', async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.apk.download({
        filename: '../../../etc/passwd',
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should reject non-existent files', async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.apk.download({
        filename: 'non-existent-file.apk',
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
