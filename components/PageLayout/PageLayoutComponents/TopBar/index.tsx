import React, { forwardRef } from "react";
import Link from "next/link"

//import { useRouter } from 'next/router';
import tw from "tailwind-styled-components";
import { FlexRowCenteredY } from "@/components/styled-global-components";
import NavDropdown from "./TopBarComponents/Dropdown";
import Image from "next/image";
import logo from "@/public/logo.png"

//const mockCompanyInfo = "@/mockdata/companyData.json"
//import mockData from "@/mockData/companyData.json"

const NavElement = tw.nav`
  bg-slate-800
  w-full
  flex
  items-center
`;

interface NavProps {
  onDarkModeToggle: () => void;
  darkMode: boolean;
  authenticated: boolean;
}



const Nav = forwardRef<HTMLDivElement, NavProps>((props, ref) => {
  //const router = useRouter();
  return (
    <div ref={ref}>
      <NavElement className="bg-white shadow dark:bg-gray-800">
        {!props.authenticated &&
          <Link href="/" className="">
            <FlexRowCenteredY className="gap-2 px-2 md:px-8 py-2 font-bold text-green-500">
              <Image src={logo} alt="logo" height={25} width={25} />
              <span>Templify</span>
            </FlexRowCenteredY>
          </Link>
        }
        {props.authenticated &&
          <FlexRowCenteredY className="p-2 w-full">
            <div className="ml-auto">
              <NavDropdown onDarkModeToggle={props.onDarkModeToggle} darkMode={props.darkMode} /></div>
          </FlexRowCenteredY>}

      </NavElement>
    </div>
  );
});

Nav.displayName = "Nav";

export default Nav;
