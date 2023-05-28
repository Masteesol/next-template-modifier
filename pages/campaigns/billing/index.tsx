import Head from "next/head";
import { GetServerSideProps } from "next";
import PageLayout from "@/components/PageLayout";
import { FlexColCentered, H1 } from "@/components/styled-global-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { translateOrDefault } from "@/utils/i18nUtils";

export default function Page() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.billing.heading", "Invoices")}</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColCentered className="min-h-full">
          <H1>{translateOrDefault(t, "pages.billing.heading", "Invoices")}</H1>
        </FlexColCentered>
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
