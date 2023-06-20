import React, { forwardRef } from "react";
import Link from "next/link"
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
  authenticated: boolean;
}



const Nav = forwardRef<HTMLDivElement, NavProps>((props, ref) => {
  //const router = useRouter();
  return (
    <div ref={ref}>
      <NavElement className="bg-white shadow dark:bg-gray-800">
        {props.authenticated ?
          <span className="px-2">Templify</span>
          :
          <Link href="/" className="">
            <FlexRowCenteredY className="gap-2 px-8 py-2 text-green-500">
              <span>Templify</span>
            </FlexRowCenteredY>
          </Link>
        }
        {props.authenticated &&
          <FlexRowCenteredY className="ml-auto p-2 gap-4">
            <Divider />
            <NavItemContainer>
              <NavDropdown onDarkModeToggle={props.onDarkModeToggle} darkMode={props.darkMode} />          </NavItemContainer>
          </FlexRowCenteredY>}

      </NavElement>
    </div>
  );
});

Nav.displayName = "Nav";

export default Nav;
/*
const Logo = ({ fill }: any) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 210.333 157.209" fill={fill}>
      <path id="Icon_metro-insert-template" d="M61.524,31.4H81.175V41.23H61.524ZM91,31.4h19.651V41.23H91Zm49.128,0v39.3H110.652V60.881H130.3V41.23h-9.826V31.4ZM51.7,60.881H71.35v9.826H51.7Zm29.477,0h19.651v9.826H81.175ZM32.047,41.23V60.881h9.826v9.826H22.222V31.4H51.7V41.23ZM61.524,90.358H81.175v9.826H61.524Zm29.477,0h19.651v9.826H91Zm49.128,0v39.3H110.652v-9.826H130.3V100.184h-9.826V90.358ZM51.7,119.835H71.35v9.826H51.7Zm29.477,0h19.651v9.826H81.175ZM32.047,100.184v19.651h9.826v9.826H22.222v-39.3H51.7v9.826Zm117.907-88.43H12.4V149.312H149.954V11.754Zm9.826-9.826L212.9,70.707l-53.124,88.43H2.571V1.928H159.78Z"
        transform="translate(-2.571 -1.928)" />
    </svg>
  )

}*/