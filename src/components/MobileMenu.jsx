import { AnimatePresence, motion } from "motion/react";
import { X, ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";

function MobileMenu({
  isOpen,
  onClose,
  scrollToMenu,
}) {
  const handleNavigation = (target) => {
    onClose();

    if (target === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    if (target === "menu") {
      setTimeout(() => {
        scrollToMenu();
      }, 250);
      return;
    }

    setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 250);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* =================================================
              BACKDROP
          ================================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm lg:hidden"
          />

          {/* =================================================
              MOBILE MENU PANEL
          ================================================== */}
          <motion.aside
            initial={{
              opacity: 0,
              x: "100%",
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: "100%",
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="
              fixed
              right-0
              top-0
              z-[100]
              flex
              h-screen
              w-[86%]
              max-w-[390px]
              flex-col
              overflow-hidden
              border-l
              border-white/10
              bg-[#100906]/95
              shadow-[-20px_0_60px_rgba(0,0,0,0.45)]
              backdrop-blur-2xl
              lg:hidden
            "
          >
            {/* =================================================
                TOP
            ================================================== */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-5">
              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/30 bg-orange-500/[0.08]">
                  <span className="font-serif text-lg font-bold italic text-orange-400">
                    H
                  </span>

                  <span className="absolute inset-1 rounded-full border border-orange-400/10" />
                </div>

                <div className="leading-none">
                  <p className="font-serif text-[16px] font-bold italic tracking-wide text-[#f8eee4]">
                    HOT{" "}
                    <span className="text-orange-500">&</span>{" "}
                    SPICE
                  </p>

                  <p className="mt-1 text-[7px] font-medium tracking-[0.3em] text-white/35">
                    PURE VEGETARIAN
                  </p>
                </div>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
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
                  text-white/70
                  transition-all
                  duration-300
                  hover:border-orange-400/30
                  hover:bg-orange-500/10
                  hover:text-orange-400
                "
              >
                <X size={18} strokeWidth={1.7} />
              </button>
            </div>

            {/* =================================================
                NAVIGATION
            ================================================== */}
            <div className="flex flex-1 flex-col px-5 py-8">
              <p className="mb-5 text-[8px] font-semibold uppercase tracking-[0.35em] text-orange-400">
                Navigation
              </p>

              <nav className="flex flex-col">
                {/* HOME */}
                <button
                  type="button"
                  onClick={() => handleNavigation("home")}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/[0.07]
                    py-5
                    text-left
                  "
                >
                  <span className="text-[18px] font-medium tracking-wide text-white/85 transition-colors group-hover:text-orange-400">
                    Home
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="text-white/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-orange-400"
                  />
                </button>

                {/* MENU */}
                <button
                  type="button"
                  onClick={() => handleNavigation("menu")}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/[0.07]
                    py-5
                    text-left
                  "
                >
                  <span className="text-[18px] font-medium tracking-wide text-white/85 transition-colors group-hover:text-orange-400">
                    Menu
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="text-white/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-orange-400"
                  />
                </button>

                {/* SPECIAL */}
                <button
                  type="button"
                  onClick={() => handleNavigation("special")}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/[0.07]
                    py-5
                    text-left
                  "
                >
                  <span className="text-[18px] font-medium tracking-wide text-white/85 transition-colors group-hover:text-orange-400">
                    Special
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="text-white/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-orange-400"
                  />
                </button>

                {/* GALLERY */}
                <button
                  type="button"
                  onClick={() => handleNavigation("gallery")}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/[0.07]
                    py-5
                    text-left
                  "
                >
                  <span className="text-[18px] font-medium tracking-wide text-white/85 transition-colors group-hover:text-orange-400">
                    Gallery
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="text-white/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-orange-400"
                  />
                </button>
              </nav>

              {/* =================================================
                  ADMIN PANEL
              ================================================== */}
              <div className="mt-8">
                <p className="mb-4 text-[8px] font-semibold uppercase tracking-[0.35em] text-white/30">
                  Restaurant Management
                </p>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    window.location.href = "/admin";
                  }}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-orange-500/20
                    bg-orange-500/[0.07]
                    px-4
                    py-4
                    text-left
                    transition-all
                    duration-300
                    hover:border-orange-400/40
                    hover:bg-orange-500/10
                  "
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-500/10">
                      <ShieldCheck
                        size={17}
                        strokeWidth={1.6}
                        className="text-orange-400"
                      />
                    </span>

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-300">
                        Admin Panel
                      </p>

                      <p className="mt-1 text-[9px] text-white/35">
                        Restaurant management
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="text-orange-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </button>
              </div>

              {/* =================================================
                  LOCATION
              ================================================== */}
              <div className="mt-auto border-t border-white/[0.07] pt-5">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={13}
                    strokeWidth={1.5}
                    className="text-orange-400"
                  />

                  <span className="text-[9px] font-medium tracking-[0.25em] text-white/40">
                    HARIDWAR · INDIA
                  </span>
                </div>

                <p className="mt-3 text-[9px] leading-5 text-white/25">
                  Pure vegetarian flavours, freshly prepared with passion.
                </p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;