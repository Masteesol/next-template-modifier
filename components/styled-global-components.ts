import tw from "tailwind-styled-components";

//Typography-----------------------------------------------------------------

export const H1 = tw.h1`
    text-2xl
    md:text-3xl
    xl:text-5xl
    text-slate-900
    dark:text-slate-200
`;

export const H2 = tw.h2`
    text-2xl
    lg:text-4xl
    text-slate-900
    dark:text-slate-200
`;

export const H3 = tw.h3`
    text-2xl
    lg:3xl
    xl:4xl
    font-bold
`;

//Buttons

export const GenericButton = tw.button`
    rounded
    px-4
    py-2
    text-base
    hover:opacity-50
    transition
    duration-150
    ease-in-out
`

export const SubmitButton = tw(GenericButton)`
    bg-slate-700
    dark:bg-slate-400
    text-white
    dark:text-slate-900
`

export const LinkButton = tw(GenericButton)`
    bg-slate-700
    dark:bg-slate-400
    text-white
    dark:text-slate-900
`

export const CTAButton = tw(GenericButton)`
    bg-slate-700
    dark:bg-slate-400
    text-white
    dark:text-slate-900
`

export const HollowButton = tw(GenericButton)`
    bg-transparent
    border-[1px]
    border-slate-700
    dark:border-white
    rounded
`

//Card styles-----------------------------------------------------------------
//_Color base
export const CardBaseLight = tw.div`
    shadow
    rounded
    bg-white
    dark:bg-slate-700
`;

export const CardBaseDark = tw.div`
    shadow
    rounded
    bg-slate-800 
    dark:bg-slate-900 
    text-white 
    dark:text-white
    hover:bg-slate-800
    dark:hover:bg-slate-800
`;

//_sizing
export const CardGrid = tw(CardBaseLight)`
  w-full
  p-7
  items-center
  gap-2
  lg:gap-5
  max-w-[20rem]
  min-w-[7rem]
  lg:min-w-[12rem]
  max-h-[15rem]
  flex-1
  flex
  flex-col
  h-full
`;

export const CardList = tw(CardBaseLight)`
  w-full
  p-7
  items-center
  gap-2
  lg:gap-5
  flex-1
  h-full
  flex
  flex-row
`;

export const CardLarge = tw(CardBaseLight)`
  w-full
  p-7
  items-center
  gap-2
  lg:gap-5
  max-w-[30rem]
  min-w-[20rem]
  max-h-[25rem]
  h-full
  flex
  flex-col
  flex-1
`;

//on hover labels. Add positioning locally


const onHoverInfoContainerElement = tw.div`
  relative 
  group 
  hover:opacity-100
`

const onHoverInfoLabelElement = tw.span`
  group-hover:block
  hidden 
  absolute 
  bg-slate-300
  dark:bg-slate-800
  rounded
  p-2
`

export const onHoverInfoLabel = {
    container: onHoverInfoContainerElement,
    label: onHoverInfoLabelElement
}

export const IconBackground = tw.label`
  bg-slate-200 
  text-xl
  p-2
  rounded-[20%]
  cursor-pointer
  hover:bg-slate-300 
  dark:bg-slate-700
  dark:hover:bg-slate-600
`

export const DividerPipe = tw.div`
    border-[1.4px]
    border-gray-200
    h-full 
`

export const DividerHorizontal = tw.hr`
    border-b
    border-[1px]
    border-gray-200
    dark:text-gray-400 
    dark:border-gray-700
`

const StyledSelect = tw.select`
  border-none
  cursor-pointer
  rounded 
  bg-transparent
  focus:ring-transparent
  focus:border-transparent
  block 
  w-full 
  p-2.5
  dark:bg-transparent
  dark:bg-gray-800
  dark:border-gray-600 
  dark:placeholder-gray-400 
  dark:focus:ring-transparent
  dark:focus:border-slate-300 
`

const StyledSelectOptions = tw.option`
  bg-transparent
  hover:bg-slate-200
`

export const Select = {
    select: StyledSelect,
    option: StyledSelectOptions
}

//Flex Containers-----------------------------------------------------------------

export const FlexColContainer = tw.div`
    flex
    flex-col
`;

export const FlexColRowContainer = tw(FlexColContainer)`
    md:flex-row
`;

export const FlexColRowContainerLg = tw(FlexColContainer)`
    lg:flex-row
`;

export const FlexColRowContainerXl = tw(FlexColContainer)`
    xl:flex-row
`;

export const FlexRowContainer = tw.div`
    flex
    flex-row
`;

export const FlexRowCentered = tw.div`
    flex
    items-center
    justify-center
`;

export const FlexRowColContainer = tw(FlexRowContainer)`
    md:flex-col
`;

export const FlexColCentered = tw.div`
    flex
    flex-col
    items-center
    justify-center
`;

export const FlexColCenteredX = tw.div`
    flex
    flex-col
    items-center
`;

export const FlexColCenteredY = tw.div`
    flex
    flex-col
    justify-center
`;

export const FlexRowCenteredX = tw.div`
    flex
    flex-row
    justify-center
`;

export const FlexRowCenteredY = tw.div`
    flex
    flex-row
    items-center
`;

//Form styling

export const FormWrapper = tw(FlexColContainer)`
    w-full 
    max-w-[700px] 
    border-[1px] 
    border-slate-200
    dark:border-slate-500
    rounded 
    p-8
`

export const Form = tw.form`
    flex
    flex-col
    gap-4
`