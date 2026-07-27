import React from "react";
import { RxChevronRight } from "react-icons/rx";

// Listado único del blog. Los datos (título, descripción, categoría, tiempo de
// lectura, fecha e imagen) están tomados tal cual de cada artículo en
// src/pages/blog/*.astro. No inventar valores aquí.
const posts = [
  {
    url: "/blog/como-acelerar-metabolismo-naturalmente/",
    title: "Cómo Acelerar tu Metabolismo Naturalmente",
    description:
      "Descubre cómo acelerar tu metabolismo lento con métodos naturales que SÍ funcionan. Suplementos, alimentos y ejercicios probados, con resultados reales.",
    category: "Salud Natural",
    readTime: "15 min lectura",
    date: "2025-01-13",
    dateLabel: "13 de enero de 2025",
    image:
      "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200,h_675,c_pad,b_rgb:F5F1E8/v1761549725/catalogo-mvv-natural-2_ldtqwy.webp",
    imageAlt: "Alimentos frescos y nutritivos para acelerar el metabolismo",
  },
  {
    url: "/blog/funcionan-pastillas-para-bajar-de-peso/",
    title: "¿Funcionan Las Pastillas Para Bajar de Peso?",
    description:
      "La verdad sin filtros sobre si funcionan las pastillas para adelgazar. Estudios reales, experiencia de 15 años y qué esperar. No más mentiras ni falsas promesas.",
    category: "Salud Natural",
    readTime: "12 min lectura",
    date: "2025-01-13",
    dateLabel: "13 de enero de 2025",
    image:
      "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200,h_675,c_pad,b_rgb:F5F1E8/v1761549725/catalogo-mvv-natural-2_ldtqwy.webp",
    imageAlt: "Frutas y verduras frescas junto a suplementos naturales",
  },
  {
    url: "/blog/mejores-suplementos-naturales-bajar-peso-mexico/",
    title: "Los Mejores Suplementos Naturales Para Bajar de Peso en México 2025",
    description:
      "Comparativa de los mejores suplementos naturales para adelgazar en México. Resultados reales y cuál comprar según tu objetivo. Guía actualizada 2025.",
    category: "Comparativas",
    readTime: "18 min lectura",
    date: "2025-01-13",
    dateLabel: "13 de enero de 2025",
    image:
      "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200,h_675,c_pad,b_rgb:F5F1E8/v1761549725/catalogo-mvv-natural-1_upvivj.webp",
    imageAlt: "Alimentación saludable con vegetales frescos y suplementos",
  },
];

export function Blog44() {
  return (
    <section id="blog-articulos" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Blog</p>
          <h1 className="mb-3 text-3xl font-bold leading-tight md:mb-4 md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
            Blog de Suplementos Naturales Para Bajar de Peso
          </h1>
          <p className="md:text-md">
            Guías honestas sobre cómo bajar de peso, acelerar tu metabolismo y
            elegir suplementos naturales que de verdad funcionan.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.url}
              className="group flex size-full flex-col items-center justify-start border border-border-primary bg-white transition-all duration-300 hover:shadow-xl hover:border-como"
            >
              <div className="relative w-full overflow-hidden pt-[66%]">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  width="800"
                  height="600"
                  className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-5 py-6 md:p-6">
                <div className="rb-4 mb-4 flex w-full flex-wrap items-center justify-start gap-y-2">
                  <p className="mr-4 bg-gum-leaf px-2 py-1 text-sm font-semibold text-como">
                    {post.category}
                  </p>
                  <p className="inline text-sm font-semibold">
                    {post.readTime}
                  </p>
                </div>
                <a className="mb-2" href={post.url}>
                  <h2 className="mb-2 text-xl font-bold md:text-2xl">
                    {post.title}
                  </h2>
                </a>
                <p>{post.description}</p>
                <p className="mt-4 text-sm text-text-secondary">
                  Publicado el{" "}
                  <time dateTime={post.date}>{post.dateLabel}</time>
                </p>
                <a
                  href={post.url}
                  className="mt-6 flex items-center gap-x-1 text-como font-semibold hover:underline"
                >
                  Leer más
                  <RxChevronRight />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
