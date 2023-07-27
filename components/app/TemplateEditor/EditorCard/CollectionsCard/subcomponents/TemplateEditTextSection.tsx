import React, { useState, useEffect } from "react";
import { BiEraser } from "react-icons/bi";

import {
    FlexRowContainer,
} from "@/components/shared/styled-global-components";

import { HoverLabel, IconContainerNormal, IconContainerYellow, TextArea } from "@/components/app/TemplateEditor/EditorCard/styles";

import { FaRegCopy } from "react-icons/fa";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { CollectionItem } from "@/types/global";

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
    if (!isEditTextActive) {
        return <div
            className={`w-full`}
        >
            <FlexRowContainer className="gap-4 justify-between border-l-2 border-green-200 px-4">
                <p>
                    {`${collectionItem.text === "" ? "Empty" : collectionItem.text}`}
                </p>
                <div className="group relative">
                    <IconContainerNormal disabled={false} onClick={handleCopyButton}>
                        {!hasBeenCopied
                            ?
                            <FaRegCopy className="text-base" />
                            :
                            <BsCheckLg className="text-base" />
                        }
                        <HoverLabel className="w-[7rem]">{!hasBeenCopied ? "Copy to clipboard" : "Copied to clipboard!"}</HoverLabel>
                    </IconContainerNormal>
                </div>
            </FlexRowContainer>
        </div >
    }

    return <FlexRowContainer
        className="gap-2"
    >
        <FlexRowContainer className="w-full bg-slate-50 rounded">
            <TextArea
                className="bg-transparent w-full bg-slate-50 rounded min-h-[5rem]"
                placeholder="Template text goes here..."
                value={`${inputValue}`}
                onChange={(e) => { handleInputChange(e) }}
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
}

export default TemplateEntry