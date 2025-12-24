import * as THREE from "three";
import { useRef, useState, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import {
  EffectComposer,
  DepthOfField,
  ToneMapping,
} from "@react-three/postprocessing";

const MODELS = [
  { path: "/road-cone.glb", scale: 0.5, weight: 2 },
  { path: "/car.glb", scale: 0.8, weight: 1 },
  { path: "/bike.glb", scale: 0.4, weight: 1.5 },
  { path: "/van.glb", scale: 0.7, weight: 1 },
];
const MODELS_COUNT = 100;
const LIGHT_COLOR = "orange";
const BACKGROUND_COLOR = "#ffbf40";

function FloatingObject({ index, z, speed, modelPath, scale = 1 }) {
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);

  // Load the 3D model
  const gltf = useGLTF(modelPath);

  // Local component state - initialized once and never recalculated (safe to mutate for performance)
  // This is the key: useState initializer only runs ONCE, so random values are stable across re-renders
  const [data] = useState({
    y: THREE.MathUtils.randFloatSpread(height * 1.5), // Reduced from 2 to 1.5 for denser packing
    x: THREE.MathUtils.randFloatSpread(1.2), // Reduced from 2 to 1.2 for denser packing
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  // Animation loop - speed prop updates are used here without resetting positions
  useFrame((state, dt) => {
    if (!ref.current) return;

    // Update position - speed changes affect movement without resetting position
    if (dt < 0.1) {
      ref.current.position.set(
        index === 0 ? 0 : data.x * width,
        (data.y += dt * speed),
        -z
      );
    }

    // Update rotation
    ref.current.rotation.set(
      (data.rX += dt / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += dt / data.spin)
    );

    // Reset position when object goes too far
    if (data.y > height * (index === 0 ? 4 : 1)) {
      data.y = -(height * (index === 0 ? 4 : 1));
    }
  });

  // Clone the scene and render it
  return <primitive ref={ref} object={gltf.scene.clone()} scale={scale} />;
}

// Scene component without Canvas (can be used inside any Canvas)
export function BackgroundModelsScene({
  speed,
  count,
  depth,
  modelPath,
  modelScale,
  models,
  backgroundColor,
  lightColor,
  easing,
}) {
  // Generate distribution of models - using useState to ensure stable shuffle
  const [objectsToRender] = useState(() => {
    // If models array is provided, use it; otherwise use single model
    if (models && Array.isArray(models) && models.length > 0) {
      const objects = [];
      let globalIndex = 0;

      // If counts are specified, use them
      const hasExplicitCounts = models.some((m) => m.count !== undefined);

      if (hasExplicitCounts) {
        // Use specified counts for each model
        models.forEach((model) => {
          const modelCount = model.count || Math.floor(count / models.length);
          for (let i = 0; i < modelCount; i++) {
            objects.push({
              index: globalIndex++,
              modelPath: model.path,
              scale: model.scale || modelScale,
            });
          }
        });
      } else {
        // Distribute randomly based on weights or evenly
        const totalWeight = models.reduce((sum, m) => sum + (m.weight || 1), 0);

        models.forEach((model) => {
          const weight = model.weight || 1;
          const modelCount = Math.round((weight / totalWeight) * count);

          for (let i = 0; i < modelCount; i++) {
            objects.push({
              index: globalIndex++,
              modelPath: model.path,
              scale: model.scale || modelScale,
            });
          }
        });
      }

      // Shuffle for random distribution (only happens once during initialization)
      return objects.sort(() => Math.random() - 0.5);
    } else {
      // Single model mode
      return Array.from({ length: count }, (_, i) => ({
        index: i,
        modelPath,
        scale: modelScale,
      }));
    }
  });

  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      <spotLight
        position={[10, 20, 10]}
        penumbra={1}
        decay={0}
        intensity={3}
        color={lightColor}
      />
      {/* Render multiple instances of 3D objects */}
      {objectsToRender.map((obj, i) => (
        <FloatingObject
          key={`${obj.modelPath}-${i}`}
          index={obj.index}
          z={Math.round(easing(i / objectsToRender.length) * depth)}
          speed={speed}
          modelPath={obj.modelPath}
          scale={obj.scale}
        />
      ))}
      <Environment preset="sunset" />
      <EffectComposer disableNormalPass multisampling={0}>
        <DepthOfField
          target={[0, 0, 60]}
          focalLength={1}
          bokehScale={0}
          height={10}
        />
        <ToneMapping />
      </EffectComposer>
    </>
  );
}

// Main component with Canvas wrapper (positioned as background)
export default function BackgroundModels({
  speed = 1,
  count = MODELS_COUNT,
  depth = 80,
  modelPath = "/road-cone.glb",
  modelScale = 1,
  models = MODELS, // Array of {path, count?, scale?, weight?}
  backgroundColor = BACKGROUND_COLOR,
  lightColor = LIGHT_COLOR,
  easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}) {
  return (
    <div className="canvas-layer">
      <Canvas
        flat
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 15, near: 0.01, far: depth + 15 }}
      >
        <Suspense fallback={null}>
          <BackgroundModelsScene
            speed={speed}
            count={count}
            depth={depth}
            modelPath={modelPath}
            modelScale={modelScale}
            models={models}
            backgroundColor={backgroundColor}
            lightColor={lightColor}
            easing={easing}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
