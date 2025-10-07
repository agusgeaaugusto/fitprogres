param([Parameter(Mandatory=$true)][string]$Repo)
$ViteUrl = "https://nysfbfwtwhybxsfssnhw.supabase.co"
$ViteAnon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55c2ZiZnd0d2h5YnhzZnNzbmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NTIxOTcsImV4cCI6MjA3NTQyODE5N30.DRrecSlLBRuHWTwJTKUPTdtJ5NHKMSbQzlc0au5t0tM"
$ViteUrl  | gh secret set VITE_SUPABASE_URL      --repo $Repo --body -
$ViteAnon | gh secret set VITE_SUPABASE_ANON_KEY --repo $Repo --body -
Write-Host "Secrets list: https://github.com/$Repo/settings/secrets/actions"
