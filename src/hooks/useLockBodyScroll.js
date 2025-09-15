import { useEffect } from "react";

export default function useLockBodyScroll(lock) {
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = "hidden"; // 禁止背景滾動
    } else {
      document.body.style.overflow = ""; // 還原
    }

    return () => {
      document.body.style.overflow = ""; // 確保離開時還原
    };
  }, [lock]);
}
