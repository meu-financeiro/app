import { AppConfig } from "../config/config.js";

export const LancamentoService = {
  async list() {
    const res = await fetch(`${AppConfig.apiUrl}/lancamentos`, {
      headers: {
        "Content-Type": "application/json",
        "X-State": AppConfig.state,
      },
    });
    return res.json();
  },

  async get(id) {
    const res = await fetch(`${AppConfig.apiUrl}/lancamento/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "X-State": AppConfig.state,
      },
    });
    return res.json();
  },

  async create(data) {
    const res = await fetch(`${AppConfig.apiUrl}/lancamento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-State": AppConfig.state,
      },
      body: JSON.stringify(data),
    });
    return res.ok;
  },

  async update(id, data) {
    const res = await fetch(`${AppConfig.apiUrl}/lancamento/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-State": AppConfig.state,
      },
      body: JSON.stringify(data),
    });
    return res.ok;
  },

  async delete(id) {
    const res = await fetch(`${AppConfig.apiUrl}/lancamento/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-State": AppConfig.state,
      },
    });
    return res.ok;
  },
};
