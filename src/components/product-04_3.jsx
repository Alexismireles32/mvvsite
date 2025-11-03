"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Product4_3() {
  return (
    <section id="relume" className="px-[5%]">
      <div className="container">
        <div className="grid grid-cols-2 justify-items-start gap-x-4 gap-y-8 xxs:gap-x-5 xxs:gap-y-10 xs:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4">
          {/* Maxi Fibra */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/maxi-fibra" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-18_bj3iwu.webp"
                  alt="Maxi Fibra - MVV Natural"
                  className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/maxi-fibra" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">Maxi Fibra</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Maxi Fibra"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/maxi-fibra">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* Bikini Strong */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/bikini-strong" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-32_qqgu08.webp"
                  alt="Bikini Strong - MVV Natural"
                  className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/bikini-strong" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">Bikini Strong</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Bikini Strong"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/bikini-strong">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* Mens Exotic */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/mens-exotic" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-24_cayyap.webp"
                  alt="Mens Exotic - MVV Natural"
                  className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/mens-exotic" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">Mens Exotic</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Mens Exotic"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/mens-exotic">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* Magic Booty Up */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/magic-booty-up" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-26_qacvkr.webp"
                  alt="Magic Booty Up - MVV Natural"
                  className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/magic-booty-up" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">Magic Booty Up</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Magic Booty Up"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/magic-booty-up">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* Slim Shake */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/slim-shake" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-30_nal8d7.webp"
                  alt="Slim Shake - MVV Natural"
                  className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/slim-shake" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">Slim Shake</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Slim Shake"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/slim-shake">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* Blueberry Colágeno */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/blueberry-colageno" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-31_qsewuj.webp"
                  alt="Blueberry Colágeno - MVV Natural"
                  className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/blueberry-colageno" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">Blueberry Colágeno</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Blueberry Colágeno"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/blueberry-colageno">
                Ver Producto
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

