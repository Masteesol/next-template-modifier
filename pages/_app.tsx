import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";
import { AppProps } from "next/app";
import { SelectedCompanyProvider } from "@/context/SelectedCompanyContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <SelectedCompanyProvider>
      <Component {...pageProps} />
    </SelectedCompanyProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
