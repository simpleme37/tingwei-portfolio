import "@/styles/globals.css";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SpeedInsights />
      <Component {...pageProps} />
    </>
  );
}
