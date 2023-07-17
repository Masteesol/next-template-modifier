import React, { useState, useEffect, useContext } from "react";
import { BiEraser } from "react-icons/bi";

import {
    FlexColContainer,
    FlexRowCenteredY,
    CardBaseLight,
    DividerHorizontal,
    FlexRowContainer,
} from "@/components/shared/styled-global-components";

import debounce from "lodash.debounce";
import { updateTemplateMetaData } from "@/requests/templates";
import { SaveStatusContext } from "@/context/SavedStatusContext";
import { CardInput, TextArea } from "./styles";

import TemplateSettingsSection from "./subcomponents/TemplateSettingsSection"
import AITextGenerationSection from "./subcomponents/AITextGenerationSection"
import InputGridSection from "./subcomponents/InputGridSection";
import EditModeToolbar from "./subcomponents/EditModeToolbar";
import RenderedTextInterface from "./subcomponents/RenderedTextInterface";
import ProductionModeToolbar from "./subcomponents/ProductionModeToolbar";
import Topbar from "./subcomponents/Topbar";
import { Badge } from "flowbite-react";

const delayedUpdateTemplateMetaData = debounce((template_id, userID, copy_count, word_limit, char_limit, setSaveStatus) => {
    const update = async () => {
        const response = await updateTemplateMetaData(template_id, userID, copy_count, word_limit, char_limit)
        if (response) {
            console.log("updated template")
            setSaveStatus("Updated Click Count")
            setTimeout(() => { setSaveStatus("") }, 2000)
        } else {
            setSaveStatus("Erro saving changes")
            setTimeout(() => { setSaveStatus("") }, 2000)
        }
    }
    update()
}, 2000);


