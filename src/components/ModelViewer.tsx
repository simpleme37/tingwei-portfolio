// components/ModelViewer.tsx
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  Center,
  useTexture,
} from "@react-three/drei";
import { Suspense, useEffect, useState, useRef, useMemo } from "react";
import * as THREE from "three";

/** 模型載入與行為（ 貼圖、小物件漂浮 ） */
function Model({
  rotation = [0, 0, 0],
  scale = 1,
  imageUrl,
  active = true,
}: {
  rotation?: [number, number, number];
  scale?: number;
  imageUrl?: string;
  active?: boolean;
}) {
  const { scene } = useGLTF("/models/PictureFrameModal.gltf");

  // 1) 載入貼圖（ 每次 imageUrl 變動就會取到新的 texture ）
  const tex = useTexture(imageUrl || "https://placehold.co/1024x1024");
  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace; // 色彩空間
    tex.flipY = true; // 垂直翻轉，通常用 false
    tex.anisotropy = 8; // 銳利度
    tex.needsUpdate = true;
  }, [tex]); // 依賴：僅針對「這張貼圖」做設定

  // 2) 抓到用來顯示圖片的平面 ( 只找一次、避免每次 render 遍歷整棵樹 )
  const placeholder = useMemo(() => {
    const n = scene.getObjectByName("Placeholder");
    return n && (n as any).isMesh ? (n as THREE.Mesh) : null;
  }, [scene]);

  // 3) UV / 材質初始化（只做一次）
  const didFixUV = useRef(false);
  useEffect(() => {
    if (!placeholder) return;

    // UV 修正只做一次
    if (!didFixUV.current) {
      const geo = placeholder.geometry as THREE.BufferGeometry;
      const uv = geo.attributes.uv as THREE.BufferAttribute | undefined;
      if (uv?.isBufferAttribute) {
        const arr = uv.array as Float32Array;
        for (let i = 1; i < arr.length; i += 2) arr[i] = 1 - arr[i];
        uv.needsUpdate = true;
      }
      didFixUV.current = true;
    }

    // 確保用 Basic 材質顯示貼圖（ 避免受燈光影響 ）
    if (!(placeholder.material instanceof THREE.MeshBasicMaterial)) {
      placeholder.material = new THREE.MeshBasicMaterial({ toneMapped: false });
    }
  }, [placeholder]); // 依賴：只在抓到節點時做初始化

  // 4) 每次換圖僅更新 map（ 不重建材質、不再動 UV ）
  useEffect(() => {
    if (!placeholder) return;
    const mat = placeholder.material as THREE.MeshBasicMaterial;
    mat.map = tex;
    mat.needsUpdate = true;
  }, [placeholder, tex]); // ← 固定兩個依賴

  // 5) 定義要漂浮的節點清單
  const floatNames = useMemo(
    () => [
      "Circle_01",
      "Circle_02",
      "Circle_03",
      "Spiral",
      "Cross_01",
      "Cross_02",
      "Dialog",
      "Spark_01",
      "Spark_02",
      "Spark_03",
      "Spark_04",
    ],
    []
  );

  // 6) 收集要漂浮的目標與它們的「原始局部位置/旋轉」（供回位用）
  const floatTargets = useRef<THREE.Object3D[]>([]);
  const baseMap = useRef<Map<string, { y: number; rx: number; rz: number }>>(
    new Map()
  );

  useEffect(() => {
    floatTargets.current = [];
    baseMap.current.clear();

    floatNames.forEach((name) => {
      const o = scene.getObjectByName(name);
      if (o) {
        floatTargets.current.push(o);
        baseMap.current.set(o.uuid, {
          y: o.position.y,
          rx: o.rotation.x,
          rz: o.rotation.z,
        });
      }
    });

    // 除錯：需要時開啟以確認節點名稱
    // scene.traverse((o) => o.name && console.log(o.name, "-", o.type));
  }, [scene, floatNames]);

  // 7) 以「原始局部座標」為中心做微幅上下/擺動
  useFrame((state) => {
    if (!active) return; // 不在視窗就不跑

    const t = state.clock.getElapsedTime();
    const amp = 0.03; // 漂浮幅度
    const speed = 0.7; // 漂浮速度
    const tilt = 0.02; // 輕微擺動

    floatTargets.current.forEach((o, i) => {
      const base = baseMap.current.get(o.uuid);
      if (!base) return;

      // 每個物件不同 phase，避免整齊同步
      const phase = i * 0.8;

      // 在「局部 space」上下一點點
      o.position.y = base.y + Math.sin(t * speed + phase) * amp;
      // 一點微微旋轉（更有漂浮感）
      o.rotation.x = base.rx + Math.sin(t * (speed * 0.6) + phase) * tilt;
      o.rotation.z = base.rz + Math.sin(t * (speed * 0.5) + phase) * tilt;
      // 注意：不改 position.x/z，避免水平飄移
    });
  });

  // 回傳：把整個場景包在 group 裡以便外層控制 rotation / scale
  return (
    <group rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

// 建議預載用正確路徑（和上面一致）
useGLTF.preload("/models/PictureFrameModal.gltf");

/** 進場鏡頭 */
function CameraDolly({
  controlsRef,
  play, // 外部控制是否播放
  onEnd, // 播完通知父層
  from = {
    pos: new THREE.Vector3(8, 2.4, 10),
    target: new THREE.Vector3(0, 0.2, 0),
  },
  to = {
    pos: new THREE.Vector3(4.2, 1.6, 6),
    target: new THREE.Vector3(0, 0, 0),
  },
  duration = 1200, // 動畫時間
  delay = 100, // 開始前延遲
}: {
  controlsRef: React.RefObject<any>;
  play: boolean;
  onEnd?: () => void;
  from?: { pos: THREE.Vector3; target: THREE.Vector3 };
  to?: { pos: THREE.Vector3; target: THREE.Vector3 };
  duration?: number;
  delay?: number;
}) {
  const { camera } = useThree();
  const startTime = useRef<number | null>(null);
  const [animating, setAnimating] = useState(true);
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  // 當 play 為 true 時，初始化起點並開始
  useEffect(() => {
    if (!play) return;

    // 放在遠一點的起點
    camera.position.copy(from.pos);
    if (controlsRef.current) {
      controlsRef.current.target.copy(from.target);
      controlsRef.current.update();
    }
    const id = setTimeout(() => {
      startTime.current = performance.now();
    }, delay);
    return () => clearTimeout(id);
  }, [play, camera, controlsRef, from, delay]);

  useFrame(() => {
    if (!animating || startTime.current == null) return;

    const t = (performance.now() - startTime.current) / duration;
    const k = Math.min(1, Math.max(0, t));
    const e = ease(k);

    // 依比例插值相機位置與控制目標
    camera.position.lerpVectors(from.pos, to.pos, e);
    if (controlsRef.current) {
      controlsRef.current.target.lerpVectors(from.target, to.target, e);
      controlsRef.current.update();
    }

    if (k >= 1) {
      setAnimating(false);
    }
  });

  return null;
}

export default function ModelViewer({
  active,
  once = false,
}: {
  active: boolean; // 父層告訴我這個 section 是否在視窗內
  once?: boolean; // 只播一次
}) {
  // OrbitControls 需要 ref 才能在動畫中更新 target / enabled
  const controlsRef = useRef<any>(null);
  const [played, setPlayed] = useState(false);
  const shouldPlay = active && (!once || !played);

  // 圖片輪播清單、索引
  const images = useMemo(
    () => ["/textures/42.png", "/textures/126.png", "/textures/222.png"],
    []
  );
  const [idx, setIdx] = useState(0);

  // 圖片預載
  useEffect(() => {
    images.forEach((u) => useTexture.preload(u));
  }, [images]);

  // 自動輪播 ( 只有 active 才啟動 )
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setIdx((v) => (v + 1) % images.length);
    }, 3500);
    return () => clearInterval(id);
  }, [active, images.length]);

  // 手動切換下一張
  // const next = () => setIdx((v) => (v + 1) % images.length);

  const from = useMemo(
    () => ({
      pos: new THREE.Vector3(8, 2.4, 10),
      target: new THREE.Vector3(0, 0.2, 0),
    }),
    []
  );

  const to = useMemo(
    () => ({
      pos: new THREE.Vector3(4.2, 1.6, 6),
      target: new THREE.Vector3(0, 0, 0),
    }),
    []
  );

  return (
    <Canvas
      camera={{ position: [8, 2.4, 10], fov: 20, near: 0.01, far: 200 }} // 初始相機：位置、視角、裁切面
      dpr={[1, 2]}
      frameloop={active ? "always" : "demand"} // 不在視窗時降低成本：停止自動重繪
      // className="border"
    >
      <Suspense fallback={null}>
        {/* 燈光 */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={2} />

        {/* 置中 */}
        <Center>
          {/* 初始角度 / 大小 */}
          <Model
            rotation={[0, Math.PI / 8, 0]}
            scale={1}
            imageUrl={images[idx]}
            active={active}
          />
        </Center>

        {/* 進場鏡頭：從 from 緩動到 to */}
        <CameraDolly
          controlsRef={controlsRef}
          play={shouldPlay}
          onEnd={() => setPlayed(true)}
          from={from}
          to={to}
          duration={1200}
          delay={100}
        />

        {/* 控制器（ 初始 target 與 CameraDolly 的 from.target 對齊 ） */}
        <OrbitControls
          ref={controlsRef}
          target={[0, 0.2, 0]} // 看向的「 中心點 」高度（ y 越大，視線越往上 ）
          minDistance={7.2} // 可拉最近距離
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
