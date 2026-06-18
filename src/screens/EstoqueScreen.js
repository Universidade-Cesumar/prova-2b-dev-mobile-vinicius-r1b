// src/screens/EstoqueScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from 'react-native';
import { useState, useMemo } from 'react';
import { useEstoque } from '../hooks/useEstoque';
import MaterialCard from '../components/MaterialCard';
import CadastroForm from '../components/CadastroForm';

const EstoqueScreen = () => {
  const { materiais, loading, loadingCadastro, erro, adicionarMaterial, recarregar } =
    useEstoque();
  const [busca, setBusca] = useState('');

  const materiaisFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) {
      return materiais;
    }

    return materiais.filter((item) => item.nome.toLowerCase().includes(termo));
  }, [busca, materiais]);

  const ListHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Almoxarifado</Text>
        <Text style={styles.headerSubtitulo}>Controle de Estoque — Enfermagem</Text>
      </View>
      <CadastroForm onCadastrar={adicionarMaterial} loading={loadingCadastro} />
      {erro ? (
        <View style={styles.erroContainer}>
          <Text style={styles.erroTexto}>{erro}</Text>
        </View>
      ) : null}
      <Text style={styles.secaoTitulo}>
        Inventário Atual{' '}
        <Text style={styles.secaoContagem}>({materiaisFiltrados.length} itens)</Text>
      </Text>
    </>
  );

  const ListEmpty = () =>
    loading ? null : (
      <View style={styles.vazio}>
        <Text style={styles.vazioTexto}>Nenhum material cadastrado ainda.</Text>
        <Text style={styles.vazioSub}>Use o formulário acima para adicionar itens.</Text>
      </View>
    );

  return (
    <View style={styles.safeArea}>
      <View style={styles.buscaContainer}>
        <TextInput
          testID="input-busca"
          style={styles.buscaInput}
          placeholder="Buscar material"
          placeholderTextColor="#9aa7a1"
          value={busca}
          onChangeText={setBusca}
        />
        <Text testID="total-itens" style={styles.totalItens}>
          Total de itens: {materiaisFiltrados.length}
        </Text>
      </View>
      <FlatList
        testID="lista-materials"
        data={materiaisFiltrados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MaterialCard item={item} />}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={recarregar}
            colors={['#1a6b3c']}
            tintColor="#1a6b3c"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f2',
  },
  header: {
    backgroundColor: '#1a6b3c',
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerSubtitulo: {
    fontSize: 13,
    color: '#a8d5b8',
    marginTop: 4,
  },
  buscaContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  buscaInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dbe7e0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#1a1a2e',
    fontSize: 15,
  },
  totalItens: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '700',
    color: '#1a6b3c',
  },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 4,
  },
  secaoContagem: {
    fontWeight: '400',
    color: '#888',
  },
  listContent: {
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingTexto: {
    color: '#555',
    fontSize: 15,
  },
  erroContainer: {
    backgroundColor: '#fff3f3',
    borderLeftWidth: 4,
    borderLeftColor: '#e53935',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 6,
    padding: 12,
  },
  erroTexto: {
    color: '#c62828',
    fontSize: 14,
  },
  vazio: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 32,
  },
  vazioTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    textAlign: 'center',
  },
  vazioSub: {
    fontSize: 13,
    color: '#bbb',
    marginTop: 6,
    textAlign: 'center',
  },
});

export default EstoqueScreen;
