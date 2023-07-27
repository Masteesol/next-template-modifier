import { FlexColContainer } from "@/components/shared/styled-global-components";
import { HoverLabel, IconContainerNormal } from "../../styles";
import { BsListUl, BsPencilSquare, BsStar, BsStarFill } from "react-icons/bs";

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
                    <HoverLabel className="w-[4rem]">Edit texts</HoverLabel>
                </IconContainerNormal>
            </div>
            <div className="group relative">
                <IconContainerNormal onClick={() => { setIsEditActive(true); setIsEditListActive(true) }} disabled={false}>
                    <BsListUl className="text-xl" />
                    <HoverLabel className="w-[4rem]">Edit List</HoverLabel>
                </IconContainerNormal>
            </div>
        </FlexColContainer>

    </FlexColContainer>
}

export default CollectionsTemplateTextEditToolbar