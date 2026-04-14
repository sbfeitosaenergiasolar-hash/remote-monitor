// Preconfigured storage helpers for Manus WebDev templates
// Uses the Biz-provided storage proxy (Authorization: Bearer <token>)

import { ENV } from './_core/env';

type StorageConfig = { baseUrl: string; apiKey: string };

function getStorageConfig(): StorageConfig {
  console.log('[STORAGE] Getting config, ENV.forgeApiUrl:', ENV.forgeApiUrl ? 'SET' : 'NOT SET');
  console.log('[STORAGE] Getting config, ENV.forgeApiKey:', ENV.forgeApiKey ? 'SET (length: ' + ENV.forgeApiKey.length + ')' : 'NOT SET');
  console.log('[STORAGE] Raw env vars:', {
    BUILT_IN_FORGE_API_URL: process.env.BUILT_IN_FORGE_API_URL ? 'SET' : 'NOT SET',
    BUILT_IN_FORGE_API_KEY: process.env.BUILT_IN_FORGE_API_KEY ? 'SET' : 'NOT SET',
  });
  
  const baseUrl = ENV.forgeApiUrl?.trim();
  const apiKey = ENV.forgeApiKey?.trim();

  if (!baseUrl || !apiKey) {
    console.error('[STORAGE] Missing credentials! baseUrl:', baseUrl, 'apiKey:', apiKey);
    throw new Error(
      "Storage proxy credentials missing: set BUILT_IN_FORGE_API_URL and BUILT_IN_FORGE_API_KEY"
    );
  }

  return { baseUrl: baseUrl.replace(/\/+$/, ""), apiKey };
}

function buildUploadUrl(baseUrl: string, relKey: string): URL {
  const url = new URL("v1/storage/upload", ensureTrailingSlash(baseUrl));
  url.searchParams.set("path", normalizeKey(relKey));
  return url;
}

async function buildDownloadUrl(
  baseUrl: string,
  relKey: string,
  apiKey: string
): Promise<string> {
  const downloadApiUrl = new URL(
    "v1/storage/downloadUrl",
    ensureTrailingSlash(baseUrl)
  );
  downloadApiUrl.searchParams.set("path", normalizeKey(relKey));
  const response = await fetch(downloadApiUrl, {
    method: "GET",
    headers: buildAuthHeaders(apiKey),
  });
  return (await response.json()).url;
}

function ensureTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

function toFormData(
  data: Buffer | Uint8Array | string,
  contentType: string,
  fileName: string
): FormData {
  const blob =
    typeof data === "string"
      ? new Blob([data], { type: contentType })
      : new Blob([data as any], { type: contentType });
  const form = new FormData();
  form.append("file", blob, fileName || "file");
  return form;
}

function buildAuthHeaders(apiKey: string): HeadersInit {
  return { Authorization: `Bearer ${apiKey}` };
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  console.log('[STORAGE] storagePut called with:', { relKey, dataSize: typeof data === 'string' ? data.length : (data as any).length, contentType });
  
  try {
    const { baseUrl, apiKey } = getStorageConfig();
    console.log('[STORAGE] Config loaded:', { baseUrl: baseUrl.substring(0, 50), apiKeyLength: apiKey.length });
    
    const key = normalizeKey(relKey);
    console.log('[STORAGE] Normalized key:', key);
    
    const uploadUrl = buildUploadUrl(baseUrl, key);
    console.log('[STORAGE] Upload URL:', uploadUrl.toString());
    
    const formData = toFormData(data, contentType, key.split("/").pop() ?? key);
    console.log('[STORAGE] FormData created');
    
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: buildAuthHeaders(apiKey),
      body: formData,
    });

    console.log('[STORAGE] Upload response status:', response.status, response.statusText);

    if (!response.ok) {
      const message = await response.text().catch(() => response.statusText);
      console.error('[STORAGE] Upload failed:', { status: response.status, message });
      throw new Error(
        `Storage upload failed (${response.status} ${response.statusText}): ${message}`
      );
    }
    
    const responseJson = await response.json();
    console.log('[STORAGE] Upload response JSON:', responseJson);
    
    const url = responseJson.url;
    console.log('[STORAGE] Upload successful, URL:', url);
    
    return { key, url };
  } catch (error) {
    console.error('[STORAGE] storagePut error:', error);
    throw error;
  }
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string; }> {
  const { baseUrl, apiKey } = getStorageConfig();
  const key = normalizeKey(relKey);
  return {
    key,
    url: await buildDownloadUrl(baseUrl, key, apiKey),
  };
}
