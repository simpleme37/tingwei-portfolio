import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import clsx from "clsx";

import useInViewOnce from "@/hooks/useInViewOnce";

import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import ModelViewer from "@/components/ModelViewer";
import ProjectCard from "@/components/ProjectCard";

import { PROJECTS } from "@/data/project";
import { ANIMATION_2D } from "@/data/animations2d";
import { ANIMATION_WEB } from "@/data/animationsWeb";

import Github from "@/assets/icons/Github";
import Smile from "@/assets/icons/Smile";
import Video from "@/assets/icons/Video";
import Flower from "@/assets/icons/Flower";
import heroMain from "@/assets/images/decos/hero-main.svg";
import skillsMain from "@/assets/images/decos/skills-main.svg";
import flowersGreen from "@/assets/images/decos/flowers-green.svg";
import flowersPurple from "@/assets/images/decos/flowers-purple.svg";
import badge3D from "@/assets/images/works/3d-badge.png";
import frame3D from "@/assets/images/works/3d-frame.png";
import logo01 from "@/assets/images/works/logo-01.png";
import logo02 from "@/assets/images/works/logo-02.png";
import logo03 from "@/assets/images/works/logo-03.png";
import socialMix from "@/assets/images/works/social-mix.png";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const fadeBase =
  "opacity-0 translate-y-2 motion-safe:transition-all motion-safe:duration-500";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const [refTop, inTop] = useInViewOnce();
  const [refAbout, inAbout] = useInViewOnce();
  const [refSkills, inSkills] = useInViewOnce();
  const [refFrontendLab, inFrontendLab] = useInViewOnce();
  const [refAnimation, inAnimation] = useInViewOnce();
  const [refModel3d, inModel3d] = useInViewOnce();
  const [refVisuals, inVisuals] = useInViewOnce();
  const [refThanks, inThanks] = useInViewOnce();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Ting Wei — Portfolio</title>
        <meta name="description" content="Ting Wei's portfolio site" />
      </Head>

      <Loading show={loading} />

      <NavBar />

      <main>
        {/* 手機版邊距 */}
        <div className="px-5 pt-[70px] lg:pt-0 lg:px-0">
          {/* 外容器：最大寬度 1100 px */}
          <div className="max-w-[1100px] mx-auto relative">
            {/* Top */}
            <section
              id="top"
              ref={refTop}
              data-inview={inTop}
              className={clsx(
                "min-h-screen flex flex-col items-center justify-center scroll-mt-24",
                fadeBase,
                inTop && !loading && "opacity-100 translate-y-0"
              )}
            >
              {/* 內層：置中 + 控制最大寬度 */}
              <div className="mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-20">
                {/* 文字欄：手機在下、桌機在左 */}
                <div className="order-2 lg:order-1 flex flex-col w-full lg:flex-1 lg:h-[520px] justify-between">
                  <h1 className="font-display text-h1 font-bold text-gray-900">
                    Wei’s <br />
                    Portfolio
                  </h1>
                  <p className="font-display text-h1 font-bold text-gray-900 flex items-center justify-between">
                    <span>2025</span>
                    <Flower className="w-12 h-12 text-green-500 hover:text-purple-500 transition-colors" />
                  </p>
                </div>

                {/* 圖片欄：手機在上、桌機在右 */}
                <div className="order-1 lg:order-2 w-full lg:w-[520px] border border-gray-300 rounded-[20px] overflow-hidden">
                  <Image
                    src={heroMain}
                    alt="Hero main"
                    priority
                    width={520}
                    height={520}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Scroll 按鈕：正常元素，用 gap 或 margin 拉開 */}
              <button
                type="button"
                className="bg-white text-gray-500 mt-18 inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-body"
              >
                scroll
              </button>
            </section>

            {/* About */}
            <section
              id="about"
              ref={refAbout}
              data-inview={inAbout}
              className={clsx(
                "min-h-screen flex items-center scroll-mt-24",
                fadeBase,
                inAbout && "opacity-100 translate-y-0"
              )}
            >
              <div className="mx-auto w-full">
                <h2 className="w-full font-display text-h2">About</h2>
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

                    <div className="flex flex-col md:flex-row gap-2">
                      <Link
                        href="https://resume-xi-tan.vercel.app"
                        className="flex items-center gap-2 cursor-pointer bg-white text-gray-500 border border-gray-300 rounded-full px-4 py-2 hover:bg-green-500 hover:text-white active:bg-green-500 active:text-white"
                      >
                        <Smile />
                        Resume
                      </Link>

                      <Link
                        href="https://github.com/simpleme37"
                        className="flex items-center gap-2 cursor-pointer bg-white text-gray-500 border border-gray-300 rounded-full px-4 py-2 hover:bg-green-500 hover:text-white active:bg-green-500 active:text-white"
                      >
                        <Github />
                        GitHub
                      </Link>

                      <Link
                        href="https://youtu.be/segiOjIYQ2U"
                        className="flex items-center gap-2 cursor-pointer bg-white text-gray-500 border border-gray-300 rounded-full px-4 py-2 hover:bg-green-500 hover:text-white active:bg-green-500 active:text-white"
                      >
                        <Video />
                        Motion Portfolio
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section
              id="tools_and_skills"
              ref={refSkills}
              data-inview={inSkills}
              className={clsx(
                "min-h-screen flex items-center scroll-mt-24",
                fadeBase,
                inSkills && "opacity-100 translate-y-0"
              )}
            >
              <div className="mx-auto w-full flex flex-col gap-8">
                <h2 className="w-full font-display text-h2 text-center">
                  Tools & Skills
                </h2>
                <div className="flex flex-col w-fit gap-8 items-center mx-auto text-h4 font-display">
                  <Image
                    src={skillsMain}
                    alt="Main Skills"
                    width={820}
                    height={96}
                    className="w-auto h-auto"
                  />
                </div>
              </div>
            </section>

            {/* Frontend Lab */}
            <section
              id="frontend_lab"
              ref={refFrontendLab}
              data-inview={inFrontendLab}
              className={clsx(
                "min-h-screen py-[60px] md:py-[120px] flex items-center scroll-mt-24",
                fadeBase,
                inFrontendLab && "opacity-100 translate-y-0"
              )}
            >
              <div className="mx-auto w-full flex flex-col gap-8">
                <h2 className="w-full font-display text-h2">Frontend Lab</h2>
                {/* 網站卡片 */}
                {PROJECTS.map((item) => {
                  return <ProjectCard key={item.href} {...item} />;
                })}
              </div>
            </section>

            {/* Animation */}
            <section
              id="animation"
              ref={refAnimation}
              data-inview={inAnimation}
              className={clsx(
                "min-h-screen py-[60px] md:py-[120px] flex items-center scroll-mt-24",
                fadeBase,
                inAnimation && "opacity-100 translate-y-0"
              )}
            >
              <div className="mx-auto w-full flex flex-col gap-8">
                <h2 className="w-full font-display text-h2">Animation</h2>
                {/* 說明文字 */}
                <div className="w-full">
                  <p className="text-h4 font-semibold">網頁 / APP 動畫</p>
                  <p className="text-body-lg mt-4">
                    使用 After Effects + Lottie JSON 製作，包含 APP Logo
                    的開場動態，以及應用內的互動動畫。
                  </p>
                </div>
                {/* APP 動畫 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                {/* 說明文字 */}
                <div className="w-full">
                  <p className="text-h4 font-semibold">開場動畫</p>
                  <p className="text-body-lg mt-4">
                    使用 After Effects 製作 2D Motion Graphic
                    開場動畫，用於小遊戲啟動時的呈現。
                  </p>
                </div>
                {/* 2D 動畫 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {/* 分隔線 */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 items-center sm:justify-between">
                  <span className="flex flex-row gap-2">
                    <Flower className="w-12 h-12 text-green-500/50 transition-colors" />
                    <Flower className="w-12 h-12 text-green-500/75 transition-colors" />
                    <Flower className="w-12 h-12 text-green-500 transition-colors" />
                  </span>
                  <span className="flex flex-row gap-2">
                    <Flower className="w-12 h-12 text-purple-500/50 transition-colors" />
                    <Flower className="w-12 h-12 text-purple-500/75 transition-colors" />
                    <Flower className="w-12 h-12 text-purple-500 transition-colors" />
                  </span>
                </div>
              </div>
            </section>

            {/* 3D Model */}
            <section
              id="model3d"
              ref={refModel3d}
              data-inview={inModel3d}
              className={clsx(
                "min-h-screen py-[60px] md:py-[120px] flex flex-col items-center scroll-mt-24",
                fadeBase,
                inModel3d && "opacity-100 translate-y-0"
              )}
            >
              <div className="mx-auto w-full flex flex-col gap-8">
                <h2 className="w-full font-display text-h2">3D Model</h2>
                <div
                  className="relative w-full bg-white border-1 border-gray-300"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <div className="absolute inset-0">
                    <ModelViewer />
                  </div>
                </div>
              </div>
              {/* 說明文字 */}
              <div className="w-full mt-4">
                <p className="text-h4 font-semibold">NFT 相框模型</p>
                <p className="text-body-lg mt-4 mb-2">
                  這是一個以 Blender
                  製作的小型相框模型，用來展示圖片，框內貼圖會動態更換。我將模型輸出為網頁格式，並透過
                  Three.js 進行基礎的展示。
                </p>
                <p className="text-gray-500">
                  3D model by Ting Wei; illustration (cat artwork) by @Yeh. Used
                  with permission.
                </p>
              </div>
            </section>

            {/* Visual Works */}
            <section
              id="visuals"
              ref={refVisuals}
              data-inview={inVisuals}
              className={clsx(
                "min-h-screen py-[60px] md:py-[120px] flex items-center scroll-mt-24",
                fadeBase,
                inVisuals && "opacity-100 translate-y-0"
              )}
            >
              <div className="mx-auto w-full flex flex-col gap-8">
                <h2 className="w-full font-display text-h2">Visual Works</h2>
                {/* 說明文字 */}
                <div className="w-full">
                  <p className="text-h4 font-semibold mb-2">
                    Logo設計、社群圖設計、3D模型的渲染圖
                  </p>
                  <p className="text-gray-500">
                    #Illustrator、Blender、Photoshop、Figma
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {/* Row 1 */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* 左圖 */}
                    <div className="group border border-gray-300 relative w-full lg:basis-[60%] aspect-[782/363] overflow-hidden">
                      <div className="w-full h-full overflow-hidden">
                        <Image
                          src={logo01}
                          alt="Logo 01"
                          fill
                          className="object-cover [inset:-1px]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-400 to-transparent flex items-end px-4 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-body-sm">
                            APP Logo 設計
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 右圖 */}
                    <div className="group border border-gray-300 relative w-full lg:basis-[40%] aspect-[510/363] overflow-hidden">
                      <div className="w-full h-full overflow-hidden">
                        <Image
                          src={logo02}
                          alt="Logo 02"
                          fill
                          className="object-cover [inset:-1px]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-400 to-transparent flex items-end px-4 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-body-sm">
                            APP Logo 設計
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 分隔線 */}
                  <div className="w-full h-2 bg-linear-to-r from-green-300 to-green-500"></div>

                  {/* Row 2 */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* 左圖 */}
                    <div className="group border border-gray-300 relative w-full lg:basis-[40%] aspect-[510/363] overflow-hidden">
                      <Image
                        src={badge3D}
                        alt="3D badge"
                        fill
                        className="object-cover [inset:-1px]"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-400 to-transparent flex items-end px-4 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-body-sm">
                          3D 徽章渲染與合成
                        </p>
                      </div>
                    </div>
                    {/* 右圖 */}
                    <div className="group border border-gray-300 relative w-full lg:basis-[60%] aspect-[782/363] overflow-hidden">
                      <Image
                        src={frame3D}
                        alt="3D frame"
                        fill
                        className="object-cover [inset:-1px]"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-400 to-transparent flex items-end px-4 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-body-sm">
                          3D NFT 相框製作
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 分隔線 */}
                  <div className="w-full h-2 bg-linear-to-r from-purple-700 to-purple-500"></div>

                  {/* Row 3 */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* 左圖 */}
                    <div className="group border border-gray-300 relative w-full lg:basis-[60%] aspect-[782/363] overflow-hidden">
                      <div className="w-full h-full overflow-hidden">
                        <Image
                          src={socialMix}
                          alt="Logo 01"
                          fill
                          className="object-cover [inset:-1px]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-400 to-transparent flex items-end px-4 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-body-sm">
                            APP 社群圖設計
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 右圖 */}
                    <div className="group border border-gray-300 relative w-full lg:basis-[40%] aspect-[510/363] overflow-hidden">
                      <div className="w-full h-full overflow-hidden">
                        <Image
                          src={logo03}
                          alt="Logo 02"
                          fill
                          className="object-cover [inset:-1px]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-400 to-transparent flex items-end px-4 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-body-sm">
                            APP Logo 設計
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 結尾區塊 */}
            <section
              id="thanks"
              ref={refThanks}
              data-inview={inThanks}
              className={clsx(
                "min-h-screen flex flex-col items-center justify-center",
                fadeBase,
                inThanks && "opacity-100 translate-y-0"
              )}
            >
              {/* 內層：置中 + 控制最大寬度 */}
              <div className="mx-auto w-full flex flex-col items-center justify-between gap-6">
                <p className="font-display text-h2">Thanks :)</p>
                <span>© 2025 Ting Wei Lee</span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
