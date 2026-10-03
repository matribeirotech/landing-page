import {
  ArrowDownRight,
  ArrowUpRight,
  BellRing,
  Coffee,
  Cookie,
  CupSoda,
  Milk,
  Sandwich,
  Search,
  Star,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/utils/cn"

/*
 * Ilustrações de produto feitas em código (sem imagens externas).
 * Todos os valores exibidos são ilustrativos.
 * Cada mockup expõe um único role="img" com descrição; o conteúdo interno é decorativo.
 */

const salesLinePath = "M0 52 C 18 50, 26 40, 42 42 S 70 30, 86 32 S 118 18, 134 22 S 168 8, 200 6"

/* ------------------------------------------------------------------ */
/* Hero: PDV + tablet + celular                                        */
/* ------------------------------------------------------------------ */

export function HeroDevices({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Ilustração do sistema Lypsyos: monitor de PDV com o painel de vendas do dia, tablet com o resumo do caixa e celular com alerta de estoque baixo."
      className={cn("@container relative aspect-[5/4] w-full select-none", className)}
    >
      <div aria-hidden="true" className="absolute inset-0">
        {/* Monitor de PDV */}
        <div className="absolute left-[4%] top-[2%] w-[70%]">
          <div className="rounded-[2.2cqw] bg-night p-[1.1cqw] shadow-lift">
            <div className="flex aspect-[16/10] flex-col gap-[1.6cqw] overflow-hidden rounded-[1.4cqw] bg-white p-[2.4cqw]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[1.7cqw] font-medium text-ink-soft">Vendas de hoje</p>
                  <p className="font-heading text-[4.2cqw] font-bold leading-tight text-ink">R$ 4.820,00</p>
                </div>
                <span className="inline-flex items-center gap-[0.6cqw] rounded-full bg-growth-soft px-[1.4cqw] py-[0.6cqw] text-[1.6cqw] font-semibold text-growth-text">
                  <TrendingUp className="size-[1.9cqw]" /> +12% vs ontem
                </span>
              </div>
              <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="min-h-0 w-full flex-1">
                <defs>
                  <linearGradient id="hero-sales-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${salesLinePath} L200 60 L0 60 Z`} fill="url(#hero-sales-fill)" />
                <path d={salesLinePath} fill="none" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="grid grid-cols-3 gap-[1.2cqw]">
                {[
                  ["Ticket médio", "R$ 48,20"],
                  ["Itens vendidos", "312"],
                  ["Clientes", "100"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1cqw] bg-canvas px-[1.2cqw] py-[0.9cqw]">
                    <p className="text-[1.4cqw] text-ink-soft">{label}</p>
                    <p className="text-[2.1cqw] font-semibold text-ink">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mx-auto h-[3.5cqw] w-[14%] bg-gradient-to-b from-night to-[#16306b]" />
          <div className="mx-auto h-[1cqw] w-[34%] rounded-full bg-night/90" />
        </div>

        {/* Tablet com resumo do caixa */}
        <div className="absolute bottom-[4%] left-0 w-[40%] rounded-[2.4cqw] bg-night p-[1cqw] shadow-lift">
          <div className="flex aspect-[4/3] flex-col gap-[1.2cqw] rounded-[1.6cqw] bg-white p-[2cqw]">
            <p className="text-[1.7cqw] font-semibold text-ink">Resumo do caixa</p>
            <div className="flex items-center justify-between rounded-[1cqw] bg-growth-soft px-[1.4cqw] py-[1cqw]">
              <span className="flex items-center gap-[0.6cqw] text-[1.5cqw] text-growth-text">
                <ArrowUpRight className="size-[1.8cqw]" /> Entradas
              </span>
              <span className="text-[1.8cqw] font-semibold text-ink">R$ 4.820</span>
            </div>
            <div className="flex items-center justify-between rounded-[1cqw] bg-danger-soft px-[1.4cqw] py-[1cqw]">
              <span className="flex items-center gap-[0.6cqw] text-[1.5cqw] text-[#b91c1c]">
                <ArrowDownRight className="size-[1.8cqw]" /> Saídas
              </span>
              <span className="text-[1.8cqw] font-semibold text-ink">R$ 1.390</span>
            </div>
            <div className="mt-auto flex items-end justify-between">
              <div>
                <p className="text-[1.4cqw] text-ink-soft">Saldo</p>
                <p className="font-heading text-[2.8cqw] font-bold text-brand">R$ 3.430</p>
              </div>
              <div className="flex h-[5cqw] items-end gap-[0.6cqw]">
                {[40, 65, 50, 80, 70, 95].map((height, index) => (
                  <span key={index} className="w-[1.2cqw] rounded-t-sm bg-brand/80" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Celular com alerta de estoque */}
        <div className="absolute right-[2%] top-[14%] w-[25%] rounded-[3.6cqw] bg-night p-[0.9cqw] shadow-lift">
          <div className="flex aspect-[9/18] flex-col gap-[1.2cqw] overflow-hidden rounded-[2.8cqw] bg-canvas p-[1.6cqw]">
            <div className="mx-auto h-[0.9cqw] w-[30%] rounded-full bg-night/15" />
            <div className="rounded-[1.4cqw] border border-warning/40 bg-white p-[1.4cqw] shadow-soft">
              <p className="flex items-center gap-[0.6cqw] text-[1.4cqw] font-semibold text-[#b45309]">
                <BellRing className="size-[1.7cqw]" /> Estoque baixo
              </p>
              <p className="mt-[0.4cqw] text-[1.5cqw] font-semibold leading-snug text-ink">Refrigerante 2L</p>
              <p className="text-[1.3cqw] text-ink-soft">Restam 6 unidades</p>
            </div>
            {[
              { name: "Café 500g", qty: "48 un.", tone: "bg-growth" },
              { name: "Biscoito", qty: "31 un.", tone: "bg-growth" },
              { name: "Leite 1L", qty: "12 un.", tone: "bg-warning" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-[1.2cqw] bg-white px-[1.2cqw] py-[1cqw]">
                <span className="flex items-center gap-[0.8cqw] text-[1.3cqw] text-ink">
                  <span className={cn("size-[1cqw] rounded-full", item.tone)} />
                  {item.name}
                </span>
                <span className="text-[1.2cqw] text-ink-soft">{item.qty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards flutuantes */}
        <div className="absolute right-[1%] top-0 flex items-center gap-[1.2cqw] rounded-[1.6cqw] bg-white px-[1.8cqw] py-[1.3cqw] shadow-lift">
          <span className="flex size-[4.4cqw] items-center justify-center rounded-full bg-growth-soft text-growth-text">
            <TrendingUp className="size-[2.4cqw]" />
          </span>
          <div>
            <p className="font-heading text-[2.4cqw] font-bold leading-none text-ink">+18%</p>
            <p className="text-[1.4cqw] text-ink-soft">em vendas no mês</p>
          </div>
        </div>

        <div className="absolute bottom-[1%] right-[6%] flex items-center gap-[1.2cqw] rounded-[1.6cqw] bg-white px-[1.8cqw] py-[1.2cqw] shadow-lift">
          <span className="flex size-[4.4cqw] items-center justify-center rounded-full bg-brand text-[1.8cqw] font-semibold text-white">
            AS
          </span>
          <div>
            <p className="text-[1.6cqw] font-semibold text-ink">Ana Souza</p>
            <p className="flex items-center gap-[0.4cqw] text-[1.4cqw] text-growth-text">
              <Star className="size-[1.6cqw] fill-warning text-warning" /> Cliente fiel
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Feature: Estoque                                                    */
/* ------------------------------------------------------------------ */

const stockRows = [
  { name: "Refrigerante 2L", qty: 6, status: "Repor", icon: CupSoda, tone: "warning" },
  { name: "Café torrado 500g", qty: 48, status: "OK", icon: Coffee, tone: "ok" },
  { name: "Biscoito recheado", qty: 31, status: "OK", icon: Cookie, tone: "ok" },
  { name: "Leite integral 1L", qty: 14, status: "Vencendo", icon: Milk, tone: "danger" },
  { name: "Pão de forma", qty: 9, status: "Repor", icon: Sandwich, tone: "warning" },
] as const

const statusTone = {
  ok: "bg-growth-soft text-growth-text",
  warning: "bg-warning-soft text-[#b45309]",
  danger: "bg-danger-soft text-[#b91c1c]",
} as const

export function StockMockup({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Ilustração da tela de estoque: lista de produtos com quantidade e etiquetas de status OK, Repor e Vencendo, com alerta de três produtos para reposição."
      className={cn("relative mx-auto w-full max-w-lg select-none pb-8", className)}
    >
      <div aria-hidden="true">
        <div className="rounded-[1.75rem] bg-night p-2.5 shadow-lift">
          <div className="space-y-3 rounded-[1.25rem] bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-heading text-base font-semibold text-ink">Estoque</p>
              <span className="flex items-center gap-2 rounded-full bg-canvas px-3 py-1.5 text-xs text-ink-muted">
                <Search className="size-3.5" /> Buscar produto
              </span>
            </div>
            <ul className="divide-y divide-line">
              {stockRows.map((row) => (
                <li key={row.name} className="flex items-center gap-3 py-2.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <row.icon className="size-4.5" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{row.name}</span>
                  <span className="text-sm tabular-nums text-ink-soft">{row.qty} un.</span>
                  <span className={cn("w-20 rounded-full px-2.5 py-1 text-center text-xs font-semibold", statusTone[row.tone])}>
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="absolute -bottom-1 left-4 flex items-center gap-3 rounded-2xl border border-warning/30 bg-white px-4 py-3 shadow-lift sm:-left-6">
          <span className="flex size-10 items-center justify-center rounded-full bg-warning-soft text-[#b45309]">
            <BellRing className="size-5" />
          </span>
          <p className="text-sm font-semibold text-ink">3 produtos precisam de reposição</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Feature: Entrada e saída                                            */
/* ------------------------------------------------------------------ */

const weekFlow = [
  { day: "Seg", income: 62, expense: 30 },
  { day: "Ter", income: 54, expense: 42 },
  { day: "Qua", income: 70, expense: 28 },
  { day: "Qui", income: 66, expense: 36 },
  { day: "Sex", income: 88, expense: 40 },
  { day: "Sáb", income: 96, expense: 34 },
  { day: "Dom", income: 48, expense: 18 },
]

export function CashFlowMockup({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Ilustração do fluxo de caixa: gráfico de barras de entradas e saídas da semana, com saldo do dia de R$ 3.430."
      className={cn("relative mx-auto w-full max-w-lg select-none pb-8", className)}
    >
      <div aria-hidden="true">
        <div className="rounded-[1.25rem] border border-line bg-white p-5 shadow-lift sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-heading text-base font-semibold text-ink">Entradas x Saídas</p>
            <div className="flex items-center gap-4 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-growth" /> Entradas</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-brand" /> Saídas</span>
            </div>
          </div>
          <div className="mt-5 flex h-44 items-end justify-between gap-2 border-b border-line pb-2">
            {weekFlow.map((item) => (
              <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className="flex h-full w-full items-end justify-center gap-1">
                  <span className="w-2.5 rounded-t-md bg-growth sm:w-3.5" style={{ height: `${item.income}%` }} />
                  <span className="w-2.5 rounded-t-md bg-brand sm:w-3.5" style={{ height: `${item.expense}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-ink-muted">
            {weekFlow.map((item) => (
              <span key={item.day} className="flex-1 text-center">{item.day}</span>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              ["A receber", "R$ 2.150"],
              ["A pagar", "R$ 980"],
              ["Lucro do mês", "R$ 18,4 mil"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-canvas px-3 py-2.5">
                <p className="text-xs text-ink-soft">{label}</p>
                <p className="text-sm font-semibold tabular-nums text-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-1 right-4 rounded-2xl bg-night px-5 py-3.5 text-white shadow-lift sm:-right-6">
          <p className="text-xs text-white/70">Saldo do dia</p>
          <p className="font-heading text-xl font-bold tabular-nums">R$ 3.430</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Feature: Marketing                                                  */
/* ------------------------------------------------------------------ */

export function MarketingMockup({ className }: { className?: string }) {
  const stamps = 10
  const filled = 8

  return (
    <div
      role="img"
      aria-label="Ilustração de marketing: celular com mensagem de cupom de desconto para a cliente e cartão de fidelidade digital com oito de dez selos preenchidos."
      className={cn("relative mx-auto flex w-full max-w-lg select-none items-center justify-center gap-4 sm:gap-6", className)}
    >
      <div aria-hidden="true" className="contents">
        <div className="w-[52%] max-w-60 shrink-0 rounded-[2.25rem] bg-night p-2 shadow-lift">
          <div className="flex aspect-[9/17] flex-col overflow-hidden rounded-[1.8rem] bg-[#ece5dd]">
            <div className="flex items-center gap-2 bg-[#075e54] px-3 py-3 text-white">
              <span className="flex size-7 items-center justify-center rounded-full bg-white/20 text-[0.625rem] font-semibold">LY</span>
              <div>
                <p className="text-xs font-semibold leading-tight">Sua Loja</p>
                <p className="text-[0.625rem] text-white/70">online</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-end gap-2 p-3">
              <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-xs leading-snug text-ink shadow-sm">
                Oi, Ana! Seu cupom de <strong>10%</strong> vale até sábado 🎉
                <span className="mt-1 block text-right text-[0.625rem] text-ink-muted">10:24</span>
              </div>
              <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-xs text-ink shadow-sm">
                Código: <strong className="tracking-wide text-brand">ANA10</strong>
              </div>
              <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-[#dcf8c6] px-3 py-2 text-xs text-ink shadow-sm">
                Oba! Passo aí amanhã 😍
              </div>
            </div>
          </div>
        </div>

        <div className="w-[44%] max-w-52 space-y-3">
          <div className="rounded-2xl bg-gradient-to-br from-brand to-growth p-4 text-white shadow-lift">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-white/80">Cartão fidelidade</p>
            <p className="mt-1 font-heading text-base font-semibold">Ana Souza</p>
            <div className="mt-3 grid grid-cols-5 gap-1.5">
              {Array.from({ length: stamps }, (_, index) => (
                <span
                  key={index}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-full border",
                    index < filled ? "border-white bg-white text-growth-text" : "border-white/50",
                  )}
                >
                  {index < filled ? <Star className="size-3 fill-current" /> : null}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/90">Faltam 2 compras para o brinde</p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <p className="text-xs text-ink-soft">Clientes que voltaram</p>
            <p className="font-heading text-xl font-bold text-ink">+27%</p>
            <p className="text-xs text-growth-text">após a campanha</p>
          </div>
        </div>
      </div>
    </div>
  )
}
