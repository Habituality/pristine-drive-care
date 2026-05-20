import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const OWNER_EMAIL = Deno.env.get("OWNER_EMAIL")!;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, content-type",
      },
    });
  }

  const data = await req.json();

  const SERVICE_AREA_LABELS: Record<string, string> = {
    "ext-int": "Exteriör + Interiör",
    "exterior-only": "Endast exteriör",
    "interior-only": "Endast interiör",
  };

  const CAR_SIZE_LABELS: Record<string, string> = {
    small: "Liten",
    medium: "Medel",
    xl: "Stor/SUV",
  };

  const customerHtml = `<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:Georgia,serif;color:#e5e0d4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border:1px solid #2a2a3a;max-width:600px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#c9a84c,#f5d98b,#c9a84c);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;font-size:26px;color:#0a0f1e;letter-spacing:0.1em;">GLANZIO</h1>
            <p style="margin:6px 0 0;font-size:11px;letter-spacing:0.3em;color:#0a0f1e;text-transform:uppercase;">Bil & Hemvård</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 8px;font-size:20px;color:#f5d98b;">Bokningsbekräftelse</h2>
            <p style="margin:0 0 32px;color:#9ca3af;font-size:14px;">Tack ${data.name}! Din bokning är mottagen.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a2a3a;">
              <tr><td style="padding:12px 20px;font-size:13px;color:#9ca3af;border-bottom:1px solid #2a2a3a;width:40%;">Datum</td><td style="padding:12px 20px;font-size:13px;color:#e5e0d4;border-bottom:1px solid #2a2a3a;">${data.date}</td></tr>
              <tr><td style="padding:12px 20px;font-size:13px;color:#9ca3af;border-bottom:1px solid #2a2a3a;">Tid</td><td style="padding:12px 20px;font-size:13px;color:#e5e0d4;border-bottom:1px solid #2a2a3a;">${data.time}</td></tr>
              <tr><td style="padding:12px 20px;font-size:13px;color:#9ca3af;border-bottom:1px solid #2a2a3a;">Plats</td><td style="padding:12px 20px;font-size:13px;color:#e5e0d4;border-bottom:1px solid #2a2a3a;">${data.address}</td></tr>
              <tr><td style="padding:12px 20px;font-size:13px;color:#9ca3af;border-bottom:1px solid #2a2a3a;">Tjänst</td><td style="padding:12px 20px;font-size:13px;color:#e5e0d4;border-bottom:1px solid #2a2a3a;">${SERVICE_AREA_LABELS[data.serviceArea] ?? data.serviceArea}</td></tr>
              <tr><td style="padding:12px 20px;font-size:13px;color:#9ca3af;border-bottom:1px solid #2a2a3a;">Paket</td><td style="padding:12px 20px;font-size:13px;color:#e5e0d4;border-bottom:1px solid #2a2a3a;">${data.isPremium ? "Premium" : "Standard"}</td></tr>
              <tr><td style="padding:12px 20px;font-size:13px;color:#9ca3af;border-bottom:1px solid #2a2a3a;">Bilstorlek</td><td style="padding:12px 20px;font-size:13px;color:#e5e0d4;border-bottom:1px solid #2a2a3a;">${CAR_SIZE_LABELS[data.carSize] ?? data.carSize}</td></tr>
              ${data.comments ? `<tr><td style="padding:12px 20px;font-size:13px;color:#9ca3af;border-bottom:1px solid #2a2a3a;">Kommentarer</td><td style="padding:12px 20px;font-size:13px;color:#e5e0d4;border-bottom:1px solid #2a2a3a;">${data.comments}</td></tr>` : ""}
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:2px;background:linear-gradient(135deg,#c9a84c22,#f5d98b11);border:1px solid #c9a84c44;">
              <tr>
                <td style="padding:16px 20px;font-size:14px;color:#9ca3af;">Totalt pris</td>
                <td style="padding:16px 20px;text-align:right;font-size:22px;font-weight:bold;color:#f5d98b;">${data.price} kr</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #2a2a3a;text-align:center;">
            <p style="margin:0;font-size:11px;color:#4b5563;letter-spacing:0.15em;text-transform:uppercase;">Glanzio Bil & Hemvård</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const ownerHtml = `<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#f9fafb;font-family:sans-serif;color:#111827;">
  <h2 style="margin:0 0 16px;">🚗 Ny bokning — ${data.name}</h2>
  <table cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse;">
    <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Namn</td><td style="padding:6px 0;font-weight:500;">${data.name}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Telefon</td><td style="padding:6px 0;font-weight:500;">${data.phone}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">E-post</td><td style="padding:6px 0;font-weight:500;">${data.email}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Adress</td><td style="padding:6px 0;font-weight:500;">${data.address}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Datum</td><td style="padding:6px 0;font-weight:500;">${data.date}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Tid</td><td style="padding:6px 0;font-weight:500;">${data.time}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Tjänst</td><td style="padding:6px 0;font-weight:500;">${SERVICE_AREA_LABELS[data.serviceArea] ?? data.serviceArea}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Paket</td><td style="padding:6px 0;font-weight:500;">${data.isPremium ? "Premium" : "Standard"}</td></tr>
    <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Bilstorlek</td><td style="padding:6px 0;font-weight:500;">${CAR_SIZE_LABELS[data.carSize] ?? data.carSize}</td></tr>
    <tr><td style="padding:6px 16px 6kg 0;color:#6b7280;">Pris</td><td style="padding:6px 0;font-weight:500;">${data.price} kr</td></tr>
    ${data.comments ? `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Kommentarer</td><td style="padding:6px 0;font-weight:500;">${data.comments}</td></tr>` : ""}
  </table>
</body>
</html>`;

  await Promise.all([
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Glanzio Bil & Hemvård <onboarding@resend.dev>",
        to: data.email,
        subject: "Bokningsbekräftelse — Glanzio Bil & Hemvård",
        html: customerHtml,
      }),
    }),
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Glanzio Bil & Hemvård <onboarding@resend.dev>",
        to: OWNER_EMAIL,
        subject: `Ny bokning: ${data.name} — ${data.date} ${data.time}`,
        html: ownerHtml,
      }),
    }),
  ]);

  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
});