import Head from "next/head";
import Link from "next/link";

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PageLayout from "@/components/PageLayout";
import {
  FlexColCentered,
  FlexColContainer,
  H1,
  LinkButton,
} from "@/components/styled-global-components";
import { translateOrDefault } from "@/utils/i18nUtils";

export default function Home() {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.settings.heading", "Settings")}</title>
        <meta name="description" content="Welcome to EKKO Media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColContainer className="min-h-full">
          <H1>{translateOrDefault(t, "", "Dashboard")}</H1>
          <FlexColCentered className="min-h-[50vh]">
            <Link href="./">
              <LinkButton>View Active Listings</LinkButton>
            </Link>
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
