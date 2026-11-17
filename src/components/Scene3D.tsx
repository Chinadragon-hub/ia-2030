import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Model3DType } from '../data/slides';
import { ProceduralModels } from './Models3D';

interface Scene3DProps {
  activeModel: Model3DType;
  cameraTarget: [number, number, number];
  reducedMotion: boolean;
  lowPerf: boolean;
  aiLevelScale: number;
  dilemmaChoice: 'bright' | 'dark';
}

const CameraAndParticles: React.FC<Scene3DProps> = ({
  activeModel,
  cameraTarget,
  reducedMotion,
  lowPerf,
  aiLevelScale,
  dilemmaChoice,
}) => {
  const starsRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const count = lowPerf ? 150 : 480;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 3;
    }
    return positions;
  }, [lowPerf]);

  useFrame((state, delta) => {
    const pointerX = reducedMotion ? 0 : state.pointer.x * 0.4;
    const pointerY = reducedMotion ? 0 : state.pointer.y * 0.3;

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      cameraTarget[0] + pointerX,
      delta * 2.4
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      cameraTarget[1] + pointerY,
      delta * 2.4
    );
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      cameraTarget[2],
      delta * 2.4
    );
    state.camera.lookAt(0, 0, 0);

    if (starsRef.current && !reducedMotion) {
      starsRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <>
      <ambientLight intensity={0.75} color="#A9D4FF" />
      <directionalLight position={[6, 8, 5]} intensity={1.9} color="#FFFFFF" />
      <pointLight position={[-6, -4, 4]} intensity={2.2} color="#1E6BFF" />
      <pointLight position={[4, 2, -3]} intensity={1.6} color="#3DA5FF" />

      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#3DA5FF" size={0.06} transparent opacity={0.65} />
      </points>

      {/* Modèles 3D positionnés en arrière-plan et décalés sur la gauche */}
      <group position={[-0.9, 0, -1.4]}>
        <ProceduralModels
          activeModel={activeModel}
          reducedMotion={reducedMotion}
          lowPerf={lowPerf}
          aiLevelScale={aiLevelScale}
          dilemmaChoice={dilemmaChoice}
        />
      </group>
    </>
  );
};

export const Scene3D: React.FC<Scene3DProps> = (props) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none holo-grid">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={props.lowPerf ? [1, 1] : [1, 1.75]}
        gl={{ antialias: !props.lowPerf, alpha: true, powerPreference: 'high-performance' }}
      >
        <CameraAndParticles {...props} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#05070D_95%)] opacity-90" />
    </div>
  );
};