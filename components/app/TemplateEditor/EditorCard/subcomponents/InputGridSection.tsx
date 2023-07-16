import React from 'react'
import {
    FlexColContainer,
    FlexRowContainer,
    GridSm2Lg4,
} from "@/components/shared/styled-global-components";
import { HoverLabel, IconContainerWarning } from '../styles';
import { BiEraser } from 'react-icons/bi';
import wordCounter from "word-count"

interface ComponentProps {
    placeholderCount: number;
    placeholders: any;
    isEditActive: boolean;
    handleRemoveAllInputText: any;
    stagedTemplate: any;
    textTemplate: any;
    subscriptionLimits: any;
}

const getColorForCount = (count: number, limit: number): string => {
    const ratio = count / limit;
    if (ratio >= 1) return 'text-red-600'; // Adjust color for 100% and above
    if (ratio >= 0.90) return 'text-yellow-400'; // Adjust color for 80% to 99%
    if (ratio < 0.90) return 'text-green-500'; // Adjust color for 80% to 99%
    return 'text-gray-500'; // Default color
};

const InputGridSection = (props: ComponentProps) => {
    const {
        placeholderCount,
        placeholders,
        isEditActive,
        handleRemoveAllInputText,
        stagedTemplate,
        textTemplate,
        subscriptionLimits
    } = props

    const charCount = stagedTemplate.text.replaceAll("#", "").trim().length
    const wordCount = stagedTemplate.text.trim().length > 0 ? wordCounter(stagedTemplate.text) : 0
    const charLimitIsSet = textTemplate.char_limit ? true : false
    const wordLimitIsSet = textTemplate.word_limit ? true : false

    const charLimit = charLimitIsSet ? textTemplate.char_limit : subscriptionLimits.char
    const wordLimit = wordLimitIsSet ? textTemplate.word_limit : "Not set"

    const charCountColor = getColorForCount(charCount, charLimit);
    const wordCountColor = getColorForCount(wordCount, wordLimit);

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
                        <FlexRowContainer className="justify-between"
                        >
                            <span>Characters:</span>
                            <div id="character-count" className={`${charCountColor}`}>
                                <span>{`${charCount}`}</span>
                                <span>{`/${charLimit}`}</span>
                            </div>
                        </FlexRowContainer>
                        <FlexRowContainer className="justify-between">
                            <span>Words:</span>
                            <div id="words-count" className={`${wordCountColor}`}>
                                <span>{`${wordCount}`}</span>
                                {wordLimitIsSet
                                    &&
                                    <span>{`/${wordLimit}`}</span>
                                }

                            </div>
                        </FlexRowContainer>
                    </FlexColContainer>
                </FlexColContainer>
            }
        </FlexRowContainer>
    )
}

export default InputGridSection