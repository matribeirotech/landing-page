import { describe, it, expect, vi } from 'vitest'
import { getSupabaseClient } from '../services/supabase'
import { loginMember, getMemberSession } from '../services/memberAccess'

vi.mock('../services/supabase', () => ({
  getSupabaseClient: vi.fn(),
}))

describe('Supabase Admin Authentication Integration', () => {
  it('should attempt login via signInWithPassword', async () => {
    const mockSignIn = vi.fn().mockResolvedValue({
      data: { session: { access_token: 'fake_token' } },
      error: null,
    })
    
    // Configura o mock do supabaseClient
    vi.mocked(getSupabaseClient).mockReturnValue({
      auth: {
        signInWithPassword: mockSignIn,
      },
    } as any)

    const success = await loginMember('admin@lypsyos.com', '123456')
    
    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'admin@lypsyos.com',
      password: '123456'
    })
    expect(success).toBe(true)
  })

  it('should return session if getSession is successful', async () => {
    const mockGetSession = vi.fn().mockResolvedValue({
      data: {
        session: {
          access_token: 'fake_token',
          user: { email: 'admin@lypsyos.com', id: '123' }
        }
      },
      error: null,
    })

    vi.mocked(getSupabaseClient).mockReturnValue({
      auth: {
        getSession: mockGetSession,
      },
    } as any)

    const session = await getMemberSession()
    
    expect(mockGetSession).toHaveBeenCalled()
    expect(session?.authenticated).toBe(true)
  })
})
