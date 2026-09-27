import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const directionsUrl =
    "https://maps.app.goo.gl/9yrJVvgCa1Yc9s6UA";

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Soft Glow */}
      <div className="pointer-events-none absolute -left-32 bottom-0 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-0 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Top Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-5 py-8 sm:px-8">

        {/* ================= TWO COLUMNS ================= */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">

          {/* LEFT COLUMN */}
          <div>
            {/* Logo
            <h2 className="text-3xl font-black leading-[0.8] tracking-tight">
              <span className="block">HOT</span>
              <span className="ml-4 block text-orange-500">&amp;</span>
              <span className="ml-8 block">SPICE</span>
            </h2> */}

            <p className="mt-4 max-w-xs text-xs leading-5 text-white/45">
              Pure vegetarian flavours, freshly prepared with passion
              in the heart of Haridwar.
            </p>

            {/* Owner */}
            <div className="mt-4 flex items-center gap-2 text-xs text-white/55">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
              </svg>

              <span>
                Owner:{" "}
                <span className="font-semibold text-white/80">
                  Surendar Negi
                </span>
              </span>
            </div>

            {/* Vegetarian */}
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-[11px] font-medium text-green-400">
              <span>🌿</span>
              100% Vegetarian
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-center">

            {/* Contact */}
            <a
              href="tel:9568534206"
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 transition hover:border-orange-500/30 hover:bg-orange-500/10"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
                </svg>
              </div>

              <div>
                <p className="text-[10px] text-white/35">
                  Call Now
                </p>
                <p className="text-sm font-bold text-orange-400">
                  9568534206
                </p>
              </div>
            </a>

            {/* Info Row */}
            <div className="mt-3 grid grid-cols-2 gap-3">

              {/* Parking */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400">🚗</span>

                  <div>
                    <p className="text-[10px] text-white/30">
                      Parking
                    </p>
                    <p className="text-xs font-semibold text-white/75">
                      Available
                    </p>
                  </div>
                </div>
              </div>

              {/* Preparation */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400">⏱</span>

                  <div>
                    <p className="text-[10px] text-white/30">
                      Preparation
                    </p>
                    <p className="text-xs font-semibold text-white/75">
                      ~ 30 Min
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Directions Button */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-orange-500/25 bg-orange-500/10 px-4 py-2.5 text-xs font-semibold text-orange-400 transition hover:bg-orange-500/20"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              Get Directions
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">

          <p className="text-[10px] text-white/30">
            © {currentYear} HOT &amp; SPICE. All rights reserved.
          </p>

          <p className="text-[10px] text-white/25">
            Fresh • Vegetarian • Made with Care
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
