#!/usr/bin/env bash
set -euo pipefail

# Inserta licencia ACTIVA directamente en tablas (necesita Supabase CLI y permisos).
# Uso:
#   PROJECT_REF=xxxx ./activate_license.sh TRAINER_ID CODIGO
#
if [[ -z "${PROJECT_REF:-}" ]]; then
  echo "ERROR: Define PROJECT_REF con el id del proyecto Supabase." >&2
  exit 1
fi
if [[ $# -lt 2 ]]; then
  echo "Uso: $0 TRAINER_ID CODIGO" >&2
  exit 1
fi

TRAINER_ID="$1"
CODIGO="$2"

SQL=$(cat <<'EOSQL'
insert into license (trainer_id,codigo,estado,origen_pago,transaction_id,activated_at)
values ('__TRAINER__','__CODIGO__','activo','manual','tx-local-'||floor(random()*1000000)::text, now())
on conflict do nothing;
update trainer set licencia_estado='activo', licencia_codigo='__CODIGO__', licencia_pagada_en=now() where id='__TRAINER__';
EOSQL
)

SQL="${SQL/__TRAINER__/$TRAINER_ID}"
SQL="${SQL/__CODIGO__/$CODIGO}"

echo "$SQL" | supabase db query - --project-ref "$PROJECT_REF" >/dev/null
echo "=> Licencia activada para $TRAINER_ID con código $CODIGO"
