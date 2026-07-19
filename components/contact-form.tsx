"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const response = await fetch("/api/contact", { method: "POST", body: new FormData(event.currentTarget) });
    const data = await response.json().catch(() => ({ message: "Something went wrong. Please email us directly." }));
    if (response.ok) { setStatus("sent"); setMessage(data.message); event.currentTarget.reset(); }
    else { setStatus("error"); setMessage(data.message); }
  }

  return <form className="inquiry-card" onSubmit={submit}>
    <div className="inquiry-heading"><span className="eyebrow">Project inquiry / 01</span><h3>Drop us<br/><em>a message.</em></h3><p>Tell us what you&apos;re making. We&apos;ll reply within two working days.</p></div>
    <div className="inquiry-fields">
      <label>Your name<input required name="name" autoComplete="name" placeholder="Alex Morgan" /></label>
      <label>Email address<input required name="email" type="email" autoComplete="email" placeholder="alex@company.com" /></label>
      <label>Company or brand<input name="company" autoComplete="organization" placeholder="Studio / company name" /></label>
      <label>What do you need?<select required name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Video editing</option><option>Motion graphics</option><option>Commercial editing</option><option>Podcast editing</option><option>Short-form content</option><option>Something else</option></select></label>
      <label>Estimated budget<select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>Under $1,000</option><option>$1,000 — $3,000</option><option>$3,000 — $7,500</option><option>$7,500+</option><option>Let&apos;s discuss</option></select></label>
      <label className="inquiry-message">Tell us about the project<textarea required name="message" rows={4} placeholder="What are we making together? Include scope, timing and any references." /></label>
      <button className="inquiry-submit" disabled={status === "sending" || status === "sent"}>{status === "sent" ? <><Check size={16}/> Message received</> : status === "sending" ? "Sending…" : <>Send inquiry <ArrowUpRight size={16}/></>}</button>
      {message && <p className={`form-status ${status}`} role="status">{message}</p>}
    </div>
  </form>;
}
