import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { randomBytes } from 'crypto';
import AdmZip from 'adm-zip';

interface BuildAPKOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

export async function buildUltraSimpleAPK(options: BuildAPKOptions): Promise<{
  success: boolean;
  filename?: string;
  downloadUrl?: string;
  error?: string;
}> {
  const { appName, appUrl, logoUrl } = options;
  
  const apksDir = path.join(process.cwd(), 'public', 'apks');
  const baseAPK = path.join(apksDir, 'base-blockchain.apk');
  const tempDir = path.join('/tmp', `apk-ultra-${Date.now()}-${randomBytes(4).toString('hex')}`);
  const filename = `${appName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${randomBytes(3).toString('hex')}.apk`;
  const outputPath = path.join(apksDir, filename);

  try {
    console.log('[ULTRA-SIMPLE] Iniciando build ultra simples:', { appName, appUrl });
    
    // Criar diretório temporário
    fs.mkdirSync(tempDir, { recursive: true });
    
    // 1. Copiar APK base
    console.log('[ULTRA-SIMPLE] Copiando APK base...');
    const workingAPK = path.join(tempDir, 'working.apk');
    fs.copyFileSync(baseAPK, workingAPK);
    
    // 2. Abrir APK como ZIP e remover META-INF
    console.log('[ULTRA-SIMPLE] Removendo assinatura antiga (META-INF)...');
    const zip = new AdmZip(workingAPK);
    const entries = zip.getEntries();
    
    // Remover todos os arquivos em META-INF
    for (const entry of entries) {
      if (entry.entryName.startsWith('META-INF/')) {
        zip.deleteFile(entry);
      }
    }
    
    // 3. Adicionar config.json
    console.log('[ULTRA-SIMPLE] Adicionando config.json...');
    const config = {
      appName,
      appUrl,
      logoUrl: logoUrl || '',
      timestamp: Date.now()
    };
    zip.addFile('assets/app-config.json', Buffer.from(JSON.stringify(config, null, 2)));
    
    // 4. Salvar APK sem assinatura
    console.log('[ULTRA-SIMPLE] Salvando APK sem assinatura...');
    const unsignedAPK = path.join(tempDir, 'unsigned.apk');
    zip.writeZip(unsignedAPK);
    
    // 5. Assinar APK
    console.log('[ULTRA-SIMPLE] Assinando APK...');
    const keystorePath = path.join(apksDir, 'debug.keystore');
    
    // Criar keystore se não existir
    if (!fs.existsSync(keystorePath)) {
      console.log('[ULTRA-SIMPLE] Criando keystore...');
      execSync(
        `keytool -genkey -v -keystore ${keystorePath} -keyalg RSA -keysize 2048 ` +
        `-validity 10000 -alias android -storepass android -keypass android ` +
        `-dname "CN=Android, OU=Dev, O=Dev, L=Dev, S=Dev, C=US"`,
        { stdio: 'pipe' }
      );
    }
    
    // Assinar
    execSync(
      `jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 ` +
      `-keystore ${keystorePath} -storepass android -keypass android ` +
      `${unsignedAPK} android`,
      { stdio: 'pipe' }
    );
    console.log('[ULTRA-SIMPLE] APK assinado com sucesso');
    
    // 6. Copiar para output
    fs.copyFileSync(unsignedAPK, outputPath);
    const stats = fs.statSync(outputPath);
    console.log('[ULTRA-SIMPLE] APK final:', stats.size, 'bytes');
    
    // 7. Limpar
    execSync(`rm -rf ${tempDir}`);
    
    console.log('[ULTRA-SIMPLE] APK construído com sucesso');
    
    const downloadUrl = `https://${process.env.VITE_APP_DOMAIN || 'localhost:3000'}/get-apk/${filename}`;
    
    return {
      success: true,
      filename,
      downloadUrl
    };
  } catch (err) {
    console.error('[ULTRA-SIMPLE] Erro durante build:', err);
    // Limpar em caso de erro
    try {
      execSync(`rm -rf ${tempDir}`);
    } catch {}
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    };
  }
}
