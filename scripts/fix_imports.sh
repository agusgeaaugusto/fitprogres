#!/usr/bin/env bash
set -euo pipefail
ROOT="webapp/src/routes/PT"
if [ -d "$ROOT" ]; then
  grep -RIl "../lib/supabaseClient" "$ROOT" | xargs -r sed -i 's#../lib/supabaseClient#../../lib/supabaseClient#g'
  grep -RIl "../ui/components" "$ROOT" | xargs -r sed -i 's#../ui/components#../../ui/components#g'
fi
echo "Imports actualizados."
