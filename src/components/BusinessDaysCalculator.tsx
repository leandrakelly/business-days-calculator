'use client';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  AlertCircle,
  Calculator,
  CalendarDays,
  CheckCircle2,
  MapPin,
  PlusCircle,
  Settings2,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';

import { useBusinessDays } from '@/hooks/useBusinessDays';
import { Holiday } from '@/lib/calculator';

interface CalculatorProps {
  initialHolidays: Holiday[];
}

const BRAZIL_STATES = [
  { value: '', label: 'Nenhum (Apenas Nacionais)' },
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export default function BusinessDaysCalculator({
  initialHolidays,
}: CalculatorProps) {
  const { formData, customHolidays, stateHolidays, result, actions } =
    useBusinessDays({
      initialHolidays,
    });

  const [newHol, setNewHol] = useState({ date: '', name: '' });
  const [isManualOpen, setIsManualOpen] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    actions.addCustomHoliday(newHol.date, newHol.name);
    setNewHol({ date: '', name: '' });
  };

  return (
    <section
      aria-labelledby="calculator-title"
      className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl"
    >
      <h2 id="calculator-title" className="sr-only">
        Formulário de Cálculo
      </h2>

      <div
        role="status"
        className="flex items-center justify-center gap-2 bg-green-50 p-2 text-center text-xs font-medium text-green-700"
      >
        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
        <span>Base de dados: {initialHolidays.length} feriados nacionais.</span>
      </div>

      <div className="space-y-8 p-6 md:p-8">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            actions.calculate();
          }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="start-date"
                className="mb-2 block flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <CalendarDays
                  className="h-4 w-4 text-blue-600"
                  aria-hidden="true"
                />
                Data Inicial
              </label>
              <input
                id="start-date"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) =>
                  actions.handleInputChange('startDate', e.target.value)
                }
                className="w-full rounded-lg border border-slate-200 bg-white p-3 font-medium text-slate-900 shadow-sm transition-all outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="days-to-add"
                className="mb-2 block flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <Calculator
                  className="h-4 w-4 text-blue-600"
                  aria-hidden="true"
                />
                Dias Úteis a Somar
              </label>
              <input
                id="days-to-add"
                type="number"
                min="1"
                required
                value={formData.daysToAdd}
                onChange={(e) =>
                  actions.handleInputChange('daysToAdd', Number(e.target.value))
                }
                className="w-full rounded-lg border border-slate-200 bg-white p-3 font-medium text-slate-900 shadow-sm transition-all outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-700">
              <Settings2 className="h-4 w-4 text-slate-500" /> Configurações
              Avançadas
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Seletor de Estado */}
              <div>
                <label
                  htmlFor="state-select"
                  className="mb-2 block text-xs font-semibold tracking-wide text-slate-500 uppercase"
                >
                  Feriados Estaduais
                </label>
                <div className="relative">
                  <select
                    id="state-select"
                    value={formData.selectedState}
                    onChange={(e) =>
                      actions.handleInputChange('selectedState', e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-slate-300 bg-white p-2.5 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {BRAZIL_STATES.map((uf) => (
                      <option key={uf.value} value={uf.value}>
                        {uf.label}
                      </option>
                    ))}
                  </select>
                  <MapPin className="pointer-events-none absolute top-3 right-3 h-4 w-4 text-slate-400" />
                </div>
                {stateHolidays.length > 0 && (
                  <p className="animate-in fade-in mt-2 flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle2 className="h-3 w-3" />
                    {stateHolidays.length} feriados estaduais aplicados.
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-center gap-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-slate-200 hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={formData.includeSaturdays}
                    onChange={(e) =>
                      actions.handleInputChange(
                        'includeSaturdays',
                        e.target.checked,
                      )
                    }
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 accent-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Considerar <strong>Sábados</strong> como dia útil
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-slate-200 hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={formData.includeSundays}
                    onChange={(e) =>
                      actions.handleInputChange(
                        'includeSundays',
                        e.target.checked,
                      )
                    }
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 accent-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Considerar <strong>Domingos</strong> como dia útil
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <button
              type="button"
              aria-expanded={isManualOpen}
              aria-controls="manual-holiday-form"
              onClick={() => setIsManualOpen(!isManualOpen)}
              className="-ml-2 flex items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              {isManualOpen
                ? 'Ocultar opção de feriado municipal'
                : 'Adicionar Feriado Municipal Manualmente'}
            </button>

            {isManualOpen && (
              <div
                id="manual-holiday-form"
                className="animate-in slide-in-from-top-2 mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-5">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="hol-date"
                      className="mb-1 block text-xs font-medium text-slate-500"
                    >
                      Data
                    </label>
                    <input
                      id="hol-date"
                      type="date"
                      required
                      value={newHol.date}
                      onChange={(e) =>
                        setNewHol((prev) => ({ ...prev, date: e.target.value }))
                      }
                      className="w-full rounded-md border p-2 text-slate-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="hol-name"
                      className="mb-1 block text-xs font-medium text-slate-500"
                    >
                      Nome do Feriado
                    </label>
                    <input
                      id="hol-name"
                      type="text"
                      required
                      placeholder="Ex: Aniversário da Cidade"
                      value={newHol.name}
                      onChange={(e) =>
                        setNewHol((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full rounded-md border p-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleAddSubmit}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 p-2 text-white transition-colors hover:bg-slate-900"
                    >
                      <PlusCircle className="h-4 w-4" /> Incluir
                    </button>
                  </div>
                </div>
              </div>
            )}

            {customHolidays.length > 0 && (
              <ul
                className="mt-4 flex flex-wrap gap-2"
                aria-label="Feriados municipais adicionados"
              >
                {customHolidays.map((h) => (
                  <li key={h.date}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      <span>
                        {format(parseISO(h.date), 'dd/MM', { locale: ptBR })}:{' '}
                        {h.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => actions.removeCustomHoliday(h.date)}
                        className="hover:text-red-600 focus:text-red-600 focus:outline-none"
                        aria-label={`Remover feriado ${h.name}`}
                      >
                        <Trash2 className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 active:scale-[0.99]"
          >
            Calcular Data Final
          </button>
        </form>

        <div aria-live="polite" aria-atomic="true">
          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 relative mt-4 overflow-hidden rounded-xl bg-slate-800 p-6 text-white shadow-lg">
              <div className="relative z-10">
                <p className="mb-1 text-sm font-semibold tracking-wider text-blue-200 uppercase">
                  Prazo Final Calculado
                </p>
                <time
                  dateTime={result.endDate.toISOString()}
                  className="mb-2 block text-4xl font-extrabold text-white"
                >
                  {format(result.endDate, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </time>
                <p className="flex items-center gap-2 text-lg font-medium text-blue-100 capitalize">
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  {format(result.endDate, 'EEEE', { locale: ptBR })}
                </p>

                {result.skippedDays.length > 0 && (
                  <div className="mt-6 border-t border-slate-700 pt-4">
                    <p className="mb-3 flex items-center gap-1 text-xs font-bold text-blue-200">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      DIAS NÃO ÚTEIS NO PERÍODO ({result.skippedDays.length})
                    </p>
                    <ul className="custom-scrollbar max-h-40 space-y-2 overflow-y-auto pr-2">
                      {result.skippedDays.map((day, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between rounded-md border border-slate-600 bg-slate-700/50 p-2 text-sm"
                        >
                          <span className="font-medium text-slate-200">
                            {format(day.date, 'dd/MM', { locale: ptBR })}{' '}
                            <span className="opacity-70">
                              ({format(day.date, 'EEE', { locale: ptBR })})
                            </span>
                          </span>
                          <span className="ml-2 rounded-full bg-red-900/30 px-2 py-0.5 text-right text-xs font-semibold break-words text-red-300">
                            {day.reason}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div
                className="pointer-events-none absolute top-0 right-0 p-4 opacity-10"
                aria-hidden="true"
              >
                <CalendarDays className="h-32 w-32" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
