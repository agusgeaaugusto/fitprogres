# GitHub Pages Workflow (Vite + React)

Este workflow publica `webapp/` en GitHub Pages usando **secrets**:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Uso
1. Copia la carpeta `.github/workflows/` al **raíz** del repo.
2. En GitHub → Settings → Secrets and variables → Actions:
   - Agrega los secrets `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
3. Haz un push (o ejecuta manualmente desde **Actions → deploy-pages**).

## Requisitos
- `webapp/` con `package.json`, `vite.config.ts` (base: '/fitprogres/'), `src/**`.
- **NO** subas `webapp/node_modules` ni `webapp/dist`.

## Notas
- Copiamos `index.html` a `404.html` para que el SPA responda a refrescos en rutas.
