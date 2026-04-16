.class public L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;
.super Ljava/lang/Object;
.source "AutoStart.java"


# static fields
.field private static volatile instance:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;


# instance fields
.field private final BRAND_ASUS:Ljava/lang/String;

.field private final BRAND_HONOR:Ljava/lang/String;

.field private final BRAND_HUAWEI:Ljava/lang/String;

.field private final BRAND_LETV:Ljava/lang/String;

.field private final BRAND_Meizu:Ljava/lang/String;

.field private final BRAND_NOKIA:Ljava/lang/String;

.field private final BRAND_ONE_PLUS:Ljava/lang/String;

.field private final BRAND_OPPO:Ljava/lang/String;

.field private final BRAND_SAMSUNG:Ljava/lang/String;

.field private final BRAND_VIVO:Ljava/lang/String;

.field private final BRAND_XIAOMI:Ljava/lang/String;

.field private final BRAND_XIAOMI_POCO:Ljava/lang/String;

.field private final BRAND_XIAOMI_REDMI:Ljava/lang/String;

.field private final BRAND_ulong:Ljava/lang/String;

.field private final PACKAGES_TO_CHECK_FOR_PERMISSION:Ljava/util/List;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/List<",
            "Ljava/lang/String;",
            ">;"
        }
    .end annotation
.end field

.field private final PACKAGE_ASUS_COMPONENT:Ljava/lang/String;

.field private final PACKAGE_ASUS_COMPONENT_FALLBACK:Ljava/lang/String;

.field private final PACKAGE_ASUS_MAIN:Ljava/lang/String;

.field private final PACKAGE_HONOR_COMPONENT:Ljava/lang/String;

.field private final PACKAGE_HONOR_MAIN:Ljava/lang/String;

.field private final PACKAGE_HUAWEI_COMPONENT:Ljava/lang/String;

.field private final PACKAGE_HUAWEI_COMPONENT_FALLBACK:Ljava/lang/String;

.field private final PACKAGE_HUAWEI_MAIN:Ljava/lang/String;

.field private final PACKAGE_LETV_COMPONENT:Ljava/lang/String;

.field private final PACKAGE_LETV_COMPONENT_A:Ljava/lang/String;

.field private final PACKAGE_LETV_MAIN:Ljava/lang/String;

.field private final PACKAGE_Meizu_COMPONENT:Ljava/lang/String;

.field private final PACKAGE_Meizu_MAIN:Ljava/lang/String;

.field private final PACKAGE_NOKIA_COMPONENT:Ljava/lang/String;

.field private final PACKAGE_NOKIA_MAIN:Ljava/lang/String;

.field private final PACKAGE_ONE_PLUS_ACTION:Ljava/lang/String;

.field private final PACKAGE_ONE_PLUS_COMPONENT:Ljava/lang/String;

.field private final PACKAGE_ONE_PLUS_COMPONENT_FALLBACK:Ljava/lang/String;

.field private final PACKAGE_ONE_PLUS_COMPONENT_FALLBACK_A:Ljava/lang/String;

.field private final PACKAGE_ONE_PLUS_COMPONENT_FALLBACK_A_B:Ljava/lang/String;

.field private final PACKAGE_ONE_PLUS_FALLBACK:Ljava/lang/String;

.field private final PACKAGE_ONE_PLUS_MAIN:Ljava/lang/String;

.field private final PACKAGE_ONE_PLUS_MAIN_A:Ljava/lang/String;

.field private final PACKAGE_OPPO_COMPONENT:Ljava/lang/String;

.field private final PACKAGE_OPPO_COMPONENT_FALLBACK:Ljava/lang/String;

.field private final PACKAGE_OPPO_COMPONENT_FALLBACK_A:Ljava/lang/String;

.field private final PACKAGE_OPPO_FALLBACK:Ljava/lang/String;

.field private final PACKAGE_OPPO_MAIN:Ljava/lang/String;

.field private final PACKAGE_SAMSUNG_COMPONENT:Ljava/lang/String;

.field private final PACKAGE_SAMSUNG_COMPONENT_2:Ljava/lang/String;

.field private final PACKAGE_SAMSUNG_COMPONENT_3:Ljava/lang/String;

.field private final PACKAGE_SAMSUNG_MAIN:Ljava/lang/String;

.field private final PACKAGE_VIVO_COMPONENT:Ljava/lang/String;

.field private final PACKAGE_VIVO_COMPONENT_FALLBACK:Ljava/lang/String;

.field private final PACKAGE_VIVO_COMPONENT_FALLBACK_A:Ljava/lang/String;

.field private final PACKAGE_VIVO_COMPONENT_FALLBACK_A_A:Ljava/lang/String;

.field private final PACKAGE_VIVO_COMPONENT_FALLBACK_A_B:Ljava/lang/String;

.field private final PACKAGE_VIVO_FALLBACK:Ljava/lang/String;

.field private final PACKAGE_VIVO_MAIN:Ljava/lang/String;

.field private final PACKAGE_VIVO_MAIN_A_A:Ljava/lang/String;

.field private final PACKAGE_VIVO_MAIN_B:Ljava/lang/String;

.field private final PACKAGE_XIAOMI_COMPONENT:Ljava/lang/String;

.field private final PACKAGE_XIAOMI_MAIN:Ljava/lang/String;

.field private final PACKAGE_ulong_COMPONENT:Ljava/lang/String;

.field private final PACKAGE_ulong_MAIN:Ljava/lang/String;


# direct methods
.method static constructor <clinit>()V
    .locals 0

    return-void
.end method

