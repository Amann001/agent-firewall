"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core({ state }) {
  const group = useRef(null);
  const material = useRef(null);

  useFrame((_, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x += delta * 0.05;

    const target =
      state === "blocked"
        ? 1.35
        : state === "analyzing"
          ? 0.85
          : 0.35;

    if (material.current) {
      material.current.emissiveIntensity =
        THREE.MathUtils.lerp(
          material.current.emissiveIntensity,
          target,
          delta * 3
        );
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.55, 3]} />

        <meshBasicMaterial
          ref={material}
          color="#e7a83b"
          wireframe
          transparent
          opacity={0.82}
        />
      </mesh>

      <mesh scale={0.72}>
        <icosahedronGeometry args={[1.55, 2]} />

        <meshBasicMaterial
          color="#e7a83b"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry
          args={[2.05, 0.012, 12, 160]}
        />

        <meshBasicMaterial
          color="#e7a83b"
          transparent
          opacity={0.65}
        />
      </mesh>

      <mesh rotation={[0.35, 0, 0.65]}>
        <torusGeometry
          args={[2.35, 0.008, 10, 160]}
        />

        <meshBasicMaterial
          color="#d7d8d4"
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh rotation={[-0.45, 0.2, -0.3]}>
        <torusGeometry
          args={[2.55, 0.006, 10, 160]}
        />

        <meshBasicMaterial
          color="#e7a83b"
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}

export default function FirewallScene({
  state = "protected",
}) {
  return (
    <div className="relative h-[430px] w-full sm:h-[520px]">
      <Canvas
        camera={{
          position: [0, 0, 7.4],
          fov: 42,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={0.4} />

        <Float
          speed={1.2}
          rotationIntensity={0.15}
          floatIntensity={0.25}
        >
          <Core state={state} />
        </Float>

        <Sparkles
          count={65}
          scale={[6, 6, 6]}
          size={1.5}
          speed={0.22}
          color="#d9c18a"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.25}
          maxPolarAngle={Math.PI * 0.65}
          minPolarAngle={Math.PI * 0.35}
        />
      </Canvas>

      <div className="pointer-events-none absolute left-[10%] top-[25%] font-mono text-[9px] tracking-[0.2em] text-white/25">
        INPUT
      </div>

      <div className="pointer-events-none absolute right-[4%] top-[48%] font-mono text-[9px] tracking-[0.2em] text-white/25">
        DECISION
      </div>
    </div>
  );
}