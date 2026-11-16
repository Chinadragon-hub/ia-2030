import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere, Box, Torus, Icosahedron, Octahedron, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { Model3DType } from '../data/slides';

interface ModelProps {
  activeModel: Model3DType;
  reducedMotion: boolean;
  lowPerf: boolean;
  aiLevelScale: number;
  dilemmaChoice: 'bright' | 'dark';
}

const wireBlue = new THREE.MeshStandardMaterial({
  color: '#1E6BFF',
  emissive: '#1E6BFF',
  emissiveIntensity: 0.6,
  wireframe: true,
});

const glassDark = new THREE.MeshPhysicalMaterial({
  color: '#0A1020',
  emissive: '#1E6BFF',
  emissiveIntensity: 0.25,
  metalness: 0.3,
  roughness: 0.15,
  transmission: 0.65,
  transparent: true,
  opacity: 0.88,
});

const cyanGlow = new THREE.MeshStandardMaterial({
  color: '#3DA5FF',
  emissive: '#3DA5FF',
  emissiveIntensity: 1.0,
});

const whiteCore = new THREE.MeshStandardMaterial({
  color: '#FFFFFF',
  emissive: '#A9D4FF',
  emissiveIntensity: 1.3,
});

export const ProceduralModels: React.FC<ModelProps> = ({
  activeModel,
  reducedMotion,
  lowPerf,
  aiLevelScale,
  dilemmaChoice,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const assembleScale = useRef(0.05);
  const prevModel = useRef<Model3DType>(activeModel);

  if (prevModel.current !== activeModel) {
    assembleScale.current = 0.05;
    prevModel.current = activeModel;
  }

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetScale = activeModel === 'ai-awakening' ? aiLevelScale : 1;
    assembleScale.current = THREE.MathUtils.lerp(assembleScale.current, targetScale, delta * 3.2);
    groupRef.current.scale.setScalar(assembleScale.current);

    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {activeModel === 'intro-explosion' && <IntroBrainExplosion lowPerf={lowPerf} />}
      {activeModel === 'holo-gates' && <HoloGatesModel />}
      {activeModel === 'time-tunnel' && <TimeTunnelModel />}
      {activeModel === 'neural-traversal' && <NeuralTraversalModel />}
      {activeModel === 'ai-awakening' && <AwakeningCoreModel />}
      {activeModel === 'superintelligence' && <SuperintelligenceGalaxy lowPerf={lowPerf} />}
      {activeModel === 'future-city' && <FutureCity2030 />}
      {activeModel === 'future-health' && <HealthNanobotsDNA />}
      {activeModel === 'robot-human' && <RobotHumanHandshake />}
      {activeModel === 'space-station' && <SpaceStationMars />}
      {activeModel === 'bci-head' && <BciHeadCloud />}
      {activeModel === 'dilemma-portal' && <DilemmaSplitPortal choice={dilemmaChoice} />}
      {activeModel === 'finale-earth' && <FinaleEarthCore />}
    </group>
  );
};

// 1. INTRO : POINT BLEU QUI EXPLOSE EN CERVEAU GÉANT + ÉCLAIRS
const IntroBrainExplosion: React.FC<{ lowPerf: boolean }> = ({ lowPerf }) => {
  const { nodes, arcs } = useMemo(() => {
    const count = lowPerf ? 28 : 54;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 1.65 + (i % 3) * 0.22;
      pts.push(
        new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi) * 1.2,
          r * Math.sin(theta) * Math.sin(phi) * 0.95,
          r * Math.cos(phi)
        )
      );
    }
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 1.35) lines.push([pts[i], pts[j]]);
      }
    }
    return { nodes: pts, arcs: lines };
  }, [lowPerf]);

  return (
    <group>
      <Sphere args={[0.35, 24, 24]} material={whiteCore} />
      <Icosahedron args={[1.25, 2]} material={glassDark} />
      <Icosahedron args={[1.28, 1]} material={wireBlue} />
      {nodes.map((p, i) => (
        <Sphere key={i} position={p} args={[i % 4 === 0 ? 0.08 : 0.05, 10, 10]} material={i % 4 === 0 ? whiteCore : cyanGlow} />
      ))}
      {arcs.map((l, i) => (
        <Line key={i} points={l} color={i % 3 === 0 ? '#FFFFFF' : '#3DA5FF'} lineWidth={1.3} transparent opacity={0.6} />
      ))}
    </group>
  );
};

