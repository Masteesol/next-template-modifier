import { FlexRowCenteredY } from '@/components/shared/styled-global-components'
import React from 'react'
import { HoverLabel, IconContainerWarning, InputBase } from '../styles'
import { BsXLg } from 'react-icons/bs'

interface ComponentProps {
    isEditActive: boolean;
    stagedTemplate: any;
    handleTitleChange: any;
    handleRemoveTemplate: any;
    textTemplate: any
    index: number;
    template: any;
}

const Topbar = (props: ComponentProps) => {

    const {
        isEditActive,
        stagedTemplate,
        handleTitleChange,
        textTemplate,
        handleRemoveTemplate,
        index,
        template
    } = props

    return (
        <FlexRowCenteredY className="justify-between gap-4">
            {isEditActive
                ?
                <InputBase
                    type="text"
                    value={stagedTemplate.title}
                    className="text-2xl"
                    onChange={handleTitleChange}
                    placeholder="Template Title..."
                />


                : <h3 className="text-2xl">
                    {textTemplate.title}
                </h3>
            }
            {isEditActive ?
                <span className="bg-yellow-100 text-yellow-800 p-2 rounded text-xs font-bold">Editing Mode</span>
                :
                <div className="group relative">
                    <IconContainerWarning
                        onClick={() => handleRemoveTemplate(index, template.template_id)}
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