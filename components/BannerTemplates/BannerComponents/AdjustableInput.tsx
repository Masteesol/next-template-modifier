import { useEffect, useState } from 'react';


const useTextWidth = (text: any, fontSize: any) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const span = document.createElement('span');
        document.body.appendChild(span);

        // Apply the same styles as your textarea
        span.style.font = `${fontSize}px Arial`;
        span.style.padding = '0';
        span.style.visibility = 'hidden';
        span.textContent = text;

        setWidth(span.getBoundingClientRect().width);

        document.body.removeChild(span);
    }, [text, fontSize]);

    return width;
}

export const TextAreaRowItem = ({ textValue, fontSize }: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const textWidth = useTextWidth(textValue, fontSize); // Use the custom hook

    // Increase line height and height slightly
    const lineHeight = fontSize * 1.6;
    const height = fontSize * 1.6;

    return (
        <div
            className="max-h-full max-w-full"
            style={{
                overflow: isFocused ? "auto" : "hidden",
                resize: isFocused ? "horizontal" : "none",
                width: `${textWidth}px` // Set the initial width to the width of the text
            }}
        >
            <textarea
                className={`bg-transparent border-none overflow-hidden text-center`}
                style={{
                    resize: "none",
                    width: "100%",
                    height: `${height}px`,
                    lineHeight: `${lineHeight}px`,
                    fontSize: `${fontSize}px`,
                    padding: 0
                }}
                defaultValue={textValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    )
}


export const TextAreaDescription = ({ textValue, fontSize, className = "" }: any) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div
            className="h-full max-w-full"
            style={{
                overflow: isFocused ? "auto" : "hidden",
                resize: isFocused ? "both" : "none",
                width: `${textValue.length * fontSize}px`
            }}
        >
            <textarea
                className={`bg-transparent border-none overflow-hidden p-0 ${className}`}
                style={{
                    resize: "none",
                    width: "100%",
                    height: "100%",
                    fontSize: `${fontSize}px`,
                    minHeight: `${fontSize * 4}`
                }}
                defaultValue={textValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    )
}


const useOverrideOrDefaultPriceText = (priceText: string, defaultPrice: number) => {
    const formattedDefaultPrice = defaultPrice.toLocaleString('fr-FR'); // change 'en-US' to your preferred locale
    return priceText !== "" ? priceText : `Prisantydning: ${formattedDefaultPrice},-`
}


const useOverrideOrDefaultSizeText = (sizeText: string, defaultSizeText: number) => {
    return sizeText !== "" ? sizeText : `${defaultSizeText} m²`
}

const useOverrideOrDefaultDesciptionText = (descriptionText: string, defaultdescriptionText: string) => {
    return descriptionText !== "" ? descriptionText : `${defaultdescriptionText}`
}

export const useOverrideOrDefault = {
    text: useOverrideOrDefaultPriceText,
    size: useOverrideOrDefaultSizeText,
    description: useOverrideOrDefaultDesciptionText
}
