import {
    CardBaseLight,
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
} from "@/components/app/Dashboard/styled-components";

import Tables from "@/components/app/Dashboard/Tables";
import Piechart from "@/components/app/Dashboard/PieChart";

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
                                    <CardBaseLight
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

                                    </CardBaseLight>
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
                                        <CardBaseLight
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

                                        </CardBaseLight>
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
    const checkSingleTempLength = (is_collection: boolean): number => {
        if (is_collection) {
            const result = textTemplates.filter(item => item.is_collection && item)
            return result.length
        } else {
            const result = textTemplates.filter(item => !item.is_collection && item)
            return result.length
        }

    }
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
                        <LargeCardText>{`${checkSingleTempLength(false)}`}</LargeCardText>
                        <p>{`Single Template${(checkSingleTempLength(false) > 1) ? "s" : ""}`}</p>
                    </FlexColCentered>
                </GradientCardGreen>
                <GradientCardPurple>
                    <FlexColCentered>
                        <LargeCardText>{`${checkSingleTempLength(true)}`}</LargeCardText>
                        <p>{`Template Collection${(checkSingleTempLength(true) > 1) ? "s" : ""}`}</p>
                    </FlexColCentered>
                </GradientCardPurple>
            </div>

        </FlexColContainer>
    </CardBaseLight>
}

interface UsageProps {
    textTemplates: TemplateModified[]
    checkTotalTruncatedArray: any
}

export const UsageCard = ({ textTemplates, checkTotalTruncatedArray }: UsageProps) => {
    return <CardBaseLight>
        <FlexColContainer className="gap-4  rounded p-4 shadow">
            <FlexRowCenteredY className="gap-2 justify-between border-b-2 border-gray-100 pb-2">
                <h2 className="font-bold">Usage</h2>

                {
                    textTemplates.length > 5 &&
                    <i className="text-sm text-gray-500">Displaying top 5</i>
                }
            </FlexRowCenteredY>

            {textTemplates && textTemplates.length > 0
                ?
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <FlexColCentered className="gap-4">
                        <h3>Ratio</h3>
                        <Piechart textTemplates={textTemplates} />
                        <i>{textTemplates.length > 5 ? "Top 5 total: " : "Total"}
                            <span className="font-bold">{`${checkTotalTruncatedArray()}`}</span>
                        </i>
                    </FlexColCentered>

                    <FlexColContainer className="gap-4 overflow-x-auto shadow">
                        <Tables textTemplates={textTemplates} />
                    </FlexColContainer>

                </div>
                :
                <i>{`The app tracks your usage by counting how many times you've copied each template. The results will be displayed here.`}</i>
            }
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