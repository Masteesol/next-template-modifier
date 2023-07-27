import { FlexRowCentered, FlexRowCenteredY, FlexRowContainer, PlusButton } from '@/components/shared/styled-global-components'
import React from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa'

interface MinimizedManagerProps {
    viewCategories: boolean;
    handleCreateCategory: any;
    handleViewCategorySelect: any;
    handleViewNavigationSelect: any
    textTemplates: any;
    selectedCategory: number;
    viewNavigation: boolean;
    handleCreateTemplate: any;
}

const MinimizedManager = (props: MinimizedManagerProps) => {
    const {
        viewCategories,
        handleCreateCategory,
        handleViewCategorySelect,
        handleViewNavigationSelect,
        textTemplates,
        selectedCategory,
        viewNavigation,
        handleCreateTemplate
    } = props
    return (
        <FlexRowContainer className="gap-1 text-sm md:text-xs">
            {!viewCategories &&
                <FlexRowCentered className=" bg-slate-50 dark:bg-slate-700 rounded shadow px-4 py-2 gap-2">
                    <div>
                        <PlusButton onClick={handleCreateCategory} className="text-base md:text-sm p-2 md:p-1">
                            <BsPlusLg />
                        </PlusButton>
                    </div>
                    <FlexRowCenteredY
                        onClick={handleViewCategorySelect}
                        className={`gap-2 group cursor-pointer`}>
                        <h2>Categories</h2>
                        <FaEye className="text-base" />

                    </FlexRowCenteredY>
                </FlexRowCentered>
            }
            {textTemplates?.length > 0 &&
                textTemplates[selectedCategory]?.templates.length > 0 && !viewNavigation &&
                <FlexRowCentered className="relative bg-slate-50 dark:bg-slate-700 rounded shadow px-4 py-2 gap-2">
                    <FlexRowContainer className="gap-2">
                        <PlusButton
                            onClick={() => handleCreateTemplate(true)}
                            className="bg-purple-200 text-purple-900 text-base md:text-sm p-2 md:p-1"
                        >
                            <BsPlusLg />
                        </PlusButton>
                        <PlusButton onClick={() => handleCreateTemplate()} className="text-base md:text-sm p-2 md:p-1">
                            <BsPlusLg />
                        </PlusButton>
                    </FlexRowContainer>
                    <FlexRowCentered
                        className={`gap-2 cursor-pointer`}
                        onClick={handleViewNavigationSelect}
                    >
                        <h2>Templates</h2>
                        <FaEye className="text-base" />
                    </FlexRowCentered>
                </FlexRowCentered>
            }
        </FlexRowContainer>
    )
}

export default MinimizedManager