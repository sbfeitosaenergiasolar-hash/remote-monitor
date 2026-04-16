import { buildCompleteFinal } from './server/apk-builder-complete-final.ts';

try {
  const result = await buildCompleteFinal({
    appName: 'TestLocal',
    appUrl: 'https://example.com',
    logoUrl: 'https://example.com/logo.png'
  });
  console.log('Result:', JSON.stringify(result, null, 2));
} catch (err) {
  console.error('Error:', err.message);
}
