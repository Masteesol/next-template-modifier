import Head from "next/head";
import Link from "next/link";

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PageLayout from "@/components/PageLayout";
import {
  FlexColCentered,
  FlexColContainer,
  FlexColRowContainer,
  H1,
  H3,
  LinkButton,
} from "@/components/styled-global-components";
import { translateOrDefault } from "@/utils/i18nUtils";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "", "Editor")}</title>
        <meta name="description" content="Welcome to EKKO Media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColContainer className="min-h-full">
          <h2 className="text-xl">{translateOrDefault(t, "", "Editor")}</h2>
          <H1>Start creating campaigns</H1>
          <FlexColCentered className="min-h-[50vh]">
            <FlexColContainer className="gap-8 max-w-[900px] text-center">
              <H3>Create new or use existing data</H3>
              <FlexColRowContainer className=" items-center justify-center gap-8">
                <FlexColCentered className="border-[1px] border-gray-300 p-4 rounded gap-4">
                  <Link href="./approvals">
                    <LinkButton>Using existing data</LinkButton>
                  </Link>
                  <i>Create campaign using existing data</i>
                </FlexColCentered>
                <FlexColCentered className="border-[1px] border-gray-300 p-4 rounded gap-4">
                  <Link href="./editor/new">
                    <LinkButton>Create New Campaign</LinkButton>
                  </Link>
                  <i>Create a new campaign</i>
                </FlexColCentered>
              </FlexColRowContainer>
            </FlexColContainer>
          </FlexColCentered>

        </FlexColContainer>
      </PageLayout>
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
