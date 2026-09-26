import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useRef } from "react";

/* =========================================================
   FLOATING 3D LIGHT PARTICLE
========================================================= */

function FloatingOrb({
  position,
  size,
  color,
  speed = 0.6,
}) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.getElapsedTime();

    ref.current.position.y =
      position[1] +
      Math.sin(time * speed + position[0]) * 0.12;

    ref.current.position.x =
      position[0] +
      Math.cos(time * speed * 0.5) * 0.04;

    ref.current.rotation.x += 0.001;
    ref.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />

      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

/* =========================================================
   THREE.JS ATMOSPHERE
========================================================= */

function WebsiteAtmosphere() {
  return (
    <>
      {/* Soft environment light */}
      <ambientLight intensity={0.35} />

      {/* Warm restaurant lighting */}
      <pointLight
        position={[3, 2, 2]}
        intensity={1.7}
        color="#ff6a21"
      />

      <pointLight
        position={[-3, 1, 2]}
        intensity={1.2}
        color="#ff9b52"
      />

      {/* Small floating particles */}

      <FloatingOrb
        position={[-2.5, 1.5, 0]}
        size={0.035}
        color="#ff8a45"
        speed={0.6}
      />

      <FloatingOrb
        position={[2.5, 1.2, 0]}
        size={0.04}
        color="#ffd3a3"
        speed={0.8}
      />

      <FloatingOrb
        position={[2.7, -1.4, 0]}
        size={0.025}
        color="#ff7133"
        speed={0.7}
      />

      <FloatingOrb
        position={[-2.3, -1.5, 0]}
        size={0.025}
        color="#ffd6b0"
        speed={0.9}
      />

      <FloatingOrb
        position={[0.5, -0.8, 0]}
        size={0.018}
        color="#ffffff"
        speed={0.7}
      />

      {/* Fine particles */}

      <Sparkles
        count={55}
        scale={[7, 6, 4]}
        size={1}
        speed={0.12}
        color="#ffe0bd"
        opacity={0.45}
      />
    </>
  );
}

/* =========================================================
   CRYSTAL / GLASS SHAPE
========================================================= */

function Crystal({
  className = "",
  style = {},
}) {
  return (
    <div
      className={`
        absolute
        pointer-events-none
        ${className}
      `}
      style={style}
    >
      {/* Main glass body */}

      <div
        className="
          absolute
          inset-0
          rotate-45
          rounded-[18%]
          border
          border-white/[0.16]
          bg-white/[0.025]
          backdrop-blur-[2px]
        "
      />

      {/* Orange inner reflection */}

      <div
        className="
          absolute
          inset-[15%]
          rotate-45
          rounded-[16%]
          border
          border-orange-300/[0.12]
          bg-orange-400/[0.025]
        "
      />

      {/* Bright crystal edge */}

      <div
        className="
          absolute
          left-[15%]
          top-[8%]
          h-[2px]
          w-[70%]
          rotate-45
          bg-gradient-to-r
          from-transparent
          via-white/50
          to-transparent
          blur-[0.5px]
        "
      />

      {/* Second reflection */}

      <div
        className="
          absolute
          right-[8%]
          top-[28%]
          h-[1px]
          w-[55%]
          rotate-[135deg]
          bg-gradient-to-r
          from-transparent
          via-orange-200/40
          to-transparent
        "
      />

      {/* Crystal glow */}

      <div
        className="
          absolute
          inset-[25%]
          rounded-full
          bg-orange-300/[0.06]
          blur-xl
        "
      />
    </div>
  );
}

/* =========================================================
   SHARP LIGHT REFLECTION
========================================================= */

function LightReflection({
  className = "",
}) {
  return (
    <div
      className={`
        pointer-events-none
        absolute
        h-px
        bg-gradient-to-r
        from-transparent
        via-white/30
        to-transparent
        blur-[0.5px]
        ${className}
      `}
    />
  );
}

/* =========================================================
   MAIN WEBSITE SCENE
========================================================= */

