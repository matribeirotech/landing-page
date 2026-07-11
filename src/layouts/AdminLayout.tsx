import { useEffect, useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { getMemberSession } from "@/services/memberAccess"
import { BrandMark } from "@/components/common/BrandMark"
import { LogOut } from "lucide-react"
import { getSupabaseClient } from "@/services/supabase"

export function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function checkAuth() {
      try {
        const session = await getMemberSession()
        if (session?.authenticated) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch {
        setIsAuthenticated(false)
      }
    }
    void checkAuth()
  }, [location.pathname])

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-neutral-500">Verificando credenciais...</p>
      </div>
    )
  }

  if (!isAuthenticated && location.pathname !== "/admin/login") {
    navigate("/admin/login")
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-primary">
      {isAuthenticated && (
        <header className="sticky top-0 z-40 border-b border-neutral/10 bg-surface/80 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
            <BrandMark compact className="text-primary" showSubtitle={false} />
            <button
              onClick={async () => {
                await getSupabaseClient().auth.signOut()
                navigate("/admin/login")
              }}
              className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </header>
      )}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
