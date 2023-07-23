import {
    CardBaseLight,
    DividerHorizontal,
    FlexColCentered,
    FlexColContainer,
    FlexRowCenteredY,
    GridSm1Lg2,
    GridSm2Lg4,
} from "@/components/shared/styled-global-components";
import Link from "next/link"

import {
    BsStarFill,
    BsLink,
} from "react-icons/bs";
import { TemplateModified, TemplatesContainer } from "@/types/global";
import { GradientCard, GradientCardThree, GradientCardTwo, LargeCardText, LinkCard } from "@/components/app/Dashboard/styled-components";

import Tables from "@/components/app/Dashboard/Tables";
import Piechart from "@/components/app/Dashboard/PieChart";

interface FavouritesProps {
    textTemplates: TemplateModified[];
    checkFavouritedLength: any;
}

export const FavouritesCard = ({ textTemplates, checkFavouritedLength }: FavouritesProps) => {
    return <CardBaseLight>
        <FlexColContainer className="gap-4 p-4 rounded shadow">
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
                        console.log(item.favourited && item)
                        return item.favourited && index < 5 &&
                            <Link href={`/app/templates?category_id=${item.category_id}`}
                                key={`favourite-${index}`}
                            >
                                <div className="hidden lg:block group" style={{ zIndex: 300 }}>
                                    <CardBaseLight
                                        className="p-4 transition ease-in-out duration-150 border-l-4 border-transparent hover:border-green-500 hover:text-green-500">
                                        <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                                            <BsStarFill className="text-green-500" />
                                            <h2 className="text-sm md:text-lg ">{item.title}</h2>
                                            <BsLink className="text-xl ms-auto" />
                                        </FlexRowCenteredY>
                                        <p
                                            className="text-gray-500 text-xs md:text-sm"
                                            style={{ zIndex: 300 }}
                                        >
                                            {`${item.text.substring(0, 80)}...`}
                                        </p>
                                    </CardBaseLight>
                                </div>
                                <FlexColContainer className="gap-2 lg:hidden">
                                    <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                                        <BsStarFill className="text-green-500" />
                                        <h2 className="text-sm md:text-lg">{item.title}</h2>
                                        <BsLink className="text-xl ms-auto text-gray-500" />
                                    </FlexRowCenteredY>
                                    <p className="text-gray-500 text-xs md:text-sm"> {`${item.text.substring(0, 80)}...`}</p>
                                    <DividerHorizontal className="border-gray-100" />
                                </FlexColContainer>
                            </Link>
                    })}

                </GridSm1Lg2>
            }
        </FlexColContainer>
    </CardBaseLight>
}

interface NumbersProps {
    textTemplates: TemplateModified[]
    textTemplateFull: TemplatesContainer[]
    checkAverage: any
}

export const NumbersCard = ({ textTemplates, textTemplateFull, checkAverage }: NumbersProps) => {
    return <CardBaseLight>
        <FlexColContainer className="p-4 gap-4">
            <FlexRowCenteredY className="gap-2 justify-between border-b-2 border-gray-100 pb-2">
                <h2 className="font-bold">Numbers</h2>
            </FlexRowCenteredY>
            <GridSm2Lg4 className="text-center text-sm gap-2 text-white">
                <GradientCard>
                    <FlexColCentered>
                        <LargeCardText>{`${textTemplates.length}`}</LargeCardText>
                        <p>Templates</p>
                    </FlexColCentered>
                </GradientCard>
                <GradientCardTwo>
                    <FlexColCentered>
                        <LargeCardText>{`${textTemplateFull.length}`}</LargeCardText>
                        <p>Categories</p>
                    </FlexColCentered>
                </GradientCardTwo>
                <GradientCardThree className="col-span-2">
                    <FlexColCentered>
                        <LargeCardText>{`${checkAverage()}`}</LargeCardText>
                        <p className="text-xs">Average characters per template</p>
                    </FlexColCentered>
                </GradientCardThree>
            </GridSm2Lg4>

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
    console.log(color)
    return <Link href={`${path}`}>
        <LinkCard
            className={`${color}`}>
            <FlexRowCenteredY className="justify-between">
                <FlexRowCenteredY className="h-full gap-2 text-lg text-center">
                    {icon}
                    <h2 className="text-sm md:text-lg">{text}</h2>
                </FlexRowCenteredY>
                <BsLink className="text-xl" />
            </FlexRowCenteredY>
        </LinkCard>
    </Link>
}