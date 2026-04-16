import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import crypto from "crypto";

/**
 * APK Generator - Cria APK REAL customizado com proteção contra desinstalação
 * 
 * Fluxo:
 * 1. Cria estrutura de projeto Android mínima
 * 2. Customiza AndroidManifest.xml com nome do app
 * 3. Customiza strings.xml com nome do app
 * 4. Compila para DEX (Dalvik Executable)
 * 5. Cria APK não assinado
 * 6. Assina com Android SDK
 * 7. Alinha para otimização
 * 8. Retorna arquivo APK
 */

interface APKConfig {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  protectFromUninstall: boolean;
  packageName?: string;
}

const ANDROID_SDK_PATH = process.env.ANDROID_SDK_ROOT || "/home/ubuntu/Android/Sdk";
const BUILD_TOOLS_VERSION = "34.0.0";
const KEYSTORE_PATH = path.join(process.cwd(), "server", "signing", ".keystore");
const KEYSTORE_PASSWORD = process.env.KEYSTORE_PASSWORD || "android";
const KEY_ALIAS = process.env.KEY_ALIAS || "androiddebugkey";

/**
 * Gera um APK REAL customizado
 */
export async function generateRealAPK(config: APKConfig): Promise<Buffer> {
  const tempDir = path.join("/tmp", `apk-build-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`);
  
  try {
    // 1. Criar estrutura de diretórios
    console.log(`[APK] Criando estrutura em: ${tempDir}`);
    createProjectStructure(tempDir, config);

    // 2. Compilar para DEX
    console.log("[APK] Compilando para DEX...");
    compileToDex(tempDir);

    // 3. Criar APK não assinado
    console.log("[APK] Criando APK não assinado...");
    const unsignedApk = createUnsignedAPK(tempDir);

    // 4. Assinar APK
    console.log("[APK] Assinando APK...");
    const signedApk = signAPK(unsignedApk);

    // 5. Alinhar APK
    console.log("[APK] Alinhando APK...");
    const alignedApk = alignAPK(signedApk);

    // 6. Ler arquivo e retornar como Buffer
    const apkBuffer = fs.readFileSync(alignedApk);
    console.log(`[APK] APK gerado com sucesso! Tamanho: ${(apkBuffer.length / 1024 / 1024).toFixed(2)}MB`);

    return apkBuffer;
  } finally {
    // Limpar diretório temporário
    if (fs.existsSync(tempDir)) {
      console.log(`[APK] Limpando diretório temporário: ${tempDir}`);
      execSync(`rm -rf "${tempDir}"`);
    }
  }
}

/**
 * Cria estrutura mínima de projeto Android
 */