// 2. MENU HOLOGRAPHIQUE À 6 PORTES
const HoloGatesModel: React.FC = () => {
  return (
    <group>
      <Sphere args={[0.45, 24, 24]} material={whiteCore} />
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <group key={i} position={[Math.cos(angle) * 1.9, Math.sin(angle) * 1.2, 0]} rotation={[0, 0, angle]}>
            <Box args={[0.6, 0.9, 0.06]} material={glassDark} />
            <Box args={[0.64, 0.94, 0.08]} material={wireBlue} />
          </group>
        );
      })}
      <Torus args={[1.9, 0.02, 16, 64]} material={cyanGlow} />
    </group>
  );
};

// 3. TUNNEL TEMPOREL 3D (1950 -> 2030)
const TimeTunnelModel: React.FC = () => {
  const ringsRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ringsRef.current) {
      ringsRef.current.position.z = ((ringsRef.current.position.z + delta * 1.8) % 1.2);
    }
  });

  return (
    <group ref={ringsRef} rotation={[0.15, -0.35, 0]}>
      {[-2.4, -1.2, 0, 1.2, 2.4].map((z, i) => (
        <group key={i} position={[0, 0, z]}>
          <Torus args={[1.55 - i * 0.1, 0.025, 16, 48]} material={i === 4 ? whiteCore : cyanGlow} />
          <Octahedron args={[0.2, 0]} position={[1.55 - i * 0.1, 0, 0]} material={whiteCore} />
        </group>
      ))}
      <Line points={[[0, 0, -3], [0, 0, 3]]} color="#3DA5FF" lineWidth={2} />
    </group>
  );
};

// 4. TRAVERSÉE DU RÉSEAU NEURONAL
const NeuralTraversalModel: React.FC = () => {
  const pulseRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const t = (clock.elapsedTime * 0.85) % 1;
      pulseRef.current.position.x = THREE.MathUtils.lerp(-2.0, 2.0, t);
      pulseRef.current.position.y = Math.sin(t * Math.PI * 3) * 0.7;
    }
  });

  const layers = [-2.0, -0.7, 0.7, 2.0];
  return (
    <group>
      <Sphere ref={pulseRef} args={[0.16, 16, 16]} material={whiteCore} />
      {layers.map((x, lIdx) => (
        <group key={lIdx} position={[x, 0, 0]}>
          {[-0.9, -0.3, 0.3, 0.9].map((y, nIdx) => (
            <group key={nIdx}>
              <Sphere position={[0, y, (nIdx % 2) * 0.5 - 0.25]} args={[0.13, 14, 14]} material={lIdx === 3 ? whiteCore : cyanGlow} />
              {lIdx < 3 && (
                <Line points={[[0, y, 0], [1.3, 0, 0]]} color="#1E6BFF" lineWidth={1.2} transparent opacity={0.55} />
              )}
            </group>
          ))}
        </group>
      ))}
    </group>
  );
};

// 5. ÉVEIL DE L'IA : SPHÈRE DE VERRE QUI RESPIRE & ANNEAUX ORBITAUX
const AwakeningCoreModel: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (coreRef.current) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 2.5) * 0.12;
      coreRef.current.scale.setScalar(pulse);
    }
    if (ring1.current) ring1.current.rotation.x += delta * 0.8;
    if (ring2.current) ring2.current.rotation.y += delta * 1.1;
  });

  return (
    <group>
      <Sphere ref={coreRef} args={[0.65, 32, 32]} material={whiteCore} />
      <Sphere args={[1.15, 32, 32]} material={glassDark} />
      <Torus ref={ring1} args={[1.55, 0.025, 16, 64]} material={cyanGlow} />
      <Torus ref={ring2} args={[1.85, 0.02, 16, 64]} rotation={[Math.PI / 3, 0, 0]} material={wireBlue} />
    </group>
  );
};

