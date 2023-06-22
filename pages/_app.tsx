import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "@/components/navigation/navigation.component";
import SmoothScroll from "@/components/scroll/scroll.component";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}
