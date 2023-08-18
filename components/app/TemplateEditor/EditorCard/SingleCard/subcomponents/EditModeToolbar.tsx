import React from 'react'
import {
    FlexColContainer,
    DividerHorizontal,
    FlexColCenteredX,
} from "@/components/shared/styled-global-components";
import { HoverLabel, IconContainerNormal, IconContainerWarning, IconContainerYellow } from '../../styles'
import { BsArrowCounterclockwise, BsArrowLeft, BsRobot, BsSliders } from 'react-icons/bs';
import { BiEraser } from 'react-icons/bi';
import { FiSave } from "react-icons/fi"

interface ComponentProps {
    expandedAI: boolean;
    setExpandedAI: any;
    expandedTextSettings: any;
    handleRemoveTextAreaText: any;
    handleApprove: any;
    handleEditActive: any;
    setExpandedTextSettings: any;
    charLimitExceeded: boolean;
    isUnSaved: boolean;
    handleRevertChanges: any
    isTutorial: boolean
}

const EditModeToolbar = (props: ComponentProps) => {
    const {
        setExpandedAI,
        expandedAI,
        expandedTextSettings,
        setExpandedTextSettings,
        handleRemoveTextAreaText,
        handleApprove,
        handleEditActive,
        charLimitExceeded,
        isUnSaved,
        handleRevertChanges,
        isTutorial
    } = props

    return (
        <FlexColCenteredX>

            <div className="group relative hidden">
                <IconContainerNormal
                    className={`${expandedAI && "bg-green-200 text-green-900"}`}
                    onClick={() => { setExpandedAI(!expandedAI) }}
                    disabled={expandedTextSettings}
                >
                    <BsRobot className="text-2xl" />
                    <HoverLabel className="w-[6rem] ">Generate Text</HoverLabel>
                </IconContainerNormal>
            </div>

            {!isTutorial
                &&
                <div className="group relative">
                    <IconContainerNormal
                        onClick={() => { setExpandedTextSettings(!expandedTextSettings) }}
                        disabled={expandedAI}
                        className={`${expandedTextSettings && "bg-green-200 text-green-900"}`}
                    >
                        <BsSliders className="text-2xl" />
                        <HoverLabel className="w-[8rem] ">Template Settings</HoverLabel>
                    </IconContainerNormal>
                </div>
            }

            <FlexColContainer className="mt-auto">
                <DividerHorizontal className="border-gray-100" />
                <div className="group relative">
                    <IconContainerWarning
                        onClick={handleRemoveTextAreaText}
                    >
                        <BiEraser className="text-2xl" />
                        <HoverLabel className="w-[5rem] bg-red-200 text-red-700">Remove text</HoverLabel>
                    </IconContainerWarning>
                </div>
                <DividerHorizontal className="border-gray-100" />
                <div className="group relative">
                    <IconContainerYellow
                        onClick={handleRevertChanges}
                        disabled={!isUnSaved}
                    >
                        <BsArrowCounterclockwise className="text-2xl" />
                        <HoverLabel className="w-[7rem] ">{isUnSaved ? "Revert changes" : "No changes made"}</HoverLabel>
                    </IconContainerYellow>
                </div>
                <div className="group relative">
                    <IconContainerNormal onClick={handleApprove} disabled={charLimitExceeded || !isUnSaved}>
                        <FiSave className="text-2xl" />
                        <HoverLabel className="w-[9rem]">{isUnSaved ? "Save and apply changes" : "No changes to save"}</HoverLabel>
                    </IconContainerNormal>
                </div>
                <div className="group relative">
                    <IconContainerNormal onClick={handleEditActive} disabled={false}>
                        <BsArrowLeft className="text-2xl " />
                        <HoverLabel className="w-[4rem]">Go back</HoverLabel>
                    </IconContainerNormal>
                </div>
            </FlexColContainer>
        </FlexColCenteredX>
    )
}

export default EditModeToolbar