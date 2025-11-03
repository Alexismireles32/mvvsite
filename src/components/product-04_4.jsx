"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Product4_4() {
  return (
    <section id="relume" className="px-[5%]">
      <div className="container">
        <div className="grid grid-cols-2 justify-items-start gap-x-4 gap-y-8 xxs:gap-x-5 xxs:gap-y-10 xs:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4">
          {/* Protein Body */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/protein-body" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-9_x4mbwd.webp"
                  alt="Protein Body - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/protein-body" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">Protein Body</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Protein Body"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/protein-body">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* 15 Day Detox Tea */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/15day-detox-tea" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-15_ojfmth.webp"
                  alt="15 Day Detox Tea - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/15day-detox-tea" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">15 Day Detox Tea</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto 15 Day Detox Tea"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/15day-detox-tea">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* 3 Day Reset */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/3day-reset" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-16_ydcn0m.webp"
                  alt="3 Day Reset - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/3day-reset" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">3 Day Reset</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto 3 Day Reset"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/3day-reset">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* Colágeno & Biotina */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/colageno-biotina" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-17_qhlkxa.webp"
                  alt="Colágeno & Biotina - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/colageno-biotina" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">Colágeno & Biotina</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Colágeno & Biotina"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/colageno-biotina">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* Thyroide Support */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/thyroide-support" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-27_wezqrg.webp"
                  alt="Thyroide Support - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/thyroide-support" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">Thyroide Support</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Thyroide Support"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/thyroide-support">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* Meizitang Soft Gel */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/meizitang-soft-gel" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-34_nja22n.webp"
                  alt="Meizitang Soft Gel - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/meizitang-soft-gel" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">Meizitang Soft Gel</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Meizitang Soft Gel"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/meizitang-soft-gel">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* Li-Da Slimming Tea */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/lida-slimming-tea" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-36_mj6ljw.webp"
                  alt="Li-Da Slimming Tea - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/lida-slimming-tea" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">Li-Da Slimming Tea</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Li-Da Slimming Tea"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/lida-slimming-tea">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* Slim24 */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🆕 Nuevo
              </div>
              <a href="/slim24" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_600/v1761549733/catalogo-mvv-natural-39_ylthvp.webp"
                  alt="Slim24 - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="720"
                />
              </a>
            </div>
            <a href="/slim24" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:underline">Slim24</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Slim24"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/slim24">
                Ver Producto
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

