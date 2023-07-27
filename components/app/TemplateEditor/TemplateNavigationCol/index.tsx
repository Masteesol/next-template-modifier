import {
    DividerHorizontal,
    FlexColCentered,
    FlexColContainer,
    FlexRowCenteredY,
    FlexRowEnd,
    PlusButton,
} from "@/components/shared/styled-global-components";
import TemplateNavButton from "./TemplateNavButton";
import { useState, useEffect, useContext } from "react";
import { Accordion } from "../shared";
import { SaveStatusContext } from "@/context/SavedStatusContext";
import { List, arrayMove } from "react-movable";
import debounce from "lodash.debounce";
import { updateTemplatesOrder } from "@/requests/templates";
import { Templates } from "@/types/global";
import { BsArrowLeft, BsPlusLg, BsStarFill } from "react-icons/bs";

interface TemplateNavigationProps {
    handleViewNavigationSelect: any
    textTemplates: any;
    selectedCategory: number
    handleCreateTemplate: any
    templateRefs: any;
    setTextTemplates: any;
    userID: any;
}

const delayedUpdateCategory = debounce((textTemplates, categoryID, setSaveStatus, userID) => {
    const update = async () => {
        try {
            const updatePromises = textTemplates.map((item: any) =>
                updateTemplatesOrder(categoryID, item.template_id, userID, item.order,)
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
}, 2000);

const SortingList = (props: TemplateNavigationProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [addTemplateClickedOnce, setAddTemplateClickedOnce] = useState(false)
    const { setSaveStatus } = useContext(SaveStatusContext)
    const {
        handleViewNavigationSelect,
        textTemplates,
        handleCreateTemplate,
        setTextTemplates,
        userID,
        templateRefs,
        selectedCategory
    } = props

    const TemplatesCardList = TemplatesNavCardList(props, isEditing)
    const [items, setItems] = useState<JSX.Element[]>(TemplatesCardList);

    useEffect(() => {
        setItems(TemplatesNavCardList(props, isEditing))
    }, [props, isEditing]);

    const handleNewListOrder = async (items: JSX.Element[], oldIndex: number, newIndex: number) => {
        const movedTextTemplatesArray = arrayMove(textTemplates[selectedCategory].templates, oldIndex, newIndex);

        const sortedTextTemplatesArray = movedTextTemplatesArray.map((item: any, index: number) => {
            if (item.order !== index) {
                return { ...item, order: index }
            } else {
                return item;
            }
        }).sort((a, b) => a.order - b.order)
        const newTextTemplates = textTemplates.map((item: any, index: number) => {
            if (index === selectedCategory) {
                return {
                    ...item,
                    templates: sortedTextTemplatesArray,
                }
            }
            return item;
        });
        setTextTemplates(newTextTemplates)
        delayedUpdateCategory(sortedTextTemplatesArray, textTemplates[selectedCategory].category_id, setSaveStatus, userID)
    }

    return (
        <FlexColContainer className="px-2">
            <Accordion
                handleView={handleViewNavigationSelect}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                title="Templates"
            />
            <FlexColContainer className="w-full gap-4 min-w-[18rem] max-w-[18rem] max-h-[90%] overflow-y-auto">
                {textTemplates[selectedCategory].templates.filter((item: Templates) => item.favourited && item.favourited).length > 0
                    &&
                    <FlexColContainer className="gap-4">
                        <FlexRowCenteredY className="gap-2 pt-2">
                            <h2>Favourites</h2>
                            <BsStarFill className="text-base text-green-500" />
                        </FlexRowCenteredY>
                        <FlexColContainer className="gap-2">
                            {textTemplates[selectedCategory].templates.map((item: Templates, templateIndex: number) => {
                                return item.favourited && <TemplateNavButton
                                    template={item}
                                    index={templateIndex}
                                    templateRefs={templateRefs}
                                    key={`template-nav-button-${selectedCategory}-${templateIndex}`}
                                    isEditing={isEditing}
                                />
                            })}
                        </FlexColContainer>
                        <DividerHorizontal className="w-full border-1 border-gray-300" />
                    </FlexColContainer>
                }
                {isEditing ?
                    <List
                        values={items}
                        onChange={({ oldIndex, newIndex }) =>
                            handleNewListOrder(items, oldIndex, newIndex)
                        }
                        renderList={({ children, props }) => <ul className="w-full flex flex-col gap-2" {...props}>{children}</ul>}
                        renderItem={({ value, props }) => <li className="list-none w-full" {...props} style={{ ...props.style, zIndex: 1000 }}>{value}</li>}
                    />
                    :
                    <ul className="flex flex-col gap-2">
                        {items.map((item, index) =>
                            <li className="w-full" key={index}>{item}</li>
                        )}
                    </ul>
                }
            </FlexColContainer>
            <FlexColCentered className="mt-8 w-full mb-8 gap-4">
                {/* <ListAddButton onClick={handleCreateTemplate} /> */}
                <FlexRowEnd className="w-full">
                    {
                        addTemplateClickedOnce ?
                            <FlexColContainer className="gap-4 items-end">
                                <div className="flex items-center gap-2 hover:text-green-800 cursor-pointer"
                                    onClick={() => handleCreateTemplate()}
                                >
                                    Single Template
                                    <PlusButton

                                        className="text-base"
                                    >
                                        <BsPlusLg />
                                    </PlusButton>
                                </div>
                                <div className="flex items-center gap-2 hover:text-purple-800 cursor-pointer"
                                    onClick={() => handleCreateTemplate(true)}
                                >
                                    Template Collection
                                    <PlusButton

                                        className="bg-purple-200 text-purple-800 text-base"
                                    >
                                        <BsPlusLg />
                                    </PlusButton>
                                </div>
                                <button
                                    className="text-2xl transition ease-in-out duration-300 hover:translate-x-[-0.3rem]"
                                    onClick={() => { setAddTemplateClickedOnce(false) }}
                                >
                                    <BsArrowLeft />
                                </button>
                            </FlexColContainer>
                            :
                            <PlusButton
                                onClick={() => { setAddTemplateClickedOnce(true) }}
                            >
                                <BsPlusLg />
                            </PlusButton>
                    }

                </FlexRowEnd>
            </FlexColCentered>
        </FlexColContainer>
    )
}


export default SortingList



const TemplatesNavCardList = (props: any, isEditing: boolean) => {
    const {
        textTemplates,
        selectedCategory,
        templateRefs,
    } = props

    //console.log("isEditing CategoryList", isEditing)
    return textTemplates[selectedCategory].templates.map((template: any, templateIndex: number) => {
        return !template.favourited
            && <TemplateNavButton
                template={template}
                index={templateIndex}
                templateRefs={templateRefs}
                key={`template-nav-button-${selectedCategory}-${templateIndex}`}
                isEditing={isEditing}
            />
    })
}