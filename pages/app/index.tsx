import Head from "next/head";
import PageLayout from "@/components/app/PageLayout";
import Link from "next/link"
//import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';
import { useState, useEffect, useContext } from "react";
//import { translateOrDefault } from "@/utils/i18nUtils";

import { AuthContext } from "@/context/AuthContext";
import { CardBaseLightHover, FlexColCentered, FlexColCenteredX, FlexColContainer, FlexRowCenteredY, FlexRowContainer, H1 } from "@/components/shared/styled-global-components";
import {
    BsFileEarmarkText,
    BsPerson,
    BsCreditCard2Front,
} from "react-icons/bs";
import { fetchTemplatesForUser } from "@/requests/templates";
import Cookies from "js-cookie";
import { LoadingContext } from "@/context/LoadingContext";

interface TemplateModified {
    title: string;
    template_id: string;
    copy_count: number;
    category_name: string;
    char_limit: number | null
    text: string;
    word_limit: number
}

const Page = () => {
    //const { t } = useTranslation("common");
    const { isAuthenticated } = useContext(AuthContext)
    const [textTemplates, setTextTemplates] = useState<TemplateModified[]>([]);
    const { setIsLoading } = useContext(LoadingContext)
    const userID = Cookies.get("user_id")

    useEffect(() => {
        fetchTemplatesForUser(userID, setIsLoading).then((data) => {
            if (data) {
                //console.log("Templates", data)
                const templatesContainer = data
                const templatesModified: any = [];

                templatesContainer.forEach(container => {
                    const validTemplates = container.templates.filter(template => template.copy_count !== 0);
                    validTemplates.forEach(template => {
                        templatesModified.push({
                            ...template,
                            category_name: container.category_name
                        });
                    });
                });
                setTextTemplates(templatesModified);
            }
        }).catch((error) => {
            console.error("Error fetching orders: ", error)
        });
    }, [userID, setIsLoading]);


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
                            {textTemplates && textTemplates.length > 0

                                ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {textTemplates.map((template, index) => {
                                        //console.log("item", template)
                                        return index < 5 && <FlexColContainer className="gap-2" key={`count-card-${index}`}>
                                            <h3 className="text-xl">#{index + 1}</h3>
                                            <FlexRowContainer className="gap-4 rounded shadow bg-white p-4">
                                                <FlexColContainer className="w-full gap-2 truncate text-xs md:text-sm">
                                                    <h4 className="font-bold">{template.title}</h4>
                                                    <p className="text-gray-500">Category: {template.category_name}</p>
                                                    <p className="text-gray-500">Date Created: 14/07/23</p>
                                                </FlexColContainer>
                                                <FlexColCentered className="w-full md:w-[40%] gap-2">
                                                    <span className="font-bold text-4xl md:text-6xl text-green-600">
                                                        {template.copy_count}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        Times Copied
                                                    </span>
                                                </FlexColCentered>
                                            </FlexRowContainer>
                                        </FlexColContainer>
                                    })
                                    }
                                </div>
                                :
                                <i>{`The app tracks your usage by counting how many times you've copied each template. The results will be displayed here.`}</i>
                            }

                        </FlexColContainer>
                    </FlexColContainer>
                </FlexColCenteredX >

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

