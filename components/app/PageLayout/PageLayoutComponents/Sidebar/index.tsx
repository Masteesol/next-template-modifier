import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router"
import {
  BsFileEarmarkText,
  BsFileEarmarkTextFill,
  BsPerson,
  BsPersonFill,
  BsCreditCard2FrontFill,
  BsCreditCard2Front,
} from "react-icons/bs";
import { MdOutlineDashboard, MdDashboard } from "react-icons/md"
import tw from "tailwind-styled-components";
import { FlexColCentered, FlexRowCenteredY, FlexColContainer, DividerHorizontal } from "@/components/shared/styled-global-components";
import Link from "next/link";
//import { useTranslation } from "next-i18next";
//import { translateOrDefault } from "@/utils/i18nUtils";
import Image from "next/image";
import logo from "@/public/logo.png"

const Sidebar = tw.aside`
  h-full
  flex
  bg-white
  text-base
  p-1
  bg-white
  dark:bg-slate-900
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

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: any;
}

const SidebarElement = ({ isOpen, setIsOpen }: SideBarProps) => {
  //const { t } = useTranslation("common");
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);


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
  }, [setIsOpen]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div className="relative h-full">
      <Sidebar className={isOpen ? "" : "hidden md:block"}>
        <FlexColContainer className="w-full md:items-center pe-2 md:pe-0 text-2xl">
          <Link href="/" className="flex flex-col items-center relative p-2">
            <Image src={logo} alt="logo" height={30} width={30} />
          </Link>
          <DividerHorizontal></DividerHorizontal>
          <Link href="/app">
            <FlexRowCenteredY>
              <SideBarItemContainer>
                <div className="flex flex-col items-center relative p-2">
                  {router.pathname === "/app"
                    ? <MdDashboard />
                    : <MdOutlineDashboard />
                  }
                </div>
              </SideBarItemContainer>
              <span className="md:hidden text-base">Home</span>
            </FlexRowCenteredY>
          </Link>
          <Link href="/app/templates" >
            <FlexRowCenteredY>
              <SideBarItemContainer>
                <div className="flex flex-col items-center relative p-2">
                  {router.pathname.startsWith("/app/templates")
                    ? <BsFileEarmarkTextFill />
                    : <BsFileEarmarkText />
                  }
                </div>
              </SideBarItemContainer>
              <span className="md:hidden text-base">Templates</span>
            </FlexRowCenteredY>
          </Link>
          <Link href="/app/settings">
            <FlexRowCenteredY>
              <SideBarItemContainer>
                <div className="flex flex-col items-center relative p-2">
                  {router.pathname.startsWith("/app/settings")
                    ? <BsPersonFill />
                    : <BsPerson />
                  }
                </div>
              </SideBarItemContainer>
              <span className="md:hidden text-base">Settings</span>
            </FlexRowCenteredY>
          </Link>
          <Link href="/app/plans">
            <FlexRowCenteredY>
              <SideBarItemContainer>
                <div className="flex flex-col items-center relative p-2">
                  {router.pathname === "/app/plans"
                    ? <BsCreditCard2FrontFill />
                    : <BsCreditCard2Front />
                  }
                </div>
              </SideBarItemContainer>
              <span className="md:hidden text-base">Plans</span>
            </FlexRowCenteredY>
          </Link>
        </FlexColContainer>
      </Sidebar>
      {
        isMobile && isOpen && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-[7000] bg-overlay-dark cursor-pointer"
            onClick={closeSidebar}
          />
        )
      }
    </div >
  );
};

export default SidebarElement;
