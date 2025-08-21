// components/ModelViewer.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Center } from "@react-three/drei";
import { Suspense } from "react";

function Model({
  rotation = [0, 0, 0],
  scale = 1,
}: {
  rotation?: [number, number, number];
  scale?: number;
}) {
  const { scene } = useGLTF("/models/pictureFrame.gltf");
  return (
    <group rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}
// 建議預載用正確路徑（和上面一致）
useGLTF.preload("/models/pictureFrame.gltf");

export default function ModelViewer() {
  return (
    <Canvas
      // 初始相機：位置、視角、裁切面
      camera={{ position: [4.2, 1.6, 6], fov: 20, near: 0.01, far: 200 }}
      dpr={[1, 2]}
      // className="border"
    >
      <Suspense fallback={null}>
        {/* 燈光隨喜好調整 */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={1} />

        {/* 只置中，不自動貼合（避免滾動時位移） */}
        <Center>
          {/* 初始角度 / 大小在這裡調 */}
          <Model rotation={[0, Math.PI / 8, 0]} scale={1} />
        </Center>

        {/* 控制：指定注視點與互動範圍 */}
        <OrbitControls
          target={[0, 0, 0]} // 看向的「中心點」高度（y 越大，視線越往上）
          minDistance={6} // 可拉最近距離
          maxDistance={8} // 可拉最遠距離
          maxPolarAngle={Math.PI * 0.49} // 限制不要翻到模型下面
          enableDamping
          dampingFactor={0.08}
        />

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
