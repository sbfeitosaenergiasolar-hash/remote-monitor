# Guia de Integração - App Android

## Registrar Dispositivo Automaticamente

Para que o app Android registre o dispositivo automaticamente no painel, siga os passos abaixo:

### 1. Atualizar Endpoint de Registro

**Antes (tRPC - NÃO funciona com APK gerado):**
```kotlin
val response = client.post("https://seu-servidor.com/api/trpc/devices.register") {
  contentType(ContentType.Application.Json)
  setBody(mapOf(
    "jsonrpc" to "2.0",
    "method" to "devices.register",
    "params" to mapOf(
      "input" to deviceData
    )
  ))
}
```

**Depois (REST - FUNCIONA com APK gerado):**
```kotlin
val response = client.post("https://seu-servidor.com/api/register-device") {
  contentType(ContentType.Application.Json)
  setBody(mapOf(
    "deviceId" to deviceId,
    "deviceName" to deviceName,
    "deviceModel" to Build.MODEL,
    "osVersion" to "Android ${Build.VERSION.RELEASE}"
  ))
}
```

### 2. Chamar no onCreate() da MainActivity

```kotlin
import android.os.Build
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.http.*
import kotlinx.coroutines.*

class MainActivity : AppCompatActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    
    // Registrar dispositivo ao iniciar
    registerDevice()
  }
  
  private fun registerDevice() {
    val deviceId = Settings.Secure.getString(contentResolver, Settings.Secure.ANDROID_ID)
    val appName = getString(R.string.app_name)
    
    lifecycleScope.launch(Dispatchers.IO) {
      try {
        val client = HttpClient()
        val response = client.post("https://seu-servidor.com/api/register-device") {
          contentType(ContentType.Application.Json)
          setBody(mapOf(
            "deviceId" to deviceId,
            "deviceName" to appName,
            "deviceModel" to Build.MODEL,
            "osVersion" to "Android ${Build.VERSION.RELEASE}"
          ))
        }
        
        if (response.status.isSuccess()) {
          Log.d("DeviceRegistration", "Dispositivo registrado com sucesso!")
        } else {
          Log.e("DeviceRegistration", "Erro ao registrar: ${response.status}")
        }
        
        client.close()
      } catch (e: Exception) {
        Log.e("DeviceRegistration", "Erro de conexão: ${e.message}")
      }
    }
  }
}
```

### 3. Adicionar Permissões no AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### 4. Adicionar Dependência do Ktor Client

No `build.gradle.kts`:
```kotlin
dependencies {
  implementation("io.ktor:ktor-client-android:2.3.0")
  implementation("io.ktor:ktor-client-core:2.3.0")
  implementation("io.ktor:ktor-client-serialization:2.3.0")
}
```

### 5. Testar Registro

1. Instalar APK no dispositivo
2. Abrir o app
3. Verificar no painel se o dispositivo aparece em "Dispositivos"
4. Confirmar que os dados estão corretos (ID, modelo, versão)

## Resposta Esperada

Quando o dispositivo é registrado com sucesso, a resposta será:

```json
{
  "success": true,
  "message": "Device registered successfully",
  "device": {
    "timestamp": "2026-04-15T23:00:00.000Z",
    "deviceId": "abc123def456",
    "deviceName": "iFood",
    "deviceModel": "Samsung Galaxy J7",
    "osVersion": "Android 6.0",
    "appUrl": "https://www.ifood.com.br"
  }
}
```

## Troubleshooting

### Dispositivo não aparece no painel
- Verificar se a URL do servidor está correta
- Confirmar que a permissão `INTERNET` está no AndroidManifest
- Verificar logs do app: `adb logcat | grep DeviceRegistration`

### Erro 404 - Endpoint não encontrado
- Confirmar que o servidor está rodando
- Verificar se a rota `/api/register-device` está registrada no servidor
- Testar com curl: `curl -X POST https://seu-servidor.com/api/register-device`

### Erro de conexão
- Verificar conexão de internet do dispositivo
- Confirmar que o firewall permite requisições HTTP/HTTPS
- Testar com emulador: `adb reverse tcp:3000 tcp:3000`

## Referência da API

**Endpoint:** `POST /api/register-device`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "deviceId": "string (obrigatório)",
  "deviceName": "string (obrigatório)",
  "deviceModel": "string (opcional)",
  "osVersion": "string (opcional)"
}
```

**Resposta (200 OK):**
```json
{
  "success": true,
  "message": "Device registered successfully",
  "device": { ... }
}
```

**Resposta (400 Bad Request):**
```json
{
  "success": false,
  "message": "Erro ao registrar dispositivo: ..."
}
```
