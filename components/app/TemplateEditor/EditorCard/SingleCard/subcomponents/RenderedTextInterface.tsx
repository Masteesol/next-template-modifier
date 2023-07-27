import React from 'react'

interface ComponentProps {
    textTemplate: any;
    displayText: any;
}

const RenderedTextInterface = (props: ComponentProps) => {
    const {
        textTemplate,
        displayText
    } = props
    return (
        <div className="min-h-[10rem] w-full ps-4 border-l-2 border-green-200">
            <pre className="font-sans"
                style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word"
                }}>
                {textTemplate.text.length > 0 ? displayText : <i className="text-gray-500">Empty Text</i>}
            </pre>
        </div>
    )
}

export default RenderedTextInterface