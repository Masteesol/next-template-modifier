import { FlexRowCenteredY } from '@/components/shared/styled-global-components'
import React from 'react'
import wordCounter from "word-count"

interface FooterProps {
    isEditActive: boolean;
    stagedTemplate: any;
    textTemplate: any;
    finalText: any;
}

const getColorForCount = (count: number, limit: number): string => {
    const ratio = count / limit;
    if (ratio >= 1) return 'text-red-600'; // Adjust color for 100% and above
    if (ratio >= 0.90) return 'text-yellow-400'; // Adjust color for 80% to 99%
    if (ratio < 0.90) return 'text-green-500'; // Adjust color for 80% to 99%
    return 'text-gray-500'; // Default color
};

const Footer = (props: FooterProps) => {
    const {
        isEditActive,
        stagedTemplate,
        textTemplate,
        finalText
    } = props
    //console.log(finalText)
    const chosenTemplate = isEditActive ? stagedTemplate.text : finalText
    const charCount = chosenTemplate.replaceAll("#", "").trim().length
    const wordCount = chosenTemplate.trim().length > 0 ? wordCounter(chosenTemplate) : 0
    const charLimitIsSet = textTemplate.char_limit ? true : false
    const wordLimitIsSet = textTemplate.word_limit ? true : false

    const charLimit = charLimitIsSet ? textTemplate.char_limit : "Not Set"
    const wordLimit = wordLimitIsSet ? textTemplate.word_limit : "Not set"

    const charCountColor = stagedTemplate.limiter_active ? getColorForCount(charCount, charLimit) : 'text-gray-500'
    const wordCountColor = stagedTemplate.limiter_active ? getColorForCount(wordCount, wordLimit) : 'text-gray-500'

    return (
        <FlexRowCenteredY className="gap-4 text-gray-500">
            <FlexRowCenteredY className="gap-1"
            >
                <div id="character-count" className={`${charCountColor}`}>
                    <span>{`${charCount}`}</span>
                    {charLimitIsSet && stagedTemplate.limiter_active
                        &&
                        <span>{`/${charLimit}`}</span>
                    }
                </div>
                <span>characters</span>
            </FlexRowCenteredY>
            <FlexRowCenteredY className="gap-1">
                <div id="words-count" className={`${wordCountColor}`}>
                    <span>{`${wordCount}`}</span>
                    {wordLimitIsSet && stagedTemplate.limiter_active
                        &&
                        <span>{`/${wordLimit}`}</span>
                    }

                </div>
                <span>words</span>
            </FlexRowCenteredY>
            <p className="py-1 px-2 rounded bg-green-200 text-green-800 ms-auto text-xs">Single</p>
        </FlexRowCenteredY>
    )
}

export default Footer;