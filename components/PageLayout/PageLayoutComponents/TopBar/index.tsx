import React, { forwardRef } from "react";
//import { useRouter } from 'next/router';
import tw from "tailwind-styled-components";
import { FlexRowCenteredY } from "@/components/styled-global-components";
import NavDropdown from "./TopBarComponents/Dropdown";

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

const Divider = tw.span`
  border-l-2 
  border-slate-300
  h-full
  mx-3
`

interface NavProps {
  onDarkModeToggle: () => void;
  darkMode: boolean;
}



const Nav = forwardRef<HTMLDivElement, NavProps>((props, ref) => {
  //const router = useRouter();
  return (
    <div ref={ref}>
      <NavElement className="bg-white shadow dark:bg-gray-800">
        <span className="p-3">Template Modifier</span>
        <FlexRowCenteredY className="ml-auto p-2 gap-4">
          <Divider />
          <NavItemContainer>
            <NavDropdown onDarkModeToggle={props.onDarkModeToggle} darkMode={props.darkMode} />          </NavItemContainer>
        </FlexRowCenteredY>
      </NavElement>
    </div>
  );
});

Nav.displayName = "Nav";

export default Nav;
