import BusinessDaysCalculator from "@/components/BusinessDaysCalculator";
import { getNationalHolidays } from "@/services/holidayService";
import { CalendarCheck2, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Dias Úteis 2026 | Com Feriados Nacionais e Municipais",
  description:
    "Calcule prazos processuais e datas de entrega exatas. Ferramenta gratuita que considera feriados nacionais (BrasilAPI) e permite adicionar feriados municipais.",
  keywords: [
    "calcular dias úteis",
    "calculadora prazos",
    "dias úteis excel",
    "contagem de prazo",
    "feriados 2026",
  ],
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
  verification: {
    google: "-RInPCvwWMYGWmj3lxRiuf52K3ML81O1tZbh4r6jqpE",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://business-days-calculator.vercel.app",
  },
};

export default async function Home() {
  const initialHolidays = await getNationalHolidays();

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600/20 rounded-full backdrop-blur-sm">
              <CalendarCheck2 className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Calculadora de Dias Úteis
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Calcule prazos com precisão corporativa. Adicione feriados locais e
            obtenha a data final exata para seus contratos e processos.
          </p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 -mt-8 relative z-20 pb-20">
        <BusinessDaysCalculator initialHolidays={initialHolidays} />

        <article className="mt-16 max-w-3xl mx-auto prose prose-slate lg:prose-lg bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="flex items-center gap-2 text-slate-800">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            Como nosso cálculo funciona?
          </h2>
          <p className="text-slate-600">
            Nossa ferramenta foi desenvolvida para oferecer segurança jurídica e
            operacional. Utilizamos uma abordagem híbrida:
          </p>
          <ul className="text-slate-600 space-y-2">
            <li>
              <strong>Integração Governamental:</strong> Conectamos em tempo
              real com a BrasilAPI para obter o calendário oficial de feriados
              nacionais fixos e móveis.
            </li>
            <li>
              <strong>Flexibilidade Local:</strong> Sabemos que feriados
              municipais impactam prazos. Por isso, permitimos a inclusão manual
              de datas específicas da sua localidade.
            </li>
            <li>
              <strong>Lógica Precisa:</strong> O algoritmo ignora
              automaticamente finais de semana e as datas de feriado
              identificadas, somando apenas os dias de efetivo trabalho.
            </li>
          </ul>
        </article>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Perguntas Frequentes
        </h3>

        <div className="space-y-4">
          <details className="group bg-white p-4 rounded-lg border border-slate-200 open:ring-2 open:ring-blue-100">
            <summary className="font-semibold text-slate-700 cursor-pointer list-none flex justify-between items-center">
              Como contar dias úteis no Excel?
              <span className="group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="mt-2 text-slate-600">
              No Excel, você usa a fórmula{" "}
              <code>=DIATRABALHO(data_inicial; dias; [feriados])</code>. Porém,
              nossa calculadora online facilita isso pois já traz os feriados
              nacionais atualizados automaticamente, sem você precisar criar
              listas manuais.
            </p>
          </details>

          <details className="group bg-white p-4 rounded-lg border border-slate-200 open:ring-2 open:ring-blue-100">
            <summary className="font-semibold text-slate-700 cursor-pointer list-none flex justify-between items-center">
              O sábado conta como dia útil?
              <span className="group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="mt-2 text-slate-600">
              Para fins bancários e de prazos processuais (novo CPC), sábados
              geralmente <strong>não</strong> contam como dias úteis. Nossa
              calculadora pula sábados e domingos por padrão, mas você pode
              ajustar isso se necessário.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
