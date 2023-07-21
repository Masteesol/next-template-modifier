import Head from "next/head";
import PageLayout from "@/components/app/PageLayout";
import Link from "next/link"
//import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';
import { useState, useEffect, useContext } from "react";
//import { translateOrDefault } from "@/utils/i18nUtils";

import { AuthContext } from "@/context/AuthContext";
import { CardBaseLightHover, FlexColCentered, FlexColCenteredX, FlexColContainer, FlexRowCenteredY, GridSm2Lg4, H1 } from "@/components/shared/styled-global-components";
import {
    BsFileEarmarkText,
    BsPerson,
    BsCreditCard2Front,
    BsStarFill,
} from "react-icons/bs";
import { fetchTemplatesForUser } from "@/requests/templates";
import Cookies from "js-cookie";
import { LoadingContext } from "@/context/LoadingContext";
import Tables from "@/components/app/Dashboard/Tables";
import Piechart from "@/components/app/Dashboard/PieChart";

interface TemplateModified {
    title: string;
    template_id: string;
    copy_count: number;
    category_name: string;
    char_limit: number | null
    text: string;
    word_limit: number;
    favourited: boolean;
    category_id: string;
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
                const templatesContainer = data
                const templatesModified: TemplateModified[] = [];

                templatesContainer.forEach(container => {
                    container.templates.forEach(template => {
                        templatesModified.push({
                            ...template,
                            category_name: container.category_name,
                            category_id: container.category_id,
                        });
                    });
                });
                setTextTemplates(templatesModified.sort((a, b) => b.copy_count - a.copy_count));
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
                    <FlexColContainer className="w-full max-w-[1580px] gap-8">
                        <H1>
                            Dashboard
                        </H1>

                        <FlexColContainer className="gap-4">
                            <h2>Quick Links</h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
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
                            <h2>Favourites</h2>
                            {
                                textTemplates && textTemplates.length > 0
                                &&
                                <GridSm2Lg4 className="gap-2">
                                    {textTemplates.map((item, index) => {
                                        console.log(item.favourited && item)
                                        return item.favourited &&
                                            <Link href={`/app/templates?category_id=${item.category_id}`}
                                                key={`favourite-${index}`}
                                            >
                                                <CardBaseLightHover className="rounded shadow bg-white p-4">
                                                    <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                                                        <BsStarFill className="text-green-500" /> <h2 className="text-sm md:text-lg">{item.title}</h2>
                                                    </FlexRowCenteredY>
                                                    <p className="text-gray-500 text-xs md:text-sm"> {`${item.text.substring(0, 80)}...`}</p>
                                                </CardBaseLightHover>
                                            </Link>

                                    })}

                                </GridSm2Lg4>
                            }
                        </FlexColContainer>
                        <FlexColContainer className="gap-4 bg-slate-100 dark:bg-slate-900 rounded p-4">
                            <h2>Statistics</h2>
                            {textTemplates && textTemplates.length > 0
                                ?
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                    <FlexColCentered className="gap-4">
                                        <h3>Ratio</h3>
                                        <Piechart textTemplates={textTemplates} />
                                        <i>Total Copied: {`${textTemplates.reduce((acc, current) => acc + current.copy_count, 0)}`}</i>
                                    </FlexColCentered>
                                    <FlexColContainer className="gap-4 max-w-[100vh] overflow-x-auto">
                                        <Tables textTemplates={textTemplates} />
                                    </FlexColContainer>

                                </div>
                                :
                                <i>{`The app tracks your usage by counting how many times you've copied each template. The results will be displayed here.`}</i>
                            }
                        </FlexColContainer>


                    </FlexColContainer>
                </FlexColCenteredX >
                <div className="min-h-[30rem] w-full"></div>
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


