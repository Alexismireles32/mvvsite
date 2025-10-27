"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronDown, RxChevronRight } from "react-icons/rx";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(true);
  };
  const closeOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(false);
  };
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
  return {
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    animateDropdownMenu,
    animateDropdownMenuIcon,
  };
};

export function Navbar6() {
  const useActive = useRelume();
  return (
    <section
      id="relume"
      className="sticky top-0 z-[999] flex min-h-16 w-full items-center border-b border-border-primary bg-background-primary px-[5%] shadow-sm md:min-h-18"
    >
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
        <a href="/" className="flex items-center">
          <img
            src="https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png"
            alt="MVV Natural - Suplementos Naturales"
            className="h-12 w-auto md:h-14"
          />
        </a>
        <div className="absolute hidden h-screen overflow-auto border-b border-border-primary bg-background-primary px-[5%] pb-24 pt-4 md:pb-0 lg:static lg:ml-6 lg:flex lg:h-auto lg:flex-1 lg:items-center lg:justify-between lg:border-none lg:bg-none lg:px-0 lg:pt-0">
          <div className="flex flex-col items-center lg:flex-row">
            <a
              href="/"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Inicio
            </a>
            <a
              href="/productos"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Productos
            </a>
            <a
              href="/catalogo"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Catálogo
            </a>
            <a
              href="/blog"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Blog
            </a>
            <a
              href="/testimonios"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Testimonios
            </a>
            <a
              href="/recursos"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Recursos
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button
              title="Contactar WhatsApp México"
              size="sm"
              asChild
              className="bg-como hover:bg-[#3d6849] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <a href="https://wa.me/526312982043?text=Hola,%20quisiera%20saber%20más%20sobre%20los%20productos%20MVV%20Natural" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span className="text-lg">🇲🇽</span>
                WhatsApp México
              </a>
            </Button>
            <Button 
              title="Contactar WhatsApp USA" 
              variant="secondary" 
              size="sm" 
              asChild
              className="bg-white border-2 border-como text-como hover:bg-ecru-white font-medium transition-all duration-300"
            >
              <a href="https://wa.me/15202161443?text=Hola,%20quisiera%20saber%20más%20sobre%20los%20productos%20MVV%20Natural" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span className="text-lg">🇺🇸</span>
                WhatsApp USA
              </a>
            </Button>
          </div>
        </div>
        <button
          className="-mr-2 flex size-12 cursor-pointer flex-col items-center justify-center lg:hidden"
          onClick={useActive.toggleMobileMenu}
        >
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-como"
            animate={useActive.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: 8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-como"
            animate={useActive.animateMobileMenu}
            variants={{
              open: { width: 0, transition: { duration: 0.1 } },
              closed: {
                width: "1.5rem",
                transition: { delay: 0.3, duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-como"
            animate={useActive.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: -8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
        </button>
      </div>
      <AnimatePresence>
        <motion.div
          variants={{ open: { height: "100dvh" }, close: { height: "auto" } }}
          animate={useActive.animateMobileMenu}
          initial="close"
          exit="close"
          className="absolute left-0 right-0 top-full w-full overflow-hidden lg:hidden"
          transition={{ duration: 0.4 }}
        >
          <motion.div
            variants={{ open: { y: 0 }, close: { y: "-100%" } }}
            animate={useActive.animateMobileMenu}
            initial="close"
            exit="close"
            transition={{ duration: 0.4 }}
            className="absolute left-0 right-0 top-0 block h-dvh overflow-auto border-b border-border-primary bg-background-primary px-[5%] pb-8 pt-4"
          >
            <div className="flex flex-col">
              <a
                href="/"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Inicio
              </a>
              <a
                href="/productos"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Productos
              </a>
              <a
                href="/catalogo"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Catálogo
              </a>
              <a
                href="/blog"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Blog
              </a>
              <a
                href="/testimonios"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Testimonios
              </a>
              <a
                href="/recursos"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Recursos
              </a>
              
              {/* WhatsApp buttons for mobile menu */}
              <div className="mt-6 flex flex-col gap-3 border-t border-border-primary pt-6">
                <a
                  href="https://wa.me/526312982043?text=Hola,%20quisiera%20saber%20más%20sobre%20los%20productos%20MVV%20Natural"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-como hover:bg-[#3d6849] text-white font-semibold text-base px-6 py-4 rounded min-h-[44px] transition-all duration-300"
                >
                  <span className="text-xl">🇲🇽</span>
                  <span>WhatsApp México</span>
                </a>
                <a
                  href="https://wa.me/15202161443?text=Hola,%20quisiera%20saber%20más%20sobre%20los%20productos%20MVV%20Natural"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white border-2 border-como text-como hover:bg-ecru-white font-medium text-base px-6 py-4 rounded min-h-[44px] transition-all duration-300"
                >
                  <span className="text-xl">🇺🇸</span>
                  <span>WhatsApp USA</span>
                </a>
              </div>
              
              <div>
                <button
                  className="relative flex w-full items-center justify-between whitespace-nowrap py-3 text-md lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base"
                  onClick={useActive.openOnMobileDropdownMenu}
                >
                  <span>Link Four</span>
                  <motion.span
                    animate={useActive.animateDropdownMenuIcon}
                    variants={{
                      rotated: { rotate: 180 },
                      initial: { rotate: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <RxChevronDown />
                  </motion.span>
                </button>
                <AnimatePresence>
                  <motion.nav
                    variants={{
                      open: {
                        opacity: 1,
                        display: "block",
                        height: "var(--height-open, auto)",
                      },
                      close: {
                        opacity: 0,
                        display: "none",
                        height: "var(--height-close, 0)",
                      },
                    }}
                    animate={useActive.animateDropdownMenu}
                    initial="close"
                    exit="close"
                    transition={{ duration: 0.2 }}
                    className="bottom-auto left-0 top-full w-full min-w-full max-w-full overflow-hidden bg-background-primary lg:absolute lg:w-screen lg:border-b lg:border-border-primary lg:px-[5%] lg:[--height-close:auto]"
                  >
                    <div className="mx-auto flex size-full max-w-full items-center justify-between">
                      <div className="flex w-full flex-col lg:flex-row">
                        <div className="grid flex-1 auto-cols-fr grid-cols-1 gap-x-8 gap-y-6 py-4 md:grid-cols-3 md:gap-y-0 md:py-8 lg:pr-8">
                          <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                            <h4 className="text-sm font-semibold leading-[1.3]">
                              Page group one
                            </h4>
                            <a
                              href="#"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 1"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Page One</h5>
                                <p className="hidden text-sm md:block">
                                  Lorem ipsum dolor sit amet consectetur elit
                                </p>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 2"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Page Two</h5>
                                <p className="hidden text-sm md:block">
                                  Lorem ipsum dolor sit amet consectetur elit
                                </p>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 3"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Page Three</h5>
                                <p className="hidden text-sm md:block">
                                  Lorem ipsum dolor sit amet consectetur elit
                                </p>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 4"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Page Four</h5>
                                <p className="hidden text-sm md:block">
                                  Lorem ipsum dolor sit amet consectetur elit
                                </p>
                              </div>
                            </a>
                          </div>
                          <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                            <h4 className="text-sm font-semibold leading-[1.3]">
                              Page group two
                            </h4>
                            <a
                              href="#"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 5"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Page Five</h5>
                                <p className="hidden text-sm md:block">
                                  Lorem ipsum dolor sit amet consectetur elit
                                </p>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 6"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Page Six</h5>
                                <p className="hidden text-sm md:block">
                                  Lorem ipsum dolor sit amet consectetur elit
                                </p>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 7"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Page Seven</h5>
                                <p className="hidden text-sm md:block">
                                  Lorem ipsum dolor sit amet consectetur elit
                                </p>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 8"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Page Eight</h5>
                                <p className="hidden text-sm md:block">
                                  Lorem ipsum dolor sit amet consectetur elit
                                </p>
                              </div>
                            </a>
                          </div>
                          <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                            <h4 className="text-sm font-semibold leading-[1.3]">
                              Page group three
                            </h4>
                            <a
                              href="#"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 9"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Page Nine</h5>
                                <p className="hidden text-sm md:block">
                                  Lorem ipsum dolor sit amet consectetur elit
                                </p>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 10"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Page Ten</h5>
                                <p className="hidden text-sm md:block">
                                  Lorem ipsum dolor sit amet consectetur elit
                                </p>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 11"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Page Eleven</h5>
                                <p className="hidden text-sm md:block">
                                  Lorem ipsum dolor sit amet consectetur elit
                                </p>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                  alt="Icon 12"
                                  className="shrink-0"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <h5 className="font-semibold">Page Twelve</h5>
                                <p className="hidden text-sm md:block">
                                  Lorem ipsum dolor sit amet consectetur elit
                                </p>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="max-w-none relative mb-4 flex flex-1 p-6 md:max-w-[50rem] md:p-8 lg:mb-0 lg:max-w-xxs lg:py-8 lg:pl-8 lg:pr-0">
                          <div className="relative z-10 grid w-full grid-cols-1 grid-rows-[auto_max-content] gap-y-4">
                            <h4 className="text-sm font-semibold leading-[1.3]">
                              Featured from Blog
                            </h4>
                            <div className="max-w-none grid w-full grid-cols-1 grid-rows-[auto_auto_auto_auto] items-start gap-y-2 md:block">
                              <a href="#" className="flex flex-col py-2">
                                <div className="relative mb-3 w-full overflow-hidden pt-[56.25%]">
                                  <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                    alt="Relume placeholder image 2"
                                    className="absolute inset-0 size-full object-cover"
                                  />
                                </div>
                                <div className="mt-2 flex max-w-[18rem] flex-col justify-start md:mt-0">
                                  <h5 className="mb-1 font-semibold">
                                    Article Title
                                  </h5>
                                  <p className="text-sm">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                  <div className="mt-2">
                                    <Button
                                      title="Read more"
                                      variant="link"
                                      size="link"
                                      className="text-sm underline"
                                    >
                                      Read more
                                    </Button>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="flex items-center">
                              <Button
                                title="See all articles"
                                variant="link"
                                size="link"
                                iconRight={<RxChevronRight />}
                              >
                                See all articles
                              </Button>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-auto top-0 min-w-full bg-background-secondary lg:min-w-[100vw]" />
                        </div>
                      </div>
                    </div>
                  </motion.nav>
                </AnimatePresence>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <Button title="Contactar WhatsApp Ventas México 🇲🇽" variant="secondary" size="sm" asChild>
                  <a href="https://wa.me/526312982043?text=Hola,%20quisiera%20saber%20más%20sobre%20los%20productos%20MVV%20Natural" target="_blank" rel="noopener noreferrer">
                    Contactar WhatsApp Ventas México 🇲🇽
                  </a>
                </Button>
                <Button title="Contactar WhatsApp Ventas USA 🇺🇸" size="sm" asChild>
                  <a href="https://wa.me/15202161443?text=Hola,%20quisiera%20saber%20más%20sobre%20los%20productos%20MVV%20Natural" target="_blank" rel="noopener noreferrer">
                    Contactar WhatsApp Ventas USA 🇺🇸
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
