.class L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$MyCallbackHandler;
.super Ljava/lang/Object;
.source "EventBus.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0xa
    name = "MyCallbackHandler"
.end annotation


# instance fields
.field callback:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$ICallback;

.field handler:Landroid/os/Handler;


# direct methods
.method constructor <init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$ICallback;I)V
    .locals 0

    .line 203
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 204
    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$MyCallbackHandler;->callback:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$ICallback;

    const/4 p1, 0x1

    if-ne p2, p1, :cond_1

    .line 207
    invoke-static {}, Landroid/os/Looper;->myLooper()Landroid/os/Looper;

    move-result-object p1

    if-eqz p1, :cond_0

    .line 212
    new-instance p2, Landroid/os/Handler;

    invoke-direct {p2, p1}, Landroid/os/Handler;-><init>(Landroid/os/Looper;)V

    iput-object p2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$MyCallbackHandler;->handler:Landroid/os/Handler;

    goto :goto_0

    .line 209
    :cond_0
    new-instance p1, Ljava/lang/RuntimeException;

    const-string p2, "No looper; looper.prbeparbe() wasn\'t callbed on this thrbead."

    invoke-direct {p1, p2}, Ljava/lang/RuntimeException;-><init>(Ljava/lang/String;)V

    throw p1

    :cond_1
    const/4 p1, 0x2

    if-ne p2, p1, :cond_2

    .line 215
    new-instance p1, Landroid/os/Handler;

    invoke-static {}, Landroid/os/Looper;->getMainLooper()Landroid/os/Looper;

    move-result-object p2

    invoke-direct {p1, p2}, Landroid/os/Handler;-><init>(Landroid/os/Looper;)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$MyCallbackHandler;->handler:Landroid/os/Handler;

    goto :goto_0

    :cond_2
    const/4 p1, 0x0

    .line 218
    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$MyCallbackHandler;->handler:Landroid/os/Handler;

    :goto_0
    return-void
.end method


# virtual methods
.method post(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$Event;)V
    .locals 1

    .line 223
    new-instance v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$MyCallbackHandler$1;

    invoke-direct {v0, p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$MyCallbackHandler$1;-><init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$MyCallbackHandler;L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$Event;)V

    .line 245
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus$MyCallbackHandler;->handler:Landroid/os/Handler;

    if-eqz p1, :cond_0

    .line 246
    invoke-virtual {p1, v0}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z

    goto :goto_0

    .line 248
    :cond_0
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus;->access$100()Ljava/util/concurrent/ExecutorService;

    move-result-object p1

    if-nez p1, :cond_1

    const/4 p1, 0x1

    .line 249
    invoke-static {p1}, Ljava/util/concurrent/Executors;->newFixedThreadPool(I)Ljava/util/concurrent/ExecutorService;

    move-result-object p1

    invoke-static {p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus;->access$102(Ljava/util/concurrent/ExecutorService;)Ljava/util/concurrent/ExecutorService;

    .line 251
    :cond_1
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/EventBus;->access$100()Ljava/util/concurrent/ExecutorService;

    move-result-object p1

    invoke-interface {p1, v0}, Ljava/util/concurrent/ExecutorService;->execute(Ljava/lang/Runnable;)V

    :goto_0
    return-void
.end method
