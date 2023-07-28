import { FlexRowCenteredY } from '@/components/shared/styled-global-components'
import { InputBase } from '../../styles'
import { generalInputCountRestrictions } from '@/utils/generalCountRestrictions';
import { useState } from "react"
import { DeleteTemplateButton } from '../../shared';

interface ComponentProps {
    isEditActive: boolean;
    stagedTemplate: any;
    handleTitleChange: any;
    handleRemoveTemplate: any;
    textTemplate: any
    index: number;
    template: any;
    isUnSaved: boolean;
}


const Topbar = (props: ComponentProps) => {

    const [clickedOnce, setClickedOnce] = useState(false)

    const {
        isEditActive,
        stagedTemplate,
        handleTitleChange,
        textTemplate,
        handleRemoveTemplate,
        index,
        template,
        isUnSaved
    } = props



    return (
        <FlexRowCenteredY className="justify-between gap-4">
            {isEditActive
                ?
                <InputBase
                    type="text"
                    value={stagedTemplate.title}
                    className="text-xl max-w-[70%] bg-slate-50 dark:bg-slate-800 px-2 py-1"
                    onChange={handleTitleChange}
                    maxLength={generalInputCountRestrictions.titles}
                    placeholder="Template Title..."
                />


                : <h3 className="text-xl">
                    {textTemplate.title.length > 25 ? `${textTemplate.title.substring(0, 25)}...` : `${textTemplate.title}`}
                </h3>
            }
            {isEditActive ?
                <FlexRowCenteredY className="gap-2">
                    {isUnSaved &&
                        <span className="text-gray-500">Unsaved Changes</span>
                    }

                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Editing Mode</span>
                </FlexRowCenteredY>
                :
                <DeleteTemplateButton
                    clickedOnce={clickedOnce}
                    setClickedOnce={setClickedOnce}
                    template={template}
                    handleRemoveTemplate={handleRemoveTemplate}
                    index={index}
                />
            }
        </FlexRowCenteredY>
    )
}

export default Topbar

