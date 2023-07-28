import { FlexColContainer, FlexRowCenteredY, FlexRowContainer } from '@/components/shared/styled-global-components'
import { InputBase } from '../../styles'
import { generalInputCountRestrictions } from '@/utils/generalCountRestrictions';
import { useState, useContext } from "react"
import { DeleteTemplateButton } from '../../shared';
import { moveTemplateToNewCategory } from '@/utils/helpers';
import { updateTemplateCategoryLink } from '@/requests/templates';
import { TemplatesContext } from '@/context/TemplatesContext';
import { TemplatesContainer } from '@/types/global';

interface ComponentProps {
    isEditActive: boolean;
    stagedTemplate: any;
    handleTitleChange: any;
    handleRemoveTemplate: any;
    textTemplate: any
    index: number;
    template: any;
    isUnSaved: boolean;
    userID: any;
    categoryIndex: number
}


const Topbar = (props: ComponentProps) => {
    const { textTemplates, setTextTemplates } = useContext(TemplatesContext);
    const [clickedOnce, setClickedOnce] = useState(false)

    const {
        isEditActive,
        stagedTemplate,
        handleTitleChange,
        textTemplate,
        handleRemoveTemplate,
        index,
        template,
        isUnSaved,
        userID,
        categoryIndex
    } = props


    const changeCategoryForTemplate = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategoryId = e.target.value;
        moveTemplateToNewCategory(categoryIndex, index, newCategoryId, textTemplates, setTextTemplates);
        try {
            await updateTemplateCategoryLink(textTemplate.template_id, userID, newCategoryId)
        } catch (error) {
            console.log("Topbar, updateTemplateCategoryLink", error)
        }

    };

    return (
        <>
            {isEditActive
                ?
                <FlexColContainer className="gap-2">
                    <FlexRowCenteredY className="justify-between gap-4">
                        <FlexRowContainer className="gap-4">
                            <FlexColContainer className="text-xs gap-2 max-w-[70%]">
                                <h4 className="text-gray-500">Title</h4>
                                <InputBase
                                    type="text"
                                    value={stagedTemplate.title}
                                    className="text-base lg:text-lg bg-slate-50 dark:bg-slate-800 px-2 py-1"
                                    onChange={handleTitleChange}
                                    maxLength={generalInputCountRestrictions.titles}
                                    placeholder="Template Title..."
                                />
                            </FlexColContainer>
                            <FlexColContainer className="text-xs gap-2 hidden md:flex">
                                <h4 className="text-gray-500">Category</h4>
                                <select
                                    value={textTemplates[categoryIndex]?.category_id}
                                    onChange={changeCategoryForTemplate}
                                    className="text-xs border-0 focus:ring-green-300 rounded hidden md:block bg-slate-50 max-w-[180px]"
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
                        </FlexRowContainer>

                        <FlexRowContainer className="gap-2 items-start">
                            {isUnSaved &&
                                <span className="text-gray-500">Unsaved Changes</span>
                            }
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Editing</span>
                        </FlexRowContainer>
                    </FlexRowCenteredY>
                    <FlexColContainer className="text-xs gap-2 md:hidden">
                        <h4 className="text-gray-500">Category</h4>
                        <select
                            value={textTemplates[categoryIndex]?.category_id}
                            onChange={changeCategoryForTemplate}
                            className="text-xs border-0 focus:ring-green-300 rounded bg-slate-50 max-w-[180px]"
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
                </FlexColContainer>

                :
                <FlexRowCenteredY className="justify-between gap-4">
                    <h3 className="text-xl">
                        {textTemplate.title.length > 25 ? `${textTemplate.title.substring(0, 25)}...` : `${textTemplate.title}`}
                    </h3>
                    <DeleteTemplateButton
                        clickedOnce={clickedOnce}
                        setClickedOnce={setClickedOnce}
                        template={template}
                        handleRemoveTemplate={handleRemoveTemplate}
                        index={index}
                    />
                </FlexRowCenteredY>
            }
        </>
        // <FlexRowCenteredY className="justify-between gap-4">
        //     {isEditActive
        //         ?
        //         <InputBase
        //             type="text"
        //             value={stagedTemplate.title}
        //             className="text-xl max-w-[70%] bg-slate-50 dark:bg-slate-800 px-2 py-1"
        //             onChange={handleTitleChange}
        //             maxLength={generalInputCountRestrictions.titles}
        //             placeholder="Template Title..."
        //         />


        //         : <h3 className="text-xl">
        //             {textTemplate.title.length > 25 ? `${textTemplate.title.substring(0, 25)}...` : `${textTemplate.title}`}
        //         </h3>
        //     }
        //     {isEditActive ?
        //         <FlexRowCenteredY className="gap-2">
        //             {isUnSaved &&
        //                 <span className="text-gray-500">Unsaved Changes</span>
        //             }

        //             <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Editing</span>
        //         </FlexRowCenteredY>
        //         :
        //         <DeleteTemplateButton
        //             clickedOnce={clickedOnce}
        //             setClickedOnce={setClickedOnce}
        //             template={template}
        //             handleRemoveTemplate={handleRemoveTemplate}
        //             index={index}
        //         />
        //     }
        // </FlexRowCenteredY>
    )
}

export default Topbar

