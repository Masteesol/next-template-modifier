import { CardBaseLight, DividerHorizontal, FlexColCentered, FlexColContainer, PlusButton } from '@/components/shared/styled-global-components'
import React from 'react'
import { BsPlusLg } from 'react-icons/bs'

interface CreateFirstTemplateCardProps {
    handleCreateTemplate: any;
}

const CreateFirstTemplateCard = (props: CreateFirstTemplateCardProps) => {
    const {

        handleCreateTemplate,
    } = props
    return (
        <FlexColCentered className="h-[70vh] gap-4 w-full">
            <CardBaseLight className="w-full max-w-[350px]">
                <FlexColContainer className="p-8 w-full gap-4 border-[1px] rounded ">
                    <h2 className="text-lg  md:text-2xl font-bold">New Template</h2>
                    <DividerHorizontal />
                    <FlexColContainer className="gap-4 items-end">
                        <div className="flex items-center gap-2 hover:text-green-800 cursor-pointer"
                            onClick={() => handleCreateTemplate()}
                        >
                            Single Template
                            <PlusButton

                                className="text-base"
                            >
                                <BsPlusLg />
                            </PlusButton>
                        </div>
                        <div className="flex items-center gap-2 hover:text-purple-800 cursor-pointer"
                            onClick={() => handleCreateTemplate(true)}
                        >
                            Template Collection
                            <PlusButton

                                className="bg-purple-200 text-purple-800 text-base"
                            >
                                <BsPlusLg />
                            </PlusButton>
                        </div>
                    </FlexColContainer>
                </FlexColContainer>
            </CardBaseLight>
            <i>Add a template</i>
        </FlexColCentered>
    )
}

export default CreateFirstTemplateCard