import React from "react";
import Link from "next/link"

//import { useRouter } from 'next/router';
import tw from "tailwind-styled-components";
import { FlexRowCenteredY } from "@/components/shared/styled-global-components";
import Image from "next/image";
import logo from "@/public/logo.png"
import { BsList } from "react-icons/bs";

//const mockCompanyInfo = "@/mockdata/companyData.json"
//import mockData from "@/mockData/companyData.json"

const NavContainer = tw.nav`
  bg-slate-800
  w-full
  flex
  items-center
  justify-between
  p-4
`;


const TopBar = ({ setIsOpen, isOpen }: { setIsOpen: any, isOpen: any }) => {
  //const router = useRouter();
  return (
    <div>
      <NavContainer className="bg-white shadow dark:bg-gray-800">
        <Link href="/" className="">
          <FlexRowCenteredY className="gap-2 font-bold text-green-500">
            <Image src={logo} alt="logo" height={25} width={25} />
            <span>Templify</span>
          </FlexRowCenteredY>
        </Link>
        <button
          onClick={() => { setIsOpen(!isOpen) }}
          className="text-2xl"
        >
          <BsList />
        </button>
      </NavContainer>
    </div>
  );
};

export default TopBar;
