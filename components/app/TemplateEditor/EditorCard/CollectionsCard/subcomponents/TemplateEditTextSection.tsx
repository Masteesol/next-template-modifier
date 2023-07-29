import React, { useState, useEffect } from "react";
import { BiEraser } from "react-icons/bi";

import {
    DividerHorizontal,
    FlexColContainer,
    FlexRowCenteredY,
    FlexRowContainer,
    IconContainerSecondary,
} from "@/components/shared/styled-global-components";

import { HoverLabel, IconContainerYellow, TextArea } from "@/components/app/TemplateEditor/EditorCard/styles";

import { FaRegCopy } from "react-icons/fa";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { CollectionItem } from "@/types/global";
import { generalInputCountRestrictions } from "@/utils/generalCountRestrictions";
import { getColorForCount } from "@/utils/helpers";

interface TemplateEntryProps {
    handleCopy: any
    collectionItem: CollectionItem;
    handleTextChange: any;
    handleRemoveCollectionItem: any
    isEditTextActive: boolean;
}

const TemplateEntry = (props: TemplateEntryProps) => {
    const [hasBeenCopied, setHasBeenCopied] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const {
        isEditTextActive,
        collectionItem,
        handleCopy,
        handleTextChange,
        handleRemoveCollectionItem
    } = props

    useEffect(() => {
        setInputValue(collectionItem.text)
    }, [collectionItem.text])

    const handleCopyButton = () => {
        handleCopy(inputValue)
        setHasBeenCopied(true)
        setTimeout(() => setHasBeenCopied(false), 2000)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
        handleTextChange(e.target.value, collectionItem)
    }

    const handleEmptyInput = () => {
        setInputValue("")
        handleTextChange("", collectionItem)
    }

    const charLimit = generalInputCountRestrictions.templateCollectionItem

    if (!isEditTextActive) {
        return <div
            className={`w-full`}
        >
            <FlexRowContainer
                className="group p-1 text-xs md:text-sm hover:bg-slate-50 dark:hover:bg-slate-700 gap-4 justify-between border-purple-200 border-l-2 hover:border-l-4 hover:border-purple-400 transition-all ease-in-out duration-150 transition-delay-150 px-4 cursor-pointer hover:rounded"
                onClick={handleCopyButton}
            >
                <p className="hidden md:block">
                    {`${collectionItem.text === "" ? "Empty" : collectionItem.text}`}
                </p>
                <p className="md:hidden">
                    {`${collectionItem.text === "" ? "Empty" : `${collectionItem.text.length >= 60 ? `${collectionItem.text.substring(0, 60)}...` : collectionItem.text}`}`}
                </p>
                <div className="relative">
                    <IconContainerSecondary
                        disabled={false}
                        onClick={handleCopyButton}
                        className="group-hover:bg-purple-200 group-hover:text-purple-800"

                    >
                        {!hasBeenCopied
                            ?
                            <FaRegCopy className="text-base" />
                            :
                            <BsCheckLg className="text-base" />
                        }
                        <HoverLabel className="w-[8rem] cursor-pointer">{!hasBeenCopied ? "Copy to clipboard" : "Copied to clipboard!"}</HoverLabel>
                    </IconContainerSecondary>
                </div>
            </FlexRowContainer>
        </div >
    }

    return <FlexColContainer className="gap-2">
        <FlexRowContainer
            className="gap-2"
        >
            <FlexRowContainer className="w-full bg-slate-50 rounded dark:bg-slate-800">
                <TextArea
                    className="bg-transparent w-full bg-slate-50 dark:bg-slate-800 rounded min-h-[5rem] focus:ring-purple-300"
                    placeholder="Template text goes here..."
                    value={`${inputValue}`}
                    onChange={(e) => { handleInputChange(e) }}
                    maxLength={charLimit}
                />
                <div>
                    <button
                        onClick={handleEmptyInput}
                        className={`hover:bg-slate-100 dark:hover:bg-gray-900 p-2 border-1 text-lg text-gray-500 rounded `}
                    >
                        <BiEraser />
                    </button>
                </div>

            </FlexRowContainer>
            <div className="group relative">
                <IconContainerYellow
                    disabled={false}
                    onClick={() => { handleRemoveCollectionItem(collectionItem.id) }}
                >
                    <BsXLg className="text-xs" />
                    <HoverLabel className="w-[7rem]">{"Remove Template"}</HoverLabel>
                </IconContainerYellow>
            </div>
        </FlexRowContainer>
        <DividerHorizontal />
        <FlexRowCenteredY className="gap-1 text-xs text-gray-400 justify-end">
            <div id="words-count" className={`${getColorForCount(inputValue.length, charLimit)}`}>
                <span>{`${inputValue.length}`}</span>
                <span>{`/${charLimit}`}</span>
            </div>
            <span>characters</span>
        </FlexRowCenteredY>
    </FlexColContainer>

}

export default TemplateEntry