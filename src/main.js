import { initConfig } from "./config/config.js";
import { handleAuthState, handleLogout } from "./auth/auth.js";

async function init() {
  await initConfig();
  handleAuthState();
  document.getElementById("logout-btn").addEventListener("click", handleLogout);
}

init();
