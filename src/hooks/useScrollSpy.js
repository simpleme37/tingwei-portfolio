import { use, useEffect, useState } from "react";

export default function useScrollSpy(ids, offset = 110) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `-${offset}px 0px -70% 0px` } // 上面留 offset，下面留 70%
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // 初始判定：頁面載入時就先找出目前在畫面的 section
    const checkInitial = () => {
      const scrollY = window.scrollY + offset; // 把上方緩衝算進來
      let current = null;

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      });

      if (current) setActiveId(current);
    };
    checkInitial();

    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}
