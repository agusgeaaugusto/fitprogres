import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function hexToUint8(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));
}
async function verifyHmacSha256(payload: string, signatureHex: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("HMAC", key, hexToUint8(signatureHex.toLowerCase()), new TextEncoder().encode(payload));
  return ok;
}

serve(async (req: Request) => {
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const raw = await req.text();
  const url = new URL(req.url);
  const provider = url.searchParams.get("provider") ?? req.headers.get("x-provider") ?? "mercadopago";
  const sig = req.headers.get("x-signature") ?? "";
  const secret = provider === "pagopar" ? (Deno.env.get("WEBHOOK_SECRET_PAGOPAR") ?? "") : (Deno.env.get("WEBHOOK_SECRET_MP") ?? "");

  // Basic HMAC-SHA256 verification (placeholder: ajusta al esquema real de cada gateway)
  if (!secret || !sig) return new Response("missing signature", { status: 401 });
  const ok = await verifyHmacSha256(raw, sig, secret);
  if (!ok) return new Response("invalid signature", { status: 401 });

  let body: any;
  try { body = JSON.parse(raw); } catch { return new Response("bad json", { status: 400 }); }

  // Expected body: { trainer_id, transaction_id, origen_pago, status, codigo }
  const { trainer_id, transaction_id, origen_pago, status, codigo } = body;
  if (!trainer_id || !transaction_id) return new Response("missing fields", { status: 400 });

  const estado = status === "approved" ? "activo" : (status === "rejected" ? "fallido" : "pendiente");

  // Idempotencia: upsert por transaction_id
  await sb.from("license").upsert({
    trainer_id, transaction_id, origen_pago, codigo, estado,
    activated_at: estado === "activo" ? new Date().toISOString() : null
  }, { onConflict: "transaction_id" });

  if (estado === "activo") {
    await sb.from("trainer").update({
      licencia_estado: "activo",
      licencia_codigo: codigo ?? transaction_id,
      licencia_pagada_en: new Date().toISOString()
    }).eq("id", trainer_id);
  }

  return new Response("ok", { status: 200 });
});
