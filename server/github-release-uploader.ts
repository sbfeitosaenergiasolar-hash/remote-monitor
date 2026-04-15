import * as fs from 'fs';
import * as path from 'path';

interface GitHubReleaseOptions {
  owner: string;
  repo: string;
  token: string;
  appName: string;
  filePath: string;
  releaseTag?: string;
}

/**
 * Upload APK to GitHub Releases
 */
export async function uploadToGitHubRelease(options: GitHubReleaseOptions): Promise<string> {
  try {
    console.log('[GITHUB] Starting upload to GitHub Releases');
    console.log('[GITHUB] Owner:', options.owner);
    console.log('[GITHUB] Repo:', options.repo);

    // Get file info
    if (!fs.existsSync(options.filePath)) {
      throw new Error(`File not found: ${options.filePath}`);
    }

    const fileStats = fs.statSync(options.filePath);
    const fileName = path.basename(options.filePath);
    const fileSize = fileStats.size;

    console.log(`[GITHUB] File: ${fileName}, Size: ${(fileSize / 1024 / 1024).toFixed(2)}MB`);

    // Create release tag (use provided or generate new one)
    const releaseTag = options.releaseTag || `apk-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const releaseName = `${options.appName} APK - ${new Date().toLocaleString()}`;

    console.log(`[GITHUB] Creating release: ${releaseTag}`);

    // Create release
    const createReleaseResponse = await fetch(
      `https://api.github.com/repos/${options.owner}/${options.repo}/releases`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${options.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tag_name: releaseTag,
          name: releaseName,
          body: `Automatically generated APK for ${options.appName}`,
          draft: false,
          prerelease: false,
        }),
      }
    );

    if (!createReleaseResponse.ok) {
      const error = await createReleaseResponse.text();
      console.error('[GITHUB] Error creating release:', error);
      throw new Error(`Failed to create release: ${createReleaseResponse.status}`);
    }

    const releaseData = await createReleaseResponse.json() as any;
    const uploadUrl = releaseData.upload_url.replace('{?name,label}', '');

    console.log('[GITHUB] Release created, uploading asset...');

    // Upload asset
    const fileBuffer = fs.readFileSync(options.filePath);
    const uploadResponse = await fetch(
      `${uploadUrl}?name=${encodeURIComponent(fileName)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${options.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/vnd.android.package-archive',
          'Content-Length': fileSize.toString(),
          'Content-Disposition': `attachment; filename="${fileName}"`,
        },
        body: fileBuffer,
      } as any
    );

    if (!uploadResponse.ok) {
      const error = await uploadResponse.text();
      console.error('[GITHUB] Error uploading asset:', error);
      throw new Error(`Failed to upload asset: ${uploadResponse.status}`);
    }

    const assetData = await uploadResponse.json() as any;
    const downloadUrl = assetData.browser_download_url;

    console.log('[GITHUB] Upload successful!');
    console.log('[GITHUB] Download URL:', downloadUrl);
    console.log('[GITHUB] Asset browser_download_url:', assetData.browser_download_url);
    console.log('[GITHUB] Asset content_type:', assetData.content_type);
    console.log('[GITHUB] Asset size:', assetData.size);

    return downloadUrl;
  } catch (error) {
    console.error('[GITHUB] Error in GitHub release upload:', error);
    throw error;
  }
}

/**
 * Get repository info from GitHub URL
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string } {
  // Parse URLs like: https://github.com/owner/repo
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) {
    throw new Error('Invalid GitHub URL');
  }
  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, ''),
  };
}
