/**
 * Gera um APK base funcional com WebView
 * Este APK abre uma URL em WebView e pode ser customizado
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Cria um APK base simples com WebView
 * Requer Android SDK instalado
 */
export async function generateBaseAPK(): Promise<string> {
  try {
    console.log('[BASE-APK] Gerando APK base com WebView...');

    // Criar diretório temporário para o projeto Android
    const tempDir = '/tmp/android-webview-app';
    const srcDir = path.join(tempDir, 'src', 'main');
    const resDir = path.join(srcDir, 'res');

    // Limpar diretório anterior
    if (fs.existsSync(tempDir)) {
      execSync(`rm -rf ${tempDir}`);
    }

    // Criar estrutura de diretórios
    fs.mkdirSync(path.join(srcDir, 'java', 'com', 'remote', 'monitor'), { recursive: true });
    fs.mkdirSync(path.join(resDir, 'layout'), { recursive: true });
    fs.mkdirSync(path.join(resDir, 'values'), { recursive: true });

    // Criar AndroidManifest.xml
    const manifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.remote.monitor">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">

        <activity android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>`;

    fs.writeFileSync(path.join(srcDir, 'AndroidManifest.xml'), manifest);

    // Criar MainActivity.java
    const mainActivity = `package com.remote.monitor;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webView = findViewById(R.id.webview);
        webView.setWebViewClient(new WebViewClient());
        webView.getSettings().setJavaScriptEnabled(true);
        
        // URL será injetada aqui
        String url = getIntent().getStringExtra("url");
        if (url == null) {
            url = "https://example.com";
        }
        webView.loadUrl(url);
    }
}`;

    fs.writeFileSync(
      path.join(srcDir, 'java', 'com', 'remote', 'monitor', 'MainActivity.java'),
      mainActivity
    );

    // Criar layout
    const layout = `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>`;

    fs.writeFileSync(path.join(resDir, 'layout', 'activity_main.xml'), layout);

    // Criar strings.xml
    const strings = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Remote Monitor</string>
</resources>`;

    fs.writeFileSync(path.join(resDir, 'values', 'strings.xml'), strings);

    console.log('[BASE-APK] Estrutura do projeto criada');
    console.log('[BASE-APK] Nota: Para compilar, use Android Studio ou Gradle');

    return tempDir;
  } catch (error) {
    console.error('[BASE-APK] Erro ao gerar APK base:', error);
    throw error;
  }
}

/**
 * Alternativa: Usar um APK base pré-compilado
 * Retorna o caminho do melhor APK base disponível
 */
export function selectBestBaseAPK(): string {
  const apksDir = process.env.NODE_ENV === 'production'
    ? '/app/public/apks'
    : '/home/ubuntu/remote-monitor/public/apks';

  // Preferência de APKs base (em ordem de prioridade)
  const preferredAPKs = [
    'iFood-1776294055191.apk',  // Tem WebView
    'FazTudo-1776089094334.apk', // Alternativa
    'Blockchain-Monitoring.apk',  // Fallback
  ];

  for (const apkName of preferredAPKs) {
    const apkPath = path.join(apksDir, apkName);
    if (fs.existsSync(apkPath)) {
      const size = fs.statSync(apkPath).size;
      if (size > 1000000) {
        console.log(`[BASE-APK] Usando: ${apkName}`);
        return apkPath;
      }
    }
  }

  // Fallback: usar o maior APK disponível
  const files = fs.readdirSync(apksDir);
  const apkFiles = files
    .filter(f => f.endsWith('.apk') && !f.endsWith('.idsig'))
    .map(f => {
      const filePath = path.join(apksDir, f);
      const size = fs.statSync(filePath).size;
      return { name: f, path: filePath, size };
    })
    .filter(f => f.size > 1000000)
    .sort((a, b) => b.size - a.size);

  if (apkFiles.length === 0) {
    throw new Error('Nenhum APK base encontrado');
  }

  console.log(`[BASE-APK] Usando fallback: ${apkFiles[0].name}`);
  return apkFiles[0].path;
}
