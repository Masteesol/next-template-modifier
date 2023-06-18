import Head from "next/head";
import { NextPage } from 'next';
import cookie from 'cookie'
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from 'next';
import { Badge, Label, TextInput } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FlexColCentered, H1, FormWrapper, Form, SubmitButton, FlexRowContainer } from "@/components/styled-global-components";
import { translateOrDefault } from "@/utils/i18nUtils";
import { useState } from "react"
import React from "react";
import { login } from "@/api/auth";
import checkEnv from "@/utils/checkEnv";
import PageLayout from "@/components/PageLayout";

const FormLogin = () => {
  const { t } = useTranslation("common");

  const [email, setEmail] = useState("");
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Client-side function
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await login(email, password)
      console.log("response", response)
      window.location.replace(checkEnv() + "/templates");
    } catch (error) {
      console.error("Error during form submission", error);
      setErrorMessage("Either password or email is wrong");
    }
  };

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

type PageProps = {
  authenticated: boolean,
  userID: string | null,
}

const Page: NextPage<PageProps> = ({ authenticated }) => {
  const { t } = useTranslation("common");
  /*
  const handleSubmit = () => {
    //handle submit
  }*/
  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.signIn.heading", "Sign In")}</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout authenticated={authenticated}>
        <FlexColCentered className="min-h-[100vh] min-w-full relative gap-8">
          <H1>{translateOrDefault(t, "pages.signIn.heading", "Sign In")}</H1>
          <FormLogin />
        </FlexColCentered>
      </PageLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req ? cookie.parse(context.req.headers.cookie || '') : undefined
  const token = cookies && cookies.supabaseToken
  return {
    props: {
      authenticated: Boolean(token),
      ...(await serverSideTranslations(context.locale as string, ["common"]))
    }
  }
}
export default Page;