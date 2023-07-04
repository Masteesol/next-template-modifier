import React from "react";
import Link from "next/link"

//import { useRouter } from 'next/router';
import tw from "tailwind-styled-components";
import { FlexRowCenteredY } from "@/components/shared/styled-global-components";
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


const TopBar = (() => {
  //const router = useRouter();
  return (
    <div >
      <NavElement className="bg-white shadow dark:bg-gray-800">
        <Link href="/" className="">
          <FlexRowCenteredY className="gap-2 px-2 md:px-8 py-2 font-bold text-green-500">
            <Image src={logo} alt="logo" height={25} width={25} />
            <span>Templify</span>
          </FlexRowCenteredY>
        </Link>
      </NavElement>
    </div>
  );
});

export default TopBar;
