const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY as string;
const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL as string;
const FROM_EMAIL = "Glanzio Bilvård & Detailing <onboarding@glanziostockholm.se>";

interface BookingEmailData {
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  serviceArea: string;
  isPremium: boolean;
  carSize: string;
  price: number;
  comments?: string;
}

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

function buildCustomerHtml(d: BookingEmailData): string {
  return `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:Georgia,serif;color:#e5e0d4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border:1px solid #2a2a3a;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#c9a84c,#f5d98b,#c9a84c);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;font-size:26px;color:#0a0f1e;letter-spacing:0.1em;font-family:Georgia,serif;">GLANZIO</h1>
            <p style="margin:6px 0 0;font-size:11px;letter-spacing:0.3em;color:#0a0f1e;text-transform:uppercase;">Bil & Hemvård</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 8px;font-size:20px;color:#f5d98b;font-family:Georgia,serif;">Bokningsbekräftelse</h2>
            <p style="margin:0 0 32px;color:#9ca3af;font-size:14px;">Tack ${d.name}! Din bokning är mottagen och vi återkommer vid behov.</p>

            <!-- Details table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a2a3a;">
              ${row("Datum", d.date)}
              ${row("Tid", d.time)}
              ${row("Plats", d.address)}
              ${row("Tjänst", SERVICE_AREA_LABELS[d.serviceArea] ?? d.serviceArea)}
              ${row("Paket", d.isPremium ? "Premium" : "Standard")}
              ${row("Bilstorlek", CAR_SIZE_LABELS[d.carSize] ?? d.carSize)}
              ${d.comments ? row("Kommentarer", d.comments) : ""}
            </table>

            <!-- Price -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:2px;background:linear-gradient(135deg,#c9a84c22,#f5d98b11);border:1px solid #c9a84c44;">
              <tr>
                <td style="padding:16px 20px;font-size:14px;color:#9ca3af;">Totalt pris</td>
                <td style="padding:16px 20px;text-align:right;font-size:22px;font-weight:bold;color:#f5d98b;">${d.price} kr</td>
              </tr>
            </table>

            <p style="margin:32px 0 0;font-size:13px;color:#6b7280;line-height:1.6;">
              Har du frågor? Kontakta oss direkt via telefon eller svara på detta mail.<br>
              Vi ser fram emot att ta hand om din bil!
            </p>
          </td>
        </tr>
        <!-- Footer -->
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
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:12px 20px;font-size:13px;color:#9ca3af;border-bottom:1px solid #2a2a3a;width:40%;">${label}</td>
      <td style="padding:12px 20px;font-size:13px;color:#e5e0d4;border-bottom:1px solid #2a2a3a;">${value}</td>
    </tr>`;
}

function buildOwnerHtml(d: BookingEmailData): string {
  return `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#f9fafb;font-family:sans-serif;color:#111827;">
  <h2 style="margin:0 0 16px;font-size:18px;">🚗 Ny bokning — ${d.name}</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
    ${ownerRow("Namn", d.name)}
    ${ownerRow("Telefon", d.phone)}
    ${ownerRow("E-post", d.email)}
    ${ownerRow("Adress", d.address)}
    ${ownerRow("Datum", d.date)}
    ${ownerRow("Tid", d.time)}
    ${ownerRow("Tjänst", SERVICE_AREA_LABELS[d.serviceArea] ?? d.serviceArea)}
    ${ownerRow("Paket", d.isPremium ? "Premium" : "Standard")}
    ${ownerRow("Bilstorlek", CAR_SIZE_LABELS[d.carSize] ?? d.carSize)}
    ${ownerRow("Pris", `${d.price} kr`)}
    ${d.comments ? ownerRow("Kommentarer", d.comments) : ""}
  </table>
</body>
</html>`;
}

function ownerRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#6b7280;white-space:nowrap;">${label}</td>
    <td style="padding:6px 0;font-weight:500;">${value}</td>
  </tr>`;
}

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error ${res.status}: ${body}`);
  }
}

export async function sendBookingEmails(data: BookingEmailData): Promise<void> {
  const res = await fetch(
    "https://wwqqhnbrpgzvjavljwnk.supabase.co/functions/v1/send-booking-email",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Email error: ${body}`);
  }
}