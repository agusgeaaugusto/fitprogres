#!/usr/bin/env bash
set -euo pipefail
REPO="${1:-}"
if [[ -z "$REPO" ]]; then echo "Usage: $0 <owner/repo>"; exit 1; fi
echo "https://nysfbfwtwhybxsfssnhw.supabase.co"  | gh secret set VITE_SUPABASE_URL      --repo "$REPO" --body -
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55c2ZiZnd0d2h5YnhzZnNzbmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NTIxOTcsImV4cCI6MjA3NTQyODE5N30.DRrecSlLBRuHWTwJTKUPTdtJ5NHKMSbQzlc0au5t0tM" | gh secret set VITE_SUPABASE_ANON_KEY --repo "$REPO" --body -
echo "Secrets list at: https://github.com/$REPO/settings/secrets/actions"
