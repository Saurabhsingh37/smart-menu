import { AnimatePresence, motion } from "motion/react";
import {
  X,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

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
      document
        .getElementById(target)
        ?.scrollIntoView({
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
            className="
              fixed
              inset-0
              z-[90]
              bg-black/65
              backdrop-blur-[2px]
              lg:hidden
            "
          />

          {/* =================================================
              COMPACT MOBILE MENU
          ================================================== */}

          <motion.aside
            initial={{
              opacity: 0,
              y: -15,
              x: 20,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -15,
              x: 20,
              scale: 0.97,
            }}
            transition={{
              duration: 0.28,
              ease: "easeOut",
            }}
            className="
              fixed
              right-3
              top-3
              z-[100]
              w-[88%]
              max-w-[350px]
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-[#100906]/95
              shadow-[0_25px_70px_rgba(0,0,0,0.55)]
              backdrop-blur-2xl
              lg:hidden
            "
          >
            {/* =================================================
                HEADER
            ================================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/[0.08]
                px-4
                py-3
              "
            >
              {/* Brand */}

              <div className="flex items-center gap-2.5">
                <div
                  className="
                    relative
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-orange-400/30
                    bg-orange-500/[0.08]
                  "
                >
                  <span
                    className="
                      font-serif
                      text-base
                      font-bold
                      italic
                      text-orange-400
                    "
                  >
                    H
                  </span>

                  <span
                    className="
                      absolute
                      inset-1
                      rounded-full
                      border
                      border-orange-400/10
                    "
                  />
                </div>

                <div className="leading-none">
                  <p
                    className="
                      font-serif
                      text-[15px]
                      font-bold
                      italic
                      tracking-wide
                      text-[#f8eee4]
                    "
                  >
                    HOT{" "}
                    <span className="text-orange-500">
                      &
                    </span>{" "}
                    SPICE
                  </p>

                  <p
                    className="
                      mt-1
                      text-[6px]
                      font-medium
                      tracking-[0.3em]
                      text-white/35
                    "
                  >
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
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.04]
                  text-white/60
                  transition-all
                  duration-300
                  hover:border-orange-400/30
                  hover:bg-orange-500/10
                  hover:text-orange-400
                "
              >
                <X
                  size={16}
                  strokeWidth={1.7}
                />
              </button>
            </div>

            {/* =================================================
                NAVIGATION
            ================================================== */}

            <div className="px-4 py-3">
              <p
                className="
                  mb-2
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-orange-400
                "
              >
                Navigation
              </p>

              <nav className="flex flex-col">
                {/* HOME */}

                <button
                  type="button"
                  onClick={() =>
                    handleNavigation("home")
                  }
                  className="
                    group
                    flex
                    h-11
                    items-center
                    justify-between
                    border-b
                    border-white/[0.07]
                    text-left
                  "
                >
                  <span
                    className="
                      text-[15px]
                      font-medium
                      tracking-wide
                      text-white/85
                      transition-colors
                      group-hover:text-orange-400
                    "
                  >
                    Home
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="
                      text-white/25
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-orange-400
                    "
                  />
                </button>

                {/* MENU */}

                <button
                  type="button"
                  onClick={() =>
                    handleNavigation("menu")
                  }
                  className="
                    group
                    flex
                    h-11
                    items-center
                    justify-between
                    border-b
                    border-white/[0.07]
                    text-left
                  "
                >
                  <span
                    className="
                      text-[15px]
                      font-medium
                      tracking-wide
                      text-white/85
                      transition-colors
                      group-hover:text-orange-400
                    "
                  >
                    Menu
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="
                      text-white/25
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-orange-400
                    "
                  />
                </button>

                {/* SPECIAL */}

                <button
                  type="button"
                  onClick={() =>
                    handleNavigation("special")
                  }
                  className="
                    group
                    flex
                    h-11
                    items-center
                    justify-between
                    border-b
                    border-white/[0.07]
                    text-left
                  "
                >
                  <span
                    className="
                      text-[15px]
                      font-medium
                      tracking-wide
                      text-white/85
                      transition-colors
                      group-hover:text-orange-400
                    "
                  >
                    Special
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="
                      text-white/25
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-orange-400
                    "
                  />
                </button>

                {/* GALLERY */}

                <button
                  type="button"
                  onClick={() =>
                    handleNavigation("gallery")
                  }
                  className="
                    group
                    flex
                    h-11
                    items-center
                    justify-between
                    text-left
                  "
                >
                  <span
                    className="
                      text-[15px]
                      font-medium
                      tracking-wide
                      text-white/85
                      transition-colors
                      group-hover:text-orange-400
                    "
                  >
                    Gallery
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="
                      text-white/25
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-orange-400
                    "
                  />
                </button>
              </nav>
            </div>

            {/* =================================================
                SMALL ADMIN STRIP
            ================================================== */}

            <div
              className="
                border-t
                border-white/[0.07]
                px-4
                py-3
              "
            >
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
                  rounded-xl
                  border
                  border-orange-500/15
                  bg-orange-500/[0.05]
                  px-3
                  py-2.5
                  transition-all
                  duration-300
                  hover:border-orange-400/30
                  hover:bg-orange-500/10
                "
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={14}
                    className="text-orange-400"
                  />

                  <span
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-orange-300
                    "
                  >
                    Admin Panel
                  </span>
                </div>

                <ArrowUpRight
                  size={14}
                  className="
                    text-orange-400
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;