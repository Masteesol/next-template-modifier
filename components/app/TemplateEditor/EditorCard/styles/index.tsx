import tw from "tailwind-styled-components";

export const InputBase = tw.input`
  border-1 
  border-transparent
  rounded
  bg-transparent 
  focus:border-1 
  focus:border-green-200 
  focus:ring-green-200
`

export const CardInput = tw(InputBase)`
  bg-slate-50
  dark:bg-gray-800
  rounded-r-none
  relative
  text-sm
`

export const TextArea = tw.textarea`
    p-2 
   text-sm 
   border-0 
   focus:ring-green-300 
   rounded 
   bg-slate-50 
   dark:bg-gray-800
`

export const IconContainer = tw.button`
  flex
  items-center
  justify-center
  rounded 
  p-2 
  cursor-pointer
`

interface IconContainerProps {
  disabled: boolean;
}


export const IconContainerStyles = `
    dark:text-white
    text-slate-800
    hover:bg-green-200
    dark:hover:bg-green-400
    hover:text-green-900
    dark:hover:text-green-900
`
export const IconContainerNormal = tw(IconContainer) <IconContainerProps>`
  ${({ disabled }) => (!disabled ? IconContainerStyles : "text-gray-300 cursor-not-allowed")}
`

export const IconContainerWarning = tw(IconContainer)`
  hover:bg-red-300 
  dark:hover:bg-red-500
  hover:text-red-800
  dark:hover:text-red-950
`

const IconContainerStylesYellow = `
    hover:bg-yellow-200 
    dark:hover:bg-yellow-500
    hover:text-yellow-800
    dark:hover:text-yellow-950
  `

export const IconContainerYellow = tw(IconContainer) <IconContainerProps>`
  ${({ disabled }) => (!disabled ? IconContainerStylesYellow : "text-gray-300 cursor-not-allowed")}
`

export const HoverLabel = tw.label`
    text-xs
    text-gray-600 
    text-center 
    bg-gray-100 
    rounded
    group-hover:block
    hidden 
    p-1 
    absolute 
    top-1
    right-[3rem]
`