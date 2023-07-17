import React from 'react'
import {
    FlexColContainer,
    FlexRowCenteredY,
    FlexExpandable,
    HollowButton,
    IconContainer
} from "@/components/shared/styled-global-components";

import { Badge } from "flowbite-react";
import { BsXLg } from 'react-icons/bs';
import { CardInput } from '../styles';

interface props {
    expandedTextSettings: boolean;
    setExpandedTextSettings: any;
    stagedTemplate: any;
    setStagedTemplate: any;
    textTemplate: any;
    subscriptionLimits: any;

}

const index = (props: props) => {
    const {
        expandedTextSettings,
        setExpandedTextSettings,
        stagedTemplate,
        textTemplate,
        setStagedTemplate,
        subscriptionLimits
    } = props

    return (
        <FlexExpandable
            $expanded={expandedTextSettings}
            className="max-h-[30rem] md:max-h-[25rem] lg:max-h-[18rem] border-l-2 border-green-300"
        >
            <FlexColContainer className="p-4 gap-4 w-full">
                <FlexRowCenteredY className="justify-between">
                    <h3 className="text-sm">Template Settings</h3>
                    <IconContainer className="hover:bg-slate-50" onClick={() => { setExpandedTextSettings(!expandedTextSettings) }}>
                        <BsXLg className="cursor-pointer" />
                    </IconContainer>
                </FlexRowCenteredY>
                <FlexColContainer className="gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
                            <FlexColContainer className="gap-2 h-full col-span-1">
                                <FlexRowCenteredY className="justify-between">
                                    <h4 className="text-sm text-gray-500">Character Limit</h4>
                                    {!textTemplate.char_limit && <Badge color="warning">Not set</Badge>}
                                </FlexRowCenteredY>
                                <CardInput
                                    placeholder="For example 200"
                                    className="p-2"
                                    type="number"
                                    value={stagedTemplate?.char_limit ? stagedTemplate?.char_limit : ""}
                                    onChange={(e) => { stagedTemplate && setStagedTemplate({ ...stagedTemplate, char_limit: parseInt(e.target.value) }) }}
                                />
                            </FlexColContainer>
                            <FlexColContainer className="gap-2">
                                <h4 className="text-sm text-gray-500">Default Max Character Limit</h4>
                                <span className="text-lg">{subscriptionLimits.char}</span>
                            </FlexColContainer>
                            <FlexColContainer className="gap-2 h-full col-span-1">
                                <FlexRowCenteredY className="justify-between">
                                    <h4 className="text-sm text-gray-500">Word Limit</h4>
                                    {!textTemplate.word_limit && <Badge color="warning">Not set</Badge>}
                                </FlexRowCenteredY>
                                <CardInput
                                    type="number"
                                    placeholder="For example 40"
                                    className="p-2"
                                    value={stagedTemplate?.word_limit ? stagedTemplate?.word_limit : ""}
                                    onChange={(e) => { stagedTemplate && setStagedTemplate({ ...stagedTemplate, word_limit: parseInt(e.target.value) }) }}
                                />
                            </FlexColContainer>
                            <FlexColContainer className="gap-2">
                                <h4 className="text-sm text-gray-500">Default Word Limit</h4>
                                <i className="text-base">See character limit</i>
                            </FlexColContainer>


                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <FlexColContainer className="gap-2">
                                <h4 className="text-sm text-gray-500">Copy Counter</h4>
                                <p>Current: <span>{stagedTemplate?.copy_count}</span></p>
                            </FlexColContainer>
                            <FlexColContainer className="items-end">
                                <HollowButton
                                    className="text-sm"
                                    onClick={() => { stagedTemplate && setStagedTemplate({ ...stagedTemplate, copy_count: 0 }) }}
                                >Reset Count
                                </HollowButton>
                            </FlexColContainer>
                            <div></div>

                        </div>
                        {/* <div></div>
                        <SubmitButton
                            className="text-sm"
                            onClick={handleUpdateTemplateMetaData}
                        >
                            Save Changes</SubmitButton> */}
                    </div>

                </FlexColContainer>
            </FlexColContainer>
        </FlexExpandable>
    )
}

export default index