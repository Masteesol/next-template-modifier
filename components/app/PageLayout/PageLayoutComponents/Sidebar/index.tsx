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
import { HoverLabel } from "@/components/app/TemplateEditor/EditorCard/styles";
import { IconType } from "react-icons/lib";

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

interface SideBarDataType {
  path: string;
  IconOutline: IconType;
  IconFill: IconType,
  text: string;
}

const SidebarData: SideBarDataType[] = [
  {
    path: "/app",
    IconOutline: MdOutlineDashboard,
    IconFill: MdDashboard,
    text: "Dashboard"
  },
  {
    path: "/app/templates",
    IconOutline: BsFileEarmarkText,
    IconFill: BsFileEarmarkTextFill,
    text: "Templates"
  },
  {
    path: "/app/settings",
    IconOutline: BsPerson,
    IconFill: BsPersonFill,
    text: "Settings"
  },
  {
    path: "/app/plans",
    IconOutline: BsCreditCard2Front,
    IconFill: BsCreditCard2FrontFill,
    text: "Subscriptions"
  },

]


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
          <DividerHorizontal />
          {SidebarData.map((item, index) => {
            const {
              path,
              IconOutline,
              IconFill,
              text } = item
            return <Link href={path} key={`sidebar-item-${index}`}>
              <FlexRowCenteredY className="relative group">
                <SideBarItemContainer >
                  <div className="flex flex-col items-center relative p-2">
                    {index === 0 ?
                      <div>
                        {router.pathname === path
                          ? <IconFill />
                          : <IconOutline />
                        }
                      </div>
                      : <div>
                        {router.pathname.startsWith(path)
                          ? <IconFill />
                          : <IconOutline />
                        }
                      </div>
                    }
                  </div>
                </SideBarItemContainer>
                <HoverLabel className="grou-hover:block left-11 top-3 w-[5rem]">{item.text}</HoverLabel>
                <span className="md:hidden text-base">{text}</span>
              </FlexRowCenteredY>
            </Link>
          })}
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
