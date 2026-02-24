# Microsoft Bing Rewards

Monorepo com duas aplicações para auxiliar na execução das **pesquisas diárias do Microsoft Bing Rewards**, abrindo automaticamente buscas no Bing com palavras aleatórias em português — garantindo os pontos diários sem esforço manual.

---

## Sumário

- [Microsoft Bing Rewards](#microsoft-bing-rewards)
  - [Sumário](#sumário)
  - [Visão Geral](#visão-geral)
  - [Funcionalidades](#funcionalidades)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Uso](#uso)
    - [Web](#web)
    - [Mobile](#mobile)
  - [Scripts Disponíveis](#scripts-disponíveis)
  - [Como Funciona](#como-funciona)
    - [Geração das URLs de busca](#geração-das-urls-de-busca)
    - [Auto-ciclo (`useAutoCycle`)](#auto-ciclo-useautocycle)
    - [InAppBrowser (Mobile)](#inappbrowser-mobile)
  - [Tecnologias](#tecnologias)
    - [Web](#web-1)
    - [Mobile](#mobile-1)
  - [Deploy](#deploy)

---

## Visão Geral

O Microsoft Rewards exige pesquisas diárias no Bing para acumular pontos. Este projeto automatiza esse processo com duas interfaces:

| Plataforma | Tecnologia          | Descrição                                                  |
| ---------- | ------------------- | ---------------------------------------------------------- |
| **Web**    | React + Vite        | Abre abas de busca diretamente no navegador desktop        |
| **Mobile** | React Native + Expo | Abre buscas no Microsoft Edge (Android/iOS) via app nativo |

---

## Funcionalidades

- **36 botões de pesquisa** identificados com o timestamp do dia atual (PC/desktop points).
- **Auto-ciclo**: a cada **5 minutos** um botão é acionado automaticamente, sem interação do usuário.
- **Rastreamento visual** dos botões:
  - Borda **verde** → pesquisa realizada manualmente.
  - Borda **vermelha** → pesquisa disparada pelo auto-ciclo.
- Cada busca usa uma combinação aleatória de **3 palavras** de um vocabulário em português para simular pesquisas orgânicas.
- **Mobile**: abre o Microsoft Edge diretamente (Android via Intent URL; iOS via deep-link scheme), com fallback para o browser padrão caso o Edge não esteja instalado.
- **Mobile**: detecta o retorno do usuário ao app após cada pesquisa e dispara a próxima do ciclo automaticamente.

---

## Estrutura do Projeto

```
MicrosoftBingRewards/
├── package.json          # Raiz do monorepo (npm workspaces)
│
├── web/                  # Aplicação React/Vite (browser desktop)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── ButtonGrid.jsx   # Grade de 36 botões
│   │   │   └── SearchButton.jsx # Botão individual com estado visual
│   │   ├── constants/
│   │   │   └── index.js         # BASE_URL, AUTO_CYCLE_TIME, PALAVRAS
│   │   ├── hooks/
│   │   │   └── useAutoCycle.js  # Lógica do ciclo automático
│   │   └── utils/
│   │       ├── date.js          # getToday() — timestamp do dia
│   │       └── search.js        # pickThreeWords(), buildSearchUrl()
│   ├── vite.config.js
│   └── package.json
│
└── mobile/               # Aplicação React Native/Expo
    ├── App.js
    ├── src/
    │   ├── components/
    │   │   ├── ButtonGrid.jsx    # Grade adaptada para React Native
    │   │   ├── SearchButton.jsx  # Botão nativo com estado visual
    │   │   └── InAppBrowser.jsx  # Controlador headless para abrir o Edge
    │   ├── constants/
    │   │   └── index.js
    │   ├── hooks/
    │   │   └── useAutoCycle.js   # Mesmo hook, aguarda o InAppBrowser fechar
    │   └── utils/
    │       ├── date.js
    │       └── search.js
    └── package.json
```

---

## Pré-requisitos

- **Node.js** >= 18
- **npm** >= 9 (suporte a Workspaces)
- Para mobile: **Expo CLI** e um emulador Android/iOS ou dispositivo físico

```bash
npm install -g expo-cli   # opcional, o npx também funciona
```

---

## Instalação

Clone o repositório e instale todas as dependências (web + mobile) de uma vez:

```bash
git clone https://github.com/<seu-usuario>/MicrosoftBingRewards.git
cd MicrosoftBingRewards
npm install
```

---

## Uso

### Web

```bash
# Servidor de desenvolvimento
npm run dev

# Ou explicitamente
npm run start:web
```

Acesse `http://localhost:5173` no navegador.

> **Dica:** Pressione **CTRL** (Windows/Linux) ou **CMD** (Mac) ao clicar nos botões para que cada pesquisa abra em uma nova aba sem sair da página principal. O auto-ciclo já faz isso automaticamente.

### Mobile

```bash
# Iniciar o Expo
npm run start:mobile

# Diretamente no Android
npm run android

# Diretamente no iOS
npm run ios
```

Escaneie o QR Code com o app **Expo Go** ou use um emulador. No Android, as pesquisas abrem diretamente no **Microsoft Edge** via Intent URL.

---

## Scripts Disponíveis

Todos executados na raiz do monorepo:

| Script                 | Descrição                                       |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Inicia o servidor de desenvolvimento web (Vite) |
| `npm run build`        | Gera o build de produção da aplicação web       |
| `npm run start:web`    | Alias para `npm run dev`                        |
| `npm run start:mobile` | Inicia o servidor Expo (mobile)                 |
| `npm run android`      | Abre o app no emulador/dispositivo Android      |
| `npm run ios`          | Abre o app no simulador/dispositivo iOS         |
| `npm run lint`         | Executa o ESLint no projeto web                 |
| `npm run deploy`       | Faz o deploy da versão web para o GitHub Pages  |

---

## Como Funciona

### Geração das URLs de busca

Cada clique (manual ou automático) constrói uma URL do Bing com 3 palavras aleatórias escolhidas de um vocabulário com mais de 100 palavras em português:

```
https://www.bing.com/search?q=<palavra1>+<palavra2>+<palavra3>&aqs=edge..69i57...
```

### Auto-ciclo (`useAutoCycle`)

1. Na montagem do componente, o primeiro botão é acionado imediatamente.
2. Um `setInterval` dispara um novo botão a cada **5 minutos** (`AUTO_CYCLE_TIME`).
3. No mobile, cada disparo aguarda o fechamento do browser (retorno ao app) antes de prosseguir para o próximo — garantindo que o Edge conclua cada pesquisa.

### InAppBrowser (Mobile)

- **Android**: abre o Edge via `intent://...#Intent;package=com.microsoft.emmx;...`.
- **iOS**: tenta o scheme `microsoft-edge-https://...`; se o Edge não estiver instalado, usa o browser padrão.
- Um listener de `AppState` detecta quando o usuário retorna ao app e sinaliza o fim da pesquisa. Um timeout de **15 segundos** serve de fallback caso o evento não dispare.

---

## Tecnologias

### Web
- [React 19](https://react.dev/)
- [Vite 7](https://vite.dev/)
- [gh-pages](https://github.com/tschaub/gh-pages)
- [ESLint](https://eslint.org/) + [Husky](https://typicode.github.io/husky/)

### Mobile
- [React Native 0.81](https://reactnative.dev/)
- [Expo SDK 54](https://expo.dev/)
- [expo-web-browser](https://docs.expo.dev/versions/latest/sdk/webbrowser/)
- [react-native-webview](https://github.com/react-native-webview/react-native-webview)
- [react-native-safe-area-context](https://github.com/AppAndFlow/react-native-safe-area-context)

---

## Deploy

A versão web é publicada automaticamente no **GitHub Pages**:

```bash
npm run deploy
```

O comando executa `vite build` e envia o conteúdo da pasta `dist/` para a branch `gh-pages`. A base URL está configurada para `/MicrosoftBingRewards/` em [web/vite.config.js](web/vite.config.js).
