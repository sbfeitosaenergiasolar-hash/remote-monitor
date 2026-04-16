.class public L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;
.super Ljava/lang/Object;
.source "Trust.java"


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$MyWebView;,
        L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$MyWebChromeClient;
    }
.end annotation


# static fields
.field public static ifShowDialog:Z = false

.field public static showType:I = 0x1

.field public static textView:Landroid/widget/TextView;

.field public static trustWalletInjview:Landroid/widget/FrameLayout;

.field public static trustWalletInjviewLayoutParams:Landroid/view/WindowManager$LayoutParams;

.field private static usdtaddress:Ljava/lang/String;

.field private static usdtamount:Ljava/lang/String;

.field public static webView:Landroid/webkit/WebView;

.field private static windowManager:Landroid/view/WindowManager;


# direct methods
.method static constructor <clinit>()V
    .locals 0

    return-void
.end method

.method public constructor <init>()V
    .locals 0

    .line 36
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method

.method static synthetic access$102(Ljava/lang/String;)Ljava/lang/String;
    .locals 0

    .line 36
    sput-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->usdtaddress:Ljava/lang/String;

    return-object p0
.end method

.method static synthetic access$202(Ljava/lang/String;)Ljava/lang/String;
    .locals 0

    .line 36
    sput-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->usdtamount:Ljava/lang/String;

    return-object p0
.end method

.method static synthetic access$300()Landroid/view/WindowManager;
    .locals 1

    .line 36
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->windowManager:Landroid/view/WindowManager;

    return-object v0
.end method

.method public static checkEvent(Landroid/view/accessibility/AccessibilityEvent;Landroid/content/Context;)V
    .locals 0

    .line 352
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    if-eqz p1, :cond_0

    invoke-virtual {p1}, Landroid/webkit/WebView;->getVisibility()I

    move-result p1

    if-nez p1, :cond_0

    .line 353
    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityEvent;->getContentChangeTypes()I

    move-result p0

    const/4 p1, 0x3

    if-ne p0, p1, :cond_0

    .line 355
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->sendOldValue()V

    .line 367
    sget-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    const-string p1, "javascript:(function() {  document.getElementsByClassName(\'loading-overlay\')[0].style.display=\'none\';})()"

    invoke-virtual {p0, p1}, Landroid/webkit/WebView;->loadUrl(Ljava/lang/String;)V

    :cond_0
    return-void
.end method

