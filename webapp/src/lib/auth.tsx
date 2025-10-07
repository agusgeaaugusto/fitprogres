
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

type Sess = { userId?: string | null }
const AuthCtx = createContext<{session:Sess, loading:boolean}>({
  session: {}, loading: true
})

export function AuthProvider({children}:{children:React.ReactNode}){
  const [session,setSession] = useState<Sess>({})
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    ;(async()=>{
      const { data } = await supabase.auth.getSession()
      if(!mounted) return
      setSession({ userId: data.session?.user?.id || null })
      setLoading(false)
    })()
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s)=>{
      setSession({ userId: s?.user?.id || null })
    })
    return ()=>{ sub.subscription.unsubscribe(); mounted=false }
  }, [])

  return <AuthCtx.Provider value={{session, loading}}>{children}</AuthCtx.Provider>
}

export function useAuth(){ return useContext(AuthCtx) }

export function RequirePT({children}:{children:React.ReactNode}){
  const { session, loading } = useAuth()
  if(loading) return <div style={{padding:24}}>Cargando…</div>
  if(!session.userId){ window.location.href = import.meta.env.BASE_URL + 'pt/login'; return null }
  return <>{children}</>
}
