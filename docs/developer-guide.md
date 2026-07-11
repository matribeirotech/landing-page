# Guia do Desenvolvedor - Lypsyos Landing Page

Este documento detalha a arquitetura do projeto, onde encontrar cada funcionalidade e como modificá-las.

## 🏗 Estrutura do Projeto

O projeto é um monorepo que contém o frontend (Vite + React) e o backend (anteriormente Node/Express, em processo de migração para Vercel Serverless).

### 🎨 Frontend (`src/`)

O frontend é construído com React, Tailwind CSS e roteamento via `react-router-dom`.

*   **Páginas (`src/pages/`)**:
    *   `Home.tsx`: Página inicial principal.
    *   `About.tsx`: Página "Sobre" a Lypsyos.
    *   `Products.tsx`: Página detalhada do produto DBX-V4 (rota `/produtos/dbx-v4`).
    *   `Contact.tsx`: Página de contato.
    *   *(Nova)* `Portfolio.tsx` (a ser criada): Lista de projetos com links para o GitHub.
    *   *(Nova)* `Admin.tsx` (a ser criada): Dashboard de métricas e controle.

*   **Componentes (`src/components/`)**:
    *   `common/`: Componentes globais como `Navbar.tsx` (cabeçalho) e `Footer.tsx` (rodapé).
    *   `sections/`: Blocos grandes das páginas. Ex: `HeroSection.tsx` (topo da home), `ContactFormSection.tsx` (formulário), `DemoVideoSection.tsx` (vídeo).
    *   `ui/`: Componentes base reutilizáveis (botões, cards, inputs) baseados em uma variação do shadcn/ui.

*   **Serviços Frontend (`src/services/`)**:
    *   `analytics.ts`: Funções para enviar pageviews e eventos para o backend.
    *   `memberAccess.ts` / `supabase.ts`: Autenticação e acesso ao Supabase.

*   **Estilos (`src/styles/globals.css`)**:
    *   Contém as variáveis CSS principais e as cores do tema (Primary, Secondary, Accent, etc.). Para mudar o tema global, altere aqui.

### ⚙️ Backend (Migração Vercel `api/`)

O backend original usava Express (`server/index.ts`) e SQLite (`data/analytics.db`). Para deploy na Vercel (que não tem disco persistente), a arquitetura muda para **Serverless Functions** conectadas ao **Supabase**.

*   `api/track/pageview.ts`, `api/track/event.ts`: Rotas de métricas de acesso.
*   `api/contact.ts`: Envio de e-mails (usa nodemailer) e salva leads.
*   `api/analytics/summary.ts`: Retorna dados para o painel admin.

*Se você quiser mudar como os e-mails são enviados ou as métricas salvas, mexerá nestes arquivos na pasta `api/` (que substituirá a antiga pasta `server/`).*

---

## 🛠 Onde mexer para alterar...

### 1. Textos e Imagens da Home
*   **Hero**: Edite `src/components/sections/HeroSection.tsx`.
*   **Funcionalidades**: Edite `src/components/sections/FeaturesSection.tsx`.
*   **Soluções**: Edite `src/components/sections/SolutionsSection.tsx`.
*   **Vídeo**: O URL do vídeo é configurado pelas variáveis de ambiente `.env` (`VITE_DBX_DEMO_VIDEO_URL`). O componente é `src/components/sections/DemoVideoSection.tsx`.

### 2. A página do DBX-V4
*   O conteúdo principal está em `src/pages/Products.tsx`.
*   O carrossel de imagens está configurado em `src/content/dbxVisuals.ts`. Para mudar as imagens, coloque novas em `public/DBX/` e atualize o `dbxVisuals.ts`.

### 3. Cores e Tipografia
*   Vá para `src/styles/globals.css` na seção `@theme`.
*   As fontes estão configuradas lá (Plus Jakarta Sans e Roboto).

### 4. Formulário de Contato
*   O design do formulário está em `src/components/sections/ContactFormSection.tsx`.
*   O template do e-mail que é enviado (para você e para o cliente) ficará na função serverless `api/contact.ts` (ou antigo `server/contact-mailer.ts`).

### 5. Configurações de Deploy (Vercel)
*   As variáveis de ambiente deverão ser configuradas no painel da Vercel (Supabase URL/Key, SMTP credentials, etc).
*   Não haverá mais dependência de VPS. A Vercel builda o front (`npm run build`) e expõe a pasta `api/` como funções serverless.

---

## 🚀 Próximas Atualizações Planejadas
1.  **Centralização de ícones/botões**: Ajustes finos de CSS (ex: botão play do DBX).
2.  **Página de Portfólio**: Uma nova rota para listar projetos e linkar com o GitHub/detalhes.
3.  **Painel Admin**: Sistema de login para visualizar métricas capturadas pelos eventos (`analytics.ts`).