// 6. SUPERINTELLIGENCE : CERVEAU-PLANÈTE & GALAXIE DE SATELLITES
const SuperintelligenceGalaxy: React.FC<{ lowPerf: boolean }> = ({ lowPerf }) => {
  const satellites = useMemo(() => {
    const count = lowPerf ? 90 : 220;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.4 + Math.random() * 1.5;
      const angle = (i / count) * Math.PI * 12;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [lowPerf]);

  return (
    <group rotation={[0.3, 0, 0.15]}>
      <Icosahedron args={[1.05, 2]} material={glassDark} />
      <Icosahedron args={[1.08, 1]} material={wireBlue} />
      <Sphere args={[0.55, 24, 24]} material={whiteCore} />
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={satellites.length / 3} array={satellites} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#A9D4FF" size={0.07} transparent opacity={0.95} />
      </points>
      <Torus args={[2.2, 0.015, 16, 64]} rotation={[Math.PI / 2, 0, 0]} material={cyanGlow} />
    </group>
  );
};

// 7. CITÉ DU FUTUR 2030 : VILLE FLOTTANTE, TOURS EN VERRE & VOITURES VOLANTES
const FutureCity2030: React.FC = () => {
  const flyerRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (flyerRef.current) {
      const t = clock.elapsedTime * 1.4;
      flyerRef.current.position.x = Math.cos(t) * 1.7;
      flyerRef.current.position.z = Math.sin(t) * 1.7;
    }
  });

  const towers = [
    [-0.9, 1.4, -0.9], [0, 2.1, 0], [0.9, 1.6, -0.9],
    [-0.9, 1.2, 0.9], [0.9, 1.8, 0.9], [0, 1.3, 1.1]
  ];

  return (
    <group position={[0, -0.6, 0]}>
      <Cylinder args={[2.2, 1.4, 0.35, 8]} position={[0, -0.2, 0]} material={glassDark} />
      <Cylinder args={[2.25, 1.45, 0.38, 8]} position={[0, -0.2, 0]} material={wireBlue} />
      {towers.map(([x, h, z], i) => (
        <group key={i} position={[x, h / 2, z]}>
          <Box args={[0.45, h, 0.45]} material={glassDark} />
          <Box args={[0.47, h + 0.02, 0.47]} material={wireBlue} />
        </group>
      ))}
      <Torus args={[1.7, 0.015, 12, 48]} position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]} material={cyanGlow} />
      <group ref={flyerRef} position={[1.7, 1.2, 0]}>
        <Octahedron args={[0.15, 0]} material={whiteCore} />
      </group>
    </group>
  );
};

// 8. SANTÉ DU FUTUR : ADN HOLOGRAMME & NANOROBOTS DANS UNE ARTÈRE
const HealthNanobotsDNA: React.FC = () => {
  const nanoRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (nanoRef.current) {
      nanoRef.current.position.y = Math.sin(clock.elapsedTime * 2) * 0.9;
    }
  });

  return (
    <group rotation={[0, 0, 0.25]}>
      <Cylinder args={[1.15, 1.15, 3.2, 24, 1, true]} material={glassDark} />
      {Array.from({ length: 14 }).map((_, i) => {
        const y = (i - 6.5) * 0.22;
        const a = i * 0.5;
        return (
          <group key={i}>
            <Sphere position={[Math.cos(a) * 0.75, y, Math.sin(a) * 0.75]} args={[0.08, 12, 12]} material={cyanGlow} />
            <Sphere position={[Math.cos(a + Math.PI) * 0.75, y, Math.sin(a + Math.PI) * 0.75]} args={[0.08, 12, 12]} material={whiteCore} />
            <Line points={[[Math.cos(a) * 0.75, y, Math.sin(a) * 0.75], [Math.cos(a + Math.PI) * 0.75, y, Math.sin(a + Math.PI) * 0.75]]} color="#3DA5FF" lineWidth={1.5} />
          </group>
        );
      })}
      <group ref={nanoRef}>
        <Octahedron args={[0.16, 0]} position={[0, 0, 0]} material={whiteCore} />
      </group>
    </group>
  );
};

