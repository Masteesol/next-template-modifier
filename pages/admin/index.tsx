import Head from "next/head";
import React from "react";
import PageLayout from "@/components/PageLayout";
import { FlexColContainer, H1 } from "@/components/styled-global-components";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';
import { translateOrDefault } from "@/utils/i18nUtils";
import { Button } from "flowbite-react";
import Link from "next/link";

export default function Page() {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColContainer className="min-h-full gap-4">
          <H1>{translateOrDefault(t, "pages.admin.heading", "Admin Panel")}</H1>
          <Link href="/admin/invite-user">
            <Button>{translateOrDefault(t, "pages.admin.links.invite-user", "Invite New User")}</Button>
          </Link>
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
