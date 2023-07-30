import {
    CardBaseLight,
    CardBaseLightHover,
    DividerHorizontal,
    FlexColCentered,
    FlexColContainer,
    FlexRowCenteredY,
    GridSm1Lg2
} from "@/components/shared/styled-global-components";
import Link from "next/link"

import {
    BsStarFill,
    BsLink,
} from "react-icons/bs";
import { TemplateModified, TemplatesContainer } from "@/types/global";
import {
    GradientCardGreen,
    GradientCardBlue,
    GradientCardIndigo,
    GradientCardPurple,
    LargeCardText,
    LinkCard
} from "@/components/app/Dashboard/shared/styled-local-components";

import { TablesSingleTemplate, TablesTemplateCollection } from "@/components/app/Dashboard/Tables";
import { PieChartComponentSingle, PieChartComponentCollection } from "@/components/app/Dashboard/PieChart";
import { TabItem, Tabs } from "@/components/shared/TabsComponent";
import { useState } from "react"
import { TemplateChecker } from "./shared/helpers";
interface FavouritesProps {
    textTemplates: TemplateModified[];
    checkFavouritedLength: any;
}

export const FavouritesCard = ({ textTemplates, checkFavouritedLength }: FavouritesProps) => {
    let count = 0
    return <CardBaseLight>
        <FlexColContainer className="gap-4 p-4">
            <FlexRowCenteredY className="gap-2 justify-between border-b-2 border-gray-100 pb-2">
                <h2 className="font-bold">Favourites</h2>
                {
                    checkFavouritedLength() > 5 &&
                    <i className="text-sm text-gray-500">Displaying top 5</i>
                }
            </FlexRowCenteredY>
            {
                textTemplates && textTemplates.length > 0
                &&
                <GridSm1Lg2 className="gap-2">
                    {textTemplates.map((item, index) => {
                        if (item.favourited && count < 5) {
                            count += 1
                            return item.is_collection ? <Link href={`/app/templates?category_id=${item.category_id}`}
                                key={`favourite-${index}`}
                            >
                                <div className="hidden lg:block group" style={{ zIndex: 300 }}>
                                    <CardBaseLightHover
                                        className="p-4 transition ease-in-out duration-150 border-l-4 border-transparent hover:border-purple-500 hover:text-purple-500">
                                        <FlexColContainer className="gap-2">
                                            <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                                                <BsStarFill className="text-purple-500" />
                                                <h2 className="text-sm md:text-lg truncate">{item.title}</h2>
                                                <BsLink className="text-xl ms-auto" />
                                            </FlexRowCenteredY>

                                            <FlexRowCenteredY className="justify-between">
                                                <p
                                                    className="text-gray-500 text-xs md:text-sm"
                                                    style={{ zIndex: 300 }}
                                                >
                                                    {`Templates in collection: ${item.template_collections.length}`}
                                                </p>
                                                <p className="py-1 px-2 text-xs rounded bg-violet-200 text-violet-800">Collection</p>
                                            </FlexRowCenteredY>
                                        </FlexColContainer>

                                    </CardBaseLightHover>
                                </div>
                                <FlexColContainer className="gap-2 lg:hidden">
                                    <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                                        <BsStarFill className="text-purple-500" />
                                        <h2 className="text-sm md:text-lg truncate">{item.title}</h2>
                                        <BsLink className="text-xl ms-auto text-gray-500" />
                                    </FlexRowCenteredY>
                                    <FlexRowCenteredY className="justify-between">
                                        <p
                                            className="text-gray-500 text-xs md:text-sm"
                                            style={{ zIndex: 300 }}
                                        >
                                            {`Templates in collection: ${item.template_collections.length}`}
                                        </p>
                                        <p className="py-1 px-2 text-xs rounded bg-violet-200 text-violet-800">Collection</p>
                                    </FlexRowCenteredY>
                                    <DividerHorizontal className="border-gray-100" />
                                </FlexColContainer>
                            </Link>
                                : <Link href={`/app/templates?category_id=${item.category_id}`
                                }
                                    key={`favourite-${index}`
                                    }
                                >
                                    <div className="hidden lg:block group" style={{ zIndex: 300 }}>
                                        <CardBaseLightHover
                                            className="p-4 transition ease-in-out duration-150 border-l-4 border-transparent hover:border-green-500 hover:text-green-500">
                                            <FlexColContainer className="gap-2">
                                                <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                                                    <BsStarFill className="text-green-500" />
                                                    <h2 className="text-sm md:text-lg truncate">{item.title}</h2>
                                                    <BsLink className="text-xl ms-auto" />
                                                </FlexRowCenteredY>
                                                <FlexRowCenteredY className="justify-between">
                                                    <p
                                                        className="text-gray-500 text-xs md:text-sm truncate"
                                                        style={{ zIndex: 300 }}
                                                    >
                                                        {`${item.text.substring(0, 40).trim()}...`}
                                                    </p>
                                                    <p className="py-1 px-2 text-xs rounded bg-green-200 text-green-800">Single</p>
                                                </FlexRowCenteredY>
                                            </FlexColContainer>

                                        </CardBaseLightHover>
                                    </div>
                                    <FlexColContainer className="gap-2 lg:hidden">
                                        <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                                            <BsStarFill className="text-green-500" />
                                            <h2 className="text-sm md:text-lg truncate">{item.title}</h2>
                                            <BsLink className="text-xl ms-auto text-gray-500" />
                                        </FlexRowCenteredY>
                                        <FlexRowCenteredY className="justify-between">
                                            <p
                                                className="text-gray-500 text-xs md:text-sm"
                                                style={{ zIndex: 300 }}
                                            >
                                                {`${item.text.substring(0, 50)}...`}
                                            </p>
                                            <p className="py-1 px-2 text-xs rounded bg-green-200 text-green-800">Single</p>
                                        </FlexRowCenteredY>
                                        <DividerHorizontal className="border-gray-100" />
                                    </FlexColContainer>
                                </Link>
                        }
                    })}

                </GridSm1Lg2>
            }
            {checkFavouritedLength() === 0 && <i>No favourited templates yet...</i>}
        </FlexColContainer>
    </CardBaseLight >
}

