import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from 'next';
import { Badge, Label, TextInput } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FlexColCentered, H1, FormWrapper, Form, SubmitButton, FlexRowContainer } from "@/components/styled-global-components";
import { translateOrDefault } from "@/utils/i18nUtils";
import { useState } from "react"
import React from "react";

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

    const response = await fetch('/api/signIn', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error during form submission", errorData.error);
      setErrorMessage(errorData.error);
    } else {
      const devUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL as string;
      const prodUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
      window.location.replace(process.env.NEXT_PUBLIC_API_ENV === 'development' ? devUrl : prodUrl);
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



export default function Page() {
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
      <FlexColCentered className="min-h-[100vh] min-w-full relative gap-8">
        <H1>{translateOrDefault(t, "pages.signIn.heading", "Sign In")}</H1>
        <FormLogin />
      </FlexColCentered>
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




