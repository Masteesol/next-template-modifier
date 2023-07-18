import React from 'react'
import {
    FlexColContainer,
    DividerHorizontal,
    FlexColCenteredX,
} from "@/components/shared/styled-global-components";
import { HoverLabel, IconContainerNormal, IconContainerWarning } from '../styles';
import { BsArrowLeft, BsRobot, BsSliders } from 'react-icons/bs';
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
        charLimitExceeded
    } = props
    return (
        <FlexColCenteredX>
            <div className="group relative">
                <IconContainerNormal
                    className={`${expandedAI && "bg-green-200 text-green-900"}`}
                    onClick={() => { setExpandedAI(!expandedAI) }}
                    disabled={expandedTextSettings}
                >
                    <BsRobot className="text-2xl" />
                    <HoverLabel className="w-[6rem] ">Generate Text</HoverLabel>
                </IconContainerNormal>
            </div>
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
                    <IconContainerNormal onClick={handleApprove} disabled={charLimitExceeded}>
                        <FiSave className="text-2xl" />
                        <HoverLabel className="w-[10rem]">Save and apply changes</HoverLabel>
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