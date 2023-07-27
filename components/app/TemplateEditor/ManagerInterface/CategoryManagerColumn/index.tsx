import {
    FlexColCentered,
    FlexColContainer,
    FlexRowCenteredY,
    AddButton,
    FlexRowContainer,
    DividerPipe,
    FlexRowCentered,
    DividerHorizontal,
    FlexExpandable,
    FlexRowEnd,
    PlusButton
} from "@/components/shared/styled-global-components";

import CategoryCard from "./CategoryCard";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GuidingDescriptionText from "../../GuidingDescription";
import { List, arrayMove } from 'react-movable';
import { useState, useLayoutEffect, useContext } from "react";
import { updateCategoryOrder } from "@/requests/templates";
import { SaveStatusContext } from "@/context/SavedStatusContext";
import debounce from "lodash.debounce";
import { BsChevronDown, BsChevronUp, BsPlusLg, BsStarFill } from "react-icons/bs";
import { EditToggle } from "../../shared";
import { TemplatesContainer } from "@/types/global";

export const CategoryHeaderButton = ({ viewCategories, handleViewCategorySelect }: any) => {
    return <FlexRowCenteredY className={`p-4 gap-4 rounded relative`}>
        <h2>Categories</h2>
        <FlexRowCenteredY className="text-lg cursor-pointer" onClick={handleViewCategorySelect}>
            {!viewCategories ? <FaEye /> : <FaEyeSlash />}
        </FlexRowCenteredY>
    </FlexRowCenteredY>
}

interface CateGoryListTypes {
    viewCategories: any;
    handleViewCategorySelect: any;
    textTemplates: any;
    handleInputCatTitleChange: any
    handleSelectCategory: any;
    handleRemoveCategory: any;
    selectedCategory: any;
    addCategory: any;
    setTextTemplates: any
    userID: any
    setSelectedCategory: any
}

