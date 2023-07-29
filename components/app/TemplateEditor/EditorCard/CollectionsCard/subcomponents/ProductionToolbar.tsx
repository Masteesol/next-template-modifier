import { FlexColContainer, FlexRowCenteredY, IconContainerSecondary } from "@/components/shared/styled-global-components";
import { HoverLabel } from "../../styles";
import { BsListUl, BsPencilSquare, BsStar, BsStarFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { updateTemplatesFavourite } from "@/requests/templates";
import { saveMessage } from "@/utils/helpers";
import { useContext } from "react"
import { SaveStatusContext } from "@/context/SavedStatusContext";
import { Templates, TemplatesContainer } from "@/types/global";

interface CollectionsTemplateTextEditToolbarProps {
    setIsEditActive: any;
    textTemplate: any
    setIsEditListActive: any;
    setIsEditTextActive: any;
    userID: any;
    setTemplates: any;
    categoryIndex: number
}


const CollectionsTemplateTextEditToolbar = (props: CollectionsTemplateTextEditToolbarProps) => {
    const { setSaveStatus } = useContext(SaveStatusContext)
    const {
        setIsEditActive,
        textTemplate,
        setIsEditListActive,
        setIsEditTextActive,
        userID,
        setTemplates,
        categoryIndex
    } = props

    const handleSetFavourited = async () => {
        try {
            const res = await updateTemplatesFavourite(textTemplate.template_id, userID, !textTemplate.favourited)
            if (res) {
                saveMessage(setSaveStatus, "Changes saved!")
                setTemplates((prevTemplates: any) => {
                    return prevTemplates.map((templateContainer: TemplatesContainer, index: number) => {
                        if (index === categoryIndex) {
                            const updatedTemplates = templateContainer.templates.map((template: Templates) => {
                                if (template.template_id === textTemplate.template_id) {
                                    return { ...template, favourited: !template.favourited }
                                }
                                return template;  // return unmodified template if condition is not true
                            })
                            return { ...templateContainer, templates: updatedTemplates };  // return the whole templateContainer with updated templates
                        }
                        return templateContainer;  // return unmodified templateContainer if condition is not true
                    })
                });
            } else {
                saveMessage(setSaveStatus, "Error saving changes")
                console.log("Error updating favourites status", res)
            }
        } catch (error) {
            console.log("Error message:", error)
        }
    }
    return <FlexColContainer className="h-full">
        <div className="group relative">
            <IconContainerSecondary
                onClick={handleSetFavourited}
                disabled={false}>
                {!textTemplate.favourited
                    ?
                    <BsStar className="text-xl" />
                    :
                    <BsStarFill className="text-xl text-purple-500" />
                }
                <HoverLabel className={!textTemplate.favourited ? "w-[7rem]" : "w-[4rem]"}>{!textTemplate.favourited ? "Add to favourites" : "Remove"}</HoverLabel>
            </IconContainerSecondary>
        </div>
        <FlexColContainer className="mt-auto">
            <div className="group relative">
                <IconContainerSecondary onClick={() => { setIsEditActive(true); setIsEditTextActive(true) }} disabled={false}>
                    <BsPencilSquare className="text-xl" />
                    <HoverLabel className="w-[7rem]">Add and Edit Texts</HoverLabel>
                </IconContainerSecondary>
                {textTemplate?.template_collections?.length === 0 &&
                    <FlexRowCenteredY className="absolute right-[3rem] top-2 text-sm group-hover:hidden text-green-600 font-bold animate-slide duration-500 ease-in-out">
                        <span className="w-[5rem] text-center ">Click Edit</span>
                        <FaArrowRight />
                    </FlexRowCenteredY>
                }
            </div>
            <div className="group relative">
                <IconContainerSecondary onClick={() => { setIsEditActive(true); setIsEditListActive(true) }} disabled={textTemplate?.template_collections?.length === 0}>
                    <BsListUl className="text-xl" />
                    <HoverLabel className="w-[6rem]">Edit List Order</HoverLabel>
                </IconContainerSecondary>
            </div>
        </FlexColContainer>

    </FlexColContainer>
}

export default CollectionsTemplateTextEditToolbar