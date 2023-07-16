import React from 'react'
import {
    FlexColContainer,
    FlexRowContainer,
    GridSm2Lg4,
} from "@/components/shared/styled-global-components";
import { HoverLabel, IconContainerWarning } from '../styles';
import { BiEraser } from 'react-icons/bi';
import wordCount from "word-count"

interface ComponentProps {
    placeholderCount: number;
    placeholders: any;
    isEditActive: boolean;
    handleRemoveAllInputText: any;
    stagedTemplate: any
}

const InputGridSection = (props: ComponentProps) => {
    const {
        placeholderCount,
        placeholders,
        isEditActive,
        handleRemoveAllInputText,
        stagedTemplate
    } = props
    return (
        <FlexRowContainer id="input-grid-component" className="w-full h-full gap-2">
            {placeholderCount === 0
                ?
                <p className="text-gray-500">Add your template text and use the <span className="font-bold text-green-600">#</span> symbol to create placeholders.
                    Your placeholders will show up here and will be active once you apply the changes.</p>
                :
                <div className="w-full">
                    <GridSm2Lg4 className="gap-2">
                        {placeholders}
                    </GridSm2Lg4>
                </div>
            }
            {!isEditActive ?
                <div>
                    {placeholderCount > 0 &&
                        <FlexColContainer className="border-l-2 border-gray-100 ps-2 ms-2">
                            <div className="group relative">
                                <IconContainerWarning
                                    onClick={handleRemoveAllInputText}
                                >
                                    <BiEraser className="text-2xl" />
                                    <HoverLabel className="w-[4rem] bg-red-200 text-red-700">Empty all</HoverLabel>
                                </IconContainerWarning>
                            </div>
                        </FlexColContainer>
                    }
                </div>
                :
                <FlexColContainer className="gap-2 text-xs">
                    <FlexColContainer className="border-l-2 border-gray-100 ps-2 ms-2 min-w-[8rem]">
                        <FlexRowContainer className="justify-between">
                            <span>Characters:</span>
                            <span>{stagedTemplate.text.replaceAll("#", "").trim().length}</span>
                        </FlexRowContainer>
                        <FlexRowContainer className="justify-between">
                            <span>Words:</span>
                            <span>{stagedTemplate.text.trim().length > 0 ? wordCount(stagedTemplate.text) : 0}</span>
                        </FlexRowContainer>
                    </FlexColContainer>
                </FlexColContainer>
            }
        </FlexRowContainer>
    )
}

export default InputGridSection