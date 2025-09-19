import { useEffect, useState, useRef } from "react";

export default function useInViewOnce(
  options = { rootMargin: "0px 0px -15px 0px", threshold: 0.2 }
) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView || !ref.current) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);

    io.observe(ref.current);
    return () => io.disconnect();
  }, [inView, options]);

  return [ref, inView];
}
