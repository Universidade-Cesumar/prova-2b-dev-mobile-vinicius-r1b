// src/services/api.js
// IMPORTANTE: Substitua esta URL pela URL do seu projeto no MockAPI.io
// Exemplo: https://64abc123def456.mockapi.io/api/v1/materiais
const BASE_URL = 'https://6a2b5787b687a7d5cbc524e1.mockapi.io/materiais';

export const getMateriais = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Erro ao buscar materiais');
  return response.json();
};

export const cadastrarMaterial = async (material) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(material),
  });
  if (!response.ok) throw new Error('Erro ao cadastrar material');
  return response.json();
};
