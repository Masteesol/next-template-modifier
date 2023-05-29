import tw from "tailwind-styled-components";
import { CardBaseLightHover, FlexRowCenteredY } from "@/components/styled-global-components";
import { FaArrowAltCircleLeft, FaArrowRight, FaCheck, FaTrash } from "react-icons/fa";
import { useState } from "react"
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
    category: string;
    index: number;
    selectedCategory: number;
    handleSelectCategory: () => void;
    handleInputCatTitleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    removeCategory: (index: number) => void;  // New prop
}



const CategoryCard = ({ category, index, handleSelectCategory, selectedCategory, handleInputCatTitleChange, removeCategory }: CatType) => {
    const [isDeleteActive, setIsDeleteActive] = useState(false)

    const handleDeleteFirstStep = () => {
        setIsDeleteActive(!isDeleteActive)
    }

    const handleRemoveArrayEntry = () => {
        removeCategory(index)
        setIsDeleteActive(false)
    }

    return (
        <CardBaseLightHover
            className={`${selectedCategory === index && "bg-green-300 dark:bg-green-900"} w-full p-4`}
            id={index.toString()}
        >
            <FlexRowCenteredY className="gap-4">
                <InputBase
                    type="text"
                    value={category || ''}
                    className="font-bold max-w-[70%]"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputCatTitleChange(e, index)}
                    placeholder={"Input Category Name"}
                />
                {isDeleteActive && selectedCategory === index
                    && <FlexRowCenteredY className="gap-4 ms-auto">
                        <FaArrowAltCircleLeft className="text-xl cursor-pointer hover:text-green-800 dark:hover:text-green-100" onClick={handleDeleteFirstStep} />
                        <FaCheck
                            className="text-2xl cursor-pointer hover:text-green-800 dark:hover:text-green-100"
                            onClick={handleRemoveArrayEntry}
                        />
                    </FlexRowCenteredY>}
                {!isDeleteActive && selectedCategory === index &&
                    < FlexRowCenteredY className="gap-4 ms-auto">
                        <FaTrash className="text-xl cursor-pointer hover:text-green-800 dark:hover:text-green-100" onClick={handleDeleteFirstStep} />
                        <FaArrowRight
                            className="text-2xl cursor-pointer hover:text-green-800 dark:hover:text-green-100"
                            onClick={handleSelectCategory}
                        />
                    </FlexRowCenteredY>
                }
                {!isDeleteActive && selectedCategory !== index &&
                    < FlexRowCenteredY className="gap-4 ms-auto">
                        <FaArrowRight
                            className="text-2xl cursor-pointer hover:text-green-800 dark:hover:text-green-100"
                            onClick={handleSelectCategory}
                        />
                    </FlexRowCenteredY>
                }

            </FlexRowCenteredY>
        </CardBaseLightHover >
    );
};

export default CategoryCard
