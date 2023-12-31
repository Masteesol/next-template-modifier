import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from 'next';
import { Badge, Label, TextInput } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  FlexColCentered,
  H1,
  FormWrapper,
  Form,
  SubmitButton,
  FlexRowContainer,
  FlexRowCentered
} from "@/components/shared/styled-global-components";
import { translateOrDefault } from "@/utils/i18nUtils";
import { useState, useContext } from "react"
import React from "react";
import PageLayout from "@/components/landing/PageLayout";
import Link from "next/link";
import { LoadingContext } from '@/context/LoadingContext';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'
import { AuthContext } from "@/context/AuthContext";

const FormLogin = ({ setIsLoading }: any) => {
  const { t } = useTranslation("common");
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuthenticated } = useContext(AuthContext)
  if (isAuthenticated) {
    setIsLoading(true)
    router.push("/app")
    setIsLoading(false)
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const supabase = createClientComponentClient()
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (data.session && !error) { // check for a session instead of no error
        setIsLoading(true)
        window.location.href = "/app"
      } else {
        setErrorMessage("Either password or email is wrong");
      }

    } catch (error) {
      console.error("Error during form submission", error);
      setErrorMessage("Either password or email is wrong");
      setIsLoading(false)
    }
  }


  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setEmailEmpty(e.target.value === "");
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setPasswordEmpty(e.target.value === "");
  };
  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value={translateOrDefault(t, "pages.signIn.form.labels.username", "Your Email")} />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="user@example.com"
            required={true}
            onChange={handleEmailChange}
          />
          {emailEmpty && <FlexRowContainer className="justify-end"><Badge color="warning">This field cannot be empty</Badge></FlexRowContainer>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value={translateOrDefault(t, "pages.signIn.form.labels.password", "Password")} />
          </div>
          <TextInput
            id="password"
            type="password"
            placeholder=""
            required={true}
            onChange={handlePasswordChange}
          />
          {passwordEmpty && <FlexRowContainer className="justify-end"><Badge color="warning">This field cannot be empty</Badge></FlexRowContainer>}
        </div>
        <SubmitButton
          type="submit"
        >
          {translateOrDefault(t, "pages.signIn.form.submit", "Sign In")}
        </SubmitButton>
        {errorMessage && <FlexRowContainer className="justify-end"><Badge color="failure">{errorMessage}</Badge></FlexRowContainer>}
      </Form>
    </FormWrapper>
  );
};

const Page = () => {
  const { t } = useTranslation("common");
  const { setIsLoading } = useContext(LoadingContext);
  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.signIn.heading", "Sign In")}</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout >
        <FlexColCentered className="min-h-[100vh] min-w-full relative gap-8">
          <H1>{translateOrDefault(t, "pages.signIn.heading", "Sign In")}</H1>
          <FormLogin setIsLoading={setIsLoading} />
          <FlexRowCentered className="gap-2">
            <p>Not a user?</p>
            <Link className="text-green-500" href="/sign-up">Sign up</Link>
          </FlexRowCentered>
        </FlexColCentered>
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
export default Page;