\
$ErrorActionPreference = "Stop"
$root = "webapp/src/routes/PT"
if (Test-Path $root) {
  Get-ChildItem -Path $root -Recurse -Include *.ts,*.tsx | ForEach-Object {
    (Get-Content $_.FullName) -replace "\.\./lib/supabaseClient","../../lib/supabaseClient" `
                              -replace "\.\./ui/components","../../ui/components" `
    | Set-Content $_.FullName -Encoding UTF8
  }
}
Write-Host "Imports actualizados."
