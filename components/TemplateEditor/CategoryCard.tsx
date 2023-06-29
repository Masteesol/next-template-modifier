import { CardBaseLightHover, FlexRowCenteredY, InputBase } from "@/components/styled-global-components";
import { FaArrowRight, FaCheck, FaTrash } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import { useState } from "react"



interface CatType {
    category: any;
    index: number;
    selectedCategory: number;
    handleSelectCategory: () => void;
    handleInputCatTitleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, category_id: string) => void;
    handleRemoveCategory: (index: number, category_id: string) => void;  // New prop
}



const CategoryCard = ({ category, index, handleSelectCategory, selectedCategory, handleInputCatTitleChange, handleRemoveCategory }: CatType) => {
    const [isDeleteActive, setIsDeleteActive] = useState(false)
    //console.log("Category card", category)
    const handleDeleteFirstStep = () => {
        setIsDeleteActive(!isDeleteActive)
    }

    const handleRemoveArrayEntry = () => {
        handleRemoveCategory(index, category.category_id)
        setIsDeleteActive(false)
    }

    return (
        <CardBaseLightHover
            className={`${selectedCategory === index && "bg-green-300 dark:bg-green-800"} w-full p-4`}
            id={index.toString()}
        >
            <FlexRowCenteredY className="gap-4">
                <InputBase
                    type="text"
                    value={category.category_name || ''}
                    className="font-bold max-w-[70%]"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputCatTitleChange(e, index, category.category_id)}
                    placeholder={"Input Category Name"}
                />
                {isDeleteActive && selectedCategory === index
                    && <FlexRowCenteredY className="gap-4 ms-auto">
                        <BsXLg className="text-xl cursor-pointer hover:text-green-800 dark:hover:text-green-100" onClick={handleDeleteFirstStep} />
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

