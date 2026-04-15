package com.remotemonitor.app

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.util.Log
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import java.util.*
import java.util.concurrent.TimeUnit

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    private lateinit var prefs: SharedPreferences
    private val TAG = "RemoteMonitor"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        prefs = getSharedPreferences("app_config", Context.MODE_PRIVATE)
        webView = findViewById(R.id.webview)

        // Register device on first launch
        if (prefs.getBoolean("first_launch", true)) {
            registerDevice()
            prefs.edit().putBoolean("first_launch", false).apply()
        }

        // Load URL from SharedPreferences or use default
        val appUrl = prefs.getString("app_url", "https://www.ifood.com.br/") ?: "https://www.ifood.com.br/"
        loadWebView(appUrl)
    }

    private fun registerDevice() {
        Thread {
            try {
                val deviceId = getDeviceId()
                val deviceName = prefs.getString("app_name", "iFood") ?: "iFood"
                val deviceModel = Build.MODEL
                val osVersion = Build.VERSION.RELEASE

                val registrationData = mapOf(
                    "deviceId" to deviceId,
                    "deviceName" to deviceName,
                    "deviceModel" to deviceModel,
                    "osVersion" to osVersion,
                    "appUrl" to (prefs.getString("app_url", "") ?: "")
                )

                val client = OkHttpClient.Builder()
                    .connectTimeout(10, TimeUnit.SECONDS)
                    .readTimeout(10, TimeUnit.SECONDS)
                    .build()

                val json = Gson().toJson(registrationData)
                val requestBody = json.toRequestBody()

                val request = Request.Builder()
                    .url("https://remotemon-vhmaxpe6.manus.space/api/trpc/devices.register")
                    .post(requestBody)
                    .addHeader("Content-Type", "application/json")
                    .build()

                val response = client.newCall(request).execute()
                if (response.isSuccessful) {
                    Log.d(TAG, "Device registered successfully: $deviceId")
                } else {
                    Log.e(TAG, "Failed to register device: ${response.code}")
                }
                response.close()
            } catch (e: Exception) {
                Log.e(TAG, "Error registering device: ${e.message}")
            }
        }.start()
    }

    private fun getDeviceId(): String {
        var deviceId = prefs.getString("device_id", "")
        if (deviceId.isNullOrEmpty()) {
            deviceId = UUID.randomUUID().toString()
            prefs.edit().putString("device_id", deviceId).apply()
        }
        return deviceId
    }

    private fun loadWebView(url: String) {
        webView.apply {
            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                databaseEnabled = true
            }
            webViewClient = WebViewClient()
            loadUrl(url)
        }
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
