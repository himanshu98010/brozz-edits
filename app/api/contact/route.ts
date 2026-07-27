import { NextResponse } from "next/server";

export const runtime = "nodejs";

const clean = (value: FormDataEntryValue | null) => String(value ?? "").trim();
const html = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);

export async function POST(request: Request) {
  const form = await request.formData();
  const fields = Object.fromEntries(["name", "email", "company", "service", "budget", "message"].map((key) => [key, clean(form.get(key))]));
  if (!fields.name || !/^\S+@\S+\.\S+$/.test(fields.email) || !fields.service || !fields.message) return NextResponse.json({ message: "Please complete your name, email, service and project details." }, { status: 400 });
  if (!process.env.RESEND_API_KEY || !process.env.BROZZ_EMAIL_FROM || !process.env.BROZZ_EMAIL_TO) return NextResponse.json({ message: "Email delivery is not configured yet. Please email vaibhavsaxena1818@gmail.com directly." }, { status: 503 });
  const rows = Object.entries(fields).map(([label, value]) => `<tr><td style="padding:8px 16px 8px 0;color:#777;text-transform:uppercase;font-size:11px;letter-spacing:.08em">${html(label)}</td><td style="padding:8px 0;color:#111">${html(value || "—").replace(/\n/g, "<br>")}</td></tr>`).join("");
  const delivery = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.BROZZ_EMAIL_FROM, to: [process.env.BROZZ_EMAIL_TO], reply_to: fields.email, subject: `New Brozz Edits inquiry — ${fields.name}`, html: `<div style="font-family:Inter,Arial,sans-serif;padding:24px"><h1 style="margin:0 0 18px">New project inquiry</h1><table>${rows}</table></div>` }) });
  if (!delivery.ok) return NextResponse.json({ message: "We couldn’t send that just now. Please try again or email us directly." }, { status: 502 });
  return NextResponse.json({ message: "Message received. We’ll be in touch shortly." });
}
