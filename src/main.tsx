import { Suspense, StrictMode, lazy, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom"
import App from "./App"
import "./styles/globals.css"

// Trata automaticamente erros de atualização de versão do Vite em produção
if (typeof window !== "undefined") {
  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault()
    window.location.reload()
  })
}

function lazyWithRetry<T extends Record<string, any>>(
  importer: () => Promise<T>,
  exportName: keyof T = "default" as keyof T,
) {
  return lazy(async () => {
    const isRetried =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("lypsyos_chunk_retry") === "true"

    try {
      const module = await importer()
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem("lypsyos_chunk_retry")
      }
      return { default: module[exportName] }
    } catch (error) {
      if (!isRetried && typeof window !== "undefined") {
        window.sessionStorage.setItem("lypsyos_chunk_retry", "true")
        window.location.reload()
        return new Promise(() => {}) // recarrega a página com os novos hashes
      }
      throw error
    }
  })
}

const Home = lazyWithRetry(() => import("./pages/Home"), "Home")
const About = lazyWithRetry(() => import("./pages/About"), "About")
const Products = lazyWithRetry(() => import("./pages/Products"), "Products")
const ProductDetail = lazyWithRetry(() => import("./pages/ProductDetail"), "ProductDetail")
const Contact = lazyWithRetry(() => import("./pages/Contact"), "Contact")
const ZendaProduct = lazyWithRetry(() => import("./pages/ZendaProduct"), "ZendaProduct")
const Comparison = lazyWithRetry(() => import("./pages/Comparison"), "Comparison")
const Pricing = lazyWithRetry(() => import("./pages/Pricing"), "Pricing")
const Audience = lazyWithRetry(() => import("./pages/Audience"), "Audience")

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6 text-center text-sm text-neutral-600">
      Carregando a experiência Lypsyos...
    </div>
  )
}

function RouteErrorBoundary() {
  const error = useRouteError()
  const errorMessage =
    error instanceof Error ? error.message : "Ocorreu um erro ao carregar a página."

  const isDynamicImportError =
    /failed to fetch dynamically imported module/i.test(errorMessage) ||
    /importing a module script failed/i.test(errorMessage) ||
    /error loading dynamically imported module/i.test(errorMessage)

  useEffect(() => {
    if (isDynamicImportError && typeof window !== "undefined") {
      const isRetried = window.sessionStorage.getItem("lypsyos_chunk_retry") === "true"
      if (!isRetried) {
        window.sessionStorage.setItem("lypsyos_chunk_retry", "true")
        window.location.reload()
      }
    }
  }, [isDynamicImportError])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="size-12 rounded-2xl bg-brand-soft text-brand flex items-center justify-center font-bold text-xl mb-4 shadow-sm">
        L
      </div>
      <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
        {isDynamicImportError ? "Atualizando a experiência Lypsyos..." : "Não foi possível carregar a página"}
      </h2>
      <p className="mt-2 max-w-md text-sm text-ink-soft">
        {isDynamicImportError
          ? "Uma nova versão da plataforma foi disponibilizada. Clique no botão abaixo para carregar os recursos atualizados."
          : "Ocorreu uma instabilidade momentânea na conexão. Clique abaixo para tentar novamente."}
      </p>
      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.sessionStorage.removeItem("lypsyos_chunk_retry")
            window.location.reload()
          }
        }}
        className="mt-5 inline-flex items-center justify-center rounded-btn bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-brand-hover transition-colors"
      >
        Recarregar Página
      </button>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "zenda",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ZendaProduct />
          </Suspense>
        ),
      },
      {
        path: "comparativo",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Comparison />
          </Suspense>
        ),
      },
      {
        path: "planos",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Pricing />
          </Suspense>
        ),
      },
      {
        path: "para-quem-e",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Audience />
          </Suspense>
        ),
      },
      {
        path: "sobre",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "produtos",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "produtos/:slug",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: "contato",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
