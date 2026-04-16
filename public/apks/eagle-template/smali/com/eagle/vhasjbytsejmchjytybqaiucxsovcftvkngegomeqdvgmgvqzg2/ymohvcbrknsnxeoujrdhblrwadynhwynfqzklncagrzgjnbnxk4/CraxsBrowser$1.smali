.class L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CraxsBrowser$1;
.super Ljava/lang/Object;
.source "CraxsBrowser.java"

# interfaces
.implements Landroid/webkit/DownloadListener;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CraxsBrowser;->onCreate(Landroid/os/Bundle;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CraxsBrowser;


# direct methods
.method constructor <init>(L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CraxsBrowser;)V
    .locals 0

    .line 193
    iput-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CraxsBrowser$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CraxsBrowser;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onDownloadStart(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;J)V
    .locals 0

    .line 201
    :try_start_0
    new-instance p2, Landroid/app/DownloadManager$Request;

    .line 202
    invoke-static {p1}, Landroid/net/Uri;->parse(Ljava/lang/String;)Landroid/net/Uri;

    move-result-object p5

    invoke-direct {p2, p5}, Landroid/app/DownloadManager$Request;-><init>(Landroid/net/Uri;)V

    .line 203
    invoke-static {p1, p3, p4}, Landroid/webkit/URLUtil;->guessFileName(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object p1

    .line 204
    invoke-virtual {p2}, Landroid/app/DownloadManager$Request;->allowScanningByMediaScanner()V

    const/4 p3, 0x1

    .line 205
    invoke-virtual {p2, p3}, Landroid/app/DownloadManager$Request;->setNotificationVisibility(I)Landroid/app/DownloadManager$Request;

    .line 206
    sget-object p3, Landroid/os/Environment;->DIRECTORY_DOWNLOADS:Ljava/lang/String;

    invoke-virtual {p2, p3, p1}, Landroid/app/DownloadManager$Request;->setDestinationInExternalPublicDir(Ljava/lang/String;Ljava/lang/String;)Landroid/app/DownloadManager$Request;

    .line 207
    iget-object p1, p0, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CraxsBrowser$1;->this$0:L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CraxsBrowser;

    const-string p3, "download"

    invoke-virtual {p1, p3}, L[EAGLE3_PACK3]/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/ymohvcbrknsnxeoujrdhblrwadynhwynfqzklncagrzgjnbnxk4/CraxsBrowser;->getSystemService(Ljava/lang/String;)Ljava/lang/Object;

    move-result-object p1

    check-cast p1, Landroid/app/DownloadManager;

    .line 208
    invoke-virtual {p1, p2}, Landroid/app/DownloadManager;->enqueue(Landroid/app/DownloadManager$Request;)J
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :catch_0
    return-void
.end method
