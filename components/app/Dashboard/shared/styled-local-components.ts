import tw from "tailwind-styled-components";
import { CardBaseLightHover, FlexColCentered } from "@/components/shared/styled-global-components";

const BaseCardStyle = tw(FlexColCentered)`
    p-2 
    rounded
    border-l-4
    shadow
    bg-gradient-to-tr 
`

export const GradientCardGreen = tw(BaseCardStyle)`
    from-green-100
    to-green-300
    text-green-900
    border-green-800
`

export const GradientCardBlue = tw(BaseCardStyle)`
    from-blue-100 
    to-blue-300 
    border-blue-900
    text-blue-800
`

export const GradientCardIndigo = tw(BaseCardStyle)`
    from-indigo-100
    to-indigo-300
    text-indigo-900
    border-indigo-800
`

export const GradientCardPurple = tw(BaseCardStyle)`
    from-purple-100
    to-purple-300
    text-purple-900
    border-purple-800
`


export const LargeCardText = tw.span`
    text-6xl 
    font-bold
`

export const LinkCard = tw(CardBaseLightHover)`
    transition
    duration-150 
    ease-in-out 
    p-4 
    border-b-4
    border-transparent
`