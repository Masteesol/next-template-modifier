import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default appWithTranslation(App, nextI18NextConfig);
