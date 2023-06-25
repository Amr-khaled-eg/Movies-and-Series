import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Navigation from "@/components/navigation/navigation.component";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import styles from "@/styles/app.module.css";
export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);
  return (
    <>
      <ClimbingBoxLoader
        color="#d3e1ff"
        size={22}
        className={styles.loading}
        loading={loading}
      />
      {!loading && (
        <>
          <Navigation />
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}
