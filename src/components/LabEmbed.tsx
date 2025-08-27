import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type Props = {
  src: string;
  title: string;
  caption?: string;
  ratio?: string; // 外層「卡片」長寬比（例如 "16/10", "16/9"）
  viewportWidth?: number; // 想要模擬的桌機視窗寬度
  viewportHeight?: number; // 想要模擬的桌機視窗高度
  className?: string;
};

export default function LabEmbed({
  src,
  title,
  caption,
  ratio = "16/10",
  viewportWidth = 1280,
  viewportHeight = 800,
  className,
}: Props) {
  // 量測「卡片實際寬度」用，算出縮放倍率
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // 依卡片寬度動態計算縮放倍數：scale = 實際卡片寬 / 模擬視窗寬
  // 這樣可以維持 iframe 以「桌機寬度」渲染，再縮小塞進卡片
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width; // 卡片現在有多寬
      setScale(w / viewportWidth); // 算出要縮小多少
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, [viewportWidth]);

  return (
    <figure className={clsx("overflow-hidden", className)}>
      {/* 比例盒：只負責決定卡片外觀比例（不直接縮放內容） */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ aspectRatio: ratio }}
      >
        {/* 舞台層：鋪滿比例盒 & 可裁切超出部分 */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 真正的「桌機視窗」容器：用固定寬高 + transform: scale() 來縮放 */}
          <div
            style={{
              width: viewportWidth,
              height: viewportHeight,
              transform: `scale(${scale})`, // 依外層實際寬度做等比縮放
              transformOrigin: "top left", // 從左上角開始縮，才不會位移
            }}
          >
            <iframe
              src={src}
              title={title}
              style={{ width: viewportWidth, height: viewportHeight }}
              loading="lazy"
              allow="fullscreen; clipboard-write"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* 標題列 */}
      <div className="mt-2 font-sans text-h4 flex justify-center">
        {title}
        <Link
          href={src}
          target="_blank"
          className="ms-1 align-middle"
          aria-label="Open demo"
        >
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="inline-block text-body-lg transition-colors hover:text-cyan-500"
          />
        </Link>
      </div>
      {caption && (
        <div className="font-sans text-body text-black/70 dark:text-white/70">
          {caption}
        </div>
      )}
    </figure>
  );
}
