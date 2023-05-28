import Head from "next/head";
import React from 'react'
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react"
//import { useTranslation } from "next-i18next";



import PageLayout from "@/components/PageLayout";
import {
  FlexColCenteredX,
  FlexColContainer,
  FlexColRowContainerLg,
} from "@/components/styled-global-components";


//MockData
import mockData from "@/mockData/addressData.json";
import TopBar from "@/components/Dashboard/TopBar";
import Demographics from "@/components/Dashboard/InfographicsDemographics"
import Channels from "@/components/Dashboard/InfographicsChannels"
import { useSelectedCompany } from "@/context/SelectedCompanyContext";
import { FaFacebook, FaInstagram, FaNewspaper } from "react-icons/fa";
import { Tabs, TabItem } from '@/components/TabsComponent';
import PreviewCarousel from "@/components/Dashboard/Components/PreviewCarousel";

/*
const mockImages = [
  "https://res.cloudinary.com/dedym3sfv/image/upload/v1682885382/mock-images-ekko/property4_iyse7z.jpg",
  "https://res.cloudinary.com/dedym3sfv/image/upload/v1682885382/mock-images-ekko/property3_xhvrni.jpg",
  "https://res.cloudinary.com/dedym3sfv/image/upload/v1682885382/mock-images-ekko/property2_etkddo.jpg",
  "https://res.cloudinary.com/dedym3sfv/image/upload/v1682885381/mock-images-ekko/property1_hqk0fz.jpg"
];
*/


type DataItem = {
  name: string;
  value: number;
}

type DataItemIcons = {
  name: string;
  value: number;
  icon: any;
  stats: {
    clicks: number;
    views: number;
    CTR: number;
  }
}



