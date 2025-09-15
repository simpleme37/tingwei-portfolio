import badge3D from "@/assets/images/works/3d-badge.png";
import frame3D from "@/assets/images/works/3d-frame.png";
import logo01 from "@/assets/images/works/logo-01.png";
import logo02 from "@/assets/images/works/logo-02.png";
import logo03 from "@/assets/images/works/logo-03.png";
import socialMix from "@/assets/images/works/social-mix.png";

export type VisualItem = {
  src: any; // Next/Image 的 StaticImport
  alt?: string;
  width: number; // 用於 <Image>，決定原始比例
  height: number;
  basisLg?: string; // 可選：桌機時左右占比（例如 "basis-[60%]"）
};

export const VISUAL_ROWS: VisualItem[][] = [
  // Row 1: 60% / 40%
  [
    {
      src: logo01,
      alt: "",
      width: 782,
      height: 500,
      basisLg: "lg:basis-[60%]",
    },
    {
      src: logo02,
      alt: "",
      width: 510,
      height: 500,
      basisLg: "lg:basis-[40%]",
    },
  ],
  // Row 2: 40% / 60%
  [
    {
      src: badge3D,
      alt: "",
      width: 510,
      height: 500,
      basisLg: "lg:basis-[40%]",
    },
    {
      src: frame3D,
      alt: "",
      width: 782,
      height: 500,
      basisLg: "lg:basis-[60%]",
    },
  ],
  // Row 3: 60% / 40%
  [
    {
      src: socialMix,
      alt: "",
      width: 782,
      height: 500,
      basisLg: "lg:basis-[60%]",
    },
    {
      src: logo03,
      alt: "",
      width: 510,
      height: 500,
      basisLg: "lg:basis-[40%]",
    },
  ],
];
