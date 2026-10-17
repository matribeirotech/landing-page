# 🎨 Guia de Implementação do Design System Lypsyos no Zenda

> **Documento Oficial de Especificação Técnica e Visual**  
> Guia prático passo a passo para replicar a mesma identidade visual, tokens de design, componentes proprietários e padrões de responsividade da landing page da **Lypsyos** diretamente no aplicativo/plataforma **Zenda**.

---

## 🧭 1. Visão Geral & Filosofia de Design

O design da **Lypsyos** e do **Zenda** foi construído sob quatro pilares:
1. **Clareza & Leveza (Clean & Modern):** Fundos claros com respiro visual (`#F7F9FC` e `#FFFFFF`), evitando a saturação pesada de sistemas legados.
2. **Confiança & Tecnologia (Deep Tech):** Azul Real vibrante (`#2457F5`), Azul Noturno institucional (`#0B1F4D`) e Ciano luminoso (`#06B6D4`).
3. **Crescimento & Lucro no Comércio:** Verde Esmeralda (`#10B981` / `#047857`) aplicado estrategicamente em métricas financeiras, horários confirmados e status de sucesso.
4. **Mobile-First Real:** Interfaces sem quebras horizontais, botões adaptáveis ao toque, badges modulares e ausência de *overflows* em telas de qualquer tamanho.

---

## 🎨 2. Tokens de Design (Design Tokens & CSS Variables)

Adicione as variáveis abaixo no seu arquivo global de estilos (`globals.css` ou `tailwind.config.js`).

### 2.1 Cores da Marca (Paleta Oficial)

```css
@theme {
  /* Fontes (Google Fonts: Inter e Poppins) */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Poppins", "Inter", ui-sans-serif, system-ui, sans-serif;

  /* Cores Principais Lypsyos / Zenda */
  --color-brand: #2457f5;          /* Azul Principal / CTAs */
  --color-brand-hover: #1a44d1;    /* Hover de botões */
  --color-brand-soft: #eaf0ff;     /* Fundo sutil de destaque */

  /* Cores de Crescimento / Sucesso / Faturamento */
  --color-growth: #10b981;         /* Verde Esmeralda (ícones, status ativo) */
  --color-growth-text: #047857;    /* Texto verde de alto contraste */
  --color-growth-soft: #e7f8f1;    /* Fundo de badges de sucesso */

  /* Ciano Tecnológico */
  --color-cyan-glow: #06b6d4;      /* Nós neurais e linhas orbitais */

  /* Neutros e Fundos */
  --color-night: #0b1f4d;          /* Azul Noturno corporativo */
  --color-ink: #0f172a;            /* Texto principal de alto contraste */
  --color-ink-soft: #475569;       /* Texto secundário e parágrafos */
  --color-ink-muted: #94a3b8;      /* Legendas, bordas e datas */
  --color-line: #e2e8f0;           /* Bordas suaves */
  --color-canvas: #f7f9fc;         /* Fundo de páginas e áreas secundárias */
  --color-surface: #ffffff;        /* Fundo de cards e modais */

  /* Alertas e Apoio */
  --color-danger: #ef4444;
  --color-danger-soft: #fee2e2;
  --color-warning: #f59e0b;
  --color-warning-soft: #fef3c7;

  /* Geometria e Raios de Borda */
  --radius-card: 1rem;             /* 16px para cards principais */
  --radius-btn: 0.75rem;           /* 12px para botões */

  /* Sombras em Camadas (Soft Shadows) */
  --shadow-soft: 0 10px 30px rgb(36 87 245 / 0.08);
  --shadow-lift: 0 1px 2px rgb(15 23 42 / 0.06), 0 18px 40px rgb(36 87 245 / 0.12);
}
```

---

## 💎 3. Componente Proprietário de Ícones (`LypsyosIconBadge`)

Para evitar ícones genéricos (quadrados azuis comuns), criamos um **emblema exclusivo da marca** com acabamento em camadas translúcidas, nós neurais e linhas em SVG inspiradas no logo da Lypsyos.

Crie o arquivo `src/components/ui/LypsyosIconBadge.tsx` no Zenda:

