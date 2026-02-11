"use client";

import { useState } from "react";
import { Holiday } from "@/lib/calculator";
import { useBusinessDays } from "@/hooks/useBusinessDays";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  PlusCircle,
  Trash2,
  CalendarDays,
  Calculator,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Settings2,
} from "lucide-react";

interface CalculatorProps {
  initialHolidays: Holiday[];
}

const BRAZIL_STATES = [
  { value: "", label: "Nenhum (Apenas Nacionais)" },
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export default function BusinessDaysCalculator({
  initialHolidays,
}: CalculatorProps) {
  const { formData, customHolidays, stateHolidays, result, actions } =
    useBusinessDays({
      initialHolidays,
    });

  const [newHol, setNewHol] = useState({ date: "", name: "" });
  const [isManualOpen, setIsManualOpen] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    actions.addCustomHoliday(newHol.date, newHol.name);
    setNewHol({ date: "", name: "" });
  };

  return (
    <section
      aria-labelledby="calculator-title"
      className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
    >
      <h2 id="calculator-title" className="sr-only">
        Formulário de Cálculo
      </h2>

      <div
        role="status"
        className="p-2 text-xs text-center font-medium bg-green-50 text-green-700 flex justify-center items-center gap-2"
      >
        <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
        <span>Base de dados: {initialHolidays.length} feriados nacionais.</span>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            actions.calculate();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
              >
                <CalendarDays
                  className="w-4 h-4 text-blue-600"
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
                  actions.handleInputChange("startDate", e.target.value)
                }
                className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 font-medium shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="days-to-add"
                className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
              >
                <Calculator
                  className="w-4 h-4 text-blue-600"
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
                  actions.handleInputChange("daysToAdd", Number(e.target.value))
                }
                className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 font-medium shadow-sm"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-slate-500" /> Configurações
              Avançadas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seletor de Estado */}
              <div>
                <label
                  htmlFor="state-select"
                  className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide"
                >
                  Feriados Estaduais
                </label>
                <div className="relative">
                  <select
                    id="state-select"
                    value={formData.selectedState}
                    onChange={(e) =>
                      actions.handleInputChange("selectedState", e.target.value)
                    }
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  >
                    {BRAZIL_STATES.map((uf) => (
                      <option key={uf.value} value={uf.value}>
                        {uf.label}
                      </option>
                    ))}
                  </select>
                  <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {stateHolidays.length > 0 && (
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1 animate-in fade-in">
                    <CheckCircle2 className="w-3 h-3" />
                    {stateHolidays.length} feriados estaduais aplicados.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 justify-center">
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors border border-transparent hover:border-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.includeSaturdays}
                    onChange={(e) =>
                      actions.handleInputChange(
                        "includeSaturdays",
                        e.target.checked,
                      )
                    }
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 accent-blue-600"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Considerar <strong>Sábados</strong> como dia útil
                  </span>
                </label>

                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors border border-transparent hover:border-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.includeSundays}
                    onChange={(e) =>
                      actions.handleInputChange(
                        "includeSundays",
                        e.target.checked,
                      )
                    }
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 accent-blue-600"
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
              className="text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md px-2 py-1 -ml-2"
            >
              <PlusCircle className="w-4 h-4" aria-hidden="true" />
              {isManualOpen
                ? "Ocultar opção de feriado municipal"
                : "Adicionar Feriado Municipal Manualmente"}
            </button>

            {isManualOpen && (
              <div
                id="manual-holiday-form"
                className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 animate-in slide-in-from-top-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="hol-date"
                      className="text-xs font-medium text-slate-500 mb-1 block"
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
                      className="w-full p-2 border rounded-md text-slate-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="hol-name"
                      className="text-xs font-medium text-slate-500 mb-1 block"
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
                      className="w-full p-2 border rounded-md text-slate-900"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleAddSubmit}
                      className="w-full p-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 transition-colors flex justify-center items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" /> Incluir
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                      <span>
                        {format(parseISO(h.date), "dd/MM", { locale: ptBR })}:{" "}
                        {h.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => actions.removeCustomHoliday(h.date)}
                        className="hover:text-red-600 focus:text-red-600 focus:outline-none"
                        aria-label={`Remover feriado ${h.name}`}
                      >
                        <Trash2 className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white text-lg font-bold py-4 rounded-lg shadow-lg transition-all active:scale-[0.99]"
          >
            Calcular Data Final
          </button>
        </form>

        <div aria-live="polite" aria-atomic="true">
          {result && (
            <div className="mt-4 p-6 bg-slate-800 rounded-xl text-white shadow-lg relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              <div className="relative z-10">
                <p className="text-sm text-blue-200 uppercase tracking-wider font-semibold mb-1">
                  Prazo Final Calculado
                </p>
                <time
                  dateTime={result.endDate.toISOString()}
                  className="text-4xl font-extrabold text-white mb-2 block"
                >
                  {format(result.endDate, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </time>
                <p className="text-lg text-blue-100 font-medium capitalize flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" aria-hidden="true" />
                  {format(result.endDate, "EEEE", { locale: ptBR })}
                </p>

                {result.skippedDays.length > 0 && (
                  <div className="mt-6 border-t border-slate-700 pt-4">
                    <p className="text-xs font-bold text-blue-200 mb-3 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" aria-hidden="true" />
                      DIAS NÃO ÚTEIS NO PERÍODO ({result.skippedDays.length})
                    </p>
                    <ul className="max-h-40 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                      {result.skippedDays.map((day, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between text-sm bg-slate-700/50 p-2 rounded-md border border-slate-600"
                        >
                          <span className="text-slate-200 font-medium">
                            {format(day.date, "dd/MM", { locale: ptBR })}{" "}
                            <span className="opacity-70">
                              ({format(day.date, "EEE", { locale: ptBR })})
                            </span>
                          </span>
                          <span className="text-red-300 text-xs font-semibold px-2 py-0.5 bg-red-900/30 rounded-full text-right ml-2 break-words">
                            {day.reason}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div
                className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"
                aria-hidden="true"
              >
                <CalendarDays className="w-32 h-32" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
