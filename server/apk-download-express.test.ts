import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import http from 'http';

describe('APK Download Express Endpoint', () => {
  const testApksDir = path.join(process.cwd(), 'public/apks');
  const testFilename = 'express-test-app.apk';
  const testFilePath = path.join(testApksDir, testFilename);

  beforeAll(() => {
    // Create test APK directory if it doesn't exist
    if (!fs.existsSync(testApksDir)) {
      fs.mkdirSync(testApksDir, { recursive: true });
    }
    
    // Create a test APK file with some content
    const testContent = Buffer.from('test apk content for express endpoint');
    fs.writeFileSync(testFilePath, testContent);
  });

  afterAll(() => {
    // Clean up test file
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it('should serve APK file with correct headers', async () => {
    return new Promise<void>((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: `/api/download-apk/${testFilename}`,
        method: 'GET',
      };

      const req = http.request(options, (res) => {
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toBe('application/octet-stream');
        expect(res.headers['content-disposition']).toContain(`attachment; filename="${testFilename}"`);
        expect(res.headers['content-length']).toBeDefined();
        expect(res.headers['x-download-options']).toBe('noopen');
        expect(res.headers['content-transfer-encoding']).toBe('binary');

        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          expect(data).toBe('test apk content for express endpoint');
          resolve();
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.end();
    });
  });

  it('should reject path traversal attempts', async () => {
    return new Promise<void>((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/download-apk/..%2F..%2F..%2Fetc%2Fpasswd',
        method: 'GET',
      };

      const req = http.request(options, (res) => {
        expect([400, 404]).toContain(res.statusCode);
        resolve();
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.end();
    });
  });

  it('should return 404 for non-existent files', async () => {
    return new Promise<void>((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/download-apk/non-existent-file.apk',
        method: 'GET',
      };

      const req = http.request(options, (res) => {
        expect(res.statusCode).toBe(404);
        resolve();
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.end();
    });
  });
});
