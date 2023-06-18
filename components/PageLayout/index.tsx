import React, { useRef, useEffect } from "react";
import {

  FlexColContainer,
  FlexRowContainer,

} from "../styled-global-components";
import TopBar from "./PageLayoutComponents/TopBar";
import Sidebar from "./PageLayoutComponents/Sidebar";
import IdComponent from "./PageLayoutComponents/idComponent";
import useDarkMode from "@/hooks/useDarkMode";
//import { Error400PageContent } from "@/components/ErrorPageComponent";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const breadcrumbsRef = useRef<HTMLDivElement>(null);
  const [darkMode, toggleDarkMode] = useDarkMode();

  useEffect(() => {
    const navHeight = navRef.current?.offsetHeight ?? 0;
    const breadcrumbsHeight = breadcrumbsRef.current?.offsetHeight ?? 0;
    const totalHeight = navHeight + breadcrumbsHeight;
    const main = document.querySelector<HTMLDivElement>("#main");
    if (main) main.style.height = `calc(100vh - ${totalHeight}px)`;
  }, []);

  const handleDarkModeToggle = () => {
    toggleDarkMode();
  };
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <FlexRowContainer className="text-slate-900 dark:text-white">
        <Sidebar />
        <FlexColContainer className="w-full ">
          <TopBar
            ref={navRef}
            darkMode={darkMode}
            onDarkModeToggle={handleDarkModeToggle}
          />
          <IdComponent ref={breadcrumbsRef} />
          <FlexColContainer
            id="main"
            className="w-full overflow-auto bg-slate-50 dark:bg-gray-800 box-border"
          >
            {children}
          </FlexColContainer>
        </FlexColContainer>
      </FlexRowContainer>
    </div>
  );
};


export default PageLayout;
