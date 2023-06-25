import { FlexColCentered, FlexColCenteredX, FlexColContainer, FlexRowCenteredY, AddButton, FlexRowContainer } from "@/components/styled-global-components";
import CategoryCard from "@/components/TemplateEditor/CategoryCard";
import { FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import GuidingDescriptionText from "./GuidingDescription";

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
}


const CategoryList = ({ viewCategories, handleViewCategorySelect, textTemplates, addCategory, selectedCategory, handleSelectCategory, handleRemoveCategory, handleInputCatTitleChange }: CateGoryListTypes) => {
    return <FlexColContainer className="px-2">
        <FlexColCenteredX>
            <CategoryHeaderButton viewCategories={viewCategories} handleViewCategorySelect={handleViewCategorySelect} />
        </FlexColCenteredX>
        <FlexColCenteredX className="gap-4 w-[18rem] lg:w-[19rem] relative h-full max-h-[90%] overflow-y-auto">

            {
                textTemplates.length > 0 &&
                textTemplates.map((item: any, index: number) => {
                    return <CategoryCard
                        key={item.category_id}
                        index={index}
                        category={item}
                        selectedCategory={selectedCategory}
                        handleSelectCategory={() => handleSelectCategory(index)}
                        handleInputCatTitleChange={handleInputCatTitleChange}
                        handleRemoveCategory={handleRemoveCategory} // New prop
                    />
                })
            }

        </FlexColCenteredX>
        <FlexColCentered className="mt-auto w-full mb-4 gap-4">
            {textTemplates.length === 0 && <GuidingDescriptionText>Add a new category to begin</GuidingDescriptionText>}
            <AddCategoryButton onClick={addCategory} />
        </FlexColCentered>
    </FlexColContainer>
}

export default CategoryList