export default function WebsiteScene() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >

      {/* =====================================================
          VERY SUBTLE ATMOSPHERIC LIGHT
          These are NOT the main crystal effect.
      ===================================================== */}

      <div
        className="
          absolute
          left-[-10%]
          top-[25%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-orange-500/[0.07]
          blur-[110px]
        "
      />

      <div
        className="
          absolute
          right-[-10%]
          top-[45%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-orange-400/[0.06]
          blur-[110px]
        "
      />

      {/* =====================================================
          HERO CRYSTALS
      ===================================================== */}

      <Crystal
        className="
          left-[4%]
          top-[18%]
          h-20
          w-20
          opacity-60
          sm:left-[8%]
          sm:h-28
          sm:w-28
        "
      />

      <Crystal
        className="
          right-[7%]
          top-[25%]
          h-24
          w-24
          opacity-50
          sm:h-32
          sm:w-32
        "
      />

      <Crystal
        className="
          left-[24%]
          top-[12%]
          h-10
          w-10
          opacity-40
          sm:h-14
          sm:w-14
        "
      />

      {/* =====================================================
          MAIN LARGE GLASS CRYSTAL
      ===================================================== */}

      <Crystal
        className="
          left-[50%]
          top-[46%]
          h-32
          w-32
          -translate-x-1/2
          opacity-35
          sm:h-52
          sm:w-52
        "
      />

      {/* =====================================================
          MENU AREA CRYSTALS
      ===================================================== */}

      <Crystal
        className="
          left-[6%]
          top-[58%]
          h-24
          w-24
          opacity-40
          sm:left-[12%]
          sm:h-36
          sm:w-36
        "
      />

      <Crystal
        className="
          right-[5%]
          top-[62%]
          h-28
          w-28
          opacity-45
          sm:right-[12%]
          sm:h-40
          sm:w-40
        "
      />

      <Crystal
        className="
          left-[35%]
          top-[72%]
          h-12
          w-12
          opacity-35
          sm:h-20
          sm:w-20
        "
      />

      <Crystal
        className="
          right-[32%]
          top-[78%]
          h-16
          w-16
          opacity-30
          sm:h-24
          sm:w-24
        "
      />

      {/* =====================================================
          LOWER CRYSTAL PIECES
      ===================================================== */}

      <Crystal
        className="
          left-[-20px]
          top-[82%]
          h-32
          w-32
          opacity-30
          sm:left-[4%]
          sm:h-44
          sm:w-44
        "
      />

      <Crystal
        className="
          right-[-25px]
          top-[84%]
          h-36
          w-36
          opacity-30
          sm:right-[5%]
          sm:h-48
          sm:w-48
        "
      />

      {/* =====================================================
          SHARP GLASS REFLECTIONS
      ===================================================== */}

      <LightReflection
        className="
          left-[5%]
          top-[30%]
          w-[180px]
          rotate-[35deg]
          sm:w-[280px]
        "
      />

      <LightReflection
        className="
          right-[5%]
          top-[36%]
          w-[180px]
          rotate-[-35deg]
          sm:w-[300px]
        "
      />

      <LightReflection
        className="
          left-[18%]
          top-[68%]
          w-[220px]
          rotate-[-25deg]
          opacity-50
          sm:w-[360px]
        "
      />

      <LightReflection
        className="
          right-[18%]
          top-[74%]
          w-[220px]
          rotate-[25deg]
          opacity-50
          sm:w-[360px]
        "
      />

      {/* =====================================================
          SMALL GLASS HIGHLIGHTS
      ===================================================== */}

      <div
        className="
          absolute
          left-[18%]
          top-[42%]
          h-2
          w-2
          rounded-full
          bg-white/60
          shadow-[0_0_18px_rgba(255,255,255,0.7)]
        "
      />

      <div
        className="
          absolute
          right-[20%]
          top-[48%]
          h-1.5
          w-1.5
          rounded-full
          bg-orange-200/70
          shadow-[0_0_18px_rgba(255,160,80,0.8)]
        "
      />

      <div
        className="
          absolute
          left-[72%]
          top-[76%]
          h-2
          w-2
          rounded-full
          bg-white/50
          shadow-[0_0_16px_rgba(255,255,255,0.6)]
        "
      />

      {/* =====================================================
          THREE.JS LAYER
      ===================================================== */}

      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        dpr={[1, 1.25]}
        gl={{
          alpha: true,
          antialias: true,
        }}
      >
        <WebsiteAtmosphere />
      </Canvas>

    </div>
  );
}