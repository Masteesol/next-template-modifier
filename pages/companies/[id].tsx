import Head from "next/head";
import { GetServerSideProps } from 'next';
import PageLayout from "@/components/PageLayout";
import {
  FlexColContainer,
  FlexRowContainer,
  H1,
  H2,
} from "@/components/styled-global-components";
//MockData
import mockCompanyData from "@/mockData/companyData.json";
import mockStaffData from "@/mockData/staffData.json";
import { Card } from "flowbite-react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { translateOrDefault } from "@/utils/i18nUtils";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation("common");
  //Needs to be connected backend
  const company = mockCompanyData.company.filter((item) => item.id === id)[0];
  console.log(mockCompanyData.company);
  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.companyOverview.heading", "Company Overview")}</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColContainer className="min-h-full gap-5">
          <H2>{company ? company.name : ""}</H2>
          <H1>{translateOrDefault(t, "pages.companyOverview.heading", "Company Overview")}</H1>
          <FlexRowContainer className="flex-wrap gap-2">
            {mockStaffData
              ? mockStaffData.staff.map((item, index) => {
                return (
                  <div className="max-w-sm" key={index}>
                    <Card>
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.full_name}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {item.email}
                      </p>
                      <p className="font-bold text-gray-700 dark:text-gray-400">
                        {item.position}
                      </p>
                    </Card>
                  </div>
                );
              })
              : ""}
          </FlexRowContainer>
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