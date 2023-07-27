import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaCheck, FaCopy, FaEdit } from "react-icons/fa";
import {
    FlexColContainer,
    FlexRowCenteredY,
    FlexColCentered,
    CardBaseLight,
    DividerHorizontal
} from "@/components/shared/styled-global-components";
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
  col-span-full 
  sm:col-span-1
  dark:bg-gray-800
`

const IconContainer = tw(FlexColCentered)`
  p-1 
  rounded 
  text-xl 
  cursor-pointer 
  hover:bg-slate-200
  dark:hover:bg-slate-500
`

const textDefault = "Hi #!\n\n This is a testing text.\n\nFollow along with the steps above to see how to use this template modifying tool."


const TemplateCardStandAlone = ({ steps, activeStep }: any) => {
    const titleInputRef = useRef<HTMLInputElement | null>(null);
    const template = { text: "", title: "" }; // hardcoded template
    const [textTemplate, setTextTemplate] = useState(template);
    const [isEditActive, setIsEditActive] = useState(false);
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
    const [hasBeenCopied, setHasBeenCopied] = useState(false);
    const [focusedInput, setFocusedInput] = useState<number | null>(null);
    const [stagedTemplate, setStagedTemplate] = useState(template);


    useEffect(() => {
        const template = {
            text: activeStep > 1 ? steps[2].editorContent : textDefault,
            title: activeStep > 0 ? steps[1].editorContent : "Your Template Title..."
        }; // hardcoded template
        if (activeStep === 1 && titleInputRef.current) {  // add a null check here
            titleInputRef.current.focus();
        }
        setTextTemplate(template);
        setStagedTemplate(template);
    }, [activeStep, steps]);


    const handleEditActive = () => {
        setIsEditActive(prevIsEditActive => !prevIsEditActive);
        setStagedTemplate(textTemplate);
    };

    useEffect(() => {
        if (activeStep === 0 || activeStep >= 3) { // if we're at step 0 or step 3 and beyond
            const editorContentArray: string[] = steps[activeStep].editorContentArray;
            const preFilledInputValues: { [key: number]: string } = {}; // object with keys as numbers and values as strings
            editorContentArray.forEach((value: string, index: number) => {
                preFilledInputValues[index] = value;
            });
            setInputValues(preFilledInputValues);
        } else {
            setInputValues({});
        }
    }, [activeStep, steps]);

    const handleApprove = () => {
        setIsEditActive(prevIsEditActive => !prevIsEditActive);
        setTextTemplate(stagedTemplate);
        // Removed call to handleTextTemplateChange
    };


    const handleTextChange = (e: any) => {
        const newTemplate = { text: e.target.value, title: stagedTemplate.title };
        setStagedTemplate(newTemplate);
    };

    const handleTitleChange = (e: any) => {
        const newTemplate = { title: e.target.value, text: textTemplate.text };
        setTextTemplate(newTemplate);
        // Removed call to handleTextTemplateChange
    };

    const handleInputChange = (index: number, event: any) => {
        setInputValues(prevInputValues => ({
            ...prevInputValues,
            [index]: event.target.value,
        }));
    };


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
                <CardInput
                    key={index}
                    type="text"
                    placeholder={"Word " + (index + 1)}
                    value={!isEditActive && inputValues[count] || ''}
                    id={`input-${count}`}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(count, event)}
                    onFocus={() => setFocusedInput(count)}
                    onBlur={() => setFocusedInput(null)}
                    disabled={isEditActive}
                    className={`${isEditActive && "bg-gray-300 cursor-not-allowed"}`}
                />
            );
        }
    });

    let placeholderCountTwo = 0
    const displayText = textTemplate.text.split("#").map((segment: any, index: number) => {
        const count = placeholderCountTwo
        placeholderCountTwo += 1;
        if (index < textTemplate.text.split("#").length - 1) {
            return (
                <span key={index}>
                    {segment}
                    <label
                        htmlFor={`input-${count}`}
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
        <>
            <CardBaseLight className="w-full max-w-[800px]">
                <FlexColContainer className="min-h-[15rem] w-full p-4 gap-4">
                    <FlexRowCenteredY className="justify-between gap-4">
                        <InputBase
                            ref={titleInputRef}
                            type="text"
                            value={textTemplate.title}
                            className="text-2xl"
                            onChange={handleTitleChange}
                            placeholder="Template Title..."
                        />
                    </FlexRowCenteredY>
                    <DividerHorizontal />
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
                        {placeholders}
                    </div>
                    <DividerHorizontal />
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
        </>
    );
};

export default TemplateCardStandAlone;