import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brozz Edits — We Edit Attention",
  description: "A creative post-production studio for content people actually watch.",
  metadataBase: new URL("https://brozzedits.com"),
  openGraph: { title: "Brozz Edits", description: "We don't just edit videos. We edit attention.", type: "website" },
  twitter: { card: "summary_large_image", title: "Brozz Edits", description: "We edit attention." }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
