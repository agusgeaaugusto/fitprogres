# FitProgres (mínimo y limpio)

## 1) Secrets en GitHub
Settings → Secrets and variables → Actions:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 2) GitHub Pages
Settings → Pages → **Source: GitHub Actions**.

## 3) Deploy
Push a `main` o ejecuta **Actions → deploy-pages**.

## 4) Rutas
Este proyecto usa `base: '/fitprogres/'` y Router con `basename` de `import.meta.env.BASE_URL`.
