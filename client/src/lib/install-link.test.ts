import { describe, it, expect, beforeEach } from "vitest";
import { generateInstallLink, generateDirectDownloadLink, copyToClipboard } from "./install-link";

describe("install-link utilities", () => {
  describe("generateInstallLink", () => {
    it("should generate a valid install link with all parameters", () => {
      const link = generateInstallLink({
        filename: "app.apk",
        appName: "Test App",
        downloadUrl: "https://example.com/app.apk",
        fileSize: 1024000,
      });

      expect(link).toContain("/install?");
      expect(link).toContain("file=app.apk");
      expect(link).toContain("app=Test%20App");
      expect(link).toContain("url=https%3A%2F%2Fexample.com%2Fapp.apk");
      expect(link).toContain("size=1024000");
    });

    it("should generate a valid install link without fileSize", () => {
      const link = generateInstallLink({
        filename: "app.apk",
        appName: "Test App",
        downloadUrl: "https://example.com/app.apk",
      });

      expect(link).toContain("/install?");
      expect(link).toContain("file=app.apk");
      expect(link).toContain("app=Test%20App");
      expect(link).not.toContain("size=");
    });

    it("should handle special characters in appName", () => {
      const link = generateInstallLink({
        filename: "app.apk",
        appName: "App & Co.",
        downloadUrl: "https://example.com/app.apk",
      });

      expect(link).toContain("app=App%20%26%20Co.");
    });

    it("should handle complex URLs", () => {
      const complexUrl = "https://cdn.example.com/releases/v1.0/app-release.apk?token=abc123";
      const link = generateInstallLink({
        filename: "app.apk",
        appName: "Test",
        downloadUrl: complexUrl,
      });

      expect(link).toContain("url=");
      expect(link).toContain(encodeURIComponent(complexUrl));
    });
  });

  describe("generateDirectDownloadLink", () => {
    it("should return the download URL as-is", () => {
      const url = "https://example.com/app.apk";
      const result = generateDirectDownloadLink(url);

      expect(result).toBe(url);
    });
  });

  describe("copyToClipboard", () => {
    beforeEach(() => {
      // Mock navigator.clipboard
      Object.assign(navigator, {
        clipboard: {
          writeText: async (text: string) => {
            return Promise.resolve();
          },
        },
      });
    });

    it("should copy text to clipboard using modern API", async () => {
      const text = "https://example.com/install?file=app.apk";
      const result = await copyToClipboard(text);

      expect(result).toBe(true);
    });

    it("should handle clipboard errors gracefully", async () => {
      // Mock clipboard error
      Object.assign(navigator, {
        clipboard: {
          writeText: async () => {
            throw new Error("Clipboard error");
          },
        },
      });

      const text = "https://example.com/install?file=app.apk";
      const result = await copyToClipboard(text);

      expect(result).toBe(false);
    });
  });

  describe("URL parameter encoding", () => {
    it("should properly encode all URL parameters", () => {
      const link = generateInstallLink({
        filename: "app with spaces.apk",
        appName: "My App (Beta)",
        downloadUrl: "https://example.com/path?query=value&other=123",
        fileSize: 5242880,
      });

      // Verify URL is properly encoded
      expect(link).toContain("file=app%20with%20spaces.apk");
      expect(link).toContain("app=My%20App%20%28Beta%29");
      expect(link).toContain("url=https%3A%2F%2Fexample.com%2Fpath%3Fquery%3Dvalue%26other%3D123");
    });
  });

  describe("link format validation", () => {
    it("should generate links that can be parsed back", () => {
      const options = {
        filename: "app.apk",
        appName: "Test App",
        downloadUrl: "https://example.com/app.apk",
        fileSize: 1024000,
      };

      const link = generateInstallLink(options);
      const url = new URL(link, "http://localhost");

      expect(url.searchParams.get("file")).toBe(options.filename);
      expect(url.searchParams.get("app")).toBe(options.appName);
      expect(url.searchParams.get("url")).toBe(options.downloadUrl);
      expect(url.searchParams.get("size")).toBe(options.fileSize.toString());
    });
  });
});
