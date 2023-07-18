import React from 'react'
import {
    FlexColContainer,
    FlexRowCenteredY,
    FlexExpandable,
    IconContainer,
    FlexColCentered,
    FlexRowCentered
} from "@/components/shared/styled-global-components";

import { useState } from "react"

import { Badge, RangeSlider } from "flowbite-react";
import { BsArrowCounterclockwise, BsXLg } from 'react-icons/bs';
import { CardInput } from '../styles';
import { BiEraser } from 'react-icons/bi';

interface props {
    expandedTextSettings: boolean;
    setExpandedTextSettings: any;
    stagedTemplate: any;
    setStagedTemplate: any;
    textTemplate: any;

}

const TemplatesSettingsSection = (props: props) => {
    const [isLimitActive, setIsLimitActive] = useState(false)
    const {
        expandedTextSettings,
        setExpandedTextSettings,
        stagedTemplate,
        textTemplate,
        setStagedTemplate,
    } = props

    const handleWordChange = (e: any) => {
        const value = e.target.value
        const valueChecked = value === "" ? null : parseInt(value)
        stagedTemplate && setStagedTemplate({ ...stagedTemplate, word_limit: valueChecked })
    }
    const handleCharChange = (e: any) => {
        const value = e.target.value
        const valueChecked = value === "" ? null : parseInt(value)
        stagedTemplate && setStagedTemplate({ ...stagedTemplate, char_limit: valueChecked })
    }

    return (
        <FlexExpandable
            $expanded={expandedTextSettings}
            className="max-h-[30rem] md:max-h-[18rem] border-l-2 border-green-300"
        >
            <FlexColContainer className="p-4 gap-4 w-full">
                <FlexRowCenteredY className="justify-between">
                    <h3 className="text-sm">Template Settings</h3>
                    <IconContainer className="hover:bg-slate-50" onClick={() => { setExpandedTextSettings(!expandedTextSettings) }}>
                        <BsXLg className="cursor-pointer" />
                    </IconContainer>
                </FlexRowCenteredY>

                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    <FlexColContainer className="gap-4 h-full">
                        <span>
                            <Toggle isLimitActive={isLimitActive} setIsLimitActive={setIsLimitActive} />
                        </span>
                        <div className="grid grid-cols-2 gap-4 -fulhl">
                            <FlexColContainer className="gap-4">
                                <FlexRowCenteredY className="justify-between">
                                    <h4 className="text-sm text-gray-500">Word Limit</h4>
                                    {!textTemplate.word_limit && <Badge color="warning">Not set</Badge>}
                                </FlexRowCenteredY>
                                <FlexRowCenteredY className="bg-slate-50 rounded dark:bg-slate-800">
                                    <CardInput
                                        type="number"
                                        placeholder="For example 40"
                                        className="p-2 w-full"
                                        value={stagedTemplate?.word_limit ? stagedTemplate?.word_limit : ""}
                                        onChange={handleWordChange}
                                    />
                                    <div className="">
                                        <button
                                            onClick={() => { stagedTemplate && setStagedTemplate({ ...stagedTemplate, word_limit: null }) }}
                                            className={`p-2 border-1 text-lg text-gray-500 hover:text-gray-300 `}
                                        >
                                            <BiEraser />
                                        </button>
                                    </div>
                                </FlexRowCenteredY>
                                <FlexRowCenteredY className="gap-2">
                                    <div className="w-full">
                                        <RangeSlider
                                            min={5}
                                            max={150}
                                            className=""
                                            defaultValue={stagedTemplate?.word_limit ? stagedTemplate?.word_limit : 0}
                                            onChange={handleWordChange}
                                        />
                                    </div>
                                    <span className="text-gray-500">
                                        150
                                    </span>
                                </FlexRowCenteredY>
                            </FlexColContainer>
                            <FlexColContainer className="gap-4">
                                <FlexRowCenteredY className="justify-between">
                                    <h4 className="text-sm text-gray-500">Character Limit</h4>
                                    {!textTemplate.char_limit && <Badge color="warning">Not set</Badge>}
                                </FlexRowCenteredY>
                                <FlexRowCenteredY className="bg-slate-50 rounded dark:bg-slate-800">
                                    <CardInput
                                        placeholder="For example 200"
                                        className="p-2 w-full"
                                        type="number"
                                        value={stagedTemplate?.char_limit ? stagedTemplate?.char_limit : ""}
                                        onChange={handleCharChange}
                                    />
                                    <div>
                                        <button
                                            className={`p-2 border-1 text-lg text-gray-500 hover:text-gray-300 `}
                                            onClick={() => { stagedTemplate && setStagedTemplate({ ...stagedTemplate, char_limit: null }) }}
                                        >
                                            <BiEraser />
                                        </button>
                                    </div>
                                </FlexRowCenteredY>
                                <FlexRowCenteredY className="gap-2">
                                    <div className="w-full">
                                        <RangeSlider
                                            min={25}
                                            max={1000}
                                            defaultValue={stagedTemplate?.char_limit ? stagedTemplate?.char_limit : 0} className=""
                                            onChange={handleCharChange}
                                        />
                                    </div>
                                    <span className="text-gray-500">
                                        1000
                                    </span>
                                </FlexRowCenteredY>
                            </FlexColContainer>
                        </div>
                    </FlexColContainer>
                    <FlexRowCentered className="gap-4 h-full">
                        <FlexColCentered className="gap-4">
                            <span className="font-bold text-6xl text-green-600">
                                {stagedTemplate.copy_count}
                            </span>
                            <FlexRowCenteredY className="gap-2">
                                <span className="text-xs text-gray-500">
                                    Times Copied
                                </span>
                                <button className="flex gap-2 cursor-pointer hover:opacity-50 text-gray-500"
                                    onClick={() => { stagedTemplate && setStagedTemplate({ ...stagedTemplate, copy_count: 0 }) }}
                                >
                                    <BsArrowCounterclockwise

                                        className="text-xl"
                                    />
                                </button>
                            </FlexRowCenteredY>

                        </FlexColCentered>

                    </FlexRowCentered>

                </div>
            </FlexColContainer>
        </FlexExpandable >
    )
}

export const Toggle = ({ isLimitActive, setIsLimitActive }: any) => {
    const handleToggle = () => {
        setIsLimitActive(!isLimitActive);
    };

    return (
        <label className="relative cursor-pointer inline-flex">
            <input
                type="checkbox"
                checked={isLimitActive}
                onChange={handleToggle}
                className="sr-only"
            />
            <div className={`w-11 h-6 rounded-full transition-all dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white ${isLimitActive ? 'bg-green-300' : 'bg-gray-200'}`}>
                <div className={`after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${isLimitActive ? 'after:translate-x-full after:bg-green-600 after:border-green-400' : 'after:bg-gray-500 after:border-gray-300'}`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Limit words and characters
            </span>
        </label>
    );
};

export default TemplatesSettingsSection

