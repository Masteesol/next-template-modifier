import React from 'react'
import { HoverLabel, IconContainerNormal } from '../../styles'
import { BsCheckLg, BsPencilSquare, BsStar, BsStarFill } from 'react-icons/bs'
import { FlexColContainer, FlexRowCenteredY } from '@/components/shared/styled-global-components'
import { FaArrowRight, FaRegCopy } from 'react-icons/fa'
import { updateTemplatesFavourite } from '@/requests/templates'
import { Templates, TemplatesContainer } from '@/types/global'
import { useContext } from "react"
import { SaveStatusContext } from '@/context/SavedStatusContext'
import { saveMessage } from '@/utils/helpers'
interface ComponentProps {
    handleEditActive: any;
    placeholderCount: number;
    handleCopy: any;
    hasBeenCopied: boolean;
    textTemplate: any;
    setTemplates: any;
    categoryIndex: number;
    userID: any
    isTutorial: boolean;
}

const ProductionModeToolbar = (props: ComponentProps) => {
    const { setSaveStatus } = useContext(SaveStatusContext)

    const {
        handleEditActive,
        placeholderCount,
        handleCopy,
        hasBeenCopied,
        textTemplate,
        setTemplates,
        categoryIndex,
        userID,
        isTutorial
    } = props


    const handleSetFavourited = async () => {

        if (!isTutorial) {
            try {
                const res = await updateTemplatesFavourite(textTemplate.template_id, userID, !textTemplate.favourited)
                if (res) {
                    saveMessage(setSaveStatus, "Changes saved!")
                    setTemplates((prevTemplates: any) => {
                        return prevTemplates.map((templateContainer: TemplatesContainer, index: number) => {
                            if (index === categoryIndex) {
                                const updatedTemplates = templateContainer.templates.map((template: Templates) => {
                                    if (template.template_id === textTemplate.template_id) {
                                        return { ...template, favourited: !template.favourited }
                                    }
                                    return template;  // return unmodified template if condition is not true
                                })
                                return { ...templateContainer, templates: updatedTemplates };  // return the whole templateContainer with updated templates
                            }
                            return templateContainer;  // return unmodified templateContainer if condition is not true
                        })
                    });
                } else {
                    saveMessage(setSaveStatus, "Error saving changes")
                    console.log("Error updating favourites status", res)
                }
            } catch (error) {
                console.log("Error message:", error)
            }
        }
    }

    return (
        <FlexColContainer>
            <div className="group relative">
                <IconContainerNormal onClick={handleSetFavourited} disabled={false}>
                    {!textTemplate.favourited
                        ?
                        <BsStar className="text-xl" />
                        :
                        <BsStarFill className="text-xl text-green-500" />
                    }
                    <HoverLabel className={!textTemplate.favourited ? "w-[7rem]" : "w-[4rem]"}>{!textTemplate.favourited ? "Add to favourites" : "Remove"}</HoverLabel>
                </IconContainerNormal>
            </div>
            <FlexColContainer className="mt-auto">
                <div className="group relative">
                    <IconContainerNormal onClick={handleEditActive} disabled={false}>
                        <BsPencilSquare className="text-xl" />
                        <HoverLabel className="w-[4rem]">Edit text</HoverLabel>
                    </IconContainerNormal>
                    {placeholderCount === 0 &&
                        <FlexRowCenteredY className="absolute right-[3rem] top-2 text-sm group-hover:hidden text-green-600 font-bold animate-slide duration-500 ease-in-out">
                            <span className="w-[5rem] text-center ">Click Edit</span>
                            <FaArrowRight />
                        </FlexRowCenteredY>
                    }
                </div>
                <div className="group relative">
                    <IconContainerNormal onClick={handleCopy} disabled={false}>
                        {!hasBeenCopied
                            ?
                            <FaRegCopy className="text-xl" />
                            :
                            <BsCheckLg className="text-xl" />
                        }
                        <HoverLabel className="w-[7rem]">{!hasBeenCopied ? "Copy to clipboard" : "Copied to clipboard!"}</HoverLabel>
                    </IconContainerNormal>
                </div>
            </FlexColContainer>

        </FlexColContainer>
    )
}

export default ProductionModeToolbar