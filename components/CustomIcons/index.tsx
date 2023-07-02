import React from 'react'
import { FlexRowCentered } from '../styled-global-components'
import { FaCheck } from 'react-icons/fa'

interface CheckIconProps {
    twSize?: string;
    padding?: string;
}

export const CheckIcon: React.FC<CheckIconProps> = ({ twSize = "text-6xl", padding = "p-4" }) => {
    return (
        <FlexRowCentered className={`text-green-900 bg-green-300 rounded-full ${twSize} ${padding}`}>
            <FaCheck />
        </FlexRowCentered>
    )
}
