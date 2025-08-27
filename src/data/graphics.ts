export type GraphicItem = {
  src: string;
  alt: string;
  title?: string;
  ratio?: "1/1" | "3/4" | "4/3" | "16/9";
  col?: 1 | 2 | 3; // 這張圖要橫跨幾欄
  row?: 1 | 2 | 3; // 這張圖要橫跨幾列
};

export const GRAPHICS: GraphicItem[] = [
  {
    src: "/graphics/nft_badge_dove.jpg",
    alt: "nft_badge_dove",
    title: "3D NFT 和平徽章",
    ratio: "1/1",
  },
  {
    src: "/graphics/logo_design.jpg",
    alt: "logo_design",
    title: "LOGO 設計發想",
    col: 2,
    row: 1,
  },
  {
    src: "/graphics/3d_frame_series.jpg",
    alt: "3d_frame_series",
    title: "3D NFT 相框",
    col: 3,
    row: 1,
  },
  {
    src: "/graphics/feminist_01.jpg",
    alt: "feminist_01",
    title: "社群圖設計#1",
  },
  {
    src: "/graphics/feminist_02.jpg",
    alt: "feminist_02",
    title: "社群圖設計#2",
  },
  {
    src: "/graphics/feminist_03.jpg",
    alt: "feminist_03",
    title: "社群圖設計#3",
  },
];
