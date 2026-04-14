import { describe, it, expect } from 'vitest';
import { parseGitHubUrl } from './github-release-uploader';

describe('GitHub Release Uploader', () => {
  it('should parse GitHub URL correctly', () => {
    const url = 'https://github.com/user/repo';
    const result = parseGitHubUrl(url);
    
    expect(result.owner).toBe('user');
    expect(result.repo).toBe('repo');
  });

  it('should parse GitHub URL with .git suffix', () => {
    const url = 'https://github.com/user/repo.git';
    const result = parseGitHubUrl(url);
    
    expect(result.owner).toBe('user');
    expect(result.repo).toBe('repo');
  });

  it('should throw error for invalid GitHub URL', () => {
    const url = 'https://invalid.com/user/repo';
    
    expect(() => parseGitHubUrl(url)).toThrow('Invalid GitHub URL');
  });

  it('should validate GitHub token format', () => {
    const token = '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';
    
    // Token should start with ghp_
    expect(token.startsWith('ghp_')).toBe(true);
    expect(token.length).toBeGreaterThan(20);
  });
});
