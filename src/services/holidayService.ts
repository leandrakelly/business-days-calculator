import { Holiday } from "@/lib/calculator";

const CACHE_DURATION = 60 * 60 * 24; // 24 hours

export async function getNationalHolidays(): Promise<Holiday[]> {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  try {
    const [res1, res2] = await Promise.all([
      fetch(`https://brasilapi.com.br/api/feriados/v1/${currentYear}`, {
        next: { revalidate: CACHE_DURATION },
      }),
      fetch(`https://brasilapi.com.br/api/feriados/v1/${nextYear}`, {
        next: { revalidate: CACHE_DURATION },
      }),
    ]);

    if (!res1.ok || !res2.ok) throw new Error("Failed searching holidays");

    const data1 = await res1.json();
    const data2 = await res2.json();

    return [...data1, ...data2].map((h) => ({
      date: h.date,
      name: h.name,
      type: "Nacional",
    }));
  } catch (error) {
    console.error("Erro no HolidayService:", error);
    return [];
  }
}
