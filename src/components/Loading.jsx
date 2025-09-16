import Flower from "@/assets/icons/Flower";
import { useState, useEffect } from "react";

export default function Loading({ show }) {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-gray-100 z-[9999] transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <Flower className={`w-12 h-12 animate-spin text-green-500`} />
    </div>
  );
}
