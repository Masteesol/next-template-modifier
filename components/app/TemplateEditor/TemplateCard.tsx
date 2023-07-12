import React, { useState, useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import { BiEraser } from "react-icons/bi";
import { FaArrowLeft, FaCheck, FaCopy, FaEdit } from "react-icons/fa";
import { FlexColContainer, FlexRowCenteredY, FlexColCentered, CardBaseLight, DividerHorizontal } from "@/components/shared/styled-global-components";
import tw from "tailwind-styled-components";

const InputBase = tw.input`
  border-1 
  border-transparent
  rounded
  bg-transparent 
  focus:border-1 
  focus:border-green-200 
  focus:ring-green-200
`

const CardInput = tw(InputBase)`
  bg-slate-50
  dark:bg-gray-800
  rounded-r-none
  relative
`

const IconContainer = tw(FlexColCentered)`
  p-1 
  rounded 
  text-xl 
  cursor-pointer 
  hover:bg-slate-200
  dark:hover:bg-slate-500
`



const TemplateCard = (props: any, ref: any) => {
    const { categoryIndex, template, index, handleTextTemplateChange, handleRemoveTemplate } = props;
    const templateIndex = index
    const [textTemplate, setTextTemplate] = useState(template);
    const [isEditActive, setIsEditActive] = useState<boolean>(false);
    const [inputValues, setInputValues] = useState<Record<string, string | undefined>>({});
    const [hasBeenCopied, setHasBeenCopied] = useState<boolean>(false);
    const [focusedInput, setFocusedInput] = useState<number | null>(null);
    const [stagedTemplate, setStagedTemplate] = useState(template);

    useEffect(() => {
        setTextTemplate(template);
        setInputValues({});
    }, [template]);

    const handleEditActive = () => {
        setIsEditActive(prevIsEditActive => !prevIsEditActive);
        setStagedTemplate(textTemplate);  // copy current state to staging state
    };

    const handleApprove = () => {
        setIsEditActive(prevIsEditActive => !prevIsEditActive);
        setTextTemplate(stagedTemplate);  // copy staging state to current state
        handleTextTemplateChange(categoryIndex, index, stagedTemplate); // update parent state
    };


    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTemplate = { text: e.target.value, title: stagedTemplate.title, template_id: template.template_id };
        setStagedTemplate(newTemplate);  // update staging state
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTemplate = { title: e.target.value, text: textTemplate.text, template_id: template.template_id };
        setTextTemplate(newTemplate);
        handleTextTemplateChange(categoryIndex, index, newTemplate);
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues(prevInputValues => ({
            ...prevInputValues,
            [index]: event.target.value,
        }));
    };

    const handleRemoveInputText = (count: number, templateIndex: number) => {
        const input = document.getElementById(`input-${count}-${templateIndex}`) as HTMLInputElement
        const inputLabel = document.getElementById(`label-${count}-${templateIndex}`) as HTMLLabelElement
        //console.log(inputLabel)
        if (input && inputLabel) {
            input.value = ""
            inputLabel.innerText = "{  }"
        } else {
            console.log("No input element:", input)
        }
    }
    const handleCopy = () => {
        let finalText = textTemplate.text;
        Object.keys(inputValues).forEach(key => {
            finalText = finalText.replace('#', inputValues[key] || '');
        });

        navigator.clipboard.writeText(finalText)
            .then(() => {
                setHasBeenCopied(true);
                setTimeout(() => setHasBeenCopied(false), 2000);
            })
            .catch(err => console.log('Something went wrong', err));
    };
    let placeholderCount = 0; // this variable will track the number of placeholders encountered
    const regex = /#|\b\w+\b/g;
    const placeholders = (isEditActive ? stagedTemplate.text : textTemplate.text).match(regex)?.map((word: any, index: any) => {
        if (word === '#') {
            const count = placeholderCount; // save the current placeholder count to use in the handler function
            placeholderCount += 1;
            return (
                <FlexRowCenteredY
                    key={`input-${count}-${templateIndex}-${template.template_id}`}
                    className={`${isEditActive ? "bg-gray-300 cursor-not-allowed dark:bg-gray-700" : "bg-slate-50 dark:bg-gray-800"} rounded `}
                >
                    <CardInput

                        type="text"
                        placeholder={"Word " + (index + 1)}
                        value={!isEditActive && inputValues[count] || ''}
                        id={`input-${count}-${templateIndex}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(count, event)}
                        onFocus={() => setFocusedInput(count)}
                        onBlur={() => setFocusedInput(null)}
                        disabled={isEditActive}
                        className={`${isEditActive && "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"} w-full`}
                    />
                    <button
                        disabled={isEditActive}
                        className={`${isEditActive && "cursor-not-allowed"} p-2 border-1 text-lg text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-900`}
                        onClick={() => { handleRemoveInputText(count, templateIndex) }}
                    >
                        <BiEraser />
                    </button>
                </FlexRowCenteredY>

            );
        }
    });


    const displayText = textTemplate.text.split("#").map((segment: any, index: number) => {
        if (index < textTemplate.text.split("#").length - 1) {
            return (
                <span key={`inline-${template.template_id}-${index}`}>
                    {segment}
                    <label
                        id={`label-${index}-${templateIndex}`}
                        htmlFor={`input-${index}-${templateIndex}`}
                        className={`bg-green-100 cursor-pointer rounded px-1 pb-1 leading-8 ${index === focusedInput && 'bg-green-300 text-green-900 dark:text-white'} dark:bg-green-600 dark:hover:bg-green-900 text-green-800 dark:text-white`}
                    >
                        {inputValues[index] || "{  }"}
                    </label>
                </span>
            );
        } else {
            return <span key={index}>{segment}</span>;
        }
    });
    return (
        <CardBaseLight className="w-full" ref={ref} key={template.template_id}>
            <FlexColContainer className="min-h-[15rem] w-full p-4 gap-4 md:min-w-[30rem]">
                <FlexRowCenteredY className="justify-between gap-4">
                    <InputBase
                        type="text"
                        value={textTemplate.title}
                        className="text-2xl"
                        onChange={handleTitleChange}
                        placeholder="Template Title..."
                    />
                    <IconContainer>
                        <BsXLg onClick={() => handleRemoveTemplate(index, template.template_id)} />
                    </IconContainer>
                </FlexRowCenteredY>
                <DividerHorizontal />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {placeholders}
                </div>
                {placeholderCount > 0 && <DividerHorizontal />}
                {isEditActive
                    ?
                    <textarea className="border-0 rounded bg-slate-50 dark:bg-gray-800 min-h-[15rem]"
                        value={stagedTemplate.text}
                        onChange={handleTextChange}
                    />
                    : <div className="min-h-[10rem]">
                        <pre className="font-sans"
                            style={{
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word"
                            }}>{displayText}
                        </pre>
                    </div>
                }
                <FlexRowCenteredY className="justify-end gap-4">

                    <IconContainer onClick={handleEditActive}>
                        {!isEditActive ? <FaEdit /> : <FaArrowLeft />}
                    </IconContainer>
                    {isEditActive &&
                        <IconContainer onClick={handleApprove}>
                            <FaCheck />
                        </IconContainer>}
                    {!isEditActive &&
                        <IconContainer onClick={handleCopy}>
                            {!hasBeenCopied ? <FaCopy /> : <FaCheck />}
                        </IconContainer>}
                </FlexRowCenteredY>
            </FlexColContainer>
        </CardBaseLight>
    );
};

const ForwardedRefTemplateCard = React.forwardRef(TemplateCard);

export default ForwardedRefTemplateCard;