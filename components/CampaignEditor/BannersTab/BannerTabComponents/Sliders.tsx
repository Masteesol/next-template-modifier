import { FlexColContainer, FlexRowContainer } from "@/components/styled-global-components"
import tw from "tailwind-styled-components"

const SliderInput = tw.input`
    bg-transparent
    border-[1px]
    border-slate-200
    rounded
    p-2
`

export const ImageScaleSlider = ({ scale, handleScaleChange, sliderID }: any) => {
    return (
        <FlexColContainer className="gap-2">
            <FlexRowContainer className="justify-between">
                <label>Image:</label>
                <span>{scale.toFixed(1)}</span>
            </FlexRowContainer>
            <SliderInput
                type="range"
                id={sliderID}
                name="img"
                min="0.1"
                max="2"
                step="0.1"
                value={scale}
                onChange={handleScaleChange}
                className="bg-transparent"
            />

        </FlexColContainer>
    )
}

export const TextDescriptionScaleSlider = ({ scale, handleScaleChange, sliderID }: any) => {
    return (
        <FlexColContainer className="gap-2">
            <FlexRowContainer className="justify-between">
                <label>Description:</label>
                <span>{scale.toFixed(1)}</span>
            </FlexRowContainer>
            <SliderInput
                type="range"
                id={sliderID}
                name="description"
                min="0.1"
                max="2"
                step="0.1"
                value={scale}
                onChange={handleScaleChange}
            />
        </FlexColContainer>
    )
}

export const TextItemRowScaleSlider = ({ scale, handleScaleChange, sliderID }: any) => {
    return (
        <FlexColContainer className="gap-2">
            <FlexRowContainer className="justify-between">
                <label>Row Items:</label>
                <span>{scale.toFixed(1)}</span>
            </FlexRowContainer>
            <SliderInput
                type="range"
                id={sliderID}
                name="row-items"
                min="0.1"
                max="2"
                step="0.1"
                value={scale}
                onChange={handleScaleChange}
            />
        </FlexColContainer>
    )
}

export const TextForSaleScaleSlider = ({ scale, handleScaleChange, sliderID }: any) => {
    return (
        <FlexColContainer className="gap-2">
            <FlexRowContainer className="justify-between">
                <label>For Sale:</label>
                <span>{scale.toFixed(1)}</span>
            </FlexRowContainer>
            <SliderInput
                type="range"
                id={sliderID}
                name="for-sale"
                min="0.1"
                max="2"
                step="0.1"
                value={scale}
                onChange={handleScaleChange}
            />
        </FlexColContainer>
    )
}

export const LogoScaleSlider = ({ scale, handleScaleChange, sliderID }: any) => {
    return (
        <FlexColContainer className="gap-2">
            <FlexRowContainer className="justify-between">
                <label>Logo:</label>
                <span>{scale.toFixed(1)}</span>
            </FlexRowContainer>
            <SliderInput
                type="range"
                id={sliderID}
                name="logo"
                min="0.1"
                max="2"
                step="0.1"
                value={scale}
                onChange={handleScaleChange}
            />
        </FlexColContainer>
    )
}
