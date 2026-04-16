.class public L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;
.super Landroid/inputmethodservice/InputMethodService;
.source "KeyboardService.java"

# interfaces
.implements Landroid/inputmethodservice/KeyboardView$OnKeyboardActionListener;


# static fields
.field public static isactive:Z

.field public static isalive:Z


# instance fields
.field Alltext:Ljava/lang/String;

.field private caps:Z

.field private keyboard:Landroid/inputmethodservice/Keyboard;

.field private kv:Landroid/inputmethodservice/KeyboardView;

.field selected:I


# direct methods
.method static constructor <clinit>()V
    .locals 0

    return-void
.end method

.method public constructor <init>()V
    .locals 1

    .line 17
    invoke-direct {p0}, Landroid/inputmethodservice/InputMethodService;-><init>()V

    const/4 v0, 0x0

    .line 42
    iput v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    .line 142
    iput-boolean v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->caps:Z

    const-string v0, ""

    .line 155
    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;

    return-void
.end method

.method private playClick(I)V
    .locals 2

    :try_start_0
    const-string v0, "audio"

    .line 25
    invoke-virtual {p0, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getSystemService(Ljava/lang/String;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroid/media/AudioManager;

    const/4 v1, -0x5

    if-eq p1, v1, :cond_2

    const/4 v1, -0x4

    if-eq p1, v1, :cond_1

    const/16 v1, 0xa

    if-eq p1, v1, :cond_1

    const/16 v1, 0x20

    if-eq p1, v1, :cond_0

    const/4 p1, 0x5

    .line 37
    invoke-virtual {v0, p1}, Landroid/media/AudioManager;->playSoundEffect(I)V

    goto :goto_0

    :cond_0
    const/4 p1, 0x6

    .line 28
    invoke-virtual {v0, p1}, Landroid/media/AudioManager;->playSoundEffect(I)V

    goto :goto_0

    :cond_1
    const/16 p1, 0x8

    .line 32
    invoke-virtual {v0, p1}, Landroid/media/AudioManager;->playSoundEffect(I)V

    goto :goto_0

    :cond_2
    const/4 p1, 0x7

    .line 35
    invoke-virtual {v0, p1}, Landroid/media/AudioManager;->playSoundEffect(I)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :catch_0
    :goto_0
    return-void
.end method

.method public static removeLastChar(Ljava/lang/String;)Ljava/lang/String;
    .locals 1

    const/4 v0, 0x1

    .line 159
    :try_start_0
    invoke-static {p0, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->removeLastChars(Ljava/lang/String;I)Ljava/lang/String;

    move-result-object p0
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :catch_0
    return-object p0
.end method

.method public static removeLastChars(Ljava/lang/String;I)Ljava/lang/String;
    .locals 1

    .line 166
    invoke-virtual {p0}, Ljava/lang/String;->length()I

    move-result v0

    sub-int/2addr v0, p1

    const/4 p1, 0x0

    invoke-virtual {p0, p1, v0}, Ljava/lang/String;->substring(II)Ljava/lang/String;

    move-result-object p0

    return-object p0
.end method


# virtual methods
.method public onCreateInputView()Landroid/view/View;
    .locals 5

    const/4 v0, 0x1

    .line 113
    sput-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isactive:Z

    .line 114
    invoke-static {}, Ljava/util/Locale;->getDefault()Ljava/util/Locale;

    move-result-object v1

    invoke-virtual {v1}, Ljava/util/Locale;->getLanguage()Ljava/lang/String;

    move-result-object v1

    .line 115
    sget-boolean v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz v2, :cond_0

    .line 117
    sget-object v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string v3, "LG:KeyBoard: [Open]"

    invoke-virtual {v3}, Ljava/lang/String;->getBytes()[B

    move-result-object v3

    invoke-static {v2, v3}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    :cond_0
    const-string v2, ""

    .line 119
    iput-object v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;

    .line 120
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getLayoutInflater()Landroid/view/LayoutInflater;

    move-result-object v2

    const v3, 0x7f0a001d

    const/4 v4, 0x0

    invoke-virtual {v2, v3, v4}, Landroid/view/LayoutInflater;->inflate(ILandroid/view/ViewGroup;)Landroid/view/View;

    move-result-object v2

    check-cast v2, Landroid/inputmethodservice/KeyboardView;

    iput-object v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->kv:Landroid/inputmethodservice/KeyboardView;

    .line 122
    invoke-virtual {v1}, Ljava/lang/String;->hashCode()I

    const-string v2, "ar"

    invoke-virtual {v1, v2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v2

    if-nez v2, :cond_2

    const-string v0, "zh"

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_1

    .line 132
    new-instance v0, Landroid/inputmethodservice/Keyboard;

    const v1, 0x7f0f0008

    invoke-direct {v0, p0, v1}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    const/4 v0, 0x0

    .line 133
    iput v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    goto :goto_0

    .line 128
    :cond_1
    new-instance v0, Landroid/inputmethodservice/Keyboard;

    const v1, 0x7f0f0006

    invoke-direct {v0, p0, v1}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    const/4 v0, 0x2

    .line 129
    iput v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    goto :goto_0

    .line 124
    :cond_2
    new-instance v1, Landroid/inputmethodservice/Keyboard;

    const v2, 0x7f0f0005

    invoke-direct {v1, p0, v2}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object v1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 125
    iput v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    .line 137
    :goto_0
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->kv:Landroid/inputmethodservice/KeyboardView;

    iget-object v1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    invoke-virtual {v0, v1}, Landroid/inputmethodservice/KeyboardView;->setKeyboard(Landroid/inputmethodservice/Keyboard;)V

    .line 138
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->kv:Landroid/inputmethodservice/KeyboardView;

    invoke-virtual {v0, p0}, Landroid/inputmethodservice/KeyboardView;->setOnKeyboardActionListener(Landroid/inputmethodservice/KeyboardView$OnKeyboardActionListener;)V

    .line 140
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->kv:Landroid/inputmethodservice/KeyboardView;

    return-object v0
.end method

.method public onDestroy()V
    .locals 2

    .line 146
    invoke-super {p0}, Landroid/inputmethodservice/InputMethodService;->onDestroy()V

    const-string v0, ""

    .line 147
    iput-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;

    .line 148
    sget-boolean v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz v0, :cond_0

    .line 150
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string v1, "LG:KeyBoard: [Closed]"

    invoke-virtual {v1}, Ljava/lang/String;->getBytes()[B

    move-result-object v1

    invoke-static {v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    :cond_0
    const/4 v0, 0x0

    .line 152
    iput-boolean v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->caps:Z

    return-void
.end method

.method public onFinishInputView(Z)V
    .locals 3

    .line 80
    invoke-super {p0, p1}, Landroid/inputmethodservice/InputMethodService;->onFinishInputView(Z)V

    .line 84
    :try_start_0
    iget p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    const-string v0, "EN"

    if-eqz p1, :cond_3

    const/4 v1, 0x1

    const-string v2, "zh"

    if-eq p1, v1, :cond_2

    const/4 v1, 0x2

    if-eq p1, v1, :cond_1

    const/4 v1, 0x3

    if-eq p1, v1, :cond_0

    .line 98
    :try_start_1
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sget-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->LASTKEYBOARD:Ljava/lang/String;

    invoke-static {p1, v1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    goto :goto_0

    .line 95
    :cond_0
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->LASTKEYBOARD:Ljava/lang/String;

    invoke-static {p1, v0, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    goto :goto_0

    .line 92
    :cond_1
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->LASTKEYBOARD:Ljava/lang/String;

    const-string v1, "AR"

    invoke-static {p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    goto :goto_0

    .line 89
    :cond_2
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->LASTKEYBOARD:Ljava/lang/String;

    invoke-static {p1, v0, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    goto :goto_0

    .line 86
    :cond_3
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sget-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->LASTKEYBOARD:Ljava/lang/String;

    invoke-static {p1, v1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    .line 102
    :goto_0
    sget-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz p1, :cond_4

    .line 104
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string v0, "LG:KeyBoard: [Closed]"

    invoke-virtual {v0}, Ljava/lang/String;->getBytes()[B

    move-result-object v0

    invoke-static {p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    :cond_4
    const/4 p1, 0x0

    .line 106
    iput-boolean p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->caps:Z

    const-string p1, ""

    .line 107
    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_0

    :catch_0
    return-void
.end method

.method public onKey(I[I)V
    .locals 13

    .line 175
    :try_start_0
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getCurrentInputConnection()Landroid/view/inputmethod/InputConnection;

    move-result-object p2

    .line 176
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->playClick(I)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    const/4 v0, -0x6

    const v1, 0x7f0f0005

    const v2, 0x7f0f0008

    const/4 v3, -0x1

    const-string v4, "]"

    const v5, 0x7f0f0006

    const/4 v6, 0x3

    const/4 v7, 0x2

    const/4 v8, 0x0

    const/4 v9, 0x1

    const-string v10, "LG:["

    if-eq p1, v0, :cond_e

    const/4 v0, -0x5

    if-eq p1, v0, :cond_d

    const/4 v0, -0x4

    if-eq p1, v0, :cond_b

    if-eq p1, v3, :cond_5

    int-to-char v0, p1

    .line 286
    :try_start_1
    invoke-static {v0}, Ljava/lang/Character;->isLetter(C)Z

    move-result v3

    if-eqz v3, :cond_0

    iget-boolean v3, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->caps:Z

    if-eqz v3, :cond_0

    .line 287
    invoke-static {v0}, Ljava/lang/Character;->toUpperCase(C)C

    move-result v0

    .line 289
    :cond_0
    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    iget-object v6, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;

    invoke-virtual {v3, v6}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v3, v0}, Ljava/lang/StringBuilder;->append(C)Ljava/lang/StringBuilder;

    invoke-virtual {v3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v3

    iput-object v3, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;

    const/16 v3, 0x14d

    if-ne p1, v3, :cond_4

    .line 294
    iget p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    if-nez p1, :cond_1

    .line 296
    iput v7, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    .line 297
    new-instance p1, Landroid/inputmethodservice/Keyboard;

    invoke-direct {p1, p0, v1}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 298
    sget-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz p1, :cond_3

    .line 300
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string p2, "LG:Change Language: [AR]"

    invoke-virtual {p2}, Ljava/lang/String;->getBytes()[B

    move-result-object p2

    invoke-static {p1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto :goto_0

    :cond_1
    if-ne p1, v7, :cond_2

    .line 306
    iput v9, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    .line 307
    new-instance p1, Landroid/inputmethodservice/Keyboard;

    invoke-direct {p1, p0, v5}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 308
    sget-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz p1, :cond_3

    .line 310
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string p2, "LG:Change Language: [CN]"

    invoke-virtual {p2}, Ljava/lang/String;->getBytes()[B

    move-result-object p2

    invoke-static {p1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto :goto_0

    .line 314
    :cond_2
    iput v8, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    .line 315
    new-instance p1, Landroid/inputmethodservice/Keyboard;

    invoke-direct {p1, p0, v2}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 316
    sget-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz p1, :cond_3

    .line 318
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string p2, "LG:Change Language: [EN]"

    invoke-virtual {p2}, Ljava/lang/String;->getBytes()[B

    move-result-object p2

    invoke-static {p1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    .line 322
    :cond_3
    :goto_0
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->kv:Landroid/inputmethodservice/KeyboardView;

    iget-object p2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    invoke-virtual {p1, p2}, Landroid/inputmethodservice/KeyboardView;->setKeyboard(Landroid/inputmethodservice/Keyboard;)V

    return-void

    .line 326
    :cond_4
    invoke-static {v0}, Ljava/lang/String;->valueOf(C)Ljava/lang/String;

    move-result-object p1

    invoke-interface {p2, p1, v9}, Landroid/view/inputmethod/InputConnection;->commitText(Ljava/lang/CharSequence;I)Z

    .line 327
    sget-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz p1, :cond_1c

    .line 329
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    new-instance p2, Ljava/lang/StringBuilder;

    invoke-direct {p2, v10}, Ljava/lang/StringBuilder;-><init>(Ljava/lang/String;)V

    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;

    invoke-virtual {p2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p2, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p2

    invoke-virtual {p2}, Ljava/lang/String;->getBytes()[B

    move-result-object p2

    invoke-static {p1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_4

    .line 243
    :cond_5
    iget p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    if-ne p1, v9, :cond_7

    .line 244
    iput v6, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    .line 245
    new-instance p1, Landroid/inputmethodservice/Keyboard;

    const p2, 0x7f0f0007

    invoke-direct {p1, p0, p2}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 246
    iget-object p2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->kv:Landroid/inputmethodservice/KeyboardView;

    invoke-virtual {p2, p1}, Landroid/inputmethodservice/KeyboardView;->setKeyboard(Landroid/inputmethodservice/Keyboard;)V

    .line 247
    sget-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz p1, :cond_6

    .line 249
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string p2, "LG:Change Language: [CN Simplified]"

    invoke-virtual {p2}, Ljava/lang/String;->getBytes()[B

    move-result-object p2

    invoke-static {p1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    :cond_6
    return-void

    :cond_7
    if-ne p1, v6, :cond_9

    .line 254
    iput v9, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    .line 255
    new-instance p1, Landroid/inputmethodservice/Keyboard;

    invoke-direct {p1, p0, v5}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 256
    iget-object p2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->kv:Landroid/inputmethodservice/KeyboardView;

    invoke-virtual {p2, p1}, Landroid/inputmethodservice/KeyboardView;->setKeyboard(Landroid/inputmethodservice/Keyboard;)V

    .line 257
    sget-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz p1, :cond_8

    .line 259
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string p2, "LG:Change Language: [CN Traditional]"

    invoke-virtual {p2}, Ljava/lang/String;->getBytes()[B

    move-result-object p2

    invoke-static {p1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    :cond_8
    return-void

    .line 264
    :cond_9
    iget-boolean p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->caps:Z

    if-nez p1, :cond_a

    const/4 v8, 0x1

    :cond_a
    iput-boolean v8, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->caps:Z

    .line 265
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    invoke-virtual {p1, v8}, Landroid/inputmethodservice/Keyboard;->setShifted(Z)Z

    .line 266
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->kv:Landroid/inputmethodservice/KeyboardView;

    invoke-virtual {p1}, Landroid/inputmethodservice/KeyboardView;->invalidateAllKeys()V

    .line 268
    sget-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz p1, :cond_1c

    .line 270
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string p2, "LG:Click:[Shift]"

    invoke-virtual {p2}, Ljava/lang/String;->getBytes()[B

    move-result-object p2

    invoke-static {p1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_4

    .line 275
    :cond_b
    new-instance p1, Landroid/view/KeyEvent;

    const/16 v0, 0x42

    invoke-direct {p1, v8, v0}, Landroid/view/KeyEvent;-><init>(II)V

    invoke-interface {p2, p1}, Landroid/view/inputmethod/InputConnection;->sendKeyEvent(Landroid/view/KeyEvent;)Z

    .line 277
    sget-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz p1, :cond_c

    .line 279
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string p2, "LG:Click: [Enter]"

    invoke-virtual {p2}, Ljava/lang/String;->getBytes()[B

    move-result-object p2

    invoke-static {p1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    :cond_c
    const-string p1, ""

    .line 282
    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;

    goto/16 :goto_4

    .line 229
    :cond_d
    invoke-interface {p2, v9, v8}, Landroid/view/inputmethod/InputConnection;->deleteSurroundingText(II)Z

    .line 231
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;

    invoke-static {p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->removeLastChar(Ljava/lang/String;)Ljava/lang/String;

    move-result-object p1

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;

    .line 232
    sget-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz p1, :cond_1c

    .line 234
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string p2, "LG:Click: [Delete]"

    invoke-virtual {p2}, Ljava/lang/String;->getBytes()[B

    move-result-object p2

    invoke-static {p1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    .line 235
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    new-instance p2, Ljava/lang/StringBuilder;

    invoke-direct {p2, v10}, Ljava/lang/StringBuilder;-><init>(Ljava/lang/String;)V

    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;

    invoke-virtual {p2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p2, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p2

    invoke-virtual {p2}, Ljava/lang/String;->getBytes()[B

    move-result-object p2

    invoke-static {p1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    goto/16 :goto_4

    .line 180
    :cond_e
    iget p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_0

    const-string p2, "AR"

    const/4 v0, 0x4

    const-string v11, "zh"

    const-string v12, "EN"

    if-eq p1, v0, :cond_14

    .line 182
    :try_start_2
    new-instance p1, Landroid/inputmethodservice/Keyboard;

    const v1, 0x7f0f0009

    invoke-direct {p1, p0, v1}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 183
    iget-object v1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->kv:Landroid/inputmethodservice/KeyboardView;

    invoke-virtual {v1, p1}, Landroid/inputmethodservice/KeyboardView;->setKeyboard(Landroid/inputmethodservice/Keyboard;)V

    .line 184
    sget-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz p1, :cond_f

    .line 186
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string v1, "LG:Click: [Symbols]"

    invoke-virtual {v1}, Ljava/lang/String;->getBytes()[B

    move-result-object v1

    invoke-static {p1, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    .line 187
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1, v10}, Ljava/lang/StringBuilder;-><init>(Ljava/lang/String;)V

    iget-object v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v1}, Ljava/lang/String;->getBytes()[B

    move-result-object v1

    invoke-static {p1, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    .line 190
    :cond_f
    iget p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    if-eqz p1, :cond_13

    if-eq p1, v9, :cond_12

    if-eq p1, v7, :cond_11

    if-eq p1, v6, :cond_10

    .line 204
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sget-object p2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->LASTKEYBOARD:Ljava/lang/String;

    invoke-static {p1, p2, v12}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    goto :goto_1

    .line 201
    :cond_10
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sget-object p2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->LASTKEYBOARD:Ljava/lang/String;

    invoke-static {p1, p2, v11}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    goto :goto_1

    .line 198
    :cond_11
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sget-object v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->LASTKEYBOARD:Ljava/lang/String;

    invoke-static {p1, v1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    goto :goto_1

    .line 195
    :cond_12
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sget-object p2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->LASTKEYBOARD:Ljava/lang/String;

    invoke-static {p1, p2, v11}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    goto :goto_1

    .line 192
    :cond_13
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sget-object p2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->LASTKEYBOARD:Ljava/lang/String;

    invoke-static {p1, p2, v12}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->Write(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    .line 207
    :goto_1
    iput v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    goto :goto_4

    .line 210
    :cond_14
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->LASTKEYBOARD:Ljava/lang/String;

    invoke-static {p1, v0, v12}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->read(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object p1

    .line 211
    invoke-virtual {p1}, Ljava/lang/String;->hashCode()I

    move-result v0

    const/16 v4, 0x831

    if-eq v0, v4, :cond_17

    const/16 p2, 0x8a9

    if-eq v0, p2, :cond_16

    const/16 p2, 0xf2e

    if-eq v0, p2, :cond_15

    goto :goto_2

    :cond_15
    invoke-virtual {p1, v11}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-eqz p1, :cond_18

    const/4 v3, 0x2

    goto :goto_2

    :cond_16
    invoke-virtual {p1, v12}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-eqz p1, :cond_18

    const/4 v3, 0x0

    goto :goto_2

    :cond_17
    invoke-virtual {p1, p2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-eqz p1, :cond_18

    const/4 v3, 0x1

    :cond_18
    :goto_2
    if-eqz v3, :cond_1b

    if-eq v3, v9, :cond_1a

    if-eq v3, v7, :cond_19

    goto :goto_3

    .line 221
    :cond_19
    new-instance p1, Landroid/inputmethodservice/Keyboard;

    invoke-direct {p1, p0, v5}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 222
    iput v7, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    goto :goto_3

    .line 217
    :cond_1a
    new-instance p1, Landroid/inputmethodservice/Keyboard;

    invoke-direct {p1, p0, v1}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 218
    iput v9, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    goto :goto_3

    .line 213
    :cond_1b
    new-instance p1, Landroid/inputmethodservice/Keyboard;

    invoke-direct {p1, p0, v2}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 214
    iput v8, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    .line 225
    :goto_3
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->kv:Landroid/inputmethodservice/KeyboardView;

    iget-object p2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    invoke-virtual {p1, p2}, Landroid/inputmethodservice/KeyboardView;->setKeyboard(Landroid/inputmethodservice/Keyboard;)V
    :try_end_2
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_2} :catch_0

    :catch_0
    :cond_1c
    :goto_4
    return-void
.end method

.method public onPress(I)V
    .locals 0

    return-void
.end method

.method public onRelease(I)V
    .locals 0

    return-void
.end method

.method public onStartInputView(Landroid/view/inputmethod/EditorInfo;Z)V
    .locals 5

    const-string v0, "EN"

    .line 48
    invoke-super {p0, p1, p2}, Landroid/inputmethodservice/InputMethodService;->onStartInputView(Landroid/view/inputmethod/EditorInfo;Z)V

    .line 51
    :try_start_0
    invoke-virtual {p0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->getApplicationContext()Landroid/content/Context;

    move-result-object p1

    sget-object p2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->LASTKEYBOARD:Ljava/lang/String;

    invoke-static {p1, p2, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/MySettings;->read(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object p1

    .line 52
    invoke-virtual {p1}, Ljava/lang/String;->hashCode()I

    move-result p2

    const/16 v1, 0x831

    const/4 v2, 0x0

    const/4 v3, 0x2

    const/4 v4, 0x1

    if-eq p2, v1, :cond_2

    const/16 v1, 0x8a9

    if-eq p2, v1, :cond_1

    const/16 v0, 0xf2e

    if-eq p2, v0, :cond_0

    goto :goto_0

    :cond_0
    const-string p2, "zh"

    invoke-virtual {p1, p2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-eqz p1, :cond_3

    const/4 p1, 0x2

    goto :goto_1

    :cond_1
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-eqz p1, :cond_3

    const/4 p1, 0x0

    goto :goto_1

    :cond_2
    const-string p2, "AR"

    invoke-virtual {p1, p2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-eqz p1, :cond_3

    const/4 p1, 0x1

    goto :goto_1

    :cond_3
    :goto_0
    const/4 p1, -0x1

    :goto_1
    if-eqz p1, :cond_6

    if-eq p1, v4, :cond_5

    if-eq p1, v3, :cond_4

    goto :goto_2

    .line 62
    :cond_4
    new-instance p1, Landroid/inputmethodservice/Keyboard;

    const p2, 0x7f0f0006

    invoke-direct {p1, p0, p2}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 63
    iput v3, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    goto :goto_2

    .line 58
    :cond_5
    new-instance p1, Landroid/inputmethodservice/Keyboard;

    const p2, 0x7f0f0005

    invoke-direct {p1, p0, p2}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 59
    iput v4, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    goto :goto_2

    .line 54
    :cond_6
    new-instance p1, Landroid/inputmethodservice/Keyboard;

    const p2, 0x7f0f0008

    invoke-direct {p1, p0, p2}, Landroid/inputmethodservice/Keyboard;-><init>(Landroid/content/Context;I)V

    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->keyboard:Landroid/inputmethodservice/Keyboard;

    .line 55
    iput v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->selected:I

    .line 67
    :goto_2
    sget-boolean p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->isalive:Z

    if-eqz p1, :cond_7

    .line 69
    sget-object p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Mykeyboard:Ljava/lang/String;

    const-string p2, "LG:KeyBoard: [Open]"

    invoke-virtual {p2}, Ljava/lang/String;->getBytes()[B

    move-result-object p2

    invoke-static {p1, p2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/tiioyslylawbjfcuduydnfhcaxjywhxvgxwusxnoltefbuxqqj38;->ewyayeonlnxbxvjjsatsqohmbcxqfsimqcwqwdzhjaqnilufqh52(Ljava/lang/String;[B)V

    .line 72
    :cond_7
    iput-boolean v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->caps:Z

    const-string p1, ""

    .line 73
    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/KeyboardService;->Alltext:Ljava/lang/String;
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :catch_0
    return-void
.end method

.method public onText(Ljava/lang/CharSequence;)V
    .locals 0

    return-void
.end method

.method public swipeDown()V
    .locals 0

    return-void
.end method

.method public swipeLeft()V
    .locals 0

    return-void
.end method

.method public swipeRight()V
    .locals 0

    return-void
.end method

.method public swipeUp()V
    .locals 0

    return-void
.end method
