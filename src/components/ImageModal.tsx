import { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

export type ImageModalItem = { src: string; alt: string; title?: string };

export default function ImageModal({
  open,
  index,
  items,
  onClose,
  onPrev,
  onNext,
  className,
}: {
  open: boolean;
  index: number | null;
  items: ImageModalItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  // 只在開啟時：鎖 body 捲動 + 監聽鍵盤
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, onPrev, onNext]);

  if (!open || index === null) return null;
  const item = items[index];

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[100] flex items-center justify-center",
        className
      )}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative z-10 w-[min(92vw,1100px)] h-[min(90svh,88vh)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 圖片 */}
        <div className="relative h-full w-full">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {/* 左右切換 */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous"
          disabled={index <= 0} // 用 disabled，不用 pointer-events-none
          className={clsx(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-md bg-black/50 px-3 py-2 text-white",
            "cursor-pointer hover:bg-black/70",
            "disabled:opacity-40 disabled:hover:bg-black/50 disabled:cursor-not-allowed"
          )}
        >
          ‹
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          disabled={index >= items.length - 1}
          className={clsx(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-md bg-black/50 px-3 py-2 text-white",
            "cursor-pointer hover:bg-black/70",
            "disabled:opacity-40 disabled:hover:bg-black/50 disabled:cursor-not-allowed"
          )}
        >
          ›
        </button>

        {(item.title || item.alt) && (
          <div className="mt-3 text-center text-white/85">
            {item.title ?? item.alt}
          </div>
        )}
      </div>
    </div>
  );
}
