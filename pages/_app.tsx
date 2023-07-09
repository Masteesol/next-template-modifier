import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";
import { AppProps } from "next/app";
import { LoadingProvider } from '@/context/LoadingContext';
import { AuthProvider } from "@/context/AuthContext";
import { SaveStatusProvider } from "@/context/SavedStatusContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SaveStatusProvider>
        <LoadingProvider>
          <Component {...pageProps} />
        </LoadingProvider>
      </SaveStatusProvider>
    </AuthProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
