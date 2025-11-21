import { initConfig } from "./config/config.js";
import { handleAuthState, handleLogout } from "./auth/auth.js";
import { LancamentoService } from "./services/lancamento-service.js";

async function init() {
  await initConfig();
  handleAuthState();

  const statusEl = document.getElementById("status");

  try {
    const lancamentos = await LancamentoService.list();
    statusEl.textContent = JSON.stringify(lancamentos, null, 2); // identação de 2 espaços
  } catch (err) {
    statusEl.textContent = "Erro ao carregar lançamentos: " + err.message;
  }

  // console.log("Lançamentos carregados:", await LancamentoService.list());

  // console.log("Lançamento carregado:", await LancamentoService.get(1));

  // console.log(
  //   "Lançamento criado:",
  //   await LancamentoService.create({
  //     data: "2025-01-01",
  //     descricao: "Supermercado compra 2",
  //     efetivado: 0,
  //     operacao: "Despesa",
  //     parcela: "01/01",
  //     periodo: "jan. 2025",
  //     valor: 53,
  //   })
  // );

  // console.log(
  //   "Lançamento atualizado:",
  //   await LancamentoService.update(1, {
  //     data: "2030-01-01",
  //     descricao: "Farmácia compra atualizada",
  //     efetivado: 1,
  //     operacao: "Nubank",
  //     parcela: "03/03",
  //     periodo: "dez. 2025",
  //     valor: 78,
  //   })
  // );

  // console.log("Lançamento deletado:", await LancamentoService.delete(10));

  document.getElementById("logout-btn").addEventListener("click", handleLogout);
}

init();
