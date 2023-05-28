import React, { useState } from "react"
import {
    FlexColCentered,
    FlexColCenteredX,
    FlexColCenteredY,
    FlexColContainer,
    FlexColRowContainerLg,
    FlexRowCentered,
    FlexRowCenteredY,
    FlexRowContainer,
    HollowButton,
} from "@/components/styled-global-components";

import DynamicPieChartComponent from "@/components/Dashboard/InfographicsChannels/PieChart";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TableComponent from "./Table";

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

interface Channels {
    dataSocialMedia: DataItemIcons[]
    theme: any;
}

const InfoChannels = ({ dataSocialMedia, theme }: Channels) => {
    //const secondary = selectedCompany?.theme?.colors?.secondary.background;
    //const highlighted = selectedCompany?.theme?.colors?.highlighted;
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    const sortedSocialMedia = dataSocialMedia.sort((a, b) => b.value - a.value);
    return (
        <FlexColContainer className="w-full justify-center border-[1px] border-slate-200 rounded p-4 gap-4">
            <FlexRowCenteredY className="w-full justify-end">
                <HollowButton className="text-sm gap-2" onClick={handleOpen}>
                    {isOpen ?
                        <FlexRowCentered className="gap-2">
                            <span>View Less</span>
                            <FaChevronLeft />
                        </FlexRowCentered> :
                        <FlexRowCentered className="gap-2">
                            <span>View More</span>
                            <FaChevronRight />
                        </FlexRowCentered>}

                </HollowButton>
            </FlexRowCenteredY>
            <FlexColCentered className="w-full">
                <FlexRowContainer className="gap-8 flex-wrap justify-center">
                    {sortedSocialMedia.map((item: any, index: number) => {
                        return (
                            <div style={{ color: theme, fill: theme }} key={index} >

                                <FlexColCenteredX className="justify-between gap-8 p-4">
                                    <FlexColRowContainerLg className="lg:gap-8 lg:items-center">
                                        <DynamicPieChartComponent dataPie={dataSocialMedia} theme={theme} index={index} />
                                        <FlexColCenteredY className={`gap-4 ${isOpen ? "block" : "hidden"}`}>
                                            <h4 className="font-bold">{item.name}</h4>
                                            <TableComponent data={item} theme={theme} />
                                        </FlexColCenteredY>
                                    </FlexColRowContainerLg>
                                    <FlexRowContainer className="w-full justify-center text-4xl gap-8">
                                        <FlexRowCenteredY>
                                            {item.icon}
                                        </FlexRowCenteredY>
                                        <FlexRowCenteredY>
                                            <span>{item.value}%</span>
                                        </FlexRowCenteredY>
                                    </FlexRowContainer>
                                </FlexColCenteredX>

                            </div>
                        )
                    })}
                </FlexRowContainer>
            </FlexColCentered>
        </FlexColContainer>
    )
}

export default InfoChannels;