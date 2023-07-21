import React, { forwardRef } from "react";
import Link from "next/link"

//import { useRouter } from 'next/router';
import tw from "tailwind-styled-components";
import { FlexRowCenteredY } from "@/components/shared/styled-global-components";
import NavDropdown from "./TopBarComponents/Dropdown";
import Image from "next/image";
import logo from "@/public/logo.png"
import { BsList } from "react-icons/bs";

//const mockCompanyInfo = "@/mockdata/companyData.json"
//import mockData from "@/mockData/companyData.json"

const NavElement = tw.nav`
  bg-slate-800
  w-full
  flex
  items-center
  p-2
`;

interface NavProps {
  onDarkModeToggle: () => void;
  darkMode: boolean;
  authenticated: boolean;
  isOpen: boolean;
  setIsOpen: any
}



const Nav = forwardRef<HTMLDivElement, NavProps>((props, ref) => {
  //const router = useRouter();
  const {
    setIsOpen,
    isOpen
  } = props
  return (
    <div ref={ref}>
      <NavElement className="bg-white shadow dark:bg-gray-800">
        <button className="text-2xl md:hidden"
          onClick={() => { setIsOpen(!isOpen) }}
        >
          <BsList />
        </button>

        <Link href="/" className="md:hidden">
          <FlexRowCenteredY className="gap-2 px-2 font-bold text-green-500 justify-between w-full">
            <Image src={logo} alt="logo" height={25} width={25} />
            <span>Templify</span>
          </FlexRowCenteredY>
        </Link>
        <FlexRowCenteredY className="ml-auto gap-4">
          <Link href="/app/templates/tutorial" className="hover:underline">How to use</Link>
          <NavDropdown onDarkModeToggle={props.onDarkModeToggle} darkMode={props.darkMode} />
        </FlexRowCenteredY>
      </NavElement>
    </div>
  );
});

Nav.displayName = "Nav";

export default Nav;
