import Head from "next/head";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react"

import { translateOrDefault } from "@/utils/i18nUtils";
import { useRouter } from "next/router";
import { Tabs, TabItem } from '@/components/TabsComponent';
import PageLayout from "@/components/PageLayout";
import { DividerHorizontal, FlexColContainer, FlexColRowContainerXl, FlexRowCenteredY, H1, H2, HollowButton, SubmitButton } from "@/components/styled-global-components";
import ImagesTab from "@/components/CampaignEditor/ImagesTab";
import CampaignDetailsTab from "@/components/CampaignEditor/CampaignDetailsTab";
import BannersTab from "@/components/CampaignEditor/BannersTab";
import ViewJPGs from "@/components/CampaignEditor/PreviewTab/ViewJPGs";
import FormBannerText from "@/components/CampaignEditor/TextTab";

import { Address } from "@/types";

//MockData
import mockData from "@/mockData/addressData.json";
import { Table } from "flowbite-react";

export default function Page() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { id } = router.query;
  // Needs to be connected to the backend
  const property = mockData.addresses.filter(
    (item) => item.id === parseInt(id as string)
  )[0];

  const [listingData, setListingData] = useState<Address | null>(property);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [generatedJPGs, setGeneratedJPGs] = useState<{ [key: string]: string }>({});
  const [selectedImages, setSelectedImages] = useState<{ id: string; link: string }[]>([]);
  const [allImages, setAllImages] = useState<{ id: string; link: string }[]>(property.media.images);
  const [publishClickedOnce, setPublishClickedOnce] = useState(false)
  const updateGeneratedJPGs = (size: string, dataUrl: string) => {
    setGeneratedJPGs((prevState: any) => {
      return { ...prevState, [size]: dataUrl };
    });
  };
  const handlePublish = () => {
    console.log("clicked publish")
    console.log("Generated images: ", generatedJPGs)
    console.log("Campaign Information: ", listingData?.campaignData)
    console.log("Address Information: ", listingData?.addressData)
  }

  const handleFirstPublishClick = () => {
    setPublishClickedOnce(!publishClickedOnce)
  }
  return (
    <>
      <Head>
        <title>{listingData ? `${listingData.addressData.street}` : ""}</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColContainer className="min-h-full">
          {listingData && (
            <FlexColContainer className="relative">
              <h3 className="pb-3">{translateOrDefault(t, "pages.campaignEditor.heading", "Create Campaign")}</h3>
              <H1 className="pb-2 md:pb-5">{`${listingData && listingData.addressData.street}`}</H1>
              <Tabs setActiveTabIndex={setActiveTabIndex} activeTabIndex={activeTabIndex}>
                <TabItem title={translateOrDefault(t, "pages.campaignEditor.tabs.campaignDetails.heading", "Campaign Details")}>
                  <CampaignDetailsTab listingData={listingData} setListingData={setListingData} />
                </TabItem>
                <TabItem title={translateOrDefault(t, "pages.campaignEditor.tabs.text.heading", "Text")}>
                  <FormBannerText bannerText={listingData.bannerText} setListingData={setListingData} />
                </TabItem>
                <TabItem title={translateOrDefault(t, "pages.campaignEditor.tabs.images.heading", "Images")}>
                  <FlexColContainer className="gap-4">
                    <H2>Select Image</H2>
                    <i className="text-slate-400">After selecting one or more images, go to the Banners tab to view and create banners</i>
                    <ImagesTab setSelectedImages={setSelectedImages} selectedImages={selectedImages} allImages={allImages} setAllImages={setAllImages} />
                  </FlexColContainer>
                </TabItem>
                <TabItem title={translateOrDefault(t, "pages.campaignEditor.tabs.banners.heading", "Banners")}>
                  <FlexColContainer className="gap-4">
                    <h2>Modify Banners</h2>
                    <BannersTab
                      selectedImages={selectedImages}
                      listingInfo={{
                        addressData: listingData.addressData,
                        bannerText: listingData.bannerText,
                        campaignData: listingData.campaignData
                      }}
                      updateGeneratedJPGs={updateGeneratedJPGs}
                      setActiveTabIndex={setActiveTabIndex}
                    />
                  </FlexColContainer>
                </TabItem>
                <TabItem title={translateOrDefault(t, "pages.campaignEditor.tabs.viewJPG.heading", "Preview")}>

                  <FlexColContainer className="gap-4">
                    <FlexRowCenteredY className="justify-between">
                      <h2>Preview Campaign</h2>
                      {!publishClickedOnce
                        ?
                        <SubmitButton className="border-[1px] border-transparent" onClick={handleFirstPublishClick}>Publish</SubmitButton>
                        :
                        <FlexRowCenteredY className="gap-4 relative">
                          <span className="absolute top-[3rem] lg:relative lg:top-0">Are you sure?</span>
                          <SubmitButton onClick={handlePublish}>Yes</SubmitButton>
                          <HollowButton onClick={handleFirstPublishClick}>Cancel</HollowButton>
                        </FlexRowCenteredY>
                      }


                    </FlexRowCenteredY>
                    <FlexColContainer className="gap-4">
                      <h3 className="text-2xl">Information</h3>
                      <DividerHorizontal />
                      <FlexColRowContainerXl className="gap-4">
                        <FlexColContainer className="gap-4">
                          <h4>Address Info</h4>
                          <TableData listingData={listingData.addressData} />
                        </FlexColContainer>
                        <FlexColContainer className="gap-4">
                          <h4>Campaign Data</h4>
                          <TableData listingData={listingData.campaignData} />
                        </FlexColContainer>
                        <FlexColContainer className="gap-4">
                          <h4>Facebook</h4>
                          <TableData listingData={listingData.bannerText.facebook} />
                        </FlexColContainer>
                      </FlexColRowContainerXl>
                      <h3 className="text-2xl">Created Banners</h3>
                      <DividerHorizontal />
                      <ViewJPGs generatedJPGs={generatedJPGs} />
                      <DividerHorizontal />
                    </FlexColContainer>
                  </FlexColContainer>
                </TabItem>
              </Tabs>
            </FlexColContainer>
          )}
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


const TableData = ({ listingData }: any) => {
  return (
    <Table className="max-w-[700px]">
      <Table.Body className="divide-y">
        {Object.keys(listingData).length > 0 &&
          Object.entries(listingData).map(([name, value]) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={name}>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {formatCamelCase(name)}:
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {value ? convertDateFormat(value.toString()) : ""}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};



function formatCamelCase(camelCaseString: string) {
  const result = camelCaseString
    // Insert a space before all found uppercase letters.
    .replace(/([A-Z])/g, ' $1')
    // Uppercase the first character of each word
    .replace(/^./, str => str.toUpperCase())
    .replace(/ (\w)/g, str => str.toUpperCase());

  return result;
}

function convertDateFormat(dateString: string) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(dateString)) {
    // If the string is not in the correct format, return it unchanged.
    return dateString;
  }

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return dateString;
  }

  let day: any = date.getDate();
  day = day < 10 ? '0' + day : day;

  let month: any = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;

  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
