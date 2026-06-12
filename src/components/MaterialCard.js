// src/components/MaterialCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MaterialCard = ({ item }) => {
  const quantidade = parseInt(item.quantidade, 10);
  const statusColor =
    quantidade === 0 ? '#e53935' : quantidade <= 5 ? '#f57c00' : '#2e7d32';
  const statusLabel =
    quantidade === 0 ? 'Zerado' : quantidade <= 5 ? 'Baixo' : 'OK';

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.data}>
          Cadastrado em:{' '}
          {item.dataCadastro
            ? new Date(item.dataCadastro).toLocaleDateString('pt-BR')
            : '—'}
        </Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.quantidade}>{item.quantidade}</Text>
        <Text style={[styles.status, { color: statusColor }]}>{statusLabel}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
});

export default MaterialCard;
