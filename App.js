import React from 'react';
import { StatusBar } from 'react-native';
import EstoqueScreen from './src/screens/EstoqueScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a6b3c" />
      <EstoqueScreen />
    </>
  );
}
