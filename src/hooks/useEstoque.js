// src/hooks/useEstoque.js
import { useState, useEffect, useCallback } from 'react';
import { getMateriais, cadastrarMaterial } from '../services/api';

export const useEstoque = () => {
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const [erro, setErro] = useState(null);

  const carregarMateriais = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const dados = await getMateriais();
      setMateriais(dados);
    } catch (e) {
      setErro('Não foi possível carregar os materiais. Verifique a conexão.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarMateriais();
  }, [carregarMateriais]);

  const adicionarMaterial = async (nome, quantidade) => {
    setLoadingCadastro(true);
    setErro(null);
    try {
      const novoMaterial = {
        nome,
        quantidade: parseInt(quantidade, 10),
        dataCadastro: new Date().toISOString(),
      };
      const materialCriado = await cadastrarMaterial(novoMaterial);
      setMateriais((prev) => [materialCriado, ...prev]);
      return true;
    } catch (e) {
      setErro('Erro ao cadastrar material. Tente novamente.');
      return false;
    } finally {
      setLoadingCadastro(false);
    }
  };

  return {
    materiais,
    loading,
    loadingCadastro,
    erro,
    adicionarMaterial,
    recarregar: carregarMateriais,
  };
};
