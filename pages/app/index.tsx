import Head from "next/head";
import PageLayout from "@/components/app/PageLayout";
//import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';
import { useState, useEffect, useContext } from "react";
//import { translateOrDefault } from "@/utils/i18nUtils";

import { AuthContext } from "@/context/AuthContext";
import {
    FlexColCenteredX,
    FlexColContainer,
    FlexRowCenteredY,
    GridSm1Lg2,
    H1
} from "@/components/shared/styled-global-components";

import {
    BsFileEarmarkText,
    BsPerson,
    BsCreditCard2Front,
} from "react-icons/bs";

import { fetchTemplatesForUser } from "@/requests/templates";
import Cookies from "js-cookie";
import { LoadingContext } from "@/context/LoadingContext";
import { TemplatesContainer } from "@/types/global";
import { FavouritesCard, NumbersCard, UsageCard, QuickLinkCard } from "@/components/app/Dashboard/Cards";
import { TemplateModified } from "@/types/global";

const quickLinksData = [
    {
        path: "/app/templates",
        text: "Template Editor",
        icon: <BsFileEarmarkText />,
        color: "hover:border-green-500 hover:text-green-500"
    },
    {
        path: "/app/templates/tutorial",
        text: "Tutorial",
        icon: <BsFileEarmarkText />,
        color: "hover:border-indigo-400 hover:text-indigo-400"
    },
    {
        path: "/app/settings",
        text: "User Info",
        icon: <BsPerson />,
        color: "hover:border-blue-400 hover:text-blue-400"
    },
    {
        path: "/app/plans",
        text: "Subscriptions",
        icon: <BsCreditCard2Front />,
        color: "hover:border-orange-400 hover:text-orange-400"
    },
]

const Page = () => {
    //const { t } = useTranslation("common");
    const { isAuthenticated } = useContext(AuthContext)
    const [textTemplates, setTextTemplates] = useState<TemplateModified[]>([]);
    const [textTemplateFull, setTextTemplatesFull] = useState<TemplatesContainer[]>([]);
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
                console.log("templatesModified", templatesModified)
                setTextTemplates(templatesModified.sort((a, b) => b.copy_count - a.copy_count));
                setTextTemplatesFull(templatesContainer)
            }
        }).catch((error) => {
            console.error("Error fetching orders: ", error)
        });
    }, [userID, setIsLoading]);

    // const checkAverage = () => {
    //     if (textTemplates.length > 0) {
    //         const sum = textTemplates.reduce((acc, currentIndex) => {
    //             const text = currentIndex.text;
    //             const length = text.length;
    //             return acc + length;
    //         }, 0);

    //         const average = sum / textTemplates.length;

    //         return typeof average === "number" ? average.toFixed(0) : 0;
    //     } else {
    //         return 0
    //     }
    // }

    const checkFavouritedLength = () => {
        return textTemplates.filter((item) => item.favourited && item).length
    }
    const checkTotalTruncatedArray = () => {
        const total = textTemplates.slice(0, 5).reduce((acc, current) => acc + current.copy_count, 0);
        return total;
    }

    return (
        <>
            <Head>
                <title>Templify App - Dashboard</title>
                <meta name="description" content="The Template Modifier Dashbaord is where you can view usage stats and quick navigation around the platform" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout authenticated={isAuthenticated}>
                <FlexColCenteredX className="p-2 sm:p-4">
                    <FlexColContainer className="w-full max-w-[1580px] gap-4 md:gap-8">
                        <FlexRowCenteredY className="justify-between">
                            <H1>App Dashboard</H1>
                            <p className="font-bold">{`Basic Plan (Free)`}</p>
                        </FlexRowCenteredY>
                        <FlexColContainer className="gap-4">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                {quickLinksData.map((item, index) => {
                                    return <QuickLinkCard item={item} key={`quicklink-card-${index}`} />
                                })}
                            </div>
                        </FlexColContainer>
                        <GridSm1Lg2 className="gap-4 md:gap8 lg:gap-2">
                            <FavouritesCard
                                textTemplates={textTemplates}
                                checkFavouritedLength={checkFavouritedLength}
                            />
                            <NumbersCard
                                textTemplates={textTemplates}
                                textTemplateFull={textTemplateFull}
                            />
                        </GridSm1Lg2>
                        <UsageCard
                            textTemplates={textTemplates}
                            checkTotalTruncatedArray={checkTotalTruncatedArray}
                        />
                    </FlexColContainer>
                </FlexColCenteredX >
                <div className="min-h-[20rem] w-full"></div>
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