const delayedUpdateCategory = debounce((textTemplates, setSaveStatus, userID) => {
    const update = async () => {
        try {
            const updatePromises = textTemplates.map((item: any) =>
                updateCategoryOrder(item.category_id, userID, item.order,)
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


const SortingList = (props: CateGoryListTypes) => {
    const [isEditing, setIsEditing] = useState(false);

    const { setSaveStatus } = useContext(SaveStatusContext)
    const CategoryCardList = CategoryList(props, isEditing)
    //console.log(CategoryCardList)
    const [items, setItems] = useState<JSX.Element[]>(CategoryCardList);

    const {
        textTemplates,
        addCategory,
        viewCategories,
        handleViewCategorySelect,
        setTextTemplates,
        selectedCategory,
        setSelectedCategory,
        userID,
        handleSelectCategory,
        handleInputCatTitleChange,
        handleRemoveCategory
    } = props

    useLayoutEffect(() => {
        setItems(CategoryList(props, isEditing))
    }, [props, isEditing]);

    const handleNewListOrder = async (items: JSX.Element[], oldIndex: number, newIndex: number) => {
        const movedTextTemplatesArray = arrayMove(textTemplates, oldIndex, newIndex);

        const sortedTextTemplatesArray = movedTextTemplatesArray.map((item: any, index: number) => {
            if (item.order !== index) {
                return { ...item, order: index }
            } else {
                return item;
            }
        }).sort((a, b) => a.order - b.order)

        setTextTemplates(sortedTextTemplatesArray)
        setSelectedCategory(newIndex)
        console.log("sortedTextTemplatesArray", sortedTextTemplatesArray)
        delayedUpdateCategory(sortedTextTemplatesArray, setSaveStatus, userID)
    }

    return (
        <FlexColContainer className="px-2">
            <Accordion
                viewCategories={viewCategories}
                handleViewCategorySelect={handleViewCategorySelect}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                textTemplates={textTemplates}
            />
            <FlexColContainer
                className="w-[18rem] lg:w-[19rem] relative max-h-[90%] overflow-y-auto gap-4"
            >
                {textTemplates.filter((item: TemplatesContainer) => item.favourited && item.favourited).length > 0
                    &&
                    <FlexColContainer className="gap-4">
                        <FlexRowCenteredY className="gap-2 pt-2">
                            <h2>Favourites</h2>
                            <BsStarFill className="text-base text-green-500" />
                        </FlexRowCenteredY>
                        <FlexColContainer className="gap-2">
                            {textTemplates.map((item: TemplatesContainer, index: number) => {
                                return item.favourited && <CategoryCard
                                    key={item.category_id}
                                    index={index}
                                    textTemplate={item}
                                    selectedCategory={selectedCategory}
                                    handleSelectCategory={() => handleSelectCategory(index)}
                                    handleInputCatTitleChange={handleInputCatTitleChange}
                                    handleRemoveCategory={handleRemoveCategory}
                                    isEditing={isEditing}
                                    favourited={item.favourited}
                                    setTextTemplates={setTextTemplates}
                                    textTemplates={textTemplates}
                                    userID={userID}
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
                        renderList={({ children, props }) => <ul className="flex flex-col gap-1" {...props}>{children}</ul>}
                        renderItem={({ value, props }) => <li className="list-none" {...props} style={{ ...props.style, zIndex: 1000 }}>{value}</li>}
                    />
                    :
                    <ul className="flex flex-col gap-1">
                        {items.map((item, index) =>
                            <li key={index}>{item}</li>
                        )}
                    </ul>
                }

            </FlexColContainer>
            <FlexColCentered className="w-full mb-10 mt-8 gap-4">
                {textTemplates.length === 0 && <GuidingDescriptionText>Add a new category to begin</GuidingDescriptionText>}

                {!isEditing &&
                    <FlexRowEnd className="w-full">
                        <PlusButton
                            onClick={addCategory}
                        >
                            <BsPlusLg />
                        </PlusButton>
                    </FlexRowEnd>}
            </FlexColCentered>
        </FlexColContainer >
    );
};



const CategoryList = (props: any, isEditing: boolean) => {
    const {
        textTemplates,
        selectedCategory,
        handleSelectCategory,
        handleRemoveCategory,
        handleInputCatTitleChange,
        setTextTemplates,
        userID
    } = props
    //console.log("isEditing CategoryList", isEditing)
    return textTemplates.map((item: any, index: number) => {
        return !item.favourited && <CategoryCard
            key={item.category_id}
            index={index}
            textTemplate={item}
            setTextTemplates={setTextTemplates}
            selectedCategory={selectedCategory}
            handleSelectCategory={() => handleSelectCategory(index)}
            handleInputCatTitleChange={handleInputCatTitleChange}
            handleRemoveCategory={handleRemoveCategory}
            isEditing={isEditing}
            favourited={item.favourited}
            textTemplates={textTemplates}
            userID={userID}
        />
    })
}

export default SortingList

const Accordion = ({ isEditing, setIsEditing, handleViewCategorySelect, textTemplates }: any) => {
    //by default expanded on mobile devices
    const [expanded, setExpanded] = useState(window ? window.innerWidth < 1280 : false)


    return (
        <FlexColContainer className="gap-2">
            <FlexRowCenteredY className="justify-between text-lg cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <h3>Categories</h3>
                {!expanded
                    ?
                    <BsChevronDown />
                    :
                    <BsChevronUp />
                }

            </FlexRowCenteredY>
            <DividerHorizontal className="w-full border-gray-200" />
            <FlexExpandable
                $expanded={expanded}
                $heightAndPadding="h-[5rem] py-4"
            >
                {textTemplates.length > 0 &&
                    <FlexRowCentered className="flex-1">
                        <EditToggle isEditing={isEditing} setIsEditing={setIsEditing} />
                    </FlexRowCentered>}
                {textTemplates.length > 0 && <DividerPipe />}
                <FlexRowCentered className="gap-2 cursor-pointer flex-1"
                    onClick={handleViewCategorySelect}
                >
                    <FaEyeSlash className="text-lg" />
                    <label className="cursor-pointer">Hide</label>
                </FlexRowCentered>
            </FlexExpandable>
        </FlexColContainer>
    );
};

