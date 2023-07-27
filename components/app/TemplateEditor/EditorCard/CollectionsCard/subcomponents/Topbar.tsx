import { FlexRowCenteredY } from '@/components/shared/styled-global-components'
import { HoverLabel, IconContainerWarning, InputBase } from '../../styles'
import { BsXLg } from 'react-icons/bs'


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
                    className="text-2xl max-w-[70%]"
                    onChange={handleTitleChange}
                    placeholder="Template Title..."
                />


                : <h3 className="text-2xl">
                    {textTemplate.title}
                </h3>
            }
            {isEditActive ?
                <FlexRowCenteredY className="gap-2">
                    {isUnSaved &&
                        <span className="text-gray-500">Unsaved Changes</span>
                    }

                    <span className="bg-yellow-100 text-yellow-800 p-2 rounded text-xs font-bold">Editing Mode</span>
                </FlexRowCenteredY>
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

