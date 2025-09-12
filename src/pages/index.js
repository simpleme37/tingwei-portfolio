import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Github from "../../public/icon/Github";
import Smile from "../../public/icon/Smile";
import ModelViewer from "@/components/ModelViewer";

import { ANIMATION_2D } from "@/data/animations2d";
import { ANIMATION_WEB } from "@/data/animationsWeb";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Home() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((v) => !v);
  const closeMenu = () => setOpen(false);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ting Wei — Portfolio</title>
        <meta name="description" content="Ting Wei's portfolio site" />
      </Head>

      <div className="px-5 lg:px-0">
        <div className="max-w-[1200px] mx-auto">
          {/* Hero */}
          <section className="min-h-screen flex flex-col items-center justify-center">
            {/* 內層：置中 + 控制最大寬度 */}
            <div className="mx-auto w-full max-w-[1100px] flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* 文字欄：手機在下、桌機在左 */}
              <div className="order-2 lg:order-1 flex flex-col justify-between lg:h-[520px]">
                <p className="font-display text-hero text-gray-900">
                  Wei’s <br />
                  Portfolio
                </p>
                <p className="font-display text-hero text-gray-900 flex items-center justify-between">
                  <span>2025</span>
                </p>
              </div>

              {/* 圖片欄：手機在上、桌機在右 */}
              <div className="order-1 lg:order-2 border border-gray-300 rounded-[20px] overflow-hidden">
                <Image
                  src="/images/img_hero_main.png"
                  alt="Hero main"
                  width={520}
                  height={520}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Scroll 按鈕：正常元素，用 gap 或 margin 拉開 */}
            <button
              type="button"
              className="bg-white text-gray-500 mt-18 inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm"
            >
              scroll
            </button>
          </section>

          {/* About */}
          <section className="min-h-screen flex items-center">
            <div className="mx-auto w-full max-w-[1100px]">
              <h2 className="w-full font-display text-h1">About</h2>
              <div className="flex flex-col gap-4">
                <p className="w-full">
                  大學主修設計，初期從事平面與動態設計，之後完成資策會前端課程，並投入開發工作。
                </p>
                <p className="w-full">
                  以 HTML、CSS（Bootstrap、Tailwind CSS） 與 JavaScript
                  為基礎，並搭配 React / Next.js
                  等框架進行介面開發。另外，也能使用 Figma
                  進行基礎版型規劃、元件設計。目前持續練習
                  Redux、Three.js、TypeScript，希望逐步拓展技能範圍。
                </p>
                <p className="w-full">
                  這個基礎作品集網站整理了我的一些作品與練習：包含網頁互動、基礎
                  3D
                  模型展示與小動畫，涵蓋小功能或視覺片段的嘗試，也收錄了部分舊專案成果。
                </p>

                <div className="w-full flex flex-col gap-4">
                  <p>👇 以下附上我的 網頁版履歷、GitHub 與動態作品集：</p>

                  <div className="flex gap-2">
                    <Link
                      href="https://resume-xi-tan.vercel.app"
                      passHref
                      legacyBehavior
                    >
                      <a className="flex items-center gap-2 cursor-pointer bg-white text-gray-500 border border-gray-300 rounded-full px-4 py-2">
                        <Smile />
                        Resume
                      </a>
                    </Link>

                    <Link
                      href="https://github.com/simpleme37"
                      passHref
                      legacyBehavior
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 cursor-pointer bg-white text-gray-500 border border-gray-300 rounded-full px-4 py-2"
                      >
                        <Github />
                        GitHub
                      </a>
                    </Link>

                    <Link
                      href="https://drive.google.com/file/d/1p7aNVVioSAmS3NrakX9Y2WHFCCZHdtYg/view?usp=drive_link"
                      passHref
                      legacyBehavior
                    >
                      <a className="flex items-center gap-2 cursor-pointer bg-white text-gray-500 border border-gray-300 rounded-full px-4 py-2">
                        <Github />
                        Motion Portfolio
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="min-h-screen flex items-center">
            <div className="mx-auto w-full max-w-[1100px] flex flex-col gap-8">
              <h2 className="w-full font-display text-h1 text-center">
                Tools & Skills
              </h2>
              <div className="flex flex-col w-fit gap-8 items-center mx-auto text-h3 font-display">
                <Image
                  src="/images/skills.svg"
                  alt=""
                  width={820}
                  height={96}
                />
                {/* <div className="inline-flex bg-green-500 text-white px-6 py-1 gap-9 origin-left -rotate-3">
                  <span>//</span>
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                </div>
                <div className="inline-flex bg-green-500 text-white px-6 py-1 gap-9 origin-left rotate-2">
                  <span>//</span>
                  <span>React</span>
                  <span>Next.js</span>
                  <span>Tailwind CSS</span>
                  <span>Bootstrap</span>
                </div>
                <div className="inline-flex bg-purple-500 text-white px-6 py-1 gap-9">
                  <span>//</span>
                  <span>Node.js</span>
                  <span>Express</span>
                  <span>MySQL</span>
                  <span>Git / GitHub</span>
                </div>
                <div className="inline-flex bg-gray-300 text-green-500 px-6 py-1 gap-9">
                  <span>//</span>
                  <span>Figma</span>
                  <span>Photoshop</span>
                  <span>After Effect</span>
                  <span>Blender</span>
                </div> */}
              </div>
            </div>
          </section>

          {/* Frontend Lab */}
          <section className="min-h-screen flex items-center">
            <div className="mx-auto w-full max-w-[1100px] flex flex-col gap-8">
              <h2 className="w-full font-display text-h1">Frontend Lab</h2>
              <div className="relative flex flex-col md:flex-row items-start gap-4">
                {/* 16:9、最大 576px，手機會等比縮小 */}
                <div className="w-full max-w-[576px] aspect-[16/9] rounded-[12px] overflow-hidden border border-gray-300 shrink-0">
                  <iframe
                    src="https://www.synerter.com/"
                    className="w-full h-full"
                    loading="lazy"
                    allowFullScreen
                    // width/height 屬性可省略
                  />
                </div>

                <div className="md:flex-1 space-y-2">
                  <Link
                    href={"https://www.synerter.com/"}
                    className="text-h3 font-semibold"
                  >
                    Synerter Official Website
                  </Link>
                  <p className="text-body mt-4 mb-2">
                    參與公司官網的前端開發，主要負責首頁、影片專區、註冊登入、關於我們、隱私政策等頁面。開發過程中著重元件化設計，以提升維護性與一致性。同時製作後台管理系統，讓行政人員可以直接更新網站內容，而不需重新部署。此專案讓我累積了商用網站的開發經驗，並體驗到前台與後台協作的完整流程。
                  </p>
                  <p className="text-gray-500">
                    #React #Vite #SQL #資料庫規劃 #RWD
                  </p>
                </div>

                <Image
                  src="/images/flowe_3_green.svg"
                  alt=""
                  width={240}
                  height={96}
                  // className="h-full w-full object-cover"
                  className="absolute bottom-0 right-0"
                />
              </div>
            </div>
          </section>

          {/* Animation */}
          <section className="min-h-screen flex items-center">
            <div className="mx-auto w-full max-w-[1100px] flex flex-col gap-8">
              <h2 className="w-full font-display text-h1">Animation</h2>
              {/* APP 動畫 */}
              <div className="px-6 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-4">
                {ANIMATION_WEB.map((v) => (
                  <div key={v.id} className="aspect-[16/9] md:aspect-[9/16]">
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
              {/* 2D 動畫 */}
              <div className="px-6 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </section>

          {/* 3D Model */}
          <section className="min-h-screen flex items-center">
            <div className="mx-auto w-full max-w-[1100px] flex flex-col gap-8">
              <h2 className="w-full font-display text-h1">3D Model</h2>
              <div
                className="relative w-full bg-white border-1 border-gray-300"
                style={{ aspectRatio: "16 / 9" }}
              >
                <div className="absolute inset-0">
                  <ModelViewer />
                </div>
              </div>
            </div>
          </section>

          {/* Visual Works */}
          <section className="min-h-screen flex items-center">
            <div className="mx-auto w-full max-w-[1100px] flex flex-col gap-8">
              <h2 className="w-full font-display text-h1">Visual Works</h2>
              <div className="flex flex-col gap-4">
                {/* Row 1 */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <Image
                    src="/images/img_logo_01.png"
                    alt=""
                    className="w-full h-full object-cover"
                    width={782}
                    height={500}
                  />
                  <Image
                    src="/images/img_logo_02.png"
                    alt=""
                    className="w-full h-full object-cover"
                    width={510}
                    height={500}
                  />
                </div>
                {/* Row 2 */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <Image
                    src="/images/img_3d_badge.png"
                    alt=""
                    className="w-full h-full object-cover"
                    width={510}
                    height={500}
                  />
                  <Image
                    src="/images/img_3d_frame.png"
                    alt=""
                    className="w-full h-full object-cover"
                    width={782}
                    height={500}
                  />
                </div>
                {/* Row 3 */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <Image
                    src="/images/img_graphic_01.png"
                    alt=""
                    className="w-full h-full object-cover"
                    width={782}
                    height={500}
                  />
                  <Image
                    src="/images/img_logo_03.png"
                    alt=""
                    className="w-full h-full object-cover"
                    width={510}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Thanks */}
          <section className="min-h-screen flex flex-col items-center justify-center">
            {/* 內層：置中 + 控制最大寬度 */}
            <div className="mx-auto w-full max-w-[1100px] flex flex-col items-center justify-between gap-6">
              <p className="font-display text-hero">Thanks :)</p>
              <span>© 2025 Ting Wei Lee</span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
