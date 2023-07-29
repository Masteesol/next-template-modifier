import { FlexColContainer, FlexRowCenteredY, FlexRowContainer } from '@/components/shared/styled-global-components'
import { useState, useContext } from "react"
import { generalInputCountRestrictions } from '@/utils/generalCountRestrictions';
import { CategorySelector, DeleteTemplateButton } from '../../shared';
import { TemplatesContext } from '@/context/TemplatesContext';
import { moveTemplateToNewCategory } from '@/utils/helpers';
import { updateTemplateCategoryLink } from '@/requests/templates';

interface ComponentProps {
    isEditActive: boolean;
    handleTitleChange: any;
    handleRemoveTemplate: any;
    textTemplate: any
    index: number;
    template: any;
    categoryIndex: number;
    userID: any
}




const Topbar = (props: ComponentProps) => {
    const { textTemplates, setTextTemplates } = useContext(TemplatesContext);
    const {
        isEditActive,
        handleTitleChange,
        textTemplate,
        handleRemoveTemplate,
        index: templateIndex,
        template,
        categoryIndex,
        userID
    } = props

    const changeCategoryForTemplate = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategoryId = e.target.value;
        moveTemplateToNewCategory(categoryIndex, templateIndex, newCategoryId, textTemplates, setTextTemplates);
        try {
            await updateTemplateCategoryLink(textTemplate.template_id, userID, newCategoryId)
        } catch (error) {
            console.log("Topbar, updateTemplateCategoryLink", error)
        }

    };

    const [input, setInput] = useState(textTemplate.title)
    const [clickedOnce, setClickedOnce] = useState(false)
    return (
        <>
            {isEditActive
                ?
                <FlexColContainer className="gap-4 w-full">
                    <FlexRowContainer>
                        <h3 className="text-xl font-bold">
                            {textTemplate.title.length > 25 ? `${textTemplate.title.substring(0, 25)}...` : `${textTemplate.title}`}
                        </h3>
                        <span className="ms-auto bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Editing</span>
                    </FlexRowContainer>
                    <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-2">
                        <FlexColContainer className="text-xs gap-2">
                            <h4 className="text-gray-500">Title</h4>
                            <input
                                type="text"
                                value={input}
                                className="text-base lg:text-base rounded border-0 bg-slate-50 dark:bg-slate-800 px-2 py-1 focus:ring-purple-300"
                                onChange={(e) => { handleTitleChange(e); setInput(e.target.value) }}
                                placeholder="Template Title..."
                                maxLength={generalInputCountRestrictions.titles}
                            />
                        </FlexColContainer>
                        <CategorySelector
                            textTemplates={textTemplates}
                            changeCategoryForTemplate={changeCategoryForTemplate}
                            categoryIndex={categoryIndex}
                            theme="secondary"
                        />

                    </div>
                </FlexColContainer>

                :
                <FlexRowCenteredY className="justify-between gap-4">
                    <h3 className="text-xl font-bold">
                        {textTemplate.title.length > 25 ? `${textTemplate.title.substring(0, 25)}...` : `${textTemplate.title}`}
                    </h3>
                    <DeleteTemplateButton
                        clickedOnce={clickedOnce}
                        setClickedOnce={setClickedOnce}
                        template={template}
                        handleRemoveTemplate={handleRemoveTemplate}
                        index={templateIndex}
                    />
                </FlexRowCenteredY>
            }
        </>

    )
}

export default Topbar

