import Head from "next/head";
import { useContext } from "react"
import React from "react";
import PageLayout from "@/components/app/PageLayout";
//import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';
//import { translateOrDefault } from "@/utils/i18nUtils";
import Tutorial from "@/components/app/TemplateEditor/Tutorial/TemplateCardStandAlone";
import { AuthContext } from "@/context/AuthContext";

const Page = () => {
    //const { t } = useTranslation("common");
    const { isAuthenticated } = useContext(AuthContext)
    return (
        <>
            <Head>
                <title>App Tutorial</title>
                <meta name="description" content="How to use the Template Modifier App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout authenticated={isAuthenticated}>
                <Tutorial />
            </PageLayout >
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
