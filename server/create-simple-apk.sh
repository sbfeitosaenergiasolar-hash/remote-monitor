#!/bin/bash

# Script para criar um APK base simples e compatível com Android antigo
# Requer: Android SDK, Gradle

set -e

PROJECT_DIR="/tmp/simple-webview-app"
OUTPUT_APK="/home/ubuntu/remote-monitor/public/apks/SimpleWebViewApp-Base.apk"

echo "=== Criando APK base simples ==="

# Limpar projeto anterior
rm -rf "$PROJECT_DIR"
mkdir -p "$PROJECT_DIR"

cd "$PROJECT_DIR"

# Criar build.gradle
cat > build.gradle << 'EOF'
plugins {
    id 'com.android.application'
}

android {
    compileSdkVersion 30
    
    defaultConfig {
        applicationId "com.remote.webview"
        minSdkVersion 19  // Android 4.4+
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"
    }
    
    buildTypes {
        release {
            minifyEnabled false
        }
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.3.0'
}
EOF

# Criar AndroidManifest.xml
mkdir -p src/main
cat > src/main/AndroidManifest.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.remote.webview">

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

</manifest>
EOF

# Criar MainActivity.java
mkdir -p src/main/java/com/remote/webview
cat > src/main/java/com/remote/webview/MainActivity.java << 'EOF'
package com.remote.webview;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        WebView webView = new WebView(this);
        webView.setWebViewClient(new WebViewClient());
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        
        setContentView(webView);
        
        // URL padrão - será injetada via metadados
        String url = getIntent().getStringExtra("url");
        if (url == null) {
            url = "https://example.com";
        }
        webView.loadUrl(url);
    }
}
EOF

# Criar layout
mkdir -p src/main/res/layout
cat > src/main/res/layout/activity_main.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
EOF

# Criar strings.xml
mkdir -p src/main/res/values
cat > src/main/res/values/strings.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Remote Monitor</string>
</resources>
EOF

# Criar styles.xml
cat > src/main/res/values/styles.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>
</resources>
EOF

# Criar colors.xml
cat > src/main/res/values/colors.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#3F51B5</color>
    <color name="colorPrimaryDark">#303F9F</color>
    <color name="colorAccent">#FF4081</color>
</resources>
EOF

echo "✅ Estrutura do projeto criada"
echo "⚠️  Para compilar, execute:"
echo "   cd $PROJECT_DIR"
echo "   gradle assembleRelease"
echo ""
echo "O APK será gerado em:"
echo "   build/outputs/apk/release/app-release.apk"
