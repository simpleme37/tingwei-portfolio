import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

import NavBar from "@/components/NavBar";
import ModelViewer from "@/components/ModelViewer";
import ProjectCard from "@/components/ProjectCard";

import { PROJECTS } from "@/data/project";
import { ANIMATION_2D } from "@/data/animations2d";
import { ANIMATION_WEB } from "@/data/animationsWeb";
import { VISUAL_ROWS } from "@/data/visuals";

import Github from "@/assets/icons/Github";
import Smile from "@/assets/icons/Smile";
import Video from "@/assets/icons/Video";
import Flower from "@/assets/icons/Flower";
import heroMain from "@/assets/images/decos/hero-main.png";
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

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ting Wei — Portfolio</title>
        <meta name="description" content="Ting Wei's portfolio site" />
      </Head>

      <div className="px-5 pt-[70px] lg:pt-0 lg:px-0">
        <div className="max-w-[1100px] mx-auto relative">
          {/* navbar */}
          <NavBar />

          {/* Top */}
          <section
            id="top"
            className="min-h-screen flex flex-col items-center justify-center scroll-mt-24"
          >
            {/* 內層：置中 + 控制最大寬度 */}
            <div className="mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-20">
              {/* 文字欄：手機在下、桌機在左 */}
              <div className="order-2 lg:order-1 flex flex-col w-full lg:flex-1 lg:h-[520px] justify-between">
                <p className="font-display text-hero text-gray-900">
                  Wei’s <br />
                  Portfolio
                </p>
                <p className="font-display text-hero text-gray-900 flex items-center justify-between">
                  <span>2025</span>
                  <Flower className="w-12 h-12 text-green-500 hover:text-purple-500 transition-colors" />
                </p>
              </div>

              {/* 圖片欄：手機在上、桌機在右 */}
              <div className="order-1 lg:order-2 w-full lg:w-[520px] border border-gray-300 rounded-[20px] overflow-hidden">
                <Image
                  src={heroMain}
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
          <section
            id="about"
            className="min-h-screen flex items-center scroll-mt-24"
          >
            <div className="mx-auto w-full">
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

                  <div className="flex flex-col md:flex-row gap-2">
                    <Link
                      href="https://resume-xi-tan.vercel.app"
                      passHref
                      legacyBehavior
                      className="flex w-100"
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
                        <Video />
                        Motion Portfolio
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section
            id="tools_and_skills"
            className="min-h-screen flex items-center"
          >
            <div className="mx-auto w-full flex flex-col gap-8">
              <h2 className="w-full font-display text-h1 text-center">
                Tools & Skills
              </h2>
              <div className="flex flex-col w-fit gap-8 items-center mx-auto text-h3 font-display">
                <Image src={skillsMain} alt="" width={820} height={96} />
              </div>
            </div>
          </section>

          {/* Frontend Lab */}
          <section
            id="frontend_lab"
            className="min-h-screen py-[60px] md:py-[120px] flex items-center scroll-mt-24"
          >
            <div className="mx-auto w-full flex flex-col gap-8">
              <h2 className="w-full font-display text-h1">Frontend Lab</h2>
              {/* 網站卡片 */}
              {PROJECTS.map((item) => {
                return <ProjectCard key={item.href} {...item} />;
              })}
            </div>
          </section>

          {/* Animation */}
          <section
            id="animation"
            className="min-h-screen py-[60px] md:py-[120px] flex items-center scroll-mt-24"
          >
            <div className="mx-auto w-full flex flex-col gap-8">
              <h2 className="w-full font-display text-h1">Animation</h2>
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
            </div>
          </section>

          {/* 3D Model */}
          <section
            id="model3d"
            className="min-h-screen py-[60px] md:py-[120px] flex items-center scroll-mt-24"
          >
            <div className="mx-auto w-full flex flex-col gap-8">
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
          <section
            id="visuals"
            className="min-h-screen py-[60px] md:py-[120px] flex items-center scroll-mt-24"
          >
            <div className="mx-auto w-full flex flex-col gap-8">
              <h2 className="w-full font-display text-h1">Visual Works</h2>
              <div className="flex flex-col gap-4">
                {/* Row 1 */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <Image
                    src={logo01}
                    alt=""
                    className="w-full h-full object-cover"
                    width={782}
                    height={500}
                  />
                  <Image
                    src={logo02}
                    alt=""
                    className="w-full h-full object-cover"
                    width={510}
                    height={500}
                  />
                </div>
                {/* Row 2 */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <Image
                    src={badge3D}
                    alt=""
                    className="w-full h-full object-cover"
                    width={510}
                    height={500}
                  />
                  <Image
                    src={frame3D}
                    alt=""
                    className="w-full h-full object-cover"
                    width={782}
                    height={500}
                  />
                </div>
                {/* Row 3 */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <Image
                    src={socialMix}
                    alt=""
                    className="w-full h-full object-cover"
                    width={782}
                    height={500}
                  />
                  <Image
                    src={logo03}
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
          <section
            id="thanks"
            className="min-h-screen flex flex-col items-center justify-center"
          >
            {/* 內層：置中 + 控制最大寬度 */}
            <div className="mx-auto w-full flex flex-col items-center justify-between gap-6">
              <p className="font-display text-hero">Thanks :)</p>
              <span>© 2025 Ting Wei Lee</span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
