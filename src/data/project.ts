export type ProjectItem = {
  title: string;
  href: string;
  description: string;
  tags: string[];
  embed: {
    src: string;
    ratio: string;
    viewportWidth: number;
    viewportHeight: number;
  };
  reverseOnDesktop: boolean;
};

export const PROJECTS: ProjectItem[] = [
  {
    title: "Synerter Official Website",
    href: "https://www.synerter.com/",
    description: "參與公司官網的前端開發，負責首頁、影片專區、註冊登入、關於我們、隱私政策等頁面。過程中實踐元件化設計來提升維護性，並一併製作後台管理系統，讓行政人員能直接更新內容而不必重新部署。",
    tags: ["React", "Vite", "RWD" ,"參與網站架構規劃", "前後台協作"],
    embed: { src: "https://www.synerter.com/", ratio: "16/10", viewportWidth: 1280, viewportHeight: 800 },
    reverseOnDesktop: false,
  },
  {
    title: "Redux Todo List",
    href: "https://redux-todo-list-flax.vercel.app/",
    description: "React + Redux Toolkit 待辦清單：新增/刪除、完成切換、標籤分類、番茄鐘、專注時間統計圖表。",
    tags: ["React", "Redux", "ReactDnD", "Chart.js", "Tailwind CSS", "RWD"],
    embed: { src: "https://redux-todo-list-flax.vercel.app/", ratio: "16/9", viewportWidth: 1280, viewportHeight: 720 },
    reverseOnDesktop: true,
  },
  {
    title: "React Weather Demo",
    href: "https://react-weather-demo.vercel.app/",
    description: "一個小型天氣查詢工具，串接 OpenWeather API 取得即時天氣資訊，並支援地區切換。",
    tags: ["React", "API串接", "RWD"],
    embed: { src: "https://react-weather-demo.vercel.app/", ratio: "16/9", viewportWidth: 1280, viewportHeight: 720 },
    reverseOnDesktop: false,
  },
];