interface NumbersProps {
    textTemplates: TemplateModified[]
    textTemplateFull: TemplatesContainer[]
}

export const NumbersCard = ({ textTemplates, textTemplateFull }: NumbersProps) => {
    const checkerSingle = new TemplateChecker(textTemplates, false);
    const checkerCollection = new TemplateChecker(textTemplates, true);
    return <CardBaseLight>
        <FlexColContainer className="p-4 gap-4">
            <FlexRowCenteredY className="gap-2 justify-between border-b-2 border-gray-100 pb-2">
                <h2 className="font-bold">Numbers</h2>
            </FlexRowCenteredY>
            <div className="grid grid-cols-2 text-center text-sm gap-2 text-white">
                <GradientCardBlue>
                    <FlexColCentered>
                        <LargeCardText>{`${textTemplateFull.length}`}</LargeCardText>
                        <p>{`${(textTemplateFull.length > 1) ? "Categories" : "Category"}`}</p>
                    </FlexColCentered>
                </GradientCardBlue>
                <GradientCardIndigo>
                    <FlexColCentered>
                        <LargeCardText>{`${textTemplates.length}`}</LargeCardText>
                        <p>Total Templates</p>
                    </FlexColCentered>
                </GradientCardIndigo>
                <GradientCardGreen>
                    <FlexColCentered>
                        <LargeCardText>{`${checkerSingle.length}`}</LargeCardText>
                        <p>{`Single Template${(checkerSingle.length > 1) ? "s" : ""}`}</p>
                    </FlexColCentered>
                </GradientCardGreen>
                <GradientCardPurple>
                    <FlexColCentered>
                        <LargeCardText>{`${checkerCollection.length}`}</LargeCardText>
                        <p>{`Template Collection${(checkerCollection.length > 1) ? "s" : ""}`}</p>
                    </FlexColCentered>
                </GradientCardPurple>
            </div>

        </FlexColContainer>
    </CardBaseLight>
}

interface UsageProps {
    textTemplates: TemplateModified[]
}

