export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Dias Úteis",
    url: "https://business-days-calculator.vercel.app",
    description:
      "Ferramenta para calcular datas finais somando dias úteis e ignorando feriados.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    featureList:
      "Cálculo de dias úteis, Feriados Nacionais, Feriados Municipais",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
