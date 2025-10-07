#!/usr/bin/env bash
set -euo pipefail

# Crea credenciales para un Alumno llamando a la Edge Function.
# Uso:
#   ./create_student.sh https://YOUR-PROJECT.supabase.co TRAINER_ID alumno@demo.com "Alumno Demo"
#
# Requiere: curl

if [[ $# -lt 4 ]]; then
  echo "Uso: $0 SUPABASE_URL TRAINER_ID EMAIL NOMBRE" >&2
  exit 1
fi

SUPABASE_URL="$1"
TRAINER_ID="$2"
EMAIL="$3"
NOMBRE="$4"

echo "=> Creando alumno '$NOMBRE' <$EMAIL> para trainer $TRAINER_ID"
curl -s -X POST "$SUPABASE_URL/functions/v1/crear_credenciales_alumno" \
  -H "Content-Type: application/json" \
  -d "{\"trainer_id\":\"$TRAINER_ID\",\"email\":\"$EMAIL\",\"nombre\":\"$NOMBRE\"}" | jq .