.method public constructor <init>()V
    .locals 17

    move-object/from16 v0, p0

    .line 20
    invoke-direct/range {p0 .. p0}, Ljava/lang/Object;-><init>()V

    const-string v1, "Meizu"

    .line 27
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_Meizu:Ljava/lang/String;

    const-string v1, "com.meizu.safe"

    .line 28
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_Meizu_MAIN:Ljava/lang/String;

    const-string v1, "com.meizu.safe.permission.SmartBGActivity"

    .line 29
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_Meizu_COMPONENT:Ljava/lang/String;

    const-string v1, "xiaomi"

    .line 34
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_XIAOMI:Ljava/lang/String;

    const-string v1, "poco"

    .line 35
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_XIAOMI_POCO:Ljava/lang/String;

    const-string v1, "redmi"

    .line 36
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_XIAOMI_REDMI:Ljava/lang/String;

    const-string v1, "com.miui.securitycenter"

    .line 37
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_XIAOMI_MAIN:Ljava/lang/String;

    const-string v1, "com.miui.permcenter.autostart.AutoStartManagementActivity"

    .line 38
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_XIAOMI_COMPONENT:Ljava/lang/String;

    const-string v1, "ulong"

    .line 44
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_ulong:Ljava/lang/String;

    const-string v1, "com.yulong.android.coolsafe"

    .line 45
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ulong_MAIN:Ljava/lang/String;

    const-string v1, "com.yulong.android.coolsafe.ui.activity.autorun.AutoRunListActivity"

    .line 46
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ulong_COMPONENT:Ljava/lang/String;

    const-string v1, "letv"

    .line 50
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_LETV:Ljava/lang/String;

    const-string v1, "com.letv.android.letvsafe"

    .line 51
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_LETV_MAIN:Ljava/lang/String;

    const-string v1, "com.letv.android.letvsafe.AutobootManageActivity"

    .line 52
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_LETV_COMPONENT:Ljava/lang/String;

    const-string v1, "com.letv.android.permissionautoboot"

    .line 53
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_LETV_COMPONENT_A:Ljava/lang/String;

    const-string v1, "asus"

    .line 58
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_ASUS:Ljava/lang/String;

    const-string v1, "com.asus.mobilemanager"

    .line 59
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ASUS_MAIN:Ljava/lang/String;

    const-string v1, "com.asus.mobilemanager.powersaver.PowerSaverSettings"

    .line 60
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ASUS_COMPONENT:Ljava/lang/String;

    const-string v1, "com.asus.mobilemanager.autostart.AutoStartActivity"

    .line 61
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ASUS_COMPONENT_FALLBACK:Ljava/lang/String;

    const-string v1, "honor"

    .line 66
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_HONOR:Ljava/lang/String;

    const-string v1, "com.huawei.systemmanager"

    .line 67
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_HONOR_MAIN:Ljava/lang/String;

    const-string v2, "com.huawei.systemmanager.optimize.process.ProtectActivity"

    .line 68
    iput-object v2, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_HONOR_COMPONENT:Ljava/lang/String;

    const-string v3, "huawei"

    .line 73
    iput-object v3, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_HUAWEI:Ljava/lang/String;

    .line 74
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_HUAWEI_MAIN:Ljava/lang/String;

    const-string v1, "com.huawei.systemmanager.startupmgr.ui.StartupNormalAppListActivity"

    .line 75
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_HUAWEI_COMPONENT:Ljava/lang/String;

    .line 76
    iput-object v2, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_HUAWEI_COMPONENT_FALLBACK:Ljava/lang/String;

    const-string v1, "vivo"

    .line 82
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_VIVO:Ljava/lang/String;

    const-string v1, "com.iqoo.secure"

    .line 83
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_VIVO_MAIN:Ljava/lang/String;

    const-string v1, "com.iqoo.powersaving"

    .line 84
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_VIVO_MAIN_B:Ljava/lang/String;

    const-string v1, "com.vivo.permissionmanager"

    .line 86
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_VIVO_FALLBACK:Ljava/lang/String;

    const-string v1, "com.iqoo.secure.ui.phoneoptimize.AddWhiteListActivity"

    .line 87
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_VIVO_COMPONENT:Ljava/lang/String;

    const-string v1, "com.vivo.permissionmanager.activity.BgStartUpManagerActivity"

    .line 88
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_VIVO_COMPONENT_FALLBACK:Ljava/lang/String;

    const-string v1, "com.iqoo.secure.ui.phoneoptimize.BgStartUpManager"

    .line 89
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_VIVO_COMPONENT_FALLBACK_A:Ljava/lang/String;

    const-string v1, "com.iqoo.powersaving.PowerSavingManagerActivity"

    .line 90
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_VIVO_COMPONENT_FALLBACK_A_B:Ljava/lang/String;

    const-string v1, "com.vivo.abe"

    .line 93
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_VIVO_MAIN_A_A:Ljava/lang/String;

    const-string v1, "com.vivo.applicationbehaviorengine.ui.ExcessivePowerManager"

    .line 94
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_VIVO_COMPONENT_FALLBACK_A_A:Ljava/lang/String;

    const-string v1, "nokia"

    .line 100
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_NOKIA:Ljava/lang/String;

    const-string v1, "com.evenwell.powersaving.g3"

    .line 101
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_NOKIA_MAIN:Ljava/lang/String;

    const-string v1, "com.evenwell.powersaving.g3.exception.PowerSaverExceptionActivity"

    .line 102
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_NOKIA_COMPONENT:Ljava/lang/String;

    const-string v1, "samsung"

    .line 107
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_SAMSUNG:Ljava/lang/String;

    const-string v1, "com.samsung.android.lool"

    .line 109
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_SAMSUNG_MAIN:Ljava/lang/String;

    const-string v1, "com.samsung.android.sm.ui.battery.BatteryActivity"

    .line 110
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_SAMSUNG_COMPONENT:Ljava/lang/String;

    const-string v1, "com.samsung.android.sm.battery.ui.usage.CheckableAppListActivity"

    .line 111
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_SAMSUNG_COMPONENT_2:Ljava/lang/String;

    const-string v1, "com.samsung.android.sm.battery.ui.BatteryActivity"

    .line 112
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_SAMSUNG_COMPONENT_3:Ljava/lang/String;

    const-string v1, "oppo"

    .line 117
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_OPPO:Ljava/lang/String;

    const-string v1, "com.coloros.safecenter"

    .line 118
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_OPPO_MAIN:Ljava/lang/String;

    const-string v1, "com.oppo.safe"

    .line 119
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_OPPO_FALLBACK:Ljava/lang/String;

    const-string v1, "com.coloros.safecenter.permission.startup.StartupAppListActivity"

    .line 120
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_OPPO_COMPONENT:Ljava/lang/String;

    const-string v1, "com.oppo.safe.permission.startup.StartupAppListActivity"

    .line 121
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_OPPO_COMPONENT_FALLBACK:Ljava/lang/String;

    const-string v1, "com.coloros.safecenter.startupapp.StartupAppListActivity"

    .line 122
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_OPPO_COMPONENT_FALLBACK_A:Ljava/lang/String;

    const-string v1, "oneplus"

    .line 127
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->BRAND_ONE_PLUS:Ljava/lang/String;

    const-string v1, "com.oneplus.security"

    .line 128
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ONE_PLUS_MAIN:Ljava/lang/String;

    const-string v1, "com.oplus.securitypermission"

    .line 130
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ONE_PLUS_FALLBACK:Ljava/lang/String;

    const-string v1, "com.oneplus.security.chainlaunch.view.ChainLaunchAppListActivity"

    .line 131
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ONE_PLUS_COMPONENT:Ljava/lang/String;

    const-string v1, "com.android.settings.action.BACKGROUND_OPTIMIZE"

    .line 132
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ONE_PLUS_ACTION:Ljava/lang/String;

    const-string v1, "com.oplus.securitypermission.startup.StartupAppListActivity"

    .line 133
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ONE_PLUS_COMPONENT_FALLBACK:Ljava/lang/String;

    const-string v1, "com.oneplus.security.startupapp.StartupAppListActivity"

    .line 134
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ONE_PLUS_COMPONENT_FALLBACK_A:Ljava/lang/String;

    const-string v1, "com.oplus.battery"

    .line 136
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ONE_PLUS_MAIN_A:Ljava/lang/String;

    const-string v1, "com.oplus.powermanager.fuelgaue.PowerControlActivity"

    .line 137
    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGE_ONE_PLUS_COMPONENT_FALLBACK_A_B:Ljava/lang/String;

    const-string v2, "com.asus.mobilemanager"

    const-string v3, "com.miui.securitycenter"

    const-string v4, "com.letv.android.letvsafe"

    const-string v5, "com.yulong.android.coolsafe"

    const-string v6, "com.huawei.systemmanager"

    const-string v7, "com.meizu.safe"

    const-string v8, "com.coloros.safecenter"

    const-string v9, "com.oppo.safe"

    const-string v10, "com.iqoo.secure"

    const-string v11, "com.vivo.permissionmanager"

    const-string v12, "com.evenwell.powersaving.g3"

    const-string v13, "com.huawei.systemmanager"

    const-string v14, "com.oneplus.security"

    const-string v15, "com.oplus.battery"

    const-string v16, "com.oplus.securitypermission"

    .line 139
    filled-new-array/range {v2 .. v16}, [Ljava/lang/String;

    move-result-object v1

    invoke-static {v1}, Ljava/util/Arrays;->asList([Ljava/lang/Object;)Ljava/util/List;

    move-result-object v1

    iput-object v1, v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGES_TO_CHECK_FOR_PERMISSION:Ljava/util/List;

    return-void
.end method

.method private Xiaomi2(Landroid/content/Context;)V
    .locals 2

    .line 266
    :try_start_0
    invoke-static {p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->getPermissionManagerIntent(Landroid/content/Context;)Landroid/content/Intent;

    move-result-object v0

    const/high16 v1, 0x10000000

    .line 267
    invoke-virtual {v0, v1}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    const/high16 v1, 0x20000000

    .line 268
    invoke-virtual {v0, v1}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    const/high16 v1, 0x4000000

    .line 269
    invoke-virtual {v0, v1}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    .line 270
    invoke-virtual {p1, v0}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception p1

    const-string v0, "AT.Xiaomi2"

    .line 272
    invoke-static {p1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object p1

    invoke-static {v0, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :goto_0
    return-void
.end method

.method private autoStartAsus(Landroid/content/Context;)Z
    .locals 4

    const-string v0, "com.asus.mobilemanager"

    .line 299
    invoke-direct {p0, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    const/4 v2, 0x0

    if-eqz v1, :cond_0

    :try_start_0
    const-string v1, "com.asus.mobilemanager.powersaver.PowerSaverSettings"

    .line 301
    invoke-direct {p0, p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception v1

    .line 303
    invoke-static {v1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v1

    const-string v3, "AT.autoStartAsus"

    invoke-static {v3, v1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :try_start_1
    const-string v1, "com.asus.mobilemanager.autostart.AutoStartActivity"

    .line 306
    invoke-direct {p0, p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_1

    :goto_0
    const/4 p1, 0x1

    return p1

    :catch_1
    move-exception p1

    .line 308
    invoke-static {p1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object p1

    invoke-static {v3, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    return v2
.end method

.method private autoStartHonor(Landroid/content/Context;)Z
    .locals 3

    const-string v0, "com.huawei.systemmanager"

    .line 384
    invoke-direct {p0, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    const/4 v2, 0x0

    if-eqz v1, :cond_0

    :try_start_0
    const-string v1, "com.huawei.systemmanager.optimize.process.ProtectActivity"

    .line 386
    invoke-direct {p0, p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    const/4 p1, 0x1

    return p1

    :catch_0
    move-exception p1

    const-string v0, "AT.autoStartHonor"

    .line 388
    invoke-static {p1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object p1

    invoke-static {v0, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    return v2
.end method

.method private autoStartHuawei(Landroid/content/Context;)Z
    .locals 4

    const-string v0, "com.huawei.systemmanager"

    .line 400
    invoke-direct {p0, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    const/4 v2, 0x0

    if-eqz v1, :cond_0

    :try_start_0
    const-string v1, "com.huawei.systemmanager.startupmgr.ui.StartupNormalAppListActivity"

    .line 402
    invoke-direct {p0, p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception v1

    .line 404
    invoke-static {v1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v1

    const-string v3, "AT.autoStartHuawei"

    invoke-static {v3, v1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :try_start_1
    const-string v1, "com.huawei.systemmanager.optimize.process.ProtectActivity"

    .line 407
    invoke-direct {p0, p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_1

    :goto_0
    const/4 p1, 0x1

    return p1

    :catch_1
    move-exception p1

    .line 409
    invoke-static {p1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object p1

    invoke-static {v3, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    return v2
.end method

.method private autoStartLetv(Landroid/content/Context;)Z
    .locals 3

    const-string v0, "com.letv.android.letvsafe"

    .line 362
    invoke-direct {p0, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    const/4 v2, 0x0

    if-eqz v1, :cond_0

    :try_start_0
    const-string v1, "com.letv.android.letvsafe.AutobootManageActivity"

    .line 364
    invoke-direct {p0, p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception v0

    :try_start_1
    const-string v1, "com.letv.android.permissionautoboot"

    .line 367
    invoke-direct {p0, p1, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startAction(Landroid/content/Context;Ljava/lang/String;)V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_1

    :goto_0
    const/4 p1, 0x1

    return p1

    :catch_1
    const-string p1, "AT.autoStartLetv"

    .line 370
    invoke-static {v0}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v0

    invoke-static {p1, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    return v2
.end method

.method private autoStartNokia(Landroid/content/Context;)Z
    .locals 3

    const-string v0, "com.evenwell.powersaving.g3"

    .line 509
    invoke-direct {p0, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    const/4 v2, 0x0

    if-eqz v1, :cond_0

    :try_start_0
    const-string v1, "com.evenwell.powersaving.g3.exception.PowerSaverExceptionActivity"

    .line 511
    invoke-direct {p0, p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    const/4 p1, 0x1

    return p1

    :catch_0
    move-exception p1

    const-string v0, "AT.autoStartNokia"

    .line 513
    invoke-static {p1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object p1

    invoke-static {v0, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    return v2
.end method

.method private autoStartOppo(Landroid/content/Context;)Z
    .locals 6

    const-string v0, "com.coloros.safecenter"

    .line 423
    invoke-direct {p0, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    const/4 v2, 0x0

    const-string v3, "com.oppo.safe"

    const/4 v4, 0x1

    if-nez v1, :cond_0

    invoke-direct {p0, p1, v3}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    if-eqz v1, :cond_1

    :cond_0
    :try_start_0
    const-string v1, "com.coloros.safecenter.permission.startup.StartupAppListActivity"

    .line 425
    invoke-direct {p0, p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :goto_0
    const/4 v2, 0x1

    goto :goto_1

    :catch_0
    move-exception v1

    .line 428
    invoke-static {v1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v1

    const-string v5, "AT.autoStartOppo"

    invoke-static {v5, v1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :try_start_1
    const-string v1, "com.oppo.safe.permission.startup.StartupAppListActivity"

    .line 431
    invoke-direct {p0, p1, v3, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_1

    goto :goto_0

    :catch_1
    move-exception v1

    .line 434
    invoke-static {v1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v1

    invoke-static {v5, v1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :try_start_2
    const-string v1, "com.coloros.safecenter.startupapp.StartupAppListActivity"

    .line 437
    invoke-direct {p0, p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_2
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_2} :catch_2

    goto :goto_0

    :catch_2
    move-exception v0

    .line 440
    invoke-static {v0}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v0

    invoke-static {v5, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :cond_1
    :goto_1
    if-nez v2, :cond_2

    .line 451
    new-instance v0, Landroid/content/Intent;

    const-class v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RequestOPPOB;

    invoke-direct {v0, p1, v1}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    const/high16 v1, 0x10000000

    .line 452
    invoke-virtual {v0, v1}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    const/high16 v1, 0x800000

    .line 453
    invoke-virtual {v0, v1}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    .line 454
    invoke-virtual {p1, v0}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V

    goto :goto_2

    :cond_2
    move v4, v2

    :goto_2
    return v4
.end method

.method private autoStartVivo(Landroid/content/Context;)Z
    .locals 6

    const-string v0, "com.iqoo.secure"

    .line 462
    invoke-direct {p0, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    const/4 v2, 0x0

    const-string v3, "com.vivo.abe"

    const-string v4, "com.vivo.permissionmanager"

    if-nez v1, :cond_1

    .line 463
    invoke-direct {p0, p1, v4}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    if-nez v1, :cond_1

    const-string v1, "com.iqoo.powersaving"

    .line 464
    invoke-direct {p0, p1, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    if-nez v1, :cond_1

    .line 465
    invoke-direct {p0, p1, v3}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    if-eqz v1, :cond_0

    goto :goto_0

    :cond_0
    return v2

    .line 467
    :cond_1
    :goto_0
    :try_start_0
    new-instance v1, Landroid/content/Intent;

    invoke-direct {v1}, Landroid/content/Intent;-><init>()V

    const/high16 v5, 0x10000000

    .line 468
    invoke-virtual {v1, v5}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    const-string v5, "com.iqoo.powersaving/.PowerSavingManagerActivity"

    .line 469
    invoke-static {v5}, Landroid/content/ComponentName;->unflattenFromString(Ljava/lang/String;)Landroid/content/ComponentName;

    move-result-object v5

    .line 470
    invoke-virtual {v1, v5}, Landroid/content/Intent;->setComponent(Landroid/content/ComponentName;)Landroid/content/Intent;

    .line 471
    invoke-virtual {p1, v1}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_1

    :catch_0
    :try_start_1
    const-string v1, "com.iqoo.secure.ui.phoneoptimize.AddWhiteListActivity"

    .line 474
    invoke-direct {p0, p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_1

    goto :goto_1

    :catch_1
    move-exception v1

    .line 476
    invoke-static {v1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v1

    const-string v5, "AT.autoStartVivo"

    invoke-static {v5, v1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :try_start_2
    const-string v1, "com.vivo.permissionmanager.activity.BgStartUpManagerActivity"

    .line 479
    invoke-direct {p0, p1, v4, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_2
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_2} :catch_2

    goto :goto_1

    :catch_2
    move-exception v1

    .line 481
    invoke-static {v1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v1

    invoke-static {v5, v1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :try_start_3
    const-string v1, "com.iqoo.secure.ui.phoneoptimize.BgStartUpManager"

    .line 484
    invoke-direct {p0, p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_3
    .catch Ljava/lang/Exception; {:try_start_3 .. :try_end_3} :catch_3

    goto :goto_1

    :catch_3
    move-exception v0

    .line 486
    invoke-static {v0}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v0

    invoke-static {v5, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :try_start_4
    const-string v0, "com.vivo.applicationbehaviorengine.ui.ExcessivePowerManager"

    .line 489
    invoke-direct {p0, p1, v3, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_4
    .catch Ljava/lang/Exception; {:try_start_4 .. :try_end_4} :catch_4

    :goto_1
    const/4 p1, 0x1

    return p1

    :catch_4
    return v2
.end method

.method private autoStartXiaomi(Landroid/content/Context;)Z
    .locals 3

    const-string v0, "com.miui.securitycenter"

    .line 278
    invoke-direct {p0, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    const/4 v2, 0x0

    if-eqz v1, :cond_0

    :try_start_0
    const-string v1, "com.miui.permcenter.autostart.AutoStartManagementActivity"

    .line 280
    invoke-direct {p0, p1, v0, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception v0

    .line 284
    :try_start_1
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->Xiaomi2(Landroid/content/Context;)V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_1

    :goto_0
    const/4 p1, 0x1

    return p1

    :catch_1
    const-string p1, "AT.autoStartXiaomi"

    .line 286
    invoke-static {v0}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v0

    invoke-static {p1, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    return v2
.end method

.method private autoStartmeizu(Landroid/content/Context;)Z
    .locals 4

    const-string v0, "com.meizu.safe.permission.SmartBGActivity"

    const-string v1, "com.meizu.safe"

    .line 320
    invoke-direct {p0, p1, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v2

    const/4 v3, 0x0

    if-eqz v2, :cond_0

    .line 322
    :try_start_0
    invoke-direct {p0, p1, v1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception v1

    .line 325
    :try_start_1
    invoke-direct {p0, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startAction(Landroid/content/Context;Ljava/lang/String;)V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_1

    :goto_0
    const/4 p1, 0x1

    return p1

    :catch_1
    const-string p1, "AT.autoStartLetv"

    .line 328
    invoke-static {v1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v0

    invoke-static {p1, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    return v3
.end method

.method private autoStartulong(Landroid/content/Context;)Z
    .locals 4

    const-string v0, "com.yulong.android.coolsafe.ui.activity.autorun.AutoRunListActivity"

    const-string v1, "com.yulong.android.coolsafe"

    .line 341
    invoke-direct {p0, p1, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v2

    const/4 v3, 0x0

    if-eqz v2, :cond_0

    .line 343
    :try_start_0
    invoke-direct {p0, p1, v1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception v1

    .line 346
    :try_start_1
    invoke-direct {p0, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startAction(Landroid/content/Context;Ljava/lang/String;)V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_1

    :goto_0
    const/4 p1, 0x1

    return p1

    :catch_1
    const-string p1, "AT.autoStartLetv"

    .line 349
    invoke-static {v1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v0

    invoke-static {p1, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :cond_0
    return v3
.end method

.method public static getInstance()L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;
    .locals 1

    .line 648
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->instance:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;

    if-nez v0, :cond_0

    .line 649
    new-instance v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;

    invoke-direct {v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;-><init>()V

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->instance:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;

    .line 650
    :cond_0
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->instance:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;

    return-object v0
.end method

.method public static getPermissionManagerIntent(Landroid/content/Context;)Landroid/content/Intent;
    .locals 3

    .line 259
    new-instance v0, Landroid/content/Intent;

    const-string v1, "miui.intent.action.APP_PERM_EDITOR"

    invoke-direct {v0, v1}, Landroid/content/Intent;-><init>(Ljava/lang/String;)V

    const-string v1, "extra_package_uid"

    .line 260
    invoke-static {}, Landroid/os/Process;->myUid()I

    move-result v2

    invoke-virtual {v0, v1, v2}, Landroid/content/Intent;->putExtra(Ljava/lang/String;I)Landroid/content/Intent;

    const-string v1, "extra_pkgname"

    .line 261
    invoke-virtual {p0}, Landroid/content/Context;->getPackageName()Ljava/lang/String;

    move-result-object p0

    invoke-virtual {v0, v1, p0}, Landroid/content/Intent;->putExtra(Ljava/lang/String;Ljava/lang/String;)Landroid/content/Intent;

    return-object v0
.end method

.method private isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z
    .locals 2

    .line 637
    invoke-virtual {p1}, Landroid/content/Context;->getPackageManager()Landroid/content/pm/PackageManager;

    move-result-object p1

    const/4 v0, 0x0

    .line 638
    invoke-virtual {p1, v0}, Landroid/content/pm/PackageManager;->getInstalledApplications(I)Ljava/util/List;

    move-result-object p1

    .line 639
    invoke-interface {p1}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object p1

    :cond_0
    invoke-interface {p1}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_1

    invoke-interface {p1}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Landroid/content/pm/ApplicationInfo;

    .line 640
    iget-object v1, v1, Landroid/content/pm/ApplicationInfo;->packageName:Ljava/lang/String;

    invoke-virtual {v1, p2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v1

    if-eqz v1, :cond_0

    const/4 p1, 0x1

    return p1

    :cond_1
    return v0
.end method

.method public static isoppooronplus()Z
    .locals 3

    .line 159
    sget-object v0, Landroid/os/Build;->BRAND:Ljava/lang/String;

    sget-object v1, Ljava/util/Locale;->ROOT:Ljava/util/Locale;

    invoke-virtual {v0, v1}, Ljava/lang/String;->toLowerCase(Ljava/util/Locale;)Ljava/lang/String;

    move-result-object v0

    .line 161
    invoke-virtual {v0}, Ljava/lang/String;->hashCode()I

    const-string v1, "oneplus"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v1

    const/4 v2, 0x1

    if-nez v1, :cond_0

    const-string v1, "oppo"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_0

    const/4 v0, 0x0

    return v0

    :cond_0
    return v2
.end method

.method public static issamsung()Z
    .locals 2

    .line 173
    sget-object v0, Landroid/os/Build;->BRAND:Ljava/lang/String;

    sget-object v1, Ljava/util/Locale;->ROOT:Ljava/util/Locale;

    invoke-virtual {v0, v1}, Ljava/lang/String;->toLowerCase(Ljava/util/Locale;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->toLowerCase()Ljava/lang/String;

    move-result-object v0

    .line 175
    invoke-virtual {v0}, Ljava/lang/String;->hashCode()I

    const-string v1, "samsung"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_0

    const/4 v0, 0x0

    return v0

    :cond_0
    const/4 v0, 0x1

    return v0
.end method

.method public static isxaomi()Z
    .locals 2

    .line 188
    sget-object v0, Landroid/os/Build;->BRAND:Ljava/lang/String;

    sget-object v1, Ljava/util/Locale;->ROOT:Ljava/util/Locale;

    invoke-virtual {v0, v1}, Ljava/lang/String;->toLowerCase(Ljava/util/Locale;)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/String;->toLowerCase()Ljava/lang/String;

    move-result-object v0

    .line 190
    invoke-virtual {v0}, Ljava/lang/String;->hashCode()I

    const-string v1, "xiaomi"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_0

    const/4 v0, 0x0

    return v0

    :cond_0
    const/4 v0, 0x1

    return v0
.end method

.method private startAction(Landroid/content/Context;Ljava/lang/String;)V
    .locals 1

    .line 624
    :try_start_0
    new-instance v0, Landroid/content/Intent;

    invoke-direct {v0}, Landroid/content/Intent;-><init>()V

    .line 625
    invoke-virtual {v0, p2}, Landroid/content/Intent;->setAction(Ljava/lang/String;)Landroid/content/Intent;

    const/high16 p2, 0x10000000

    .line 626
    invoke-virtual {v0, p2}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    .line 627
    invoke-virtual {p1, v0}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception p1

    const-string p2, "AT.startAction"

    .line 629
    invoke-static {p1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object p1

    invoke-static {p2, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :goto_0
    return-void
.end method

.method private startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    .locals 2

    .line 608
    :try_start_0
    new-instance v0, Landroid/content/Intent;

    invoke-direct {v0}, Landroid/content/Intent;-><init>()V

    .line 609
    new-instance v1, Landroid/content/ComponentName;

    invoke-direct {v1, p2, p3}, Landroid/content/ComponentName;-><init>(Ljava/lang/String;Ljava/lang/String;)V

    invoke-virtual {v0, v1}, Landroid/content/Intent;->setComponent(Landroid/content/ComponentName;)Landroid/content/Intent;

    const/high16 p2, 0x10000000

    .line 610
    invoke-virtual {v0, p2}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    const/high16 p2, 0x20000000

    .line 611
    invoke-virtual {v0, p2}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    const/high16 p2, 0x4000000

    .line 612
    invoke-virtual {v0, p2}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    .line 613
    invoke-virtual {p1, v0}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception p1

    const-string p2, "AT.startIntent"

    .line 615
    invoke-static {p1}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object p1

    invoke-static {p2, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :goto_0
    return-void
.end method


# virtual methods
.method public autoStartOnePlus(Landroid/content/Context;)Z
    .locals 7

    const-string v0, "com.oneplus.security"

    .line 555
    invoke-direct {p0, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    const-string v2, "com.oplus.battery"

    const-string v3, "com.oplus.securitypermission"

    const/4 v4, 0x0

    if-nez v1, :cond_0

    invoke-direct {p0, p1, v3}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    if-nez v1, :cond_0

    invoke-direct {p0, p1, v2}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->isPackageExists(Landroid/content/Context;Ljava/lang/String;)Z

    move-result v1

    if-eqz v1, :cond_1

    :cond_0
    const/4 v1, 0x1

    :try_start_0
    const-string v5, "com.oneplus.security.chainlaunch.view.ChainLaunchAppListActivity"

    .line 557
    invoke-direct {p0, p1, v0, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :goto_0
    const/4 v4, 0x1

    goto :goto_1

    :catch_0
    move-exception v5

    .line 560
    invoke-static {v5}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v5

    const-string v6, "AT.autoStartOnePlus"

    invoke-static {v6, v5}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :try_start_1
    const-string v5, "com.oplus.securitypermission.startup.StartupAppListActivity"

    .line 563
    invoke-direct {p0, p1, v3, v5}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_1

    goto :goto_0

    :catch_1
    move-exception v3

    .line 566
    invoke-static {v3}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v3

    invoke-static {v6, v3}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :try_start_2
    const-string v3, "com.oneplus.security.startupapp.StartupAppListActivity"

    .line 569
    invoke-direct {p0, p1, v0, v3}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_2
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_2} :catch_2

    goto :goto_0

    :catch_2
    move-exception v0

    .line 572
    invoke-static {v0}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v0

    invoke-static {v6, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :try_start_3
    const-string v0, "com.android.settings.action.BACKGROUND_OPTIMIZE"

    .line 575
    invoke-direct {p0, p1, v0}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startAction(Landroid/content/Context;Ljava/lang/String;)V
    :try_end_3
    .catch Ljava/lang/Exception; {:try_start_3 .. :try_end_3} :catch_3

    goto :goto_0

    :catch_3
    move-exception v0

    :try_start_4
    const-string v1, "com.oplus.powermanager.fuelgaue.PowerControlActivity"

    .line 581
    invoke-direct {p0, p1, v2, v1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->startIntent(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_4
    .catch Ljava/lang/Exception; {:try_start_4 .. :try_end_4} :catch_4

    goto :goto_1

    .line 583
    :catch_4
    invoke-static {v0}, Landroid/util/Log;->getStackTraceString(Ljava/lang/Throwable;)Ljava/lang/String;

    move-result-object v0

    invoke-static {v6, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    :cond_1
    :goto_1
    if-nez v4, :cond_2

    .line 597
    new-instance v0, Landroid/content/Intent;

    const-class v1, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/RequestOPPOB;

    invoke-direct {v0, p1, v1}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    const/high16 v1, 0x10000000

    .line 598
    invoke-virtual {v0, v1}, Landroid/content/Intent;->addFlags(I)Landroid/content/Intent;

    .line 600
    invoke-virtual {p1, v0}, Landroid/content/Context;->startActivity(Landroid/content/Intent;)V

    :cond_2
    return v4
.end method

.method public getAutoStartPermission(Landroid/content/Context;)Z
    .locals 4

    .line 203
    sget-object v0, Landroid/os/Build;->BRAND:Ljava/lang/String;

    sget-object v1, Ljava/util/Locale;->ROOT:Ljava/util/Locale;

    invoke-virtual {v0, v1}, Ljava/lang/String;->toLowerCase(Ljava/util/Locale;)Ljava/lang/String;

    move-result-object v0

    .line 205
    invoke-virtual {v0}, Ljava/lang/String;->hashCode()I

    invoke-virtual {v0}, Ljava/lang/String;->hashCode()I

    move-result v1

    const/4 v2, 0x0

    const/4 v3, -0x1

    sparse-switch v1, :sswitch_data_0

    goto/16 :goto_0

    :sswitch_0
    const-string v1, "ulong"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_0

    goto/16 :goto_0

    :cond_0
    const/16 v3, 0xc

    goto/16 :goto_0

    :sswitch_1
    const-string v1, "redmi"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_1

    goto/16 :goto_0

    :cond_1
    const/16 v3, 0xb

    goto/16 :goto_0

    :sswitch_2
    const-string v1, "nokia"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_2

    goto/16 :goto_0

    :cond_2
    const/16 v3, 0xa

    goto/16 :goto_0

    :sswitch_3
    const-string v1, "honor"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_3

    goto/16 :goto_0

    :cond_3
    const/16 v3, 0x9

    goto/16 :goto_0

    :sswitch_4
    const-string v1, "Meizu"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_4

    goto/16 :goto_0

    :cond_4
    const/16 v3, 0x8

    goto/16 :goto_0

    :sswitch_5
    const-string v1, "vivo"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_5

    goto :goto_0

    :cond_5
    const/4 v3, 0x7

    goto :goto_0

    :sswitch_6
    const-string v1, "poco"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_6

    goto :goto_0

    :cond_6
    const/4 v3, 0x6

    goto :goto_0

    :sswitch_7
    const-string v1, "oppo"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_7

    goto :goto_0

    :cond_7
    const/4 v3, 0x5

    goto :goto_0

    :sswitch_8
    const-string v1, "letv"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_8

    goto :goto_0

    :cond_8
    const/4 v3, 0x4

    goto :goto_0

    :sswitch_9
    const-string v1, "asus"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_9

    goto :goto_0

    :cond_9
    const/4 v3, 0x3

    goto :goto_0

    :sswitch_a
    const-string v1, "xiaomi"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_a

    goto :goto_0

    :cond_a
    const/4 v3, 0x2

    goto :goto_0

    :sswitch_b
    const-string v1, "huawei"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_b

    goto :goto_0

    :cond_b
    const/4 v3, 0x1

    goto :goto_0

    :sswitch_c
    const-string v1, "oneplus"

    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_c

    goto :goto_0

    :cond_c
    const/4 v3, 0x0

    :goto_0
    packed-switch v3, :pswitch_data_0

    return v2

    .line 215
    :pswitch_0
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->autoStartulong(Landroid/content/Context;)Z

    move-result p1

    return p1

    .line 229
    :pswitch_1
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->autoStartNokia(Landroid/content/Context;)Z

    move-result p1

    return p1

    .line 219
    :pswitch_2
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->autoStartHonor(Landroid/content/Context;)Z

    move-result p1

    return p1

    .line 213
    :pswitch_3
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->autoStartmeizu(Landroid/content/Context;)Z

    move-result p1

    return p1

    .line 227
    :pswitch_4
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->autoStartVivo(Landroid/content/Context;)Z

    move-result p1

    return p1

    .line 223
    :pswitch_5
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->autoStartOppo(Landroid/content/Context;)Z

    move-result p1

    return p1

    .line 217
    :pswitch_6
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->autoStartLetv(Landroid/content/Context;)Z

    move-result p1

    return p1

    .line 207
    :pswitch_7
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->autoStartAsus(Landroid/content/Context;)Z

    move-result p1

    return p1

    .line 211
    :pswitch_8
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->autoStartXiaomi(Landroid/content/Context;)Z

    move-result p1

    return p1

    .line 221
    :pswitch_9
    invoke-direct {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->autoStartHuawei(Landroid/content/Context;)Z

    move-result p1

    return p1

    .line 225
    :pswitch_a
    invoke-virtual {p0, p1}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->autoStartOnePlus(Landroid/content/Context;)Z

    move-result p1

    return p1

    :sswitch_data_0
    .sparse-switch
        -0x4eb36700 -> :sswitch_c
        -0x47e95e19 -> :sswitch_b
        -0x2d450b45 -> :sswitch_a
        0x2dd650 -> :sswitch_9
        0x32a1bb -> :sswitch_8
        0x3427a0 -> :sswitch_7
        0x3496ab -> :sswitch_6
        0x373cac -> :sswitch_5
        0x46c94ac -> :sswitch_4
        0x5edac6a -> :sswitch_3
        0x6422d62 -> :sswitch_2
        0x675e5ed -> :sswitch_1
        0x6a38471 -> :sswitch_0
    .end sparse-switch

    :pswitch_data_0
    .packed-switch 0x0
        :pswitch_a
        :pswitch_9
        :pswitch_8
        :pswitch_7
        :pswitch_6
        :pswitch_5
        :pswitch_8
        :pswitch_4
        :pswitch_3
        :pswitch_2
        :pswitch_1
        :pswitch_8
        :pswitch_0
    .end packed-switch
.end method

.method public isAutoStartPermissionAvailable(Landroid/content/Context;)Z
    .locals 4

    .line 239
    invoke-virtual {p1}, Landroid/content/Context;->getPackageManager()Landroid/content/pm/PackageManager;

    move-result-object p1

    const/4 v0, 0x0

    .line 240
    invoke-virtual {p1, v0}, Landroid/content/pm/PackageManager;->getInstalledApplications(I)Ljava/util/List;

    move-result-object p1

    .line 241
    invoke-interface {p1}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object p1

    :cond_0
    :goto_0
    invoke-interface {p1}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {p1}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Landroid/content/pm/ApplicationInfo;

    .line 242
    iget-object v2, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/AutoStart;->PACKAGES_TO_CHECK_FOR_PERMISSION:Ljava/util/List;

    iget-object v3, v1, Landroid/content/pm/ApplicationInfo;->packageName:Ljava/lang/String;

    invoke-interface {v2, v3}, Ljava/util/List;->contains(Ljava/lang/Object;)Z

    move-result v2

    if-eqz v2, :cond_0

    .line 243
    invoke-static {}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/utilities;->NeedSuper()Z

    move-result v2

    if-eqz v2, :cond_1

    iget-object v2, v1, Landroid/content/pm/ApplicationInfo;->packageName:Ljava/lang/String;

    const-string v3, "com.coloros.safecenter"

    .line 244
    invoke-virtual {v2, v3}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v2

    if-nez v2, :cond_0

    :cond_1
    iget-object v2, v1, Landroid/content/pm/ApplicationInfo;->packageName:Ljava/lang/String;

    const-string v3, "com.oppo.safe"

    .line 245
    invoke-virtual {v2, v3}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v2

    if-nez v2, :cond_0

    iget-object v2, v1, Landroid/content/pm/ApplicationInfo;->packageName:Ljava/lang/String;

    .line 246
    invoke-virtual {v2, v3}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v2

    if-nez v2, :cond_0

    iget-object v2, v1, Landroid/content/pm/ApplicationInfo;->packageName:Ljava/lang/String;

    const-string v3, "com.oplus.battery"

    .line 247
    invoke-virtual {v2, v3}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v2

    if-nez v2, :cond_0

    iget-object v2, v1, Landroid/content/pm/ApplicationInfo;->packageName:Ljava/lang/String;

    const-string v3, "com.oplus.securitypermission"

    .line 248
    invoke-virtual {v2, v3}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v2

    if-nez v2, :cond_0

    iget-object v1, v1, Landroid/content/pm/ApplicationInfo;->packageName:Ljava/lang/String;

    const-string v2, "com.oneplus.security"

    .line 249
    invoke-virtual {v1, v2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v1

    if-eqz v1, :cond_2

    goto :goto_0

    :cond_2
    const/4 p1, 0x1

    return p1

    :cond_3
    return v0
.end method
