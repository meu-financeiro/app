import { AppConfig } from "../config/config.js";

function saveAuthState() {
  const params = new URLSearchParams(window.location.search);
  const state = params.get("state");

  window.history.replaceState({}, document.title, window.location.pathname);

  if (state) {
    localStorage.setItem("state", state);
  }
}

export function handleAuthState() {
  saveAuthState();

  const state = localStorage.getItem("state");

  if (!state || state.trim() === "") {
    window.location.href = "./login.html";
  } else {
    AppConfig.state = state;
  }
}

function generateState(len = 16) {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr, (dec) => ("0" + dec.toString(16)).slice(-2)).join("");
}

export function handleLogin() {
  const state = generateState();

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", AppConfig.clientId);
  authUrl.searchParams.set("redirect_uri", AppConfig.apiUrl + "/callback");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", AppConfig.scopes.join(" "));
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");
  authUrl.searchParams.set("state", state);

  window.location.href = authUrl.toString();
}

export async function handleLogout() {
  await fetch(AppConfig.apiUrl + "/logout?state=" + localStorage.getItem("state"), {
    method: "GET",
  });

  localStorage.removeItem("state");
  window.location.href = "./login.html";
}
