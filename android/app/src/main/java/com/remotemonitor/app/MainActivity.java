package com.remotemonitor.app;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;

import org.json.JSONObject;

public class MainActivity extends Activity {
    private WebView webView;
    private String appUrl = "https://www.example.com";
    private String serverUrl = "https://remotemon-vhmaxpe6.manus.space";
    private String deviceId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Gerar ou recuperar deviceId
        deviceId = getOrCreateDeviceId();

        // Carregar configuração do APK
        loadAppConfig();

        // Registrar dispositivo no servidor
        registerDevice();

        // Configurar WebView
        setupWebView();
    }

    private String getOrCreateDeviceId() {
        SharedPreferences prefs = getSharedPreferences("app_prefs", Context.MODE_PRIVATE);
        String id = prefs.getString("device_id", null);
        
        if (id == null) {
            id = UUID.randomUUID().toString();
            prefs.edit().putString("device_id", id).apply();
        }
        
        return id;
    }

    private void loadAppConfig() {
        try {
            // Tentar carregar configuração do assets
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(getAssets().open("app-config.json"))
            );
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            reader.close();

            JSONObject config = new JSONObject(sb.toString());
            appUrl = config.optString("appUrl", appUrl);
            
            // Detectar servidor baseado na URL do app
            if (appUrl.contains("localhost") || appUrl.contains("127.0.0.1")) {
                serverUrl = "http://localhost:3000";
            } else if (appUrl.contains("manus.space")) {
                serverUrl = "https://remotemon-vhmaxpe6.manus.space";
            }
        } catch (Exception e) {
            // Usar padrões se não conseguir carregar
            e.printStackTrace();
        }
    }

    private void registerDevice() {
        new Thread(() -> {
            try {
                String registerUrl = serverUrl + "/api/register-device";
                URL url = new URL(registerUrl);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setDoOutput(true);

                // Preparar dados do dispositivo
                JSONObject deviceData = new JSONObject();
                deviceData.put("deviceId", deviceId);
                deviceData.put("deviceModel", Build.MODEL);
                deviceData.put("androidVersion", Build.VERSION.RELEASE);
                deviceData.put("appName", getAppName());
                deviceData.put("installedAt", System.currentTimeMillis());

                // Enviar dados
                OutputStream os = conn.getOutputStream();
                os.write(deviceData.toString().getBytes());
                os.flush();
                os.close();

                // Verificar resposta
                int responseCode = conn.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    runOnUiThread(() -> {
                        Toast.makeText(MainActivity.this, "Dispositivo registrado!", Toast.LENGTH_SHORT).show();
                    });
                }

                conn.disconnect();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }

    private String getAppName() {
        try {
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(getAssets().open("app-config.json"))
            );
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            reader.close();

            JSONObject config = new JSONObject(sb.toString());
            return config.optString("appName", "App");
        } catch (Exception e) {
            return "App";
        }
    }

    private void setupWebView() {
        webView = findViewById(R.id.webview);
        
        // Configurar WebView
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setDatabaseEnabled(true);
        
        // Permitir acesso a arquivos locais
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setAllowContentAccess(true);

        // Configurar cliente
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });

        // Carregar URL
        webView.loadUrl(appUrl);
    }
}
