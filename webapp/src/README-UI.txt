
# UI Pack (screens azul/naranja)

Agrega pantallas listas con estilo y conexión a Supabase.

## Rutas PT
- `/pt/login-fancy`
- `/pt/registro`
- `/pt` (Dashboard fancy)
- `/pt/alumnos-fancy`
- `/pt/alumnos/:id/perfil`
- `/pt/generador/:studentId/fancy`

## Cómo integrar
1) Importá los componentes en tu router (`webapp/src/main.tsx`) o usa las nuevas rutas de ejemplo.
2) Asegurate de tener `webapp/src/lib/supabaseClient.ts` configurado.
3) Estilos: `import './ui/theme.css'` en cada pantalla o en el `App.tsx` global.
