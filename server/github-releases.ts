import { execSync } from "child_process";
import fs from "fs";
import path from "path";

/**
 * GitHub Releases Manager - Upload de APKs para GitHub Releases
 */

interface ReleaseConfig {
  owner: string;
  repo: string;
  token: string;
  tagName: string;
  releaseName: string;
  releaseBody: string;
}

/**
 * Faz upload de um arquivo para GitHub Releases
 */
export async function uploadToGitHubRelease(
  filePath: string,
  config: ReleaseConfig
): Promise<string> {
  try {
    const fileName = path.basename(filePath);
    const fileSize = fs.statSync(filePath).size;

    console.log(`[GitHub] Iniciando upload de ${fileName} (${(fileSize / 1024 / 1024).toFixed(2)}MB)`);

    // Verificar se a release já existe
    let releaseId = await getReleaseId(config);

    // Se não existe, criar nova release
    if (!releaseId) {
      console.log(`[GitHub] Criando nova release: ${config.tagName}`);
      releaseId = await createRelease(config);
    }

    // Fazer upload do arquivo
    console.log(`[GitHub] Fazendo upload do arquivo...`);
    const downloadUrl = await uploadAsset(filePath, releaseId, config);

    console.log(`[GitHub] Upload concluído! URL: ${downloadUrl}`);
    return downloadUrl;
  } catch (error) {
    console.error("[GitHub] Erro ao fazer upload:", error);
    throw error;
  }
}

/**
 * Obtém o ID de uma release existente
 */
async function getReleaseId(config: ReleaseConfig): Promise<string | null> {
  try {
    const cmd = `curl -s -H "Authorization: token ${config.token}" https://api.github.com/repos/${config.owner}/${config.repo}/releases/tags/${config.tagName}`;
    const response = execSync(cmd, { encoding: "utf-8" });
    const data = JSON.parse(response);

    if (data.id) {
      console.log(`[GitHub] Release encontrada: ${data.id}`);
      return data.id;
    }

    return null;
  } catch (error) {
    console.log("[GitHub] Release não encontrada, será criada uma nova");
    return null;
  }
}

/**
 * Cria uma nova release no GitHub
 */
async function createRelease(config: ReleaseConfig): Promise<string> {
  const payload = {
    tag_name: config.tagName,
    name: config.releaseName,
    body: config.releaseBody,
    draft: false,
    prerelease: false,
  };

  const cmd = `curl -s -X POST -H "Authorization: token ${config.token}" -H "Content-Type: application/json" -d '${JSON.stringify(payload)}' https://api.github.com/repos/${config.owner}/${config.repo}/releases`;

  const response = execSync(cmd, { encoding: "utf-8" });
  const data = JSON.parse(response);

  if (!data.id) {
    throw new Error(`Falha ao criar release: ${JSON.stringify(data)}`);
  }

  console.log(`[GitHub] Release criada com ID: ${data.id}`);
  return data.id;
}

/**
 * Faz upload de um asset para uma release
 */
async function uploadAsset(
  filePath: string,
  releaseId: string,
  config: ReleaseConfig
): Promise<string> {
  const fileName = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath);

  const cmd = `curl -s -X POST -H "Authorization: token ${config.token}" -H "Content-Type: application/octet-stream" --data-binary @"${filePath}" https://uploads.github.com/repos/${config.owner}/${config.repo}/releases/${releaseId}/assets?name=${fileName}`;

  const response = execSync(cmd, { encoding: "utf-8" });
  const data = JSON.parse(response);

  if (!data.browser_download_url) {
    throw new Error(`Falha ao fazer upload: ${JSON.stringify(data)}`);
  }

  console.log(`[GitHub] Asset enviado: ${data.browser_download_url}`);
  return data.browser_download_url;
}

/**
 * Gera nome de release baseado em data e hora
 */
export function generateReleaseName(): string {
  const now = new Date();
  const date = now.toLocaleDateString("pt-BR");
  const time = now.toLocaleTimeString("pt-BR");
  return `APK Build - ${date} ${time}`;
}

/**
 * Gera tag de release única
 */
export function generateReleaseTag(): string {
  const now = new Date();
  const timestamp = now.getTime();
  return `apk-build-${timestamp}`;
}

/**
 * Gera descrição da release
 */
export function generateReleaseBody(appName: string, appUrl: string, logoUrl?: string): string {
  return `
## APK Customizado: ${appName}

**Configurações:**
- **Nome do App:** ${appName}
- **URL:** ${appUrl}
${logoUrl ? `- **Logo:** ${logoUrl}` : ""}

**Instruções de Instalação:**
1. Baixe o APK abaixo
2. Ative "Instalar de fontes desconhecidas" nas configurações do Android
3. Abra o arquivo APK para instalar
4. Abra o app e ele será registrado automaticamente no painel

**Suporte:**
Para problemas de instalação, entre em contato com o suporte.
`;
}
