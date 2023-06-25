import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";
import { AppProps } from "next/app";
import { LoadingProvider } from '@/context/LoadingContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <Component {...pageProps} />
    </LoadingProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