export default function Page() {
  //const { t } = useTranslation("common");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const property = mockData.addresses.filter(
    (item) => item.id === parseInt(id as string)
  )[0];

  const dataAges: DataItem[] = [
    { name: '18 - 24', value: 10 },
    { name: '25 - 34', value: 15 },
    { name: '35 - 44', value: 45 },
    { name: '45 - 54', value: 5 },
    { name: '55 - 64', value: 10 },
    { name: '64+', value: 10 },
  ];

  const dataDemography: DataItem[] = [
    { name: 'Menn', value: 40 },
    { name: 'Kvinner', value: 40 },
    { name: 'Ukjent', value: 20 },
  ];

  const SocialMedia: DataItemIcons[] = [
    {
      name: "Instagram",
      value: 20,
      icon: <FaInstagram />,
      stats: {
        clicks: 96,
        views: 273,
        CTR: 7.3,
      }
    },
    {
      name: "Facebook",
      value: 30,
      icon: <FaFacebook />,
      stats: {
        clicks: 60,
        views: 3330,
        CTR: 20.3,
      }
    },
    {
      name: "Nettaviser",
      value: 10,
      icon: <FaNewspaper />,
      stats: {
        clicks: 650,
        views: 22000,
        CTR: 8.3,
      }
    },
    {
      name: "Finn.no",
      value: 40,
      icon: <FinnIcon />,
      stats: {
        clicks: 150,
        views: 2725,
        CTR: 42.3,
      }
    },
  ]

  const { selectedCompany } = useSelectedCompany();
  const primary = selectedCompany?.theme?.colors?.primary.background ?? null;
  //const secondary = selectedCompany?.theme?.colors?.secondary.background ?? null;
  //console.log(selectedCompany)
  return (
    <>
      <Head>
        <title>{property ? `${property.addressData.street}` : ""}</title>
        <meta name="description" content="Welcome to EKKO Media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColCenteredX className="w-full">
          <FlexColContainer className="min-h-full gap-4 items-center max-w-[1400px] w-full">
            <TopBar property={property} theme={primary} />
            <FlexColContainer className="w-full gap-4">
              <h2 className="text-xl">Channels</h2>
              <Channels dataSocialMedia={SocialMedia} theme={primary} />
            </FlexColContainer>
            <FlexColContainer className="w-full gap-4">
              <h2 className="text-xl">Demographics</h2>
              <Demographics dataAges={dataAges} dataDemography={dataDemography} theme={primary} />
            </FlexColContainer>
            <FlexColContainer className="w-full gap-4">
              <h2 className="text-xl">Your Ads</h2>
              <FlexColRowContainerLg className="w-full gap-4">
                <FlexColContainer className="flex-1 min-h-[40rem] overflow-hidden text-6xl">
                  <Tabs setActiveTabIndex={setActiveTabIndex} activeTabIndex={activeTabIndex}>
                    <TabItem title="Online Newspapers">
                      <FlexColContainer className="gap-4">
                        <h3 className="text-2xl">Banners</h3>
                        <PreviewCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                          {property.media.createdBanners && property.media.createdBanners.map((item, index) => {
                            //console.log(item)
                            return <img key={index} alt="bannerimage" id={item.id} src={item.link} />
                          })}
                        </PreviewCarousel>
                      </FlexColContainer>
                    </TabItem>
                    <TabItem title="finn.no">
                      <FinnIcon />
                    </TabItem>
                    <TabItem title="Instagram">
                      <FaInstagram />
                    </TabItem>
                    <TabItem title="Facebook">
                      <FaFacebook />
                    </TabItem>
                  </Tabs>
                </FlexColContainer>

              </FlexColRowContainerLg>
            </FlexColContainer>
          </FlexColContainer>
        </FlexColCenteredX>
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



const FinnIcon = () => {
  return (
    <svg focusable="false"
      width="92"
      height="32"
      viewBox="0 0 184 64">
      <title>FINN.no</title>
      <path fill="current"
        d="M179.8 58V6c0-1-.8-1.9-1.9-1.9H66c-1 0-1.9.8-1.9 1.9v53.8H178c1 0 1.8-.8 1.8-1.8">
      </path>
      <path fill="current" d="M22.5 4.2H6C5 4.2 4.2 5 4.2 6v52c0 1 .8 1.9 1.9 1.9H60V41.5C59.9 20.9 43.2 4.2 22.5 4.2"></path>
      <path fill="#fff" d="M178 0H66c-3.3 0-6 2.7-6 6v17.4C53.2 9.6 38.9 0 22.5 0H6C2.7 0 0 2.7 0 6v52c0 3.3 2.7 6 6 6h172c3.3 0 6-2.7 6-6V6c0-3.3-2.7-6-6-6m1.8 58c0 1-.8 1.9-1.9 1.9H64.1V6c0-1 .8-1.9 1.9-1.9h112c1 0 1.9.8 1.9 1.9v52zM4.2 58V6C4.2 5 5 4.2 6 4.2h16.5c20.6 0 37.4 16.8 37.4 37.4v18.3H6c-1-.1-1.8-.9-1.8-1.9"></path>
      <path fill="#fff" d="M110.1 21.1h-4.2c-.7 0-1.2.5-1.2 1.2v19.3c0 .7.5 1.2 1.2 1.2h4.2c.7 0 1.2-.5 1.2-1.2V22.3c0-.6-.6-1.2-1.2-1.2m-12 0H83c-.7 0-1.2.5-1.2 1.2v19.3c0 .7.5 1.2 1.2 1.2h4.2c.7 0 1.2-.5 1.2-1.2v-4h7.7c.7 0 1.2-.5 1.2-1.2v-3.2c0-.7-.5-1.2-1.2-1.2h-7.7v-4.9h9.7c.7 0 1.2-.5 1.2-1.2v-3.7c0-.5-.6-1.1-1.2-1.1m62.8 0h-4.2c-.7 0-1.2.5-1.2 1.2v9.5l-6.6-10c-.3-.4-.8-.7-1.3-.7h-3.2c-.7 0-1.2.5-1.2 1.2v19.3c0 .7.5 1.2 1.2 1.2h4.2c.7 0 1.2-.5 1.2-1.2v-9.4l6.5 9.8c.3.4.8.7 1.3.7h3.4c.7 0 1.2-.5 1.2-1.2V22.3c-.1-.6-.6-1.2-1.3-1.2m-25.4 0h-4.2c-.7 0-1.2.5-1.2 1.2v9.5l-6.6-10c-.3-.4-.8-.7-1.3-.7H119c-.7 0-1.2.5-1.2 1.2v19.3c0 .7.5 1.2 1.2 1.2h4.2c.7 0 1.2-.5 1.2-1.2v-9.4l6.5 9.8c.3.4.8.7 1.3.7h3.4c.7 0 1.2-.5 1.2-1.2V22.3c-.1-.6-.6-1.2-1.3-1.2"></path>
    </svg>
  );
}

