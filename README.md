# FitProgres


## Flutter – variables (usa --dart-define)

Ejemplo de ejecución:
```
flutter run \
  --dart-define=SUPABASE_URL=https://YOUR-PROJECT.supabase.co \
  --dart-define=SUPABASE_ANON_KEY=ey...REEMPLAZA
```

En producción (Android):
```
flutter build apk \
  --dart-define=SUPABASE_URL=https://YOUR-PROJECT.supabase.co \
  --dart-define=SUPABASE_ANON_KEY=ey...REEMPLAZA
```


### Semillas de ejercicios
- Rápido: `supabase sql < supabase/seeds/exercise_seed_quick.sql`
- Completo (≈300): `supabase sql < supabase/seeds/exercise_seed_300.sql`


## Despliegue automatizado
Variables requeridas:

- `PROJECT_REF`: id de tu proyecto Supabase (p.ej. `abcd1234`).
- Opcional `SEED_SIZE=full` para ~300 ejercicios (por defecto `quick`).

Comandos:

```bash
cd scripts
export PROJECT_REF=TU_PROJECT_REF
# Opcional: export SEED_SIZE=full
./deploy.sh
```


### Webhooks – Firmas
- Define secretos:
  - `WEBHOOK_SECRET_MP` para Mercado Pago
  - `WEBHOOK_SECRET_PAGOPAR` para Pagopar
- Los webhooks deben llamar a: `functions/v1/webhook_pago?provider=mercadopago|pagopar` y enviar header `X-Signature` con HMAC-SHA256 del **raw body**.
- Ajusta el esquema de firma según tu gateway si difiere.


## Scripts de ayuda
### 1) Crear credenciales de Alumno
```bash
cd scripts
./create_student.sh https://YOUR-PROJECT.supabase.co TRAINER_ID alumno@demo.com "Alumno Demo"
```
### 2) Simular webhook aprobado (con firma HMAC)
```bash
cd scripts
export WEBHOOK_SECRET=TU_SECRETO
./simulate_webhook.sh https://YOUR-PROJECT.supabase.co mercadopago "$WEBHOOK_SECRET" TRAINER_ID TX123 CODIGO-TEST
```
### 3) Activar licencia manual (solo testing)
```bash
cd scripts
export PROJECT_REF=abcd1234
./activate_license.sh TRAINER_ID CODIGO-PRUEBA
```


## CI/CD con GitHub Actions
Configura estos **Secrets** en tu repo (Settings → Secrets → Actions):

- `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (para el build web)
- `SUPABASE_PROJECT_REF` y `SUPABASE_ACCESS_TOKEN` (para deploy de Functions)
- `SUPABASE_URL` y `SUPABASE_ANON_KEY` (para build de APK Flutter)
- (Opcional) `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` si quieres deploy automático a Vercel

Workflows incluidos:
- `.github/workflows/web-ci.yml`: build de la web y artifact `web-dist`.
- `.github/workflows/functions-deploy.yml`: deploy de Edge Functions a Supabase.
- `.github/workflows/android-apk.yml`: build de APK release y artifact descargable.
