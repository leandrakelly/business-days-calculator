import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Calculadora de Dias Úteis 2026 | Com Feriados Nacionais e Municipais",
    template: "%s | Calculadora de Dias Úteis",
  },
  description:
    "Calcule prazos processuais e datas de entrega exatas. Ferramenta gratuita que considera feriados nacionais (BrasilAPI) e permite adicionar feriados municipais.",
  keywords: [
    "calcular dias úteis",
    "calculadora prazos",
    "dias úteis excel",
    "contagem de prazo",
    "feriados 2026",
  ],
  verification: {
    google: "-RInPCvwWMYGWmj3lxRiuf52K3ML81O1tZbh4r6jqpE",
  },
  authors: [{ name: "Seu Nome ou Nome do Projeto" }],
  openGraph: {
    title: "Calculadora de Dias Úteis - Rápida e Gratuita",
    description:
      "Precisa calcular um prazo? Some dias úteis ignorando feriados nacionais e municipais automaticamente.",
    url: "https://business-days-calculator.vercel.app",
    siteName: "Calculadora Dias Úteis",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://business-days-calculator.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
