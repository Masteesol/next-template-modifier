import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from 'next';

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

import PageLayout from "@/components/PageLayout";
import {
  FlexColContainer,
  FlexColRowContainer,
  FlexRowContainer,
  H1,
  CardGrid,
  CardLarge,
  CardList,
} from "@/components/styled-global-components";

//MockData
import NemLogo from "@/assets/mockImages/nem-logo.svg";
import AttentusLogo from "@/assets/mockImages/attentus-logo.jpg";
import mockCompanyNames from "@/mockData/companyData.json";

import ViewSelector from "@/components/ViewSelector";
import { translateOrDefault } from "@/utils/i18nUtils";

export default function Page() {
  const [cardStyle, setCardStyle] = useState("list");

  const handleViewChange = (newView: string) => {
    setCardStyle(newView);
  };
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.companies.heading", "Companies")}</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColContainer className="min-h-full items-center">
          <FlexColContainer className="max-w-[1100px] w-full">
            <H1>{translateOrDefault(t, "pages.companies.heading", "Companies")}</H1>
            <ViewSelector onChange={handleViewChange} />
            <FlexColContainer className="gap-3">
              <FlexColContainer className="gap-3 items-center justify-center pt-10">
                <Link
                  href="companies/register-new-company"
                  className="w-full flex-1"
                >
                  <CardList className="flex-row max-w-full">
                    <FaPlusCircle className="text-3xl md:text-5xl" />
                    <h3 className="text-sm md:text-xl">
                      {translateOrDefault(t, "pages.companies.registerNew", "Register New Company")}
                    </h3>
                  </CardList>
                </Link>
                {cardStyle === "grid" && (
                  <FlexRowContainer className="w-full gap-2 flex-wrap">
                    {mockCompanyNames.company.map((item, index) =>
                      renderCard(item, index, cardStyle)
                    )}
                  </FlexRowContainer>
                )}
                {cardStyle === "large" && (
                  <FlexColRowContainer className="w-full gap-2 flex-wrap">
                    {mockCompanyNames.company.map((item, index) =>

                      renderCard(item, index, cardStyle)
                    )}
                  </FlexColRowContainer>
                )}
                {cardStyle === "list" && (
                  <FlexColContainer className="w-full gap-2">
                    {mockCompanyNames.company.map((item, index) =>
                      renderCard(item, index, cardStyle)
                    )}
                  </FlexColContainer>
                )}
              </FlexColContainer>
            </FlexColContainer>
          </FlexColContainer>
        </FlexColContainer>
      </PageLayout>
    </>
  );

  /*
  //Note not sure what real data will be used when connected BE
  interface CardItem {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
  }*/
  function renderCard(item: any, index: number, cardStyle: "grid" | "large" | "list") {
    const key = `card-${index}`;
    //console.log(cardStyle);
    switch (cardStyle) {
      case "grid":
        return (
          <Link
            href={"companies/" + item.id}
            className="flex-1 max-w-[15rem]"
            key={key}
          >
            <CardGrid>
              <Image
                src={index % 2 === 0 ? AttentusLogo : NemLogo}
                alt="test-attentus"
                className="h-full"
              />
              <h3 className="text-xl">{item.name}</h3>
            </CardGrid>
          </Link>
        );
      case "large":
        return (
          <Link
            href={"companies/" + item.id}
            className="flex-1 max-w-[30rem]"
            key={key}
          >
            <CardLarge className="overflow-hidden">
              <Image
                src={index % 2 === 0 ? AttentusLogo : NemLogo}
                alt="test-attentus"
                className="h-auto w-full"
              />
              <h3 className="text-xl">{item.name}</h3>
            </CardLarge>
          </Link>
        );
      case "list":
        return (
          <Link href={"companies/" + item.id} className="flex-1" key={key}>
            <CardList>
              <Image
                src={index % 2 === 0 ? AttentusLogo : NemLogo}
                alt="test-attentus"
                className="h-full max-h-[2rem] w-auto"
              />
              <h3 className="text-xl">{item.name}</h3>
            </CardList>
          </Link>
        );
      default:
        return null;
    }
  }
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};