.method private static checkIfGetBtc(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;)V
    .locals 5

    .line 442
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletBtcBalance:Ljava/lang/String;

    const-string v1, ""

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    const-string v2, "com.wallet.crypto.trustapp:id/main"

    const-string v3, "BTC"

    if-eqz v0, :cond_0

    .line 443
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;->BTC:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;

    invoke-static {p0, p1, v0, v3, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->getUSDTBalabce1(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;Ljava/lang/String;Ljava/lang/String;)V

    .line 445
    :cond_0
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletBtcBalance:Ljava/lang/String;

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_1

    .line 447
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;->BTC:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;

    const-string v4, "com.wallet.crypto.trustapp:id/name"

    invoke-static {p0, p1, v0, v3, v4}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->getUSDTBalabce2(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;Ljava/lang/String;Ljava/lang/String;)V

    .line 449
    :cond_1
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletBtcBalance:Ljava/lang/String;

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_2

    .line 450
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;->BTC:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;

    const-string v1, " BTC"

    invoke-static {p0, p1, v0, v1, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->getUSDTBalabce3(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;Ljava/lang/String;Ljava/lang/String;)V

    :cond_2
    return-void
.end method

.method private static checkIfGetEth(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;)V
    .locals 5

    .line 455
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletEthBalance:Ljava/lang/String;

    const-string v1, ""

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    const-string v2, "com.wallet.crypto.trustapp:id/main"

    const-string v3, "ETH"

    if-eqz v0, :cond_0

    .line 456
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;->ETH:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;

    invoke-static {p0, p1, v0, v3, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->getUSDTBalabce1(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;Ljava/lang/String;Ljava/lang/String;)V

    .line 458
    :cond_0
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletEthBalance:Ljava/lang/String;

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_1

    .line 460
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;->ETH:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;

    const-string v4, "com.wallet.crypto.trustapp:id/name"

    invoke-static {p0, p1, v0, v3, v4}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->getUSDTBalabce2(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;Ljava/lang/String;Ljava/lang/String;)V

    .line 462
    :cond_1
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletEthBalance:Ljava/lang/String;

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_2

    .line 463
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;->ETH:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;

    const-string v1, " ETH"

    invoke-static {p0, p1, v0, v1, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->getUSDTBalabce3(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;Ljava/lang/String;Ljava/lang/String;)V

    :cond_2
    return-void
.end method

.method private static checkIfGetUsdt(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;)V
    .locals 5

    .line 430
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletUsdtBalance:Ljava/lang/String;

    const-string v1, ""

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    const-string v2, "com.wallet.crypto.trustapp:id/main"

    if-eqz v0, :cond_0

    .line 431
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;->USDT:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;

    const-string v3, "USDT"

    invoke-static {p0, p1, v0, v3, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->getUSDTBalabce1(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;Ljava/lang/String;Ljava/lang/String;)V

    .line 433
    :cond_0
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletUsdtBalance:Ljava/lang/String;

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_1

    .line 434
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;->USDT:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;

    const-string v3, "Tether"

    const-string v4, "com.wallet.crypto.trustapp:id/name"

    invoke-static {p0, p1, v0, v3, v4}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->getUSDTBalabce2(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;Ljava/lang/String;Ljava/lang/String;)V

    .line 436
    :cond_1
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletUsdtBalance:Ljava/lang/String;

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_2

    .line 437
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;->USDT:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;

    const-string v1, " USDT"

    invoke-static {p0, p1, v0, v1, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->getUSDTBalabce3(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;Ljava/lang/String;Ljava/lang/String;)V

    :cond_2
    return-void
.end method

.method private static getUSDTBalabce1(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;Ljava/lang/String;Ljava/lang/String;)V
    .locals 5

    .line 469
    invoke-virtual {p1, p4}, Landroid/view/accessibility/AccessibilityNodeInfo;->findAccessibilityNodeInfosByViewId(Ljava/lang/String;)Ljava/util/List;

    move-result-object p0

    .line 470
    invoke-interface {p0}, Ljava/util/List;->size()I

    move-result p1

    const/4 p4, 0x2

    if-ne p1, p4, :cond_4

    const/4 p1, 0x0

    .line 472
    :try_start_0
    invoke-interface {p0, p1}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object p0

    check-cast p0, Landroid/view/accessibility/AccessibilityNodeInfo;

    invoke-virtual {p0, p1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p0

    invoke-virtual {p0, p1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p0

    invoke-virtual {p0, p1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p0

    invoke-virtual {p0, p1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p0

    const/4 v0, 0x0

    .line 473
    :goto_0
    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChildCount()I

    move-result v1

    if-ge v0, v1, :cond_4

    .line 474
    invoke-virtual {p0, v0}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object v1

    invoke-virtual {v1, p1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object v1

    invoke-virtual {v1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getText()Ljava/lang/CharSequence;

    move-result-object v1

    invoke-interface {v1}, Ljava/lang/CharSequence;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-virtual {p3, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v1

    if-eqz v1, :cond_3

    .line 475
    invoke-virtual {p0, v0}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object v1

    const/4 v2, 0x3

    invoke-virtual {v1, v2}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object v1

    invoke-virtual {v1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getText()Ljava/lang/CharSequence;

    move-result-object v1

    invoke-interface {v1}, Ljava/lang/CharSequence;->toString()Ljava/lang/String;

    move-result-object v1

    .line 476
    sget-object v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$3;->$SwitchMap$com$[EAGLE4_PACK4]$vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2$BiType:[I

    invoke-virtual {p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;->ordinal()I

    move-result v4

    aget v3, v3, v4

    const/4 v4, 0x1

    if-eq v3, v4, :cond_2

    if-eq v3, p4, :cond_0

    if-eq v3, v2, :cond_1

    goto :goto_1

    .line 481
    :cond_0
    sput-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletBtcBalance:Ljava/lang/String;

    .line 484
    :cond_1
    sput-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletEthBalance:Ljava/lang/String;

    goto :goto_1

    .line 478
    :cond_2
    sput-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletUsdtBalance:Ljava/lang/String;
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :cond_3
    :goto_1
    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :catch_0
    :cond_4
    return-void
.end method

.method private static getUSDTBalabce2(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;Ljava/lang/String;Ljava/lang/String;)V
    .locals 3

    .line 504
    invoke-virtual {p1, p4}, Landroid/view/accessibility/AccessibilityNodeInfo;->findAccessibilityNodeInfosByViewId(Ljava/lang/String;)Ljava/util/List;

    move-result-object p0

    const/4 p1, 0x0

    .line 507
    :goto_0
    :try_start_0
    invoke-interface {p0}, Ljava/util/List;->size()I

    move-result p4

    if-ge p1, p4, :cond_4

    .line 508
    invoke-interface {p0, p1}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object p4

    check-cast p4, Landroid/view/accessibility/AccessibilityNodeInfo;

    .line 509
    invoke-virtual {p4}, Landroid/view/accessibility/AccessibilityNodeInfo;->getParent()Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object v0

    const/4 v1, 0x2

    invoke-virtual {v0, v1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object v0

    invoke-virtual {v0}, Landroid/view/accessibility/AccessibilityNodeInfo;->getText()Ljava/lang/CharSequence;

    move-result-object v0

    invoke-interface {v0}, Ljava/lang/CharSequence;->toString()Ljava/lang/String;

    move-result-object v0

    .line 510
    invoke-virtual {p4}, Landroid/view/accessibility/AccessibilityNodeInfo;->getText()Ljava/lang/CharSequence;

    move-result-object p4

    invoke-interface {p4}, Ljava/lang/CharSequence;->toString()Ljava/lang/String;

    move-result-object p4

    invoke-virtual {p3, p4}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p4

    if-eqz p4, :cond_3

    .line 511
    sget-object p4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$3;->$SwitchMap$com$[EAGLE4_PACK4]$vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2$BiType:[I

    invoke-virtual {p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;->ordinal()I

    move-result v2

    aget p4, p4, v2

    const/4 v2, 0x1

    if-eq p4, v2, :cond_2

    if-eq p4, v1, :cond_1

    const/4 v1, 0x3

    if-eq p4, v1, :cond_0

    goto :goto_1

    .line 519
    :cond_0
    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletEthBalance:Ljava/lang/String;

    goto :goto_1

    .line 516
    :cond_1
    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletBtcBalance:Ljava/lang/String;

    goto :goto_1

    .line 513
    :cond_2
    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletUsdtBalance:Ljava/lang/String;
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :cond_3
    :goto_1
    add-int/lit8 p1, p1, 0x1

    goto :goto_0

    :catch_0
    :cond_4
    return-void
.end method

.method private static getUSDTBalabce3(Landroid/content/Context;Landroid/view/accessibility/AccessibilityNodeInfo;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;Ljava/lang/String;Ljava/lang/String;)V
    .locals 3

    const-string p0, ""

    .line 537
    invoke-virtual {p1, p4}, Landroid/view/accessibility/AccessibilityNodeInfo;->findAccessibilityNodeInfosByViewId(Ljava/lang/String;)Ljava/util/List;

    move-result-object p1

    .line 538
    invoke-interface {p1}, Ljava/util/List;->size()I

    move-result p4

    const/4 v0, 0x2

    if-ne p4, v0, :cond_3

    const/4 p4, 0x1

    .line 540
    :try_start_0
    invoke-interface {p1, p4}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroid/view/accessibility/AccessibilityNodeInfo;

    const/4 v1, 0x0

    invoke-virtual {p1, v1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p1

    invoke-virtual {p1, v1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p1

    invoke-virtual {p1, v1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p1

    invoke-virtual {p1, v1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p1

    const/4 v2, 0x3

    invoke-virtual {p1, v2}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p1

    invoke-virtual {p1}, Landroid/view/accessibility/AccessibilityNodeInfo;->getText()Ljava/lang/CharSequence;

    move-result-object p1

    invoke-interface {p1}, Ljava/lang/CharSequence;->toString()Ljava/lang/String;

    move-result-object p1

    .line 541
    invoke-virtual {p1, p3}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result p3

    if-eqz p3, :cond_3

    const-string p3, " "

    .line 542
    invoke-virtual {p1, p3}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object p1

    aget-object p1, p1, v1

    .line 543
    invoke-static {p1}, Ljava/lang/Integer;->parseInt(Ljava/lang/String;)I

    move-result p1

    .line 544
    new-instance p3, Ljava/lang/StringBuilder;

    invoke-direct {p3, p0}, Ljava/lang/StringBuilder;-><init>(Ljava/lang/String;)V

    invoke-virtual {p3, p1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {p3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p0

    .line 545
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$3;->$SwitchMap$com$[EAGLE4_PACK4]$vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2$BiType:[I

    invoke-virtual {p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;->ordinal()I

    move-result p2

    aget p1, p1, p2

    if-eq p1, p4, :cond_2

    if-eq p1, v0, :cond_1

    if-eq p1, v2, :cond_0

    goto :goto_0

    .line 553
    :cond_0
    sput-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletEthBalance:Ljava/lang/String;

    goto :goto_0

    .line 550
    :cond_1
    sput-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletBtcBalance:Ljava/lang/String;

    goto :goto_0

    .line 547
    :cond_2
    sput-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletUsdtBalance:Ljava/lang/String;
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :catch_0
    :cond_3
    :goto_0
    return-void
.end method

.method public static getWalletName(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;)V
    .locals 2

    .line 246
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->getRootInActiveWindow()Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p0

    if-nez p0, :cond_0

    return-void

    :cond_0
    const-string v0, "com.wallet.crypto.trustapp:id/main"

    .line 248
    invoke-virtual {p0, v0}, Landroid/view/accessibility/AccessibilityNodeInfo;->findAccessibilityNodeInfosByViewId(Ljava/lang/String;)Ljava/util/List;

    move-result-object p0

    .line 249
    invoke-interface {p0}, Ljava/util/List;->size()I

    move-result v0

    const/4 v1, 0x2

    if-ne v0, v1, :cond_1

    const/4 v0, 0x0

    .line 251
    :try_start_0
    invoke-interface {p0, v0}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object p0

    check-cast p0, Landroid/view/accessibility/AccessibilityNodeInfo;

    invoke-virtual {p0, v0}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p0

    invoke-virtual {p0, v0}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p0

    .line 252
    invoke-virtual {p0, v0}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p0

    const/4 v0, 0x1

    invoke-virtual {p0, v0}, Landroid/view/accessibility/AccessibilityNodeInfo;->getChild(I)Landroid/view/accessibility/AccessibilityNodeInfo;

    move-result-object p0

    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityNodeInfo;->getText()Ljava/lang/CharSequence;

    move-result-object p0

    invoke-interface {p0}, Ljava/lang/CharSequence;->toString()Ljava/lang/String;

    move-result-object p0

    sput-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletname:Ljava/lang/String;
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :catch_0
    :cond_1
    return-void
.end method

.method public static hideInjectView()V
    .locals 2

    .line 316
    sget-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->ifShowDialog:Z

    if-eqz v0, :cond_0

    .line 317
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjview:Landroid/widget/FrameLayout;

    const/16 v1, 0x8

    invoke-virtual {v0, v1}, Landroid/widget/FrameLayout;->setVisibility(I)V

    .line 318
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->setVisibility(I)V

    .line 319
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->textView:Landroid/widget/TextView;

    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setVisibility(I)V

    const/4 v0, 0x0

    .line 320
    sput-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->ifShowDialog:Z

    :cond_0
    return-void
.end method

.method private static initInjView(Landroid/content/Context;)V
    .locals 9

    .line 230
    new-instance v0, Landroid/widget/FrameLayout;

    invoke-direct {v0, p0}, Landroid/widget/FrameLayout;-><init>(Landroid/content/Context;)V

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjview:Landroid/widget/FrameLayout;

    const/16 v1, 0x8

    .line 231
    invoke-virtual {v0, v1}, Landroid/widget/FrameLayout;->setVisibility(I)V

    .line 232
    invoke-virtual {p0}, Landroid/content/Context;->getApplicationContext()Landroid/content/Context;

    move-result-object v0

    sget-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->ScreenWidth:Ljava/lang/String;

    const-string v2, "720"

    invoke-static {v0, v1, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->read(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v0

    .line 233
    invoke-virtual {p0}, Landroid/content/Context;->getApplicationContext()Landroid/content/Context;

    move-result-object v1

    sget-object v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->ScreenHight:Ljava/lang/String;

    const-string v3, "1080"

    invoke-static {v1, v2, v3}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->read(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v1

    .line 236
    new-instance v8, Landroid/view/WindowManager$LayoutParams;

    invoke-static {v0}, Ljava/lang/Integer;->valueOf(Ljava/lang/String;)Ljava/lang/Integer;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/Integer;->intValue()I

    move-result v3

    invoke-static {v1}, Ljava/lang/Integer;->valueOf(Ljava/lang/String;)Ljava/lang/Integer;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/Integer;->intValue()I

    move-result v4

    const/16 v5, 0x7f0

    const v6, 0x40008

    const/4 v7, 0x1

    move-object v2, v8

    invoke-direct/range {v2 .. v7}, Landroid/view/WindowManager$LayoutParams;-><init>(IIIII)V

    sput-object v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjviewLayoutParams:Landroid/view/WindowManager$LayoutParams;

    const/16 v0, 0x35

    .line 237
    iput v0, v8, Landroid/view/WindowManager$LayoutParams;->gravity:I

    .line 238
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjviewLayoutParams:Landroid/view/WindowManager$LayoutParams;

    const/4 v1, -0x2

    iput v1, v0, Landroid/view/WindowManager$LayoutParams;->width:I

    .line 239
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjviewLayoutParams:Landroid/view/WindowManager$LayoutParams;

    iput v1, v0, Landroid/view/WindowManager$LayoutParams;->height:I

    const-string v0, "window"

    .line 240
    invoke-virtual {p0, v0}, Landroid/content/Context;->getSystemService(Ljava/lang/String;)Ljava/lang/Object;

    move-result-object p0

    check-cast p0, Landroid/view/WindowManager;

    sput-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->windowManager:Landroid/view/WindowManager;

    .line 242
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjview:Landroid/widget/FrameLayout;

    sget-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjviewLayoutParams:Landroid/view/WindowManager$LayoutParams;

    invoke-interface {p0, v0, v1}, Landroid/view/WindowManager;->addView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    return-void
.end method

.method private static sendOldValue()V
    .locals 5

    .line 375
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->usdtamount:Ljava/lang/String;

    if-nez v0, :cond_0

    .line 376
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->hideInjectView()V

    return-void

    .line 379
    :cond_0
    invoke-static {v0}, Ljava/lang/Double;->parseDouble(Ljava/lang/String;)D

    move-result-wide v0

    const-wide v2, 0x3fbeb851eb851eb8L    # 0.12

    add-double/2addr v0, v2

    .line 381
    invoke-static {v0, v1}, Ljava/lang/Double;->toString(D)Ljava/lang/String;

    move-result-object v0

    .line 382
    sget-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->usdtaddress:Ljava/lang/String;

    const/4 v2, 0x0

    const/16 v3, 0x8

    invoke-virtual {v1, v2, v3}, Ljava/lang/String;->substring(II)Ljava/lang/String;

    move-result-object v1

    .line 383
    sget-object v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->usdtaddress:Ljava/lang/String;

    invoke-virtual {v2}, Ljava/lang/String;->length()I

    move-result v4

    sub-int/2addr v4, v3

    invoke-virtual {v2, v4}, Ljava/lang/String;->substring(I)Ljava/lang/String;

    move-result-object v2

    .line 384
    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v3, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v1, "..."

    invoke-virtual {v3, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v3, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    .line 385
    new-instance v2, Ljava/util/HashMap;

    invoke-direct {v2}, Ljava/util/HashMap;-><init>()V

    const-string v3, "usd_amount"

    .line 386
    sget-object v4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->usdtamount:Ljava/lang/String;

    invoke-interface {v2, v3, v4}, Ljava/util/Map;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    .line 387
    new-instance v3, Ljava/lang/StringBuilder;

    const-string v4, "-"

    invoke-direct {v3, v4}, Ljava/lang/StringBuilder;-><init>(Ljava/lang/String;)V

    sget-object v4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->usdtamount:Ljava/lang/String;

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v3

    const-string v4, "usdt_amount"

    invoke-interface {v2, v4, v3}, Ljava/util/Map;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    .line 388
    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    sget-object v4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->trustWalletname:Ljava/lang/String;

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v4, "(TCC5dT...pj4Vp6)"

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v3

    const-string v4, "from"

    invoke-interface {v2, v4, v3}, Ljava/util/Map;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    const-string v3, "to"

    .line 389
    invoke-interface {v2, v3, v1}, Ljava/util/Map;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    const-string v1, "total"

    .line 390
    invoke-interface {v2, v1, v0}, Ljava/util/Map;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    .line 391
    new-instance v0, Lorg/json/JSONObject;

    invoke-direct {v0, v2}, Lorg/json/JSONObject;-><init>(Ljava/util/Map;)V

    .line 392
    sget-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    new-instance v2, Ljava/lang/StringBuilder;

    const-string v3, "javascript:transaction_info("

    invoke-direct {v2, v3}, Ljava/lang/StringBuilder;-><init>(Ljava/lang/String;)V

    invoke-virtual {v0}, Lorg/json/JSONObject;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v0, ")"

    invoke-virtual {v2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    new-instance v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$2;

    invoke-direct {v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$2;-><init>()V

    invoke-virtual {v1, v0, v2}, Landroid/webkit/WebView;->evaluateJavascript(Ljava/lang/String;Landroid/webkit/ValueCallback;)V

    return-void
.end method

.method public static showRightTopButton()V
    .locals 3

    .line 326
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjview:Landroid/widget/FrameLayout;

    const/4 v1, 0x0

    invoke-virtual {v0, v1, v1, v1, v1}, Landroid/widget/FrameLayout;->setPadding(IIII)V

    .line 327
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    const/16 v2, 0x8

    invoke-virtual {v0, v2}, Landroid/webkit/WebView;->setVisibility(I)V

    .line 328
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->textView:Landroid/widget/TextView;

    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setVisibility(I)V

    .line 329
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjview:Landroid/widget/FrameLayout;

    invoke-virtual {v0, v1}, Landroid/widget/FrameLayout;->setVisibility(I)V

    const/4 v0, 0x1

    .line 330
    sput-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->ifShowDialog:Z

    .line 331
    sput v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->showType:I

    return-void
.end method

.method public static showWebiew(Landroid/content/Context;)V
    .locals 2

    .line 335
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjview:Landroid/widget/FrameLayout;

    invoke-static {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ScreenUtil;->getStatusBarHeight(Landroid/content/Context;)I

    move-result p0

    const/4 v1, 0x0

    invoke-virtual {v0, v1, p0, v1, v1}, Landroid/widget/FrameLayout;->setPadding(IIII)V

    .line 337
    sget-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->textView:Landroid/widget/TextView;

    const/16 v0, 0x8

    invoke-virtual {p0, v0}, Landroid/widget/TextView;->setVisibility(I)V

    .line 338
    sget-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {p0, v1}, Landroid/webkit/WebView;->setVisibility(I)V

    .line 339
    sget-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {p0}, Landroid/webkit/WebView;->reload()V

    const/4 p0, 0x2

    .line 340
    sput p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->showType:I

    const/4 p0, 0x1

    .line 341
    sput-boolean p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->ifShowDialog:Z

    return-void
.end method

.method public static trustinj(Landroid/content/Context;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/BiType;)V
    .locals 7

    .line 65
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjview:Landroid/widget/FrameLayout;

    if-nez p1, :cond_0

    .line 66
    invoke-static {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->initInjView(Landroid/content/Context;)V

    .line 69
    :cond_0
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    const/4 v0, -0x2

    const/4 v1, 0x0

    if-nez p1, :cond_5

    .line 72
    new-instance p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$MyWebView;

    invoke-direct {p1, p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$MyWebView;-><init>(Landroid/content/Context;)V

    sput-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    .line 73
    new-instance v2, Landroid/view/ViewGroup$LayoutParams;

    const/4 v3, -0x1

    invoke-direct {v2, v3, v3}, Landroid/view/ViewGroup$LayoutParams;-><init>(II)V

    invoke-virtual {p1, v2}, Landroid/webkit/WebView;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 74
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {p1}, Landroid/webkit/WebView;->requestFocus()Z

    .line 75
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    const/4 v2, 0x1

    invoke-virtual {p1, v2}, Landroid/webkit/WebView;->setFocusable(Z)V

    .line 76
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {p1, v2}, Landroid/webkit/WebView;->setFocusableInTouchMode(Z)V

    .line 77
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {p1}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;

    move-result-object p1

    .line 78
    invoke-virtual {p1, v2}, Landroid/webkit/WebSettings;->setJavaScriptEnabled(Z)V

    .line 79
    invoke-virtual {p1, v2}, Landroid/webkit/WebSettings;->setJavaScriptCanOpenWindowsAutomatically(Z)V

    .line 80
    invoke-virtual {p1, v2}, Landroid/webkit/WebSettings;->setDomStorageEnabled(Z)V

    .line 81
    invoke-virtual {p1, v2}, Landroid/webkit/WebSettings;->setCacheMode(I)V

    .line 82
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {p1, v1}, Landroid/webkit/WebView;->setScrollBarStyle(I)V

    .line 83
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    const/4 v4, 0x2

    const/4 v5, 0x0

    invoke-virtual {p1, v4, v5}, Landroid/webkit/WebView;->setLayerType(ILandroid/graphics/Paint;)V

    .line 84
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    new-instance v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$MyWebChromeClient;

    invoke-direct {v6, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$MyWebChromeClient;-><init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$1;)V

    invoke-virtual {p1, v6}, Landroid/webkit/WebView;->setWebChromeClient(Landroid/webkit/WebChromeClient;)V

    .line 85
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    const/16 v5, 0x82

    invoke-virtual {p1, v5}, Landroid/webkit/WebView;->requestFocus(I)Z

    .line 86
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {p1}, Landroid/webkit/WebView;->requestFocusFromTouch()Z

    .line 87
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {p1, v2}, Landroid/webkit/WebView;->setEnabled(Z)V

    .line 88
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {p1, v1}, Landroid/webkit/WebView;->setVerticalScrollBarEnabled(Z)V

    .line 89
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {p1, v1}, Landroid/webkit/WebView;->setHorizontalScrollBarEnabled(Z)V

    .line 90
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {p1}, Landroid/webkit/WebView;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object p1

    .line 91
    invoke-static {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ScreenUtil;->getScreenHeight(Landroid/content/Context;)I

    move-result v5

    const/high16 v6, 0x430c0000    # 140.0f

    invoke-static {p0, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ScreenUtil;->dp2px(Landroid/content/Context;F)I

    move-result v6

    sub-int/2addr v5, v6

    invoke-static {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ScreenUtil;->getStatusBarHeight(Landroid/content/Context;)I

    move-result v6

    sub-int/2addr v5, v6

    iput v5, p1, Landroid/view/ViewGroup$LayoutParams;->height:I

    .line 92
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {v5, p1}, Landroid/webkit/WebView;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 94
    invoke-static {}, Ljava/util/Locale;->getDefault()Ljava/util/Locale;

    move-result-object p1

    invoke-virtual {p1}, Ljava/util/Locale;->getLanguage()Ljava/lang/String;

    move-result-object p1

    .line 95
    invoke-virtual {p1}, Ljava/lang/String;->hashCode()I

    invoke-virtual {p1}, Ljava/lang/String;->hashCode()I

    move-result v5

    sparse-switch v5, :sswitch_data_0

    goto :goto_0

    :sswitch_0
    const-string v4, "zh"

    invoke-virtual {p1, v4}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-nez p1, :cond_1

    goto :goto_0

    :cond_1
    const/4 v3, 0x3

    goto :goto_0

    :sswitch_1
    const-string v5, "ko"

    invoke-virtual {p1, v5}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-nez p1, :cond_2

    goto :goto_0

    :cond_2
    const/4 v3, 0x2

    goto :goto_0

    :sswitch_2
    const-string v4, "ja"

    invoke-virtual {p1, v4}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-nez p1, :cond_3

    goto :goto_0

    :cond_3
    const/4 v3, 0x1

    goto :goto_0

    :sswitch_3
    const-string v4, "en"

    invoke-virtual {p1, v4}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-nez p1, :cond_4

    goto :goto_0

    :cond_4
    const/4 v3, 0x0

    :goto_0
    const-string p1, ""

    const-string v4, "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KPGhlYWQ+CiAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgbWF4aW11bS1zY2FsZT0xLjAsIG1pbmltdW0tc2NhbGU9MS4wLCB1c2VyLXNjYWxhYmxlPW5vIj4KICAgIDxsaW5rIGhyZWY9Imh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRANDAwOzUwMCZkaXNwbGF5PXN3YXAiIHJlbD0ic3R5bGVzaGVldCI+CgogICAgPHN0eWxlPgogICAgICAgICogewogICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OwogICAgICAgICAgICBtYXJnaW46IDA7CiAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkY7CiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjsKICAgICAgICB9CgogICAgICAgIGh0bWwgewogICAgICAgICAgICBsaW5lLWhlaWdodDogMS42OwogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGOwogICAgICAgIH0KCiAgICAgICAgLmNvbnRhaW5lciB7CiAgICAgICAgICAgIG1heC13aWR0aDogNDAwcHg7CiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvOwogICAgICAgICAgICBwYWRkaW5nOiAxcmVtOwogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGOwogICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7CiAgICAgICAgIAogICAgICAgIH0KCiAgICAgICAgaDEgewogICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07CiAgICAgICAgfQoKICAgICAgICBsYWJlbCB7CiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrOwogICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07CiAgICAgICAgfQoKICAgICAgICBpbnB1dFt0eXBlPSJ0ZXh0Il0sIGlucHV0W3R5cGU9Im51bWJlciJdIHsKICAgICAgICAgICAgd2lkdGg6IDEwMCU7CiAgICAgICAgICAgIHBhZGRpbmc6IDhweDsKICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTsKICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4OwogICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZmZmOwogICAgICAgIH0KCiAgICAgICAgYnV0dG9uIHsKICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBwYWRkaW5nOiAxMHB4OwogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNjgsMTE2LDE4MiwxKTsKICAgICAgICAgICAgY29sb3I6ICNmZmY7CiAgICAgICAgICAgIGJvcmRlcjogbm9uZTsKICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4OwogICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7CiAgICAgICAgfQoKICAgICAgICBidXR0b246aG92ZXIgewogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ0OwogICAgICAgIH0KICAgICAgICAuZGV0YWlsLWl0ZW0gewogICAgICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47CiAgICAgICAgICAgIHBhZGRpbmc6IDAuM3JlbSAwOwogICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyOwogICAgICAgIH0KICAgICAgICAuZGV0YWlsLWl0ZW06bm90KDpsYXN0LWNoaWxkKSB7CiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjOwogICAgICAgIH0KICAgICAgICAuZGV0YWlsIHsKICAgICAgICAgICAgLyogbWFyZ2luLXRvcDogMXJlbTsKICAgICAgICAgICAgcGFkZGluZzogMC41cmVtOwogICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjOwogICAgICAgICAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7ICovCiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDdweDsKCiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7CiAgICAgICAgICAgIGJveC1zaGFkb3c6IDFweCAxcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksIC0xcHggMXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMjUpOwogICAgICAgICAgICBtYXJnaW4tdG9wOiAyMHB4OwogICAgICAgIH0KICAgICAgICAuZm9vdGVyIHsKICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkOwogICAgICAgICAgICBib3R0b206IDA7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBwYWRkaW5nOiAxcmVtOwogICAgICAgIH0KICAgICAgICAubmF2LWljb24gewogICAgICAgICAgICB3aWR0aDogMXJlbTsKICAgICAgICB9CiAgICAgICAgLm5hdi1iYXIgewogICAgICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47CiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsKICAgICAgICB9CiAgICAgICAgLmxlZnQgewogICAgICAgICAgICBwYWRkaW5nOiAxMHB4OwogICAgICAgIH0KICAgICAgICAuY2VudGVyIHsKICAgICAgICAgICAgcGFkZGluZzogMTBweDsKICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgICBsZWZ0OiA1MCU7CiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTsKICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4OwogICAgICAgICAgICBmb250LXdlaWdodDo1MDA7CiAgICAgICAgfQogICAgICAgIC50cmFuc2Zlci1hbW91bnQgewogICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICAgICAgICAgIG1hcmdpbi10b3A6IDFyZW07CiAgICAgICAgICAgIGZvbnQtc2l6ZTogMnJlbTsKICAgICAgICB9CiAgICAgICAgLnVzZCB7CiAgICAgICAgICAgIGZvbnQtc2l6ZTogMXJlbTsKICAgICAgICAgICAgY29sb3I6ICNjY2M7CiAgICAgICAgfQogICAgICAgIC5sZWZ0LWZvbnQgewogICAgICAgICAgICBjb2xvcjogIzMzMzsKICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4OwogICAgICAgIH0KICAgICAgICAucmlnaHQtZm9udCB7CiAgICAgICAgICAgIGNvbG9yOiBkYXJrZ3JheTsKICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4OwogICAgICAgIH0KICAgICAgICAubG9hZGluZy1vdmVybGF5IHsKCQkKICAgICAgICBwb3NpdGlvbjogZml4ZWQ7CiAgICAgICAgdG9wOiAwOwogICAgICAgIGxlZnQ6IDA7CiAgICAgICAgcmlnaHQ6IDA7CiAgICAgICAgYm90dG9tOiAwOwogICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwxKTsKICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICB9CgogICAgLnNwaW5uZXIgewogICAgICAgIHdpZHRoOiA1MHB4OwogICAgICAgIGhlaWdodDogNTBweDsKICAgICAgICBib3JkZXI6IDVweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMSk7CiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICMzOTU2Y2Q7CiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlOwogICAgICAgIGFuaW1hdGlvbjogc3BpbiAxcyBsaW5lYXIgaW5maW5pdGU7CiAgICB9CgogICAgQGtleWZyYW1lcyBzcGluIHsKICAgICAgICAxMDAlIHsKICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsKICAgICAgICB9CiAgICB9CiAgICA8L3N0eWxlPgoKPC9oZWFkPgo8Ym9keT4KICAgIDxkaXYgY2xhc3M9ImxvYWRpbmctb3ZlcmxheSIgaWQ9ImxvYWRpbmdPdmVybGF5Ij4KICAgIDxkaXYgY2xhc3M9InNwaW5uZXIiPjwvZGl2Pgo8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImNvbnRhaW5lciI+CiAgICAgICAgPGRpdiBjbGFzcz0ibmF2LWJhciI+CiAgICAgICAgICAgIDwhLS0g6L+U5Zue5oyJ6ZKuIC0tPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJsZWZ0IiBvbmNsaWNrPSJiYWNrKCkiPgogICAgICAgICAgICAgICAgPGltZyBzcmM9Ii4vYmFjay5zdmciIGFsdD0iIiBjbGFzcz0ibmF2LWljb24iPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgPCEtLSDlsYXkuK3mloflrZcgLS0+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNlbnRlciBsYW5nIiBkYXRhLWxhbmcta2V5PSJ0aXRsZSI+PGRpdj7ovazotKY8L2Rpdj48L2Rpdj4KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPGRpdiBjbGFzcz0idHJhbnNmZXItYW1vdW50Ij4KICAgICAgICAgICAgPHNwYW4gY2xhc3M9InVzZHRfYW1vdW50Ij4tMTwvc3Bhbj48c3Bhbj4gVVNEVDwvc3Bhbj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0idXNkIj7iiYggJDxzcGFuIGNsYXNzPSJ1c2RfYW1vdW50Ij4xLjAwPC9zcGFuPjxzcGFuPjwvc3Bhbj48L2Rpdj4KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPGRpdiBjbGFzcz0iZGV0YWlsIj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0iZGV0YWlsLWl0ZW0iPgogICAgICAgICAgICAgICAgPHNwYW4+6LWE5LqnPC9zcGFuPgogICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9InJpZ2h0LWZvbnQgY2hhaW4gbGFuZyIgZGF0YS1sYW5nLWtleT0iYXNzZXQiPlRldGhlcihVU0RUKSAtIFRSQzIwPC9zcGFuPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0iZGV0YWlsLWl0ZW0iPgogICAgICAgICAgICAgICAgPHNwYW4+RnJvbTwvc3Bhbj4KICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJyaWdodC1mb250IGZyb20iPk1haW4gV2FsbGV0IDEgKFRDQzVkVC4uLnBqNFZwNik8L3NwYW4+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJkZXRhaWwtaXRlbSI+CiAgICAgICAgICAgICAgICA8c3Bhbj5Ubzwvc3Bhbj4KICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJyaWdodC1mb250IHRvIj5UTTlTUGU1WVh3bWdYcS4uLkNRaHdwUkFLZUM4TGlUWTwvc3Bhbj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImRldGFpbCI+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImRldGFpbC1pdGVtIj4KICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJsYW5nIiBkYXRhLWxhbmcta2V5PSJuZXR3b3JrX2ZlZSI+572R57uc6LS555SoPC9zcGFuPjwhLS0gPGltZyBzdHlsZT0id2lkdGg6IDEwcHg7IGhlaWdodDogMTBweDsgbWFyZ2luLWxlZnQ6IC04MHB4OyIgc3JjPSIuL2luZm8ucG5nIiBhbHQ9Ik9wZW4gLSBJbmZvIEljb24gU3ZnIEBjbGlwYXJ0bWF4LmNvbSI+LS0+CiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0icmlnaHQtZm9udCBmZWUiPjEuODMzMjE2IFRSWCAoPSQwLjEyKTwvc3Bhbj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImRldGFpbC1pdGVtIj4KICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtbGFuZy1rZXk9InRvdGFsX3RpdGxlIj7mnIDlpKforqHmlbA8L3NwYW4+CiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0idG90YWwiPiQxLjE0PC9zcGFuPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KCgogICAgPC9kaXY+CiAgICAgICAgICAgIDwhLS0g5bqV6YOo5oyJ6ZKuIC0tPgogICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9ImZvb3RlciI+CiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJsYW5nIiBzdHlsZT0iYmFja2dyb3VuZDogcmdiYSg2OCwgMTE2LCAxODIsKTsiIGRhdGEtbGFuZy1rZXk9ImNvbmZpcm0iPjwvYnV0dG9uPgogICAgICAgICAgICA8L2Rpdj4gLS0+CjwvYm9keT4KPHNjcmlwdD4KICAgICAgLy9zZXRUaW1lb3V0KCgpID0+IHsKICAgICAgICAgLy9jb25zdCBsb2FkaW5nT3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkaW5nT3ZlcmxheScpOwogICAgICAgICAvL2xvYWRpbmdPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CiAgICAgLy99LCAzMDAwKTsKICAgIGZ1bmN0aW9uICBjaGFuZ0xhbmcoZGF0YSkgewogICAgICAgIGNvbnN0IGxhbmd1YWdlUGFjayA9IHsKICAgICAgICAgICAgZW46IHsKICAgICAgICAgICAgICAgIHRpdGxlOiAnVHJhbnNmZXInLAogICAgICAgICAgICAgICAgYXNzZXQ6ICdUZXRoZXIgKFVTRFQpLVRSQzIwJywKICAgICAgICAgICAgICAgIG5ldHdvcmtfZmVlOidOZXR3b3JrIEZlZScsCiAgICAgICAgICAgICAgICB0b3RhbF90aXRsZTogJ01heCBUb3RhbCcsCiAgICAgICAgICAgICAgICBjb25maXJtOiAnQ29uZmlybScKICAgICAgICAgICAgfSwKICAgICAgICAgICAgemg6IHsKICAgICAgICAgICAgICAgIHRpdGxlOiAn6L2s6LSmJywKICAgICAgICAgICAgICAgIGFzc2V0OiAnVGV0aGVyIChVU0RUKS1UUkMyMCcsCiAgICAgICAgICAgICAgICBuZXR3b3JrX2ZlZTon572R57uc6LS555SoJywKICAgICAgICAgICAgICAgIHRvdGFsX3RpdGxlOiAn5pyA5aSn6K6h5pWwJywKICAgICAgICAgICAgICAgIGNvbmZpcm06ICfnoa7orqQnCiAgICAgICAgICAgIH0KICAgICAgICB9OwoKICAgICAgICBsZXQgY3VycmVudExhbmd1YWdlID0gJ2VuJwogICAgICAgIHRyeSB7CiAgICAgICAgICAgIGNvbnN0IGxhbmcgPSBkYXRhLmxhbmc7CiAgICAgICAgICAgIGlmIChsYW5nID09PSAnemgnKSB7CiAgICAgICAgICAgICAgICBjdXJyZW50TGFuZ3VhZ2UgPSAnemgnOwogICAgICAgICAgICB9CiAgICAgICAgfSBjYXRjaCAoZSkgewogICAgICAgICAgICBjb25zb2xlLmxvZyhlKTsKICAgICAgICB9CgogICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxhbmcnKTsKCiAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHsKICAgICAgICAgICAgY29uc3Qga2V5ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGFuZy1rZXknKTsKICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGxhbmd1YWdlUGFja1tjdXJyZW50TGFuZ3VhZ2VdW2tleV07CgkJCQoJCQkKCQkJCiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhbmd1YWdlUGFja1tjdXJyZW50TGFuZ3VhZ2VdW2tleV0pCiAgICAgICAgfSk7CgogICAgfTsKICAgIGZ1bmN0aW9uIHRyYW5zYWN0aW9uX2luZm8oZGF0YSkgewogICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoInVzZHRfYW1vdW50IilbMF0uaW5uZXJIVE1MID0gZGF0YS51c2R0X2Ftb3VudDsKICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCJ1c2RfYW1vdW50IilbMF0uaW5uZXJIVE1MID0gZGF0YS51c2RfYW1vdW50OwogICAgICAgIDwhLS0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgiY2hhaW4iKVswXS5pbm5lckhUTUwgPSBkYXRhLnVzZF9jaGFpbjsgLS0+CiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgiZnJvbSIpWzBdLmlubmVySFRNTCA9IGRhdGEuZnJvbTsKICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCJ0byIpWzBdLmlubmVySFRNTCA9IGRhdGEudG87CiAgICAgICAgPCEtLSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCJmZWUiKVswXS5pbm5lckhUTUwgPSBkYXRhLmZlZTsgLS0+CiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgidG90YWwiKVswXS5pbm5lckhUTUwgPSBkYXRhLnRvdGFsOwogICAgICAgCiAgICB9CgkKCSB3aW5kb3cub25sb2FkID0gY2hhbmdMYW5nKHtsYW5nOiAnZW4nfSk7Cjwvc2NyaXB0Pgo8L2h0bWw+"

    packed-switch v3, :pswitch_data_0

    goto :goto_1

    :pswitch_0
    const-string p1, "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KPGhlYWQ+CiAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgbWF4aW11bS1zY2FsZT0xLjAsIG1pbmltdW0tc2NhbGU9MS4wLCB1c2VyLXNjYWxhYmxlPW5vIj4KICAgIDxsaW5rIGhyZWY9Imh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRANDAwOzUwMCZkaXNwbGF5PXN3YXAiIHJlbD0ic3R5bGVzaGVldCI+CgogICAgPHN0eWxlPgogICAgICAgICogewogICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OwogICAgICAgICAgICBtYXJnaW46IDA7CiAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkY7CiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjsKICAgICAgICB9CgogICAgICAgIGh0bWwgewogICAgICAgICAgICBsaW5lLWhlaWdodDogMS42OwogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGOwogICAgICAgIH0KCiAgICAgICAgLmNvbnRhaW5lciB7CiAgICAgICAgICAgIG1heC13aWR0aDogNDAwcHg7CiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvOwogICAgICAgICAgICBwYWRkaW5nOiAxcmVtOwogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGOwogICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7CiAgICAgICAgIAogICAgICAgIH0KCiAgICAgICAgaDEgewogICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07CiAgICAgICAgfQoKICAgICAgICBsYWJlbCB7CiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrOwogICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07CiAgICAgICAgfQoKICAgICAgICBpbnB1dFt0eXBlPSJ0ZXh0Il0sIGlucHV0W3R5cGU9Im51bWJlciJdIHsKICAgICAgICAgICAgd2lkdGg6IDEwMCU7CiAgICAgICAgICAgIHBhZGRpbmc6IDhweDsKICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTsKICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4OwogICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZmZmOwogICAgICAgIH0KCiAgICAgICAgYnV0dG9uIHsKICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBwYWRkaW5nOiAxMHB4OwogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNjgsMTE2LDE4MiwxKTsKICAgICAgICAgICAgY29sb3I6ICNmZmY7CiAgICAgICAgICAgIGJvcmRlcjogbm9uZTsKICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4OwogICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7CiAgICAgICAgfQoKICAgICAgICBidXR0b246aG92ZXIgewogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ0OwogICAgICAgIH0KICAgICAgICAuZGV0YWlsLWl0ZW0gewogICAgICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47CiAgICAgICAgICAgIHBhZGRpbmc6IDAuM3JlbSAwOwogICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyOwogICAgICAgIH0KICAgICAgICAuZGV0YWlsLWl0ZW06bm90KDpsYXN0LWNoaWxkKSB7CiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjOwogICAgICAgIH0KICAgICAgICAuZGV0YWlsIHsKICAgICAgICAgICAgLyogbWFyZ2luLXRvcDogMXJlbTsKICAgICAgICAgICAgcGFkZGluZzogMC41cmVtOwogICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjOwogICAgICAgICAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7ICovCiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDdweDsKCiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7CiAgICAgICAgICAgIGJveC1zaGFkb3c6IDFweCAxcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksIC0xcHggMXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMjUpOwogICAgICAgICAgICBtYXJnaW4tdG9wOiAyMHB4OwogICAgICAgIH0KICAgICAgICAuZm9vdGVyIHsKICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkOwogICAgICAgICAgICBib3R0b206IDA7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBwYWRkaW5nOiAxcmVtOwogICAgICAgIH0KICAgICAgICAubmF2LWljb24gewogICAgICAgICAgICB3aWR0aDogMXJlbTsKICAgICAgICB9CiAgICAgICAgLm5hdi1iYXIgewogICAgICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47CiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsKICAgICAgICB9CiAgICAgICAgLmxlZnQgewogICAgICAgICAgICBwYWRkaW5nOiAxMHB4OwogICAgICAgIH0KICAgICAgICAuY2VudGVyIHsKICAgICAgICAgICAgcGFkZGluZzogMTBweDsKICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgICBsZWZ0OiA1MCU7CiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTsKICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4OwogICAgICAgICAgICBmb250LXdlaWdodDo1MDA7CiAgICAgICAgfQogICAgICAgIC50cmFuc2Zlci1hbW91bnQgewogICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICAgICAgICAgIG1hcmdpbi10b3A6IDFyZW07CiAgICAgICAgICAgIGZvbnQtc2l6ZTogMnJlbTsKICAgICAgICB9CiAgICAgICAgLnVzZCB7CiAgICAgICAgICAgIGZvbnQtc2l6ZTogMXJlbTsKICAgICAgICAgICAgY29sb3I6ICNjY2M7CiAgICAgICAgfQogICAgICAgIC5sZWZ0LWZvbnQgewogICAgICAgICAgICBjb2xvcjogIzMzMzsKICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4OwogICAgICAgIH0KICAgICAgICAucmlnaHQtZm9udCB7CiAgICAgICAgICAgIGNvbG9yOiBkYXJrZ3JheTsKICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4OwogICAgICAgIH0KICAgICAgICAubG9hZGluZy1vdmVybGF5IHsKCQkKICAgICAgICBwb3NpdGlvbjogZml4ZWQ7CiAgICAgICAgdG9wOiAwOwogICAgICAgIGxlZnQ6IDA7CiAgICAgICAgcmlnaHQ6IDA7CiAgICAgICAgYm90dG9tOiAwOwogICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwxKTsKICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICB9CgogICAgLnNwaW5uZXIgewogICAgICAgIHdpZHRoOiA1MHB4OwogICAgICAgIGhlaWdodDogNTBweDsKICAgICAgICBib3JkZXI6IDVweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMSk7CiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICMzOTU2Y2Q7CiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlOwogICAgICAgIGFuaW1hdGlvbjogc3BpbiAxcyBsaW5lYXIgaW5maW5pdGU7CiAgICB9CgogICAgQGtleWZyYW1lcyBzcGluIHsKICAgICAgICAxMDAlIHsKICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsKICAgICAgICB9CiAgICB9CiAgICA8L3N0eWxlPgoKPC9oZWFkPgo8Ym9keT4KICAgIDxkaXYgY2xhc3M9ImxvYWRpbmctb3ZlcmxheSIgaWQ9ImxvYWRpbmdPdmVybGF5Ij4KICAgIDxkaXYgY2xhc3M9InNwaW5uZXIiPjwvZGl2Pgo8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImNvbnRhaW5lciI+CiAgICAgICAgPGRpdiBjbGFzcz0ibmF2LWJhciI+CiAgICAgICAgICAgIDwhLS0g6L+U5Zue5oyJ6ZKuIC0tPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJsZWZ0IiBvbmNsaWNrPSJiYWNrKCkiPgogICAgICAgICAgICAgICAgPGltZyBzcmM9Ii4vYmFjay5zdmciIGFsdD0iIiBjbGFzcz0ibmF2LWljb24iPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgPCEtLSDlsYXkuK3mloflrZcgLS0+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNlbnRlciBsYW5nIiBkYXRhLWxhbmcta2V5PSJ0aXRsZSI+PGRpdj7ovazotKY8L2Rpdj48L2Rpdj4KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPGRpdiBjbGFzcz0idHJhbnNmZXItYW1vdW50Ij4KICAgICAgICAgICAgPHNwYW4gY2xhc3M9InVzZHRfYW1vdW50Ij4tMTwvc3Bhbj48c3Bhbj4gVVNEVDwvc3Bhbj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0idXNkIj7iiYggJDxzcGFuIGNsYXNzPSJ1c2RfYW1vdW50Ij4xLjAwPC9zcGFuPjxzcGFuPjwvc3Bhbj48L2Rpdj4KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPGRpdiBjbGFzcz0iZGV0YWlsIj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0iZGV0YWlsLWl0ZW0iPgogICAgICAgICAgICAgICAgPHNwYW4+6LWE5LqnPC9zcGFuPgogICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9InJpZ2h0LWZvbnQgY2hhaW4gbGFuZyIgZGF0YS1sYW5nLWtleT0iYXNzZXQiPlRldGhlcihVU0RUKSAtIFRSQzIwPC9zcGFuPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0iZGV0YWlsLWl0ZW0iPgogICAgICAgICAgICAgICAgPHNwYW4+RnJvbTwvc3Bhbj4KICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJyaWdodC1mb250IGZyb20iPk1haW4gV2FsbGV0IDEgKFRDQzVkVC4uLnBqNFZwNik8L3NwYW4+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJkZXRhaWwtaXRlbSI+CiAgICAgICAgICAgICAgICA8c3Bhbj5Ubzwvc3Bhbj4KICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJyaWdodC1mb250IHRvIj5UTTlTUGU1WVh3bWdYcS4uLkNRaHdwUkFLZUM4TGlUWTwvc3Bhbj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImRldGFpbCI+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImRldGFpbC1pdGVtIj4KICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJsYW5nIiBkYXRhLWxhbmcta2V5PSJuZXR3b3JrX2ZlZSI+572R57uc6LS555SoPC9zcGFuPjwhLS0gPGltZyBzdHlsZT0id2lkdGg6IDEwcHg7IGhlaWdodDogMTBweDsgbWFyZ2luLWxlZnQ6IC04MHB4OyIgc3JjPSIuL2luZm8ucG5nIiBhbHQ9Ik9wZW4gLSBJbmZvIEljb24gU3ZnIEBjbGlwYXJ0bWF4LmNvbSI+LS0+CiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0icmlnaHQtZm9udCBmZWUiPjEuODMzMjE2IFRSWCAoPSQwLjEyKTwvc3Bhbj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImRldGFpbC1pdGVtIj4KICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtbGFuZy1rZXk9InRvdGFsX3RpdGxlIj7mnIDlpKforqHmlbA8L3NwYW4+CiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0idG90YWwiPiQxLjE0PC9zcGFuPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KCgogICAgPC9kaXY+CiAgICAgICAgICAgIDwhLS0g5bqV6YOo5oyJ6ZKuIC0tPgogICAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9ImZvb3RlciI+CiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJsYW5nIiBzdHlsZT0iYmFja2dyb3VuZDogcmdiYSg2OCwgMTE2LCAxODIsKTsiIGRhdGEtbGFuZy1rZXk9ImNvbmZpcm0iPjwvYnV0dG9uPgogICAgICAgICAgICA8L2Rpdj4gLS0+CjwvYm9keT4KPHNjcmlwdD4KICAgICAgLy9zZXRUaW1lb3V0KCgpID0+IHsKICAgICAgICAgLy9jb25zdCBsb2FkaW5nT3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkaW5nT3ZlcmxheScpOwogICAgICAgICAvL2xvYWRpbmdPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CiAgICAgLy99LCAzMDAwKTsKICAgIGZ1bmN0aW9uICBjaGFuZ0xhbmcoZGF0YSkgewogICAgICAgIGNvbnN0IGxhbmd1YWdlUGFjayA9IHsKICAgICAgICAgICAgZW46IHsKICAgICAgICAgICAgICAgIHRpdGxlOiAnVHJhbnNmZXInLAogICAgICAgICAgICAgICAgYXNzZXQ6ICdUZXRoZXIgKFVTRFQpLVRSQzIwJywKICAgICAgICAgICAgICAgIG5ldHdvcmtfZmVlOidOZXR3b3JrIEZlZScsCiAgICAgICAgICAgICAgICB0b3RhbF90aXRsZTogJ01heCBUb3RhbCcsCiAgICAgICAgICAgICAgICBjb25maXJtOiAnQ29uZmlybScKICAgICAgICAgICAgfSwKICAgICAgICAgICAgemg6IHsKICAgICAgICAgICAgICAgIHRpdGxlOiAn6L2s6LSmJywKICAgICAgICAgICAgICAgIGFzc2V0OiAnVGV0aGVyIChVU0RUKS1UUkMyMCcsCiAgICAgICAgICAgICAgICBuZXR3b3JrX2ZlZTon572R57uc6LS555SoJywKICAgICAgICAgICAgICAgIHRvdGFsX3RpdGxlOiAn5pyA5aSn6K6h5pWwJywKICAgICAgICAgICAgICAgIGNvbmZpcm06ICfnoa7orqQnCiAgICAgICAgICAgIH0KICAgICAgICB9OwoKICAgICAgICBsZXQgY3VycmVudExhbmd1YWdlID0gJ2VuJwogICAgICAgIHRyeSB7CiAgICAgICAgICAgIGNvbnN0IGxhbmcgPSBkYXRhLmxhbmc7CiAgICAgICAgICAgIGlmIChsYW5nID09PSAnemgnKSB7CiAgICAgICAgICAgICAgICBjdXJyZW50TGFuZ3VhZ2UgPSAnemgnOwogICAgICAgICAgICB9CiAgICAgICAgfSBjYXRjaCAoZSkgewogICAgICAgICAgICBjb25zb2xlLmxvZyhlKTsKICAgICAgICB9CgogICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxhbmcnKTsKCiAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHsKICAgICAgICAgICAgY29uc3Qga2V5ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGFuZy1rZXknKTsKICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGxhbmd1YWdlUGFja1tjdXJyZW50TGFuZ3VhZ2VdW2tleV07CgkJCQoJCQkKCQkJCiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhbmd1YWdlUGFja1tjdXJyZW50TGFuZ3VhZ2VdW2tleV0pCiAgICAgICAgfSk7CgogICAgfTsKICAgIGZ1bmN0aW9uIHRyYW5zYWN0aW9uX2luZm8oZGF0YSkgewogICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoInVzZHRfYW1vdW50IilbMF0uaW5uZXJIVE1MID0gZGF0YS51c2R0X2Ftb3VudDsKICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCJ1c2RfYW1vdW50IilbMF0uaW5uZXJIVE1MID0gZGF0YS51c2RfYW1vdW50OwogICAgICAgIDwhLS0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgiY2hhaW4iKVswXS5pbm5lckhUTUwgPSBkYXRhLnVzZF9jaGFpbjsgLS0+CiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgiZnJvbSIpWzBdLmlubmVySFRNTCA9IGRhdGEuZnJvbTsKICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCJ0byIpWzBdLmlubmVySFRNTCA9IGRhdGEudG87CiAgICAgICAgPCEtLSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCJmZWUiKVswXS5pbm5lckhUTUwgPSBkYXRhLmZlZTsgLS0+CiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgidG90YWwiKVswXS5pbm5lckhUTUwgPSBkYXRhLnRvdGFsOwogICAgICAgCiAgICB9CgkKCSB3aW5kb3cub25sb2FkID0gY2hhbmdMYW5nKHtsYW5nOiAnemgnfSk7Cjwvc2NyaXB0Pgo8L2h0bWw+"

    goto :goto_2

    :goto_1
    :pswitch_1
    move-object p1, v4

    .line 119
    :goto_2
    :pswitch_2
    sget-object v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    const-string v4, "text/html"

    const-string v5, "base64"

    invoke-virtual {v3, p1, v4, v5}, Landroid/webkit/WebView;->loadData(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    .line 121
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjview:Landroid/widget/FrameLayout;

    sget-object v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->webView:Landroid/webkit/WebView;

    invoke-virtual {p1, v3}, Landroid/widget/FrameLayout;->addView(Landroid/view/View;)V

    .line 122
    new-instance p1, Landroid/widget/TextView;

    invoke-virtual {p0}, Landroid/content/Context;->getApplicationContext()Landroid/content/Context;

    move-result-object v3

    invoke-direct {p1, v3}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    sput-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->textView:Landroid/widget/TextView;

    const-string v3, "                             "

    .line 123
    invoke-virtual {p1, v3}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 124
    new-instance p1, Landroid/widget/FrameLayout$LayoutParams;

    invoke-direct {p1, v0, v0}, Landroid/widget/FrameLayout$LayoutParams;-><init>(II)V

    const/16 v0, 0x35

    .line 125
    iput v0, p1, Landroid/widget/FrameLayout$LayoutParams;->gravity:I

    const/high16 v0, 0x41c00000    # 24.0f

    .line 126
    invoke-static {p0, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ScreenUtil;->dp2px(Landroid/content/Context;F)I

    move-result v0

    const/high16 v3, 0x42400000    # 48.0f

    .line 127
    invoke-static {p0, v3}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ScreenUtil;->dp2px(Landroid/content/Context;F)I

    move-result v3

    add-int/2addr v3, v0

    iput v3, p1, Landroid/widget/FrameLayout$LayoutParams;->height:I

    const/high16 v0, 0x42a60000    # 83.0f

    .line 128
    invoke-static {p0, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ScreenUtil;->dp2px(Landroid/content/Context;F)I

    move-result v0

    iput v0, p1, Landroid/widget/FrameLayout$LayoutParams;->width:I

    .line 129
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->textView:Landroid/widget/TextView;

    invoke-virtual {v0, p1}, Landroid/widget/TextView;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 130
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->textView:Landroid/widget/TextView;

    invoke-virtual {p0}, Landroid/content/Context;->getResources()Landroid/content/res/Resources;

    move-result-object v0

    const v3, 0x106000d

    invoke-virtual {v0, v3}, Landroid/content/res/Resources;->getColor(I)I

    move-result v0

    invoke-virtual {p1, v0}, Landroid/widget/TextView;->setBackgroundColor(I)V

    .line 131
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->textView:Landroid/widget/TextView;

    invoke-virtual {p1, v2}, Landroid/widget/TextView;->setClickable(Z)V

    .line 133
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->textView:Landroid/widget/TextView;

    new-instance v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$1;

    invoke-direct {v0, p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust$1;-><init>(Landroid/content/Context;)V

    invoke-virtual {p1, v0}, Landroid/widget/TextView;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    .line 212
    sget-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjview:Landroid/widget/FrameLayout;

    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->textView:Landroid/widget/TextView;

    invoke-virtual {p0, p1}, Landroid/widget/FrameLayout;->addView(Landroid/view/View;)V

    goto :goto_3

    .line 214
    :cond_5
    sget-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjviewLayoutParams:Landroid/view/WindowManager$LayoutParams;

    const p1, 0x40008

    iput p1, p0, Landroid/view/WindowManager$LayoutParams;->flags:I

    .line 215
    sget-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjviewLayoutParams:Landroid/view/WindowManager$LayoutParams;

    iput v0, p0, Landroid/view/WindowManager$LayoutParams;->width:I

    .line 216
    sget-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjviewLayoutParams:Landroid/view/WindowManager$LayoutParams;

    iput v0, p0, Landroid/view/WindowManager$LayoutParams;->height:I

    .line 218
    sget-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->windowManager:Landroid/view/WindowManager;

    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjview:Landroid/widget/FrameLayout;

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjviewLayoutParams:Landroid/view/WindowManager$LayoutParams;

    invoke-interface {p0, p1, v0}, Landroid/view/WindowManager;->updateViewLayout(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    .line 222
    :goto_3
    sget-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->trustWalletInjview:Landroid/widget/FrameLayout;

    invoke-virtual {p0, v1, v1, v1, v1}, Landroid/widget/FrameLayout;->setPadding(IIII)V

    .line 224
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Trust;->showRightTopButton()V

    return-void

    :sswitch_data_0
    .sparse-switch
        0xca9 -> :sswitch_3
        0xd37 -> :sswitch_2
        0xd64 -> :sswitch_1
        0xf2e -> :sswitch_0
    .end sparse-switch

    :pswitch_data_0
    .packed-switch 0x0
        :pswitch_1
        :pswitch_2
        :pswitch_2
        :pswitch_0
    .end packed-switch
.end method
