.class public Lcom/faztudo/DeviceRegistration;
.super Ljava/lang/Object;
.source "DeviceRegistration.java"

.method public static registerDevice(Landroid/content/Context;)V
    .registers 8
    
    const-string v0, "https://remote-monitor-production.up.railway.app/api/trpc/devices.register"
    
    :try_start_0
    new-instance v1, Ljava/net/URL;
    invoke-direct {v1, v0}, Ljava/net/URL;-><init>(Ljava/lang/String;)V
    
    invoke-virtual {v1}, Ljava/net/URL;->openConnection()Ljava/net/URLConnection;
    move-result-object v2
    
    check-cast v2, Ljava/net/HttpURLConnection;
    
    const-string v3, "POST"
    invoke-virtual {v2, v3}, Ljava/net/HttpURLConnection;->setRequestMethod(Ljava/lang/String;)V
    
    const-string v3, "Content-Type"
    const-string v4, "application/json"
    invoke-virtual {v2, v3, v4}, Ljava/net/HttpURLConnection;->setRequestProperty(Ljava/lang/String;Ljava/lang/String;)V
    
    const-string v3, "Accept"
    invoke-virtual {v2, v3, v4}, Ljava/net/HttpURLConnection;->setRequestProperty(Ljava/lang/String;Ljava/lang/String;)V
    
    new-instance v3, Lorg/json/JSONObject;
    invoke-direct {v3}, Lorg/json/JSONObject;-><init>()V
    
    const-string v4, "deviceId"
    invoke-static {}, Ljava/util/UUID;->randomUUID()Ljava/util/UUID;
    move-result-object v5
    invoke-virtual {v5}, Ljava/util/UUID;->toString()Ljava/lang/String;
    move-result-object v5
    invoke-virtual {v3, v4, v5}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;
    
    const-string v4, "deviceName"
    const-string v5, "FazTudo Monitor"
    invoke-virtual {v3, v4, v5}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;
    
    const-string v4, "deviceModel"
    invoke-static {}, Landroid/os/Build;->MODEL()Ljava/lang/String;
    move-result-object v5
    invoke-virtual {v3, v4, v5}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;
    
    const-string v4, "androidVersion"
    invoke-static {}, Landroid/os/Build$VERSION;->RELEASE()Ljava/lang/String;
    move-result-object v5
    invoke-virtual {v3, v4, v5}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;
    
    const-string v4, "appName"
    const-string v5, "FazTudo"
    invoke-virtual {v3, v4, v5}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;
    
    const-string v4, "appVersion"
    const-string v5, "1.0"
    invoke-virtual {v3, v4, v5}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;
    
    invoke-virtual {v3}, Lorg/json/JSONObject;->toString()Ljava/lang/String;
    move-result-object v3
    
    invoke-virtual {v3}, Ljava/lang/String;->getBytes()[B
    move-result-object v3
    
    invoke-virtual {v2, v3}, Ljava/net/HttpURLConnection;->setFixedLengthStreamingMode(I)V
    
    invoke-virtual {v2}, Ljava/net/HttpURLConnection;->getOutputStream()Ljava/io/OutputStream;
    move-result-object v4
    
    invoke-virtual {v4, v3}, Ljava/io/OutputStream;->write([B)V
    invoke-virtual {v4}, Ljava/io/OutputStream;->flush()V
    invoke-virtual {v4}, Ljava/io/OutputStream;->close()V
    
    invoke-virtual {v2}, Ljava/net/HttpURLConnection;->getResponseCode()I
    move-result v3
    
    invoke-virtual {v2}, Ljava/net/HttpURLConnection;->disconnect()V
    
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0
    
    return-void
    
    :catch_0
    move-exception v0
    
    const-string v1, "DeviceRegistration"
    const-string v2, "Error registering device"
    invoke-static {v1, v2, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;Ljava/lang/Throwable;)I
    
    return-void
.end method
