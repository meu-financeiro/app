const SCOPES = ["openid", "profile", "email"].join(" ");

const statusEl = document.getElementById("status");

function randomState(len = 16) {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr, (dec) => ("0" + dec.toString(16)).slice(-2)).join("");
}

document.getElementById("login").addEventListener("click", handleGoogleSignIn);

function handleGoogleSignIn() {
  const state = randomState(12);

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", window.APP_CONFIG.CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", window.APP_CONFIG.WORKER_URL + "/callback");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");
  authUrl.searchParams.set("state", state);

  window.location.href = authUrl.toString();
}
