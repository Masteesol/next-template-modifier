import { useEffect, useCallback, useState } from "react";
import {
  FaHome,
  FaTable,
  FaUsers,
  FaCog,
  FaChevronRight,
  FaChevronLeft,
  FaBriefcase,
} from "react-icons/fa";
import tw from "tailwind-styled-components";
import { FlexColCenteredX, FlexColCentered } from "@/components/styled-global-components";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { translateOrDefault } from "@/utils/i18nUtils";

const Sidebar = tw.aside`
  w-[4rem]
  min-h-[100vh]
  flex
  bg-white
  text-xs
  p-2
  bg-slate-900
  text-white
  absolute
  md:relative
  z-[8000]
`;

const SideBarItemContainer = tw(FlexColCentered)`
  my-1
  hover:bg-slate-800
  rounded
  group
`;

const SidebarText = tw.p`
  text-center
  text-xs
  absolute
  left-10
  bg-slate-800
  p-1
  rounded
  opacity-0
  group-hover:opacity-100
  transition-opacity
  duration-200
`;

const ToggleButton = tw.button`
    border-none 
    shadow 
    p-3
    md:p-4 
    bg-white
    rounded-md
    hover:bg-slate-400
    absolute 
    bottom-20
    bg-slate-900
    opacity-50
    md:opacity-100
    text-white
    z-[7000]
`;


const SidebarElement = () => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };
  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) {
      setIsOpen(true);
      setIsMobile(false);
    } else {
      setIsOpen(false);
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div className="relative">
      <Sidebar className={isOpen ? "" : "hidden md:block"}>
        <FlexColCenteredX className="w-full">
          <SideBarItemContainer>
            <Link href="/" className="flex flex-col items-center relative p-2">
              <FaHome size={28} />
              <SidebarText>{translateOrDefault(t, "navigation.home", "Home")}</SidebarText>
            </Link>
          </SideBarItemContainer>
          <SideBarItemContainer>
            <Link href="/campaigns" className="flex flex-col items-center relative p-2">
              <FaTable size={28} />
              <SidebarText>{translateOrDefault(t, "navigation.campaigns", "Campaigns")}</SidebarText>
            </Link>
          </SideBarItemContainer>
          <SideBarItemContainer>
            <Link href="/companies" className="flex flex-col items-center relative p-2">
              <FaBriefcase size={28} />
              <SidebarText>{translateOrDefault(t, "navigation.clients", "Companies")}</SidebarText>
            </Link>
          </SideBarItemContainer>
          <SideBarItemContainer>
            <Link href="/admin" className="flex flex-col items-center relative p-2">
              <FaUsers size={28} />
              <SidebarText>Admin</SidebarText>
            </Link>
          </SideBarItemContainer>
          <SideBarItemContainer>
            <Link href="/settings" className="flex flex-col items-center relative p-2">
              <FaCog size={25} />
              <SidebarText>{translateOrDefault(t, "navigation.settings", "Settings")}</SidebarText>
            </Link>
          </SideBarItemContainer>
        </FlexColCenteredX>
      </Sidebar>
      {isMobile && isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-10 bg-overlay-dark"
          onClick={closeSidebar}
        />
      )}
      <ToggleButton onClick={toggleSidebar}>
        {!isOpen ? <FaChevronRight size={25} /> : <FaChevronLeft size={25} />}
      </ToggleButton>
    </div>
  );
};

export default SidebarElement;
