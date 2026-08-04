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

const ProductDetail = lazy(async () => {
  const module = await import("./pages/ProductDetail")
  return { default: module.ProductDetail }
})

const Contact = lazy(async () => {
  const module = await import("./pages/Contact")
  return { default: module.Contact }
})

const AdminLayout = lazy(async () => {
  const module = await import("./layouts/AdminLayout")
  return { default: module.AdminLayout }
})

const AdminLogin = lazy(async () => {
  const module = await import("./pages/admin/AdminLogin")
  return { default: module.AdminLogin }
})

const AdminDashboard = lazy(async () => {
  const module = await import("./pages/admin/AdminDashboard")
  return { default: module.AdminDashboard }
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
  {
    path: "/admin",
    element: (
      <Suspense fallback={<RouteFallback />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
