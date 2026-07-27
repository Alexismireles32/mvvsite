"use client";

import React, { useRef } from "react";
import { ProductSimple } from "./product-simple";
import { ProductCarousel } from "./product-carousel";
import { WhatsAppFloat } from "./whatsapp-float";
import { WhatsAppContext } from "./home-wrapper";

// Catálogo de guías. Títulos y descripciones tomados del frontmatter real
// de cada página en src/pages/recursos/ — no inventar textos aquí.
const GUIDES = {
  "quemar-grasa-abdominal": {
    url: "/recursos/guias/quemar-grasa-abdominal/",
    title: "Cómo Quemar Grasa Abdominal: La Guía Completa",
    description: "Guía completa para eliminar grasa del vientre. Plan de dieta, ejercicios específicos y suplementos naturales que queman grasa abdominal efectivamente.",
    cta: "Ver la guía para quemar grasa abdominal",
    icon: "🎯",
  },
  "dieta-grasa-abdominal": {
    url: "/recursos/guias/dieta-grasa-abdominal/",
    title: "Dieta para Eliminar Grasa Abdominal: Plan de 30 Días",
    description: "Plan de alimentación específico para quemar grasa de la barriga. 30 días de menús, alimentos que funcionan y qué evitar. Guía práctica.",
    cta: "Ver el plan de dieta de 30 días",
    icon: "🥗",
  },
  "grasa-visceral-vs-subcutanea": {
    url: "/recursos/guias/grasa-visceral-vs-subcutanea/",
    title: "Grasa Visceral vs Subcutánea: ¿Cuál Es Más Peligrosa?",
    description: "Diferencias entre grasa visceral y subcutánea. Por qué la visceral es más peligrosa y cómo eliminarla. Guía con soluciones naturales.",
    cta: "Ver la diferencia entre grasa visceral y subcutánea",
    icon: "🔬",
  },
  "hambre-emocional": {
    url: "/recursos/guias/hambre-emocional/",
    title: "Hambre Emocional: Cómo Identificarla y Superarla",
    description: "Aprende a diferenciar hambre física de hambre emocional. Técnicas psicológicas y suplementos para controlar comer por emociones.",
    cta: "Ver cómo superar el hambre emocional",
    icon: "🧠",
  },
  "ansiedad-por-comer": {
    url: "/recursos/guias/ansiedad-por-comer/",
    title: "Ansiedad por Comer: Cómo Controlarla de Forma Natural",
    description: "Guía completa para controlar ansiedad por comer. Causas emocionales, físicas y técnicas probadas para eliminar comer compulsivo.",
    cta: "Ver cómo controlar la ansiedad por comer",
    icon: "😰",
  },
  "controlar-apetito": {
    url: "/recursos/guias/controlar-apetito/",
    title: "Cómo Controlar el Apetito Naturalmente (Sin Pasar Hambre)",
    description: "10 estrategias comprobadas para controlar el apetito sin pasar hambre. Incluye dieta, suplementos naturales, técnicas mentales y productos que suprimen el hambre efectivamente.",
    cta: "Ver las 10 estrategias para controlar el apetito",
    icon: "🍽️",
  },
  "alimentos-saciantes": {
    url: "/recursos/guias/alimentos-saciantes/",
    title: "15 Alimentos Más Saciantes (Eliminan Hambre Naturalmente)",
    description: "Lista de alimentos que mantienen saciedad durante horas. Proteínas, fibra y grasas buenas que reducen apetito sin calorías excesivas.",
    cta: "Ver los 15 alimentos más saciantes",
    icon: "🥑",
  },
  "acelerar-metabolismo": {
    url: "/recursos/guias/acelerar-metabolismo/",
    title: "10 Formas Naturales de Acelerar tu Metabolismo",
    description: "Cómo acelerar tu metabolismo naturalmente para quemar más calorías. Incluye dieta, ejercicio, suplementos y hábitos comprobados por la ciencia.",
    cta: "Ver las 10 formas de acelerar el metabolismo",
    icon: "⚡",
  },
  "metabolismo-lento-causas": {
    url: "/recursos/guias/metabolismo-lento-causas/",
    title: "Metabolismo Lento: Causas y Soluciones Naturales",
    description: "Descubre por qué tienes metabolismo lento: 15 causas comunes y cómo solucionarlo de forma natural. Guía completa con tips efectivos.",
    cta: "Ver las causas del metabolismo lento",
    icon: "🐢",
  },
  "elegir-suplemento": {
    url: "/recursos/guias/elegir-suplemento/",
    title: "¿Qué Suplemento Necesito? Guía de Decisión Personalizada",
    description: "Guía interactiva para elegir el suplemento correcto según tu objetivo, experiencia, tolerancia y metas de pérdida de peso.",
    cta: "Ver la guía para elegir tu suplemento",
    icon: "📋",
  },
  "duo-60-vs-lida": {
    url: "/recursos/comparativas/duo-60-vs-lida/",
    title: "Duo 60 Fusion vs Lida Booster",
    description: "Comparativa detallada entre Duo 60 Fusion Xtreme y Lida Booster. Diferencias, ventajas, cuándo elegir cada uno y resultados observados.",
    cta: "Ver la comparativa Duo 60 vs Lida Booster",
    icon: "⚖️",
  },
  "mejor-quemador-grasa": {
    url: "/recursos/comparativas/mejor-quemador-grasa/",
    title: "Top 5 Mejores Quemadores de Grasa Naturales 2025",
    description: "Ranking basado en resultados reales de nuestros 5 mejores quemadores de grasa. Duo 60, SOS Burn, Body Shape, Thyroide Support y Lida Booster comparados.",
    cta: "Ver el top 5 de quemadores de grasa",
    icon: "🏆",
  },
};

