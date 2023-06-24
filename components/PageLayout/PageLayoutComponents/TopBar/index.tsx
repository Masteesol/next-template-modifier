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


const NavItemContainer = tw(FlexRowCenteredY)`
  gap-2
`

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
            <FlexRowCenteredY className="gap-2 px-8 py-2 font-bold text-green-500">
              <Image src={logo} alt="logo" height={25} width={25} />
              <span>Templify</span>
            </FlexRowCenteredY>
          </Link>
        }
        {props.authenticated &&
          <FlexRowCenteredY className="ml-auto p-2 gap-4">
            <NavItemContainer>
              <NavDropdown onDarkModeToggle={props.onDarkModeToggle} darkMode={props.darkMode} />
              <Link href="/" className="">
                <FlexRowCenteredY className="gap-2 px-4 py-2 font-bold text-green-500">
                  <Image src={logo} alt="logo" height={25} width={25} />
                  <span>Templify</span>
                </FlexRowCenteredY>
              </Link>
            </NavItemContainer>
          </FlexRowCenteredY>}

      </NavElement>
    </div>
  );
});

Nav.displayName = "Nav";

export default Nav;