```tsx
import type { LucideIcon } from "lucide-react"
import { cn } from "@/utils/cn"

export type LypsyosIconTone = "brand" | "growth" | "cyan" | "night" | "danger"
export type LypsyosIconSize = "sm" | "md" | "lg" | "xl"

interface LypsyosIconBadgeProps {
  icon: LucideIcon
  tone?: LypsyosIconTone
  size?: LypsyosIconSize
  className?: string
  iconClassName?: string
}

const toneStyles: Record<
  LypsyosIconTone,
  {
    wrapper: string
    innerGlow: string
    iconColor: string
    nodeColor: string
    circuitStroke: string
  }
> = {
  brand: {
    wrapper:
      "border-brand/25 bg-gradient-to-br from-white via-brand-soft/90 to-cyan-50/80 shadow-[0_8px_20px_-4px_rgba(36,87,245,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:border-brand/50",
    innerGlow: "from-brand/15 via-cyan-400/10 to-transparent",
    iconColor: "text-brand",
    nodeColor: "bg-cyan-400 shadow-[0_0_6px_#22d3ee]",
    circuitStroke: "#2457f5",
  },
  growth: {
    wrapper:
      "border-growth/30 bg-gradient-to-br from-white via-growth-soft/90 to-teal-50/80 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:border-growth/55",
    innerGlow: "from-growth/18 via-teal-400/10 to-transparent",
    iconColor: "text-growth-text",
    nodeColor: "bg-growth shadow-[0_0_6px_#10b981]",
    circuitStroke: "#047857",
  },
  cyan: {
    wrapper:
      "border-cyan-400/30 bg-gradient-to-br from-white via-cyan-50/90 to-brand-soft/70 shadow-[0_8px_20px_-4px_rgba(6,182,212,0.2),inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:border-cyan-500/50",
    innerGlow: "from-cyan-400/18 via-brand/10 to-transparent",
    iconColor: "text-cyan-700",
    nodeColor: "bg-brand shadow-[0_0_6px_#2457f5]",
    circuitStroke: "#0891b2",
  },
  night: {
    wrapper:
      "border-white/15 bg-gradient-to-br from-night via-[#122b66] to-[#09173a] shadow-[0_10px_24px_-4px_rgba(11,31,77,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]",
    innerGlow: "from-cyan-400/20 via-brand/15 to-transparent",
    iconColor: "text-cyan-300",
    nodeColor: "bg-cyan-400 shadow-[0_0_6px_#22d3ee]",
    circuitStroke: "#38bdf8",
  },
  danger: {
    wrapper:
      "border-danger/25 bg-gradient-to-br from-white via-danger-soft/80 to-rose-50/70 shadow-[0_8px_18px_-4px_rgba(239,68,68,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]",
    innerGlow: "from-danger/12 via-rose-400/8 to-transparent",
    iconColor: "text-danger",
    nodeColor: "bg-danger shadow-[0_0_6px_#ef4444]",
    circuitStroke: "#ef4444",
  },
}

const sizeStyles: Record<
  LypsyosIconSize,
  {
    box: string
    icon: string
    node: string
  }
> = {
  sm: {
    box: "size-9 rounded-xl",
    icon: "size-4.5",
    node: "size-1.5 right-1.5 top-1.5",
  },
  md: {
    box: "size-11 rounded-2xl",
    icon: "size-5",
    node: "size-1.5 right-2 top-2",
  },
  lg: {
    box: "size-13 rounded-2xl",
    icon: "size-6",
    node: "size-2 right-2 top-2",
  },
  xl: {
    box: "size-15 rounded-[1.15rem]",
    icon: "size-7",
    node: "size-2 right-2.5 top-2.5",
  },
}

export function LypsyosIconBadge({
  icon: Icon,
  tone = "brand",
  size = "lg",
  className,
  iconClassName,
}: LypsyosIconBadgeProps) {
  const palette = toneStyles[tone]
  const dimensions = sizeStyles[size]

  return (
    <span
      aria-hidden="true"
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-center overflow-hidden border transition-all duration-300",
        dimensions.box,
        palette.wrapper,
        className,
      )}
    >
      {/* Aura interna translúcida */}
      <span className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80", palette.innerGlow)} />

      {/* Geometria neural proprietária de fundo */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="pointer-events-none absolute inset-0 size-full opacity-[0.16] transition-transform duration-300 group-hover:scale-110"
      >
        <path
          d="M6 36 L16 26 L26 26 M28 12 L38 24 L28 36"
          stroke={palette.circuitStroke}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="6" cy="36" r="2" fill={palette.circuitStroke} />
        <circle cx="16" cy="26" r="1.5" fill={palette.circuitStroke} />
      </svg>

      {/* Ponto neural luminoso ativo */}
      <span
        className={cn(
          "pointer-events-none absolute rounded-full transition-transform duration-300 group-hover:scale-125",
          dimensions.node,
          palette.nodeColor,
        )}
      />

      {/* Ícone */}
      <Icon
        strokeWidth={2.1}
        className={cn("relative z-10 transition-transform duration-300 group-hover:scale-105", dimensions.icon, palette.iconColor, iconClassName)}
      />
    </span>
  )
}
```

---

## 🔘 4. Padrão de Botões Responsivos (`Button.tsx`)

> **Regra de Ouro:** Nunca force `whitespace-nowrap` no mobile em botões de CTA com textos descritivos longos.

