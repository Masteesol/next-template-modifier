import React from 'react'
import {
    FlexColContainer,
    FlexRowCenteredY,
    FlexExpandable,
    IconContainer,
    FlexColCentered,
    FlexRowCentered
} from "@/components/shared/styled-global-components";

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
            $heightAndPadding='h-[30rem] md:h-[18rem] py-4'
            className=" border-l-2 border-green-300"
        >
            <FlexColContainer className="p-4 gap-4 w-full">
                <FlexRowCenteredY className="justify-between">
                    <h3 className="text-sm">Template Settings</h3>
                    <IconContainer className="hover:bg-slate-50" onClick={() => { setExpandedTextSettings(!expandedTextSettings) }}>
                        <BsXLg className="cursor-pointer" />
                    </IconContainer>
                </FlexRowCenteredY>
                <span>
                    <Toggle stagedTemplate={stagedTemplate} setStagedTemplate={setStagedTemplate} />
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    <FlexColContainer className="gap-4 h-full">

                        <div className={`grid grid-cols-2 gap-4`}>
                            <FlexColContainer className="gap-4">
                                <FlexRowCenteredY className="justify-between">
                                    <h4 className="text-sm text-gray-500">Word Limit</h4>
                                    {!textTemplate.word_limit && <Badge color="warning">Not set</Badge>}
                                </FlexRowCenteredY>
                                <FlexRowCenteredY className={`${!stagedTemplate.limiter_active ? "bg-gray-300" : "bg-slate-50"}  rounded dark:bg-slate-800`}>
                                    <CardInput
                                        type="number"
                                        placeholder="For example 40"
                                        className={`${!stagedTemplate.limiter_active && "bg-gray-300"} p-2 w-full`}
                                        value={stagedTemplate?.word_limit ? stagedTemplate?.word_limit : ""}
                                        onChange={handleWordChange}
                                        disabled={!stagedTemplate.limiter_active}
                                    />
                                    <div className="">
                                        <button
                                            onClick={() => { stagedTemplate && setStagedTemplate({ ...stagedTemplate, word_limit: null }) }}
                                            className={`p-2 border-1 text-lg text-gray-500 hover:text-gray-300 `}
                                            disabled={!stagedTemplate.limiter_active}
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
                                            disabled={!stagedTemplate.limiter_active}
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
                                <FlexRowCenteredY className={`${!stagedTemplate.limiter_active ? "bg-gray-300" : "bg-slate-50"}  rounded dark:bg-slate-800`}>
                                    <CardInput
                                        placeholder="For example 200"
                                        className={`${!stagedTemplate.limiter_active && "bg-gray-300"} p-2 w-full`}
                                        type="number"
                                        value={stagedTemplate?.char_limit ? stagedTemplate?.char_limit : ""}
                                        onChange={handleCharChange}
                                        disabled={!stagedTemplate.limiter_active}
                                    />
                                    <div>
                                        <button
                                            className={`p-2 border-1 text-lg text-gray-500 hover:text-gray-300 `}
                                            onClick={() => { stagedTemplate && setStagedTemplate({ ...stagedTemplate, char_limit: null }) }}
                                            disabled={!stagedTemplate.limiter_active}
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
                                            defaultValue={stagedTemplate?.char_limit ? stagedTemplate?.char_limit : 0}
                                            onChange={handleCharChange}
                                            disabled={!stagedTemplate.limiter_active}
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
                                    <BsArrowCounterclockwise className="text-xl" />
                                </button>
                            </FlexRowCenteredY>

                        </FlexColCentered>

                    </FlexRowCentered>

                </div>
            </FlexColContainer >
        </FlexExpandable >
    )
}

export const Toggle = ({ stagedTemplate, setStagedTemplate }: any) => {
    const handleToggle = () => {
        stagedTemplate && setStagedTemplate({ ...stagedTemplate, limiter_active: !stagedTemplate.limiter_active })
    };
    return (
        <label className="relative cursor-pointer inline-flex">
            <input
                type="checkbox"
                defaultChecked={stagedTemplate?.limiter_active}
                onChange={handleToggle}
                className="sr-only"
            />
            <div className={`w-11 h-6 rounded-full transition-all dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white ${stagedTemplate?.limiter_active ? 'bg-green-300' : 'bg-gray-200'}`}>
                <div className={`after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${stagedTemplate?.limiter_active ? 'after:translate-x-full after:bg-green-600 after:border-green-400' : 'after:bg-gray-500 after:border-gray-300'}`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {stagedTemplate?.limiter_active ? "Deactivate limiters" : "Activate limiters"}
            </span>
        </label>
    );
};

export default TemplatesSettingsSection

