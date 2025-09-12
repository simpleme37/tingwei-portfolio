// components/ModelViewer.jsx
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
function Model({ rotation = [0, 0, 0], scale = 1, imageUrl, active = true }) {
  const { scene } = useGLTF("/models/PictureFrameModal.gltf");

  // 1) 載入貼圖
  const tex = useTexture(imageUrl || "https://placehold.co/1024x1024");
  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.flipY = true;
    tex.anisotropy = 8;
    tex.needsUpdate = true;
  }, [tex]);

  // 2) 找到 Placeholder 平面
  const placeholder = useMemo(() => {
    const n = scene.getObjectByName("Placeholder");
    return n instanceof THREE.Mesh ? n : null;
  }, [scene]);

  // 3) UV / 材質初始化（只做一次）
  const didFixUV = useRef(false);
  useEffect(() => {
    if (!placeholder) return;

    if (!didFixUV.current) {
      const geo = placeholder.geometry;
      const uv = geo.attributes.uv;
      if (uv?.isBufferAttribute) {
        const arr = uv.array;
        for (let i = 1; i < arr.length; i += 2) arr[i] = 1 - arr[i];
        uv.needsUpdate = true;
      }
      didFixUV.current = true;
    }

    if (!(placeholder.material instanceof THREE.MeshBasicMaterial)) {
      placeholder.material = new THREE.MeshBasicMaterial({ toneMapped: false });
    }
  }, [placeholder]);

  // 4) 每次換圖只更新 map
  useEffect(() => {
    if (!placeholder) return;
    const mat = placeholder.material;
    mat.map = tex;
    mat.needsUpdate = true;
  }, [placeholder, tex]);

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

  // 6) 收集漂浮目標
  const floatTargets = useRef([]);
  const baseMap = useRef(new Map());

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
  }, [scene, floatNames]);

  // 7) 漂浮動畫
  useFrame((state) => {
    if (!active) return;

    const t = state.clock.getElapsedTime();
    const amp = 0.03;
    const speed = 0.7;
    const tilt = 0.02;

    floatTargets.current.forEach((o, i) => {
      const base = baseMap.current.get(o.uuid);
      if (!base) return;

      const phase = i * 0.8;
      o.position.y = base.y + Math.sin(t * speed + phase) * amp;
      o.rotation.x = base.rx + Math.sin(t * (speed * 0.6) + phase) * tilt;
      o.rotation.z = base.rz + Math.sin(t * (speed * 0.5) + phase) * tilt;
    });
  });

  return (
    <group rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/PictureFrameModal.gltf");

/** 進場鏡頭 */
function CameraDolly({
  controlsRef,
  play,
  onEnd,
  from = {
    pos: new THREE.Vector3(8, 2.4, 10),
    target: new THREE.Vector3(0, 0.2, 0),
  },
  to = {
    pos: new THREE.Vector3(4.2, 1.6, 6),
    target: new THREE.Vector3(0, 0, 0),
  },
  duration = 1200,
  delay = 100,
}) {
  const { camera } = useThree();
  const startTime = useRef(null);
  const [animating, setAnimating] = useState(true);
  const endedRef = useRef(false);
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    if (!play) return;
    endedRef.current = false;
    setAnimating(true);
    startTime.current = null;

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

    camera.position.lerpVectors(from.pos, to.pos, e);
    if (controlsRef.current) {
      controlsRef.current.target.lerpVectors(from.target, to.target, e);
      controlsRef.current.update();
    }

    if (k >= 1) {
      setAnimating(false);
      if (!endedRef.current) {
        endedRef.current = true;
        onEnd();
      }
    }
  });

  return null;
}

export default function ModelViewer({ active , once = false }) {
  const controlsRef = useRef(null);
  const [played, setPlayed] = useState(false);
  const shouldPlay = active && (!once || !played);

  const images = useMemo(
    () => ["/textures/42.png", "/textures/126.png", "/textures/222.png"],
    []
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    images.forEach((u) => useTexture.preload(u));
  }, [images]);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setIdx((v) => (v + 1) % images.length);
    }, 3500);
    return () => clearInterval(id);
  }, [active, images.length]);

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
      camera={{ position: [8, 2.4, 10], fov: 20, near: 0.01, far: 200 }}
      dpr={[1, 2]}
      frameloop={active ? "always" : "demand"}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={2} />

        <Center>
          <Model
            rotation={[0, Math.PI / 8, 0]}
            scale={1}
            imageUrl={images[idx]}
            active={active}
          />
        </Center>

        <CameraDolly
          controlsRef={controlsRef}
          play={shouldPlay}
          onEnd={() => setPlayed(true)}
          from={from}
          to={to}
          duration={1200}
          delay={100}
        />

        <OrbitControls
          ref={controlsRef}
          target={[0, 0.2, 0]}
          minDistance={7.2}
          maxDistance={8}
          maxPolarAngle={Math.PI * 0.49}
          enableDamping
          dampingFactor={0.08}
        />

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}