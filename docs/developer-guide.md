# Guia do Desenvolvedor - Lypsyos Landing Page

Este documento detalha a arquitetura do projeto, onde encontrar cada funcionalidade e como modificá-las.

## 🏗 Estrutura do Projeto

O projeto é um monorepo que contém o frontend (Vite + React) e o backend (anteriormente Node/Express, em processo de migração para Vercel Serverless).

### 🎨 Frontend (`src/`)

O frontend é construído com React, Tailwind CSS e roteamento via `react-router-dom`.

*   **Páginas (`src/pages/`)**:
    *   `Home.tsx`: Página inicial principal.
    *   `About.tsx`: Página "Sobre" a Lypsyos.
    *   `Products.tsx`: Listagem de produtos (rota `/produtos`), dirigida por `src/content/products.ts`.
    *   `ProductDetail.tsx`: Página de detalhe de um produto (rota `/produtos/:slug`).
    *   `Contact.tsx`: Página de contato.

*   **Componentes (`src/components/`)**:
    *   `common/`: Componentes globais como `Navbar.tsx` (cabeçalho) e `Footer.tsx` (rodapé).
    *   `sections/`: Blocos grandes das páginas. Ex: `HeroSection.tsx` (topo da home), `ProductsOverviewSection.tsx` e `WhyLypsyosSection.tsx` (home), `ContactFormSection.tsx` (formulário), `DemoVideoSection.tsx` (vídeo, só na página do DBX-V4).
    *   `ui/`: Componentes base reutilizáveis (botões, cards, inputs) baseados em uma variação do shadcn/ui.

*   **Serviços Frontend (`src/services/`)**:
    *   `analytics.ts`: Funções para enviar pageviews, eventos e o formulário de contato para o backend.

*   Não há login/autenticação na landing page nem painel admin — foram descontinuados por não fazerem parte do fluxo atual (só orçamento/contato).

*   **Estilos (`src/styles/globals.css`)**:
    *   Contém as variáveis CSS principais e as cores do tema (Primary, Secondary, Accent, etc.). Para mudar o tema global, altere aqui.

### ⚙️ Backend (Migração Vercel `api/`)

O backend original usava Express (`server/index.ts`) e SQLite (`data/analytics.db`). Para deploy na Vercel (que não tem disco persistente), a arquitetura muda para **Serverless Functions** conectadas ao **Supabase**.

*   `api/track/pageview.ts`, `api/track/event.ts`: Rotas de métricas de acesso.
*   `api/contact.ts`: Envio de e-mails (usa a API da Resend) e salva leads.
*   `api/analytics/summary.ts`, `api/analytics/accesses.ts`: Retornam dados agregados/brutos, protegidos por `LYPSYOS_ANALYTICS_TOKEN` (consulta via token, sem UI própria).

*Se você quiser mudar como os e-mails são enviados ou as métricas salvas, mexerá nestes arquivos na pasta `api/` (que substituirá a antiga pasta `server/`).*

---

## 🛠 Onde mexer para alterar...

### 1. Textos e Imagens da Home
*   **Hero**: Edite `src/components/sections/HeroSection.tsx`.
*   **Produtos em destaque**: Edite `src/components/sections/ProductsOverviewSection.tsx` (lista vem de `src/content/products.ts`).
*   **Diferenciais**: Edite `src/components/sections/WhyLypsyosSection.tsx`.
*   **Vídeo**: O URL do vídeo é configurado pelas variáveis de ambiente `.env` (`VITE_DBX_DEMO_VIDEO_URL`). O componente é `src/components/sections/DemoVideoSection.tsx`, usado só na página do DBX-V4.

### 2. Produtos
*   A lista de produtos (GeoQuote, Editor de Perfis, DBX-V4, etc.) fica em `src/content/products.ts` — adicionar um produto novo é editar esse arquivo.
*   `src/pages/Products.tsx` renderiza a listagem (`/produtos`); `src/pages/ProductDetail.tsx` renderiza o detalhe (`/produtos/:slug`).
*   O carrossel de imagens do DBX-V4 está configurado em `src/content/dbxVisuals.ts`. Para mudar as imagens, coloque novas em `public/DBX/` e atualize o `dbxVisuals.ts`.

### 3. Cores e Tipografia
*   Vá para `src/styles/globals.css` na seção `@theme`.
*   As fontes estão configuradas lá (Plus Jakarta Sans e Roboto).

### 4. Formulário de Contato
*   O design do formulário está em `src/components/sections/ContactFormSection.tsx`.
*   O template do e-mail que é enviado (para você e para o cliente) fica em `api/_lib/contact-mailer.ts` (envio via API da Resend), chamado por `api/contact.ts`.

### 5. Configurações de Deploy (Vercel)
*   As variáveis de ambiente deverão ser configuradas no painel de hospedagem (Supabase URL/Key, `RESEND_API_KEY`, etc).
*   Não haverá mais dependência de VPS. A Vercel builda o front (`npm run build`) e expõe a pasta `api/` como funções serverless.

---

## 🚀 Próximas Atualizações Planejadas
1.  **Centralização de ícones/botões**: Ajustes finos de CSS (ex: botão play do DBX).
