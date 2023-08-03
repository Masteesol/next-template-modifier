import Head from "next/head";
import React from "react";
import Image from "next/image"
import PageLayout from "@/components/landing/PageLayout";
//import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';
//import { translateOrDefault } from "@/utils/i18nUtils";
import {
    FlexColCentered,
    FlexColContainer,
    //GridSm1Md2,
    H1,
    H2,
    H3
} from "@/components/shared/styled-global-components";

const prismatixLogoUrlWhite = "https://res.cloudinary.com/dedym3sfv/image/upload/v1691052564/PRISMATIX/LOGO_PRISMAX_2_b9feik.png"

const Page = () => {
    //const { t } = useTranslation("common");
    return (
        <>
            <Head>
                <title>Templify - About</title>
                <meta name="description" content="About Templify and the Template Manager App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout>
                <FlexColCentered className="w-full">
                    <FlexColCentered
                        className="w-full h-[20rem] p-8 relative bg-white"
                    >
                        <div
                            className="z-40 opacity-70 absolute w-full h-full"
                        ></div>
                        <Image src={prismatixLogoUrlWhite} className="relative z-50" alt="prismatix-url" width={800} height={500} />
                    </FlexColCentered>

                    <FlexColContainer className="max-w-[1000px] w-full gap-8 text-sm md:text-base p-2 md:p-4">
                        <H1>About Templify and Prismatix</H1>
                        <FlexColContainer className="gap-2">
                            <H2>Prismatix</H2>
                            <p>Prismatix is a small development company founded by Marius Solheim in the summer of 2023. Prismatix specializes in delivering web applications which offer immersive user experiences through clean and modern design.
                            </p>
                            <H2>Templify</H2>
                            <p>Templify is the primary focus for the company and is still being developed and will soon be ready for beta testing with a small test group.
                            </p>
                            <H3>Beta testing</H3>
                            <p>
                                The goal for the beta testing is to root out bugs, improve the UX design and ensure that the platform is stable when going over to alpha and final release.
                            </p>
                        </FlexColContainer>
                    </FlexColContainer>
                    <div className="h-[20rem]"></div>
                </FlexColCentered >
            </PageLayout >
        </>
    );
}

// const TutorialSingleCard = ({ title, content, alt, link, inverted }:
//     { title: string, content: string, alt: string, link: string, inverted: boolean }) => {
//     const order = inverted ? "md:order-first" : ""
//     return (
//         <FlexColContainer className="gap-4 bg-green-50 text-green-800 p-2 rounded">
//             <H3 className="font-bold">{title}</H3>
//             <GridSm1Md2 className="gap-4">
//                 <FlexColContainer className="gap-4 justify-center">
//                     <p className="text-sm md:text-base">{content}</p>
//                 </FlexColContainer>
//                 <FlexColContainer className={`${order} gap-2 items-center md:items-start w-full`}>
//                     <FlexColCentered className="max-h-[20rem] overflow-hidden rounded shadow w-full">
//                         <Image className="w-full" src={link} alt={alt} height={400} width={400} />
//                     </FlexColCentered>
//                 </FlexColContainer>
//             </GridSm1Md2>
//         </FlexColContainer>
//     )
// }

// const TutorialVerticalCard = ({ title, content, alt, link, is_collection, styles }:
//     { title: string, content: string, alt: string, link: string, is_collection: boolean; styles: string }) => {
//     const theme = !is_collection ? "bg-green-50 text-green-800" : "bg-purple-50 text-purple-800"
//     return (
//         <FlexColContainer className={`${theme} gap-4 p-2 rounded`}>
//             <H3 className="font-bold">{title}</H3>
//             <p className="text-sm">{content}</p>
//             <FlexColCentered className={`max-h-[20rem] overflow-hidden rounded shadow w-full ${styles}`}>
//                 <Image className="w-full" src={link} alt={alt} height={400} width={400} />
//             </FlexColCentered>
//         </FlexColContainer>
//     )
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ["common"]))
        }
    }
}
export default Page;
