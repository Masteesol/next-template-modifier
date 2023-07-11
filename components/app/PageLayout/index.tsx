import React, { useRef, useEffect, useContext } from "react";
import {
  FlexColCentered,
  FlexColContainer,
  FlexRowContainer,
} from "@/components/shared/styled-global-components";
import TopBar from "./PageLayoutComponents/TopBar";
import Sidebar from "./PageLayoutComponents/Sidebar";
import IdComponent from "./PageLayoutComponents/idComponent";
import useDarkMode from "@/hooks/useDarkMode";
import { LoadingContext } from '@/context/LoadingContext';
import { SaveStatusContext } from "@/context/SavedStatusContext";

interface PageLayoutProps {
  children: React.ReactNode;
  authenticated: boolean;
}

const PageLayout = ({ children, authenticated }: PageLayoutProps) => {
  const { isLoading } = useContext(LoadingContext);
  const { saveStatus } = useContext(SaveStatusContext)
  const navRef = useRef<HTMLDivElement>(null);
  const breadcrumbsRef = useRef<HTMLDivElement>(null);
  const [darkMode, toggleDarkMode] = useDarkMode();
  //console.log(authenticated)
  useEffect(() => {
    if (authenticated) {
      //console.log("useEffect is running");
      const navHeight = navRef.current?.offsetHeight ?? 0;
      const breadcrumbsHeight = breadcrumbsRef.current?.offsetHeight ?? 0;
      const totalHeight = navHeight + breadcrumbsHeight;
      const main = document.querySelector<HTMLDivElement>("#main");
      if (main) main.style.height = `calc(100vh - ${totalHeight}px)`;
    }
  }, [authenticated]);
  const handleDarkModeToggle = () => {
    toggleDarkMode();
  };
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      {authenticated &&
        <FlexRowContainer className="text-black dark:text-white w-full h-[100vh]">
          <Sidebar />
          <FlexColContainer className="w-full h-full relative">
            <TopBar
              ref={navRef}
              darkMode={darkMode}
              onDarkModeToggle={handleDarkModeToggle}
              authenticated={authenticated}
            />
            <IdComponent ref={breadcrumbsRef} />
            <FlexColContainer
              id="main"
              className="w-full  overflow-auto bg-slate-50 dark:bg-gray-800 box-border"
            >
              {
                isLoading
                  ?
                  <FlexColCentered className="w-full h-full ">
                    <div className="loader text-green-400"></div>
                  </FlexColCentered>
                  :
                  children
              }

            </FlexColContainer>
            {saveStatus !== ""
              &&
              <span className="absolute top-[3rem] right-4 text-gray-500 bg-white dark:bg-gray-900 opacity-90 p-2 rounded">
                {saveStatus}
              </span>
            }
          </FlexColContainer>
        </FlexRowContainer>
      }

    </div>
  );
};



export default PageLayout;
