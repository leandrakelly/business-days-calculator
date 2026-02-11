import { CalendarCheck2, ShieldCheck } from 'lucide-react';

import BusinessDaysCalculator from '@/components/BusinessDaysCalculator';
import { getNationalHolidays } from '@/services/holidayService';

export default async function Home() {
  const initialHolidays = await getNationalHolidays();

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="relative overflow-hidden bg-slate-900 px-4 pt-16 pb-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-blue-600/20 p-3 backdrop-blur-sm">
              <CalendarCheck2 className="h-10 w-10 text-blue-400" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Calculadora de Dias Úteis
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">
            Calcule prazos com precisão corporativa. Adicione feriados locais e
            obtenha a data final exata para seus contratos e processos.
          </p>
        </div>
      </header>

      <section className="relative z-20 mx-auto -mt-16 max-w-4xl px-4 pb-12">
        <BusinessDaysCalculator initialHolidays={initialHolidays} />
      </section>

      <article className="prose prose-slate lg:prose-lg mx-auto max-w-3xl px-4 pb-20">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="not-prose mb-4 flex items-center gap-3 text-2xl font-bold text-slate-800">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            Como nosso cálculo funciona?
          </h2>
          <p className="mb-4 text-slate-600">
            Nossa ferramenta foi desenvolvida para oferecer segurança jurídica e
            operacional. Utilizamos uma abordagem híbrida e transparente:
          </p>
          <ul className="list-disc space-y-3 pl-5 text-slate-600">
            <li>
              <strong className="text-slate-900">
                Integração Governamental:
              </strong>{' '}
              Conectamos em tempo real com bases de dados oficiais para obter o
              calendário de feriados nacionais.
            </li>
            <li>
              <strong className="text-slate-900">Flexibilidade Local:</strong>{' '}
              Sabemos que feriados municipais impactam prazos. Por isso,
              permitimos a inclusão manual de datas específicas da sua cidade.
            </li>
            <li>
              <strong className="text-slate-900">Algoritmo Verificado:</strong>{' '}
              O sistema ignora automaticamente finais de semana e feriados
              coincidentes, somando apenas os dias de efetivo trabalho.
            </li>
          </ul>
        </div>
      </article>

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h3 className="mb-8 text-center text-2xl font-bold text-slate-800">
            Perguntas Frequentes
          </h3>

          <div className="space-y-4">
            <details className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all open:ring-2 open:ring-blue-100">
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-slate-800">
                Como contar dias úteis no Excel?
                <span className="text-slate-400 transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="mt-3 border-t border-slate-200 pt-3 leading-relaxed text-slate-600">
                <p>
                  No Excel, você usa a fórmula{' '}
                  <code className="rounded bg-slate-200 px-1 py-0.5 font-mono text-sm text-slate-800">
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

            <details className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all open:ring-2 open:ring-blue-100">
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-slate-800">
                O sábado conta como dia útil?
                <span className="text-slate-400 transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="mt-3 border-t border-slate-200 pt-3 leading-relaxed text-slate-600">
                <p>
                  Depende do contexto. Para fins <strong>bancários</strong> e
                  prazos processuais (novo CPC), sábados geralmente{' '}
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
