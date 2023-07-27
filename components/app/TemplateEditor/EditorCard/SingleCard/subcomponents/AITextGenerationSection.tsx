import React from 'react'
import {
    FlexColContainer,
    FlexRowCenteredY,
    FlexExpandable,
    IconContainer
} from "@/components/shared/styled-global-components";

import { BsXLg } from 'react-icons/bs';
import { CardInput, TextArea } from '../../styles'

interface props {
    expandedAI: boolean;
    setExpandedAI: any;
}

const index = (props: props) => {
    const {
        expandedAI,
        setExpandedAI,
    } = props

    return (
        <FlexExpandable
            $expanded={expandedAI}
            $heightAndPadding='h-[20rem] py-4'
            className="border-l-2 border-green-300"
        >
            <FlexColContainer className="p-2 gap-4 w-full">
                <FlexRowCenteredY className="justify-between">
                    <h3 className="text-sm">Generate Text</h3>
                    <IconContainer className="hover:bg-slate-50" onClick={() => { setExpandedAI(!expandedAI) }}>
                        <BsXLg className="cursor-pointer" />
                    </IconContainer>
                </FlexRowCenteredY>
                <form className="w-full">
                    <div className="grid grid-cols-2 gap-2">
                        <FlexColContainer className="gap-2 h-full col-span-1">
                            <h4 className="text-sm text-gray-500">Category</h4>
                            <CardInput
                                placeholder="Customer Service"
                                className="p-2"
                                type="text"
                            />
                        </FlexColContainer>
                        <FlexColContainer className="gap-2 h-full col-span-1">
                            <h4 className="text-sm text-gray-500">Word Limit</h4>
                            <CardInput
                                type="number"
                                placeholder="200"
                                className="p-2"
                            />
                        </FlexColContainer>
                        <FlexColContainer className="gap-2 h-full w-full col-span-2">
                            <h4 className="text-sm text-gray-500">Comment</h4>
                            <TextArea
                                placeholder="Customer Service"
                                className="h-[7rem]"
                            />
                        </FlexColContainer>
                    </div>
                </form>
            </FlexColContainer>
        </FlexExpandable>
    )
}

export default index