// 9. ROBOTS ET HUMAINS : POIGNÉE DE MAIN HOLOGRAPHIQUE
const RobotHumanHandshake: React.FC = () => {
  const sparkRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (sparkRef.current) {
      sparkRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 5) * 0.25);
    }
  });

  return (
    <group>
      {/* Silhouette Robot (Gauche) */}
      <group position={[-1.1, 0, 0]}>
        <Box args={[0.55, 0.55, 0.55]} position={[0, 1.1, 0]} material={wireBlue} />
        <Box args={[0.75, 1.2, 0.5]} position={[0, 0, 0]} material={glassDark} />
        <Line points={[[0.3, 0.3, 0], [1.1, 0.1, 0]]} color="#3DA5FF" lineWidth={3} />
      </group>
      {/* Silhouette Humaine (Droite) */}
      <group position={[1.1, 0, 0]}>
        <Sphere args={[0.32, 20, 20]} position={[0, 1.1, 0]} material={cyanGlow} />
        <Cylinder args={[0.35, 0.45, 1.2, 20]} position={[0, 0, 0]} material={glassDark} />
        <Line points={[[-0.3, 0.3, 0], [-1.1, 0.1, 0]]} color="#A9D4FF" lineWidth={3} />
      </group>
      {/* Point d'impact lumineux (Alliance) */}
      <Sphere ref={sparkRef} position={[0, 0.1, 0]} args={[0.24, 24, 24]} material={whiteCore} />
      <Torus position={[0, 0.1, 0]} args={[0.55, 0.02, 16, 48]} material={cyanGlow} />
    </group>
  );
};

// 10. ESPACE : TERRE BLEUE, STATION SPATIALE & TRAJECTOIRE VERS MARS
const SpaceStationMars: React.FC = () => {
  return (
    <group>
      {/* Terre */}
      <Sphere args={[1.1, 32, 32]} position={[-0.7, -0.2, 0]} material={glassDark} />
      <Sphere args={[1.13, 20, 20]} position={[-0.7, -0.2, 0]} material={wireBlue} />
      {/* Station Spatiale IA */}
      <Torus args={[0.45, 0.04, 16, 32]} position={[0.4, 0.6, 0.5]} material={whiteCore} />
      {/* Planète lointaine + Trajectoire */}
      <Sphere args={[0.42, 24, 24]} position={[1.7, 0.9, -0.6]} material={cyanGlow} />
      <Line
        points={[[-0.7, -0.2, 0], [0.4, 0.6, 0.5], [1.7, 0.9, -0.6]]}
        color="#FFFFFF"
        lineWidth={2.2}
      />
    </group>
  );
};

// 11. INTERFACE CERVEAU-MACHINE : TÊTE FILAIRE & NUAGE DE DONNÉES
const BciHeadCloud: React.FC = () => {
  return (
    <group position={[0, -0.3, 0]}>
      {/* Tête humaine stylisée en filaire */}
      <Sphere args={[0.85, 20, 20]} position={[0, -0.3, 0]} scale={[0.85, 1.1, 0.95]} material={wireBlue} />
      <Sphere args={[0.5, 16, 16]} position={[0, -0.2, 0]} material={cyanGlow} />
      {/* Nuage de données supérieur */}
      <Icosahedron args={[0.95, 1]} position={[0, 1.45, 0]} material={glassDark} />
      <Torus args={[1.25, 0.02, 16, 48]} position={[0, 1.45, 0]} rotation={[Math.PI / 2, 0, 0]} material={whiteCore} />
      {/* Fils de lumière neuraux */}
      {[-0.4, -0.15, 0.15, 0.4].map((x, i) => (
        <Line key={i} points={[[x, 0.2, 0], [x * 1.4, 1.35, 0]]} color="#FFFFFF" lineWidth={2} />
      ))}
    </group>
  );
};

// 12. DILEMME & FINALE : PORTAIL DIVISÉ / NOYAU PLANÉTAIRE
const DilemmaSplitPortal: React.FC<{ choice: 'bright' | 'dark' }> = ({ choice }) => {
  return (
    <group>
      <Torus args={[1.75, 0.05, 20, 64]} material={choice === 'bright' ? whiteCore : wireBlue} />
      <Sphere args={[1.15, 32, 32]} material={choice === 'bright' ? cyanGlow : glassDark} />
      <Icosahedron args={[1.45, 1]} material={wireBlue} />
    </group>
  );
};

const FinaleEarthCore: React.FC = () => {
  return (
    <group>
      <Sphere args={[0.85, 32, 32]} material={whiteCore} />
      <Sphere args={[1.55, 32, 32]} material={glassDark} />
      <Sphere args={[1.58, 24, 24]} material={wireBlue} />
      <Torus args={[2.1, 0.025, 16, 64]} rotation={[Math.PI / 3, 0.4, 0]} material={cyanGlow} />
      <Torus args={[2.35, 0.02, 16, 64]} rotation={[-Math.PI / 4, -0.4, 0]} material={whiteCore} />
    </group>
  );
};