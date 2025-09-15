import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

export default function WebsiteEmbed({
  src,
  ratio = "16/9",
  viewportWidth = 1280,
  viewportHeight = 720,
  className,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // 建立並啟用一個 ResizeObserver & 動態計算 scale
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setScale(w / viewportWidth);
    });
    ro.observe(element);

    return () => ro.disconnect();
  }, [viewportWidth]);

  return (
    <div
      ref={containerRef}
      className={clsx("relative w-full", className)}
      style={{ aspectRatio: ratio }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          style={{
            width: viewportWidth,
            height: viewportHeight,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <iframe
            src={src}
            style={{ width: viewportWidth, height: viewportHeight }}
            loading="lazy"
            allowFullScreen
            className="border-8 border-green-500"
          />
        </div>
      </div>
    </div>
  );
}