// Guías relacionadas por producto (clave = productUrl).
const GUIDES_BY_PRODUCT_URL = {
  "/sosburn-clear": ["quemar-grasa-abdominal", "mejor-quemador-grasa"],
  "/sosburn": ["quemar-grasa-abdominal", "mejor-quemador-grasa"],
  "/chupapanza": ["dieta-grasa-abdominal", "grasa-visceral-vs-subcutanea"],
  "/serenity": ["hambre-emocional", "ansiedad-por-comer"],
  "/alphaglow": ["controlar-apetito", "alimentos-saciantes"],
  "/duo-60-fusion": ["duo-60-vs-lida", "acelerar-metabolismo"],
  "/lidabooster": ["duo-60-vs-lida", "mejor-quemador-grasa"],
  "/thyroide-support": ["metabolismo-lento-causas", "acelerar-metabolismo"],
};

// Respaldo por nombre de producto: varias páginas de producto no declaran
// `productUrl` en su productData, así que sin esto caerían al set por defecto.
const GUIDES_BY_PRODUCT_NAME = {
  "SOS Burn Clean": GUIDES_BY_PRODUCT_URL["/sosburn-clear"],
  "SOS Burn": GUIDES_BY_PRODUCT_URL["/sosburn"],
  "Chupa Panza": GUIDES_BY_PRODUCT_URL["/chupapanza"],
  "Serenity": GUIDES_BY_PRODUCT_URL["/serenity"],
  "Lida Booster": GUIDES_BY_PRODUCT_URL["/lidabooster"],
};

const DEFAULT_GUIDE_KEYS = ["elegir-suplemento", "mejor-quemador-grasa"];

function getRelatedGuides({ productUrl, productName }) {
  const keys =
    GUIDES_BY_PRODUCT_URL[productUrl] ||
    GUIDES_BY_PRODUCT_NAME[productName] ||
    DEFAULT_GUIDE_KEYS;

  return keys.map((key) => GUIDES[key]).filter(Boolean);
}

export function ProductPageWrapper({ productData }) {
  const whatsappRef = useRef(null);

  const handleOpenWhatsApp = () => {
    if (whatsappRef.current) {
      whatsappRef.current.open();
    }
  };

  // Se calcula durante el render (no en efectos ni estado) para que los
  // enlaces existan en el HTML estático que rastrea Google.
  const relatedGuides = getRelatedGuides({
    productUrl: productData.productUrl,
    productName: productData.productName,
  });

  return (
    <WhatsAppContext.Provider value={handleOpenWhatsApp}>
      <ProductSimple {...productData} />

      {/* Guía relacionada */}
      <section className="px-[5%] pb-12 md:pb-16 lg:pb-20">
        <div className="container max-w-5xl">
          <div className="rounded-2xl border-2 border-como/20 bg-white p-6 md:p-8">
            <h2 className="mb-2 text-xl font-bold text-como md:text-2xl">📚 Guía Relacionada</h2>
            <p className="mb-6 text-sm leading-relaxed text-text-secondary md:text-base">
              Antes de decidir, lee cómo funciona este tipo de tratamiento y qué esperar de él.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {relatedGuides.map((guide) => (
                <a
                  key={guide.url}
                  href={guide.url}
                  className="group flex flex-col rounded-xl border border-gray-200 bg-ecru-white p-5 transition-all duration-300 hover:border-como hover:shadow-md"
                >
                  <span className="mb-3 text-2xl">{guide.icon}</span>
                  <span className="mb-2 text-base font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-como md:text-lg">
                    {guide.title}
                  </span>
                  <span className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
                    {guide.description}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-como">
                    {guide.cta}
                    <svg className="h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>

            <a
              href="/recursos/"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-como transition-colors hover:text-[#3d6849]"
            >
              Ver todas las guías y comparativas
              <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <ProductCarousel currentProductUrl={productData.productUrl} />
      <WhatsAppFloat ref={whatsappRef} />
    </WhatsAppContext.Provider>
  );
}
