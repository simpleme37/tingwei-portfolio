import { useEffect, useRef, useState } from "react";

export default function useScrollDirection({ startAt = 80, threshold = 12 }) {
  const [hidden, setHidden] = useState(false); // 一開始不隱藏
  const lastY = useRef(0); // 上一次的捲動位置

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || 0; // 目前捲到哪裡
      const delta = currentY - lastY.current; // 這次與上次的差值

      if (currentY > startAt && Math.abs(delta) > threshold) {
        // 超過啟動高度，且這次移動夠大 → 才切換
        setHidden(delta > 0); // 往下(正) -> 隱藏；往上(負) -> 顯示
      } else if (currentY <= startAt) {
        // 回到頂部附近就顯示
        setHidden(false);
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [startAt, threshold]);

  return hidden;
}
