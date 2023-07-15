import React, { useState, useEffect } from "react";
import { BsArrowLeft, BsCheckLg, BsPencilSquare, BsXLg } from "react-icons/bs";
import { BiEraser } from "react-icons/bi";
import { FaArrowRight, FaRegCopy } from "react-icons/fa";
import { FlexColContainer, FlexRowCenteredY, FlexColCentered, CardBaseLight, DividerHorizontal, FlexRowContainer, FlexColCenteredX } from "@/components/shared/styled-global-components";
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
  rounded 
  p-2 
  cursor-pointer
`

const IconContainerNormal = tw(IconContainer)`
  hover:bg-green-200
  dark:hover:bg-green-400
  hover:text-green-900
  dark:hover:text-green-900
`

const IconContainerWarning = tw(IconContainer)`
  hover:bg-red-300 
  dark:hover:bg-red-500
  hover:text-red-800
  dark:hover:text-red-950
`

const HoverLabel = tw.label`
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

    const handleRemoveTextAreaText = () => {
        const newTemplate = { text: "", title: stagedTemplate.title, template_id: template.template_id };
        console.log("handleRemoveTextAreaText", newTemplate)
        setStagedTemplate(newTemplate);
    }

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

    const handleRemoveInputText = (index: number) => {
        setInputValues(prevInputValues => ({
            ...prevInputValues,
            [index]: "",
        }));
    }

    const handleRemoveAllInputText = () => {
        setInputValues(prevInputValues => (
            Object.keys(prevInputValues).reduce((acc: Record<string, string>, key) => {
                acc[key] = "";
                return acc;
            }, {})
        ));
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
                        className={`${isEditActive ? "cursor-not-allowed" : "hover:bg-slate-100 dark:hover:bg-gray-900"} p-2 border-1 text-lg text-gray-500  `}
                        onClick={() => { handleRemoveInputText(count) }}
                    >
                        <BiEraser />
                    </button>
                </FlexRowCenteredY>

            );
        }
    });
    //console.log(placeholders)

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
                    <div className="group relative">
                        <IconContainerWarning
                            onClick={() => handleRemoveTemplate(index, template.template_id)}
                        >
                            <BsXLg />
                            <HoverLabel className="w-[7rem] bg-red-200 text-red-700">Delete template</HoverLabel>
                        </IconContainerWarning>
                    </div>
                </FlexRowCenteredY>
                <DividerHorizontal />
                {isEditActive &&
                    <FlexRowCenteredY className="justify-between">
                        <h3 className="font-bold text-gray-600 dark:text-gray-400">Created Placeholders</h3>
                        <span className="bg-yellow-200 text-yellow-800 p-2 rounded text-xs">Editing Mode</span>
                    </FlexRowCenteredY>
                }
                {/**--INPUT GRID--*/}
                <FlexRowContainer id="input-grid-component" className="w-full h-full gap-2">
                    {placeholderCount === 0
                        ?
                        <p className="text-gray-500">Add your template text and use the <span className="font-bold text-green-600">#</span> symbol to create placeholders.
                            Your placeholders will show up here and will be active once you apply the changes.</p>
                        :
                        <div className="w-full">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                {placeholders}
                            </div>
                        </div>
                    }
                    {!isEditActive ?
                        <div>
                            {placeholderCount > 0 &&
                                <FlexColContainer className="border-l-2 border-gray-100 ps-2 ms-2">
                                    <div className="group relative">
                                        <IconContainerWarning
                                            onClick={handleRemoveAllInputText}
                                        >
                                            <BiEraser className="text-2xl" />
                                            <HoverLabel className="w-[4rem] bg-red-200 text-red-700">Empty all</HoverLabel>
                                        </IconContainerWarning>
                                    </div>
                                </FlexColContainer>
                            }
                        </div>

                        :
                        <FlexColContainer className="gap-2 text-xs">
                            <FlexColContainer className="border-l-2 border-gray-100 ps-2 ms-2 min-w-[8rem]">
                                <FlexRowContainer className="justify-between">
                                    <span>Characters:</span>
                                    <span>{stagedTemplate.text.trim().length}</span>
                                </FlexRowContainer>
                                <FlexRowContainer className="justify-between">
                                    <span>Words:</span>
                                    <span>{stagedTemplate.text.trim().length > 0 ? stagedTemplate.text.trim().split(" ").length : 0}</span>
                                </FlexRowContainer>
                            </FlexColContainer>
                        </FlexColContainer>
                    }
                </FlexRowContainer>
                {/**--END INPUT GRID--*/}
                {placeholderCount > 0 && <DividerHorizontal />}
                {isEditActive
                    ?
                    <FlexRowContainer className="w-full h-full gap-2">
                        <textarea className="border-0 rounded bg-slate-50 dark:bg-gray-800 min-h-[15rem] w-full"
                            value={stagedTemplate.text}
                            onChange={handleTextChange}
                        />
                        <FlexColCenteredX>
                            <div className="group relative">
                                <IconContainerWarning
                                    onClick={handleRemoveTextAreaText}
                                >
                                    <BiEraser className="text-2xl" />
                                    <HoverLabel className="w-[5rem] bg-red-200 text-red-700">Remove text</HoverLabel>
                                </IconContainerWarning>
                            </div>
                            <FlexColContainer className="mt-auto">
                                <DividerHorizontal className="border-gray-100" />
                                <div className="group relative">
                                    <IconContainerNormal onClick={handleApprove}>
                                        <BsCheckLg className="text-2xl" />
                                        <HoverLabel className="w-[6rem]">Apply changes</HoverLabel>
                                    </IconContainerNormal>
                                </div>
                                <div className="group relative">
                                    <IconContainerNormal onClick={handleEditActive}>
                                        <BsArrowLeft className="text-2xl " />
                                        <HoverLabel className="w-[7rem]">Go back without saving</HoverLabel>
                                    </IconContainerNormal>
                                </div>
                            </FlexColContainer>
                        </FlexColCenteredX>
                    </FlexRowContainer>
                    :
                    <FlexRowContainer className="w-full h-full gap-4">
                        <div className="min-h-[10rem] w-full ps-4 border-l-4 border-green-500">
                            <pre className="font-sans"
                                style={{
                                    whiteSpace: "pre-wrap",
                                    wordWrap: "break-word"
                                }}>
                                {textTemplate.text.length > 0 ? displayText : <i className="text-gray-500">Empty Text</i>}
                            </pre>
                        </div>
                        <FlexColContainer className="justify-end">
                            <div className="group relative">
                                <IconContainerNormal onClick={handleEditActive}>
                                    <BsPencilSquare className="text-xl" />
                                    <HoverLabel className="w-[4rem]">Edit text</HoverLabel>
                                </IconContainerNormal>
                                {placeholderCount === 0 &&
                                    <FlexRowCenteredY className="absolute right-[3rem] top-2 text-sm group-hover:hidden text-green-500 font-bold animate-slide duration-500 ease-in-out">
                                        <span className="w-[5rem] text-center ">Click Edit</span>
                                        <FaArrowRight />
                                    </FlexRowCenteredY>
                                }
                            </div>
                            <div className="group relative">
                                <IconContainerNormal onClick={handleCopy}>
                                    {!hasBeenCopied
                                        ?
                                        <FaRegCopy className="text-xl" />
                                        :
                                        <BsCheckLg className="text-xl" />
                                    }
                                    <HoverLabel className="w-[7rem]">{!hasBeenCopied ? "Copy to clipboard" : "Copied to clipboard!"}</HoverLabel>
                                </IconContainerNormal>
                            </div>
                        </FlexColContainer>
                    </FlexRowContainer>
                }

            </FlexColContainer>
        </CardBaseLight>
    );
};

const ForwardedRefTemplateCard = React.forwardRef(TemplateCard);

export default ForwardedRefTemplateCard;