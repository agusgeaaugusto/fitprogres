# FitProgres - Patch de Build

Este paquete corrige los errores de build en GitHub Actions:
- Añade @types/node para que TypeScript reconozca Buffer/NodeJS.
- Provee tsconfig.json compatible (incluye "node" en types).
- Ajusta vite.config.ts con base '/fitprogres/' para GitHub Pages.
- Incluye scripts para corregir imports de '../lib/supabaseClient' a '../../lib/supabaseClient'.

## Uso
1) Copia el contenido de este ZIP en la raíz de tu repo (sobrescribe).

2) (Opcional) Corrige imports si los necesitas:
   - Linux/Mac:
     bash scripts/fix_imports.sh
   - Windows PowerShell:
     ./scripts/fix_imports.ps1

3) Commit & push a main y verifica el workflow deploy-pages.

4) Asegúrate que los secrets existen:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
