import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // 避免樣式被重複插入

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
