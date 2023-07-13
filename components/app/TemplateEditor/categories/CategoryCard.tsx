import { CardBaseLightHover, DividerPipe, FlexRowCentered, FlexRowCenteredY, HollowButton, InputBase, SubmitButton } from "@/components/shared/styled-global-components";
import { BsArrowRight, BsChevronDown, BsChevronUp, BsFillGrid3X2GapFill, BsStar, BsTrash3Fill } from "react-icons/bs";
import { useEffect, useState } from "react"

interface CatType {
    category: any;
    index: number;
    selectedCategory: number;
    handleSelectCategory: () => void;
    handleInputCatTitleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, category_id: string) => void;
    handleRemoveCategory: (index: number, category_id: string) => void;  // New prop
    isEditing: boolean,
}

const CategoryCard = (props: CatType) => {

    const { category,
        index,
        handleSelectCategory,
        handleInputCatTitleChange,
        handleRemoveCategory,
        selectedCategory,
        isEditing,
    } = props
    const isSelected = selectedCategory === index

    const [expanded, setExpanded] = useState(false)
    const [isDeleteActive, setIsDeleteActive] = useState(isSelected ? false : false)

    useEffect(() => {
        setExpanded(false)
    }, [selectedCategory])

    const handleDeleteFirstStep = () => {
        setIsDeleteActive(!isDeleteActive)
    }

    const handleRemoveArrayEntry = () => {
        handleRemoveCategory(index, category.category_id)
        setIsDeleteActive(false)
    }

    return (
        <div>
            {isEditing
                ? <CardBaseLightHover
                    className={`${isSelected && "border-l-8 border-l-green-400"} w-full my-2 hover:border-l-green-400 hover:border-l-8 pe-2 hover:ps-2 hover:pe-0 transition-all ease-in-out duration-300 transition-delay-200`}
                    id={`${index}`}
                >
                    <FlexRowCenteredY className="gap-4 justify-between p-4">
                        <h3 className={"font-bold"}>
                            {category.category_name}
                        </h3>
                        <BsFillGrid3X2GapFill className="text-2xl cursor-grab" />
                    </FlexRowCenteredY>
                </CardBaseLightHover >
                :
                <CardBaseLightHover
                    className={`${isSelected ? "border-l-8 border-l-green-400 pe-2 ps-4" : "cursor-pointer ps-2 hover:border-l-green-400 hover:border-l-8 pe-4 hover:ps-4 hover:pe-2 transition-all ease-in-out duration-300 transition-delay-200"} py-2 w-full my-2  `}
                    id={`${index}`}
                    onClick={handleSelectCategory}

                >
                    <FlexRowCenteredY className={`${!isSelected ? "p-2" : "pe-2"}`}>
                        {!isSelected ?
                            <h3 className={"font-bold "}>
                                {category.category_name}
                            </h3>
                            :
                            <InputBase
                                type="text"
                                value={category.category_name || ''}
                                className={"font-bold max-w-[80%] p-2"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputCatTitleChange(e, index, category.category_id)}
                                placeholder={"Input Category Name"}
                            />
                        }
                        < FlexRowCenteredY className="ms-auto">
                            {!isSelected
                                ?
                                <BsArrowRight
                                    className="text-2xl cursor-pointer hover:text-green-800 dark:hover:text-green-100"
                                    onClick={handleSelectCategory}
                                />
                                :
                                <FlexRowCentered
                                    onClick={() => setExpanded(!expanded)}
                                >
                                    {!expanded
                                        ?
                                        <BsChevronDown
                                            className="text-xl cursor-pointer hover:text-green-800 dark:hover:text-green-100"
                                        />
                                        :
                                        <BsChevronUp
                                            className="text-xl cursor-pointer hover:text-green-800 dark:hover:text-green-100"
                                        />
                                    }

                                </FlexRowCentered>
                            }
                        </FlexRowCenteredY>
                    </FlexRowCenteredY>
                    <FlexRowCenteredY
                        className={`${expanded && isSelected ? "h-[5rem] py-4" : "h-0"} overflow-hidden gap-4 w-full transition-all ease-in-out`}
                    >
                        {!isDeleteActive && expanded &&
                            <FlexRowCenteredY className="w-full h-full gap-2">
                                <FlexRowCentered className="gap-2 flex-1 cursor-pointer hover:bg-green-200 p-2 rounded">
                                    <BsStar className="text-xl" />
                                    <span>Favourite</span>
                                </FlexRowCentered>
                                <DividerPipe />
                                <FlexRowCentered className="gap-2 flex-1 cursor-pointer hover:bg-green-200 p-2 rounded"
                                    onClick={handleDeleteFirstStep}
                                >
                                    <BsTrash3Fill className="text-xl" />
                                    <span>Delete</span>
                                </FlexRowCentered>
                            </FlexRowCenteredY>

                        }
                        {isDeleteActive && expanded
                            &&
                            <FlexRowCenteredY className="w-full">
                                <span>Are you sure?</span>
                                <FlexRowCenteredY className="gap-2 ms-auto ">
                                    <SubmitButton
                                        className="text-sm cursor-pointer hover:text-green-800 dark:hover:text-green-100"
                                        onClick={handleRemoveArrayEntry}>
                                        Yes
                                    </SubmitButton>
                                    <HollowButton
                                        className="text-sm"
                                        onClick={handleDeleteFirstStep}
                                    >
                                        Cancel
                                    </HollowButton>
                                </FlexRowCenteredY>
                            </FlexRowCenteredY>
                        }
                    </FlexRowCenteredY>
                </CardBaseLightHover >
            }
        </div>
    );
};

export default CategoryCard

