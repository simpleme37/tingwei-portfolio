import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import LabEmbed from "@/components/LabEmbed";
import ModelViewer from "@/components/ModelViewer";
import { GRAPHICS } from "@/data/graphics";
import { ANIMATION_2D } from "@/data/animations2d";
import { ANIMATION_WEB } from "@/data/animationsWeb";
import WobblyText from "@/components/WobblyText";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type Section = {
  id: string;
  nav: string;
  title: string;
  dark?: boolean;
};

const SECTIONS: Section[] = [
  { id: "top", nav: "Top", title: "Wei’s Portfolio" },
  { id: "about", nav: "About", title: "About", dark: true },
  { id: "frontend_lab", nav: "Frontend Lab", title: "Frontend Lab" },
  { id: "web_animation", nav: "Web Animation", title: "Web Animation" },
  { id: "2d_animation", nav: "2D Animation", title: "2D Animation" },
  { id: "3d_model", nav: "3D Model", title: "3D Model" },
  {
    id: "graphic_design",
    nav: "Graphic Design",
    title: "Graphic Design",
    dark: true,
  },
];

export default function Home() {
  const [open, setOpen] = useState(false); // 側邊欄開關
  const [activeId, setActiveId] = useState<string>("top"); // active 中的區塊
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const observer = useRef<IntersectionObserver | null>(null);

  const observeTargets = SECTIONS.map((s) => s.id);

  useEffect(() => {
    observer.current?.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) =>
            a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1
          );
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: "-50% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    observeTargets.forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [observeTargets]);

  const toggleMenu = () => setOpen((v) => !v);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <Head>
        <title>Ting Wei — Portfolio</title>
        <meta name="description" content="Ting Wei's portfolio site" />
      </Head>

      {/* 背景圖層 */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/img-bg.jpg')" }}
      />

      {/* 手機版漢堡 */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="md:hidden fixed right-6 top-6 z-20 text-white border border-white/40 bg-black/25 px-3 py-2 rounded-lg"
      >
        {open ? (
          <i className="fa-solid fa-xmark fa-lg" />
        ) : (
          <i className="fa-solid fa-bars fa-lg" />
        )}
      </button>

      {/* 側邊欄（桌機固定、手機抽屜） */}
      <aside
        className={clsx(
          "fixed z-10 h-screen overflow-hidden border-r border-cyan-500 bg-foreground p-12 text-white",
          "flex flex-col justify-between transition-transform duration-300",
          // 手機：預設關閉 + 全寬抽屜
          "-translate-x-full w-full",
          // 桌機：固定顯示 + 固定寬
          "md:translate-x-0 md:w-[270px]",
          // 手機打開時顯示
          open ? "translate-x-0" : ""
        )}
        aria-label="Sidebar"
      >
        {/* 標題 */}
        <div className="font-display text-h2">Ting Wei Lee</div>

        {/* 導覽清單 */}
        <nav className="mt-8 flex flex-col gap-3">
          {SECTIONS.map((s) => (
            <Link key={s.id} href={`#${s.id}`} onClick={closeMenu}>
              <span
                className={clsx(
                  "font-display relative cursor-pointer text-3xl transition-colors hover:text-cyan-300",
                  activeId === s.id ? "current-section" : ""
                )}
              >
                {s.nav}
              </span>
            </Link>
          ))}
        </nav>

        {/* 側邊連結 / 語言切換 */}
        <div className="flex flex-col gap-4">
          <Link
            href="https://resume-xi-tan.vercel.app/"
            target="_blank"
            className="block cursor-pointer border p-2 text-center font-display text-h3 hover:bg-white/20"
          >
            Resume
          </Link>
          <Link
            href="https://github.com/simpleme37"
            target="_blank"
            className="block cursor-pointer border p-2 text-center font-display text-h3 hover:bg-white/20"
          >
            Github
          </Link>
          <Link
            href="https://drive.google.com/file/d/1p7aNVVioSAmS3NrakX9Y2WHFCCZHdtYg/view?usp=drive_link"
            target="_blank"
            className="block cursor-pointer border p-2 text-center font-display text-h3 hover:bg-white/20"
          >
            Motion Portfolio
          </Link>

          {/* <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:bg-white/20 font-display text-h4">
              TW
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:bg-white/20 font-display text-h4">
              EN
            </button>
          </div> */}
        </div>
      </aside>

      {/* 主要內容（桌機預留側欄寬度） */}
      <main className="min-h-screen">
        <div className="relative w-full pl-0 md:pl-[270px]">
          {SECTIONS.map((s) => (
            <section
              key={s.id}
              id={s.id}
              ref={(el) => {
                sectionRefs.current[s.id] = el;
              }} // 這裡用大括號，不回傳值
              className={clsx(
                "flex h-screen w-full flex-col items-center justify-center border-b border-gray-500 font-display text-center",
                s.dark ? "bg-foreground text-white" : ""
              )}
            >
              {s.id === "top" ? (
                <WobblyText
                  text={s.title}
                  active={activeId === "top"} // 只有 top 在視窗時才 loop
                  duration={3.6}
                  delayStep={0.08}
                  className="mb-12 text-hero leading-tight font-display will-change-transform"
                />
              ) : (
                <h2 className="mb-12 text-hero leading-tight font-display">
                  {s.title}
                </h2>
              )}

              {/* 區塊:about */}
              {s.id === "about" && (
                <div className="mx-auto w-full max-w-[720px]">
                  <p className="font-sans">
                    具平面與動態設計背景，完成資策會前端課程的進修後，目前投入開發工作。
                    <br />
                    主要使用 React／Next.js 與
                    HTML、CSS（Bootstrap、Tailwind）、JavaScript 完成介面實作。
                    Three.js、Redux、TypeScript 目前為入門與練習中技能。
                    <br />
                    <br />
                    這個簡單的一頁式作品集網站整理了我在不同階段的作品與練習：包含網頁互動、基礎
                    3D 模型展示
                    與平面設計，多為功能或視覺的片段，以及舊專案的部分成果。
                  </p>
                </div>
              )}

              {/* 區塊:frontend lab */}
              {s.id === "frontend_lab" && (
                <div className="mx-auto w-full max-w-[1000px] px-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                  <LabEmbed
                    title="react weather demo"
                    src="https://react-weather-demo.vercel.app/"
                    caption="使用 react 練習串接 openweather API"
                  />
                  <LabEmbed
                    title="react weather demo"
                    src="https://react-weather-demo.vercel.app/"
                    caption="使用 react 練習串接 openweather API"
                  />
                </div>
              )}

              {/* 區塊：web animation */}
              {s.id === "web_animation" && (
                <div className="mx-auto w-full max-w-[1000px] px-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {ANIMATION_WEB.map((v) => (
                    <div key={v.id} className="relative aspect-[9/16]">
                      <ReactPlayer
                        src={`https://www.youtube.com/watch?v=${v.id}`}
                        width="100%"
                        height="100%"
                        controls
                        playsInline
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* 區塊：2d animation */}
              {s.id === "2d_animation" && (
                <div className="mx-auto grid w-[min(92%,1100px)] grid-cols-1 gap-6 md:grid-cols-2">
                  {ANIMATION_2D.map((v) => (
                    <div key={v.id} className="aspect-video">
                      <ReactPlayer
                        src={`https://youtu.be/${v.id}`}
                        width="100%"
                        height="100%"
                        controls
                        playsInline
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* 區塊：3d model */}
              {s.id === "3d_model" && (
                <div className="mx-auto w-full max-w-[1000px]">
                  {/* 16:9 比例盒；需要直式就改成 aspect-[9/16] */}
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    <div className="absolute inset-0">
                      <ModelViewer />
                    </div>
                  </div>
                </div>
              )}

              {/* 區塊：graphic design */}
              {s.id === "graphic_design" && (
                <div className="mx-auto w-full max-w-[1000px]">
                  <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
                    {GRAPHICS.map((item, i) => (
                      <div
                        key={i}
                        className="relative mb-4 break-inside-avoid w-full aspect-[1/1]"
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                          className="object-cover shadow-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}

          <footer className="flex items-center justify-center p-14 font-display text-h2">
            © {new Date().getFullYear()} Ting Wei Lee
          </footer>
        </div>
      </main>
    </>
  );
}
