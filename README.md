# Almoxarifado App

Sistema de controle de estoque de materiais de enfermagem, desenvolvido como projeto avaliativo da disciplina de Desenvolvimento Mobile.

## Sobre o Sistema

O app permite o gerenciamento do inventário de materiais de um laboratório de enfermagem, com funcionalidades de:

- **Listagem** de todos os materiais cadastrados (consumidos via GET na MockAPI)
- **Cadastro** de novos materiais com nome e quantidade (POST na MockAPI)
- Indicadores visuais de status do estoque (OK / Baixo / Zerado)
- Pull-to-refresh para atualizar a lista

Baseado no levantamento de requisitos realizado com a instrutora responsável pelo almoxarifado.

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/) — framework principal
- [Expo](https://expo.dev/) — toolchain para desenvolvimento e build
- [MockAPI.io](https://mockapi.io/) — API REST simulada para persistência dos dados

## Estrutura do Projeto

```
AlmoxarifadoApp/
├── App.js
├── src/
│   ├── screens/
│   │   └── EstoqueScreen.js      # Tela principal
│   ├── components/
│   │   ├── CadastroForm.js       # Formulário de cadastro
│   │   └── MaterialCard.js       # Card de cada material
│   ├── hooks/
│   │   └── useEstoque.js         # Hook customizado (GET + POST)
│   └── services/
│       └── api.js                # Funções de acesso à MockAPI
└── README.md
```

## Como Rodar

### Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- Expo CLI instalado globalmente:
  ```bash
  npm install -g expo-cli
  ```
- Aplicativo **Expo Go** instalado no celular

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/almoxarifado-app.git
   cd almoxarifado-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure a URL da MockAPI em `src/services/api.js`:
   ```js
   const BASE_URL = 'https://SEU_ID.mockapi.io/api/v1/materiais';
   ```

4. Inicie o projeto:
   ```bash
   npx expo start
   ```

5. Escaneie o QR Code com o aplicativo **Expo Go** no celular.

## testIDs implementados (Contrato Técnico)

| Componente | testID |
|---|---|
| TextInput — Nome do Material | `input-nome` |
| TextInput — Quantidade | `input-quantidade` |
| TouchableOpacity — Cadastrar | `btn-cadastrar` |
| FlatList — Lista de Materiais | `lista-materiais` |