function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-20 w-full border-t border-white/10 bg-black/40 px-6 py-16 text-white"
    >
      <div className="mx-auto max-w-7xl">

        {/* BRAND */}
        <h2 className="text-3xl font-black tracking-tight">
          HOT <span className="text-orange-500">&</span> SPICE
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-3 text-sm text-white/60">
          Pure vegetarian. Bold flavours.
        </p>

        {/* LOCATION */}
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-orange-500">
          Haridwar · Uttarakhand
        </p>

        {/* COPYRIGHT */}
        <div className="mt-10 border-t border-white/10 pt-5">
          <p className="text-xs text-white/40">
            © 2026 HOT & SPICE. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;