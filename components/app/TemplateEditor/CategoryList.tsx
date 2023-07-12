import { FlexColCentered, FlexColCenteredX, FlexColContainer, FlexRowCenteredY, AddButton, FlexRowContainer } from "@/components/shared/styled-global-components";
import CategoryCard from "@/components/app/TemplateEditor/CategoryCard";
import { FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import GuidingDescriptionText from "./GuidingDescription";
import { List, arrayMove } from 'react-movable';
import { useState, useEffect, useContext } from "react";
import { updateCategoryOrder } from "@/requests/templates";
import { SaveStatusContext } from "@/context/SavedStatusContext";
import debounce from "lodash.debounce";

export const CategoryHeaderButton = ({ viewCategories, handleViewCategorySelect }: any) => {
    return <FlexRowCenteredY className={`p-4 gap-4 rounded relative`}>
        <h2>Categories</h2>
        <FlexRowCenteredY className="text-lg cursor-pointer" onClick={handleViewCategorySelect}>
            {!viewCategories ? <FaEye /> : <FaEyeSlash />}
        </FlexRowCenteredY>
    </FlexRowCenteredY>
}

const AddCategoryButton = ({ onClick }: any) => {
    return <FlexRowContainer className="justify-end w-full">
        <AddButton onClick={onClick}>
            <FlexColCentered>
                <FaPlus />
            </FlexColCentered>
        </AddButton>
    </FlexRowContainer>
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
        setSelectedCategory,
        userID
    } = props

    useEffect(() => {
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
        delayedUpdateCategory(sortedTextTemplatesArray, setSaveStatus, userID)
    }

    return (
        <FlexColContainer className="px-2">
            {!isEditing
                ?
                <FlexColCenteredX>
                    <CategoryHeaderButton viewCategories={viewCategories} handleViewCategorySelect={handleViewCategorySelect} />
                </FlexColCenteredX>
                :
                <FlexColCenteredX>
                    <h3 className="p-4">Edit Categories</h3>
                </FlexColCenteredX>
            }
            <FlexColContainer
                className="w-[18rem] lg:w-[19rem] relative h-full max-h-[90%] overflow-y-auto"
            >
                {isEditing ?
                    <List

                        values={items}
                        onChange={({ oldIndex, newIndex }) =>
                            handleNewListOrder(items, oldIndex, newIndex)
                        }
                        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                        renderItem={({ value, props }) => <li className="list-none" {...props} style={{ ...props.style, zIndex: 1000 }}>{value}</li>}
                    />
                    :
                    <ul >
                        {items.map((item, index) =>
                            <li key={index}>{item}</li>
                        )}
                    </ul>
                }

            </FlexColContainer>
            <FlexColCentered className="mt-auto w-full mb-10 gap-4">
                {textTemplates.length === 0 && <GuidingDescriptionText>Add a new category to begin</GuidingDescriptionText>}
                <FlexRowCenteredY className="w-full">
                    {textTemplates.length > 0 && <EditToggle isEditing={isEditing} setIsEditing={setIsEditing} />}
                    {!isEditing && <AddCategoryButton onClick={addCategory} />}
                </FlexRowCenteredY>
            </FlexColCentered>
        </FlexColContainer>
    );
};


const CategoryList = (props: CateGoryListTypes, isEditing: boolean) => {
    const {
        textTemplates,
        selectedCategory,
        handleSelectCategory,
        handleRemoveCategory,
        handleInputCatTitleChange,
    } = props
    //console.log("isEditing CategoryList", isEditing)
    return textTemplates.map((item: any, index: number) => {
        return <CategoryCard
            key={item.category_id}
            index={index}
            category={item}
            selectedCategory={selectedCategory}
            handleSelectCategory={() => handleSelectCategory(index)}
            handleInputCatTitleChange={handleInputCatTitleChange}
            handleRemoveCategory={handleRemoveCategory}
            isEditing={isEditing}
        />
    })
}

export default SortingList

export const EditToggle = ({ isEditing, setIsEditing }: any) => {

    const handleToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer w-full">
            <input
                type="checkbox"
                checked={isEditing}
                onChange={handleToggle}
                className="sr-only"
            />
            <div className={`w-11 h-6 rounded-full transition-all peer-checked:bg-blue-600 dark:bg-gray-700 bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white ${isEditing ? 'peer-checked:bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${isEditing ? 'after:translate-x-full' : ''}`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {isEditing ? 'Finish Editing' : 'Edit List'}
            </span>
        </label>
    );
};