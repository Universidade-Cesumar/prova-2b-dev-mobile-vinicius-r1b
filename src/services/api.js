// src/services/api.js
// IMPORTANTE: Substitua esta URL pela URL do seu projeto no MockAPI.io
// Exemplo: https://64abc123def456.mockapi.io/api/v1/materiais
const BASE_URL = 'https://6a2b5787b687a7d5cbc524e1.mockapi.io/materiais';

const processarResposta = async (response) => {
  if (!response.ok) {
    throw new Error('Erro na requisição');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const getMateriais = async () => {
  try {
    const response = await fetch(BASE_URL);
    return await processarResposta(response);
  } catch (e) {
    throw new Error('Não foi possível conectar ao servidor. Verifique sua internet.');
  }
};

export const cadastrarMaterial = async (material) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(material),
    });
    return await processarResposta(response);
  } catch (e) {
    throw new Error('Não foi possível cadastrar o material. Verifique sua internet.');
  }
};

export const atualizarMaterial = async (id, dados) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    return await processarResposta(response);
  } catch (e) {
    throw new Error('Não foi possível atualizar o estoque. Verifique sua internet.');
  }
};

export const excluirMaterial = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return await processarResposta(response);
  } catch (e) {
    throw new Error('Não foi possível excluir o material. Verifique sua internet.');
  }
};
