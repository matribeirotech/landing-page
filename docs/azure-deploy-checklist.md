# Checklist de Publicacao Azure

## Arquitetura recomendada

- Servico: Azure App Service (Linux)
- Runtime: Node.js 24 LTS
- Motivo: a aplicacao tem frontend Vite e backend Express no mesmo projeto, com o servidor entregando APIs e podendo servir o `dist/`

## Antes do deploy

- Confirmar `npm run lint`
- Confirmar `npm test`
- Confirmar `npm run build`
- Garantir que o favicon, logo e video local estejam em `public/`
- Revisar as variaveis do `.env.local`
- Confirmar que o `package.json` tem `start` funcional para o App Service

## Variaveis de ambiente no Azure

- `PORT`
- `LYPSYOS_FRONTEND_URL`
- `VITE_ANALYTICS_API_URL`
- `LYPSYOS_ANALYTICS_TOKEN`
- `LYPSYOS_IP_SALT`
- `VITE_DBX_VIDEO_YOUTUBE_EMBED_URL` se quiser usar YouTube
- `RESEND_API_KEY`
- `LYPSYOS_CONTACT_FROM_EMAIL`
- `LYPSYOS_CONTACT_TO_EMAIL`
- `LYPSYOS_CONTACT_REPLY_TO_EMAIL`
- `LYPSYOS_CONTACT_AUTO_REPLY`

## Configuracoes do App Service

- Sistema operacional: Linux
- Stack: Node 24 LTS
- Startup Command: opcional se o App Service respeitar `npm start`; se precisar, usar `npm start`
- Health check: `/api/health`
- Always On: habilitar em ambiente produtivo

## Fluxo recomendado de entrega

- Buildar e testar no CI
- Publicar para o App Service somente apos `lint`, `test` e `build`
- Preferir deploy automatizado por GitHub Actions ou Azure pipeline

## Validacoes pos-publicacao

- Home abre sem erro
- Navegacao entre `inicio`, `sobre`, `produto` e `contato`
- Formulario envia e registra no backend
- Video abre corretamente
- LinkedIn e links externos funcionam
- `/api/health` responde `ok`
- `/api/analytics/summary` responde com token valido

## Riscos a observar

- O banco SQLite atende bem para fase inicial, mas para escala maior vale migrar logs e leads para um servico gerenciado
- O video local aumenta o tamanho do deploy; se preferir menor artefato, usar embed do YouTube
- Se o deploy for feito direto do codigo-fonte no App Service, validar como o build sera executado no pipeline