const TemplateCard = (props: any, ref: any) => {
    const {
        categoryIndex,
        template,
        index,
        handleTextTemplateChange,
        handleRemoveTemplate,
        userID,
        subscriptionLimits
    } = props;

    const templateIndex = index
    const [textTemplate, setTextTemplate] = useState(template);
    const [isEditActive, setIsEditActive] = useState<boolean>(false);
    const [inputValues, setInputValues] = useState<Record<string, string | undefined>>({});
    const [hasBeenCopied, setHasBeenCopied] = useState<boolean>(false);
    const [focusedInput, setFocusedInput] = useState<number | null>(null);
    const [stagedTemplate, setStagedTemplate] = useState(template);
    const [copyCount, setCopyCount] = useState(template.copy_count)
    const [expandedAI, setExpandedAI] = useState(false)
    const [expandedTextSettings, setExpandedTextSettings] = useState(false)
    const [charLimitExceeded, setCharLimitExceeded] = useState(false)

    const { setSaveStatus } = useContext(SaveStatusContext)

    useEffect(() => {
        setTextTemplate(template);
        setInputValues({});
        setCharLimitExceeded(false)
    }, [template]);

    //console.log(template)
    const handleEditActive = () => {
        console.log("textTemplate", textTemplate)
        setIsEditActive(prevIsEditActive => !prevIsEditActive);
        setStagedTemplate(textTemplate);
        setCharLimitExceeded(false)
    };

    const handleApprove = () => {
        if (!charLimitExceeded) {
            setIsEditActive(prevIsEditActive => !prevIsEditActive);
            setTextTemplate(stagedTemplate);
            handleTextTemplateChange(categoryIndex, index, stagedTemplate, false);
            //handleUpdateTemplateMetaData()
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const isWithingLimits = subscriptionLimits.char >= e.target.value.length
        if (isWithingLimits) {
            stagedTemplate && setStagedTemplate({ ...stagedTemplate, text: e.target.value, title: stagedTemplate.title })
            setCharLimitExceeded(false)
        } else {
            stagedTemplate && setStagedTemplate({ ...stagedTemplate, text: e.target.value, title: stagedTemplate.title })
            setCharLimitExceeded(true)
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTemplate = { title: e.target.value, text: stagedTemplate.text, template_id: template.template_id };
        setStagedTemplate(newTemplate);
    };

    const handleRemoveTextAreaText = () => {
        const newTemplate = { text: "", title: stagedTemplate.title, template_id: template.template_id };
        console.log("handleRemoveTextAreaText", newTemplate)
        setStagedTemplate(newTemplate);
    }



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
                const newCopyCount = copyCount + 1
                setHasBeenCopied(true);
                setCopyCount(newCopyCount)
                delayedUpdateTemplateMetaData(template.template_id, userID, newCopyCount, textTemplate.word_limit, textTemplate.char_limit, setSaveStatus)
                setTextTemplate({ ...textTemplate, copy_count: newCopyCount })
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

            <FlexColContainer className="min-h-[15rem] w-full p-4 gap-4 md:min-w-[30rem] text-sm">
                <Topbar
                    isEditActive={isEditActive}
                    stagedTemplate={stagedTemplate}
                    handleTitleChange={handleTitleChange}
                    handleRemoveTemplate={handleRemoveTemplate}
                    textTemplate={textTemplate}
                    index={index}
                    template={template}
                />
                <DividerHorizontal />
                {isEditActive &&
                    <FlexRowCenteredY className="justify-between">
                        <h3 className="font-bold text-gray-600 dark:text-gray-400">Created Placeholders</h3>
                        {charLimitExceeded && <Badge color="failure">Character Limit Exceeded</Badge>}
                    </FlexRowCenteredY>

                }
                {/**--INPUT GRID--*/}
                <InputGridSection
                    placeholderCount={placeholderCount}
                    placeholders={placeholders}
                    isEditActive={isEditActive}
                    handleRemoveAllInputText={handleRemoveAllInputText}
                    stagedTemplate={stagedTemplate}
                    textTemplate={textTemplate}
                    subscriptionLimits={subscriptionLimits}

                />
                {/**--END INPUT GRID--*/}
                {placeholderCount > 0 && <DividerHorizontal />}

                {isEditActive
                    ?
                    <FlexColContainer>
                        <FlexColContainer className="gap-4">
                            {/**--TEXT SETTINGS AREA-- */}
                            <TemplateSettingsSection
                                expandedTextSettings={expandedTextSettings}
                                setExpandedTextSettings={setExpandedTextSettings}
                                stagedTemplate={stagedTemplate}
                                setStagedTemplate={setStagedTemplate}
                                textTemplate={textTemplate}
                                subscriptionLimits={subscriptionLimits}
                            />
                            {/**--AI TEXT GENERATION AREA-- */}
                            <AITextGenerationSection
                                expandedAI={expandedAI}
                                setExpandedAI={setExpandedAI}
                            />
                        </FlexColContainer>
                        <FlexRowContainer className="w-full h-full gap-2">
                            <TextArea className="p-4 min-h-[15rem] w-full"
                                value={stagedTemplate.text}
                                onChange={handleTextChange}
                            />
                            <EditModeToolbar
                                expandedAI={expandedAI}
                                setExpandedAI={setExpandedAI}
                                expandedTextSettings={expandedTextSettings}
                                handleRemoveTextAreaText={handleRemoveTextAreaText}
                                handleApprove={handleApprove}
                                handleEditActive={handleEditActive}
                                setExpandedTextSettings={setExpandedTextSettings}
                                charLimitExceeded={charLimitExceeded}
                            />
                        </FlexRowContainer>
                    </FlexColContainer>
                    :
                    <FlexRowContainer className="w-full h-full gap-4">
                        <RenderedTextInterface
                            textTemplate={textTemplate}
                            displayText={displayText}
                        />
                        <ProductionModeToolbar
                            handleEditActive={handleEditActive}
                            placeholderCount={placeholderCount}
                            handleCopy={handleCopy}
                            hasBeenCopied={hasBeenCopied}
                        />
                    </FlexRowContainer>
                }

            </FlexColContainer>
        </CardBaseLight>
    );
};

const ForwardedRefTemplateCard = React.forwardRef(TemplateCard);

export default ForwardedRefTemplateCard;