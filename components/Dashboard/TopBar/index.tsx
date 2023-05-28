import React from 'react'
import {
    DividerPipe,
    FlexColContainer,
    FlexRowCenteredY,
} from "@/components/styled-global-components";
import ProgressBar from './ProgressBar';


const TopBar = ({ property, theme }: any) => {
    return (
        <FlexRowCenteredY className="gap-4 w-full shadow p-4 bg-white dark:bg-slate-900">
            <h1 className="text-3xl">{property.addressData.street}</h1>
            <FlexRowCenteredY className="justify-end h-full flex-1 gap-8">
                <FlexColContainer className="gap-2">
                    <h2 className="text-base">Klikk</h2>
                    <span className="text-2xl">348</span>
                </FlexColContainer>
                <DividerPipe />
                <FlexColContainer className="gap-2 h-full">
                    <h2 className="text-base">Visninger</h2>
                    <span className="text-2xl">1048</span>
                </FlexColContainer>
                <DividerPipe />
                <FlexColContainer className="gap-2 h-full">
                    <h2 className="text-base">CTR</h2>
                    <span className="text-2xl">15%</span>
                </FlexColContainer>
                <DividerPipe />
                <FlexColContainer className="gap-2 h-full">
                    <h2 className="text-base">Synlighet</h2>
                    <span className="text-2xl text-green-500">+25</span>
                </FlexColContainer>
                <DividerPipe />
                <FlexColContainer className="gap-2 h-full max-w-[20rem] w-full">
                    <FlexRowCenteredY className="justify-between">
                        <h2 className="text-base">Annonseprogresjon</h2>
                        <span>{45}%</span>
                    </FlexRowCenteredY>
                    <ProgressBar progress={45} theme={theme} />
                </FlexColContainer>
            </FlexRowCenteredY>
        </FlexRowCenteredY>
    )
}

export default TopBar