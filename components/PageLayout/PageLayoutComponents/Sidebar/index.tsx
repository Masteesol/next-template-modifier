import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router"
import {
  BsHouseDoor,
  BsHouseDoorFill,
  BsFileEarmarkText,
  BsFileEarmarkTextFill,
  BsPerson,
  BsPersonFill,
  BsChevronRight,
  BsChevronLeft

} from "react-icons/bs";
import tw from "tailwind-styled-components";
import { FlexColCenteredX, FlexColCentered } from "@/components/styled-global-components";
import Link from "next/link";
//import { useTranslation } from "next-i18next";
//import { translateOrDefault } from "@/utils/i18nUtils";
import Image from "next/image";
import logo from "@/public/logo.png"

const Sidebar = tw.aside`
  w-[3.5rem]
  min-h-[100vh]
  flex
  bg-white
  text-xs
  p-2
  bg-white
  dark:bg-slate-900
  text-white
  absolute
  md:relative
  z-[8000]
`;

const SideBarItemContainer = tw(FlexColCentered)`
  my-1
  text-black
  dark:text-white
  dark:hover:bg-green-800
  hover:bg-green-200
  rounded
`;

const ToggleButton = tw.button`
    border-none 
    shadow 
    p-2
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
  //const { t } = useTranslation("common");
  const router = useRouter();
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
              <Image src={logo} alt="logo" height={25} width={25} />
            </Link>
          </SideBarItemContainer>
          <SideBarItemContainer>
            <Link href="/" className="flex flex-col items-center relative p-2">
              {router.pathname === "/"
                ? <BsHouseDoorFill size={28} />
                : <BsHouseDoor size={28} />
              }
            </Link>
          </SideBarItemContainer>
          <SideBarItemContainer>
            <Link href="/templates" className="flex flex-col items-center relative p-2">
              {router.pathname.startsWith("/templates")
                ? <BsFileEarmarkTextFill size={28} />
                : <BsFileEarmarkText size={28} />
              }
            </Link>
          </SideBarItemContainer>
          <SideBarItemContainer>
            <Link href="/settings" className="flex flex-col items-center relative p-2">
              {router.pathname.startsWith("/settings")
                ? <BsPersonFill size={25} />
                : <BsPerson size={25} />
              }
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
        {!isOpen ? <BsChevronRight size={25} /> : <BsChevronLeft size={25} />}
      </ToggleButton>
    </div>
  );
};

export default SidebarElement;
