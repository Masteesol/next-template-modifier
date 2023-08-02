import { useContext } from "react";
import { useRouter } from "next/router"
import {
  BsRocketTakeoff,
  BsRocketTakeoffFill
} from "react-icons/bs";

import tw from "tailwind-styled-components";
import { FlexRowCenteredY, FlexColContainer, DividerHorizontal } from "@/components/shared/styled-global-components";
import Link from "next/link";
//import { useTranslation } from "next-i18next";
//import { translateOrDefault } from "@/utils/i18nUtils";
import Image from "next/image";
import logo from "@/public/logo.png"
import { AuthContext } from "@/context/AuthContext";
import { SideBarDataType, SidebarDataAuth } from "@/components/shared/Layout/constants";

const Sidebar = tw.aside`
  h-full
  flex
  flex-col
  bg-white
  text-base
  bg-white
  dark:bg-slate-900
  absolute
  md:relative
  z-[8000]
`;

const SideBarItemContainer = tw(FlexColContainer)`
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


const SidebarData: SideBarDataType[] = [
  {
    path: "/landing/tutorial",
    IconOutline: BsRocketTakeoff,
    IconFill: BsRocketTakeoffFill,
    text: "Getting Started"
  },
]



const SidebarElement = ({ isOpen, setIsOpen }: SideBarProps) => {
  //const { t } = useTranslation("common");
  const router = useRouter();

  const closeSidebar = () => {
    setIsOpen(false);
  };
  const { isAuthenticated } = useContext(AuthContext)
  const SidebarDataFull = isAuthenticated ? [...SidebarData, ...SidebarDataAuth] : SidebarData
  console.log(SidebarDataFull)
  return (
    <div className="h-full absolute right-0">
      {/**MOBILE DEVICES */}
      <div className="h-full">
        <Sidebar className={`${isOpen ? "w-[12rem] px-2" : "w-[0rem] overflow-hidden"} transition-all ease-in-out duration-200 text-2xl`}>
          <FlexColContainer className="w-full h-full">
            <Link href="/" className="flex flex-col items-center relative p-2">
              <Image src={logo} alt="logo" height={30} width={30} />
            </Link>
            <DividerHorizontal />
            {SidebarDataFull.map((item, index) => {
              const {
                path,
                IconOutline,
                IconFill,
                text } = item
              return <Link href={path} key={`sidebar-item-${index}`}>
                <FlexRowCenteredY className="relative group">
                  <SideBarItemContainer className="w-full">
                    <div className="flex flex-col relative p-2 w-full">
                      {index === 0 ?
                        <FlexRowCenteredY className="gap-2 w-full">
                          {router.pathname === path
                            ? <IconFill className="h-6 w-6" />
                            : <IconOutline className="h-6 w-6" />
                          }
                          <span className="text-base overflow-hidden overflow-ellipsis whitespace-nowrap">{text}</span>
                        </FlexRowCenteredY>
                        : <FlexRowCenteredY className="gap-2">
                          {router.pathname.startsWith(path)
                            ? <IconFill className="h-6 w-6" />
                            : <IconOutline className="h-6 w-6" />
                          }
                          <span className="text-base overflow-hidden overflow-ellipsis whitespace-nowrap">{text}</span>
                        </FlexRowCenteredY>
                      }
                    </div>
                  </SideBarItemContainer>

                </FlexRowCenteredY>
              </Link>
            })}
          </FlexColContainer>
        </Sidebar >
      </div >

      {
        isOpen && (
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
