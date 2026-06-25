// src/hooks/useEstoque.js
import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import {
  getMateriais,
  cadastrarMaterial,
  atualizarMaterial,
  excluirMaterial,
} from '../services/api';
import { validarRetirada } from '../utils/validarRetirada';

const exibirAlerta = (titulo, mensagem) => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  Alert.alert(titulo, mensagem);
};

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
      setMateriais(dados || []);
    } catch (e) {
      const mensagem = e?.message || 'Não foi possível carregar os materiais. Verifique a conexão.';
      setErro(mensagem);
      exibirAlerta('Erro de conexão', mensagem);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }

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
      const mensagem = e?.message || 'Erro ao cadastrar material. Tente novamente.';
      setErro(mensagem);
      exibirAlerta('Erro ao cadastrar', mensagem);
      return false;
    } finally {
      setLoadingCadastro(false);
    }
  };

  const baixarEstoque = async (item, quantidade) => {
    setErro(null);

    if (!validarRetirada(item?.quantidade, quantidade)) {
      const mensagem = 'Quantidade de retirada inválida.';
      setErro(mensagem);
      exibirAlerta('Retirada não permitida', mensagem);
      return false;
    }

    try {
      const estoqueAtualizado = Number(item.quantidade) - Number(quantidade);
      const materialAtualizado = await atualizarMaterial(item.id, {
        ...item,
        quantidade: estoqueAtualizado,
      });

      setMateriais((prev) =>
        prev.map((material) =>
          String(material.id) === String(item.id) ? materialAtualizado : material,
        ),
      );
      return true;
    } catch (e) {
      const mensagem = e?.message || 'Erro ao baixar estoque. Tente novamente.';
      setErro(mensagem);
      exibirAlerta('Erro ao baixar estoque', mensagem);
      return false;
    }
  };

  const removerMaterial = async (id) => {
    setErro(null);

    try {
      await excluirMaterial(id);
      setMateriais((prev) => prev.filter((material) => String(material.id) !== String(id)));
      return true;
    } catch (e) {
      const mensagem = e?.message || 'Erro ao excluir material. Tente novamente.';
      setErro(mensagem);
      exibirAlerta('Erro ao excluir', mensagem);
      return false;
    }
  };

  return {
    materiais,
    loading,
    loadingCadastro,
    erro,
    adicionarMaterial,
    baixarEstoque,
    removerMaterial,
    recarregar: carregarMateriais,
  };
};
