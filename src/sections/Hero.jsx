import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  Menu,
  Clock3,
  ShieldCheck,
  Star,
} from "lucide-react";

import HeroScene from "../three/HeroScene";
import MobileMenu from "../components/MobileMenu";
import heroData from "../data/hero";

function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  const findUsUrl =
    "https://maps.app.goo.gl/9yrJVvgCa1Yc9s6UA";

  // Paste your Google rating/review link here later
  const ratingUrl =
    "https://g.page/r/CecOzo8alv1sEBM/review";

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-transparent
        text-[#f8eee4]
      "
    >
      {/* =========================================================
          HERO BACKGROUND
      ========================================================== */}

      <div
        className="
          absolute
          inset-0
          z-0
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: `url(${heroData.backgroundImage})`,
        }}
      />

      <div
        className="
          absolute
          inset-0
          z-0
          bg-black/65
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-0
          h-40
          bg-gradient-to-t
          from-[#100906]
          via-[#100906]/70
          to-transparent
        "
      />

      {/* =========================================================
          3D HERO SCENE
      ========================================================== */}

      <div className="absolute inset-0 z-[1]">
        <HeroScene />
      </div>

      {/* =========================================================
          NAVBAR
      ========================================================== */}

      <nav
        className="
          relative
          z-30
          flex
          items-center
          justify-between
          px-5
          py-5
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        {/* Brand */}

        <a
          href="#home"
          className="
            group
            relative
            flex
            items-center
            gap-3
          "
        >
          <div>
            <p
              className="
                text-[18px]
                font-black
                leading-none
                tracking-[-0.06em]
                text-white
                leading-[0.85]
                sm:text-[21px]
              "
            >
              HOT
            </p>

            <div
              className="
                flex
                items-center
                gap-1
                leading-none
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  text-orange-400
                "
              >
                &
              </span>

              <span
                className="
                  text-[12px]
                  font-black
                  tracking-[-0.03em]
                  text-orange-400
                "
              >
                SPICE
              </span>
            </div>
          </div>

          <span
            className="
              hidden
              h-8
              w-px
              bg-white/10
              sm:block
            "
          />

          <span
            className="
              hidden
              text-[8px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-white/35
              sm:block
            "
          >
            Pure Vegetarian
          </span>
        </a>

        {/* Desktop Navigation */}

        <div
          className="
            hidden
            items-center
            gap-7
            lg:flex
          "
        >
          <a
            href="#home"
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white/60
              transition-colors
              duration-300
              hover:text-orange-400
            "
          >
            Home
          </a>

          <a
            href="#menu"
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white/60
              transition-colors
              duration-300
              hover:text-orange-400
            "
          >
            Menu
          </a>

          <a
            href="#special"
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white/60
              transition-colors
              duration-300
              hover:text-orange-400
            "
          >
            Special
          </a>

          <a
            href="#gallery"
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white/60
              transition-colors
              duration-300
              hover:text-orange-400
            "
          >
            Gallery
          </a>

          <a
            href="/admin"
            className="
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              px-4
              py-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white/50
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-orange-400/30
              hover:bg-orange-500/10
              hover:text-orange-300
            "
          >
            Admin
          </a>
        </div>

        {/* Location + Mobile Menu */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              hidden
              items-center
              gap-2
              md:flex
            "
          >
            <MapPin
              size={13}
              className="text-orange-400"
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-white/50
              "
            >
              {heroData.location}
            </span>
          </div>

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
              bg-white/[0.05]
              text-white
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-orange-400/40
              hover:bg-orange-500/10
              hover:text-orange-400
              lg:hidden
            "
          >
            <Menu size={17} />
          </button>
        </div>
      </nav>

      {/* =========================================================
          MAIN HERO
      ========================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-80px)]
          max-w-[1500px]
          items-center
          px-5
          pb-24
          pt-10
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-1
            items-center
            gap-10
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-8
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <div
            className="
              relative
              z-20
              max-w-2xl
            "
          >
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
              className="
                mb-5
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-orange-400
                "
              />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-orange-300
                "
              >
                {heroData.eyebrow}
              </span>
            </motion.div>

            {/* Restaurant Name */}

            {/* Restaurant Name */}
          {/* Animated Neon Glow Behind Restaurant Name */}
          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[34%]
              h-[28vw]
              w-[75vw]
              -translate-x-1/2
              rounded-full
              bg-orange-500/20
              blur-[90px]
              sm:h-[22vw]
              sm:w-[65vw]
              lg:h-[14vw]
              lg:w-[50vw]
              lg:blur-[110px]
            "
            animate={{
              x: ["-50%", "-47%", "-53%", "-50%"],
              y: [0, -12, 8, 0],
              scale: [1, 1.08, 0.94, 1],
              opacity: [0.35, 0.55, 0.38, 0.45],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
                    <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="
              relative
              z-10
              select-none
              text-[20vw]
              font-black
              uppercase
              leading-[0.86]
              tracking-[-0.035em]
              sm:text-[13vw]
              sm:tracking-[-0.025em]
              lg:text-[8.8vw]
              lg:tracking-[-0.015em]
              xl:text-[8vw]
            "
          >
            {/* HOT */}
            <span
              className="
                block
                font-black
                leading-[0.86]
                tracking-[0.12em]
                text-white
                drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]
                [-webkit-text-stroke:1.4px_white]
              "
            >
              {heroData.title}
            </span>
          
            {/* & */}
            <span
              className="
                ml-[20vw]
                block
                text-[0.48em]
                font-black
                leading-[0.9]
                tracking-[0.02em]
                text-orange-400
                drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]
                [-webkit-text-stroke:1px_currentColor]
                sm:ml-12
                lg:ml-20
              "
            >
              {heroData.accent}
            </span>
          
            {/* SPICE */}
            <span
              className="
                block
                font-black
                leading-[0.86]
                tracking-[0.12em]
                text-white
                drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]
                [-webkit-text-stroke:1.4px_white]
              "
            >
              {heroData.titleBottom}
            </span>
          </motion.h1>

            {/* Restaurant Label */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="
                mt-5
                ml-1
                flex
                items-center
                gap-3
              "
            >
              <ShieldCheck
                size={14}
                className="text-orange-400"
              />

              <span
                className="
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-orange-400
                "
              >
                Restaurant
              </span>

              <span className="h-px w-8 bg-white/10" />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-white/30
                "
              >
                100% Vegetarian
              </span>
            </motion.div>

            {/* Description */}

            <motion.p
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
                delay: 0.4,
              }}
              className="
                mt-4
                max-w-lg
                text-sm
                leading-6
                tracking-[0.035em]
                text-white/70
                sm:text-[15px]
                sm:leading-7
                sm:tracking-[0.04em]
              "
            >
              Pure vegetarian flavours, freshly
              prepared with passion in the heart of
              Haridwar .
            </motion.p>

            {/* Preparation Time */}

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
                delay: 0.48,
              }}
              className="
                mt-4
                flex
                items-center
                gap-2
              "
            >
              <Clock3
                size={13}
                className="text-orange-400"
              />

              <span
                className="
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-orange-500
                "
              >
                Ready in 25–30 minutes
              </span>
            </motion.div>

            {/* ===================================================
                PREMIUM THREE BUTTONS
            ==================================================== */}

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
              className="
                mt-8
                flex
                flex-wrap
                items-center
                gap-2.5
                sm:gap-3
              "
            >
              {/* Explore Menu */}

              <button
                type="button"
                onClick={scrollToMenu}
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-2.5
                  overflow-hidden
                  rounded-full
                  bg-orange-500
                  px-4
                  py-2.5
                  text-[9px]
                  font-bold
                  tracking-[0.13em]
                  text-black
                  shadow-[0_8px_25px_rgba(249,115,22,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-orange-400
                  hover:shadow-[0_12px_35px_rgba(249,115,22,0.32)]
                  active:scale-95
                  sm:px-5
                  sm:py-3
                "
              >
                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                />

                <span className="relative">
                  {heroData.primaryButton}
                </span>

                <span
                  className="
                    relative
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-white
                    transition-transform
                    duration-300
                    group-hover:rotate-45
                  "
                >
                  <ArrowUpRight
                    size={12}
                    strokeWidth={2}
                  />
                </span>
              </button>

              {/* Find Us */}

              <a
                href={findUsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-4
                  py-2.5
                  text-[9px]
                  font-semibold
                  tracking-[0.13em]
                  text-white/75
                  shadow-[0_8px_25px_rgba(0,0,0,0.15)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange-400/40
                  hover:bg-orange-500/10
                  hover:text-orange-300
                  hover:shadow-[0_10px_30px_rgba(249,115,22,0.12)]
                  active:scale-95
                  sm:px-5
                  sm:py-3
                "
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-orange-500/10
                    text-orange-400
                    transition-all
                    duration-300
                    group-hover:bg-orange-500
                    group-hover:text-black
                  "
                >
                  <MapPin
                    size={12}
                    strokeWidth={2}
                  />
                </span>

                <span>
                  FIND US
                </span>

                <ArrowUpRight
                  size={11}
                  className="
                    text-white/30
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-orange-400
                  "
                />
              </a>

              {/* Rate Us */}

              <a
                href={ratingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  border-yellow-400/15
                  bg-yellow-400/[0.04]
                  px-4
                  py-2.5
                  text-[9px]
                  font-semibold
                  tracking-[0.13em]
                  text-white/70
                  shadow-[0_8px_25px_rgba(0,0,0,0.15)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-yellow-400/40
                  hover:bg-yellow-400/10
                  hover:text-yellow-300
                  hover:shadow-[0_10px_30px_rgba(234,179,8,0.12)]
                  active:scale-95
                  sm:px-5
                  sm:py-3
                "
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-yellow-400/10
                    text-yellow-400
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:bg-yellow-400
                    group-hover:text-black
                  "
                >
                  <Star
                    size={12}
                    strokeWidth={2}
                    fill="currentColor"
                  />
                </span>

                <span>
                  RATE US
                </span>

                <ArrowUpRight
                  size={11}
                  className="
                    text-white/30
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-yellow-400
                  "
                />
              </a>
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT FOOD VISUAL
          ====================================================== */}

          <div
            className="
              relative
              flex
              min-h-[360px]
              items-center
              justify-center
              lg:min-h-[520px]
            "
          >
            {/* Outer glow */}

            <motion.div
              animate={{
                scale: [1, 1.04, 1],
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                h-64
                w-64
                rounded-full
                bg-orange-500/20
                blur-[80px]
                sm:h-80
                sm:w-80
              "
            />

            {/* Rotating ring */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 28,
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
                sm:h-[360px]
                sm:w-[360px]
                lg:h-[430px]
                lg:w-[430px]
              "
            />

            {/* Inner ring */}

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                h-[220px]
                w-[220px]
                rounded-full
                border
                border-white/10
                sm:h-[300px]
                sm:w-[300px]
                lg:h-[360px]
                lg:w-[360px]
              "
            />

            {/* Food */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: "easeOut",
              }}
              className="
                relative
                z-10
                flex
                items-center
                justify-center
              "
            >
              <div
    className="
      relative
      h-[250px]
      w-[250px]
      sm:h-[340px]
      sm:w-[340px]
      lg:h-[430px]
      lg:w-[430px]
    "
  >
    {!heroImageLoaded && (
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="
          absolute
          inset-0
          z-20
          flex
          items-center
          justify-center
          overflow-hidden
          rounded-full
          bg-white/[0.025]
          backdrop-blur-sm
        "
      >
        <motion.div
          className="
            absolute
            h-32
            w-32
            rounded-full
            bg-orange-500/20
            blur-3xl
            sm:h-44
            sm:w-44
          "
          animate={{
            scale: [0.8, 1.25, 0.8],
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="
            relative
            h-10
            w-10
            rounded-full
            border
            border-orange-400/20
            border-t-orange-400
            shadow-[0_0_25px_rgba(249,115,22,0.18)]
          "
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    )}

    <motion.img
      initial={{
        opacity: 0,
        scale: 1.08,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: heroImageLoaded ? 1 : 0,
        scale: heroImageLoaded ? 1 : 1.08,
        filter: heroImageLoaded ? "blur(0px)" : "blur(12px)",
        y: [0, -8, 0],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{
        opacity: {
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        },
        scale: {
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        },
        filter: {
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        },
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      src={heroData.foodImage}
      alt="Signature vegetarian dish"
      onLoad={() => setHeroImageLoaded(true)}
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className="
        relative
        z-10
        h-full
        w-full
        object-contain
        drop-shadow-[0_30px_45px_rgba(0,0,0,0.5)]
      "
    />
  </div>
            </motion.div>

            {/* Signature Badge */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.9,
              }}
              className="
                absolute
                bottom-5
                right-2
                z-20
                rounded-2xl
                border
                border-white/10
                bg-black/40
                px-4
                py-3
                shadow-[0_15px_40px_rgba(0,0,0,0.25)]
                backdrop-blur-xl
                sm:bottom-8
                sm:right-8
              "
            >
              <p
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-orange-400
                "
              >
                Signature
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  font-medium
                  text-white/55
                "
              >
                Freshly crafted
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM BAR
      ========================================================== */}

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
          delay: 1,
        }}
        className="
          absolute
          bottom-5
          left-5
          right-5
          z-20
          flex
          items-center
          justify-between
          border-t
          border-white/10
          pt-4
          sm:left-8
          sm:right-8
          lg:left-12
          lg:right-12
          xl:left-16
          xl:right-16
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <MapPin
            size={12}
            className="text-orange-400"
          />

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.17em]
              text-white/40
            "
          >
            {heroData.location}
          </span>
        </div>

        <span
          className="
            hidden
            text-[8px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-white/25
            sm:block
          "
        >
          Taste the warmth. Feel the spice.
        </span>

        <button
          type="button"
          onClick={scrollToMenu}
          className="
            group
            flex
            items-center
            gap-2
            text-[8px]
            font-bold
            uppercase
            tracking-[0.17em]
            text-white/45
            transition-colors
            duration-300
            hover:text-orange-400
          "
        >
          Explore Menu

          <span
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              transition-all
              duration-300
              group-hover:border-orange-400/40
              group-hover:bg-orange-500/10
            "
          >
            <ArrowDown
              size={11}
              className="
                transition-transform
                duration-300
                group-hover:translate-y-0.5
              "
            />
          </span>
        </button>
      </motion.div>

      {/* =========================================================
          DESKTOP SIDE ACCENT
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-32
          right-5
          top-32
          z-10
          hidden
          w-px
          bg-gradient-to-b
          from-transparent
          via-orange-400/20
          to-transparent
          lg:block
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-44
          right-2
          z-10
          hidden
          -rotate-90
          text-[7px]
          font-bold
          uppercase
          tracking-[0.35em]
          text-white/20
          lg:block
        "
      >
        Fresh • Pure • Vegetarian
      </div>

      {/* =========================================================
          MOBILE MENU
      ========================================================== */}

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        scrollToMenu={scrollToMenu}
      />
    </section>
  );
}

export default Hero;