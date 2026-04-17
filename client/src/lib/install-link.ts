/**
 * Utilitário para gerar links de instalação inteligentes
 * Redireciona o usuário pela página de Play Protect antes de instalar
 */

export interface InstallLinkOptions {
  filename: string;
  appName: string;
  downloadUrl: string;
  fileSize?: number;
}

/**
 * Gera um link de instalação que redireciona pela página de Play Protect
 */
export function generateInstallLink(options: InstallLinkOptions): string {
  const params = new URLSearchParams({
    file: options.filename,
    app: options.appName,
    url: options.downloadUrl,
    ...(options.fileSize && { size: options.fileSize.toString() }),
  });

  // Usar window.location.origin para pegar a URL base correta
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return `${baseUrl}/install?${params.toString()}`;
}

/**
 * Gera um link direto de download (sem Play Protect)
 */
export function generateDirectDownloadLink(downloadUrl: string): string {
  return downloadUrl;
}

/**
 * Copia link para clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback para navegadores antigos
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error("Erro ao copiar para clipboard:", error);
    return false;
  }
}

/**
 * Compartilha link via WhatsApp, Email, etc
 */
export function shareLink(
  link: string,
  appName: string,
  method: "whatsapp" | "email" | "sms" | "copy"
): void {
  const message = `Instale o app ${appName}: ${link}`;

  switch (method) {
    case "whatsapp":
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
      break;
    case "email":
      window.open(`mailto:?subject=Instale ${appName}&body=${encodeURIComponent(message)}`);
      break;
    case "sms":
      window.open(`sms:?body=${encodeURIComponent(message)}`);
      break;
    case "copy":
      copyToClipboard(link);
      break;
  }
}
