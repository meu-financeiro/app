function checkLogin() {
  var state = localStorage.getItem("state");

  if (typeof state === "string" && state.trim() !== "") {
    return true;
  } else {
    window.location.href = "./login.html";
    return false;
  }
}

async function logout() {
  await fetch(window.APP_CONFIG.WORKER_URL + "/logout?state=" + localStorage.getItem("state"), {
    method: "GET",
  });

  localStorage.removeItem("state");
  window.location.href = "./login.html";
}

const params = new URLSearchParams(window.location.search);
const redirectState = params.get("state");
window.history.replaceState({}, document.title, window.location.pathname);

if (redirectState) {
  localStorage.setItem("state", redirectState);
}

checkLogin();

state = localStorage.getItem("state");

if (state) {
  // lerDados(state);
  console.log("Estado de login:", state);
}
