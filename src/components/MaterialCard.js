// src/components/MaterialCard.js
import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const LIMITE_ESTOQUE_CRITICO = 10;

const MaterialCard = ({ item, onBaixar, onExcluir }) => {
  const quantidade = parseInt(item.quantidade, 10);
  const [quantidadeRetirada, setQuantidadeRetirada] = useState('');
  const estoqueCritico = quantidade < LIMITE_ESTOQUE_CRITICO;
  const statusColor =
    quantidade === 0 ? '#e53935' : quantidade <= 5 ? '#f57c00' : '#2e7d32';
  const statusLabel =
    quantidade === 0 ? 'Zerado' : quantidade <= 5 ? 'Baixo' : 'OK';

  const handleBaixar = async () => {
    if (onBaixar) {
      const sucesso = await onBaixar(item, quantidadeRetirada);
      if (sucesso) {
        setQuantidadeRetirada('');
      }
    }
  };

  const handleExcluir = async () => {
    if (onExcluir) {
      await onExcluir(item.id);
    }
  };

  return (
    <View
      style={[styles.card, estoqueCritico && styles.cardCritico]}
      accessibilityLabel={estoqueCritico ? 'estoque-critico' : undefined}
    >
      <View style={styles.conteudoPrincipal}>
        <View style={styles.info}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.data}>
            Cadastrado em:{' '}
            {item.dataCadastro
              ? new Date(item.dataCadastro).toLocaleDateString('pt-BR')
              : '—'}
          </Text>
          {estoqueCritico ? (
            <Text style={styles.avisoCritico}>⚠ Estoque crítico</Text>
          ) : null}
        </View>
        <View style={styles.badge}>
          <Text style={styles.quantidade}>{item.quantidade}</Text>
          <Text style={[styles.status, { color: statusColor }]}>{statusLabel}</Text>
        </View>
      </View>

      <View style={styles.acoes}>
        <TextInput
          testID="input-retirada"
          style={styles.inputRetirada}
          placeholder="Retirada"
          placeholderTextColor="#9aa7a1"
          value={quantidadeRetirada}
          onChangeText={setQuantidadeRetirada}
          keyboardType="numeric"
        />

        <View style={styles.botoes}>
          <TouchableOpacity
            testID="btn-baixar"
            style={[styles.botao, styles.botaoBaixar]}
            onPress={handleBaixar}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotao}>Baixar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="btn-excluir"
            style={[styles.botao, styles.botaoExcluir]}
            onPress={handleExcluir}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotao}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardCritico: {
    backgroundColor: '#fff0f0',
    borderWidth: 2,
    borderColor: '#e53935',
  },
  conteudoPrincipal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  data: {
    fontSize: 12,
    color: '#888',
  },
  avisoCritico: {
    fontSize: 12,
    fontWeight: '700',
    color: '#c62828',
    marginTop: 4,
  },
  badge: {
    alignItems: 'center',
    minWidth: 50,
  },
  quantidade: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a6b3c',
  },
  status: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  acoes: {
    marginTop: 14,
  },
  inputRetirada: {
    borderWidth: 1,
    borderColor: '#dbe7e0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#1a1a2e',
    backgroundColor: '#fafafa',
    fontSize: 14,
  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  botao: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botaoBaixar: {
    backgroundColor: '#1a6b3c',
  },
  botaoExcluir: {
    backgroundColor: '#c62828',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default MaterialCard;
