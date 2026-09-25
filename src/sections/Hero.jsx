import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  Menu,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import HeroScene from "../three/HeroScene";
import MobileMenu from "../components/MobileMenu";
import heroData from "../data/hero";

function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Lock page scrolling while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#100906] text-[#f8eee4]"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0">
        <img
          src={heroData.backgroundImage}
          alt=""
          className="h-full w-full object-cover opacity-90"
        />

        {/* Main dark overlay */}
        <div className="absolute inset-0 bg-[#100906]/70" />

        {/* Cinematic bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#100906] via-[#100906]/80 to-transparent" />

        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#100906]/70 to-transparent" />

        {/* Orange atmospheric glow */}
        <div className="absolute -right-40 top-[15%] h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[140px]" />

        <div className="absolute -left-40 bottom-[10%] h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[130px]" />

        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.04] blur-[100px]" />
      </div>

      {/* =====================================================
          THREE.JS ATMOSPHERE
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <HeroScene />
      </div>

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header className="relative z-40 px-5 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between">

          {/* Brand */}
          <a
            href="#home"
            className="group flex items-center gap-3"
          >
            {/* Small mark */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/30 bg-orange-500/[0.08] backdrop-blur-xl">
              <span className="font-serif text-lg font-bold italic text-orange-400">
                H
              </span>

              <span className="absolute inset-1 rounded-full border border-orange-400/10" />
            </div>

            <div className="leading-none">
              <p className="font-serif text-[17px] font-bold italic tracking-wide text-[#f8eee4]">
                HOT{" "}
                <span className="text-orange-500">&</span>{" "}
                SPICE
              </p>

              <p className="mt-1 text-[7px] font-medium tracking-[0.32em] text-white/35">
                PURE VEGETARIAN
              </p>
            </div>
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 rounded-full border border-white/[0.08] bg-black/20 px-7 py-3 backdrop-blur-xl lg:flex">
            <a
              href="#home"
              className="text-[10px] font-medium tracking-[0.2em] text-white transition-colors hover:text-orange-400"
            >
              HOME
            </a>

            <a
              href="#menu"
              className="text-[10px] font-medium tracking-[0.2em] text-white/45 transition-colors hover:text-orange-400"
            >
              MENU
            </a>

            <a
              href="#special"
              className="text-[10px] font-medium tracking-[0.2em] text-white/45 transition-colors hover:text-orange-400"
            >
              SPECIAL
            </a>

            <a
              href="#gallery"
              className="text-[10px] font-medium tracking-[0.2em] text-white/45 transition-colors hover:text-orange-400"
            >
              GALLERY
            </a>
          </div>

          {/* Admin Panel */}
          <a
            href="/admin"
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-orange-400/20
              bg-orange-500/[0.06]
              px-4
              py-2
              text-[9px]
              font-semibold
              tracking-[0.16em]
              text-orange-300
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-orange-400/40
              hover:bg-orange-500/10
              hover:text-orange-200
              lg:flex
            "
          >
            <ShieldCheck
              size={13}
              strokeWidth={1.6}
            />

            ADMIN
          </a>

          {/* Location */}
          <div className="hidden items-center gap-2 sm:flex">
            <MapPin
              size={14}
              strokeWidth={1.5}
              className="text-orange-400"
            />

            <span className="text-[9px] font-medium tracking-[0.22em] text-white/50">
              HARIDWAR
            </span>
          </div>

          {/* Mobile menu */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              text-white/80
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-orange-400/30
              hover:bg-orange-500/10
              hover:text-orange-400
              lg:hidden
            "
          >
            <Menu
              size={18}
              strokeWidth={1.7}
            />
          </button>
        </nav>
      </header>

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div className="relative z-20 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1500px] flex-col px-5 pb-7 pt-12 sm:px-8 sm:pt-14 lg:px-12 lg:pt-8">

        <div className="grid flex-1 items-center lg:grid-cols-[0.92fr_1.08fr]">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="relative z-20 max-w-[680px]">

            {/* Eyebrow */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-orange-500 sm:w-10" />

              <span className="text-[9px] font-semibold tracking-[0.3em] text-orange-400 sm:text-[10px]">
                {heroData.eyebrow}
              </span>
            </motion.div>

            {/* =================================================
                RESTAURANT NAME
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: "easeOut",
              }}
              className="relative font-serif"
            >
              {/* HOT */}

              <div
                className="
                  text-[21vw]
                  font-black
                  leading-[0.72]
                  tracking-[-0.08em]
                  text-[#f8eee4]
                  sm:text-[105px]
                  lg:text-[138px]
                "
              >
                {heroData.title}
              </div>

              {/* & */}

              <div
                className="
                  relative
                  z-10
                  ml-[19vw]
                  my-5
                  text-[16vw]
                  font-black
                  italic
                  leading-[0.72]
                  tracking-[-0.1em]
                  text-orange-500
                  drop-shadow-[0_0_25px_rgba(249,115,22,0.15)]
                  sm:ml-24
                  sm:my-6
                  sm:text-[88px]
                  lg:ml-32
                  lg:my-7
                  lg:text-[116px]
                "
              >
                {heroData.accent}
              </div>

              {/* SPICE */}

              <div
                className="
                  ml-[28vw]
                  text-[17vw]
                  font-black
                  italic
                  leading-[0.76]
                  tracking-[-0.08em]
                  text-[#f8eee4]
                  sm:ml-18
                  sm:text-[92px]
                  lg:ml-20
                  lg:text-[122px]
                "
              >
                {heroData.titleBottom}
              </div>

              {/* RESTAURANT */}

              <div className="ml-[9vw] mt-5 flex items-center gap-3 sm:ml-14 lg:ml-20">
                <span className="h-px w-7 bg-orange-500/80 sm:w-12" />

                <span className="text-[8px] font-bold tracking-[0.4em] text-orange-400 sm:text-[10px]">
                  RESTAURANT
                </span>

                <span className="h-px w-7 bg-orange-500/80 sm:w-12" />
              </div>
            </motion.div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
              }}
              className="mt-8 max-w-[470px] text-[14px] font-bold leading-7 text-blue-200 sm:text-[16px] sm:leading-8"
            >
              Pure vegetarian flavours, freshly prepared with passion
              in the heart of Haridwar .
            </motion.p>

            {/* =================================================
                ORDER TIME
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.45,
              }}
              className="mt-5 flex items-center gap-3"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/[0.08]">
                <Clock3
                  size={13}
                  strokeWidth={1.7}
                  className="text-orange-400"
                />
              </span>

              <p className="text-[12px] font-medium tracking-wide text-orange-400 sm:text-sm">
                Ready in just{" "}
                <span className="font-bold text-orange-300">
                  25–30 minutes
                </span>
              </p>
            </motion.div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.55,
              }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              {/* Explore menu */}

              <button
                type="button"
                onClick={scrollToMenu}
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-full
                  bg-orange-500
                  px-5
                  py-3
                  text-[10px]
                  font-bold
                  tracking-[0.16em]
                  text-black
                  transition-all
                  duration-300
                  hover:bg-orange-400
                  hover:shadow-[0_0_35px_rgba(249,115,22,0.25)]
                  sm:px-6
                  sm:py-3.5
                "
              >
                {heroData.primaryButton}

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={13} />
                </span>
              </button>

              {/* Find us */}

              <button
                type="button"
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-5
                  py-3.5
                  text-[10px]
                  font-medium
                  tracking-[0.16em]
                  text-white/70
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-orange-400/40
                  hover:text-orange-300
                  sm:px-6
                "
              >
                {heroData.secondaryButton}
              </button>
            </motion.div>
          </div>

          {/* =================================================
              RIGHT FOOD VISUAL
          ================================================= */}

          <div className="relative mt-12 flex min-h-[380px] items-center justify-center lg:mt-0 lg:min-h-[650px]">

            {/* Glow */}

            <div className="absolute h-[250px] w-[250px] rounded-full bg-orange-500/20 blur-[100px] sm:h-[350px] sm:w-[350px] lg:h-[450px] lg:w-[450px]" />

            {/* Outer ring */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 32,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                h-[270px]
                w-[270px]
                rounded-full
                border
                border-dashed
                border-orange-400/20
                sm:h-[390px]
                sm:w-[390px]
                lg:h-[520px]
                lg:w-[520px]
              "
            />

            {/* Inner ring */}

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                h-[210px]
                w-[210px]
                rounded-full
                border
                border-orange-300/10
                sm:h-[300px]
                sm:w-[300px]
                lg:h-[410px]
                lg:w-[410px]
              "
            />

            {/* Small orbit dot */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[300px] w-[300px] sm:h-[430px] sm:w-[430px] lg:h-[570px] lg:w-[570px]"
            >
              <span className="absolute right-[7%] top-[12%] h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.9)]" />
            </motion.div>

            {/* =================================================
                FOOD IMAGE
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.82,
                y: 35,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: {
                  duration: 0.8,
                  delay: 0.35,
                },
                scale: {
                  duration: 0.8,
                  delay: 0.35,
                },
                y: {
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="
                relative
                z-10
                w-[82vw]
                max-w-[350px]
                sm:w-[65vw]
                sm:max-w-[430px]
                lg:w-[620px]
                lg:max-w-none
              "
            >
              <img
                src={heroData.foodImage}
                alt="Signature vegetarian dish"
                className="
                  w-full
                  object-contain
                  drop-shadow-[0_35px_70px_rgba(0,0,0,0.75)]
                "
              />
            </motion.div>

            {/* =================================================
                SIGNATURE BADGE
            ================================================= */}

            <motion.div
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-1
                right-1
                z-20
                rounded-2xl
                border
                border-white/10
                bg-black/40
                px-4
                py-3
                backdrop-blur-xl
                sm:bottom-8
                sm:right-8
                sm:px-5
                sm:py-4
              "
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-orange-400">
                Signature
              </p>

              <p className="mt-1 font-serif text-sm italic text-white/90">
                Freshly crafted
              </p>
            </motion.div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.9,
          }}
          className="mt-4 flex items-end justify-between border-t border-white/[0.08] pt-4"
        >
          {/* Location */}

          <div>
            <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/30 sm:text-[9px]">
              {heroData.location}
            </p>

            <p className="mt-1 text-[9px] text-white/35 sm:text-[10px]">
              Taste the warmth. Feel the spice.
            </p>
          </div>

          {/* Scroll */}

          <button
            type="button"
            onClick={scrollToMenu}
            className="group flex items-center gap-3 text-white/35 transition hover:text-orange-400"
          >
            <span className="hidden text-[9px] uppercase tracking-[0.25em] sm:block">
              Explore menu
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-orange-400/40 group-hover:bg-orange-500/5">
              <ArrowDown
                size={13}
                className="animate-bounce"
              />
            </span>
          </button>
        </motion.div>
      </div>

      {/* =====================================================
          DESKTOP SIDE TEXT
      ====================================================== */}

      <div className="pointer-events-none absolute bottom-36 left-[-35px] z-10 hidden rotate-[-90deg] lg:block">
        <span className="text-[8px] font-medium tracking-[0.55em] text-white/15">
          HARIDWAR · PURE VEGETARIAN · EST. 2026
        </span>
      </div>

      {/* Right vertical accent */}

      <div className="pointer-events-none absolute right-7 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col items-center gap-3">
          <span className="h-16 w-px bg-gradient-to-b from-transparent via-orange-500/40 to-transparent" />

          <span className="text-[8px] tracking-[0.4em] text-white/20 [writing-mode:vertical-rl]">
            FLAVOUR · PASSION · SPICE
          </span>

          <span className="h-16 w-px bg-gradient-to-b from-transparent via-orange-500/40 to-transparent" />
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        scrollToMenu={scrollToMenu}
      />
    </section>
  );
}

export default Hero;