```tsx
import * as React from "react"
import { cn } from "@/utils/cn"

export function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: { variant?: "default" | "outline" | "inverse" | "secondary" | "ghost" | "link"; size?: "default" | "sm" | "lg" | "icon"; className?: string } = {}) {
  return cn(
    "inline-flex max-w-full select-none items-center justify-center gap-2 rounded-btn text-center font-semibold leading-snug sm:whitespace-nowrap transition-[background-color,border-color,color,box-shadow,translate] duration-200 disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-brand text-white shadow-[0_8px_20px_rgb(36_87_245/0.25)] hover:bg-brand-hover hover:-translate-y-0.5": variant === "default",
      "bg-night text-white hover:bg-ink hover:-translate-y-0.5": variant === "secondary",
      "border border-line bg-surface text-ink hover:border-brand/40 hover:bg-brand-soft hover:text-brand": variant === "outline",
      "bg-white text-brand shadow-[0_8px_20px_rgb(0_0_0/0.18)] hover:bg-brand-soft hover:-translate-y-0.5": variant === "inverse",
      "text-ink hover:bg-brand-soft hover:text-brand": variant === "ghost",
      "text-brand underline-offset-4 hover:underline": variant === "link",
      
      /* Dimensões adaptativas para evitar corte no celular */
      "min-h-11 px-4 py-2 text-sm sm:px-5 sm:text-[0.9375rem]": size === "default",
      "min-h-10 rounded-lg px-3.5 py-1.5 text-xs sm:px-4 sm:text-sm": size === "sm",
      "min-h-12 px-4 py-2.5 text-sm sm:px-6 sm:text-base": size === "lg",
      "size-11": size === "icon",
    },
    className,
  )
}
```

---

## 📱 5. Regras Críticas de Responsividade Mobile

Ao construir qualquer tela ou componente no Zenda, garanta:

1. **Colunas de Grid com `min-w-0`:**
   ```tsx
   /* CORRETO: Evita que itens filhos expandam o grid além de 100vw */
   <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
     <div className="min-w-0 space-y-6">...</div>
     <div className="min-w-0">...</div>
   </div>
   ```

2. **Títulos com Quebra Natural (`break-words`):**
   ```tsx
   <h2 className="font-heading text-2xl font-extrabold sm:text-4xl lg:text-5xl break-words">
     Conheça o <span className="text-brand">Zenda</span>
   </h2>
   ```

3. **Padding Responsivo em Containers de Destaque:**
   * Mobile: `p-5` ou `p-6` com cantos `rounded-3xl` (24px)
   * Desktop: `sm:p-10 lg:p-14` com cantos `sm:rounded-[2.5rem]` (40px)

---

## ⚡ 6. Cards & Visual do Painel Zenda (CRM 3-em-1)

Para os cards de faturamento, métricas e listagem de agendamentos no Zenda:

```tsx
<div className="rounded-3xl border border-line bg-night p-5 sm:p-6 text-white shadow-2xl space-y-5">
  {/* Header com Logo e Status */}
  <div className="flex items-center justify-between border-b border-white/10 pb-4">
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-xl bg-white p-1.5 shadow-md">
        <img src="/logo-oficial.png" alt="Lypsyos" className="size-full object-contain" />
      </div>
      <div>
        <p className="font-heading font-bold text-white text-base">Zenda Platform</p>
        <p className="text-xs text-white/60">Sistema de Agendamento</p>
      </div>
    </div>
    <span className="rounded-full bg-growth-soft px-3 py-1 text-xs font-semibold text-growth-text">
      Robô Ativo 24/7
    </span>
  </div>

  {/* Card de Faturamento Previsto */}
  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1">
    <p className="text-xs text-white/60">Faturamento previsto hoje</p>
    <p className="font-heading text-3xl font-extrabold text-growth">R$ 540,00</p>
    <p className="text-xs text-white/70">6 clientes confirmadas pelo robô</p>
  </div>
</div>
```

---

## 🚀 7. Checklist de Implementação no Zenda

- [ ] Instalar as fontes **Inter** e **Poppins** no `index.html`.
- [ ] Copiar as variáveis de cores para o CSS global (`--color-brand`, `--color-growth`, etc.).
- [ ] Criar o componente [`LypsyosIconBadge.tsx`](#3-componente-proprietário-de-ícones-lypsyosiconbadge).
- [ ] Adicionar o asset [`/logo-oficial.png`](/logo-oficial.png) na pasta `public/` do projeto Zenda.
- [ ] Atualizar o componente de botões com suporte ao layout mobile seguro.
- [ ] Substituir os ícones comuns da interface pelo `LypsyosIconBadge` com os tons adequados (`growth` para WhatsApp/faturamento, `brand` para CRM/segurança, `cyan` para PWA/móvel).

