import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { randomBytes } from 'crypto';

const execAsync = promisify(exec);

interface APKWrapperOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  packageName?: string;
}

/**
 * Generate a complete Android APK wrapper that opens a URL in WebView
 * This creates a minimal Android project, compiles it with Gradle, and returns the APK
 */
export async function generateAPKWrapper(options: APKWrapperOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  error?: string;
}> {
  const projectId = randomBytes(8).toString('hex');
  const projectDir = `/tmp/apk-wrapper-${projectId}`;
  const packageName = options.packageName || `com.monitor.app${projectId}`.toLowerCase();
  
  try {
    console.log(`[APK] Starting APK generation for: ${options.appName}`);
    console.log(`[APK] Project directory: ${projectDir}`);
    console.log(`[APK] Package name: ${packageName}`);

    // Create project structure
    await execAsync(`mkdir -p ${projectDir}`);
    
    const packagePath = packageName.replace(/\./g, '/');
    const mainActivityDir = `${projectDir}/app/src/main/java/${packagePath}`;
    const manifestDir = `${projectDir}/app/src/main`;
    const layoutDir = `${projectDir}/app/src/main/res/layout`;
    const valuesDir = `${projectDir}/app/src/main/res/values`;
    
    await execAsync(`mkdir -p ${mainActivityDir} ${layoutDir} ${valuesDir}`);

    // Create build.gradle (app level)
    const buildGradle = `plugins {
    id 'com.android.application'
}

android {
    namespace '${packageName}'
    compileSdk 34
    
    defaultConfig {
        applicationId '${packageName}'
        minSdk 21
        targetSdk 34
        versionCode 1
        versionName '1.0'
    }
    
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
        debug {
            debuggable true
        }
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_11
        targetCompatibility JavaVersion.VERSION_11
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
}
`;

    // Create settings.gradle
    const settingsGradle = `pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = '${options.appName.replace(/[^a-zA-Z0-9]/g, 'App')}'
`;

    // Create gradle.properties
    const gradleProperties = `org.gradle.jvmargs=-Xmx2048m
android.useAndroidX=true
android.enableJetifier=true
`;

    // Create MainActivity.java
    const mainActivity = `package ${packageName};

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        webView = findViewById(R.id.webview);
        webView.setWebViewClient(new WebViewClient());
        
        // Enable JavaScript and storage
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setDatabaseEnabled(true);
        webView.getSettings().setUseWideViewPort(true);
        webView.getSettings().setLoadWithOverviewMode(true);
        
        // Load the URL
        webView.loadUrl("${options.appUrl}");
    }
    
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
`;

    // Create AndroidManifest.xml
    const manifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${packageName}">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.Light.DarkActionBar">

        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>
`;

    // Create activity_main.xml
    const activityLayout = `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
`;

    // Create strings.xml
    const stringsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">${options.appName}</string>
</resources>
`;

    // Create colors.xml
    const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="purple_200">#FFBB86FC</color>
    <color name="purple_500">#FF6200EE</color>
    <color name="purple_700">#FF3700B3</color>
    <color name="teal_200">#FF03DAC5</color>
    <color name="teal_700">#FF018786</color>
    <color name="black">#FF000000</color>
    <color name="white">#FFFFFFFF</color>
</resources>
`;

    // Create proguard-rules.pro
    const proguardRules = `-keep public class * extends android.app.Activity
-keep public class * extends android.webkit.WebViewClient
-keepclassmembers class * {
    public <init>(android.content.Context);
}
`;

    // Write all files
    console.log('[APK] Writing project files...');
    fs.writeFileSync(path.join(projectDir, 'build.gradle'), buildGradle);
    fs.writeFileSync(path.join(projectDir, 'settings.gradle'), settingsGradle);
    fs.writeFileSync(path.join(projectDir, 'gradle.properties'), gradleProperties);
    fs.writeFileSync(path.join(mainActivityDir, 'MainActivity.java'), mainActivity);
    fs.writeFileSync(path.join(manifestDir, 'AndroidManifest.xml'), manifest);
    fs.writeFileSync(path.join(layoutDir, 'activity_main.xml'), activityLayout);
    fs.writeFileSync(path.join(valuesDir, 'strings.xml'), stringsXml);
    fs.writeFileSync(path.join(valuesDir, 'colors.xml'), colorsXml);
    fs.writeFileSync(path.join(projectDir, 'app', 'proguard-rules.pro'), proguardRules);

    // Set up Android SDK environment
    const androidHome = '/home/ubuntu/.buildozer/android/platform/android-sdk';
    const env = {
      ...process.env,
      ANDROID_HOME: androidHome,
      PATH: `${androidHome}/tools:${androidHome}/platform-tools:${process.env.PATH}`,
    };

    // Build APK with Gradle
    console.log('[APK] Building APK with Gradle (this may take 5-10 minutes)...');
    
    return new Promise((resolve) => {
      const buildProcess = spawn('gradle', ['assembleDebug'], {
        cwd: projectDir,
        env,
        stdio: 'pipe',
        timeout: 600000, // 10 minutes
      });

      let stdout = '';
      let stderr = '';
      let lastOutput = Date.now();

      buildProcess.stdout?.on('data', (data) => {
        stdout += data.toString();
        lastOutput = Date.now();
        console.log(`[APK] ${data.toString().trim()}`);
      });

      buildProcess.stderr?.on('data', (data) => {
        stderr += data.toString();
        lastOutput = Date.now();
        console.log(`[APK] ERROR: ${data.toString().trim()}`);
      });

      buildProcess.on('close', (code) => {
        console.log(`[APK] Gradle build exited with code: ${code}`);

        if (code !== 0) {
          console.error('[APK] Build failed');
          console.error('[APK] stdout:', stdout);
          console.error('[APK] stderr:', stderr);
          
          // Clean up
          execAsync(`rm -rf ${projectDir}`).catch(console.error);
          
          resolve({
            success: false,
            error: `Gradle build failed with code ${code}`,
          });
          return;
        }

        // Find the generated APK
        const apkPath = `${projectDir}/app/build/outputs/apk/debug/app-debug.apk`;
        if (!fs.existsSync(apkPath)) {
          console.error('[APK] APK file not found at:', apkPath);
          
          // Clean up
          execAsync(`rm -rf ${projectDir}`).catch(console.error);
          
          resolve({
            success: false,
            error: 'APK build succeeded but output file not found',
          });
          return;
        }

        console.log('[APK] APK generated successfully at:', apkPath);

        // Copy to final location
        const finalAPKName = `${options.appName.replace(/\s+/g, '-')}-${Date.now()}.apk`;
        const outputDir = '/app/public/apks';
        
        execAsync(`mkdir -p ${outputDir}`).then(() => {
          const finalAPKPath = path.join(outputDir, finalAPKName);
          
          execAsync(`cp ${apkPath} ${finalAPKPath}`).then(() => {
            console.log('[APK] APK copied to:', finalAPKPath);
            
            // Clean up
            execAsync(`rm -rf ${projectDir}`).catch(console.error);
            
            resolve({
              success: true,
              apkPath: finalAPKPath,
              downloadUrl: `/apks/${finalAPKName}`,
            });
          }).catch((error) => {
            console.error('[APK] Error copying APK:', error);
            execAsync(`rm -rf ${projectDir}`).catch(console.error);
            
            resolve({
              success: false,
              error: `Failed to copy APK: ${error.message}`,
            });
          });
        }).catch((error) => {
          console.error('[APK] Error creating output directory:', error);
          execAsync(`rm -rf ${projectDir}`).catch(console.error);
          
          resolve({
            success: false,
            error: `Failed to create output directory: ${error.message}`,
          });
        });
      });

      buildProcess.on('error', (error) => {
        console.error('[APK] Gradle process error:', error);
        execAsync(`rm -rf ${projectDir}`).catch(console.error);
        
        resolve({
          success: false,
          error: `Gradle process error: ${error.message}`,
        });
      });
    });
  } catch (error) {
    console.error('[APK] APK Wrapper Generation Error:', error);

    // Clean up on error
    try {
      await execAsync(`rm -rf ${projectDir}`);
    } catch (cleanupError) {
      console.error('[APK] Cleanup error:', cleanupError);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
