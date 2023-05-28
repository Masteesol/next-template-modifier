import React, { useState } from "react";
import { FlexColContainer } from "@/components/styled-global-components";
import PreviewCarousel from "@/components/Dashboard/Components/PreviewCarousel";

interface ViewJPGsProps {
    generatedJPGs: { [key: string]: string };
}

const ViewJPGs: React.FC<ViewJPGsProps> = ({ generatedJPGs }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    if (Object.keys(generatedJPGs).length > 0) {
        const correctlyOrderedArrayLG = [
            { name: "img-980x600", url: generatedJPGs["img-980x600"] },
            { name: "img-300x600", url: generatedJPGs["img-300x600"] },
            { name: "img-980x300", url: generatedJPGs["img-980x300"] },
            { name: "img-300x250", url: generatedJPGs["img-300x250"] },
            { name: "img-580x400", url: generatedJPGs["img-580x400"] }
        ]
        return (
            <PreviewCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                {correctlyOrderedArrayLG.map((item, index) => {
                    return <FlexColContainer className="flex-wrap gap-4 min-w-[20rem] border-[1px] rounded p-4" key={index}>
                        <h4 className="font-bold">{item.name}</h4>
                        <div>
                            <img src={item.url} alt={`Generated JPG`} />
                        </div>
                    </FlexColContainer>
                })}
            </PreviewCarousel>
        );
    }
    return <h3>No Banners Generated</h3>

};

export default ViewJPGs;

/** 

Object.keys(generatedJPGs).length > 0 ?
                    Object.entries(generatedJPGs).map(([size, url]) => (
                        <FlexColContainer className="flex-wrap gap-4 min-w-[20rem] border-[1px] rounded p-4">
                            <h4 className="font-bold">{size}</h4>
                            <div>
                                <img src={url} alt={`Generated JPG`} />
                            </div>
                        </FlexColContainer>
                    ))
                    : <h3>No Images generated yet...</h3>}

*/