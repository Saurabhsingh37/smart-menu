import heroData from "../data/hero";

export default function CommonBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Background Image */}
      <div
        className="
          absolute inset-0
          bg-no-repeat
          bg-center
          bg-cover
        "
        style={{
          backgroundImage: `url(${heroData.backgroundImage})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#100906]/72" />

      {/* =================================
          ORIGINAL WARM RESTAURANT GLOWS
      ================================= */}

      <div
        className="
          absolute
          -left-32
          top-20
          h-96
          w-96
          rounded-full
          bg-orange-600/15
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -right-32
          top-[40%]
          h-96
          w-96
          rounded-full
          bg-orange-500/15
          blur-3xl
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-orange-500/[0.07]
          blur-3xl
        "
      />

      {/* =================================
          💎 CRYSTAL LIGHT SYSTEM
      ================================= */}

      {/* Crystal Light 01 - Top Right */}
      <div
        className="
          absolute
          right-[5%]
          top-[18%]
          h-64
          w-64
          rounded-full
          bg-white/[0.08]
          blur-[70px]
        "
      />

      {/* Crystal Light 02 - Top Right Orange */}
      <div
        className="
          absolute
          right-[12%]
          top-[25%]
          h-48
          w-48
          rounded-full
          bg-orange-300/[0.12]
          blur-[60px]
        "
      />

      {/* Crystal Light 03 - Left Middle */}
      <div
        className="
          absolute
          left-[3%]
          top-[38%]
          h-72
          w-72
          rounded-full
          bg-white/[0.06]
          blur-[80px]
        "
      />

      {/* Crystal Light 04 - Left Orange */}
      <div
        className="
          absolute
          left-[10%]
          top-[48%]
          h-52
          w-52
          rounded-full
          bg-orange-300/[0.11]
          blur-[65px]
        "
      />

      {/* =================================
          ✨ MENU AREA CRYSTAL LIGHTS
      ================================= */}

      {/* Large Center Crystal */}
      <div
        className="
          absolute
          left-1/2
          top-[62%]
          h-[460px]
          w-[460px]
          -translate-x-1/2
          rounded-full
          bg-white/[0.055]
          blur-[100px]
        "
      />

      {/* Center Orange Crystal */}
      <div
        className="
          absolute
          left-1/2
          top-[67%]
          h-[300px]
          w-[300px]
          -translate-x-1/2
          rounded-full
          bg-orange-400/[0.10]
          blur-[80px]
        "
      />

      {/* Menu Left Crystal */}
      <div
        className="
          absolute
          left-[15%]
          top-[68%]
          h-48
          w-48
          rounded-full
          bg-white/[0.07]
          blur-[65px]
        "
      />

      {/* Menu Right Crystal */}
      <div
        className="
          absolute
          right-[15%]
          top-[70%]
          h-56
          w-56
          rounded-full
          bg-white/[0.065]
          blur-[70px]
        "
      />

      {/* =================================
          🔶 DIAGONAL CRYSTAL REFLECTIONS
      ================================= */}

      <div
        className="
          absolute
          left-[18%]
          top-[60%]
          h-32
          w-[520px]
          rotate-[-18deg]
          rounded-full
          bg-orange-200/[0.07]
          blur-[55px]
        "
      />

      <div
        className="
          absolute
          right-[18%]
          top-[76%]
          h-28
          w-[420px]
          rotate-[22deg]
          rounded-full
          bg-white/[0.055]
          blur-[55px]
        "
      />

      {/* Small Crystal Sparks */}
      <div className="absolute left-[30%] top-[58%] h-20 w-20 rounded-full bg-white/[0.08] blur-2xl" />

      <div className="absolute right-[32%] top-[64%] h-24 w-24 rounded-full bg-orange-300/[0.10] blur-2xl" />

      <div className="absolute left-[8%] top-[76%] h-24 w-24 rounded-full bg-white/[0.06] blur-2xl" />

      <div className="absolute right-[7%] top-[60%] h-20 w-20 rounded-full bg-orange-200/[0.09] blur-2xl" />

      {/* Bottom Dark Fade */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-64
          bg-gradient-to-t
          from-[#100906]
          to-transparent
        "
      />
    </div>
  );
}