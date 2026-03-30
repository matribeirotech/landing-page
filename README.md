# Lypsyos Landing Page

Landing page em React + Vite para a Lypsyos, organizada para evoluir com foco em escalabilidade, manutenção e observabilidade.

## Estrutura principal

- `public/`: favicon, vídeos e screenshots públicas
- `src/assets/`: ícones e imagens internas do front
- `src/components/`: blocos reutilizáveis da interface
- `src/layouts/`: layouts globais da aplicação
- `src/services/`: integração do front com analytics e APIs
- `src/styles/`: estilos globais e tema
- `src/utils/`: utilitários compartilhados
- `server/`: backend Express para logs, eventos e captação de leads
- `data/`: banco SQLite dos acessos e conversões

## Rodando localmente

Pré-requisito: Node.js

1. Instale as dependências com `npm install`
2. Configure as variáveis em `.env.local` a partir de `.env.example`
3. Inicie o backend de analytics com `npm run dev:server`
4. Em outro terminal, inicie o frontend com `npm run dev`
5. Abra a landing em `http://localhost:3002`

## Video de demonstracao

- O projeto usa automaticamente o video local em `public/videos/`
- Se quiser trocar para YouTube, defina `VITE_DBX_VIDEO_YOUTUBE_EMBED_URL` no `.env.local`
- A página do DBX-V3 também reutiliza esse bloco de vídeo para demonstrações técnicas e comerciais
- O backend redireciona rotas web para `LYPSYOS_FRONTEND_URL`, que por padrao esta em `http://localhost:3002`

## Testes

- Rode `npm test` para executar a suite automatizada
- Rode `npm run lint` para validar a tipagem TypeScript
- A suite cobre navegacao principal, copy da home, formulario e endpoints de analytics

## Supabase

- O backend usa SQLite por padrao
- Se `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` estiverem definidos, o servidor passa a gravar em Supabase
- A área de membros usa `Supabase Auth` com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- O bootstrap opcional de um membro inicial usa `LYPSYOS_DBX_BOOTSTRAP_MEMBER_EMAIL`, `LYPSYOS_DBX_BOOTSTRAP_MEMBER_PASSWORD` e `LYPSYOS_DBX_BOOTSTRAP_MEMBER_NAME`
- O schema inicial esta em `supabase/schema.sql`

## Azure App Service

- O workflow pronto de deploy esta em `.github/workflows/azure-app-service.yml`
- O deploy publica um pacote com `dist`, `server`, `package.json`, `package-lock.json` e `node_modules` de runtime
- Configure o secret `AZURE_WEBAPP_PUBLISH_PROFILE` no GitHub e ajuste `AZURE_WEBAPP_NAME` no workflow

## Analytics e logs

O Sprint 2 adiciona:

- Registro de pageviews por rota
- Registro de cliques em CTAs principais
- Registro de envio do formulário de contato
- Consolidação dos dados em SQLite
- Rotas protegidas para consulta de métricas e acessos

Rotas disponíveis:

- `GET /api/health`
- `POST /api/track/pageview`
- `POST /api/track/event`
- `POST /api/contact`
- `GET /api/analytics/summary`
- `GET /api/analytics/accesses`

As rotas de consulta podem exigir o header `x-analytics-token`, conforme `LYPSYOS_ANALYTICS_TOKEN`.

## Observações de segurança

- O IP é armazenado em formato hash com salt para reduzir exposição de dados sensíveis
- Os endpoints de consulta podem ser protegidos por token administrativo
- O formulário de contato registra leads no banco e pode enviar notificação interna e resposta automática via SMTP
