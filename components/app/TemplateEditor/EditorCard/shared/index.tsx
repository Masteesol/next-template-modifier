import React from 'react'
import { HoverLabel, IconContainerWarning } from '../styles'
import { BsXLg } from 'react-icons/bs'
import { FlexRowCenteredY, HollowButton } from '@/components/shared/styled-global-components'
import { Templates } from '@/types/global';

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
