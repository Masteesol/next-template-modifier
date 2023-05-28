import React, { useRef, useEffect } from "react";
import {
  FlexColCentered,
  FlexColContainer,
  FlexRowContainer,
  H1,
} from "../styled-global-components";
import TopBar from "./PageLayoutComponents/TopBar";
import Sidebar from "./PageLayoutComponents/Sidebar";
import IdComponent from "./PageLayoutComponents/idComponent";
import useDarkMode from "@/hooks/useDarkMode";
//import { Error400PageContent } from "@/components/ErrorPageComponent";
//import { useRequireAuth } from "@/hooks/useRequireAuth";
//import { useAuth } from "@/hooks/useAuth";


interface PageLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedPageLayout = ({ children }: PageLayoutProps) => {
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
            <FlexColContainer className="max-w-[1980px] w-full mx-auto px-2 pt-4 xl:px-10">
              {children}
              <div className="spacer h-[10rem]"></div>
            </FlexColContainer>
          </FlexColContainer>
        </FlexColContainer>
      </FlexRowContainer>
    </div>
  );
};

// need this separate page layout component as useAuth cancels the useEffect for correcting height on main
const PageLayout = ({ children }: PageLayoutProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const breadcrumbsRef = useRef<HTMLDivElement>(null);
  const [darkMode, toggleDarkMode] = useDarkMode();
  const handleDarkModeToggle = () => {
    toggleDarkMode();
  };
  //useRequireAuth();
  //const { isAuthenticated } = useAuth();
  const isAuthenticated = true
  if (!isAuthenticated) {
    return <div className={`${darkMode ? "dark" : ""}`}>
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
            <FlexColContainer className="max-w-[1980px] w-full mx-auto px-2 pt-4 xl:px-10">

              <FlexColCentered className="h-[100vh] w-full">
                <H1 className="pb-9">
                  Loading...
                </H1>
              </FlexColCentered>
              <div className="spacer h-[10rem]"></div>
            </FlexColContainer>
          </FlexColContainer>
        </FlexColContainer>
      </FlexRowContainer>
    </div>
  }
  return <AuthenticatedPageLayout>{children}</AuthenticatedPageLayout>;
};


export default PageLayout;
