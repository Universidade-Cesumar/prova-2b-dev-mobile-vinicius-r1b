// src/components/CadastroForm.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

const CadastroForm = ({ onCadastrar, loading }) => {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleCadastrar = async () => {
    if (!nome.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o nome do material.');
      return;
    }
    if (!quantidade || isNaN(quantidade) || parseInt(quantidade) < 0) {
      Alert.alert('Campo inválido', 'Informe uma quantidade válida.');
      return;
    }

    const sucesso = await onCadastrar(nome.trim(), quantidade);
    if (sucesso) {
      setNome('');
      setQuantidade('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Material</Text>

      <TextInput
        testID="input-nome"
        style={styles.input}
        placeholder="Nome do material"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
        editable={!loading}
      />

      <TextInput
        testID="input-quantidade"
        style={styles.input}
        placeholder="Quantidade"
        placeholderTextColor="#aaa"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        editable={!loading}
      />

      <TouchableOpacity
        testID="btn-cadastrar"
        style={[styles.botao, loading && styles.botaoDesabilitado]}
        onPress={handleCadastrar}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoTexto}>Cadastrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  titulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a6b3c',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1a1a2e',
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  botao: {
    backgroundColor: '#1a6b3c',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 4,
  },
  botaoDesabilitado: {
    backgroundColor: '#8db89f',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default CadastroForm;
