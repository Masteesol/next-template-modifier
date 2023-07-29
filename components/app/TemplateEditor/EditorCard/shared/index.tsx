import React from 'react'
import { HoverLabel, IconContainerWarning } from '../styles'
import { BsXLg } from 'react-icons/bs'
import { FlexColContainer, FlexRowCenteredY, HollowButton } from '@/components/shared/styled-global-components'
import { Templates, TemplatesContainer } from '@/types/global';

interface DeleteTemplateButtonProps {
    clickedOnce: boolean;
    setClickedOnce: any;
    handleRemoveTemplate: any;
    index: number;
    template: Templates;
}

export const DeleteTemplateButton = (props: DeleteTemplateButtonProps) => {
    const {
        clickedOnce,
        setClickedOnce,
        handleRemoveTemplate,
        index,
        template
    } = props
    return (
        <div>
            {
                !clickedOnce
                    ? <div className="group relative">
                        <IconContainerWarning
                            onClick={() => { setClickedOnce(true) }}
                        >
                            <BsXLg />
                            <HoverLabel className="w-[7rem] bg-red-200 text-red-700">Delete template</HoverLabel>
                        </IconContainerWarning>
                    </div>
                    :
                    <FlexRowCenteredY className="gap-2 ms-auto text-sm">
                        <button
                            className="cursor-pointer bg-red-200 text-red-800 rounded border-[1px] border-red-800 hover:opacity-50 px-2 py-1"
                            onClick={() => handleRemoveTemplate(index, template.template_id, template.is_collection)}>
                            Confirm
                        </button>
                        <HollowButton
                            className="px-2 py-1"
                            onClick={() => { setClickedOnce(false) }}
                        >
                            Cancel
                        </HollowButton>
                    </FlexRowCenteredY>
            }
        </div>
    )
}

interface CategorySelectorProps {
    textTemplates: TemplatesContainer[];
    changeCategoryForTemplate: any
    categoryIndex: number;
    theme: string
}

export const CategorySelector = (props: CategorySelectorProps) => {
    const {
        textTemplates,
        changeCategoryForTemplate,
        categoryIndex,
        theme
    } = props
    const focusColor = theme === "primary" ? "focus:ring-green-300" : "focus:ring-purple-300"
    return <FlexColContainer className="text-xs gap-2 w-full">
        <h4 className="text-gray-500">Category</h4>
        <select
            value={textTemplates[categoryIndex]?.category_id}
            onChange={changeCategoryForTemplate}
            className={`text-xs border-0 rounded bg-slate-50 ${focusColor}`}
        >
            {textTemplates.map((template: TemplatesContainer, index: number) => {
                return (
                    <option
                        key={`select-option-${index}`}
                        value={template.category_id}
                    >
                        {template.category_name}
                    </option>
                );
            })}
        </select>
    </FlexColContainer>
}