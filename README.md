# Almoxarifado App

Sistema de controle de estoque de materiais de enfermagem, desenvolvido como projeto avaliativo da disciplina de Desenvolvimento Mobile.

## Sobre o Sistema

O app permite o gerenciamento completo do inventário de materiais de um laboratório de enfermagem, com funcionalidades de:

- **Listagem** de todos os materiais cadastrados (consumidos via GET na MockAPI)
- **Cadastro** de novos materiais com nome e quantidade (POST na MockAPI)
- **Retirada (baixa)** de estoque com validação de regra de negócio, impedindo saldo negativo (PUT na MockAPI)
- **Exclusão** permanente de materiais (DELETE na MockAPI)
- **Busca em tempo real** por nome do material
- **Totalizador dinâmico** de itens exibidos conforme o filtro de busca
- **Indicador visual de estoque crítico** (quantidade abaixo de 10 unidades)
- **Tratamento de erros de rede**, com alertas amigáveis caso a conexão falhe
- Pull-to-refresh para atualizar a lista

Baseado no levantamento de requisitos realizado com a instrutora responsável pelo almoxarifado.

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/) — framework principal
- [Expo](https://expo.dev/) — toolchain para desenvolvimento e build
- [MockAPI.io](https://mockapi.io/) — API REST simulada para persistência dos dados
- [Jest](https://jestjs.io/) + [@testing-library/react-native](https://callstack.github.io/react-native-testing-library/) — testes automatizados

## Estrutura do Projeto

```
AlmoxarifadoApp/
├── App.js
├── src/
│   ├── screens/
│   │   └── EstoqueScreen.js      # Tela principal (busca, totalizador, lista)
│   ├── components/
│   │   ├── CadastroForm.js       # Formulário de cadastro
│   │   └── MaterialCard.js       # Card de cada material (retirada, exclusão, alerta)
│   ├── hooks/
│   │   └── useEstoque.js         # Hook customizado (GET, POST, PUT, DELETE)
│   ├── utils/
│   │   └── validarRetirada.js    # Função pura de validação de retirada
│   └── services/
│       └── api.js                # Funções de acesso à MockAPI
├── __tests__/                    # Testes automatizados por sprint
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
   git clone https://github.com/vinicius-r1b/almoxerifado-app.git
   cd almoxerifado-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure a URL da MockAPI em `src/services/api.js`:
   ```js
   const BASE_URL = 'https://SEU_ID.mockapi.io/materiais';
   ```

4. Inicie o projeto:
   ```bash
   npx expo start
   ```

5. Escaneie o QR Code com o aplicativo **Expo Go** no celular.

### Rodando os testes

```bash
npx jest
```

## Contrato Técnico (testIDs e regras)

| Componente | testID / Propriedade |
|---|---|
| TextInput — Nome do Material | `input-nome` |
| TextInput — Quantidade (cadastro) | `input-quantidade` |
| TouchableOpacity — Cadastrar | `btn-cadastrar` |
| FlatList — Lista de Materiais | `lista-materiais` |
| TextInput — Quantidade a retirar | `input-retirada` |
| TouchableOpacity — Confirmar baixa (PUT) | `btn-baixar` |
| TouchableOpacity — Excluir (DELETE) | `btn-excluir` |
| TextInput — Busca | `input-busca` |
| Text — Totalizador de itens | `total-itens` |
| View do card com estoque crítico (< 10 un.) | `accessibilityLabel="estoque-critico"` |
| Função pura de validação de retirada | `validarRetirada(estoqueAtual, quantidadeRetirada)` |

## Capturas de Tela

<!-- ADICIONE SCREENSHOT AQUI: tela inicial com a lista de materiais -->

<!-- ADICIONE SCREENSHOT AQUI: formulário de cadastro preenchido -->

<!-- ADICIONE SCREENSHOT AQUI: card de material com indicador de estoque crítico -->

<!-- ADICIONE SCREENSHOT AQUI: busca filtrando a lista em tempo real -->

## Autor

Vinicius — [github.com/vinicius-r1b](https://github.com/vinicius-r1b)
