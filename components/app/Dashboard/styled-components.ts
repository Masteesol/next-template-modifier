import tw from "tailwind-styled-components";
import { FlexColCentered } from "@/components/shared/styled-global-components";

export const GradientCard = tw(FlexColCentered)`
    bg-gradient-to-tr 
    from-green-100
    to-green-300
    p-2 
    rounded
    text-green-900
    border-l-4
    border-green-800
    shadow
`

export const GradientCardTwo = tw(FlexColCentered)`
    bg-gradient-to-tr 
    from-blue-100 
    to-blue-300 
    p-2
    border-l-4
    border-blue-900
    rounded
    text-blue-800
    shadow
`

export const GradientCardThree = tw(FlexColCentered)`
    bg-gradient-to-tr 
    from-indigo-100
    to-indigo-300
    p-2 
    rounded
    text-indigo-900
    border-l-4
    border-indigo-800
    shadow
`

export const LargeCardText = tw.span`
    text-6xl 
    font-bold
`
