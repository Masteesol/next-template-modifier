import Head from "next/head";
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useReducer, useState } from "react"
import { initialState, reducer } from "@/hooks/useCredentialsStates";
import PageLayout from "@/components/app/PageLayout";
import {
  FlexColContainer,
  FormWrapper,
  Form,
  FlexRowContainer,
  HollowButton,
  SubmitButton,
  FlexColCenteredX,
  FlexColCentered,
  FlexRowCentered,
} from "@/components/shared/styled-global-components";
import { translateOrDefault } from "@/utils/i18nUtils";
import { Label, TextInput, Badge } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import React from "react";
import { CheckIcon } from "@/components/shared/CustomIcons";
import { LoadingContext } from "@/context/LoadingContext";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { TierCard } from "@/components/shared/Cards";
import { getSubTiers, getUserInfo } from "@/requests/profile";
import { AuthContext } from "@/context/AuthContext";
import Cookies from "js-cookie";

interface userInfoType {
  first_name: string | readonly string[] | undefined | null;
  last_name: string | readonly string[] | undefined | null;
  subscription_tier_id: string | readonly string[] | undefined | null;
}

interface SubscriptionTier {
  categories_limit: number;
  character_limit: number;
  created_at: string;
  id: string;
  name: string;
  templates_limit: number;
}

