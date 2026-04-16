.class public L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;
.super Ljava/lang/Object;
.source "PerformGestureUtil.java"


# static fields
.field static final fixedThreadPool:Ljava/util/concurrent/ExecutorService;

.field static handler:Landroid/os/Handler;

.field static service:Landroid/accessibilityservice/AccessibilityService;

.field static thisAllSteps:Ljava/util/LinkedList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/LinkedList<",
            "Ljava/util/LinkedList<",
            "Landroid/view/MotionEvent;",
            ">;>;"
        }
    .end annotation
.end field

.field static thisPerformGestureListener:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureListener;


# direct methods
.method static constructor <clinit>()V
    .locals 2

    const/4 v0, 0x5

    .line 24
    invoke-static {v0}, Ljava/util/concurrent/Executors;->newFixedThreadPool(I)Ljava/util/concurrent/ExecutorService;

    move-result-object v0

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->fixedThreadPool:Ljava/util/concurrent/ExecutorService;

    .line 117
    new-instance v0, Landroid/os/Handler;

    new-instance v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil$2;

    invoke-direct {v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil$2;-><init>()V

    invoke-direct {v0, v1}, Landroid/os/Handler;-><init>(Landroid/os/Handler$Callback;)V

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->handler:Landroid/os/Handler;

    return-void
.end method

.method public constructor <init>()V
    .locals 0

    .line 21
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method

.method static synthetic access$000()V
    .locals 0

    .line 21
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->mockGesture()V

    return-void
.end method

.method private static cloneAllSteps(Ljava/util/LinkedList;)V
    .locals 3
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/util/LinkedList<",
            "Ljava/util/LinkedList<",
            "Landroid/view/MotionEvent;",
            ">;>;)V"
        }
    .end annotation

    .line 37
    new-instance v0, Ljava/util/LinkedList;

    invoke-direct {v0}, Ljava/util/LinkedList;-><init>()V

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->thisAllSteps:Ljava/util/LinkedList;

    .line 38
    invoke-virtual {p0}, Ljava/util/LinkedList;->iterator()Ljava/util/Iterator;

    move-result-object p0

    :goto_0
    invoke-interface {p0}, Ljava/util/Iterator;->hasNext()Z

    move-result v0

    if-eqz v0, :cond_1

    invoke-interface {p0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Ljava/util/LinkedList;

    .line 39
    new-instance v1, Ljava/util/LinkedList;

    invoke-direct {v1}, Ljava/util/LinkedList;-><init>()V

    .line 40
    invoke-virtual {v0}, Ljava/util/LinkedList;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :goto_1
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v2

    if-eqz v2, :cond_0

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroid/view/MotionEvent;

    .line 41
    invoke-static {v2}, Landroid/view/MotionEvent;->obtain(Landroid/view/MotionEvent;)Landroid/view/MotionEvent;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/util/LinkedList;->add(Ljava/lang/Object;)Z

    goto :goto_1

    .line 43
    :cond_0
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->thisAllSteps:Ljava/util/LinkedList;

    invoke-virtual {v0, v1}, Ljava/util/LinkedList;->add(Ljava/lang/Object;)Z

    goto :goto_0

    :cond_1
    return-void
.end method

.method private static dispatchGesture(Landroid/accessibilityservice/GestureDescription;J)V
    .locals 2

    .line 80
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->service:Landroid/accessibilityservice/AccessibilityService;

    new-instance v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil$1;

    invoke-direct {v1, p1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil$1;-><init>(J)V

    const/4 p1, 0x0

    invoke-virtual {v0, p0, v1, p1}, Landroid/accessibilityservice/AccessibilityService;->dispatchGesture(Landroid/accessibilityservice/GestureDescription;Landroid/accessibilityservice/AccessibilityService$GestureResultCallback;Landroid/os/Handler;)Z

    return-void
.end method

.method private static mockGesture()V
    .locals 17

    .line 49
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->thisAllSteps:Ljava/util/LinkedList;

    invoke-virtual {v0}, Ljava/util/LinkedList;->poll()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Ljava/util/LinkedList;

    .line 50
    new-instance v1, Ljava/util/Random;

    invoke-direct {v1}, Ljava/util/Random;-><init>()V

    const/16 v2, 0x14

    invoke-virtual {v1, v2}, Ljava/util/Random;->nextInt(I)I

    move-result v1

    add-int/lit8 v1, v1, 0x28

    int-to-long v5, v1

    .line 53
    invoke-virtual {v0}, Ljava/util/LinkedList;->isEmpty()Z

    move-result v1

    const-wide/16 v3, 0x0

    if-nez v1, :cond_0

    .line 54
    invoke-virtual {v0}, Ljava/util/LinkedList;->getLast()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Landroid/view/MotionEvent;

    invoke-virtual {v1}, Landroid/view/MotionEvent;->getEventTime()J

    move-result-wide v7

    .line 55
    invoke-virtual {v0}, Ljava/util/LinkedList;->getFirst()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Landroid/view/MotionEvent;

    invoke-virtual {v1}, Landroid/view/MotionEvent;->getEventTime()J

    move-result-wide v9

    sub-long v9, v7, v9

    move-wide v15, v7

    move-wide v7, v9

    move-wide v10, v15

    goto :goto_0

    .line 57
    :cond_0
    new-instance v1, Ljava/util/Random;

    invoke-direct {v1}, Ljava/util/Random;-><init>()V

    invoke-virtual {v1, v2}, Ljava/util/Random;->nextInt(I)I

    move-result v1

    add-int/lit16 v1, v1, 0xc8

    int-to-long v9, v1

    move-wide v7, v9

    move-wide v10, v3

    .line 59
    :goto_0
    new-instance v1, Landroid/accessibilityservice/GestureDescription$Builder;

    invoke-direct {v1}, Landroid/accessibilityservice/GestureDescription$Builder;-><init>()V

    .line 60
    invoke-virtual {v0}, Ljava/util/LinkedList;->poll()Ljava/lang/Object;

    move-result-object v9

    check-cast v9, Landroid/view/MotionEvent;

    .line 61
    new-instance v12, Landroid/graphics/Path;

    invoke-direct {v12}, Landroid/graphics/Path;-><init>()V

    .line 62
    invoke-virtual {v9}, Landroid/view/MotionEvent;->getRawX()F

    move-result v13

    invoke-virtual {v9}, Landroid/view/MotionEvent;->getRawY()F

    move-result v9

    sget-object v14, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->service:Landroid/accessibilityservice/AccessibilityService;

    invoke-static {v14}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ScreenUtil;->getStatusBarHeight(Landroid/content/Context;)I

    move-result v14

    int-to-float v14, v14

    add-float/2addr v9, v14

    invoke-virtual {v12, v13, v9}, Landroid/graphics/Path;->moveTo(FF)V

    .line 63
    :goto_1
    invoke-virtual {v0}, Ljava/util/LinkedList;->isEmpty()Z

    move-result v9

    if-nez v9, :cond_1

    .line 64
    invoke-virtual {v0}, Ljava/util/LinkedList;->poll()Ljava/lang/Object;

    move-result-object v9

    check-cast v9, Landroid/view/MotionEvent;

    .line 65
    invoke-virtual {v9}, Landroid/view/MotionEvent;->getRawX()F

    move-result v13

    invoke-virtual {v9}, Landroid/view/MotionEvent;->getRawY()F

    move-result v9

    sget-object v14, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->service:Landroid/accessibilityservice/AccessibilityService;

    invoke-static {v14}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ScreenUtil;->getStatusBarHeight(Landroid/content/Context;)I

    move-result v14

    int-to-float v14, v14

    add-float/2addr v9, v14

    invoke-virtual {v12, v13, v9}, Landroid/graphics/Path;->lineTo(FF)V

    goto :goto_1

    .line 68
    :cond_1
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v9, 0x1a

    if-lt v0, v9, :cond_3

    cmp-long v0, v7, v3

    if-nez v0, :cond_2

    .line 70
    new-instance v0, Ljava/util/Random;

    invoke-direct {v0}, Ljava/util/Random;-><init>()V

    invoke-virtual {v0, v2}, Ljava/util/Random;->nextInt(I)I

    move-result v0

    add-int/lit16 v0, v0, 0xc8

    int-to-long v2, v0

    move-wide v7, v2

    .line 72
    :cond_2
    new-instance v0, Landroid/accessibilityservice/GestureDescription$StrokeDescription;

    const/4 v9, 0x0

    move-object v3, v0

    move-object v4, v12

    invoke-direct/range {v3 .. v9}, Landroid/accessibilityservice/GestureDescription$StrokeDescription;-><init>(Landroid/graphics/Path;JJZ)V

    invoke-virtual {v1, v0}, Landroid/accessibilityservice/GestureDescription$Builder;->addStroke(Landroid/accessibilityservice/GestureDescription$StrokeDescription;)Landroid/accessibilityservice/GestureDescription$Builder;

    .line 74
    :cond_3
    invoke-virtual {v1}, Landroid/accessibilityservice/GestureDescription$Builder;->build()Landroid/accessibilityservice/GestureDescription;

    move-result-object v0

    .line 75
    invoke-static {v0, v10, v11}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->dispatchGesture(Landroid/accessibilityservice/GestureDescription;J)V

    return-void
.end method

.method public static startMockGesture(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;Ljava/util/LinkedList;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureListener;)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;",
            "Ljava/util/LinkedList<",
            "Ljava/util/LinkedList<",
            "Landroid/view/MotionEvent;",
            ">;>;",
            "L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureListener;",
            ")V"
        }
    .end annotation

    .line 29
    sput-object p2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->thisPerformGestureListener:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureListener;

    .line 30
    sput-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->service:Landroid/accessibilityservice/AccessibilityService;

    .line 31
    invoke-static {p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->cloneAllSteps(Ljava/util/LinkedList;)V

    .line 32
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/PerformGestureUtil;->mockGesture()V

    return-void
.end method
