import { Suspense, StrictMode, lazy } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import "./styles/globals.css"

const Home = lazy(async () => {
  const module = await import("./pages/Home")
  return { default: module.Home }
})

const About = lazy(async () => {
  const module = await import("./pages/About")
  return { default: module.About }
})

const Products = lazy(async () => {
  const module = await import("./pages/Products")
  return { default: module.Products }
})

const Contact = lazy(async () => {
  const module = await import("./pages/Contact")
  return { default: module.Contact }
})

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6 text-center text-sm text-neutral-600">
      Carregando a experiência Lypsyos...
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "sobre",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "produtos/dbx-v3",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "produtos/dbx-v2",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Products />
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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
