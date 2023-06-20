import "../globals.css";
import { Inter } from "next/font/google";
import HomeLayout from "./home/layout";
import { SWRConfig } from "swr";
import fetchJSON from "../lib/fetchJson";
import { initializeFirebaseApp } from '../lib/firebase'

const inter = Inter({ weight: "600", subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) { 

  initializeFirebaseApp();
  
  return (
    <SWRConfig
      value={{
        fetcher: fetchJSON,
        onError: (err) => {
          console.error(`[_APP]: SWR ISSUE: ${err}`);
        },
      }}
    >
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <HomeLayout>
          <Component {...pageProps} />
        </HomeLayout>
      )}
    </SWRConfig>
  );
}
