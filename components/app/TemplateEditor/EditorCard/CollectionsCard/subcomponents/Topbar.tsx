import { FlexRowCenteredY } from '@/components/shared/styled-global-components'
import { HoverLabel, IconContainerWarning, InputBase } from '../../styles'
import { BsXLg } from 'react-icons/bs'
import { useState } from "react"
import { generalInputCountRestrictions } from '@/utils/generalCountRestrictions';

interface ComponentProps {
    isEditActive: boolean;
    handleTitleChange: any;
    handleRemoveTemplate: any;
    textTemplate: any
    index: number;
    template: any;
}




const Topbar = (props: ComponentProps) => {

    const {
        isEditActive,
        handleTitleChange,
        textTemplate,
        handleRemoveTemplate,
        index,
        template,
    } = props

    const [input, setInput] = useState(textTemplate.title)

    return (
        <FlexRowCenteredY className="justify-between gap-4">
            {isEditActive
                ?
                <InputBase
                    type="text"
                    value={input}
                    className="text-xl max-w-[70%] bg-slate-50 dark:bg-slate-800 px-2 py-1"
                    onChange={(e) => { handleTitleChange(e); setInput(e.target.value) }}
                    placeholder="Template Title..."
                    maxLength={generalInputCountRestrictions.titles}
                />


                : <h3 className="text-xl">
                    {textTemplate.title.length > 25 ? `${textTemplate.title.substring(0, 25)}...` : `${textTemplate.title}`}
                </h3>
            }
            {isEditActive ?
                <FlexRowCenteredY className="gap-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Editing Mode</span>
                </FlexRowCenteredY>
                :
                <div className="group relative">
                    <IconContainerWarning
                        onClick={() => handleRemoveTemplate(index, template.template_id, true)}
                    >
                        <BsXLg />
                        <HoverLabel className="w-[7rem] bg-red-200 text-red-700">Delete template</HoverLabel>
                    </IconContainerWarning>
                </div>
            }
        </FlexRowCenteredY>
    )
}

export default Topbar

