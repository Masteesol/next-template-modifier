import React from "react";
import Link from "next/link"

//import { useRouter } from 'next/router';
import tw from "tailwind-styled-components";
import { FlexRowCenteredY, SubmitButton } from "@/components/shared/styled-global-components";
import Image from "next/image";
import logo from "@/public/logo.png"
import { BsList } from "react-icons/bs";
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext";
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
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      <NavContainer className="bg-white shadow dark:bg-gray-800">
        <Link href="/" className="">
          <FlexRowCenteredY className="gap-2 font-bold text-green-500">
            <Image src={logo} alt="logo" height={25} width={25} />
            <span>Templify</span>
          </FlexRowCenteredY>
        </Link>
        <FlexRowCenteredY className="gap-4">
          {!isAuthenticated ? (
            <FlexRowCenteredY className="gap-2 text-green-500">
              <Link href="/sign-up">
                <SubmitButton>Sign up</SubmitButton>
              </Link>
              <p className="select-none">or</p>
              <Link
                className="underline hover:opacity-50 duration-150"
                href="/sign-in"
              >
                Login
              </Link>
            </FlexRowCenteredY>
          ) : (
            <Link href={"/app"}>
              <SubmitButton>To the App</SubmitButton>
            </Link>
          )}
          <button
            onClick={() => { setIsOpen(!isOpen) }}
            className="text-2xl"
          >
            <BsList />
          </button>
        </FlexRowCenteredY>

      </NavContainer>
    </div>
  );
};

export default TopBar;
