# Microsoft Bing Rewards

Aplicação web para auxiliar na execução das pesquisas diárias do **Microsoft Bing Rewards**, abrindo automaticamente abas de busca no Bing com palavras aleatórias em português.

## Funcionalidades

- **36 botões de pesquisa** (pontos de PC/desktop), todos identificados com o timestamp do dia atual.
- **Auto-ciclo**: botões são acionados automaticamente em intervalos configurados, abrindo novas abas de busca no Bing.
- **Fechamento automático**: cada aba aberta é fechada automaticamente após 25 segundos.
- **Rastreamento visual**:
  - Borda **verde** → pesquisa realizada manualmente.
  - Borda **vermelha** → pesquisa disparada pelo auto-ciclo.
- **Wake Lock**: mantém a tela ativa enquanto o auto-ciclo está em execução.
- Cada pesquisa utiliza uma combinação aleatória de palavras do vocabulário em português para simular buscas orgânicas.

## Tecnologias

- [React 19](https://react.dev/)
- [Vite 7](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- Deploy via [gh-pages](https://github.com/tschaub/gh-pages) → GitHub Pages

## Como usar

1. Abra a aplicação no navegador.
2. Clique nos botões individualmente para abrir cada pesquisa em uma nova aba.
3. Pressione **CTRL** (Windows/Linux) ou **CMD** (Mac) ao clicar para garantir que a aba abra em segundo plano.
4. Ou aguarde o **auto-ciclo** disparar as pesquisas automaticamente.

## Instalação e desenvolvimento local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Verificar erros de lint
npm run lint

# Build de produção
npm run build

# Pré-visualizar build localmente
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
