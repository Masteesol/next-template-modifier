import React from 'react'
import DraggableCard from './DraggableSliderContainer';
import { TextDescriptionScaleSlider, TextItemRowScaleSlider, TextForSaleScaleSlider, LogoScaleSlider } from './Sliders';

const SlidersToolBar = ({ slidersPosition, setSlidersPosition, handleScaleChange, scale, sliderID }: any) => {
    return (
        <DraggableCard position={slidersPosition} onDrag={(newPosition: any) => setSlidersPosition(newPosition)}>
            <TextDescriptionScaleSlider sliderID={`${sliderID}-text-description`} handleScaleChange={handleScaleChange} scale={scale.description} />
            <TextItemRowScaleSlider sliderID={`${sliderID}-text-item-row`} handleScaleChange={handleScaleChange} scale={scale.rowItems} />
            <TextForSaleScaleSlider sliderID={`${sliderID}-text-for-sale`} handleScaleChange={handleScaleChange} scale={scale.forSale} />
            <LogoScaleSlider sliderID={`${sliderID}-logo`} handleScaleChange={handleScaleChange} scale={scale.logo} />
        </DraggableCard>
    )
}

export default SlidersToolBar