export const AppConfig = {};

/**
 * Detecta ambiente (dev/prd)
 */
function detectEnvironment() {
  const host = location.hostname;
  return host.includes("127.0.0.1") || host.includes("localhost") ? "dev" : "prd";
}

/**
 * Carrega um arquivo de configuração baseado no ambiente.
 */
async function loadConfig(env) {
  const filePath = `src/config/envs/env.${env}.json`;

  try {
    const response = await fetch(filePath, { cache: "no-store" });
    if (!response.ok) throw new Error(`Falha ao carregar ${filePath}: ${response.status}`);

    const json = await response.json();
    if (typeof json !== "object") throw new Error("O JSON de configuração não é válido.");

    // Atualiza todas as propriedades do objeto exportado
    Object.assign(AppConfig, json);

    console.log(`Configuração (${env}) carregada:`, AppConfig);
  } catch (error) {
    console.error("Erro ao carregar configuração:", error);
  }
}

/**
 * Inicializa a configuração
 */
export async function initConfig() {
  const env = detectEnvironment();
  await loadConfig(env);
}