export const UsageCard = ({ textTemplates }: UsageProps) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const checkerCollection = new TemplateChecker(textTemplates, true);
    const checkerSimple = new TemplateChecker(textTemplates, false);

    const checkTotalTruncatedArray = (is_collection: boolean) => {
        if (is_collection) {
            return checkerCollection.result.slice(0, 5).reduce((acc, current) => acc + current.copy_count, 0);
        } else {
            return checkerSimple.result.slice(0, 5).reduce((acc, current) => acc + current.copy_count, 0);
        }

    }
    const checkAverage = () => {
        if (textTemplates.length > 0) {
            const sum = checkerSimple.result.slice(0, 5).reduce((acc, currentIndex) => {
                const text = currentIndex.text;
                const length = text.length;
                return acc + length;
            }, 0);

            const average = sum / checkerSimple.result.slice(0, 5).length;

            return typeof average === "number" ? average.toFixed(0) : 0;
        } else {
            return 0
        }
    }
    const checkAverageTemplateAmount = () => {
        if (textTemplates.length > 0) {
            const sum = checkerCollection.result.slice(0, 5).reduce((acc, currentIndex) => {
                const templateCollectionArray = currentIndex.template_collections;
                return acc + templateCollectionArray.length;
            }, 0);

            const average = sum / checkerCollection.result.slice(0, 5).length;

            return typeof average === "number" ? average.toFixed(0) : 0;
        } else {
            return 0
        }
    }

    return <CardBaseLight>
        <FlexColContainer className="p-2 lg:p-4 gap-4">
            <FlexRowCenteredY className="gap-2 justify-between pb-2">
                <h2 className="font-bold">Usage</h2>

                {
                    textTemplates.length > 5 &&
                    <i className="text-sm text-gray-500">Displaying top 5</i>
                }
            </FlexRowCenteredY>
            <Tabs setActiveTabIndex={setActiveIndex} activeTabIndex={activeIndex}>
                <TabItem title="Single Templates" >
                    <FlexColContainer className="gap-4 lg:gap-12">
                        {textTemplates && textTemplates.length > 0
                            ?
                            <FlexColContainer className="gap-4 lg:gap-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    <FlexColCentered className="gap-2 md:mt-4">
                                        <PieChartComponentSingle
                                            textTemplates={checkerSimple.result}
                                        />
                                    </FlexColCentered>
                                    <FlexColCentered className="gap-2 text-center md:text-3xl">
                                        <p>{checkerSimple.result.length > 5 ? "Total times copied: " : "Total"}
                                            <span className="font-bold text-green-600">{`${checkTotalTruncatedArray(false)}`}</span>
                                        </p>
                                        <p> Average template length: <span className="font-bold text-green-600">{`${checkAverage()}`}</span></p>
                                    </FlexColCentered>

                                </div>
                                <div className="overflow-x-auto shadow ">
                                    <TablesSingleTemplate textTemplates={checkerSimple.result} />
                                </div>
                            </FlexColContainer>
                            :
                            <i>{`The app tracks your usage by counting how many times you've copied each template. The results will be displayed here.`}</i>
                        }
                    </FlexColContainer>
                </TabItem>
                <TabItem title="Template Collections" >
                    <FlexColContainer className="gap-4 lg:gap-12">
                        {textTemplates && textTemplates.length > 0
                            ?
                            <FlexColContainer className="gap-8 lg:gap-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    <FlexColCentered className="gap-2 md:mt-4">
                                        <PieChartComponentCollection textTemplates={checkerCollection.result} />
                                    </FlexColCentered>

                                    <FlexColCentered className="gap-2 text-center md:text-3xl">
                                        <p>{checkerSimple.result.length > 5 ? "Total times copied: " : "Total"}
                                            <span className="font-bold text-purple-700">{`${checkTotalTruncatedArray(true)}`}</span>
                                        </p>
                                        <p> Average templates per collection: <span className="font-bold text-purple-700">{`${checkAverageTemplateAmount()}`}</span></p>
                                    </FlexColCentered>
                                </div>
                                <div className="overflow-x-auto shadow ">
                                    <TablesTemplateCollection textTemplates={checkerCollection.result} />
                                </div>
                            </FlexColContainer>
                            :
                            <i>{`The app tracks your usage by counting how many times you've copied each template. The results will be displayed here.`}</i>
                        }
                    </FlexColContainer>
                </TabItem>
            </Tabs>

        </FlexColContainer>
    </CardBaseLight>
}


type QuickLinkData = {
    path: string,
    text: string,
    icon: any,
    color: string
}

interface QuickLinkCardProps {
    item: QuickLinkData
}

export const QuickLinkCard = ({ item }: QuickLinkCardProps) => {
    const {
        path,
        text,
        icon,
        color
    } = item
    //console.log(color)
    return <Link href={`${path}`}>
        <LinkCard
            className={`${color}`}>
            <FlexRowCenteredY className="justify-between">
                <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                    {icon}
                    <h2 className="text-sm md:text-lg">{text}</h2>
                </FlexRowCenteredY>
                <BsLink className="text-xl hidden sm:block" />
            </FlexRowCenteredY>
        </LinkCard>
    </Link>
}