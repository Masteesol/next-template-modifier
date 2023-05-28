import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import PageLayout from "@/components/PageLayout";
import {
  FlexColContainer,
  FlexColRowContainer,
  FlexRowContainer,
  H1,
  CardGrid,
  CardLarge,
  CardList,
  FlexRowCenteredY,
  LinkButton,
} from "@/components/styled-global-components";

import mockData from "@/mockData/addressData.json";
import ViewSelector from "@/components/ViewSelector";
import { Checkbox, Label } from "flowbite-react";
import { translateOrDefault } from "@/utils/i18nUtils";

export default function Page() {
  const [cardStyle, setCardStyle] = useState("list");
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const handleViewChange = (newView: string) => {
    if (cardStyle === "list" && newView !== "list") {
      setCheckedItems([]);
    }
    setCardStyle(newView);
  };

  const { t } = useTranslation("common");

  const handleCheckboxChange = (itemId: any, isChecked: any) => {
    if (isChecked) {
      setCheckedItems((prevItems) => [...prevItems, itemId]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== itemId));
    }
    //console.log(checkedItems)
  };

  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.approvals.heading", "Approvals")}</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColContainer className="min-h-full gap-4">
          <H1>{translateOrDefault(t, "pages.approvals.heading", "Approvals")}</H1>
          <ViewSelector onChange={handleViewChange} />
          {cardStyle === "grid" && (
            <FlexRowContainer className="w-full gap-2 flex-wrap">
              {mockData.addresses.map((item, index) =>
                renderCard(item, index, cardStyle, handleCheckboxChange)
              )}
            </FlexRowContainer>
          )}
          {cardStyle === "large" && (
            <FlexColRowContainer className="w-full gap-2 flex-wrap">
              {mockData.addresses.map((item, index) =>
                renderCard(item, index, cardStyle, handleCheckboxChange)
              )}
            </FlexColRowContainer>
          )}
          {cardStyle === "list" && (
            <>
              <CheckedItemsCounter checkedItems={checkedItems} />
              <FlexColContainer className="w-full gap-2">
                {mockData.addresses.map((item, index) =>
                  renderCard(item, index, cardStyle, handleCheckboxChange)
                )}
              </FlexColContainer>
            </>
          )}

        </FlexColContainer>
      </PageLayout>
    </>
  );
}


function renderCard(item: any, index: number, cardStyle: string, onCheckboxChange: (itemId: any, isChecked: boolean) => void) {
  const key = `card-${index}`;
  //console.log(cardStyle);
  switch (cardStyle) {
    case "grid":
      return (
        <Link
          href={"unpublished/" + item.id}
          className="flex-1 max-w-[15rem]"
          key={key}
        >
          <CardGrid>
            <h3 className="text-xl">{item.street}</h3>
          </CardGrid>
        </Link>
      );
    case "large":
      return (
        <Link
          href={"unpublished/" + item.id}
          className="flex-1 max-w-[30rem]"
          key={key}
        >
          <CardLarge className="overflow-hidden">
            <h3 className="text-xl">{item.street}</h3>
          </CardLarge>
        </Link>
      );
    case "list":
      return (
        <CardList className="flex-1 justify-between" key={key}>
          <FlexRowCenteredY className="gap-4">
            <CheckboxWithState itemId={`${key}`} onCheckboxChange={onCheckboxChange} />
            <Label className="text-xl" htmlFor={`check-${key}`} >{item.street}</Label>
          </FlexRowCenteredY>
          <Link href={"unpublished/" + item.id} key={key}>
            <LinkButton>View</LinkButton>
          </Link>
        </CardList>
      );
    default:
      return null;
  }
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};

function CheckboxWithState({ itemId, onCheckboxChange }: any) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    onCheckboxChange(itemId, !isChecked);
  };

  return (
    <Checkbox id={"check-" + itemId} checked={isChecked} onChange={handleChange} />
  );
}

function CheckedItemsCounter({ checkedItems }: any) {
  return <div>Checked items: {checkedItems.length}</div>;
}
