.class public L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Brand;
.super Ljava/lang/Object;
.source "Brand.java"


# static fields
.field public static final PHONE_HTC:Ljava/lang/String; = "htc"

.field public static final PHONE_HUAWEI1:Ljava/lang/String; = "huawei"

.field public static final PHONE_HUAWEI3:Ljava/lang/String; = "honor"

.field public static final PHONE_LENOVO:Ljava/lang/String; = "lenovo"

.field public static final PHONE_LG:Ljava/lang/String; = "lg"

.field public static final PHONE_LeMobile:Ljava/lang/String; = "lemobile"

.field public static final PHONE_MEIZU:Ljava/lang/String; = "meizu"

.field public static final PHONE_NOVA:Ljava/lang/String; = "nova"

.field public static final PHONE_OPPO:Ljava/lang/String; = "oppo"

.field public static final PHONE_OPPO2:Ljava/lang/String; = "realme"

.field public static final PHONE_SAMSUNG:Ljava/lang/String; = "samsung"

.field public static final PHONE_SONY:Ljava/lang/String; = "sony"

.field public static final PHONE_VIVO:Ljava/lang/String; = "vivo"

.field public static final PHONE_XIAOMI:Ljava/lang/String; = "xiaomi"

.field public static final PHONE_XIAOMI2:Ljava/lang/String; = "mi"

.field public static final PHONE_XIAOMI3:Ljava/lang/String; = "redmi"

.field static brand:Ljava/lang/String;


# direct methods
.method static constructor <clinit>()V
    .locals 1

    .line 4
    sget-object v0, Landroid/os/Build;->BRAND:Ljava/lang/String;

    sput-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Brand;->brand:Ljava/lang/String;

    return-void
.end method

.method public constructor <init>()V
    .locals 0

    .line 3
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method

.method public static getBrand()Ljava/lang/String;
    .locals 1

    .line 38
    sget-object v0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/Brand;->brand:Ljava/lang/String;

    return-object v0
.end method
