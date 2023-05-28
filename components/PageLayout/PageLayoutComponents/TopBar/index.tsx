import React, { forwardRef } from "react";
import { useRouter } from 'next/router';
import tw from "tailwind-styled-components";
import { MdOtherHouses } from "react-icons/md"
import { FlexRowCenteredY, Select } from "@/components/styled-global-components";
import NavDropdown from "./TopBarComponents/Dropdown";
import { useSelectedCompany } from "@/context/SelectedCompanyContext";

//const mockCompanyInfo = "@/mockdata/companyData.json"
//import mockData from "@/mockData/companyData.json"

const NavElement = tw.nav`
  bg-slate-800
  w-full
  flex
  items-center
`;


const IconBackground = tw.label`
  dark:text-slate-50
  text-slate-600
  bg-slate-200 
  dark:bg-gray-700
  text-base
  p-2
  rounded-[20%]
`

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
  const router = useRouter();
  const { selectedCompany, setSelectedCompanyId } = useSelectedCompany();
  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompanyId(event.target.value);
    router.push('/');
  };

  return (
    <div ref={ref}>
      <NavElement className="bg-white shadow dark:bg-gray-800">
        <span className="p-3">EKKO Media</span>
        <FlexRowCenteredY className="ml-auto p-2 gap-4">
          <NavItemContainer>
            <IconBackground htmlFor="company-selector">
              <MdOtherHouses />
            </IconBackground>
            <Select.select
              id="company-selector"
              className="border-none rounded bg-transparent focus:ring-slate-300"
              value={selectedCompany ? selectedCompany.id : ''}
              onChange={handleCompanyChange}
            >
              <Select.option value="1">Hjem Eiendom</Select.option>
              <Select.option value="2">NEM</Select.option>
              <Select.option value="3">Attentus</Select.option>
            </Select.select>

          </NavItemContainer>
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
