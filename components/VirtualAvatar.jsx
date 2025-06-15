// components/VirtualAvatar.jsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";

function AvatarModel({ isTalking }) {
  const { scene } = useGLTF("/model.glb");
  const mouth = scene.getObjectByName("Mouth"); // You can name this in Blender

  useEffect(() => {
    let interval;
    if (isTalking && mouth) {
      interval = setInterval(() => {
        mouth.rotation.x = Math.sin(Date.now() * 0.01) * 0.2; // Simulate talking
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isTalking, mouth]);

  return <primitive object={scene} />;
}

export default function VirtualAvatar({ isTalking }) {
  return (
    <div className="w-full h-[400px] bg-black rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight />
        <directionalLight position={[0, 0, 5]} />
        <AvatarModel isTalking={isTalking} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
