"use client";

import React from 'react';

export function CatalogImageGallery() {
  // Catalog images 1-40, skipping 6
  const catalogImages = [
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-1_upvivj.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-2_ldtqwy.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-3_llmlgp.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-4_lwf6po.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-5_hh9xkg.webp',
    // Skipping 6
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-7_pfkwq9.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-8_jduebo.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-9_x4mbwd.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-10_drstvu.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-11_hqpxok.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-12_vhazhu.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-13_hdnhdg.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-14_miylnf.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-15_ojfmth.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-16_ydcn0m.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-17_qhlkxa.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-18_bj3iwu.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-19_aabf7p.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-20_zplemr.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-21_slzqqk.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-22_ymfzfk.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-23_xxwr78.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-24_cayyap.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-25_mbl2mh.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-26_qacvkr.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-27_wezqrg.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-28_wok8x6.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-29_hm7ayt.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-30_nal8d7.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-31_qsewuj.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-32_qqgu08.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-33_i1bpqa.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-34_nja22n.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-35_omhexy.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-36_mj6ljw.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-37_xwmvln.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-38_stdnup.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-39_ylthvp.webp',
    'https://res.cloudinary.com/dsulhqvza/image/upload/v1761549725/catalogo-mvv-natural-40_ffleyp.webp',
  ];

  return (
    <section className="bg-white px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-como md:text-4xl lg:text-5xl">
            Catálogo MVV Natural 2025
          </h1>
          <p className="mx-auto max-w-2xl text-base text-text-secondary md:text-lg">
            Explora nuestro catálogo completo de suplementos naturales. Navega por todas las páginas aquí abajo.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-6">
          {catalogImages.map((imageUrl, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              <img
                src={imageUrl}
                alt={`Catálogo MVV Natural - Página ${index + 1 <= 5 ? index + 1 : index + 2}`}
                className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                loading={index < 4 ? "eager" : "lazy"}
                width="1200"
                height="1600"
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-lg text-text-secondary">
            ¿Encontraste el producto que buscas?
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="/productos/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-como px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-[#3d6849] active:scale-95"
            >
              Ver Todos los Productos
            </a>
            <a
              href="https://wa.me/526312982043?text=Hola,%20vi%20su%20catálogo%20y%20me%20interesa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-como bg-white px-8 py-4 text-base font-bold text-como transition-all duration-300 hover:bg-ecru-white active:scale-95"
            >
              <span className="text-xl">💬</span>
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


