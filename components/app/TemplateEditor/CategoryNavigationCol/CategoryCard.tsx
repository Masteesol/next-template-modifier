import { CardBaseLightHover, DividerPipe, FlexRowCentered, FlexRowCenteredY, HollowButton, InputBase, SubmitButton } from "@/components/shared/styled-global-components";
import { BsArrowRight, BsChevronDown, BsChevronUp, BsFillGrid3X2GapFill, BsStar, BsStarFill, BsTrash3Fill } from "react-icons/bs";
import { useEffect, useState } from "react"
import { TemplatesContainer } from "@/types/global";
import { updateCategoryFavourite } from "@/requests/templates";


interface CatType {
    textTemplate: TemplatesContainer;
    index: number;
    selectedCategory: number;
    handleSelectCategory: () => void;
    handleInputCatTitleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, category_id: string) => void;
    handleRemoveCategory: (index: number, category_id: string) => void;  // New prop
    isEditing: boolean;
    favourited: boolean;
    setTextTemplates: any;
    textTemplates: any;
    userID: string
}

const CategoryCard = (props: CatType) => {

    const {
        textTemplate,
        index,
        handleSelectCategory,
        handleInputCatTitleChange,
        handleRemoveCategory,
        selectedCategory,
        isEditing,
        favourited,
        setTextTemplates,
        userID
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
        handleRemoveCategory(index, textTemplate.category_id)
        setIsDeleteActive(false)
    }

    const handleSetFavourited = async () => {
        const res = await updateCategoryFavourite(textTemplate.category_id, userID, !textTemplate.favourited)
        if (res) {
            setTextTemplates((prevTemplates: any) => {
                return prevTemplates.map((template: TemplatesContainer) => {
                    if (template.category_id === textTemplate.category_id) {
                        return { ...template, favourited: !template.favourited }
                    }
                    return template;
                })
            });
        }
    }


    if (!favourited && isEditing) {
        return <CardBaseLightHover
            className={`${isSelected && "border-l-8 border-l-green-400"} w-full my-2 hover:border-l-green-400 hover:border-l-8 pe-2 hover:ps-2 hover:pe-0 transition-all ease-in-out duration-300 transition-delay-200`}
            id={`${index}`}
        >
            <FlexRowCenteredY className="gap-4 justify-between p-4">
                <h3 className={"font-bold"}>
                    {textTemplate.category_name}
                </h3>
                <BsFillGrid3X2GapFill className="text-2xl cursor-grab" />
            </FlexRowCenteredY>
        </CardBaseLightHover >
    }

    return (
        <div>
            <CardBaseLightHover
                className={`${isSelected ? "border-l-8 border-l-green-400 pe-2 ps-4" : "cursor-pointer ps-2 hover:border-l-green-400 hover:border-l-8 pe-4 hover:ps-4 hover:pe-2 transition-all ease-in-out duration-300 transition-delay-200"} py-2 w-full`}
                id={`${index}`}
                onClick={handleSelectCategory}

            >
                <FlexRowCenteredY className={`${!isSelected ? "p-2" : "pe-2"}`}>
                    {!isSelected ?
                        <h3 className={"font-bold "}>
                            {textTemplate.category_name}
                        </h3>
                        :
                        <InputBase
                            type="text"
                            value={textTemplate.category_name || ''}
                            className={"font-bold max-w-[80%] p-2"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputCatTitleChange(e, index, textTemplate.category_id)}
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
                            {!favourited
                                ?
                                <FlexRowCentered className="gap-2 flex-1 cursor-pointer hover:bg-green-200 p-2 rounded"
                                    onClick={handleSetFavourited}
                                >
                                    <BsStar className="text-xl" />
                                    <span>Favourite</span>
                                </FlexRowCentered>
                                : <FlexRowCentered className="gap-2 flex-1 cursor-pointer hover:bg-green-200 p-2 rounded"
                                    onClick={handleSetFavourited}
                                >
                                    <BsStarFill className="text-xl" />
                                    <span>Remove</span>
                                </FlexRowCentered>
                            }

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

        </div>
    );
};

export default CategoryCard

