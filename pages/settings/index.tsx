import Head from "next/head";
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useState } from "react"

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
import Cookies from 'js-cookie';
import React from "react";
import axios from "axios";
//import { set } from "immutable";

import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { t } = useTranslation("common");
  const { email, name } = useAuth(); // get this from your custom hook

  const [isActive, setIsActive] = useState(false)
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordNotStrongEnough, setPasswordNotStrongEnough] = useState(false);

  const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{12,}$/;

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

      const itemsUrl = process.env.NEXT_PUBLIC_API_URL + "/api/user/reset-password";
      const data = {
        'email': Cookies.get('email'),
        'password': newPassword
      }
      const configData = {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get('bearerToken')
        }
      }
      axios.post(itemsUrl, data, configData).then((response) => {
        const in30Minutes = 1 / 48;
        Cookies.set('bearerToken', response.data.token, { expires: in30Minutes });
        setPasswordSaved(true);
      });
    }


  }


  const handleEditActive = () => {
    setIsActive(!isActive)
  }
  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.settings.heading", "Settings")}</title>
        <meta name="description" content="Welcome to EKKO Media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColContainer className="min-h-full gap-8">
          <H1>{translateOrDefault(t, "pages.settings.heading", "Settings")}</H1>
          <FlexColContainer className="gap-4">
            <h2 className="text-xl">User Information</h2>
            <FlexColRowContainerLg className="gap-4">
              <FormWrapper className={`${isActive && "bg-gray-200 dark:bg-gray-900"}`}>
                <Form>
                  <Label htmlFor="full-name">Full Name</Label>
                  <TextInput type="text" disabled={isActive ? true : false} id="full-name" defaultValue={name} />
                  <Label htmlFor="email">Email</Label>
                  <TextInput type="email" id="email" disabled={isActive ? true : false} defaultValue={email} />

                  <FlexColContainer className="gap-4">
                    <FlexRowContainer className="justify-between">
                      <Label htmlFor="old-password">Password</Label>
                      <FaEdit className={`hover:text-slate-300 cursor-pointer ${isActive && "text-slate-300"}`} onClick={handleEditActive} />
                    </FlexRowContainer>
                    <TextInput type="password" id="old-password" disabled={true} value={"placeholder12"} />
                  </FlexColContainer>
                </Form>
              </FormWrapper>
              {isActive &&
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


export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};
