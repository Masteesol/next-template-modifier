import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
    FlexColContainer,
    FlexRowCenteredY,
    CardBaseLight,
    DividerHorizontal,
    FlexRowContainer,
    FlexColCentered,
    PlusButton,
    IconContainerSecondary,
} from "@/components/shared/styled-global-components";

import debounce from "lodash.debounce";
import {
    createTemplateCollectionItem,
    removeTemplateCollectionItem,
    updateTemplateCollectionItem,
    updateTemplateMetaData,
    updateTemplateTitle,
    updateTemplatesCollectionOrder
} from "@/requests/templates";
import { SaveStatusContext } from "@/context/SavedStatusContext";
import { HoverLabel } from "../styles";

import Topbar from "./subcomponents/Topbar";
import { getColorForCount, saveMessage, updateTemplatesState } from "@/utils/helpers";
import { BsArrowLeft, BsPlus } from "react-icons/bs";
import { CollectionItem } from "@/types/global";
import { List, arrayMove } from 'react-movable';
import CollectionsTemplateTextProductionToolbar from "./subcomponents/ProductionToolbar";
import TemplatateEditTextSection from "./subcomponents/TemplateEditTextSection"
import TemplatateEditOrderSection from "./subcomponents/TemplateEditOrderSection"
import { FaArrowRight } from "react-icons/fa";
import { templateCollectionItemCountLimit } from "@/utils/generalCountRestrictions";
import { TemplatesContext } from "@/context/TemplatesContext";

interface TemplateCardProps {
    categoryIndex: number;
    template: any;
    index: number;
    handleRemoveTemplate: any;
    userID: string | undefined;
    subscriptionLimits: any;
}

interface StagedCollectionsType {
    template_id: string,
    collectionItemID: string,
    text: string,
    order: number
}

const delayedUpdateTemplateCollectionItem = debounce((stagedCollections: StagedCollectionsType[], setSaveStatus: any, setStagedCollections: any) => {
    //console.log("stagedCollections", stagedCollections)
    const update = async () => {
        try {
            const updatePromises = stagedCollections.map((item: any) => {
                const { template_id, collectionItemID, text, order } = item
                return updateTemplateCollectionItem(template_id, collectionItemID, text, order)
            }
            );
            await Promise.all(updatePromises);
            setSaveStatus("Auto-saved Changes")
            setStagedCollections([])
            setTimeout(() => { setSaveStatus(""); }, 2000)
        } catch (error) {
            setSaveStatus("Erro saving changes")
            setTimeout(() => { setSaveStatus("") }, 2000)
            console.log(error);
        }
    }
    update()
}, 2000);


const delayedUpdateCollectionOrder = debounce((collectionArray, template_id, setSaveStatus) => {
    const update = async () => {
        try {
            const updatePromises = collectionArray.map((item: any) => {
                const { order, id } = item
                updateTemplatesCollectionOrder(id, template_id, order)
            }

            );
            await Promise.all(updatePromises);
            setSaveStatus("Auto-saved Changes")
            setTimeout(() => { setSaveStatus("") }, 2000)
        } catch (error) {
            setSaveStatus("Erro saving changes")
            setTimeout(() => { setSaveStatus("") }, 2000)
            console.log(error);
        }
    }
    update()
}, 1000);

const delayedUpdateTemplateMetaData = debounce((template_id, userID, copy_count, setSaveStatus) => {
    const update = async () => {
        const response = await updateTemplateMetaData(template_id, userID, copy_count)
        if (response) {
            console.log("updated template")
            saveMessage(setSaveStatus, "Updated Click Count")
        } else {
            saveMessage(setSaveStatus, "Error")
        }
    }
    update()
}, 1000);

