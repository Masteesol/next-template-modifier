import { FlexColContainer, FlexRowCenteredY } from "@/components/shared/styled-global-components";
import { HoverLabel, IconContainerNormal } from "../../styles";
import { BsListUl, BsPencilSquare, BsStar, BsStarFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";

interface CollectionsTemplateTextEditToolbarProps {
    setIsEditActive: any;
    textTemplate: any
    setIsEditListActive: any;
    setIsEditTextActive: any
}


const CollectionsTemplateTextEditToolbar = (props: CollectionsTemplateTextEditToolbarProps) => {
    const {
        setIsEditActive,
        textTemplate,
        setIsEditListActive,
        setIsEditTextActive
    } = props
    return <FlexColContainer >
        <div className="group relative">
            <IconContainerNormal disabled={false}>
                {!textTemplate.favourited
                    ?
                    <BsStar className="text-xl" />
                    :
                    <BsStarFill className="text-xl text-green-500" />
                }
                <HoverLabel className={!textTemplate.favourited ? "w-[7rem]" : "w-[4rem]"}>{!textTemplate.favourited ? "Add to favourites" : "Remove"}</HoverLabel>
            </IconContainerNormal>
        </div>
        <FlexColContainer className="mt-auto">
            <div className="group relative">
                <IconContainerNormal onClick={() => { setIsEditActive(true); setIsEditTextActive(true) }} disabled={false}>
                    <BsPencilSquare className="text-xl" />
                    <HoverLabel className="w-[7rem]">Add and Edit Texts</HoverLabel>
                </IconContainerNormal>
                {textTemplate?.template_collections?.length === 0 &&
                    <FlexRowCenteredY className="absolute right-[3rem] top-2 text-sm group-hover:hidden text-green-600 font-bold animate-slide duration-500 ease-in-out">
                        <span className="w-[5rem] text-center ">Click Edit</span>
                        <FaArrowRight />
                    </FlexRowCenteredY>
                }
            </div>
            <div className="group relative">
                <IconContainerNormal onClick={() => { setIsEditActive(true); setIsEditListActive(true) }} disabled={textTemplate?.template_collections?.length === 0}>
                    <BsListUl className="text-xl" />
                    <HoverLabel className="w-[6rem]">Edit List Order</HoverLabel>
                </IconContainerNormal>
            </div>
        </FlexColContainer>

    </FlexColContainer>
}

export default CollectionsTemplateTextEditToolbar