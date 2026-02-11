export interface StateHoliday {
  date: string;
  name: string;
}

export const STATE_HOLIDAYS: Record<string, StateHoliday[]> = {
  AC: [
    { date: "01-23", name: "Dia do Evangélico" },
    { date: "06-15", name: "Aniversário do Estado" },
    { date: "09-05", name: "Dia da Amazônia" },
  ],
  AL: [
    { date: "06-24", name: "São João" },
    { date: "09-16", name: "Emancipação Política" },
    { date: "11-20", name: "Consciência Negra" },
  ],
  AP: [
    { date: "03-19", name: "Dia de São José" },
    { date: "09-13", name: "Criação do Território" },
  ],
  AM: [
    { date: "09-05", name: "Elevação do Amazonas" },
    { date: "11-20", name: "Consciência Negra" },
    { date: "12-08", name: "N. S. da Conceição" },
  ],
  BA: [{ date: "07-02", name: "Independência da Bahia" }],
  CE: [
    { date: "03-19", name: "Dia de São José" },
    { date: "03-25", name: "Data Magna do Ceará" },
  ],
  DF: [
    { date: "04-21", name: "Fundação de Brasília" },
    { date: "11-30", name: "Dia do Evangélico" },
  ],
  ES: [],
  GO: [],
  MA: [{ date: "07-28", name: "Adesão do Maranhão" }],
  MT: [{ date: "11-20", name: "Consciência Negra" }],
  MS: [{ date: "10-11", name: "Criação do Estado" }],
  MG: [{ date: "04-21", name: "Data Magna de MG" }],
  PA: [{ date: "08-15", name: "Adesão do Grão-Pará" }],
  PB: [{ date: "08-05", name: "Fundação do Estado" }],
  PR: [{ date: "12-19", name: "Emancipação Política" }],
  PE: [
    { date: "03-06", name: "Data Magna de Pernambuco" },
    { date: "06-24", name: "São João" },
  ],
  PI: [{ date: "10-19", name: "Dia do Piauí" }],
  RJ: [
    { date: "04-23", name: "Dia de São Jorge" },
    { date: "11-20", name: "Consciência Negra" },
  ],
  RN: [{ date: "10-03", name: "Mártires de Cunhaú e Uruaçu" }],
  RS: [{ date: "09-20", name: "Revolução Farroupilha" }],
  RO: [
    { date: "01-04", name: "Criação do Estado" },
    { date: "06-18", name: "Dia do Evangélico" },
  ],
  RR: [{ date: "10-05", name: "Criação de Roraima" }],
  SC: [
    { date: "08-11", name: "Criação da Capitania" },
    { date: "11-25", name: "Santa Catarina de Alexandria" },
  ],
  SP: [
    { date: "07-09", name: "Revolução Constitucionalista" },
    { date: "11-20", name: "Consciência Negra" },
  ],
  SE: [{ date: "07-08", name: "Emancipação Política" }],
  TO: [
    { date: "09-08", name: "N. S. da Natividade" },
    { date: "10-05", name: "Criação do Tocantins" },
  ],
};
