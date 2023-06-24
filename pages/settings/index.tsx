import Head from "next/head";
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react"

import PageLayout from "../../components/PageLayout";
import {
  FlexColContainer,
  FormWrapper,
  H1,
  Form,
  FlexRowContainer,
  HollowButton,
  SubmitButton,
  FlexColRowContainerLg
} from "@/components/styled-global-components";
import { translateOrDefault } from "@/utils/i18nUtils";
import { Label, TextInput, Badge } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import React from "react";
import cookie from 'cookie'
import { getUserInfo } from "@/requests/profile";

type PageProps = {
  authenticated: boolean,
  userID: string | null,
}

interface userInfo {
  first_name: string | readonly string[] | undefined | null;
  last_name: string | readonly string[] | undefined | null;
  subscription_tier: string;
}

const Page: NextPage<PageProps> = ({ authenticated, userID }) => {
  const { t } = useTranslation("common");
  const [userInfo, setUserInfo] = useState<userInfo | null>(null)
  const [isPasswordActive, setIsPasswordActive] = useState(false)
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordNotStrongEnough, setPasswordNotStrongEnough] = useState(false);

  useEffect(() => {
    const setUserData = async () => {
      if (!userID) {
        return Promise.resolve(null); // or some other default value
      }
      const response = await getUserInfo(userID)
      console.log(response)
      return response;
    }
    setUserData().then((data) => {
      if (data) {
        console.log(data)
        setUserInfo(data)
      }
    })
  }, [userID])

  const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{12,}$/;
  useEffect
  const handlePasswordSubmit = (e: any) => {
    e.preventDefault();

    // Reset all messages
    setPasswordMismatch(false);
    setPasswordEmpty(false);
    setPasswordNotStrongEnough(false);
    setPasswordSaved(false);

    // Now perform checks and set respective state to true if check fails
    if (newPassword !== repeatNewPassword) {
      setPasswordMismatch(true);
      return;
    } else if (newPassword === '' || repeatNewPassword === '') {
      setPasswordEmpty(true);
      return;
    } else if (!passwordCheck.test(newPassword)) {
      setPasswordNotStrongEnough(true);
      return;
    } else {


    }
  }
  const handleEditActive = () => {
    setIsPasswordActive(!isPasswordActive)
  }

  if (!authenticated) {
    window.location.replace("/sign-in")
  }
  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.settings.heading", "Settings")}</title>
        <meta name="description" content="Welcome to EKKO Media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout authenticated={authenticated}>
        <FlexColContainer className="min-h-full gap-8 w-full px-4">
          <H1>{translateOrDefault(t, "pages.settings.heading", "Settings")}</H1>
          <FlexColContainer className="gap-4">
            <h2 className="text-xl">User Information</h2>
            <FlexColRowContainerLg className="gap-4">
              <FormWrapper className={`${isPasswordActive && "bg-gray-200 dark:bg-gray-900"}`}>
                <Form>
                  <Label htmlFor="first_name">Full Name</Label>
                  <TextInput
                    type="text"
                    disabled={isPasswordActive ? true : false}
                    id="first_name"
                    defaultValue={userInfo && userInfo.first_name ? userInfo.first_name : ''}
                  />
                  <Label htmlFor="last_name">Full Name</Label>
                  <TextInput type="text" disabled={isPasswordActive ? true : false} id="last_name" defaultValue={userInfo && userInfo.last_name ? userInfo.last_name : ''} />
                  <Label htmlFor="email">Email</Label>
                  <TextInput type="email" id="email" disabled={isPasswordActive ? true : false} defaultValue={"email"} />

                  <FlexColContainer className="gap-4">
                    <FlexRowContainer className="justify-between">
                      <Label htmlFor="old-password">Password</Label>
                      <FaEdit className={`hover:text-slate-300 cursor-pointer ${isPasswordActive && "text-slate-300"}`} onClick={handleEditActive} />
                    </FlexRowContainer>
                    <TextInput type="password" id="old-password" disabled={true} value={"placeholder12"} />
                  </FlexColContainer>
                </Form>
              </FormWrapper>
              {isPasswordActive &&
                <FormWrapper>
                  <Form onSubmit={handlePasswordSubmit}>
                    <FlexColContainer className="gap-4">
                      <Label htmlFor="new-password">New Password</Label>
                      <TextInput type="text" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
                      <Label htmlFor="new-password-repeat">Repeat Password</Label>
                      <TextInput type="text" id="new-password-repeat" value={repeatNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} placeholder="Repeat Password" />
                      {passwordMismatch && <Badge color={"warning"}>Password not matching</Badge>}
                      {passwordEmpty && <Badge color={"warning"}>Password cannot be empty</Badge>}
                      {passwordSaved && <Badge color={"success"}>Password has been reset</Badge>}
                      {passwordNotStrongEnough && <Badge color={"warning"}>Password must be at least 12 characters long, have a special character, a number, and upper and lowercase letters.</Badge>}
                      <FlexRowContainer className="justify-end gap-4">
                        <SubmitButton type="submit">Save</SubmitButton>
                        <HollowButton type="button" onClick={handleEditActive}>Cancel</HollowButton>
                      </FlexRowContainer>
                    </FlexColContainer>
                  </Form>
                </FormWrapper>}
            </FlexColRowContainerLg>
          </FlexColContainer>
        </FlexColContainer>
      </PageLayout>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req ? cookie.parse(context.req.headers.cookie || '') : undefined
  const token = cookies && cookies.supabaseToken
  const userID = cookies && cookies.userID
  const authenticated = token
  if (!authenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      authenticated: Boolean(token),
      userID: userID || null,
      ...(await serverSideTranslations(context.locale as string, ["common"]))
    }
  }
}

export default Page
