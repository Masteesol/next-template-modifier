import Head from "next/head";
import { GetServerSideProps } from "next/types";
import PageLayout from "@/components/PageLayout";
import {
  FlexColContainer,
  H1,
  CardBaseLight,
  CardBaseDark,
} from "@/components/styled-global-components";
import tw from "tailwind-styled-components";
import Link from "next/link";
import {
  FaArchive,
  FaChartPie,
  FaTable,
  FaEdit
} from "react-icons/fa";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { translateOrDefault } from "@/utils/i18nUtils";

const Card = tw(CardBaseLight)`
  p-4
  lg:p-7
  items-center
  gap-2
  lg:gap-5
  flex
  flex-col
  lg:flex-row
`;

const CardDark = tw(CardBaseDark)`
  p-7
  items-center
  gap-2
  lg:gap-5
  flex
  flex-col
  lg:flex-row
`;

interface LinkItem {
  text: string;
  textDefault: string;
  href: string;
  icon: React.ReactNode;
}

const IconStyle = "text-2xl md:text-4xl"

const links: LinkItem[] = [
  {
    text: "pages.campaigns.links.approvals",
    textDefault: "Approvals",
    href: "campaigns/approvals",
    icon: <FaTable className={IconStyle} />
  },
  {
    text: "pages.campaigns.links.published",
    textDefault: "Published",
    href: "campaigns/published",
    icon: <FaChartPie className={IconStyle} />
  },
  {
    text: "pages.campaigns.links.archived",
    textDefault: "Archived",
    href: "campaigns/archived",
    icon: <FaArchive className={IconStyle} />
  },
]

export default function Page() {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.campaigns.heading", "Campaigns")}</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColContainer className="min-h-full items-center">
          <FlexColContainer className="max-w-[768px] w-full">
            <H1>{translateOrDefault(t, "pages.campaigns.heading", "Campaigns")}</H1>
            <FlexColContainer className="gap-3">
              <FlexColContainer className="gap-3 items-center justify-center pt-10">
                <Link href="campaigns/editor" className="w-full flex-1">
                  <CardDark>
                    <FaEdit className="text-3xl md:text-5xl dark:text-white" />
                    <h3 className="text-slate-50 text-xl md:text-2xl">
                      {translateOrDefault(t, "", "Start working with campaigns")}
                    </h3>
                  </CardDark>
                </Link>
                {links.map((link, index) => {
                  return (
                    <Link href={link.href} className="w-full flex-1" key={index}>
                      <Card>
                        {link.icon}
                        <h3 className="text-sm md:text-lg">
                          {translateOrDefault(t, link.text, link.textDefault)}
                        </h3>
                      </Card>
                    </Link>
                  )
                })}
              </FlexColContainer>
            </FlexColContainer>
          </FlexColContainer>
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

