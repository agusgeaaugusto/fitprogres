import { createClient } from '@supabase/supabase-js'

// Lee variables de entorno inyectadas por GitHub Actions / Vite
const url = import.meta.env.VITE_SUPABASE_URL as string
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || !anonKey) {
  console.warn('[supabaseClient] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY')
}

// Cliente único a usar en toda la app
export const supabase = createClient(url, anonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
})
