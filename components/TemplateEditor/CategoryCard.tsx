import tw from "tailwind-styled-components";
import { CardBaseLightHover, FlexRowCenteredY } from "@/components/styled-global-components";
import { FaArrowAltCircleRight } from "react-icons/fa";

const InputBase = tw.input`
  border-1 
  border-transparent
  rounded 
  bg-transparent 
  focus:border-1 
  focus:border-green-200 
  focus:ring-green-200
`


interface CatType {
    category: string
    index: number;
    handleSelectCategory: any;
    selectedCategory: any;
    handleInputCatTitleChange: any
}


const CategoryCard = ({ category, index, handleSelectCategory, selectedCategory, handleInputCatTitleChange }: CatType) => {
    return (
        <CardBaseLightHover
            className={`${selectedCategory === index && "bg-green-300 dark:bg-green-900"} w-full p-4`}
            id={index.toString()}
        >
            <FlexRowCenteredY className="gap-4">
                <InputBase
                    type="text"
                    value={category || 'Category title'}
                    className="font-bold"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputCatTitleChange(e, index)}
                />
                <FaArrowAltCircleRight
                    className="text-2xl cursor-pointer hover:text-green-800 dark:hover:text-green-100"
                    onClick={handleSelectCategory}
                />
            </FlexRowCenteredY>
        </CardBaseLightHover>
    );
};

export default CategoryCard