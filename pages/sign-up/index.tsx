import Head from "next/head";
import { NextPage } from 'next';
import cookie from 'cookie'
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from 'next';
import { Badge, Label, TextInput } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FlexColCentered, H1, FormWrapper, Form, SubmitButton, FlexRowContainer, FlexColContainer, FlexRowCentered } from "@/components/styled-global-components";
import { translateOrDefault } from "@/utils/i18nUtils";
import { useState } from "react"
import React from "react";
import { registerUser } from "@/requests/auth";
import checkEnv from "@/utils/checkEnv";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
const FormLogin = () => {
    const { t } = useTranslation("common");

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [passwordSaved, setPasswordSaved] = useState(false);
    const [passwordNotStrongEnough, setPasswordNotStrongEnough] = useState(false);

    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{12,}$/;
    // Client-side function
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        console.log(newPassword)
        console.log(email);
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
            try {
                const response = await registerUser(email, newPassword, firstName, lastName)
                console.log("response", response)
                window.location.replace(checkEnv() + "/sign-in")
                console.log("Logged in")
            } catch (error) {
                console.error("Error during form submission", error);
                setErrorMessage("Either password or email is wrong");
            }
        }
    };

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="first_name" value={translateOrDefault(t, "pages.signup.form.labels.firstname", "First Name")} />
                    </div>
                    <TextInput
                        id="first_name"
                        type="text"
                        placeholder="Your First Name"
                        required={true}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="last_name" value={translateOrDefault(t, "pages.signup.form.labels.lastname", "Last Name")} />
                    </div>
                    <TextInput
                        id="last_name"
                        type="text"
                        placeholder="Your Last Name"
                        required={true}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value={translateOrDefault(t, "pages.signIn.form.labels.email", "Email")} />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <FlexColContainer className="gap-4">
                    <Label htmlFor="new-password">New Password</Label>
                    <TextInput type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
                    <Label htmlFor="new-password-repeat">Repeat Password</Label>
                    <TextInput type="password" id="new-password-repeat" value={repeatNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} placeholder="Repeat Password" />
                    {passwordMismatch && <Badge color={"warning"}>Password not matching</Badge>}
                    {passwordEmpty && <Badge color={"warning"}>Password cannot be empty</Badge>}
                    {passwordSaved && <Badge color={"success"}>Password has been reset</Badge>}
                    {passwordNotStrongEnough && <Badge color={"warning"}>Password must be at least 12 characters long, have a special character, a number, and upper and lowercase letters.</Badge>}
                </FlexColContainer>
                <SubmitButton
                    type="submit"
                >
                    {translateOrDefault(t, "pages.signUp.form.submit", "Sign Up")}
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
                    <H1>{translateOrDefault(t, "pages.signUp.heading", "Sign Up")}</H1>
                    <FormLogin />
                    <FlexRowCentered className="gap-2">
                        <p>Existing user?</p>
                        <Link className="text-green-500" href="/sign-in">Sign In</Link>
                    </FlexRowCentered>
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