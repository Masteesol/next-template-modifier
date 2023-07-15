import Head from "next/head";
import { useContext } from "react"
import React from "react";
import PageLayout from "@/components/app/PageLayout";
import Link from "next/link"
//import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';
//import { translateOrDefault } from "@/utils/i18nUtils";

import { AuthContext } from "@/context/AuthContext";
import { CardBaseLightHover, FlexColCentered, FlexColCenteredX, FlexColContainer, FlexRowCenteredY, FlexRowContainer, H1 } from "@/components/shared/styled-global-components";
import {
    BsFileEarmarkText,
    BsPerson,
    BsCreditCard2Front,
} from "react-icons/bs";

const mockData = [
    {
        name: "Ticket Closed",
        category: "Ticket Updates",
        copiedCount: 21
    },
    {
        name: "Friendly reminder",
        category: "Payment reminders",
        copiedCount: 8
    },
    {
        name: "Ticket Update",
        category: "Ticket Updates",
        copiedCount: 14
    },
    {
        name: "Ticket Closed",
        category: "Ticket Updates",
        copiedCount: 2
    },
]

const Page = () => {
    //const { t } = useTranslation("common");
    const { isAuthenticated } = useContext(AuthContext)
    const sortedData = mockData.sort((a, b) => {
        return b.copiedCount - a.copiedCount
    })
    return (
        <>
            <Head>
                <title>Templify App - Dashboard</title>
                <meta name="description" content="The Template Modifier Dashbaord is where you can view usage stats and quick navigation around the platform" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout authenticated={isAuthenticated}>
                <FlexColCenteredX className="p-4 md:p-8">
                    <FlexColContainer className="w-full max-w-[1280px] gap-8">
                        <H1>
                            Dashboard
                        </H1>
                        <FlexColContainer className="gap-4">
                            <h2>Quick Links</h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <Link href="/app/templates">
                                    <CardBaseLightHover className="rounded shadow bg-white p-4">
                                        <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                                            <BsFileEarmarkText /> <h2 className="text-sm md:text-lg">Template Editor</h2>
                                        </FlexRowCenteredY>
                                    </CardBaseLightHover>
                                </Link>
                                <Link href="/app/templates/tutorial">
                                    <CardBaseLightHover className="rounded shadow bg-white p-4">
                                        <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                                            <BsFileEarmarkText /> <h2 className="text-sm md:text-lg">Editor Tutorial</h2>
                                        </FlexRowCenteredY>
                                    </CardBaseLightHover>
                                </Link>
                                <Link href="/app/settings">
                                    <CardBaseLightHover className="rounded shadow bg-white p-4">
                                        <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                                            <BsPerson /> <h2 className="text-sm md:text-lg">User Information</h2>
                                        </FlexRowCenteredY>
                                    </CardBaseLightHover>
                                </Link>
                                <Link href="/app/plans">
                                    <CardBaseLightHover className="rounded shadow bg-white p-4">
                                        <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                                            <BsCreditCard2Front /> <h2 className="text-sm md:text-lg">Subscriptions</h2>
                                        </FlexRowCenteredY>
                                    </CardBaseLightHover>
                                </Link>
                            </div>
                        </FlexColContainer>
                        <FlexColContainer className="gap-4">
                            <h2>Statistics</h2>
                            {/**Will be replaced with real data */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {sortedData.map((item, index) => {
                                    const { name, category, copiedCount } = item
                                    return <FlexColContainer className="gap-2" key={`count-card-${index}`}>
                                        <h3 className="text-xl">#{index + 1}</h3>
                                        <FlexRowContainer className="gap-4 rounded shadow bg-white p-4">
                                            <FlexColContainer className="w-full gap-2 truncate text-xs md:text-sm">
                                                <h4 className="font-bold">{name}</h4>
                                                <p className="text-gray-500">Category: {category}</p>
                                                <p className="text-gray-500">Date Created: 14/07/23</p>
                                            </FlexColContainer>
                                            <FlexColCentered className="w-full md:w-[40%] gap-2">
                                                <span className="font-bold text-4xl md:text-6xl text-green-600">
                                                    {copiedCount}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    Times Copied
                                                </span>
                                            </FlexColCentered>
                                        </FlexRowContainer>
                                    </FlexColContainer>
                                })}
                            </div>
                        </FlexColContainer>
                    </FlexColContainer>
                </FlexColCenteredX>

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
