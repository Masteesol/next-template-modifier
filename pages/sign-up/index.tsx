import Head from "next/head";
import { useRouter } from "next/router";
import { initialState, reducer } from "@/hooks/useCredentialsStates";
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
    FlexColContainer,
    FlexRowCentered
} from "@/components/shared/styled-global-components";
import { translateOrDefault } from "@/utils/i18nUtils";
import { useState, useContext, useReducer } from "react"
import React from "react";
import PageLayout from "@/components/landing/PageLayout";
import Link from "next/link";
import { LoadingContext } from '@/context/LoadingContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AuthContext } from "@/context/AuthContext";

const FormSignUp = ({ setIsLoading }: any) => {
    const supabase = createClientComponentClient()
    const [state, dispatch] = useReducer(reducer, initialState);
    const { t } = useTranslation("common");
    const router = useRouter()
    const { isAuthenticated } = useContext(AuthContext)
    if (isAuthenticated) {
        router.push("/")
    }
    const {
        newPassword,
        repeatNewPassword,
        passwordMismatch,
        passwordEmpty,
        passwordSaved,
        passwordNotStrongEnough,
    } = state

    const setReducerState = (type: string, state: any) => {
        dispatch({ type: type, payload: state })
    }
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{12,}$/;
    // Client-side function
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        console.log(newPassword)
        console.log(email);
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
                setIsLoading(true)
                const { data, error } = await supabase.auth.signUp({ email: email, password: newPassword });

                if (data && data.user) {
                    console.log("Sign up data")
                    const { error: userError } = await supabase
                        .from('users')
                        .insert([
                            {
                                id: data.user.id,
                                first_name: firstName,
                                last_name: lastName,
                            },
                        ]);
                    if (userError) {
                        console.log("error creating user table", userError)
                        setIsLoading(false)
                    } else {
                        console.log("Created new account")
                        window.location.href = "/sign-up/confirm"
                    }
                }
                if (error) {
                    console.log("Error creating user")
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
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
                    <TextInput type="password" id="new-password" value={newPassword} onChange={(e) => setReducerState("setNewPassword", (e.target.value))} placeholder="New Password" />
                    <Label htmlFor="new-password-repeat">Repeat Password</Label>
                    <TextInput type="password" id="new-password-repeat" value={repeatNewPassword} onChange={(e) => setReducerState("setRepeatNewPassword", (e.target.value))} placeholder="Repeat Password" />
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
            <PageLayout>
                <FlexColCentered className="min-h-[100vh] min-w-full relative gap-8">
                    <H1>{translateOrDefault(t, "pages.signUp.heading", "Sign Up")}</H1>
                    <FormSignUp setIsLoading={setIsLoading} />
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
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ["common"]))
        }
    }
}
export default Page;