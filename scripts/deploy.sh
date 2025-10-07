#!/usr/bin/env bash
set -euo pipefail

# FitProgres deploy script
# Requisitos: supabase CLI, acceso al proyecto (SUPABASE_ACCESS_TOKEN), psql opcional

PROJECT_REF="${PROJECT_REF:-}"
DB_URL="${DB_URL:-}"
SEED_SIZE="${SEED_SIZE:-quick}"  # quick | full

if ! command -v supabase >/dev/null 2>&1 ; then
  echo "ERROR: Supabase CLI no encontrado. Instala: https://supabase.com/docs/reference/cli" >&2
  exit 1
fi

if [[ -z "${PROJECT_REF}" ]]; then
  echo "ERROR: Define PROJECT_REF con el id del proyecto (xxxxxx)." >&2
  echo "Ej: export PROJECT_REF=abcd1234" >&2
  exit 1
fi

echo "==> Empujando migraciones SQL"
supabase db push --project-ref "$PROJECT_REF" --local-port 6543 --db-schemas public,storage --env-file /dev/null

echo "==> Ejecutando storage_setup.sql (crear bucket y policies)"
supabase db query supabase/storage_setup.sql --project-ref "$PROJECT_REF" >/dev/null

echo "==> Semillas de ejercicios ($SEED_SIZE)"
if [[ "$SEED_SIZE" == "full" ]]; then
  supabase db query supabase/seeds/exercise_seed_300.sql --project-ref "$PROJECT_REF" >/dev/null
else
  supabase db query supabase/seeds/exercise_seed_quick.sql --project-ref "$PROJECT_REF" >/dev/null
fi

echo "==> Deploy Edge Functions"
for fn in webhook_pago crear_credenciales_alumno export_csv create_checkout; do
  echo "  - $fn"
  supabase functions deploy "$fn" --project-ref "$PROJECT_REF"
done

echo "==> Listo. Asegúrate de configurar variables de entorno del proyecto:"
echo "     - SUPABASE_URL y SUPABASE_ANON_KEY para Web/Flutter"
echo "     - SUPABASE_SERVICE_ROLE_KEY para Functions"