const delayedUpdateTemplateTitle = debounce((newTitle, template_id, userID, setSaveStatus) => {
    const update = async () => {
        try {
            updateTemplateTitle(newTitle, userID, template_id)
            setSaveStatus("Auto-saved Changes")
            setTimeout(() => { setSaveStatus("") }, 2000)
        } catch (error) {
            setSaveStatus("Erro saving changes")
            setTimeout(() => { setSaveStatus("") }, 2000)
            console.log(error);
        }
    }
    update()
}, 1000);




const TemplateCard = (props: TemplateCardProps, ref: any) => {
    const {
        categoryIndex,
        template,
        index,
        handleRemoveTemplate,
        userID,
        subscriptionLimits,
    } = props;

    const { setTextTemplates } = useContext(TemplatesContext);
    const [textTemplate, setTextTemplate] = useState(template);
    const [isEditActive, setIsEditActive] = useState<boolean>(false);
    const [isEditTextActive, setIsEditTextActive] = useState<boolean>(false);
    const [isEditListActive, setIsEditListActive] = useState<boolean>(false);
    //const [isEditListActive, setIsEditListActive] = useState<boolean>(false)
    const [stagedCollections, setStagedCollections] = useState<StagedCollectionsType[] | []>([])
    const [copyCount, setCopyCount] = useState(template.copy_count)
    //const [charLimitExceeded, setCharLimitExceeded] = useState(false)

    const { setSaveStatus } = useContext(SaveStatusContext)

    useEffect(() => {
        setTextTemplate(template);
        //setCharLimitExceeded(false)
    }, [template]);

    const handleEditInactive = () => {
        setIsEditActive(false);
        setIsEditListActive(false)
        setIsEditTextActive(false)
    };

    const saveChangesAndSetState = (collectionItem: CollectionItem, isWithinLimits: boolean, value: string) => {
        const updatedTemplateCollections = textTemplate.template_collections.map((item: CollectionItem) => {
            if (item.id === collectionItem.id) {
                return {
                    ...item,
                    text: value
                };
            } else {
                return item;
            }
        });

        const updatedTemplate = {
            ...textTemplate,
            template_collections: updatedTemplateCollections,
            text: value
        };
        if (isWithinLimits) {
            setTextTemplate(updatedTemplate);
            const stageChanges: StagedCollectionsType = {
                template_id: textTemplate.template_id,
                collectionItemID: collectionItem.id,
                text: value,
                order: collectionItem.order
            };

            // check if the item already exists in the stagedCollections
            const existingIndex = stagedCollections.findIndex(item => item.collectionItemID === collectionItem.id);
            if (existingIndex >= 0) {
                // update the existing item
                stagedCollections[existingIndex] = stageChanges;
                setStagedCollections([...stagedCollections]);
            } else {
                // add a new item
                setStagedCollections([...stagedCollections, stageChanges]);
            }
            delayedUpdateTemplateCollectionItem(stagedCollections, setSaveStatus, setStagedCollections);
            //setCharLimitExceeded(false);
        } else {
            setTextTemplate(updatedTemplate);
            //setCharLimitExceeded(true);
        }
        updateTemplatesState(categoryIndex, index, updatedTemplate, setTextTemplates);
    }

    const handleTextChange = (value: string, collectionItem: CollectionItem) => {
        const isWithinLimits = subscriptionLimits.char >= value.length;
        saveChangesAndSetState(collectionItem, isWithinLimits, value)
    };

    const handleRemoveCollectionItem = async (itemId: string) => {
        const updatedTemplateCollections = textTemplate.template_collections.filter((item: CollectionItem) => item.id !== itemId);

        const updatedTemplate = {
            ...textTemplate,
            template_collections: updatedTemplateCollections
        };
        updateTemplatesState(categoryIndex, index, updatedTemplate, setTextTemplates);
        await removeTemplateCollectionItem(itemId)
    }

    const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTemplate = { ...textTemplate, title: e.target.value };
        await delayedUpdateTemplateTitle(e.target.value, template.template_id, userID, setSaveStatus)
        updateTemplatesState(categoryIndex, index, newTemplate, setTextTemplates);

    };
    const handleCreateNewLineItem = async () => {
        const newCollectionItem: CollectionItem = {
            id: uuidv4(),
            text: "",
            order: textTemplate.template_collections ? textTemplate.template_collections.length : 0,
            // Add other fields as necessary...
        };
        await createTemplateCollectionItem(textTemplate.template_id, newCollectionItem.id)
        const updatedTemplateCollections = [...textTemplate?.template_collections, newCollectionItem];
        const updatedTemplate = {
            ...textTemplate,
            template_collections: updatedTemplateCollections
        };
        setTextTemplate(updatedTemplate);
        updateTemplatesState(categoryIndex, index, updatedTemplate, setTextTemplates);
    }

    const handleCopy = (text: string) => {

        navigator.clipboard.writeText(text)
            .then(() => {
                const newCopyCount = copyCount + 1
                setCopyCount(newCopyCount)
                delayedUpdateTemplateMetaData(
                    template.template_id,
                    userID,
                    newCopyCount,
                    setSaveStatus
                )
                setTextTemplate({ ...textTemplate, copy_count: newCopyCount })

            })
            .catch(err => console.log('Something went wrong', err));
    };

    const [items, setItems] = useState<JSX.Element[]>(template.template_collections && TemplatateEditOrderSection(template));

    useLayoutEffect(() => {
        if (template.template_collections) {
            setItems(TemplatateEditOrderSection(template))
        }
    }, [template, isEditListActive]);

    const handleNewListOrder = async (items: JSX.Element[], oldIndex: number, newIndex: number) => {
        const movedTextTemplatesArray = arrayMove(textTemplate.template_collections, oldIndex, newIndex);

        const sortedTextTemplatesArray = movedTextTemplatesArray.map((item: any, index: number) => {
            if (item.order !== index) {
                return { ...item, order: index }
            } else {
                return item;
            }
        }).sort((a, b) => a.order - b.order)

        const updatedTemplate = {
            ...textTemplate,
            template_collections: sortedTextTemplatesArray
        };
        //console.log("updatedTemplate", updatedTemplate)
        updateTemplatesState(categoryIndex, index, updatedTemplate, setTextTemplates);
        delayedUpdateCollectionOrder(sortedTextTemplatesArray, textTemplate.template_id, setSaveStatus)
    }
    return (
        <CardBaseLight className="w-full" ref={ref} key={template.template_id}>
            <FlexColContainer className="w-full min-h-[20rem] p-4 gap-4 md:min-w-[30rem] text-sm">
                <Topbar
                    isEditActive={isEditActive}
                    handleTitleChange={handleTitleChange}
                    handleRemoveTemplate={handleRemoveTemplate}
                    textTemplate={textTemplate}
                    index={index}
                    template={template}
                    categoryIndex={categoryIndex}
                    userID={userID}
                />
                <DividerHorizontal />
                <FlexRowContainer className="gap-4 flex-1">
                    {!isEditListActive
                        ?
                        <FlexColContainer className="gap-4 w-full">
                            {template.template_collections?.length > 0
                                ?
                                <FlexColContainer className="gap-4">
                                    {template.template_collections?.map((collectionItem: CollectionItem, index: number) => {
                                        return <div key={`collectionItem-${index}-${collectionItem.id}`}>
                                            <TemplatateEditTextSection
                                                collectionItem={collectionItem}
                                                handleCopy={handleCopy}
                                                handleTextChange={handleTextChange}
                                                handleRemoveCollectionItem={handleRemoveCollectionItem}
                                                isEditTextActive={isEditActive}
                                            />
                                        </div>

                                    })}
                                </FlexColContainer>
                                :
                                <FlexColCentered className="h-full">
                                    <i className="text-gray-500">No basic templates to be displayed. <span className="font-bold">Add a new template.</span> </i>
                                </FlexColCentered>

                            }
                            {isEditTextActive &&
                                <FlexRowContainer className="justify-between items-end mt-auto relative">
                                    <FlexColContainer>
                                        <p className="text-xs text-gray-400">Auto saving changes</p>
                                    </FlexColContainer>
                                    <FlexRowCenteredY className="gap-4">
                                        {textTemplate?.template_collections?.length === 0 &&
                                            <FlexRowCenteredY className="absolute right-[7rem] top-2 text-sm group-hover:hidden text-green-600 font-bold animate-slide duration-500 ease-in-out">
                                                <span className="w-[6rem] text-center ">Click to add</span>
                                                <FaArrowRight />
                                            </FlexRowCenteredY>
                                        }
                                        <div className="group relative">
                                            <PlusButton
                                                onClick={handleCreateNewLineItem}
                                                disabled={template.template_collections?.length === templateCollectionItemCountLimit}
                                                className="p-1 bg-purple-200 text-purple-900 group"
                                            >
                                                <BsPlus className="text-2xl" />

                                            </PlusButton>
                                            <HoverLabel className="w-[6rem]">Add Template</HoverLabel>
                                        </div>

                                        <div className="group relative">
                                            <IconContainerSecondary onClick={handleEditInactive} disabled={false}>
                                                <BsArrowLeft className="text-2xl " />
                                                <HoverLabel className="w-[4rem]">Go back</HoverLabel>
                                            </IconContainerSecondary>
                                        </div>
                                    </FlexRowCenteredY>


                                </FlexRowContainer>
                            }

                        </FlexColContainer>
                        :
                        <FlexColContainer className="w-full">
                            {template.template_collections?.length > 0 &&
                                <List
                                    values={items}
                                    onChange={({ oldIndex, newIndex }) =>
                                        handleNewListOrder(items, oldIndex, newIndex)
                                    }
                                    renderList={({ children, props }) => <ul className="w-full flex flex-col gap-2" {...props}>{children}</ul>}
                                    renderItem={({ value, props }) => <li className="list-none w-full" {...props} style={{ ...props.style, zIndex: 1000 }}>{value}</li>}
                                />
                            }
                        </FlexColContainer>

                    }

                    {!isEditActive
                        &&
                        <FlexColContainer className="border-l-[1px] border-gray-200 ps-2">
                            <CollectionsTemplateTextProductionToolbar
                                setIsEditActive={setIsEditActive}
                                setIsEditListActive={setIsEditListActive}
                                setIsEditTextActive={setIsEditTextActive}
                                textTemplate={textTemplate}
                                setTemplates={setTextTemplates}
                                userID={userID}
                                categoryIndex={categoryIndex}
                            />
                        </FlexColContainer>
                    }

                </FlexRowContainer>
                {isEditListActive &&
                    <FlexRowContainer className="justify-end">
                        <div className="group relative">
                            <IconContainerSecondary onClick={handleEditInactive} disabled={false}>
                                <BsArrowLeft className="text-2xl " />
                                <HoverLabel className="w-[4rem]">Go back</HoverLabel>
                            </IconContainerSecondary>
                        </div>
                    </FlexRowContainer>
                }
                <DividerHorizontal />
                <FlexRowCenteredY className="text-gray-500 justify-between text-xs">
                    <p >
                        {`Templates: `}
                        <span className={`${isEditTextActive && getColorForCount(template.template_collections?.length, templateCollectionItemCountLimit)}`}>
                            {template.template_collections?.length}{isEditTextActive && `/${templateCollectionItemCountLimit}`}
                        </span>

                    </p>
                    <p className="py-1 px-2 rounded bg-violet-200 text-violet-800">Collection</p>
                </FlexRowCenteredY>
            </FlexColContainer>
        </CardBaseLight>
    );
};

const ForwardedRefTemplateCard = React.forwardRef(TemplateCard);

export default ForwardedRefTemplateCard;