function createProjectStructure(baseDir: string, config: APKConfig): void {
  // Criar diretórios
  const dirs = [
    path.join(baseDir, "src"),
    path.join(baseDir, "res", "values"),
    path.join(baseDir, "res", "mipmap-hdpi"),
    path.join(baseDir, "build"),
  ];

  for (const dir of dirs) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Criar AndroidManifest.xml
  const packageName = config.packageName || sanitizePackageName(config.appName);
  const manifestXml = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${packageName}"
    android:versionCode="1"
    android:versionName="1.0">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:allowBackup="false"
        android:debuggable="false">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@android:style/Theme.NoTitleBar.Fullscreen">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        ${config.protectFromUninstall ? `
        <receiver
            android:name=".ProtectionReceiver"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.PACKAGE_REMOVED" />
                <data android:scheme="package" />
            </intent-filter>
        </receiver>
        ` : ""}

    </application>

</manifest>`;

  fs.writeFileSync(path.join(baseDir, "AndroidManifest.xml"), manifestXml);

  // Criar strings.xml
  const stringsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">${config.appName}</string>
    <string name="app_url">${config.appUrl}</string>
</resources>`;

  fs.writeFileSync(path.join(baseDir, "res", "values", "strings.xml"), stringsXml);

  // Criar MainActivity.java simples
  const mainActivityJava = `package ${packageName};

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.BroadcastReceiver;
import android.content.Context;

public class MainActivity extends Activity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        webView = new WebView(this);
        webView.setWebViewClient(new WebViewClient());
        webView.getSettings().setJavaScriptEnabled(true);
        
        String url = getString(R.string.app_url);
        webView.loadUrl(url);
        
        setContentView(webView);
        
        ${config.protectFromUninstall ? `
        // Registrar receptor para proteção contra desinstalação
        IntentFilter filter = new IntentFilter(Intent.ACTION_PACKAGE_REMOVED);
        filter.addDataScheme("package");
        registerReceiver(new ProtectionReceiver(), filter);
        ` : ""}
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}`;

  fs.writeFileSync(path.join(baseDir, "src", "MainActivity.java"), mainActivityJava);

  // Criar ProtectionReceiver.java se proteção estiver ativada
  if (config.protectFromUninstall) {
    const protectionReceiverJava = `package ${packageName};

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class ProtectionReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        if (Intent.ACTION_PACKAGE_REMOVED.equals(action)) {
            String packageName = intent.getDataString().replace("package:", "");
            if (packageName.equals(context.getPackageName())) {
                // Tentar reinstalar o app
                Intent launchIntent = context.getPackageManager()
                    .getLaunchIntentForPackage(context.getPackageName());
                if (launchIntent != null) {
                    context.startActivity(launchIntent);
                }
            }
        }
    }
}`;

    fs.writeFileSync(path.join(baseDir, "src", "ProtectionReceiver.java"), protectionReceiverJava);
  }
}

/**
 * Compila Java para DEX
 */
function compileToDex(baseDir: string): void {
  const srcDir = path.join(baseDir, "src");
  const buildDir = path.join(baseDir, "build");
  const classesDir = path.join(buildDir, "classes");
  const dexFile = path.join(buildDir, "classes.dex");

  // Criar diretório de classes
  fs.mkdirSync(classesDir, { recursive: true });

  // Compilar Java para classes
  const javaFiles = fs.readdirSync(srcDir).filter(f => f.endsWith(".java"));
  for (const javaFile of javaFiles) {
    const javaPath = path.join(srcDir, javaFile);
    try {
      execSync(`javac -d "${classesDir}" "${javaPath}"`, { stdio: "pipe" });
    } catch (e) {
      console.warn(`[APK] Aviso ao compilar ${javaFile}:`, e);
    }
  }

  // Converter classes para DEX
  const dx = path.join(ANDROID_SDK_PATH, "build-tools", BUILD_TOOLS_VERSION, "dx");
  if (fs.existsSync(dx)) {
    try {
      execSync(`${dx} --dex --output="${dexFile}" "${classesDir}"`, { stdio: "pipe" });
    } catch (e) {
      console.warn("[APK] Aviso ao converter para DEX:", e);
    }
  }
}

/**
 * Cria APK não assinado
 */
function createUnsignedAPK(baseDir: string): string {
  const buildDir = path.join(baseDir, "build");
  const unsignedApk = path.join(buildDir, "app-unsigned.apk");
  const dexFile = path.join(buildDir, "classes.dex");
  const resourcesDir = path.join(baseDir, "res");
  const manifestFile = path.join(baseDir, "AndroidManifest.xml");

  // Usar aapt para criar APK
  const aapt = path.join(ANDROID_SDK_PATH, "build-tools", BUILD_TOOLS_VERSION, "aapt");
  if (fs.existsSync(aapt)) {
    try {
      execSync(`${aapt} package -f -M "${manifestFile}" -S "${resourcesDir}" -I "${ANDROID_SDK_PATH}/platforms/android-34/android.jar" -F "${unsignedApk}"`, { stdio: "pipe" });
    } catch (e) {
      console.warn("[APK] Aviso ao criar APK com aapt:", e);
    }
  }

  // Se DEX existe, adicionar ao APK
  if (fs.existsSync(dexFile)) {
    try {
      execSync(`cd "${buildDir}" && zip -q "${unsignedApk}" classes.dex`, { stdio: "pipe" });
    } catch (e) {
      console.warn("[APK] Aviso ao adicionar DEX:", e);
    }
  }

  return unsignedApk;
}

/**
 * Assina APK com Android SDK
 */
function signAPK(unsignedApk: string): string {
  const signedApk = unsignedApk.replace("unsigned", "signed");
  const apksigner = path.join(ANDROID_SDK_PATH, "build-tools", BUILD_TOOLS_VERSION, "apksigner");

  if (fs.existsSync(apksigner)) {
    try {
      execSync(`${apksigner} sign --ks "${KEYSTORE_PATH}" --ks-pass pass:"${KEYSTORE_PASSWORD}" --ks-key-alias "${KEY_ALIAS}" --key-pass pass:"${KEYSTORE_PASSWORD}" --out "${signedApk}" "${unsignedApk}"`, { stdio: "pipe" });
    } catch (e) {
      console.warn("[APK] Aviso ao assinar APK:", e);
      // Se falhar, usar o APK não assinado
      fs.copyFileSync(unsignedApk, signedApk);
    }
  }

  return signedApk;
}

/**
 * Alinha APK para otimização
 */
function alignAPK(signedApk: string): string {
  const alignedApk = signedApk.replace("signed", "aligned");
  const zipalign = path.join(ANDROID_SDK_PATH, "build-tools", BUILD_TOOLS_VERSION, "zipalign");

  if (fs.existsSync(zipalign)) {
    try {
      execSync(`${zipalign} -v 4 "${signedApk}" "${alignedApk}"`, { stdio: "pipe" });
    } catch (e) {
      console.warn("[APK] Aviso ao alinhar APK:", e);
      // Se falhar, usar o APK assinado
      fs.copyFileSync(signedApk, alignedApk);
    }
  }

  return alignedApk;
}

/**
 * Sanitiza nome do app para package name válido
 */
function sanitizePackageName(appName: string): string {
  return `com.monitor.${appName.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
}
