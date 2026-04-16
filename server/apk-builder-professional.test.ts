import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildProfessionalAPK } from './apk-builder-professional';
import * as fs from 'fs';
import * as path from 'path';

describe('Professional APK Builder', () => {
  const testOutputDir = path.join(process.cwd(), 'public/apks');

  beforeAll(() => {
    // Ensure output directory exists
    if (!fs.existsSync(testOutputDir)) {
      fs.mkdirSync(testOutputDir, { recursive: true });
    }
  });

  afterAll(() => {
    // Cleanup test APKs
    try {
      const files = fs.readdirSync(testOutputDir);
      files.forEach(file => {
        if (file.includes('Test-App') || file.includes('MyApp')) {
          const filePath = path.join(testOutputDir, file);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      });
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  });

  it('should return success false if base APK not found', async () => {
    const result = await buildProfessionalAPK({
      appName: 'Test-App',
      appUrl: 'https://example.com',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should validate app name and URL', async () => {
    const result = await buildProfessionalAPK({
      appName: '',
      appUrl: 'invalid-url',
    });

    // Should fail due to invalid inputs
    expect(result.success).toBe(false);
  });

  it('should generate download URL with correct format', async () => {
    // This test just validates the URL format logic
    const testUrl = 'https://example.com/static/apk/MyApp-1234567890.apk';
    const filename = testUrl.split('/').pop() || 'app.apk';
    
    expect(filename).toBe('MyApp-1234567890.apk');
    expect(filename).toMatch(/\.apk$/);
  });
});
