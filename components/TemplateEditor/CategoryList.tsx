import { FlexColCentered, FlexColCenteredX, FlexRowCenteredY } from "@/components/styled-global-components";
import CategoryCard from "@/components/TemplateEditor/CategoryCard";
import { FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import tw from "tailwind-styled-components";
import GuidingDescriptionText from "./GuidingDescription";

export const CategoryHeaderButton = ({ viewCategories, handleViewCategorySelect }: any) => {
    return <FlexRowCenteredY className={`p-4 gap-4 rounded relative`}>
        <h2>Categories</h2>
        <FlexRowCenteredY className="text-lg cursor-pointer" onClick={handleViewCategorySelect}>
            {!viewCategories ? <FaEye /> : <FaEyeSlash />}
        </FlexRowCenteredY>
    </FlexRowCenteredY>
}


const AddButton = tw.button`
  w-full
  bg-gray-400
  rounded
  p-4
  text-gray-900
  dark:text-gray-500
  dark:bg-gray-700
  hover:bg-gray-500
  hover:dark:text-gray-300
`

const AddCategoryButton = ({ onClick }: any) => {
    return <AddButton onClick={onClick}>
        <FlexColCentered>
            <FaPlus />
        </FlexColCentered>
    </AddButton>
}


interface CateGoryListTypes {
    viewCategories: any;
    handleViewCategorySelect: any;
    textTemplates: any;
    handleInputCatTitleChange: any
    handleSelectCategory: any;
    removeCategory: any;
    selectedCategory: any;
    addCategory: any;
}


const CategoryList = ({ viewCategories, handleViewCategorySelect, textTemplates, addCategory, selectedCategory, handleSelectCategory, removeCategory, handleInputCatTitleChange }: CateGoryListTypes) => {
    return <FlexColCenteredX className="gap-4 w-[18rem] lg:w-[19rem] relative h-full px-2">
        <CategoryHeaderButton viewCategories={viewCategories} handleViewCategorySelect={handleViewCategorySelect} />
        {
            textTemplates.length > 0 &&
            textTemplates.map((item: any, index: number) => {
                return <CategoryCard
                    key={"cat-card-" + index}
                    index={index}
                    category={item.category}
                    selectedCategory={selectedCategory}
                    handleSelectCategory={() => handleSelectCategory(index)}
                    handleInputCatTitleChange={handleInputCatTitleChange}
                    removeCategory={removeCategory} // New prop
                />
            })
        }
        <FlexColCentered className="mt-auto w-full mb-4 gap-4">
            {textTemplates.length === 0 && <GuidingDescriptionText>Add a new category to begin</GuidingDescriptionText>}
            <AddCategoryButton onClick={addCategory} />
        </FlexColCentered>
    </FlexColCenteredX>
}

export default CategoryList