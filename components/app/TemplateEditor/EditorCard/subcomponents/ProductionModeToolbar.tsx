import React from 'react'
import { HoverLabel, IconContainerNormal } from '../styles'
import { BsCheckLg, BsPencilSquare } from 'react-icons/bs'
import { FlexColContainer, FlexRowCenteredY } from '@/components/shared/styled-global-components'
import { FaArrowRight, FaRegCopy } from 'react-icons/fa'

interface ComponentProps {
    handleEditActive: any;
    placeholderCount: number;
    handleCopy: any;
    hasBeenCopied: boolean;
}

const ProductionModeToolbar = (props: ComponentProps) => {

    const {
        handleEditActive,
        placeholderCount,
        handleCopy,
        hasBeenCopied
    } = props

    return (
        <FlexColContainer className="justify-end">
            <div className="group relative">
                <IconContainerNormal onClick={handleEditActive} disabled={false}>
                    <BsPencilSquare className="text-xl" />
                    <HoverLabel className="w-[4rem]">Edit text</HoverLabel>
                </IconContainerNormal>
                {placeholderCount === 0 &&
                    <FlexRowCenteredY className="absolute right-[3rem] top-2 text-sm group-hover:hidden text-green-600 font-bold animate-slide duration-500 ease-in-out">
                        <span className="w-[5rem] text-center ">Click Edit</span>
                        <FaArrowRight />
                    </FlexRowCenteredY>
                }
            </div>
            <div className="group relative">
                <IconContainerNormal onClick={handleCopy} disabled={false}>
                    {!hasBeenCopied
                        ?
                        <FaRegCopy className="text-xl" />
                        :
                        <BsCheckLg className="text-xl" />
                    }
                    <HoverLabel className="w-[7rem]">{!hasBeenCopied ? "Copy to clipboard" : "Copied to clipboard!"}</HoverLabel>
                </IconContainerNormal>
            </div>
        </FlexColContainer>
    )
}

export default ProductionModeToolbar