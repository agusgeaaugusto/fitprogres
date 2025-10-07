#!/usr/bin/env bash
set -euo pipefail

# Simula un webhook de pago aprobado firmando el body con HMAC-SHA256.
# Uso:
#   ./simulate_webhook.sh https://YOUR-PROJECT.supabase.co mercadopago SECRET TRAINER_ID TX123 CODIGO-TEST
#
# Notas:
# - provider: mercadopago | pagopar
# - SECRET debe ser igual a WEBHOOK_SECRET_MP o WEBHOOK_SECRET_PAGOPAR configurado en Functions.

if [[ $# -lt 6 ]]; then
  echo "Uso: $0 SUPABASE_URL provider secret trainer_id transaction_id codigo" >&2
  exit 1
fi

SUPABASE_URL="$1"
PROVIDER="$2"
SECRET="$3"
TRAINER_ID="$4"
TX="$5"
CODIGO="$6"

BODY=$(cat <<JSON
{"trainer_id":"$TRAINER_ID","transaction_id":"$TX","origen_pago":"$PROVIDER","status":"approved","codigo":"$CODIGO"}
JSON
)

# Firma HMAC-SHA256 (hex)
SIG=$(printf '%s' "$BODY" | openssl dgst -sha256 -mac HMAC -macopt "key:$SECRET" -binary | xxd -p -c 256)

echo "=> Enviando webhook firmado ($PROVIDER) tx=$TX"
curl -s -i -X POST "$SUPABASE_URL/functions/v1/webhook_pago?provider=$PROVIDER" \
  -H "Content-Type: application/json" \
  -H "X-Signature: $SIG" \
  -d "$BODY"
echo
