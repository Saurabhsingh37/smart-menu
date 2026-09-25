import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingOrb({ position, size, color }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();

    ref.current.position.y =
      position[1] + Math.sin(t * 0.8 + position[0]) * 0.12;

    ref.current.rotation.x += 0.002;
    ref.current.rotation.y += 0.003;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />

      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        transparent
        opacity={0.65}
      />
    </mesh>
  );
}

function Atmosphere() {
  return (
    <>
      <ambientLight intensity={0.8} />

      <pointLight
        position={[2, 2, 2]}
        intensity={5}
        color="#ff6a21"
      />

      <pointLight
        position={[-3, -1, 2]}
        intensity={3}
        color="#ffb45c"
      />

      <FloatingOrb
        position={[-2.2, 1.4, 0]}
        size={0.035}
        color="#ff6b2c"
      />

      <FloatingOrb
        position={[2.1, 1.1, 0]}
        size={0.045}
        color="#ff9a42"
      />

      <FloatingOrb
        position={[2.4, -1, 0]}
        size={0.03}
        color="#ffd27c"
      />

      <FloatingOrb
        position={[-1.8, -1.2, 0]}
        size={0.025}
        color="#ff5722"
      />

      <Sparkles
        count={65}
        scale={[5, 4, 3]}
        size={1.4}
        speed={0.25}
        color="#ffb067"
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
        }}
      >
        <Atmosphere />
      </Canvas>
    </div>
  );
}