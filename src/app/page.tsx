import BusinessDaysCalculator from "@/components/BusinessDaysCalculator";
import { getNationalHolidays } from "@/services/holidayService";
import { CalendarCheck2, ShieldCheck } from "lucide-react";

export default async function Home() {
  const initialHolidays = await getNationalHolidays();

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 text-white pt-16 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:16px_16px]"></div>
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

      <section className="max-w-4xl mx-auto px-4 -mt-16 relative z-20 pb-12">
        <BusinessDaysCalculator initialHolidays={initialHolidays} />
      </section>

      <article className="max-w-3xl mx-auto px-4 pb-20 prose prose-slate lg:prose-lg">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="flex items-center gap-3 text-slate-800 text-2xl font-bold mb-4 not-prose">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            Como nosso cálculo funciona?
          </h2>
          <p className="text-slate-600 mb-4">
            Nossa ferramenta foi desenvolvida para oferecer segurança jurídica e
            operacional. Utilizamos uma abordagem híbrida e transparente:
          </p>
          <ul className="space-y-3 text-slate-600 list-disc pl-5">
            <li>
              <strong className="text-slate-900">
                Integração Governamental:
              </strong>{" "}
              Conectamos em tempo real com bases de dados oficiais para obter o
              calendário de feriados nacionais.
            </li>
            <li>
              <strong className="text-slate-900">Flexibilidade Local:</strong>{" "}
              Sabemos que feriados municipais impactam prazos. Por isso,
              permitimos a inclusão manual de datas específicas da sua cidade.
            </li>
            <li>
              <strong className="text-slate-900">Algoritmo Verificado:</strong>{" "}
              O sistema ignora automaticamente finais de semana e feriados
              coincidentes, somando apenas os dias de efetivo trabalho.
            </li>
          </ul>
        </div>
      </article>

      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            Perguntas Frequentes
          </h3>

          <div className="space-y-4">
            <details className="group bg-slate-50 p-5 rounded-xl border border-slate-200 open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center text-lg">
                Como contar dias úteis no Excel?
                <span className="group-open:rotate-180 transition-transform text-slate-400">
                  ▼
                </span>
              </summary>
              <div className="mt-3 text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
                <p>
                  No Excel, você usa a fórmula{" "}
                  <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono text-sm">
                    =DIATRABALHO(data_inicial; dias; [feriados])
                  </code>
                  .
                </p>
                <p className="mt-2">
                  Porém, nossa calculadora online facilita isso pois já traz os
                  feriados nacionais atualizados automaticamente, sem você
                  precisar criar listas manuais de datas para excluir.
                </p>
              </div>
            </details>

            <details className="group bg-slate-50 p-5 rounded-xl border border-slate-200 open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center text-lg">
                O sábado conta como dia útil?
                <span className="group-open:rotate-180 transition-transform text-slate-400">
                  ▼
                </span>
              </summary>
              <div className="mt-3 text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
                <p>
                  Depende do contexto. Para fins <strong>bancários</strong> e
                  prazos processuais (novo CPC), sábados geralmente{" "}
                  <strong>não</strong> contam como dias úteis.
                </p>
                <p className="mt-2">
                  Nossa calculadora segue esse padrão (pula sábados e domingos),
                  mas você pode marcar a opção &quot;Incluir Sábados&quot; nas
                  configurações avançadas se o seu prazo for corrido ou de
                  comércio.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
