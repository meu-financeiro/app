import { initConfig } from "../config/config.js";
import { handleLogin } from "../auth/auth.js";

async function init() {
  await initConfig();
  document.getElementById("login-btn").addEventListener("click", handleLogin);
}

init();
