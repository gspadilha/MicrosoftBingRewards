# Microsoft Bing Rewards

Aplicação web para auxiliar na execução das pesquisas diárias do **Microsoft Bing Rewards**, abrindo automaticamente abas de busca no Bing com palavras aleatórias em português.

## Funcionalidades

- **36 botões de pesquisa** (pontos de PC/desktop), todos identificados com o timestamp do dia atual.
- **Auto-ciclo**: a cada 5 minutos um botão é acionado automaticamente, abrindo uma nova aba de busca no Bing.
- **Rastreamento visual**:
  - Borda **verde** → pesquisa realizada manualmente.
  - Borda **vermelha** → pesquisa disparada pelo auto-ciclo.
- Cada pesquisa utiliza uma combinação aleatória de palavras do vocabulário em português para simular buscas orgânicas.

## Tecnologias

- [React 19](https://react.dev/)
- [Vite 7](https://vite.dev/)
- Deploy via [gh-pages](https://github.com/tschaub/gh-pages) → GitHub Pages

## Como usar

1. Abra a aplicação no navegador.
2. Pressione **CTRL** (Windows) ou **CMD** (Mac) ao clicar nos botões para que cada pesquisa abra em uma nova aba sem perder a página atual.
3. Ou aguarde o auto-ciclo disparar as pesquisas de 5 em 5 minutos.

## Instalação e desenvolvimento local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Pré-visualizar build
npm run preview
```

## Deploy

```bash
npm run deploy
```

O comando compila o projeto e publica a pasta `dist/` na branch `gh-pages` do repositório, tornando a aplicação acessível em:

```
https://<seu-usuario>.github.io/MicrosoftBingRewards/
```
