import { CardBaseLightHover, FlexRowCenteredY, HollowButton, InputBase, SubmitButton } from "@/components/shared/styled-global-components";
import { BsArrowRight, BsFillGrid3X2GapFill } from "react-icons/bs";
import { useState } from "react"
import { Dropdown } from "flowbite-react";


interface CatType {
    category: any;
    index: number;
    selectedCategory: number;
    handleSelectCategory: () => void;
    handleInputCatTitleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, category_id: string) => void;
    handleRemoveCategory: (index: number, category_id: string) => void;  // New prop
    isEditing: boolean
}

const CategoryCard = (props: CatType) => {
    const { category, index, handleSelectCategory, handleInputCatTitleChange, handleRemoveCategory, selectedCategory, isEditing } = props
    const [isDeleteActive, setIsDeleteActive] = useState(selectedCategory === index ? false : false)
    //console.log("Category card", category)
    const handleDeleteFirstStep = () => {
        setIsDeleteActive(!isDeleteActive)
    }

    const handleRemoveArrayEntry = () => {
        handleRemoveCategory(index, category.category_id)
        setIsDeleteActive(false)
    }
    //console.log("isEditing", isEditing)
    const isSelected = selectedCategory === index
    return (
        <div>
            {isEditing
                ? <CardBaseLightHover
                    className={`${isSelected && "border-l-8 border-l-green-400"} w-full p-2 pe-4 my-2`}
                    id={`${index}`}
                >
                    <FlexRowCenteredY className="gap-4">
                        <InputBase
                            type="text"
                            value={category.category_name || ''}
                            className={"font-bold max-w-[80%]"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputCatTitleChange(e, index, category.category_id)}
                            placeholder={"Input Category Name"}
                        />
                        <BsFillGrid3X2GapFill className="text-2xl cursor-grab" />
                    </FlexRowCenteredY>
                </CardBaseLightHover >
                :
                <CardBaseLightHover
                    className={`${isSelected && "border-l-8 border-l-green-400"} w-full p-2 pe-4 my-2`}
                    id={`${index}`}
                >
                    <FlexRowCenteredY>
                        <h3 className={"font-bold"}>
                            {category.category_name}
                        </h3>
                        < FlexRowCenteredY className="ms-auto">
                            <BsArrowRight
                                className="text-2xl cursor-pointer hover:text-green-800 dark:hover:text-green-100"
                                onClick={handleSelectCategory}
                            />
                        </FlexRowCenteredY>
                    </FlexRowCenteredY>
                    <FlexRowCenteredY
                        className="pt-4"
                    >
                        {!isDeleteActive && isSelected &&
                            <FlexRowCenteredY className="w-full">
                                <Dropdown label="Options" style={{ backgroundColor: "transparent", color: "black", borderColor: "lightgray" }}>
                                    <Dropdown.Item>
                                        Favourite
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleDeleteFirstStep}>
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown>
                            </FlexRowCenteredY>
                        }
                        {isDeleteActive && isSelected
                            &&
                            <FlexRowCenteredY className="gap-2 ms-auto ">
                                <SubmitButton className="text-sm cursor-pointer hover:text-green-800 dark:hover:text-green-100" onClick={handleRemoveArrayEntry}>Yes</SubmitButton>
                                <HollowButton
                                    className="text-sm"
                                    onClick={handleDeleteFirstStep}
                                >
                                    Cancel
                                </HollowButton>
                            </FlexRowCenteredY>
                        }
                    </FlexRowCenteredY>
                </CardBaseLightHover >
            }

        </div>
    );
};

export default CategoryCard

