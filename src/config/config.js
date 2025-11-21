// Garante que APP_CONFIG exista desde o início
window.APP_CONFIG = window.APP_CONFIG || {};

/**
 * Carrega um arquivo de configuração baseado no ambiente.
 * Inclui validação, fallback e erros amigáveis.
 */
async function loadConfig(env) {
  const filePath = `src/config/envs/env.${env}.json`;

  try {
    const response = await fetch(filePath, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Falha ao carregar ${filePath}: ${response.status}`);
    }

    const json = await response.json();

    if (typeof json !== "object") {
      throw new Error("O JSON de configuração não é válido.");
    }

    // Atualiza o config global
    window.APP_CONFIG = Object.freeze(json);

    console.log(`Configuração (${env}) carregada:`, window.APP_CONFIG);
  } catch (error) {
    console.error("Erro ao carregar configuração:", error);
  }
}

/**
 * Detecta ambiente (dev/prd)
 */
function detectEnvironment() {
  const host = location.hostname;

  const isDev = host.includes("127.0.0.1") || host.includes("localhost");

  return isDev ? "dev" : "prd";
}

/**
 * Inicializa a configuração automaticamente
 */
async function initConfig() {
  const env = detectEnvironment();
  await loadConfig(env);
}

// Inicialização automática
initConfig();
