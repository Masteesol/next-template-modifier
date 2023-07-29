import { FlexColContainer, FlexRowCenteredY } from '@/components/shared/styled-global-components'
import { InputBase } from '../../styles'
import { generalInputCountRestrictions } from '@/utils/generalCountRestrictions';
import { useState, useContext } from "react"
import { CategorySelector, DeleteTemplateButton } from '../../shared';
import { moveTemplateToNewCategory } from '@/utils/helpers';
import { updateTemplateCategoryLink } from '@/requests/templates';
import { TemplatesContext } from '@/context/TemplatesContext';

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
                <FlexColContainer className="gap-4 w-full">
                    <FlexRowCenteredY className="justify-between">
                        <h3 className="text-xl font-bold">
                            {textTemplate.title.length > 25 ? `${textTemplate.title.substring(0, 25)}...` : `${textTemplate.title}`}
                        </h3>
                        <FlexRowCenteredY className="gap-2">
                            {isUnSaved &&
                                <span className="text-gray-500">Unsaved Changes</span>
                            }
                            <span className="ms-auto bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Editing</span>
                        </FlexRowCenteredY>

                    </FlexRowCenteredY>
                    <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-2">
                        <FlexColContainer className="text-xs gap-2">
                            <h4 className="text-gray-500">Title</h4>
                            <InputBase
                                type="text"
                                value={stagedTemplate.title}
                                className="text-xs rounded border-0 bg-slate-50 dark:bg-slate-800 px-4 py-2"
                                onChange={handleTitleChange}
                                maxLength={generalInputCountRestrictions.titles}
                                placeholder="Template Title..."
                            />
                        </FlexColContainer>
                        <CategorySelector
                            textTemplates={textTemplates}
                            changeCategoryForTemplate={changeCategoryForTemplate}
                            categoryIndex={categoryIndex}
                            theme="primary"
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
                        index={index}
                    />
                </FlexRowCenteredY>
            }

        </>
    )
}

export default Topbar

