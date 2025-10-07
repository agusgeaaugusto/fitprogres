
# FitProgres – Pages + Supabase

1) Repo → Settings → Secrets and variables → Actions:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
2) Settings → Pages → Source: GitHub Actions.
3) Push a main o ejecuta manualmente `deploy-pages`.
4) Ejecuta supabase/sql/*.sql en ese orden: schema → policies → trigger_and_seed.
