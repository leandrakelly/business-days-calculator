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
} from "lucide-react";

interface CalculatorProps {
  initialHolidays: Holiday[];
}

export default function BusinessDaysCalculator({
  initialHolidays,
}: CalculatorProps) {
  const { formData, customHolidays, result, actions } = useBusinessDays({
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
        <span>Calendário nacional sincronizado com sucesso.</span>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            actions.calculate();
          }}
        >
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
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </form>

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
              ? "Ocultar opção de feriado local"
              : "Adicionar Feriado Municipal/Local"}
          </button>

          {isManualOpen && (
            <form
              id="manual-holiday-form"
              onSubmit={handleAddSubmit}
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
                    className="w-full p-2 border rounded-md"
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
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full p-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 transition-colors flex justify-center items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" /> Incluir
                  </button>
                </div>
              </div>
            </form>
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
          onClick={actions.calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white text-lg font-bold py-4 rounded-lg shadow-lg transition-all active:scale-[0.99]"
        >
          Calcular Data Final
        </button>

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
                          <span className="text-red-300 text-xs font-semibold px-2 py-0.5 bg-red-900/30 rounded-full">
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
