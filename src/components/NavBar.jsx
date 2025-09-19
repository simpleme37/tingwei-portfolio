import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import useScrollSpy from "@/hooks/useScrollSpy";
import useScrollDirection from "@/hooks/useScrollDirection";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";

import NavLogo from "@/assets/icons/NavLogo";
import Flower from "@/assets/icons/Flower";
import Github from "@/assets/icons/Github";
import Smile from "@/assets/icons/Smile";
import Video from "@/assets/icons/Video";
import Menu from "@/assets/icons/Menu";
import Cancel from "@/assets/icons/Cancel";

const SECTIONS = [
  { id: "top", label: "Top" },
  { id: "about", label: "About" },
  { id: "frontend_lab", label: "Frontend Lab" },
  { id: "animation", label: "Animation" },
  { id: "model3d", label: "3D Model" },
  { id: "visuals", label: "Visual Works" },
];

export default function NavBar({
  items = SECTIONS,
  // className,
  // heightClass = "h-14 md:h-16",
  startAt = 96, // 捲動超過多少距離後才開始判斷
  threshold = 14, // 單次捲動差值超過多少才算有效
}) {
  const activeId = useScrollSpy(items.map((i) => i.id));
  const hidden = useScrollDirection({ startAt, threshold });
  const [open, setOpen] = useState(false); // 手機版選單開關
  const menuBtnRef = useRef(); // 手機版 menu 鈕的 ref

  useLockBodyScroll(open);

  const closeMenu = () => {
    setOpen(false);
    menuBtnRef.current?.focus(); // 關閉後把焦點還給漢堡鈕
  };

  // Esc 關閉
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  return (
    <>
      {/* 電腦版導覽列 */}
      <header
        className={clsx(
          "hidden md:block fixed top-[60px] inset-x-0 z-50 mx-5 transition-transform duration-300",
          hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        <nav className="mx-auto max-w-[1100px] w-full bg-white border border-gray-300 px-2 py-2 rounded-full">
          <ul className="flex flex-row justify-between">
            {items.map(({ id, label }) => {
              const isActive = activeId === id;

              return (
                <li key={id}>
                  <a
                    key={id}
                    href={`#${id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(
                      "whitespace-nowrap rounded-full px-4 py-1 text-body-lg font-medium transition-colors",
                      isActive
                        ? "bg-green-500 text-white"
                        : "text-gray-500 hover:text-green-500"
                    )}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* 手機：頂條（只有在未開啟時顯示） */}
      <header
        className={clsx(
          "bg-gray-100 md:hidden fixed top-0 inset-x-0 z-50 transition-all",
          hidden ? "-translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        <nav
          className={clsx(
            "flex flex-row px-5 py-2 border-b justify-between",
            open ? "bg-green-500 border-white" : "bg-gray-100 border-gray-300"
          )}
        >
          <NavLogo />
          <button
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            className={clsx(
              "cursor-pointer ",
              open ? "text-white" : "text-gray-500"
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            ref={menuBtnRef}
          >
            <Menu />
          </button>
        </nav>
      </header>

      {/* 手機：滿版 Menu（展開時取代頂條） */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed flex flex-col justify-between inset-0 z-50 bg-green-500 md:hidden overflow-y-auto text-white"
        >
          {/* 上：導覽列 */}
          <div className="flex flex-row px-5 py-2 justify-between">
            <NavLogo className="text-white" />
            <button
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              className={clsx(
                "cursor-pointer ",
                open ? "text-white" : "text-gray-500"
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Cancel />
            </button>
          </div>

          {/* 中：選單 */}
          <nav className="mt-14 px-6">
            <ul className="flex flex-col">
              {items.map(({ id, label }) => {
                const isActive = activeId === id;
                return (
                  <li
                    key={id}
                    className="text-center py-3.5 px-2 [&:not(:last-child)]:border-b border-white"
                  >
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={closeMenu}
                      role="tab"
                      aria-selected={isActive}
                      aria-current={isActive ? "page" : undefined}
                      className="flex gap-4 items-center justify-center font-normal whitespace-nowrap text-body-lg text-white active:opacity-80 active:scale-95"
                    >
                      {isActive && (
                        <Flower className="w-3.5 h-3.5 text-white" />
                      )}
                      {label}
                      {isActive && (
                        <Flower className="w-3.5 h-3.5 text-white" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 下：按鈕組合 */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <Link
              href="https://resume-xi-tan.vercel.app"
              target="_blank"
              className="flex items-center gap-2 cursor-pointer bg-white text-gray-500 border border-gray-300 rounded-full px-4 py-2"
            >
              <Smile />
              Resume
            </Link>

            <Link
              href="https://github.com/simpleme37"
              target="_blank"
              className="flex items-center gap-2 cursor-pointer bg-white text-gray-500 border border-gray-300 rounded-full px-4 py-2"
            >
              <Github />
              GitHub
            </Link>

            <Link
              href="https://drive.google.com/file/d/1p7aNVVioSAmS3NrakX9Y2WHFCCZHdtYg/view?usp=drive_link"
              target="_blank"
              className="flex items-center gap-2 cursor-pointer bg-white text-gray-500 border border-gray-300 rounded-full px-4 py-2"
            >
              <Video />
              Motion Portfolio
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
