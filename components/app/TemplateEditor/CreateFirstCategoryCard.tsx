import {
    CardBaseLight,
    CardBaseLightHover,
    DividerHorizontal,
    FlexColCentered,
    FlexColContainer,
    FlexRowCentered,
    InputBase,
    PlusButton
} from '@/components/shared/styled-global-components'
import React from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { useState } from "react"

interface CreateFirstCategoryCardProps {
    addCategory: any;

}

const CreateFirstCategoryCard = (props: CreateFirstCategoryCardProps) => {
    const [input, setInput] = useState<string>("")

    const {
        addCategory
    } = props
    return (
        <FlexColCentered className="h-[70vh] gap-4 w-full">
            <CardBaseLight className="w-full max-w-[350px]">
                <FlexColContainer className="min-w-[20rem] p-4 gap-4">
                    <h2 className="text-lg  md:text-2xl font-bold">New Category</h2>
                    <DividerHorizontal />
                    <FlexColContainer className="gap-2">
                        <label
                            className="text-gray-500 text-sm"
                            htmlFor='category-name-input-card'>{`Category Name (optional)`}</label>
                        <InputBase type="text"
                            id='category-name-input-card'
                            placeholder="For example: Customer Service"
                            className="text-sm bg-slate-50 dark:bg-gray-800 w-full"
                            onChange={(e) => { setInput(e.target.value) }}
                        />
                    </FlexColContainer>
                    <DividerHorizontal />
                    <CardBaseLightHover>
                        <FlexRowCentered className="gap-2 cursor-pointer px-4 py-2"
                            onClick={() => { addCategory(input) }}
                        >
                            Add a new category
                            <PlusButton

                                className="text-base"
                            >
                                <BsPlusLg />
                            </PlusButton>
                        </FlexRowCentered>
                    </CardBaseLightHover>
                </FlexColContainer>

            </CardBaseLight>
            <i>Add a template category to begin</i>
        </FlexColCentered>
    )
}

export default CreateFirstCategoryCard