const Page = () => {
  const supabase = createClientComponentClient()
  const { t } = useTranslation("common");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userInfo, setUserInfo] = useState<userInfoType | null>(null)
  const [subTiers, setSubTiers] = useState<SubscriptionTier[] | null>(null)
  //const [email, setEmail] = useState("")
  const { setIsLoading } = useContext(LoadingContext);

  const { isAuthenticated } = useContext(AuthContext)
  const userID = Cookies.get("user_id")
  const userEmail = Cookies.get("email")

  useEffect(() => {
    const setStates = async () => {
      const tiers = await getSubTiers()
      if (userID) {
        const user = await getUserInfo(userID)
        if (user) {
          setUserInfo(user)
        }
      }
      if (tiers) {
        setSubTiers(tiers)
      }
    }
    if (userID) {
      setStates()
    }
  }, [userID, setIsLoading])


  const {
    isPasswordActive,
    isEmailActive,
    newPassword,
    repeatNewPassword,
    passwordMismatch,
    passwordEmpty,
    passwordSaved,
    passwordNotStrongEnough,
    newEmail,
    repeatNewEmail,
    isNotEmailFormat,
    newEmailMismatch,
    emailSaved,
    emailEmpty,
    error
  } = state

  const flipStateBoolean = (type: string, state: any) => {
    dispatch({ type: type, payload: !state })
  }
  const setReducerState = (type: string, state: any) => {
    dispatch({ type: type, payload: state })
  }

  const resetReducerStates = () => {
    dispatch({ type: 'RESET' });
  }

  const resetStatesOnSave = () => {
    setTimeout(() => {
      resetReducerStates()
    }, 2000)
  }

  const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{12,}$/;

  const handlePasswordSubmit = async (e: any) => {
    e.preventDefault();
    setReducerState("setPasswordMismatch", false)
    setReducerState("setPasswordEmpty", false)
    setReducerState("setPasswordNotStrongEnough", false)
    setReducerState("setPasswordSaved", false)

    // Now perform checks and set respective state to true if check fails
    if (newPassword !== repeatNewPassword) {
      setReducerState("setPasswordMismatch", true)
      return;
    } else if (newPassword === '' || repeatNewPassword === '') {
      setReducerState("setPasswordEmpty", true)
      return;
    } else if (!passwordCheck.test(newPassword)) {
      setReducerState("setPasswordNotStrongEnough", true)
      return;
    } else {
      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (!error) {
          setReducerState("setPasswordSaved", true)
          resetStatesOnSave()
        } else {
          console.log("error changing password", error)
          setReducerState("setError", true)
          resetStatesOnSave()
        }
      } catch (error) {
        console.log("error changing password")
      }


    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();

    setReducerState("setNewEmailMismatch", false)
    setReducerState("setEmailEmpty", false)
    setReducerState("setIsNotEmailFormat", false)
    setReducerState("setEmailSaved", false)
    // Now perform checks and set respective state to true if check fails
    if (newEmail !== repeatNewEmail) {
      setReducerState("setNewEmailMismatch", true)
      return;
    } else if (newEmail === '' || repeatNewEmail === '') {
      setReducerState("setEmailEmpty", true)
      return;
    } else if (!emailRegex.test(newEmail)) {
      setReducerState("setIsNotEmailFormat", true)
      return;
    } else {
      try {
        const { data, error } = await supabase.auth.updateUser({ email: newEmail })
        if (error) {
          setReducerState("setError", true)
          console.log("error")
        }
        if (data) {
          setReducerState("setEmailSaved", true)
          resetStatesOnSave()
        }
      } catch (e) {
        console.log("Error in handleupdateemail", e)
        setReducerState("setError", true);
        console.log(error)
        //resetStatesOnSave()
      }

    }
  }

  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.settings.heading", "Settings")}</title>
        <meta name="description" content="Welcome to EKKO Media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout authenticated={isAuthenticated}>
        <FlexColContainer className="min-h-full gap-8 w-full px-4">
          <FlexColContainer className="gap-4">
            <FlexColCenteredX className="gap-4">
              <h1 className="text-2xl">Edit User Information</h1>
              <FormWrapper className={`${(isPasswordActive || isEmailActive) && "bg-gray-200 dark:bg-gray-900"}`}>
                <Form>
                  <Label htmlFor="first_name">First Name</Label>
                  <TextInput
                    type="text"
                    disabled={(isPasswordActive || isEmailActive) ? true : false}
                    id="first_name"
                    defaultValue={userInfo && userInfo.first_name ? userInfo.first_name : ''}
                  />
                  <Label htmlFor="last_name">Last Name</Label>
                  <TextInput type="text" disabled={(isPasswordActive || isEmailActive) ? true : false} id="last_name" defaultValue={userInfo && userInfo.last_name ? userInfo.last_name : ''} />

                  <FlexColContainer className="gap-4">
                    <FlexRowContainer className="justify-between">
                      <Label htmlFor="email">Email</Label>
                      <FaEdit className={`hover:text-slate-300 cursor-pointer ${(isPasswordActive || isEmailActive) && "hidden"}`}
                        onClick={() => { flipStateBoolean("setIsEmailActive", isEmailActive) }} />
                    </FlexRowContainer>
                    <TextInput type="email" id="email" disabled={true} defaultValue={userEmail && userEmail ? userEmail : ""} />
                  </FlexColContainer>
                  <FlexColContainer className="gap-4">
                    <FlexRowContainer className="justify-between">
                      <Label htmlFor="old-password">Password</Label>
                      <FaEdit className={`hover:text-slate-300 cursor-pointer ${(isPasswordActive || isEmailActive) && "hidden"}`}
                        onClick={() => { flipStateBoolean("setIsPasswordActive", isPasswordActive) }} />
                    </FlexRowContainer>
                    <TextInput type="password" id="old-password" disabled={true} value={"placeholder12"} />
                  </FlexColContainer>
                </Form>
              </FormWrapper>
              {(!emailSaved && !passwordSaved) ?
                <FlexColContainer className="w-full max-w-[700px]">
                  {
                    !isEmailActive && isPasswordActive &&
                    <FormWrapper>
                      <Form onSubmit={handlePasswordSubmit}>
                        <FlexColContainer className="gap-4">
                          <Label htmlFor="new-password">New Password</Label>
                          <TextInput type="text" id="new-password" value={newPassword} onChange={(e) => setReducerState("setNewPassword", (e.target.value))} placeholder="New Password" />
                          <Label htmlFor="new-password-repeat">Repeat Password</Label>
                          <TextInput type="text" id="new-password-repeat" value={repeatNewPassword} onChange={(e) => setReducerState("setRepeatNewPassword", (e.target.value))} placeholder="Repeat Password" />
                          {passwordMismatch && <Badge color={"warning"}>Password not matching</Badge>}
                          {passwordEmpty && <Badge color={"warning"}>Password cannot be empty</Badge>}
                          {passwordSaved && <Badge color={"success"}>Password has been changed</Badge>}
                          {passwordNotStrongEnough && <Badge color={"warning"}>Password must be at least 12 characters long, have a special character, a number, and upper and lowercase letters.</Badge>}
                          <FlexRowContainer className="justify-end gap-4">
                            <SubmitButton type="submit">Save</SubmitButton>
                            <HollowButton type="button" onClick={() => { flipStateBoolean("setIsPasswordActive", isPasswordActive) }}>Cancel</HollowButton>
                          </FlexRowContainer>
                        </FlexColContainer>
                      </Form>
                    </FormWrapper>}
                  {isEmailActive && !isPasswordActive &&
                    <FormWrapper>
                      <Form onSubmit={handleEmailSubmit}>
                        <FlexColContainer className="gap-4">
                          <Label htmlFor="new-email">New Email</Label>
                          <TextInput type="text" id="new-email" value={newEmail} onChange={(e) => setReducerState("setNewEmail", (e.target.value))} placeholder="New Email" />
                          <Label htmlFor="new-email-repeat">Repeat Email</Label>
                          <TextInput type="text" id="new-email-repeat" value={repeatNewEmail} onChange={(e) => setReducerState("setRepeatNewEmail", (e.target.value))} placeholder="Repeat Email" />
                          {newEmailMismatch && <Badge color={"warning"}>Email not matching</Badge>}
                          {emailEmpty && <Badge color={"warning"}>Email cannot be empty</Badge>}
                          {emailSaved && <Badge color={"success"}>Email has been changed</Badge>}
                          {isNotEmailFormat && <Badge color={"warning"}>Needs to be email format, like joe@example.com</Badge>}
                          <FlexRowContainer className="justify-end gap-4">
                            <SubmitButton type="submit">Save</SubmitButton>
                            <HollowButton type="button" onClick={() => { flipStateBoolean("setIsEmailActive", isEmailActive) }}>Cancel</HollowButton>
                          </FlexRowContainer>
                        </FlexColContainer>
                      </Form>
                    </FormWrapper>
                  }
                </FlexColContainer>
                :
                <FlexColCentered className="p-8 gap-4">
                  <CheckIcon />
                  {emailSaved && <p>Email change request as been sent to {userEmail}</p>}
                  {passwordSaved && <p>Password has been changed!</p>}
                </FlexColCentered>
              }
              {error &&
                <Badge color="failure">An error has occured</Badge>
              }
              <FlexRowCentered className="gap-4">
                {subTiers && userInfo?.subscription_tier_id &&
                  subTiers.map((tier) => {
                    return <div key={"card-" + tier.id}>
                      <TierCard subTier={tier} userInfo={userInfo} />
                    </div>
                  })
                }
              </FlexRowCentered>
              <FlexColCentered>
                <HollowButton className="border-red-600 text-red-600">
                  Delete User
                </HollowButton>
              </FlexColCentered>

            </FlexColCenteredX>
          </FlexColContainer>
        </FlexColContainer>
      </PageLayout>
    </>
  );
}




export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, ["common"]))
    }
  }
}

export default Page
