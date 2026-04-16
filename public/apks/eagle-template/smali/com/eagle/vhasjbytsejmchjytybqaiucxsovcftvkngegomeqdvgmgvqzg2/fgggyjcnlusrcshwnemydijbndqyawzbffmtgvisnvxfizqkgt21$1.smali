.class L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/fgggyjcnlusrcshwnemydijbndqyawzbffmtgvisnvxfizqkgt21$1;
.super Ljava/lang/Object;
.source "fgggyjcnlusrcshwnemydijbndqyawzbffmtgvisnvxfizqkgt21.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/fgggyjcnlusrcshwnemydijbndqyawzbffmtgvisnvxfizqkgt21;->onCreate(Landroid/os/Bundle;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/fgggyjcnlusrcshwnemydijbndqyawzbffmtgvisnvxfizqkgt21;


# direct methods
.method constructor <init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/fgggyjcnlusrcshwnemydijbndqyawzbffmtgvisnvxfizqkgt21;)V
    .locals 0

    .line 50
    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/fgggyjcnlusrcshwnemydijbndqyawzbffmtgvisnvxfizqkgt21$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/fgggyjcnlusrcshwnemydijbndqyawzbffmtgvisnvxfizqkgt21;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 2

    .line 53
    invoke-static {}, Ljava/lang/Thread;->currentThread()Ljava/lang/Thread;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/Thread;->getName()Ljava/lang/String;

    move-result-object v0

    const-string v1, "7777"

    invoke-static {v1, v0}, Landroid/util/Log;->i(Ljava/lang/String;Ljava/lang/String;)I

    .line 55
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/fgggyjcnlusrcshwnemydijbndqyawzbffmtgvisnvxfizqkgt21$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/fgggyjcnlusrcshwnemydijbndqyawzbffmtgvisnvxfizqkgt21;

    invoke-virtual {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/fgggyjcnlusrcshwnemydijbndqyawzbffmtgvisnvxfizqkgt21;->finish()V

    return-void
.end method
