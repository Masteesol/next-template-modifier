import Head from "next/head";
import Link from "next/link";
import { useState, useRef } from 'react';
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { translateOrDefault } from "@/utils/i18nUtils";

import { FaBuilding, FaCube, FaPenSquare, FaArchive } from "react-icons/fa";

import PageLayout from "@/components/PageLayout";
import {
  FlexColContainer,
  FlexColRowContainer,
  H1,
  CardList,
  LinkButton,
  HollowButton,
  H3,
  FlexRowCenteredY,
  FlexColRowContainerLg,
  FlexColCenteredY
} from "@/components/styled-global-components";

import mockData from "@/mockData/addressData.json";
import { Badge } from "flowbite-react";
import tw from "tailwind-styled-components";
import Cookies from 'js-cookie';
import axios from "axios";

const ListItemWrapper = tw(FlexRowCenteredY)`
  gap-2
`

const AddArchiveButtonContainer = tw(HollowButton)`
  items-center 
  gap-2 
  relative 
  group 
  hover:opacity-100
`

const AddArchiveButtonLabel = tw.span`
  group-hover:block 
  hidden 
  absolute 
  left-[5rem]
  top-[-2rem] 
  bg-slate-300
  dark:bg-slate-800
  w-[15rem] 
  rounded
`

export default function Page() {
  const { t } = useTranslation("common");


  const itemsUrl = process.env.NEXT_PUBLIC_API_URL + "/api/listing/approvals";
  const [items, setItems] = useState(null);


  useState(() => {

    
    const configData = {
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('bearerToken')
      }
    }
    axios.get(itemsUrl, configData).then((response) => {
      setItems(response.data);
      const filtered = applyFilter("", false, response.data);
      setFilteredData(filtered);
    }).catch(function (error) {
      if (error.response) {
        // router.push({
        // pathname: '/sign-in',
        // query: { returnUrl: router.asPath }
        //});
        alert("Couldn't fetch orders")
      }
    });

  });

  //hack for loading, will remove later™
  let Data = {};
  if (items == null) {
    Data = mockData;
  }
  else {
    Data = items;
  }


  const searchInputRef = useRef<HTMLInputElement>(null);

  const applyFilter = (searchTerm: string, showCancelled: boolean, data: { addresses?: any; }) => {
    const publishedProperties = data.addresses.filter((item: { published: any; }) => item.published)
    const filtered = publishedProperties.filter((item: { addressData: { street: string; zip: string; city: string; }; office: string; cancelled: any; }) => {
      const matchesSearchTerm =
        item.addressData.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.addressData.zip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.addressData.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.office.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        matchesSearchTerm && (!showCancelled || (showCancelled && item.cancelled))
      );
    });
    return filtered;
  };

  const [filteredData, setFilteredData] = useState(() =>
    applyFilter("", false, Data)
  );
  const [showCancelledOnly, setShowCancelledOnly] = useState(false);

  const handleSearch = (searchTerm: string) => {
    const filtered = applyFilter(searchTerm, showCancelledOnly, Data);
    setFilteredData(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const showCancelled = e.target.checked;
    setShowCancelledOnly(showCancelled);
    const searchTerm = searchInputRef.current?.value || "";
    const filtered = applyFilter(searchTerm, showCancelled, Data);
    setFilteredData(filtered);
  };
  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.published.heading", "Published")}</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColContainer className="min-h-full gap-8">
          <FlexColRowContainer className="gap-8">
            <H1>{translateOrDefault(t, "pages.published.heading", "Published")}</H1>
            <FlexRowCenteredY className="gap-4 justify-center flex-1 lg:flex-row-reverse lg:justify-start">
              <input
                type="search"
                id="search-dropdown"
                className="bg-transparent rounded max-w-[500px] border-slate-300 focus:ring-slate-200 focus:border-slate-200"
                placeholder="Search Campaign Text"
                onChange={handleInputChange}
                ref={searchInputRef}
              />
              <FlexColRowContainerLg className="lg:gap-2">
                <div>Listings: <span className="font-bold">{filteredData.length}</span></div>
                <div className="flex items-center gap-2">
                  <label htmlFor="cancelled-toggle">Cancelled only</label>
                  <input
                    type="checkbox"
                    id="cancelled-toggle"
                    onChange={handleToggleChange}
                    className="rounded text-slate-900 focus:ring-0 focus:outline-none ring-1 ring-white"
                  />
                </div>
              </FlexColRowContainerLg>
            </FlexRowCenteredY>
          </FlexColRowContainer>
          <FlexColContainer className="w-full gap-2">
            {filteredData.map((item: any, index: number) => renderCard(item, index))}
          </FlexColContainer>
        </FlexColContainer>
      </PageLayout>
    </>
  );
}

function renderCard(item: any, index: number) {
  return (
    <CardList className="flex-1 relative" key={index}>
      <FlexColContainer className="justify-between lg:flex-row w-full gap-4">
        <FlexColCenteredY className="min-w-[15rem] max-w-[20rem]">
          <H3 className="text-xl">{item.addressData.city} - {item.addressData.street}</H3>
        </FlexColCenteredY>
        <FlexColRowContainerLg className="gap-4 lg:gap-8 lg:items-center relative">
          {
            item.cancelled ?
              <AddArchiveButtonContainer className="hidden lg:flex">
                Add <FaArchive />
                <AddArchiveButtonLabel>Add to archive and remove from this list</AddArchiveButtonLabel>
              </AddArchiveButtonContainer>
              : ""
          }

          <ListItemWrapper className="min-w-[15rem] max-w-[18rem]">
            <FaBuilding />
            <span>{item.office}</span>
          </ListItemWrapper>
          <FlexRowCenteredY className="gap-4">
            <ListItemWrapper>
              <FaCube />
              <span>Standard</span>
            </ListItemWrapper>
            <ListItemWrapper>
              <FaPenSquare />
              <span>08.08.23</span>
            </ListItemWrapper>
          </FlexRowCenteredY>
          <ListItemWrapper className="w-full flex justify-end">
            {
              item.cancelled ?
                <AddArchiveButtonContainer className="lg:hidden flex">
                  Add <FaArchive />
                </AddArchiveButtonContainer>
                : ""
            }
            <Link href={"published/dashboard/" + item.id}>
              <LinkButton>Dashboard</LinkButton>
            </Link>
          </ListItemWrapper>
        </FlexColRowContainerLg>
        {item.cancelled ? <div className="absolute left-4 top-[-0.5rem]">
          <Badge color="failure">Cancelled</Badge>
        </div> : ""}
      </FlexColContainer>
    </CardList>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};

