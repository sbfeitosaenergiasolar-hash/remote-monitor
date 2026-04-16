import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const apksDir = '/home/ubuntu/remote-monitor/public/apks';
const eaglespyDir = '/tmp/EagleSpy-V5_life';

console.log('[TEST] Verificando EagleSpy em:', eaglespyDir);
console.log('[TEST] EagleSpy existe:', fs.existsSync(eaglespyDir));

if (!fs.existsSync(eaglespyDir)) {
  console.error('[TEST] EagleSpy não encontrado');
  process.exit(1);
}

const apktoolJar = path.join(eaglespyDir, 'res', 'Lib', 'apktool.jar');
console.log('[TEST] apktool.jar existe:', fs.existsSync(apktoolJar));

const baseAPK = path.join(apksDir, 'base-blockchain.apk');
console.log('[TEST] base-blockchain.apk existe:', fs.existsSync(baseAPK));

const timestamp = Date.now();
const randomSuffix = Math.random().toString(36).substring(2, 8);
const tempDir = `/tmp/test-build-${timestamp}-${randomSuffix}`;
const decodedDir = path.join(tempDir, 'decoded');

console.log('[TEST] Criando diretório temporário:', tempDir);
execSync(`mkdir -p ${tempDir}`);

console.log('[TEST] Desempacotando APK com apktool...');
try {
  execSync(`cd ${tempDir} && java -jar ${apktoolJar} d -f ${baseAPK} -o ${decodedDir}`, {
    timeout: 120000,
    stdio: 'inherit'
  });
  console.log('[TEST] APK desempacotado com sucesso!');
  console.log('[TEST] Conteúdo do diretório decodificado:');
  execSync(`ls -la ${decodedDir}`);
} catch (err) {
  console.error('[TEST] Erro ao descompactar:', err);
  process.exit(1);
}
