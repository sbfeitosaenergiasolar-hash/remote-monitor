#!/usr/bin/env node
/**
 * Script para criar um APK base mínimo
 * Cria um ZIP com estrutura válida de APK
 */

import * as fs from 'fs';
import * as path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Criar diretório temporário
const tempDir = path.join(__dirname, '.temp-apk-base');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Criar estrutura mínima de APK
const dirs = [
  path.join(tempDir, 'META-INF'),
  path.join(tempDir, 'res'),
  path.join(tempDir, 'res', 'drawable'),
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Criar arquivos mínimos
// 1. AndroidManifest.xml (mínimo)
const manifestContent = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.remotemonitor.app">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@android:style/Theme.NoTitleBar.Fullscreen">
        <activity android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;

fs.writeFileSync(path.join(tempDir, 'AndroidManifest.xml'), manifestContent);

// 2. classes.dex (arquivo vazio, será substituído)
fs.writeFileSync(path.join(tempDir, 'classes.dex'), Buffer.from([0x64, 0x65, 0x78, 0x0a, 0x30, 0x33, 0x35])); // "dex\n035"

// 3. resources.arsc (arquivo vazio)
fs.writeFileSync(path.join(tempDir, 'resources.arsc'), Buffer.alloc(0));

// 4. MANIFEST.MF
const manifestMf = `Manifest-Version: 1.0
Created-By: APK Generator
`;
fs.writeFileSync(path.join(tempDir, 'META-INF', 'MANIFEST.MF'), manifestMf);

// 5. Criar APK (ZIP)
const outputPath = path.join(__dirname, 'server', 'apk-base.apk');
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

archive.on('error', (err) => {
  console.error('❌ Erro ao criar APK base:', err);
  process.exit(1);
});

output.on('close', () => {
  console.log(`✅ APK base criado com sucesso: ${outputPath} (${archive.pointer()} bytes)`);
  
  // Limpar diretório temporário
  fs.rmSync(tempDir, { recursive: true, force: true });
  process.exit(0);
});

archive.pipe(output);
archive.directory(tempDir, false);
archive.finalize();
