import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";
import { AppProps } from "next/app";
import { LoadingProvider } from '@/context/LoadingContext';
import { AuthProvider } from "@/context/AuthContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
    </AuthProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
