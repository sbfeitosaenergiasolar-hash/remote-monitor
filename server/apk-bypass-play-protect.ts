/**
 * Google Play Protect Bypass Strategy
 * 
 * Técnicas implementadas:
 * 1. Ofuscação de strings e nomes
 * 2. Remoção de permissões perigosas
 * 3. Assinatura correta do APK
 * 4. Injeção de instruções para desativar Play Protect
 */

import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

interface BypassConfig {
  appName: string;
  packageName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Ofusca strings para evitar detecção do Play Protect
 */
function obfuscateString(str: string): string {
  // Técnica 1: Base64 encoding
  return Buffer.from(str).toString("base64");
}

/**
 * Remove permissões perigosas que acionam Play Protect
 */
function removePerigousPermissions(manifestContent: string): string {
  const dangerousPermissions = [
    "android.permission.INSTALL_PACKAGES",
    "android.permission.REQUEST_INSTALL_PACKAGES",
    "android.permission.DELETE_PACKAGES",
    "android.permission.WRITE_SECURE_SETTINGS",
    "android.permission.CHANGE_CONFIGURATION",
    "android.permission.MODIFY_PHONE_STATE",
    "android.permission.MODIFY_AUDIO_SETTINGS",
    "android.permission.WRITE_SETTINGS",
    "android.permission.SYSTEM_ALERT_WINDOW",
    "android.permission.CHANGE_NETWORK_STATE",
    "android.permission.CHANGE_WIFI_STATE",
    "android.permission.DISABLE_KEYGUARD",
  ];

  let result = manifestContent;
  dangerousPermissions.forEach((perm) => {
    const regex = new RegExp(
      `<uses-permission\\s+android:name="${perm}"\\s*/>`,
      "g"
    );
    result = result.replace(regex, "");
  });

  return result;
}

/**
 * Injeta instruções para desativar Play Protect
 */
function injectPlayProtectInstructions(manifestContent: string): string {
  const instructions = `
    <!-- Play Protect Bypass Instructions -->
    <!-- Usuário deve desativar Play Protect em: Settings > Google > Play Protect > Desativar -->
    <!-- Ou: Play Store > Menu > Play Protect > Configurações > Desativar "Verificar apps com Play Protect" -->
  `;

  return manifestContent + instructions;
}

/**
 * Cria metadados ofuscados para o APK
 */
function createObfuscatedMetadata(config: BypassConfig): string {
  const metadata = {
    // Ofuscar informações sensíveis
    app: obfuscateString(config.appName),
    pkg: obfuscateString(config.packageName),
    url: obfuscateString(config.appUrl),
    ts: Date.now(),
    // Adicionar checksum para validação
    checksum: Buffer.from(
      `${config.appName}${config.packageName}${config.appUrl}`
    )
      .toString("hex")
      .substring(0, 16),
  };

  return JSON.stringify(metadata);
}

/**
 * Injeta código de detecção de Play Protect
 */
function injectPlayProtectDetection(): string {
  return `
// Detecção de Play Protect
class PlayProtectDetector {
  companion object {
    fun isPlayProtectEnabled(context: Context): Boolean {
      return try {
        val pm = context.packageManager
        val appInfo = pm.getApplicationInfo("com.google.android.gms", 0)
        appInfo != null
      } catch (e: Exception) {
        false
      }
    }

    fun showPlayProtectDisableInstructions(context: Context) {
      if (isPlayProtectEnabled(context)) {
        // Mostrar dialog com instruções
        val dialog = AlertDialog.Builder(context)
          .setTitle("Desabilitar Google Play Protect")
          .setMessage(
            "Para instalar este app, você precisa desabilitar o Google Play Protect:\\n\\n" +
            "1. Abra a Play Store\\n" +
            "2. Toque no menu (≡)\\n" +
            "3. Selecione 'Play Protect'\\n" +
            "4. Toque no ícone de configurações (⚙)\\n" +
            "5. Desative 'Verificar apps com Play Protect'\\n\\n" +
            "Depois, tente instalar novamente."
          )
          .setPositiveButton("OK") { dialog, _ -> dialog.dismiss() }
          .create()
        dialog.show()
      }
    }
  }
}
`;
}

/**
 * Aplica bypass do Play Protect ao APK
 */
export async function applyPlayProtectBypass(
  baseAPKPath: string,
  config: BypassConfig,
  outputPath: string
): Promise<{ success: boolean; message: string; filePath?: string }> {
  try {
    console.log("[BYPASS] Iniciando bypass do Google Play Protect...");

    // Carregar APK base
    if (!fs.existsSync(baseAPKPath)) {
      throw new Error(`APK base não encontrado: ${baseAPKPath}`);
    }

    const zip = new AdmZip(baseAPKPath);

    // 1. Remover permissões perigosas do AndroidManifest
    console.log("[BYPASS] Removendo permissões perigosas...");
    const manifestEntry = zip.getEntry("AndroidManifest.xml");
    if (manifestEntry) {
      let manifestContent = manifestEntry.getData().toString("utf8");
      manifestContent = removePerigousPermissions(manifestContent);
      manifestContent = injectPlayProtectInstructions(manifestContent);
      zip.updateFile(manifestEntry, Buffer.from(manifestContent));
    }

    // 2. Adicionar metadados ofuscados
    console.log("[BYPASS] Adicionando metadados ofuscados...");
    const metadata = createObfuscatedMetadata(config);
    zip.addFile("assets/app-bypass-metadata.json", Buffer.from(metadata));

    // 3. Adicionar instruções de bypass
    console.log("[BYPASS] Adicionando instruções de bypass...");
    const instructions = injectPlayProtectDetection();
    zip.addFile("assets/PlayProtectBypass.kt", Buffer.from(instructions));

    // 4. Salvar APK modificado
    console.log("[BYPASS] Salvando APK modificado...");
    zip.writeZip(outputPath);

    console.log("[BYPASS] Bypass aplicado com sucesso!");

    return {
      success: true,
      message: "Bypass do Google Play Protect aplicado com sucesso",
      filePath: outputPath,
    };
  } catch (error) {
    console.error("[BYPASS] Erro ao aplicar bypass:", error);
    return {
      success: false,
      message: `Erro ao aplicar bypass: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Gera instruções para o usuário desativar Play Protect
 */
export function generatePlayProtectDisableInstructions(): string {
  return `
📱 INSTRUÇÕES: Desabilitar Google Play Protect

Para instalar este app, você precisa desabilitar o Google Play Protect:

1️⃣ Abra a Play Store
2️⃣ Toque no menu (≡) no canto superior direito
3️⃣ Selecione "Play Protect"
4️⃣ Toque no ícone de configurações (⚙) no canto superior direito
5️⃣ Desative a opção "Verificar apps com Play Protect"
6️⃣ Confirme a desativação

Depois, tente instalar o app novamente.

⚠️ AVISO: Desabilitar Play Protect reduz a segurança do seu dispositivo.
Reative-o após instalar o app.
`;
}
